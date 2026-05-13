import apiClient from './client';
import { ApiResponse } from '@/types/api';
import { AuthResponse, CompanyAddress, CompanyBankDetails, ProfileData, User } from '@/types/session';
import { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';

type EditableCompanyFields = Pick<
  User['company'],
  'companyName' | 'gstin' | 'pan' | 'phone' | 'email' | 'contactPerson' | 'logoUrl'
>;

type UpdateProfileInput = Partial<Pick<User, 'name' | 'phone' | 'email'>> & {
  password?: string;
  company?: Partial<EditableCompanyFields> & {
    address?: Partial<CompanyAddress>;
    bankDetails?: Partial<CompanyBankDetails>;
  };
};

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
   */
  activate: async (data: ActivateInput): Promise<ApiResponse<{ accountStatus: string; startDate: string; endDate: string; durationDays: number }>> => {
    // Relying on httpOnly cookie being forwarded by the proxy.
    const response = await apiClient.post('/auth/activate', data);

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
  updateProfile: async (data: UpdateProfileInput): Promise<ApiResponse<User>> => {
    return apiClient.put('/auth/profile', data) as any;
  },
};

export default authApi;
