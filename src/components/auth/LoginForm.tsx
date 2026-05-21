'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { enterGuestMode } from '@/lib/demo/guest';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
  };

  const handleGuestAccess = () => {
    enterGuestMode();
    router.push('/gr');
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
              maxLength={254}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 px-10 py-4 outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors peer placeholder:text-slate-400 dark:placeholder:text-slate-600 rounded-t-xl"
              suppressHydrationWarning
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              maxLength={30}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-12 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          suppressHydrationWarning
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

      <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <p className="text-xs font-bold leading-relaxed text-emerald-800 dark:text-emerald-300">
          Just testing? Use guest mode to preview static GR, customer, printing, and dashboard screens. Demo mode is read-only, so create/edit/delete actions are disabled.
        </p>
        <button
          type="button"
          onClick={handleGuestAccess}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-emerald-700 transition-all hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 dark:border-emerald-800 dark:bg-slate-950 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
        >
          Use as guest
          <ArrowRight size={16} />
        </button>
      </div>

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
