import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';
import { guestCoupon, guestUser, isGuestModeClient } from '@/lib/demo/guest';
import { User, Coupon, ProfileData } from '@/types/session';
import type { ApiError, ApiResponse } from '@/types/api';

const ACCOUNT_DEACTIVATED_EVENT = 'account-deactivated';

const PROFILE_STORAGE_KEY = 'profile';

function getStoredProfile(): ApiResponse<ProfileData> | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as ProfileData;
    return { success: true, data: parsed };
  } catch {
    return undefined;
  }
}

export function useSession() {
  const isGuest = isGuestModeClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: COMPANY_KEYS.profile(),
    queryFn: () => authApi.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    enabled: !isGuest,
    initialData: isGuest ? undefined : getStoredProfile,
  });

  // The profile API returns: { success: true, data: { ...userFields } }
  const profileData = data?.data;

  // Cache profile explicitly in localStorage whenever it resolves successfully
  useEffect(() => {
    if (profileData && typeof window !== 'undefined') {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
    }
  }, [profileData]);

  // Detect account deactivation from the profile query error.
  // The profile endpoint is in AUTH_ENDPOINTS so the axios interceptor won't
  // dispatch the event — we must catch it here for fresh page loads.
  useEffect(() => {
    if (!error || typeof window === 'undefined') return;
    const apiError = error as unknown as ApiError;
    const message = apiError.message ?? '';
    if (/account (not found|inactive|deactivated)/i.test(message)) {
      sessionStorage.setItem('account_deactivated', 'true');
      window.dispatchEvent(new CustomEvent(ACCOUNT_DEACTIVATED_EVENT, { detail: { message } }));
    }
  }, [error]);

  const user: User | undefined = isGuest ? guestUser : profileData as User | undefined;
  
  // Find the active coupon if it exists
  const coupon: Coupon | null =
    isGuest ? guestCoupon : user?.coupons?.find(c => c.isActive && !c.isExpired) ?? null;

  const isAuthenticated = !!user;
  const isActive = user?.accountStatus === 'ACTIVE';

  return {
    user,
    coupon,
    isGuest,
    isAuthenticated,
    isActive,
    isLoading: isGuest ? false : isLoading,
    error,
    refetch,
  };
}
