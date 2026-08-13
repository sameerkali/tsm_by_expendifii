import {
  LayoutDashboard, Users as UsersIcon, Files, Printer, Settings, Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface SidebarNavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

/**
 * Single source of truth for sidebar tabs, replacing the old hardcoded
 * NAV_ITEMS array. Each entry's `key` maps to a flag key resolved by the
 * backend (see tsm_backend/src/modules/feature-flags) and returned on
 * `user.flags` from GET /api/auth/profile.
 *
 * New tabs are added here AND registered as a FeatureFlag on the backend
 * with `defaultEnabled: false` — opt-in by construction.
 */
export const SIDEBAR_NAV_CONFIG: SidebarNavItem[] = [
  { key: 'gr', label: 'GR', icon: Files, href: '/gr' },
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { key: 'customers', label: 'Customers', icon: UsersIcon, href: '/customers' },
  { key: 'printing', label: 'Printing', icon: Printer, href: '/printing' },
  { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { key: 'iamdemo', label: 'I Am Demo', icon: Sparkles, href: '/demo' },
];

/**
 * Flags that existed before this system was introduced. If `user.flags` is
 * ever missing one of these keys entirely (stale cached profile mid-rollout,
 * transient backend hiccup), the frontend treats it as enabled so no
 * existing tab disappears. Any flag NOT in this list fails closed (absent =
 * off) — new/opt-in flags never accidentally show up.
 */
export const LEGACY_FLAG_KEYS = ['gr', 'dashboard', 'customers', 'printing', 'settings'];
