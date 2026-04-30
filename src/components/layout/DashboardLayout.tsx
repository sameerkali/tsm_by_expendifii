'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users as UsersIcon, Files, Printer, Settings,
  LogOut, Menu, X, Bell, Search, User as UserIcon, ChevronRight,
  Palette, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { Modal, Button } from '@/components/ui';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Customers', icon: UsersIcon, href: '/customers' },
  { label: 'GR', icon: Files, href: '/gr' },
  { label: 'Printing', icon: Printer, href: '/printing' },
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'Design System', icon: Palette, href: '/design-system' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isAuthenticated, isLoading } = useSession();

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, [isLoading, isAuthenticated]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close mobile sidebar on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
        setShowLogoutConfirm(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const showLabel = isMobileOpen || isDesktopExpanded;

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30 overflow-hidden">

      {/* ── Logout Confirmation Modal ── */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Sign out?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLogoutConfirm(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={() => { setShowLogoutConfirm(false); logout(); }} className="flex-1 flex items-center justify-center gap-2">
              <LogOut size={16} />Sign Out
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              You'll be logged out of your current session. Any unsaved changes may be lost.
            </p>
          </div>
        </div>
      </Modal>

      {/* ── Mobile Backdrop ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={cn(
        // Light mode: white sidebar with slate borders
        // Dark mode: slate-900 sidebar
        "fixed inset-y-0 left-0 z-50 flex flex-col",
        "bg-white dark:bg-slate-900",
        "border-r border-slate-200 dark:border-slate-800",
        "transition-all duration-300 ease-in-out",
        "lg:relative",
        // Mobile
        isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
        // Desktop
        isDesktopExpanded ? "lg:translate-x-0 lg:w-72" : "lg:translate-x-0 lg:w-20",
      )}>

        {/* Logo */}
        <div className="h-20 flex items-center px-5 border-b border-slate-100 dark:border-slate-800 overflow-hidden shrink-0">
          <div className="min-w-[32px] h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
            <span className="font-black text-white text-lg italic">T</span>
          </div>
          {showLabel && (
            <span className="ml-3 text-xl font-black tracking-tighter text-slate-900 dark:text-white animate-in fade-in slide-in-from-left-2 duration-200 whitespace-nowrap">
              TERMINAL<span className="text-emerald-500">_</span>
            </span>
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
                        // Light mode inactive
                        "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
                        // Dark mode inactive
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
            <div className="px-3 py-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center gap-3 mb-1 border border-slate-100 dark:border-slate-700/50">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0">
                SF
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none truncate">
                  Sameer Faridi
                </p>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 mt-0.5">
                  Admin
                </p>
              </div>
            </div>
          )}

          {/* Sign Out Button — shows confirmation modal */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
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
              TMS
            </span>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">

        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-5 md:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile burger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-600 dark:text-slate-400 transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* Desktop collapse */}
            <button
              onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
              className="h-10 w-10 hidden lg:flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Collapse sidebar"
            >
              {isDesktopExpanded ? <X size={18} /> : <Menu size={18} />}
            </button>
            <span className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase italic hidden sm:block">
              SYSTEM ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-52 lg:w-64 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>

            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-emerald-600 text-white hover:opacity-90 transition-all shadow-md">
              <UserIcon size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar relative">
          {/* Ambient blobs */}
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.04] dark:bg-blue-500/[0.02] blur-[100px] rounded-full -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
