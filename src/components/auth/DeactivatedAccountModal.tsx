'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useModalDialog } from '@/hooks/useModalDialog';
import { LogOut, TriangleAlert } from 'lucide-react';
import { exitGuestMode } from '@/lib/demo/guest';

const ACCOUNT_DEACTIVATED_EVENT = 'account-deactivated';

export function DeactivatedAccountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();

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

  // Esc and a click on the backdrop both log out, same as the button.
  const dialogRef = useModalDialog(isOpen, handleLogout);

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      role="alertdialog"
      aria-labelledby="deactivation-title"
      aria-describedby="deactivation-message"
      className="m-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-md p-0 open:flex flex-col overflow-hidden bg-white dark:bg-slate-950 text-inherit rounded-[2rem] shadow-2xl border border-red-100 dark:border-red-900/30 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      {isOpen && (
        <>
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
            <p id="deactivation-message" className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
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
                <>
                  <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                  <span className="sr-only">Logging out</span>
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  Logout
                </>
              )}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
