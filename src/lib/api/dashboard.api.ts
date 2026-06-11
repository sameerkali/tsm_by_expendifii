import apiClient from './client';
import { ApiResponse } from '@/types/api';

export interface DashboardData {
  grs: {
    total: number;
    booked: number;
    inTransit: number;
    delivered: number;
  };
  revenue: {
    total: number;
    pending: number;
    paid: number;
  };
  payment: {
    pending: number;
    paid: number;
  };
  totalCustomers: number;
  topCustomersByGRCount: Array<{
    grCount: number;
    customerId: string;
    name: string;
    phone: string;
  }>;
  topCustomersByRevenue: Array<{
    revenue: number;
    customerId: string;
    name: string;
    phone: string;
  }>;
  recentGRs: Array<{
    grNumber: string;
    bookingDate: string;
    fromCity: string;
    toCity: string;
    freightAmount: number;
    paymentStatus: string;
    status: string;
    grId: string;
  }>;
}

export const dashboardApi = {
  getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
    return apiClient.get('/auth/dashboard');
  },
};

export default dashboardApi;
