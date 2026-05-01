import apiClient from './client';
import type {
  CustomerListResponse,
  CustomerResponse,
  CustomerDeleteResponse,
  CreateCustomerInput,
  UpdateCustomerInput,
} from '@/types/customer';

export interface CustomerListParams {
  search?: string;
  page?: number;
}

export const customerApi = {
  getAll: async (params?: CustomerListParams): Promise<CustomerListResponse> => {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.page) query.set('page', String(params.page));
    const qs = query.toString();
    return apiClient.get(`/customers${qs ? `?${qs}` : ''}`) as any;
  },

  getById: async (id: string): Promise<CustomerResponse> => {
    return apiClient.get(`/customers/${id}`) as any;
  },

  create: async (data: CreateCustomerInput): Promise<CustomerResponse> => {
    return apiClient.post('/customers', data) as any;
  },

  update: async (id: string, data: UpdateCustomerInput): Promise<CustomerResponse> => {
    return apiClient.put(`/customers/${id}`, data) as any;
  },

  delete: async (id: string): Promise<CustomerDeleteResponse> => {
    return apiClient.delete(`/customers/${id}`) as any;
  },
};

export default customerApi;
