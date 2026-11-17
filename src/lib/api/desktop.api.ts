import apiClient from './client';
import type { ApiError, ApiResponse } from '@/types/api';

/** Subject the admin panel shows on licence key requests in Messages. */
export const LICENCE_REQUEST_SUBJECT = 'BiltyOne Desktop: free licence key request';

export interface LicenceKeyRequest {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  note?: string;
}

export const desktopApi = {
  /** Emails the Windows installer link (set in the admin panel) to this address. */
  requestDownloadLink: (email: string) =>
    apiClient.post<ApiResponse<{ email: string; message: string }>>('/desktop/download-request', { email }),

  /** Sends a free licence key request to the admin panel's Messages. */
  requestLicenceKey: ({ name, email, phone, companyName, note }: LicenceKeyRequest) =>
    apiClient.post<ApiResponse>('/contact', {
      name,
      email,
      phone: phone || undefined,
      companyName: companyName || undefined,
      subject: LICENCE_REQUEST_SUBJECT,
      message: ['Please send me a free BiltyOne Desktop licence key.', note ? `Note: ${note}` : '']
        .filter(Boolean)
        .join('\n\n'),
    }),
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
