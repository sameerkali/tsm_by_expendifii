'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { Sidebar } from './Sidebar';
import { Topbar } from './TopBar';
import { Spinner } from '../ui';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user, coupon } = useSession();

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== 'undefined') {
      console.warn('User is not authenticated. Redirecting to login.');
      localStorage.removeItem('profile');
      window.location.href = '/login';
    }
  }, [isLoading, isAuthenticated]);

  // Close mobile sidebar on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
  }, [pathname]);

  // Close mobile sidebar on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 space-y-6">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-sky-500/30 overflow-hidden">
      {/* ── Mobile Backdrop ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <Sidebar 
        isMobileOpen={isMobileOpen}
        isDesktopExpanded={isDesktopExpanded}
        coupons={user?.coupons ?? []}
      />

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Topbar */}
        <Topbar 
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          isDesktopExpanded={isDesktopExpanded}
          setIsDesktopExpanded={setIsDesktopExpanded}
          user={user}
          isGuest={false}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar relative">
          {/* Ambient blobs */}
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.04] dark:bg-sky-500/[0.02] blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.04] dark:bg-blue-500/[0.02] blur-[100px] rounded-full -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
