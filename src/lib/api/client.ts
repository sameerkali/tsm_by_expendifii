import axios from 'axios';
import { ApiError } from '@/types/api';

const apiClient = axios.create({
  // Route all requests through the Next.js proxy (/api/proxy/* → Railway).
  // This makes every request same-origin so httpOnly cookies work correctly.
  baseURL: '/api/proxy',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Auth endpoints that intentionally return 4xx — must NEVER trigger a redirect.
// A 401 here means wrong password; a 409 means duplicate email, etc.
const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/activate', '/auth/profile'];

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const requestUrl: string = error.config?.url ?? '';
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => requestUrl.includes(path));

    // Only redirect to login on 401 for protected routes (session expiry).
    // Auth endpoints must surface their errors back to the form.
    if (error.response?.status === 401 && !isAuthEndpoint) {
      if (typeof window !== 'undefined') {
        console.warn('API returned 401 Unauthorized for', requestUrl);
        // window.location.href = '/'; // Disabled to prevent hard refresh while debugging
      }
    }

    // Normalise all errors into a consistent ApiError shape.
    // Backend uses both `message` and `error` as keys — check both.
    const responseData = error.response?.data ?? {};
    const apiError: ApiError = {
      success: false,
      message:
        responseData.message ??
        responseData.error ??
        error.message ??
        'Something went wrong',
      errors: responseData.errors,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;

