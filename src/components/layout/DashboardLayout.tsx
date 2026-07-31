'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { usePlanStatus } from '@/hooks/usePlanStatus';
import { Sidebar } from './Sidebar';
import { Topbar } from './TopBar';
import { Spinner } from '../ui';
import { DeactivatedAccountModal } from '../auth/DeactivatedAccountModal';
import { ActivationBanner } from '../auth/ActivationBanner';
import { ActivationImageModal } from '../auth/ActivationImageModal';
import { OPEN_ACTIVATION_MODAL_EVENT } from '@/lib/activation-modal';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user, isGuest } = useSession();
  const { isPlanActive } = usePlanStatus();

  const showActivationBanner = !isLoading && isAuthenticated && !isGuest && !isPlanActive;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== 'undefined') {
      // If the account was deactivated, don't redirect — the DeactivatedAccountModal
      // handles the flow (displays the error and forces logout, clearing the cookie first).
      if (sessionStorage.getItem('account_deactivated') === 'true') return;
      console.warn('User is not authenticated. Redirecting to login.');
      localStorage.removeItem('profile');
      window.location.href = '/login';
    }
  }, [isLoading, isAuthenticated]);

  // Listen for custom event to open activation modal (from deep children)
  useEffect(() => {
    const handler = () => setIsActivationModalOpen(true);
    window.addEventListener(OPEN_ACTIVATION_MODAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_ACTIVATION_MODAL_EVENT, handler);
  }, []);

  const handleOpenActivation = useCallback(() => {
    setIsActivationModalOpen(true);
  }, []);

  const handleCloseActivation = useCallback(() => {
    setIsActivationModalOpen(false);
  }, []);

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

  if (!hydrated || isLoading || !isAuthenticated) {
    return (
      <>
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 space-y-6">
          <Spinner />
        </div>
        <DeactivatedAccountModal />
      </>
    );
  }

  return (
    <>
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
        onActivateClick={handleOpenActivation}
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
        <main className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col">
          {/* Ambient blobs */}
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.04] dark:bg-sky-500/[0.02] blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/[0.04] dark:bg-blue-500/[0.02] blur-[100px] rounded-full -z-10 pointer-events-none" />

          {showActivationBanner && <ActivationBanner onClick={handleOpenActivation} />}

          <div className="flex-1 p-5 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
      <DeactivatedAccountModal />
      <ActivationImageModal isOpen={isActivationModalOpen} onClose={handleCloseActivation} />
    </>
  );
}
