import { useQuery } from '@tanstack/react-query';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';
import { User, Coupon } from '@/types/session';

export function useSession() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: COMPANY_KEYS.profile(),
    queryFn: () => authApi.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // The profile API returns: { success: true, data: { ...userFields } }
  const profileData = data?.data;
  const user: User | undefined = profileData as User | undefined;
  
  // Find the active coupon if it exists
  const coupon: Coupon | null =
  user?.coupons?.find(c => c.isActive && !c.isExpired) ?? null;

  const isAuthenticated = !!user;
  const isActive = user?.accountStatus === 'ACTIVE';

  return {
    user,
    coupon,
    isAuthenticated,
    isActive,
    isLoading,
    error,
    refetch,
  };
}
