'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enterGuestMode } from '@/lib/demo/guest';

/**
 * /live-demo — mirrors the "Use as guest" button on the login screen.
 * Sets the guest cookie + localStorage flag then redirects to the dashboard.
 */
export default function LiveDemoPage() {
  const router = useRouter();

  useEffect(() => {
    enterGuestMode();
    router.replace('/gr');
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <svg
          className="animate-spin h-10 w-10 text-[#0369A1]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Starting your demo experience…
        </p>
      </div>
    </div>
  );
}
