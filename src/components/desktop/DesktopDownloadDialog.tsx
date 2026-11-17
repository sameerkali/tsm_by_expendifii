'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { CheckCircle2, Download, Loader2, X } from 'lucide-react';
import { apiErrorMessage, desktopApi } from '@/lib/api/desktop.api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface DesktopDownloadDialogProps {
  open: boolean;
  onClose: () => void;
}

type Phase = 'form' | 'sending' | 'sent';

/**
 * "Email me the download link" dialog for BiltyOne Desktop. The backend
 * emails the installer link the admin set in the panel, plus a link to
 * request a free licence key.
 */
export function DesktopDownloadDialog({ open, onClose }: DesktopDownloadDialogProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('form');
  const [sentTo, setSentTo] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();
  const inputId = useId();
  const helpId = useId();
  const errorId = useId();

  const sending = phase === 'sending';

  // Focus the field on open; give focus back to whatever opened us on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      opener?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (phase === 'sent') doneRef.current?.focus();
  }, [phase]);

  // Escape closes; Tab stays inside the dialog; the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !sending) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, sending, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) {
      setError('Enter your email address.');
      inputRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError('Enter a valid email address, like name@company.com.');
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setPhase('sending');
    try {
      await desktopApi.requestDownloadLink(value);
      setSentTo(value);
      setPhase('sent');
    } catch (err) {
      setError(apiErrorMessage(err, "We couldn't send the email. Please try again in a few minutes."));
      setPhase('form');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const startOver = () => {
    setPhase('form');
    setError(null);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center" data-lenis-prevent>
      <div
        aria-hidden="true"
        className="desktop-dialog-backdrop absolute inset-0 bg-slate-950/50"
        onClick={sending ? undefined : onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="desktop-dialog-panel relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={sending}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>

        {phase === 'sent' ? (
          <div className="text-center" aria-live="polite">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 size={24} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 id={titleId} className="mt-5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Check your inbox
            </h2>
            <p id={descId} className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We sent the download link to{' '}
              <span className="font-semibold break-all text-slate-900 dark:text-white">{sentTo}</span>. It usually
              arrives within a minute. If you don&apos;t see it, check your Spam or Promotions folder.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              The email also has a link to get your free licence key.
            </p>
            <div className="mt-7 flex flex-col gap-2">
              <button
                ref={doneRef}
                type="button"
                onClick={onClose}
                className="w-full cursor-pointer rounded-xl bg-[#0369A1] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-800 active:scale-[0.98] dark:bg-sky-600 dark:hover:bg-sky-500"
              >
                Done
              </button>
              <button
                type="button"
                onClick={startOver}
                className="w-full cursor-pointer rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Use a different email
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#0369A1] dark:bg-sky-500/10 dark:text-sky-400">
              <Download size={22} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 id={titleId} className="mt-5 pr-8 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Get BiltyOne for Windows
            </h2>
            <p id={descId} className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Enter your email and we&apos;ll send you the download link, plus a link to get your free licence key.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6">
              <div className="flex flex-col gap-2">
                <label htmlFor={inputId} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id={inputId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  maxLength={254}
                  placeholder="name@company.com"
                  value={email}
                  disabled={sending}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${helpId} ${errorId}` : helpId}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 transition-colors outline-none focus:border-[#0369A1] focus:ring-4 focus:ring-sky-600/15 disabled:opacity-60 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-sky-400 dark:focus:ring-sky-400/20 ${
                    error ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                <p id={helpId} className="text-xs text-slate-600 dark:text-slate-400">
                  We only use it to send you the link.
                </p>
                {error && (
                  <p id={errorId} role="alert" className="text-sm font-medium text-red-700 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0369A1] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/15 transition-colors hover:bg-sky-800 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 dark:bg-sky-600 dark:hover:bg-sky-500"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending link
                  </>
                ) : (
                  'Email me the link'
                )}
              </button>

              <p className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
                Windows 10 or 11, 64-bit. See our{' '}
                <Link href="/privacy-policy" className="font-medium text-[#0369A1] underline-offset-2 hover:underline dark:text-sky-400">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default DesktopDownloadDialog;
