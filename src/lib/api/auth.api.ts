import apiClient from './client';
import { ApiResponse } from '@/types/api';
import { AuthResponse, User } from '@/types/session';
import { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';


export const authApi = {
  /**
   * Registers a new company account.
   * Account starts as INACTIVE.
   */
  register: async (data: RegisterInput): Promise<ApiResponse<User>> => {
    return apiClient.post('/auth/register', data) as any;
  },

  /**
   * Activates account using coupon code.
   */
  activate: async (data: ActivateInput): Promise<ApiResponse<{ accountStatus: string; durationDays: number }>> => {
    return apiClient.post('/auth/activate', data) as any;
  },

  /**
   * Login user and sets httpOnly cookie.
   */
  login: async (data: LoginInput): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post('/auth/login', data) as any;
  },

  /**
   * Logout user and clears cookies.
   */
  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post('/auth/logout') as any;
  },


  /**
   * Returns current user profile.
   */
  getProfile: async (): Promise<ApiResponse<User & { phone?: string; isActive: boolean; createdAt: string }>> => {
    return apiClient.get('/auth/profile') as any;
  },

  /**
   * Updates user profile fields.
   */
  updateProfile: async (data: Partial<Pick<RegisterInput, 'name' | 'phone' | 'companyName'>>): Promise<ApiResponse<User>> => {
    return apiClient.put('/auth/profile', data) as any;
  },

};

export default authApi;
