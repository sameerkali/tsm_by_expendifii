'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';
import { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';
import { ApiError } from '@/types/api';

/** Safely extract a user-facing message from an unknown error. */
function extractMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as ApiError).message;
    if (typeof msg === 'string' && msg.trim().length > 0) return msg;
  }
  return fallback;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (res) => {
      const accountStatus = res.data?.accountStatus;

      // Refetch profile so useSession picks up the authenticated user
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });

      if (accountStatus === 'INACTIVE') {
        toast.info('Account is inactive. Enter your coupon code to activate.');
        router.push('/activate');
      } else {
        toast.success('Welcome back!');
        router.push('/dashboard');
      }
    },
    onError: (error: unknown) => {
      toast.error(extractMessage(error, 'Login failed. Check your credentials and try again.'));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (res) => {
      // LOG: Full register onSuccess — inspect every possible token location
      console.group('[useAuth] Register onSuccess');
      console.log('Full res object:', JSON.stringify(res, null, 2));
      console.log('res.data (should be user object):', res?.data);
      console.log('res.data?.token:', (res?.data as any)?.token);
      console.log('(res as any).token (top-level?):', (res as any)?.token);
      console.groupEnd();

      // Store the token for the cross-origin activate call.
      // Check both res.data.token and res.token (top-level) since backend shape is unclear.
      const token = (res?.data as any)?.token ?? (res as any)?.token ?? null;

      console.log('[useAuth] Token extracted from register response:', token ? `${token.substring(0, 20)}...` : 'NULL — token not found in response');

      if (token && typeof window !== 'undefined') {
        sessionStorage.setItem('_activation_token', token);
        console.log('[useAuth] Token saved to sessionStorage ✅');
        console.log('[useAuth] sessionStorage verify:', sessionStorage.getItem('_activation_token')?.substring(0, 20) + '...');
      } else {
        console.warn('[useAuth] ⚠️ No token found in register response — activate will fail auth');
        console.warn('[useAuth] Check [AUTH] Register Response log above to find the correct token field');
      }

      toast.success(res.message || 'Account created! Activate with your coupon code.');
      router.push('/activate');
    },
    onError: (error: unknown) => {
      console.error('[useAuth] Register failed:', error);
      toast.error(extractMessage(error, 'Registration failed. Please try again.'));
    },
  });

  const activateMutation = useMutation({
    mutationFn: (data: ActivateInput) => authApi.activate(data),
    onSuccess: (res) => {
      console.group('[useAuth] Activate onSuccess');
      console.log('Response:', JSON.stringify(res, null, 2));
      console.groupEnd();

      // Token served its purpose — remove it immediately.
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('_activation_token');
        console.log('[useAuth] Activation token cleared from sessionStorage ✅');
      }
      const durationDays = res.data?.durationDays;
      const msg = durationDays
        ? `Account activated! Valid for ${durationDays} days.`
        : 'Account activated successfully!';
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      console.group('[useAuth] Activate onError');
      console.error('Error:', error);
      console.groupEnd();

      // Always clear the temp token, even on failure (wrong coupon, expired, etc.)
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('_activation_token');
        console.log('[useAuth] Activation token cleared from sessionStorage after error');
      }
      toast.error(extractMessage(error, 'Invalid or expired coupon code. Please try again.'));
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Parameters<typeof authApi.updateProfile>[0]) =>
      authApi.updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully.');
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
    },
    onError: (error: unknown) => {
      toast.error(extractMessage(error, 'Failed to update profile. Please try again.'));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/');
    },
    onError: () => {
      // Even if the logout API fails, clear local state and send user to login.
      // Never leave the user stuck on a "logging out" screen.
      queryClient.clear();
      router.push('/');
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
