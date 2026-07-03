'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivateSchema, type ActivateInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api/errors';
import { Ticket, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ActivateForm() {
  const [showPopup, setShowPopup] = useState(true);
  const { activate, isActivating } = useAuth();

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPopup]);
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
        setError('couponCode', {
          type: 'manual',
          message: message,
        });
      },
    });
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Activate account
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Enter your coupon code to unlock full dashboard access
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
              <Ticket size={18} />
            </div>
            <input
              {...register('couponCode')}
              placeholder="Coupon Code (e.g. TMS-XXXXXXX)"
              className="w-full uppercase bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.couponCode && (
              <p className="text-xs text-red-500 mt-1">{errors.couponCode.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isActivating}
          className="w-full group relative overflow-hidden bg-sky-700 dark:bg-sky-600 text-white py-4 font-bold transition-all hover:bg-sky-800 dark:hover:bg-sky-500 disabled:opacity-50"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isActivating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Activate Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>
      </form>

      <div className="pt-4 text-center text-sm text-slate-500">
        Already active?{' '}
        <Link 
          href="/login" 
          className="font-bold text-slate-900 dark:text-sky-400 hover:underline underline-offset-4"
        >
          Sign in to your account
        </Link>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="h-12 w-12 rounded-full bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center mb-4 text-[#0369A1] dark:text-sky-400">
              <Ticket size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Activation Coupon Required
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 space-y-3">
              <p>
                Your account has been created successfully! To activate your account and get full dashboard access, you need an activation coupon code.
              </p>
              <p>
                This coupon code is provided by the administrator. Please contact the admin or reach out via our{' '}
                <Link href="/contact" className="font-bold text-[#0369A1] dark:text-sky-400 hover:underline">
                  Contact Page
                </Link>{' '}
                to request your code.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#0369A1] hover:bg-sky-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer"
            >
              Okay, I understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
