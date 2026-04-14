import apiClient from './client';
import { ApiResponse } from '@/types/api';
import { AuthResponse, ProfileData, User } from '@/types/session';
import { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';

export const authApi = {
  /**
   * Registers a new company account. Returns user data.
   * Backend sets an httpOnly cookie AND may return a token in the response body.
   * We log the full response to find exactly where the token lives.
   */
  register: async (data: RegisterInput): Promise<ApiResponse<User & { token?: string }>> => {
    const response = await apiClient.post('/auth/register', data);

    // LOG: Full register response — find where the token is
    console.group('[AUTH] Register Response');
    console.log('Full response:', JSON.stringify(response, null, 2));
    console.log('response.data (user object):', (response as any)?.data);
    console.log('response.token (top-level?):', (response as any)?.token);
    console.groupEnd();

    return response as any;
  },

  /**
   * Activates account using coupon code.
   * Reads the activation token from sessionStorage and sends as Authorization: Bearer.
   * Token is cleared from sessionStorage after this call regardless of outcome.
   */
  activate: async (data: ActivateInput): Promise<ApiResponse<{ accountStatus: string; startDate: string; endDate: string; durationDays: number }>> => {
    const token = typeof window !== 'undefined'
      ? sessionStorage.getItem('_activation_token')
      : null;

    // LOG: What token do we have going into activate?
    console.group('[AUTH] Activate Request');
    console.log('Token in sessionStorage (_activation_token):', token);
    console.log('Token length:', token?.length ?? 0);
    console.log('Will send Authorization header:', !!token);
    console.log('Coupon code being sent:', data.couponCode);
    console.groupEnd();

    const response = await apiClient.post('/auth/activate', data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // LOG: Activate response
    console.group('[AUTH] Activate Response');
    console.log('Full response:', JSON.stringify(response, null, 2));
    console.groupEnd();

    return response as any;
  },

  /**
   * Login user — backend sets httpOnly cookie.
   */
  login: async (data: LoginInput): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/login', data);

    // LOG: Full login response
    console.group('[AUTH] Login Response');
    console.log('Full response:', JSON.stringify(response, null, 2));
    console.log('accountStatus:', (response as any)?.data?.accountStatus);
    console.groupEnd();

    return response as any;
  },

  /**
   * Logout user and clears cookies.
   */
  logout: async (): Promise<ApiResponse<void>> => {
    console.log('[AUTH] Logout called');
    return apiClient.post('/auth/logout') as any;
  },

  /**
   * Returns current user profile including coupon details.
   */
  getProfile: async (): Promise<ApiResponse<ProfileData>> => {
    const response = await apiClient.get('/auth/profile');
    console.log('[AUTH] GetProfile response:', JSON.stringify(response, null, 2));
    return response as any;
  },

  /**
   * Updates user profile fields.
   */
  updateProfile: async (data: Partial<Pick<RegisterInput, 'name' | 'phone' | 'companyName'>>): Promise<ApiResponse<User>> => {
    console.log('[AUTH] UpdateProfile called with:', data);
    return apiClient.put('/auth/profile', data) as any;
  },
};

export default authApi;
