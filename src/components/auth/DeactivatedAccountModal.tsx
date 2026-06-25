'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, TriangleAlert } from 'lucide-react';
import { exitGuestMode } from '@/lib/demo/guest';

const ACCOUNT_DEACTIVATED_EVENT = 'account-deactivated';

export function DeactivatedAccountModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setMessage(detail.message || 'Your account has been deactivated.');
      setIsOpen(true);
    };
    window.addEventListener(ACCOUNT_DEACTIVATED_EVENT, handler);
    return () => window.removeEventListener(ACCOUNT_DEACTIVATED_EVENT, handler);
  }, []);

  const handleLogout = useCallback(() => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('profile');
      sessionStorage.removeItem('account_deactivated');
      exitGuestMode();
    }
    queryClient.clear();
    // Redirect with a flag so the middleware clears the httpOnly cookie server-side
    // and lets the user through to /login instead of redirecting back to /gr.
    window.location.href = '/login?reason=deactivated';
  }, [isLoggingOut, queryClient]);

  const handleBackdropClick = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleLogout();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, handleLogout]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop — clicking anywhere triggers logout */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleBackdropClick}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-950 rounded-[2rem] shadow-2xl border border-red-100 dark:border-red-900/30 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-250 ease-out"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="deactivation-title"
      >
        {/* Icon */}
        <div className="flex justify-center pt-10 pb-2">
          <div className="h-16 w-16 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center">
            <TriangleAlert className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <div className="px-8 pb-4 text-center">
          <h2
            id="deactivation-title"
            className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic"
          >
            Account Deactivated
          </h2>
        </div>

        {/* Message */}
        <div className="px-8 pb-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {message}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
            You will be logged out automatically.
          </p>
        </div>

        {/* Action — single logout button */}
        <div className="px-8 pb-8">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoggingOut ? (
              <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
