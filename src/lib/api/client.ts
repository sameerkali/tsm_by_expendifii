import axios from 'axios';
import { ApiError } from '@/types/api';
import { isGuestModeClient } from '@/lib/demo/guest';

const apiClient = axios.create({
  // Route all requests through the Next.js proxy (/api/proxy/* → Railway).
  // This makes every request same-origin so httpOnly cookies work correctly.
  baseURL: '/api/proxy',
  withCredentials: true,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Auth endpoints that intentionally return 4xx — must NEVER trigger a redirect.
// A 401 here means wrong password; a 409 means duplicate email, etc.
const AUTH_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/activate',
  '/auth/profile',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/logout',
];

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const requestUrl: string = error.config?.url ?? '';
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => requestUrl.includes(path));

    // Normalise all errors into a consistent ApiError shape.
    // Backend uses both `message` and `error` as keys — check both.
    let responseData = error.response?.data ?? {};

    // Handle Blob error responses (e.g. for PDF downloads that fail).
    // Check the response content-type header instead of Blob.type, because
    // Safari strips the MIME from the Blob's type property cross-origin.
    const isBlob = typeof window !== 'undefined' && responseData instanceof Blob;
    if (isBlob && (error.response?.headers?.['content-type'] ?? '').includes('application/json')) {
      try {
        const text = await responseData.text();
        responseData = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse error Blob as JSON:', e);
      }
    }

    // Only redirect to login on 401 for protected routes (session expiry).
    // Auth endpoints must surface their errors back to the form.
    if (error.response?.status === 401 && !isAuthEndpoint) {
      if (typeof window !== 'undefined') {
        const message = responseData.message ?? responseData.error ?? '';
        // Account deactivated by admin — show modal instead of redirecting to login.
        // The modal displays the error and forces logout, which clears the cookie first
        // to prevent the middleware from redirecting back into an infinite loop.
        if (/account (not found|inactive|deactivated)/i.test(message)) {
          // Fire-and-forget: clear the httpOnly cookie server-side so the middleware
          // doesn't redirect back from /login after we show the modal.
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

export default apiClient;
