'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Truck
} from 'lucide-react';
import { useSession } from '@/hooks/useSession';
import { Sidebar } from './Sidebar';
import { Topbar } from './TopBar';



export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user, coupon, isGuest } = useSession();

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== 'undefined') {
      console.warn('User is not authenticated. Redirect disabled for debugging.');
      // window.location.href = '/';
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
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 space-y-6">
        <div className="relative flex items-center justify-center w-24 h-24 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-emerald-500/10 border border-slate-100 dark:border-slate-800/60">
          {/* Subtle ping effect behind the truck */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-emerald-500/30 animate-ping" />
          
          {/* Bouncing Truck Icon */}
          <Truck size={40} className="text-emerald-500 animate-bounce drop-shadow-md" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">
            TMS Workspace
          </p>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30 overflow-hidden">

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
        coupon={coupon}
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
          isGuest={isGuest}
        />

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
