'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users as UsersIcon, Files, Printer, Settings, 
  LogOut, Menu, X, Bell, Search, User as UserIcon, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Customers', icon: UsersIcon, href: '/customers' },
  { label: 'GR', icon: Files, href: '/gr' },
  { label: 'Printing', icon: Printer, href: '/printing' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Desktop: expanded by default. Mobile: closed by default.
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close mobile sidebar on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 font-sans selection:bg-emerald-500/30 overflow-hidden">

      {/* ── Mobile Backdrop ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={cn(
        // Base
        "fixed inset-y-0 left-0 z-50 bg-slate-900 text-white border-r border-slate-800 transition-all duration-500 ease-in-out flex flex-col",
        // Mobile: slide in/out, always full width when open
        "lg:relative",
        // Mobile state
        isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
        // Desktop override (ignores mobile transform)
        isDesktopExpanded ? "lg:translate-x-0 lg:w-72" : "lg:translate-x-0 lg:w-20",
      )}>

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800 overflow-hidden shrink-0">
          <div className="min-w-[32px] h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="font-black text-white text-lg italic">T</span>
          </div>
          {(isMobileOpen || isDesktopExpanded) && (
            <span className="ml-3 text-xl font-black tracking-tighter text-white animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">
              TERMINAL<span className="text-emerald-500">_</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const showLabel = isMobileOpen || isDesktopExpanded;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!showLabel ? item.label : undefined}
                className={cn(
                  "flex items-center h-12 px-3 rounded-xl transition-all group relative",
                  showLabel ? "gap-3" : "justify-center",
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <item.icon size={20} className="shrink-0" />
                {showLabel && (
                  <span className="font-bold tracking-tight text-sm animate-in fade-in slide-in-from-left-2 duration-200">
                    {item.label}
                  </span>
                )}
                {isActive && showLabel && (
                  <ChevronRight size={14} className="ml-auto animate-in fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2 shrink-0">
          {(isMobileOpen || isDesktopExpanded) && (
            <div className="px-2 py-3 bg-slate-800/40 rounded-2xl flex items-center gap-3 mb-2 border border-slate-700/50">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                SF
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold tracking-tight text-white leading-none truncate">Sameer Faridi</p>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 mt-1">Admin</p>
              </div>
            </div>
          )}
          <button
            onClick={() => logout()}
            title="Sign Out"
            className={cn(
              "flex items-center h-12 px-3 w-full rounded-xl transition-all text-slate-400 hover:text-red-400 hover:bg-red-500/10 active:scale-95",
              !(isMobileOpen || isDesktopExpanded) && "justify-center"
            )}
          >
            <LogOut size={20} />
            {(isMobileOpen || isDesktopExpanded) && (
              <span className="ml-3 font-bold tracking-tight text-sm">Sign Out</span>
            )}
          </button>
        </div>

        {/* Collapsed decorative text (desktop only) */}
        {!isDesktopExpanded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none select-none hidden lg:block">
            <span className="text-3xl font-black text-slate-800 tracking-[0.5em] opacity-20 italic whitespace-nowrap">TMS</span>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 relative">

        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-6 md:px-8 border-b border-slate-100 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile burger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* Desktop collapse */}
            <button
              onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
              className="h-10 w-10 hidden lg:flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
              aria-label="Collapse sidebar"
            >
              {isDesktopExpanded ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h2 className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase italic hidden sm:block">
              SYSTEM ACTIVE
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Universal search..."
                className="h-11 w-56 lg:w-64 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
              />
            </div>
            <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-emerald-500 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 border-2 border-slate-50 dark:border-slate-900 rounded-full" />
            </button>
            <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-emerald-600 text-white hover:opacity-90 transition-all shadow-lg shadow-emerald-500/10">
              <UserIcon size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/[0.02] blur-[150px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/[0.02] blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
