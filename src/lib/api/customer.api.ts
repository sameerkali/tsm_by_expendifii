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
  limit?: number;
}

export const customerApi = {
  getAll: (params?: CustomerListParams) => apiClient.get<CustomerListResponse>('/customers', { params }),
  getById: (id: string) => apiClient.get<CustomerResponse>(`/customers/${id}`),
  create: (data: CreateCustomerInput) => apiClient.post<CustomerResponse>('/customers', data),
  update: (id: string, data: UpdateCustomerInput) => apiClient.put<CustomerResponse>(`/customers/${id}`, data),
  delete: (id: string) => apiClient.delete<CustomerDeleteResponse>(`/customers/${id}`),
  downloadGrPdf: (customerId: string, from: string, to?: string) =>
    apiClient.get<Blob>(`/gr/customer/${customerId}/download`, { params: { from, to }, responseType: 'blob' }),
};

export default customerApi;
