'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { grApi, type GetGRsParams } from '@/lib/api/gr.api';
import { GR_KEYS } from '@/config/query-keys';
import type { CreateGRInput, UpdateGRInput, GRStatus } from '@/types/gr';
import type { ApiError } from '@/types/api';

function extractMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as ApiError).message;
    if (typeof msg === 'string' && msg.trim().length > 0) return msg;
  }
  return fallback;
}

/** Fetch paginated GR list with optional filters. */
export function useGRs(params?: GetGRsParams) {
  return useQuery({
    queryKey: [...GR_KEYS.lists(), params],
    queryFn: () => grApi.getAll(params),
  });
}

/** Fetch a single GR by ID. */
export function useGR(id: string) {
  return useQuery({
    queryKey: GR_KEYS.detail(id),
    queryFn: () => grApi.getById(id),
    enabled: !!id,
  });
}

/** Create a new GR. */
export function useCreateGR() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGRInput) => grApi.create(data),
    onSuccess: (res) => {
      toast.success(`GR "${res.data.grNumber}" created successfully.`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(extractMessage(error, 'Failed to create GR.'));
    },
  });
}

/** Update an existing GR. */
export function useUpdateGR() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGRInput }) =>
      grApi.update(id, data),
    onSuccess: (res) => {
      toast.success(`GR "${res.data.grNumber}" updated successfully.`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: GR_KEYS.detail(res.data.id) });
    },
    onError: (error: unknown) => {
      toast.error(extractMessage(error, 'Failed to update GR.'));
    },
  });
}

/** Update only the status of a GR. */
export function useUpdateGRStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: GRStatus }) =>
      grApi.updateStatus(id, status),
    onSuccess: (res) => {
      toast.success(`GR status updated to "${res.data.status}".`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: GR_KEYS.detail(res.data.id) });
    },
    onError: (error: unknown) => {
      toast.error(extractMessage(error, 'Failed to update GR status.'));
    },
  });
}

/** Delete a GR. */
export function useDeleteGR() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => grApi.delete(id),
    onSuccess: () => {
      toast.success('GR deleted successfully.');
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(extractMessage(error, 'Failed to delete GR.'));
    },
  });
}
