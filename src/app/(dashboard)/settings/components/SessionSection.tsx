'use client';

import React, { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { LogoutModal } from '@/components/layout/LogoutModal';

interface SessionSectionProps {
  logout: () => void;
  isLoggingOut: boolean;
}

export function SessionSection({ logout, isLoggingOut }: SessionSectionProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <LogoutModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          logout();
        }}
        isLoading={isLoggingOut}
        title="Sign Out Session"
        description="Are you sure you want to end your current session? You will need to log in again to access your dashboard."
      />

      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Session</h2>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Sign out of your account</p>
              <p className="text-xs text-slate-400 mt-0.5">This will end your current session.</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowLogoutConfirm(true)}
              disabled={isLoggingOut}
              className="h-10 px-6 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2"
            >
              {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
              Sign Out
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

