'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Mail size={18} />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full group relative overflow-hidden bg-slate-900 dark:bg-emerald-600 text-white py-4 font-bold transition-all hover:bg-slate-800 dark:hover:bg-emerald-500 disabled:opacity-50"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isLoggingIn ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>
      </form>

      <div className="pt-4 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link 
          href="/register" 
          className="font-bold text-slate-900 dark:text-emerald-400 hover:underline underline-offset-4"
        >
          Register your company
        </Link>
      </div>
    </div>
  );
}
