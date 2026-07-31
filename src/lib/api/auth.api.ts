import apiClient from './client';
import type { ApiResponse } from '@/types/api';
import type { AuthResponse, CompanyAddress, CompanyBankDetails, ProfileData, User } from '@/types/session';
import type { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';

type EditableCompanyFields = Pick<
  User['company'],
  'companyName' | 'gstin' | 'pan' | 'phone' | 'email' | 'contactPerson' | 'logoUrl'
>;

export type UpdateProfileInput = Partial<Pick<User, 'name' | 'phone' | 'email'>> & {
  password?: string;
  company?: Partial<EditableCompanyFields> & {
    address?: Partial<CompanyAddress>;
    bankDetails?: Partial<CompanyBankDetails>;
  };
};

export const authApi = {
  register: (data: RegisterInput) => apiClient.post<ApiResponse<User & { token?: string }>>('/auth/register', data),
  activate: (data: ActivateInput) => apiClient.post<ApiResponse<{ accountStatus: string; startDate: string; endDate: string; durationDays: number }>>('/auth/activate', data),
  login: (data: LoginInput) => apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),
  logout: () => apiClient.post<ApiResponse<void>>('/auth/logout'),
  getProfile: () => apiClient.get<ApiResponse<ProfileData>>('/auth/profile'),
  updateProfile: (data: UpdateProfileInput) => apiClient.patch<ApiResponse<User>>('/auth/profile', data),
  requestDeletion: () => apiClient.post<ApiResponse<unknown>>('/settings/request-deletion'),
  getDeletionStatus: () => apiClient.get<ApiResponse<unknown>>('/settings/deletion-status'),
  requestPasswordReset: (email: string) => apiClient.post<ApiResponse<unknown>>('/auth/forgot-password', { email }),
  resetPassword: (payload: { email: string; otp: string; newPassword: string }) => apiClient.post<ApiResponse<unknown>>('/auth/reset-password', payload),
};

export default authApi;
