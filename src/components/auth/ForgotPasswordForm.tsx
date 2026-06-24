'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import authApi from '@/lib/api/auth.api';
import { cn } from '@/lib/utils/cn';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const otpInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus OTP input when switching to reset step
  useEffect(() => {
    if (step === 'reset' && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrors({ email: 'Email address is required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const res = await authApi.requestPasswordReset(trimmedEmail);
      if ((res as any).success) {
        toast.success('If an account with that email exists, a password reset OTP has been sent.');
        setStep('reset');
      } else {
        const errorMsg = (res as any).message ?? (res as any).error ?? 'Failed to send OTP';
        setErrors({ email: errorMsg });
        toast.error(errorMsg);
      }
    } catch (err: any) {
      const errorMsg = err?.message ?? err?.error ?? 'Network error';
      setErrors({ email: errorMsg });
      toast.error(errorMsg);
    }
    setLoading(false);
  };

  const executeReset = async (otpCode: string, pass: string, confirmPass: string) => {
    if (loading) return;

    const newErrors: typeof errors = {};
    if (!otpCode) {
      newErrors.otp = 'OTP code is required.';
    } else if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
      newErrors.otp = 'OTP must be exactly 6 digits.';
    }

    if (!pass) {
      newErrors.newPassword = 'New password is required.';
    } else if (pass.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters.';
    }

    if (!confirmPass) {
      newErrors.confirmPassword = 'Please confirm your new password.';
    } else if (pass !== confirmPass) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const handleApiError = (errorMsg: string) => {
      const msgLower = errorMsg.toLowerCase();
      if (msgLower.includes('otp')) {
        setErrors({ otp: errorMsg });
      } else if (msgLower.includes('password')) {
        setErrors({ newPassword: errorMsg });
      } else {
        setErrors({ general: errorMsg });
      }
      toast.error(errorMsg);
    };

    try {
      const payload = { email: email.trim(), otp: otpCode, newPassword: pass };
      const res = await authApi.resetPassword(payload);
      if ((res as any).success) {
        toast.success('Password reset successful. Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        handleApiError((res as any).message ?? (res as any).error ?? 'Password reset failed');
      }
    } catch (err: any) {
      handleApiError(err?.message ?? err?.error ?? 'Network error');
    }
    setLoading(false);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeReset(otp, newPassword, confirmPassword);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Keep only numeric characters and limit to 6 characters
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setOtp(cleaned);
    setErrors(prev => ({ ...prev, otp: '' }));

    // Auto-submit once 6 digits are fully entered and password is >= 6 chars
    if (cleaned.length === 6) {
      if (newPassword.length >= 6 && confirmPassword.length >= 6 && newPassword === confirmPassword) {
        executeReset(cleaned, newPassword, confirmPassword);
      } else {
        // Otherwise, focus the new password field so the user can enter it
        if (!newPassword && passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {errors.general && <p className="text-sm text-red-600 font-medium">{errors.general}</p>}

      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              className={cn(
                'mt-1 w-full rounded border bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none',
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-sky-600 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              OTP code
            </label>
            <input
              ref={otpInputRef}
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={6}
              required
              disabled={loading}
              value={otp}
              onChange={handleOtpChange}
              placeholder="••••••"
              className={cn(
                'mt-1 w-full rounded border bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm focus:outline-none text-center font-mono tracking-[0.75em] text-lg disabled:opacity-50',
                errors.otp
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
              )}
            />
            {errors.otp && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.otp}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              New password
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={loading}
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  setErrors(prev => ({ ...prev, newPassword: '' }));
                }}
                className={cn(
                  'mt-1 w-full rounded border bg-slate-50 dark:bg-slate-800 pl-3 pr-10 py-2 text-sm focus:outline-none disabled:opacity-50',
                  errors.newPassword
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                disabled={loading}
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }}
                className={cn(
                  'mt-1 w-full rounded border bg-slate-50 dark:bg-slate-800 pl-3 pr-10 py-2 text-sm focus:outline-none disabled:opacity-50',
                  errors.confirmPassword
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-sky-600 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}
