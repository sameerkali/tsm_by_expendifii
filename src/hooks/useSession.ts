import { useQuery } from '@tanstack/react-query';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';

export function useSession() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: COMPANY_KEYS.profile(),
    queryFn: () => authApi.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const user = data?.data;
  const isAuthenticated = !!user;
  const isInactive = user?.isActive === false;

  return {
    user,
    isAuthenticated,
    isInactive,
    isLoading,
    error,
    refetch,
  };
}
