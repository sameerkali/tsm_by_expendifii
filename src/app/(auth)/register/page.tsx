import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Company | TMS by Expendifii',
  description: 'Create your company account for TMS',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
