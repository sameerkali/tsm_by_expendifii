import { Metadata } from 'next';
import { SettingsClient } from './SettingsClient';

export const metadata: Metadata = {
  title: 'Settings | TMS',
  description: 'Manage your TMS system configuration and profile',
};

export default function SettingsPage() {
  return <SettingsClient />;
}
