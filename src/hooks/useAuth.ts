'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import authApi from '@/lib/api/auth.api';
import { getApiErrorMessage } from '@/lib/api/errors';
import { DEMO_READ_ONLY_MESSAGE, exitGuestMode, isGuestModeClient } from '@/lib/demo/guest';
import { COMPANY_KEYS } from '@/config/query-keys';
import { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';
import { ApiError } from '@/types/api';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: async (res) => {
      const accountStatus = res.data?.accountStatus;

      // Refetch profile so useSession picks up the authenticated user
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });

      if (accountStatus === 'INACTIVE') {
        toast.info('Account is inactive. Enter your coupon code to activate.');
        router.push('/activate');
      } else {
        // Fetch profile explicitly and cache in localStorage as requested
        try {
          const profile = await authApi.getProfile();
          if (profile.data && typeof window !== 'undefined') {
            localStorage.setItem('profile', JSON.stringify(profile.data));
          }
        } catch (e) {
          console.error('[useAuth] Failed to fetch profile after login', e);
        }
        
        toast.success('Welcome back!');
        router.push('/gr');
      }
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Login failed. Check your credentials and try again.', 'auth'));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (res) => {
      toast.success(res.message || 'Account created! Activate with your coupon code.');
      router.push('/activate');
    },
    onError: (error: unknown) => {
      console.error('[useAuth] Register failed:', error);
      toast.error(getApiErrorMessage(error, 'Registration failed. Please try again.', 'auth'));
    },
  });

  const activateMutation = useMutation({
    mutationFn: (data: ActivateInput) => authApi.activate(data),
    onSuccess: async (res) => {
      console.group('[useAuth] Activate onSuccess');
      console.log('Response:', JSON.stringify(res, null, 2));
      console.groupEnd();

      const durationDays = res.data?.durationDays;
      const msg = durationDays
        ? `Account activated! Valid for ${durationDays} days.`
        : 'Account activated successfully!';
      toast.success(msg);
      
      // Fetch profile explicitly and cache in localStorage as requested
      try {
        const profile = await authApi.getProfile();
        if (profile.data && typeof window !== 'undefined') {
          localStorage.setItem('profile', JSON.stringify(profile.data));
        }
      } catch (e) {
        console.error('[useAuth] Failed to fetch profile after activation', e);
      }

      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
      router.push('/gr');
    },
    onError: (error: unknown) => {
      console.group('[useAuth] Activate onError');
      console.error('Error:', error);
      console.groupEnd();

      toast.error(getApiErrorMessage(error, 'Invalid or expired coupon code. Please try again.', 'auth'));
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Parameters<typeof authApi.updateProfile>[0]) => {
      if (isGuestModeClient()) throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return authApi.updateProfile(data);
    },
    onSuccess: () => {
      toast.success('Profile updated successfully.');
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to update profile. Please try again.', 'auth'));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      if (isGuestModeClient()) {
        return Promise.resolve({ success: true });
      }
      return authApi.logout();
    },
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('profile');
        exitGuestMode();
      }
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      // Even if the logout API fails, clear local state and send user to login.
      // Never leave the user stuck on a "logging out" screen.
      if (typeof window !== 'undefined') {
        localStorage.removeItem('profile');
        exitGuestMode();
      }
      queryClient.clear();
      router.push('/login');
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error as ApiError | null,

    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error as ApiError | null,

    activate: activateMutation.mutate,
    isActivating: activateMutation.isPending,
    activateError: activateMutation.error as ApiError | null,

    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error as ApiError | null,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
