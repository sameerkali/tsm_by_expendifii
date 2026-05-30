import { useQuery } from '@tanstack/react-query';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';
import { guestCoupon, guestUser, isGuestModeClient } from '@/lib/demo/guest';
import { User, Coupon } from '@/types/session';

export function useSession() {
  const isGuest = isGuestModeClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: COMPANY_KEYS.profile(),
    queryFn: () => authApi.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    enabled: !isGuest,
  });

  // The profile API returns: { success: true, data: { ...userFields } }
  const profileData = data?.data;
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
