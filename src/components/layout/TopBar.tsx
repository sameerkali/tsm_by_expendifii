'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { User } from '@/types/session';

interface TopbarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
  isDesktopExpanded: boolean;
  setIsDesktopExpanded: (val: boolean) => void;
  user: User | undefined;
  isGuest?: boolean;
}

export function Topbar({
  isMobileOpen,
  setIsMobileOpen,
  isDesktopExpanded,
  setIsDesktopExpanded,
  user,
  isGuest = false
}: TopbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-5 md:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-[1px] sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile burger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0369A1] text-slate-600 dark:text-slate-400 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        {/* Desktop collapse */}
        <button
          onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
          className="h-10 w-10 hidden lg:flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0369A1] text-slate-600 dark:text-slate-400 transition-colors"
          aria-label={isDesktopExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isDesktopExpanded ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <Link
        href="/settings"
        className="flex items-center gap-4 group transition-all hover:opacity-80"
      >
        <div className="flex flex-col items-end mr-1">
          {isGuest && (
            <span className="mb-1 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              Guest Preview
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
            {user?.name?.toUpperCase() || '...'}
          </h2>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 dark:from-sky-500 dark:to-sky-700 flex items-center justify-center text-white shadow-lg border-2 border-slate-200 dark:border-sky-400/20 transition-transform group-hover:scale-105 active:scale-95 overflow-hidden shrink-0">
          {user?.company?.logoUrl ? (
            <img src={user.company.logoUrl} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-black">
              {user?.name?.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) || '?'}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}
