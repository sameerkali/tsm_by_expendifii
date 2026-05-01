'use client';

import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'default';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  variant = 'default',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="px-8 pt-8 pb-2">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'h-12 w-12 rounded-2xl flex items-center justify-center shrink-0',
                isDanger
                  ? 'bg-red-100 dark:bg-red-500/10 text-red-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500',
              )}
            >
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="h-11 px-5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'h-11 px-6 rounded-xl font-bold text-sm text-white transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2',
              isDanger
                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20'
                : 'bg-slate-900 dark:bg-emerald-600 hover:opacity-90 shadow-lg shadow-emerald-500/20',
            )}
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
