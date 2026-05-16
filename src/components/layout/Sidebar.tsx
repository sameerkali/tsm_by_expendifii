'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users as UsersIcon, Files, Printer, Settings,
  LogOut, Palette, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'GR', icon: Files, href: '/gr' },
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Customers', icon: UsersIcon, href: '/customers' },
  { label: 'Printing', icon: Printer, href: '/printing' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];
interface SidebarCoupon {
  expiresAt: string;
  durationDays: number;
}

interface SidebarProps {
  isMobileOpen: boolean;
  isDesktopExpanded: boolean;
  coupon: SidebarCoupon | null;
  onLogoutClick: () => void;
}

export function Sidebar({
  isMobileOpen,
  isDesktopExpanded,
  coupon,
  onLogoutClick
}: SidebarProps) {
  const pathname = usePathname();
  const showLabel = isMobileOpen || isDesktopExpanded;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 flex flex-col",
      "bg-white dark:bg-slate-900",
      "border-r border-slate-200 dark:border-slate-800",
      "transition-all duration-300 ease-in-out",
      "lg:relative",
      isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
      isDesktopExpanded ? "lg:translate-x-0 lg:w-72" : "lg:translate-x-0 lg:w-20",
    )}>
      {/* Logo */}
      <div className="h-20 flex items-center px-5 border-b border-slate-100 dark:border-slate-800 overflow-hidden shrink-0">
        {showLabel && (
          <div>
            <span className="ml-3 text-xl font-black tracking-tighter text-slate-900 dark:text-white animate-in fade-in slide-in-from-left-2 duration-200 whitespace-nowrap">
              TSM<span className="text-emerald-500">_</span>
            </span>
            <span className="ml-3 text-[10px] font-bold tracking-tight text-slate-900 dark:text-white animate-in fade-in slide-in-from-left-2 duration-200 whitespace-nowrap">
              By Expendifii
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!showLabel ? item.label : undefined}
              className={cn(
                "flex items-center h-11 px-3 rounded-xl transition-all group relative",
                showLabel ? "gap-3" : "justify-center",
                isActive
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                  : [
                    "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
                    "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800",
                  ]
              )}
            >
              <item.icon size={19} className="shrink-0" />
              {showLabel && (
                <span className="font-semibold text-sm tracking-tight animate-in fade-in duration-150">
                  {item.label}
                </span>
              )}
              {isActive && showLabel && (
                <ChevronRight size={14} className="ml-auto opacity-70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card + Sign Out */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1 shrink-0">
        {showLabel && (
          <div>
            {(() => {
              if (!coupon) return (
                <div className="px-2 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 text-center">No active plan</p>
                </div>
              );

              const today = new Date();
              const expDate = new Date(coupon.expiresAt);
              const daysLeft = Math.max(0, Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
              const totalDays = coupon.durationDays;
              const pct = totalDays > 0 ? (daysLeft / totalDays) * 100 : 0;

              const color = pct <= 20
                ? { text: 'text-red-500', bg: 'bg-red-500', bar: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800/50' }
                : pct <= 50
                  ? { text: 'text-amber-500', bg: 'bg-amber-500', bar: 'bg-amber-100 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800/50' }
                  : { text: 'text-emerald-500', bg: 'bg-emerald-500', bar: 'bg-emerald-100 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800/50' };

              return (
                <div className={cn('px-2.5 py-2 rounded-xl border', color.bar, color.border)}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Plan</span>
                    <span className={cn('text-xs font-black', color.text)}>{daysLeft}d left</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', color.bg)} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Sign Out Button */}
        <button
          onClick={onLogoutClick}
          title="Sign Out"
          className={cn(
            "flex items-center h-11 px-3 w-full rounded-xl transition-all",
            "text-slate-500 dark:text-slate-400",
            "hover:text-red-600 dark:hover:text-red-400",
            "hover:bg-red-50 dark:hover:bg-red-500/10",
            "active:scale-95",
            !showLabel && "justify-center"
          )}
        >
          <LogOut size={18} />
          {showLabel && (
            <span className="ml-3 font-semibold text-sm">Sign Out</span>
          )}
        </button>
      </div>

      {/* Collapsed label decoration */}
      {!isDesktopExpanded && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none select-none hidden lg:block">
          <span className="text-2xl font-black text-slate-200 dark:text-slate-800 tracking-[0.5em] italic whitespace-nowrap">
            TSM
          </span>
        </div>
      )}
    </aside>
  );
}
