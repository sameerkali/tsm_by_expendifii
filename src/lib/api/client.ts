import axios from 'axios';
import { ApiError } from '@/types/api';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Sends cookies with requests
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 1. Handle session timeout (401)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // 2. Normalise error shape
    const apiError: ApiError = {
      success: false,
      message: error.response?.data?.message || 'Something went wrong',
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;
