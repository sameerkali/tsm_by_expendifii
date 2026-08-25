import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Company | Bilty Pro',
  description: 'Create your company account for Bilty Pro',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
