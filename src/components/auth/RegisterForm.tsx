'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Lock, Phone, Building, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RegisterForm() {
  const { register: registerUser, isRegistering } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Join the network
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Create your company account to get started
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <User size={18} />
            </div>
            <input
              {...register('name')}
              placeholder="Full Name"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Mail size={18} />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="Work Email"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Phone size={18} />
            </div>
            <input
              {...register('phone')}
              placeholder="Phone Number"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Building size={18} />
            </div>
            <input
              {...register('companyName')}
              placeholder="Company Name"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.companyName && (
              <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>
            )}
          </div>
        </div>

        <div className="relative group pt-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              {...register('password')}
              type="password"
              placeholder="Create Password"
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-4 outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isRegistering}
            className="w-full group relative overflow-hidden bg-slate-900 dark:bg-emerald-600 text-white py-4 font-bold transition-all hover:bg-slate-800 dark:hover:bg-emerald-500 disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isRegistering ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </div>
      </form>

      <div className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link 
          href="/login" 
          className="font-bold text-slate-900 dark:text-emerald-400 hover:underline underline-offset-4"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}
