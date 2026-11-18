'use client';

import React, { useId } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useModalDialog } from '@/hooks/useModalDialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
  /** Accessible name when there is no `title`. */
  ariaLabel?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full h-full max-h-full rounded-none',
};

/**
 * Modal built on the native <dialog> (see hooks/useModalDialog.ts): the
 * browser handles Esc, focus, the inert page behind and the top layer.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
  ariaLabel,
}: ModalProps) {
  const dismiss = closeOnOverlayClick ? 'any' : 'closerequest';
  const dialogRef = useModalDialog(isOpen, onClose, dismiss);
  const titleId = useId();

  return (
    <dialog
      ref={dialogRef}
      closedby={dismiss}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : ariaLabel}
      className={cn(
        'm-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-h-[90dvh] overflow-hidden p-0 open:flex flex-col bg-white dark:bg-slate-950 text-inherit rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-900 backdrop:bg-black/45 backdrop:backdrop-blur-[2px]',
        sizeClasses[size],
        className
      )}
    >
      {isOpen && (
        <>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-50 dark:border-slate-900/60 shrink-0">
              {title ? (
                typeof title === 'string' ? (
                  <h2 id={titleId} className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                    {title}
                  </h2>
                ) : (
                  <div id={titleId}>{title}</div>
                )
              ) : (
                <div />
              )}

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          )}

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 min-h-0">
            {children}
          </div>
        </>
      )}
    </dialog>
  );
}
