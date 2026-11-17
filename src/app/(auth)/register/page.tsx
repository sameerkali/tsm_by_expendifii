import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { buildPageMetadata } from '@/lib/seo';

// noindex: a sign-up form has no content to rank; landing pages link here.
export const metadata: Metadata = buildPageMetadata('/register');

export default function RegisterPage() {
  return <RegisterForm />;
}
