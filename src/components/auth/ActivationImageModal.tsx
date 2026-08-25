'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivateSchema, type ActivateInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api/errors';
import { Ticket, Loader2, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

interface ActivationImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format&fit=crop';

export function ActivationImageModal({ isOpen, onClose }: ActivationImageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { activate, isActivating } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ActivateInput>({
    resolver: zodResolver(ActivateSchema),
  });

  const onSubmit = (data: ActivateInput) => {
    activate(data, {
      onError: (err) => {
        const message = getApiErrorMessage(err, undefined, 'auth');
        setError('couponCode', { type: 'manual', message });
      },
    });
  };


  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] animate-in zoom-in-95 fade-in duration-200">
        {/* ── Image Side ── */}
        <div className="relative w-full md:w-[280px] lg:w-[320px] shrink-0 h-48 md:h-auto bg-slate-200 dark:bg-slate-800 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              <div className="h-8 w-8 rounded-full border-2 border-slate-300 dark:border-slate-600 border-t-transparent animate-spin" />
            </div>
          )}
          <img
            src={'/landingImg01.webp'}
            alt=""
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">Bilty Pro Platform</p>
            <p className="text-lg font-bold text-white leading-tight mt-0.5">Activate Your<br />Account</p>
          </div>
        </div>

        {/* ── Content Side ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header with close */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <div className="flex items-center gap-2">
              <span className="" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            <div>
              <h2 className="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">
                Enter your coupon code
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Your account is registered but needs a coupon code to unlock dashboard access.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="imageModalCoupon" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide uppercase">
                  Coupon Code
                </label>
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none">
                    <Ticket size={16} />
                  </span>
                  <input
                    id="imageModalCoupon"
                    {...register('couponCode')}
                    placeholder="e.g. TMS-RBOQVJ-MR5BVA5R"
                    maxLength={30}
                    spellCheck={false}
                    autoComplete="off"
                    className="w-full uppercase bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 dark:focus:ring-sky-400/10 transition-all text-slate-900 dark:text-white placeholder:normal-case placeholder:text-slate-400/70"
                  />
                </div>
                {errors.couponCode && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1.5" role="alert">
                    <span className="h-1 w-1 rounded-full bg-red-500 shrink-0" />
                    {errors.couponCode.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isActivating}
                className="w-full bg-[#0369A1] hover:bg-sky-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-sky-500/10 hover:shadow-md hover:shadow-sky-500/20 text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  {isActivating ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Activating...
                    </>
                  ) : (
                    <>
                      Activate Now
                      <ArrowRight size={15} />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="pt-1">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg px-4 py-3 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Need a coupon?{' '}
                  <Link
                    href="/contact"
                    className="font-semibold text-[#0369A1] dark:text-sky-400 hover:underline transition-colors"
                    onClick={onClose}
                  >
                    Contact your admin &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
