'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

interface InactiveAccountModalProps {
  isVisible: boolean;
}

export function InactiveAccountModal({ isVisible }: InactiveAccountModalProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!isVisible || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="inactive-title"
      aria-describedby="inactive-desc"
      onClick={() => setDismissed(true)}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-14 w-14 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-5 text-red-500 dark:text-red-400">
          <AlertTriangle size={28} />
        </div>

        <h2
          id="inactive-title"
          className="text-xl font-bold text-slate-900 dark:text-white mb-2"
        >
          Account Not Activated
        </h2>

        <div
          id="inactive-desc"
          className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 space-y-3"
        >
          <p>
            Your account is registered but <span className="font-bold text-red-500">not yet activated</span>.
            To use any features of TSM — like creating GRs, managing customers, or accessing reports — you need an active plan.
          </p>
          <p>
            Please activate your account using a coupon code, or contact the administrator to get one.
          </p>
        </div>

        <div className="w-full space-y-3">
          <Link
            href="/activate"
            className="flex items-center justify-center w-full bg-[#0369A1] hover:bg-sky-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-sky-500/10"
          >
            Go to Activation Page
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 px-4 rounded-xl transition-all text-sm"
          >
            Contact Admin for Coupon Code
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="w-full text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 py-2 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
