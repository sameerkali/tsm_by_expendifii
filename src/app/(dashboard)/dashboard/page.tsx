import { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';

export const metadata: Metadata = {
  title: 'Command Center | TMS',
  description: 'Bilty Pro operational control center and carousel showcase',
};

export default function OverviewPage() {
  return <DashboardClient />;
}
