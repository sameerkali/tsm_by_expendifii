import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Company',
  description: 'Create your company account for BiltyOne',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
