'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2, Sparkles } from 'lucide-react';
import demoApi from '@/lib/api/demo.api';
import { DEMO_KEYS } from '@/config/query-keys';
import { getApiErrorMessage } from '@/lib/api/errors';

export function DemoClient() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: DEMO_KEYS.message(),
    queryFn: () => demoApi.getDemoMessage(),
  });

  const message = data?.data?.message;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-xs font-black tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase italic">
            FEATURE FLAG REFERENCE
          </p>
          <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">I Am Demo</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-3 py-10">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            <span className="text-sm font-medium">Loading message from backend...</span>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center text-red-400 gap-3 py-10">
            <span className="text-sm font-medium">
              {getApiErrorMessage(error, 'Failed to load the demo message.', 'general')}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
            <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Sparkles size={26} />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
