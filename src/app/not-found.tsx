'use client';

import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 font-sans selection:bg-emerald-500/30">
      <div className="max-w-md w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Error Code & Icon */}
        <div className="relative inline-block">
          <div className="text-[12rem] font-black leading-none text-slate-200 dark:text-slate-900 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 bg-emerald-500 rounded-2xl rotate-12 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Search className="text-white -rotate-12" size={48} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
            Lost in transit?
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved to a different terminal.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-emerald-600 text-white py-4 px-8 font-bold hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-700 py-4 px-8 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>

        {/* Branding Footer */}
        <div className="pt-12 text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em]">
          TMS by Expendifii — System Integrity Check
        </div>
      </div>
    </div>
  );
}
