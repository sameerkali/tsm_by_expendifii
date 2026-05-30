import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | TMS by Expendifii',
  description: 'Access your transport management dashboard',
};

export default function LoginPage() {
  return <LoginForm />;
}
