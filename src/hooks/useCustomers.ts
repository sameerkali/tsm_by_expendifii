'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { customerApi, type CustomerListParams } from '@/lib/api/customer.api';
import { CUSTOMER_KEYS } from '@/config/query-keys';
import type { CreateCustomerInput, UpdateCustomerInput } from '@/types/customer';
import type { ApiError } from '@/types/api';

function extractMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as ApiError).message;
    if (typeof msg === 'string' && msg.trim().length > 0) return msg;
  }
  return fallback;
}

/** Fetch paginated customer list with optional search. */
export function useCustomers(params?: CustomerListParams) {
  return useQuery({
    queryKey: CUSTOMER_KEYS.list(params?.search),
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
      toast.error(extractMessage(error, 'Failed to create customer.'));
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
      toast.error(extractMessage(error, 'Failed to update customer.'));
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
      toast.error(extractMessage(error, 'Failed to delete customer.'));
    },
  });
}
