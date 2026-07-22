'use client';

import { AlertTriangle } from 'lucide-react';

interface ActivationBannerProps {
  onClick: () => void;
}

export function ActivationBanner({ onClick }: ActivationBannerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full relative bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200/70 dark:border-amber-800/40 pl-1 cursor-pointer hover:bg-amber-100/80 dark:hover:bg-amber-950/30 transition-all duration-200 text-left"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-5 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="h-8 w-8 shrink-0 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center ring-1 ring-amber-200/50 dark:ring-amber-700/30 group-hover:ring-amber-300/60 dark:group-hover:ring-amber-600/40 transition-all">
            <AlertTriangle size={15} className="text-amber-600 dark:text-amber-400" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200/90 tracking-tight">
              Account not activated
            </p>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/60 mt-px">
              Click to activate with a coupon code &rarr;
            </p>
          </div>
        </div>
        <span className="shrink-0 ml-4 h-7 w-7 rounded-lg bg-amber-100/50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-200/60 dark:group-hover:bg-amber-800/40 group-hover:translate-x-0.5 transition-all">
          <AlertTriangle size={13} className="text-amber-500 dark:text-amber-400" />
        </span>
      </div>
    </button>
  );
}
