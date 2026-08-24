'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { usePlanStatus } from '@/hooks/usePlanStatus';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { SIDEBAR_NAV_CONFIG } from '@/config/feature-flags';
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
  const router = useRouter();
  const { isAuthenticated, isLoading, user, isGuest } = useSession();
  const { isPlanActive } = usePlanStatus();
  const { isEnabled, isLoading: isFlagsLoading } = useFeatureFlags();
  const hasAnyEnabledTab = isGuest || SIDEBAR_NAV_CONFIG.some((item) => isEnabled(item.key));

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

  // Defense in depth: hiding a sidebar tab doesn't stop direct URL navigation
  // to its route, so re-check the current route's flag here too. The
  // corresponding API calls are also gated server-side (requireFeatureFlag),
  // so this only affects UX — it can never be the sole access control.
  //
  // Uses router.replace (client-side, no page reload) rather than
  // window.location.href — a hard reload here re-triggers the profile fetch
  // every time, and combined with /gr being hardcoded elsewhere as the
  // post-login landing route (useAuth.ts, middleware.ts), a full reload can
  // ping-pong between routes and exhaust the backend's rate limiter. The
  // fallback target is the first still-enabled tab (not a hardcoded route,
  // which could itself be disabled) and redirect is skipped entirely if
  // nothing is enabled — a fixed target that's also disabled would loop.
  useEffect(() => {
    if (isLoading || isFlagsLoading || !isAuthenticated || isGuest) return;
    const matchedItem = SIDEBAR_NAV_CONFIG.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    );
    if (!matchedItem || isEnabled(matchedItem.key)) return;

    const fallback = SIDEBAR_NAV_CONFIG.find((item) => isEnabled(item.key) && item.href !== pathname);
    if (fallback) router.replace(fallback.href);
  }, [pathname, isLoading, isFlagsLoading, isAuthenticated, isGuest, isEnabled, router]);

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
          <div className="absolute top-1/4 right-1/4 w-100 h-100 bg-sky-500/4 dark:bg-sky-500/2 blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-75 h-75 bg-blue-500/4 dark:bg-blue-500/2 blur-[100px] rounded-full -z-10 pointer-events-none" />

          {showActivationBanner && <ActivationBanner onClick={handleOpenActivation} />}

          <div className="flex-1 p-5 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-400">
              {!isFlagsLoading && !hasAnyEnabledTab ? (
                <div className="flex flex-col items-center justify-center text-center py-24 gap-2">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">No features enabled</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                    Your account doesn&apos;t have access to any modules right now. Contact your administrator.
                  </p>
                </div>
              ) : (
                children
              )}
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
