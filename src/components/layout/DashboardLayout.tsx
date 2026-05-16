'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { Sidebar } from './Sidebar';
import { LogoutModal } from './LogoutModal';
import { Topbar } from './TopBar';



export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isAuthenticated, isLoading, user, coupon } = useSession();

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

      <LogoutModal 
        isOpen={showLogoutConfirm} 
        onClose={() => setShowLogoutConfirm(false)} 
        onConfirm={() => { setShowLogoutConfirm(false); logout(); }} 
      />

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
        onLogoutClick={() => setShowLogoutConfirm(true)}
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
