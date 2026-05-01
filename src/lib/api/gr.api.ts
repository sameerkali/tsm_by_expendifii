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
  };
}

export interface SingleGRResponse {
  success: boolean;
  data: GR;
}

export const grApi = {
  getAll: async (params?: GetGRsParams): Promise<PaginatedGRResponse> => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.search) query.set('search', params.search);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const qs = query.toString();
    return apiClient.get(`/gr${qs ? `?${qs}` : ''}`) as any;
  },

  getById: async (id: string): Promise<SingleGRResponse> => {
    return apiClient.get(`/gr/${id}`) as any;
  },

  create: async (data: CreateGRInput): Promise<SingleGRResponse> => {
    return apiClient.post('/gr', data) as any;
  },

  update: async (id: string, data: UpdateGRInput): Promise<SingleGRResponse> => {
    return apiClient.patch(`/gr/${id}`, data) as any;
  },

  updateStatus: async (id: string, status: GRStatus): Promise<SingleGRResponse> => {
    return apiClient.patch(`/gr/${id}/status`, { status }) as any;
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete(`/gr/${id}`) as any;
  },
};

export default grApi;
