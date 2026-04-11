import { GRStatus } from '@/types/gr';

export const GR_STATUS_COLORS: Record<GRStatus, string> = {
  [GRStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [GRStatus.DISPATCHED]: 'bg-blue-100 text-blue-800 border-blue-200',
  [GRStatus.DELIVERED]: 'bg-green-100 text-green-800 border-green-200',
  [GRStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-200',
};

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'GR Management', href: '/gr', icon: 'FileText' },
  { label: 'Customers', href: '/customers', icon: 'Users' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];

export const MAX_LOGO_SIZE_MB = 2;
