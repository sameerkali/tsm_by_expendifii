import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import authApi from '@/lib/api/auth.api';
import { COMPANY_KEYS } from '@/config/query-keys';
import { LoginInput, RegisterInput, ActivateInput } from '@/lib/validations/auth.schema';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response) => {
      queryClient.setQueryData(COMPANY_KEYS.profile(), response);
      toast.success('Login successful');
      
      if (response.data?.accountStatus === 'INACTIVE') {
        router.push('/activate');
      } else {
        router.push('/dashboard');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: () => {
      toast.success('Account created successfully');
      router.push('/activate');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  const activateMutation = useMutation({
    mutationFn: (data: ActivateInput) => authApi.activate(data),
    onSuccess: () => {
      toast.success('Account activated successfully');
      router.push('/login');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Activation failed');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    activate: activateMutation.mutate,
    isActivating: activateMutation.isPending,
    logout: logoutMutation.mutate,
  };
}
