import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';
import { buildPageMetadata } from '@/lib/seo';

// noindex: sign-in is for existing users; the homepage is the page to rank.
export const metadata: Metadata = buildPageMetadata('/login');

export default function LoginPage() {
  return <LoginForm />;
}
