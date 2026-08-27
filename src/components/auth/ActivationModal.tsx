'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivateSchema, type ActivateInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api/errors';
import { Modal } from '@/components/shared/Modal';
import { Ticket, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivationModal({ isOpen, onClose }: ActivationModalProps) {
  const { activate, isActivating } = useAuth();

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
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <span className="h-11 w-11 shrink-0 rounded-xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center ring-1 ring-sky-200/50 dark:ring-sky-800/30">
            <Ticket size={22} className="text-[#0369A1] dark:text-sky-400" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Activate your account
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Enter your coupon code to unlock full dashboard access. 
              Your plan details will appear once the code is applied.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="couponCode" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide uppercase">
              Coupon Code
            </label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none">
                <Ticket size={17} />
              </span>
              <input
                id="couponCode"
                {...register('couponCode')}
                placeholder="e.g. TMS-RBOQVJ-MR5BVA5R"
                maxLength={30}
                spellCheck={false}
                autoComplete="off"
                className="w-full uppercase bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 dark:focus:ring-sky-400/10 transition-all text-slate-900 dark:text-white placeholder:normal-case placeholder:text-slate-400/70"
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
            className="w-full group relative overflow-hidden bg-[#0369A1] hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm shadow-sky-500/10 hover:shadow-md hover:shadow-sky-500/20"
          >
            <div className="relative z-10 flex items-center justify-center gap-2 text-sm">
              {isActivating ? (
                <>
                  <Loader2 className="animate-spin" size={17} />
                  <span>Activating...</span>
                </>
              ) : (
                <>
                  <span>Activate Now</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        <div className="flex items-center gap-3 pt-3">
          <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
            <ShieldCheck size={13} />
            Secure activation
          </span>
          <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg px-4 py-3 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don&apos;t have a coupon?{' '}
            <Link
              href="/contact"
              className="font-semibold text-[#0369A1] dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 hover:underline transition-colors"
              onClick={onClose}
            >
              Contact your admin
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
}
