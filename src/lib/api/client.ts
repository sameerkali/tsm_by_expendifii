import axios, { AxiosRequestConfig } from 'axios';
import { ApiError } from '@/types/api';
import { isGuestModeClient } from '@/lib/demo/guest';

const axiosInstance = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/activate',
  '/auth/profile',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/logout',
];

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const requestUrl: string = error.config?.url ?? '';
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => requestUrl.includes(path));

    let responseData = error.response?.data ?? {};

    const isBlob = typeof window !== 'undefined' && responseData instanceof Blob;
    if (isBlob && (error.response?.headers?.['content-type'] ?? '').includes('application/json')) {
      try {
        const text = await responseData.text();
        responseData = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse error Blob as JSON:', e);
      }
    }

    if (error.response?.status === 401 && !isAuthEndpoint) {
      if (typeof window !== 'undefined') {
        const message = responseData.message ?? responseData.error ?? '';
        if (/account (not found|inactive|deactivated)/i.test(message)) {
          fetch('/api/proxy/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
          window.dispatchEvent(new CustomEvent('account-deactivated', { detail: { message } }));
        } else {
          console.warn('API returned 401 Unauthorized for', requestUrl);
          if (!isGuestModeClient()) {
            localStorage.removeItem('profile');
            window.location.href = '/login';
          }
        }
      }
    }

    const apiError: ApiError = {
      success: false,
      status: error.response?.status,
      message:
        responseData.message ??
        responseData.error ??
        error.message ??
        'Something went wrong',
      error: responseData.error,
      field: responseData.field,
      code: responseData.code ?? error.code,
      errors: responseData.errors,
      details: responseData.details,
      debug: responseData.debug,
    };

    return Promise.reject(apiError);
  },
);

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<unknown, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.post<unknown, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.put<unknown, T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => axiosInstance.patch<unknown, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<unknown, T>(url, config),
};

export default apiClient;
