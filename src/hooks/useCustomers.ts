'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { customerApi, type CustomerListParams } from '@/lib/api/customer.api';
import { getApiErrorMessage } from '@/lib/api/errors';
import { CUSTOMER_KEYS } from '@/config/query-keys';
import type { CreateCustomerInput, UpdateCustomerInput } from '@/types/customer';

/** Fetch paginated customer list with optional search. */
export function useCustomers(params?: CustomerListParams) {
  return useQuery({
    queryKey: [...CUSTOMER_KEYS.lists(), params],
    queryFn: () => customerApi.getAll(params),
  });
}

/** Fetch a single customer by ID. */
export function useCustomer(id: string) {
  return useQuery({
    queryKey: CUSTOMER_KEYS.detail(id),
    queryFn: () => customerApi.getById(id),
    enabled: !!id,
  });
}

/** Create a new customer. */
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerInput) => customerApi.create(data),
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
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerInput }) =>
      customerApi.update(id, data),
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
    mutationFn: (id: string) => customerApi.delete(id),
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
    mutationFn: ({ customerId, from, to }: { customerId: string; from: string; to?: string }) =>
      customerApi.downloadGrPdf(customerId, from, to),
    onSuccess: (blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      // Revoke the object URL after a delay to ensure it opened
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to download GR PDF.', 'print'));
    },
  });
}
