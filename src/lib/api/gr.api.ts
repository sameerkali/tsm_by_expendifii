import apiClient from './client';
import { GR, CreateGRInput, UpdateGRInput, GRStatus } from '@/types/gr';

export interface GetGRsParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedGRResponse {
  success: boolean;
  data: GR[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    limit?: number;
  };
}

export interface SingleGRResponse {
  success: boolean;
  data: GR;
}

export const grApi = {
  getAll: (params?: GetGRsParams) => apiClient.get<PaginatedGRResponse>('/gr', { params }),
  getById: (id: string) => apiClient.get<SingleGRResponse>(`/gr/${id}`),
  create: (data: CreateGRInput) => apiClient.post<SingleGRResponse>('/gr', data),
  update: (id: string, data: UpdateGRInput) => apiClient.patch<SingleGRResponse>(`/gr/${id}`, data),
  updateStatus: (id: string, status: GRStatus) => apiClient.patch<SingleGRResponse>(`/gr/${id}/status`, { status }),
  delete: (id: string) => apiClient.delete<{ success: boolean; message: string }>(`/gr/${id}`),
  duplicate: (id: string) => apiClient.post<SingleGRResponse>(`/gr/${id}/duplicate`, {}),
  downloadPdf: (id: string) => apiClient.get<Blob>(`/gr/${id}/pdf`, { responseType: 'blob' }),
};

export default grApi;
