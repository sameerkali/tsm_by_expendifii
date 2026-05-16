'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui';

export function DownloadDataSection() {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
        <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Download Data</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">Export all your company data to Excel format.</p>
      </div>
      <div className="p-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">GR Records</p>
              <p className="text-xs text-slate-400 mt-0.5">All goods receipts in Excel</p>
            </div>
            <Button variant="primary" className="h-10 px-4 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700">
              <Download size={14} />Export
            </Button>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Customer Records</p>
              <p className="text-xs text-slate-400 mt-0.5">Full customer database in Excel</p>
            </div>
            <Button variant="primary" className="h-10 px-4 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700">
              <Download size={14} />Export
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
