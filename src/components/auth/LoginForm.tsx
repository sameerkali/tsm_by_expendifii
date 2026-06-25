"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import { enterGuestMode } from "@/lib/demo/guest";

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
    posthog.capture("guest_mode_entered");
    enterGuestMode();
    window.location.href = "/gr";
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
              <Mail size={18} />
            </div>

            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              maxLength={254}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 px-10 py-4 outline-none focus:border-sky-500 dark:focus:border-sky-500 transition-colors peer placeholder:text-slate-400 dark:placeholder:text-slate-600 rounded-t-xl"
              suppressHydrationWarning
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
              <Lock size={18} />
            </div>

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              maxLength={30}
              className="w-full bg-slate-50 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 py-3 pl-10 pr-12 outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          suppressHydrationWarning
          className="w-full group relative overflow-hidden bg-sky-700 dark:bg-sky-600 text-white py-4 font-bold transition-all hover:bg-sky-800 dark:hover:bg-sky-500 disabled:opacity-50"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isLoggingIn ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </div>
        </button>
      </form>

      <div className="flex items-center justify-between pt-2 text-sm text-slate-500">
        <div>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-slate-900 dark:text-sky-400 hover:underline underline-offset-4"
          >
            Register your company
          </Link>
        </div>

        <Link
          href="/forgot-password"
          className="font-medium text-sky-600 hover:underline underline-offset-2"
        >
          Forgot password?
        </Link>
        <button
          type="button"
          onClick={handleGuestAccess}
          className="flex items-center gap-1 text-sm underline text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Use as guest
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
