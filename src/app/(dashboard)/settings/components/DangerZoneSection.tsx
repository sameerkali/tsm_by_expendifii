'use client';

import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';

interface DangerZoneSectionProps {
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
}

export function DangerZoneSection({ showDeleteConfirm, setShowDeleteConfirm }: DangerZoneSectionProps) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-[2rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-red-100 dark:border-red-900/30">
        <h2 className="text-lg font-black tracking-tight text-red-600 dark:text-red-400 uppercase italic flex items-center gap-2">
          <AlertTriangle size={18} />Danger Zone
        </h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">These actions are irreversible. Proceed with caution.</p>
      </div>
      <div className="p-8 space-y-4">
        {!showDeleteConfirm ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Request Account Deletion</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Submit a deletion request. The Expendifii admin will review and approve. All data will be permanently erased.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              className="h-10 px-6 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0 ml-4"
            >
              <Trash2 size={16} />Request Deletion
            </Button>
          </div>
        ) : (
          <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-700/50 space-y-4">
            <p className="text-sm font-bold text-red-700 dark:text-red-300">
              Are you absolutely sure? This will permanently delete all GR records, customer data, and your company account.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="danger" className="h-10 px-6 font-bold text-sm">
                Yes, Submit Deletion Request
              </Button>
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)} className="h-10 px-4 text-sm font-bold">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
