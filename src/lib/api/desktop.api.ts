import apiClient from './client';
import type { ApiError, ApiResponse } from '@/types/api';

export const desktopApi = {
  /** Emails the Windows installer link (set in the admin panel) and a free trial key to this address. */
  requestDownloadLink: (email: string) =>
    apiClient.post<ApiResponse<{ email: string; message: string }>>('/desktop/download-request', { email }),
};

/** The most useful message from a failed request, for showing under a form. */
export function apiErrorMessage(err: unknown, fallback: string): string {
  const e = err as Partial<ApiError> | undefined;
  const firstDetail = e?.details?.[0]?.message;
  if (firstDetail) return firstDetail;
  if (e?.status && e.message && e.message !== 'Validation failed') return e.message;
  if (e?.code === 'ECONNABORTED' || e?.code === 'ERR_NETWORK') {
    return "Couldn't reach BiltyOne. Check your internet connection and try again.";
  }
  return fallback;
}
