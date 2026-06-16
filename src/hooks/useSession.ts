import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';
import { guestCoupon, guestUser, isGuestModeClient } from '@/lib/demo/guest';
import { User, Coupon, ProfileData } from '@/types/session';
import type { ApiResponse } from '@/types/api';

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
