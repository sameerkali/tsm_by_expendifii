import { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';

export const metadata: Metadata = {
  title: 'Command Center | BiltyOne',
  description: 'BiltyOne operational control center and carousel showcase',
};

export default function OverviewPage() {
  return <DashboardClient />;
}
