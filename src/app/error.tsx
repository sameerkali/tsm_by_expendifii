'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="h-20 w-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="text-red-600 dark:text-red-500" size={40} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            An unexpected error occurred. We have been notified and are looking into it.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-emerald-600 text-white py-3 px-6 font-bold hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all active:scale-[0.98]"
          >
            <RefreshCcw size={18} />
            Try again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 px-6 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
          >
            <Home size={18} />
            Back to home
          </Link>
        </div>

        {error.digest && (
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
