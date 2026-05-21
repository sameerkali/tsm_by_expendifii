'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { grApi, type GetGRsParams } from '@/lib/api/gr.api';
import { getApiErrorMessage } from '@/lib/api/errors';
import { getDemoGRResponse } from '@/lib/demo/data';
import { DEMO_READ_ONLY_MESSAGE, isGuestModeClient } from '@/lib/demo/guest';
import { GR_KEYS } from '@/config/query-keys';
import type { CreateGRInput, UpdateGRInput, GRStatus } from '@/types/gr';

/** Fetch paginated GR list with optional filters. */
export function useGRs(params?: GetGRsParams) {
  const isGuest = isGuestModeClient();
  return useQuery({
    queryKey: [...GR_KEYS.lists(), params, { guest: isGuest }],
    queryFn: () => isGuest ? getDemoGRResponse(params) : grApi.getAll(params),
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
    mutationFn: (data: CreateGRInput) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return grApi.create(data);
    },
    onSuccess: (res) => {
      toast.success(`GR "${res.data.grNumber}" created successfully.`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to create GR.', 'gr'));
    },
  });
}

/** Update an existing GR. */
export function useUpdateGR() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGRInput }) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return grApi.update(id, data);
    },
    onSuccess: (res) => {
      toast.success(`GR "${res.data.grNumber}" updated successfully.`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: GR_KEYS.detail(res.data.id) });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to update GR.', 'gr'));
    },
  });
}

/** Update only the status of a GR. */
export function useUpdateGRStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: GRStatus }) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return grApi.updateStatus(id, status);
    },
    onSuccess: (res) => {
      toast.success(`GR status updated to "${res.data.status}".`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: GR_KEYS.detail(res.data.id) });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to update GR status.', 'gr'));
    },
  });
}

/** Delete a GR. */
export function useDeleteGR() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return grApi.delete(id);
    },
    onSuccess: () => {
      toast.success('GR deleted successfully.');
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete GR.', 'gr'));
    },
  });
}

/** Duplicate an existing GR (same details, new GR number). */
export function useDuplicateGR() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return grApi.duplicate(id);
    },
    onSuccess: (res) => {
      toast.success(`GR duplicated as "${res.data.grNumber}".`);
      queryClient.invalidateQueries({ queryKey: GR_KEYS.lists() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to duplicate GR.', 'gr'));
    },
  });
}

/** Open a single GR PDF in a new tab. */
export function useDownloadGRPdf() {
  return useMutation({
    mutationFn: (id: string) => {
      if (isGuestModeClient()) throw { success: false, message: 'Guest demo uses static data. Sign in to generate PDFs.' };
      return grApi.downloadPdf(id);
    },
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const opened = window.open(url, '_blank');

      if (!opened) {
        toast.error('Popup blocked. Please allow popups to open the GR PDF.');
      }

      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to open GR PDF.', 'print'));
    },
  });
}
