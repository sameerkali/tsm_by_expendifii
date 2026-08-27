import { Metadata } from 'next';
import { CustomersClient } from './CustomersClient';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Manage your customer registry',
};

export default function CustomersPage() {
  return <CustomersClient />;
}
