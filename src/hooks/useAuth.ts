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
    mutationFn: async (data: LoginInput) => {
      // Bypassing real API for UI testing
      console.log('Mock Login:', data);
      return { data: { accountStatus: 'ACTIVE' } };
    },
    onSuccess: () => {
      toast.success('Login bypassed for UI testing');
      router.push('/dashboard');
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      console.log('Mock Register:', data);
      return { data: {} };
    },
    onSuccess: () => {
      toast.success('Registration bypassed');
      router.push('/activate');
    },
  });

  const activateMutation = useMutation({
    mutationFn: async (data: ActivateInput) => {
      console.log('Mock Activate:', data);
      return { data: {} };
    },
    onSuccess: () => {
      toast.success('Activation bypassed');
      router.push('/login');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      console.log('Mock Logout');
    },
    onSuccess: () => {
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
