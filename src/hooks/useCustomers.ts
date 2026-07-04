'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { customerApi, type CustomerListParams } from '@/lib/api/customer.api';
import { getApiErrorMessage } from '@/lib/api/errors';
import { getDemoCustomerById, getDemoCustomerResponse } from '@/lib/demo/data';
import { DEMO_READ_ONLY_MESSAGE, isGuestModeClient } from '@/lib/demo/guest';
import { CUSTOMER_KEYS } from '@/config/query-keys';
import type { CreateCustomerInput, UpdateCustomerInput } from '@/types/customer';

/** Fetch paginated customer list with optional search. */
export function useCustomers(params?: CustomerListParams) {
  const isGuest = isGuestModeClient();
  return useQuery({
    queryKey: [...CUSTOMER_KEYS.lists(), params, { guest: isGuest }],
    queryFn: () => isGuest ? getDemoCustomerResponse(params) : customerApi.getAll(params),
  });
}

/** Fetch a single customer by ID. */
export function useCustomer(id: string) {
  const isGuest = isGuestModeClient();
  return useQuery({
    queryKey: [...CUSTOMER_KEYS.detail(id), { guest: isGuest }],
    queryFn: () => isGuest ? getDemoCustomerById(id) : customerApi.getById(id),
    enabled: !!id,
  });
}

/** Create a new customer. */
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerInput) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return customerApi.create(data);
    },
    onSuccess: (res) => {
      toast.success(`Customer "${res.data.name}" created successfully.`);
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to create customer.', 'customer'));
    },
  });
}

/** Update an existing customer. */
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerInput }) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return customerApi.update(id, data);
    },
    onSuccess: (res) => {
      toast.success(`Customer "${res.data.name}" updated successfully.`);
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.detail(res.data.id) });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to update customer.', 'customer'));
    },
  });
}

/** Soft-delete a customer. */
export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return customerApi.delete(id);
    },
    onSuccess: () => {
      toast.success('Customer deleted successfully.');
      queryClient.invalidateQueries({ queryKey: CUSTOMER_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete customer.', 'customer'));
    },
  });
}

/** Download GR PDF for a customer by date range. */
export function useDownloadCustomerGrPdf() {
  return useMutation({
    mutationFn: async ({ customerId, from, to, customerName }: { customerId: string; from: string; to?: string; customerName?: string }) => {
      if (isGuestModeClient()) throw { success: false, message: 'Guest demo uses static data. Sign in to download GR statements.' };
      const blob = await customerApi.downloadGrPdf(customerId, from, to);
      return { blob, customerName, from, to };
    },
    onSuccess: ({ blob, customerName, from, to }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const safeName = customerName ? customerName.replace(/[^a-zA-Z0-9]/g, '_') : 'Customer';
      const range = to ? `${from}_to_${to}` : `up_to_${from}`;
      link.download = `GR_Statement_${safeName}_${range}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL after a delay to ensure it downloaded
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to download GR PDF.', 'print'));
    },
  });
}
