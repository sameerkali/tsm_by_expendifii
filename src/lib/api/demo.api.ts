import apiClient from './client';
import { ApiResponse } from '@/types/api';

export interface DemoData {
  message: string;
}

export const demoApi = {
  getDemoMessage: () => apiClient.get<ApiResponse<DemoData>>('/demo'),
};

export default demoApi;
