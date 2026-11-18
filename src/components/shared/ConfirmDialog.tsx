'use client';

import React, { useId } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useModalDialog } from '@/hooks/useModalDialog';

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
  // While the action runs, only the dialog's own buttons can close it.
  const dismiss = isLoading ? 'none' : 'any';
  const dialogRef = useModalDialog(isOpen, onClose, dismiss);
  const titleId = useId();
  const messageId = useId();

  const isDanger = variant === 'danger';

  return (
    <dialog
      ref={dialogRef}
      closedby={dismiss}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      className="m-auto w-[calc(100%-2rem)] max-w-md p-0 overflow-hidden bg-white dark:bg-slate-950 text-inherit rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 backdrop:bg-black/40 backdrop:backdrop-blur-[1px]"
    >
      {isOpen && (
        <>
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
                <h3 id={titleId} className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p id={messageId} className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
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
              data-autofocus
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
                  : 'bg-sky-700 dark:bg-sky-600 hover:opacity-90 shadow-lg shadow-sky-500/25',
              )}
            >
              {isLoading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
              {confirmLabel}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
