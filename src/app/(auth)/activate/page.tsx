import { ActivateForm } from '@/components/auth/ActivateForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activate Account | TMS by Expendifii',
  description: 'Unlock your dashboard access with a coupon code',
};

export default function ActivatePage() {
  return <ActivateForm />;
}
