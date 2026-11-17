import { Metadata } from 'next';
import { Suspense } from 'react';
import { SettingsClient } from './SettingsClient';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your TMS system configuration and profile',
};

export default function SettingsPage() {
  // SettingsClient reads the ?tab= query via useSearchParams(), which Next
  // requires to sit under a Suspense boundary on a statically prerendered
  // route. The boundary lives here rather than around every page in the
  // root layout, where it hid the whole site's HTML until a reveal script ran.
  return (
    <Suspense fallback={null}>
      <SettingsClient />
    </Suspense>
  );
}
