'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivateSchema, type ActivateInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { Ticket, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ActivateForm() {
  const { activate, isActivating } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivateInput>({
    resolver: zodResolver(ActivateSchema),
  });

  const onSubmit = (data: ActivateInput) => {
    activate(data);
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Ticket size={18} />
            </div>
            <input
              {...register('couponCode')}
              placeholder="Coupon Code (e.g. TMS-XXXXXXX)"
              className="w-full uppercase bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.couponCode && (
              <p className="text-xs text-red-500 mt-1">{errors.couponCode.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isActivating}
          className="w-full group relative overflow-hidden bg-slate-900 dark:bg-emerald-600 text-white py-4 font-bold transition-all hover:bg-slate-800 dark:hover:bg-emerald-500 disabled:opacity-50"
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
          href="/" 
          className="font-bold text-slate-900 dark:text-emerald-400 hover:underline underline-offset-4"
        >
          Sign in to your account
        </Link>
      </div>
    </div>
  );
}
