import { GRStatus } from '@/types/gr';

export const GR_STATUS_COLORS: Record<GRStatus, string> = {
  [GRStatus.BOOKED]:     'bg-slate-100 text-slate-700 border-slate-200',
  [GRStatus.IN_TRANSIT]: 'bg-amber-100 text-amber-800 border-amber-200',
  [GRStatus.DELIVERED]:  'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'GR Management', href: '/gr', icon: 'FileText' },
  { label: 'Customers', href: '/customers', icon: 'Users' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];

export const MAX_LOGO_SIZE_MB = 2;
