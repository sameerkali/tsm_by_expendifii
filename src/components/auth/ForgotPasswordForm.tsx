'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authApi from '@/lib/api/auth.api';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.requestPasswordReset(email);
      if ((res as any).success) {
        setMessage('If an account with that email exists, a password reset OTP has been sent.');
        setStep('otp');
      } else {
        setError((res as any).error ?? 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Just verify OTP on client side (no separate endpoint), move to reset step
      setStep('reset');
    } catch (err) {
      setError('Invalid OTP');
    }
    setLoading(false);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { email, otp, newPassword };
      const res = await authApi.resetPassword(payload);
      if ((res as any).success) {
        setMessage('Password reset successful. Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError((res as any).error ?? 'Password reset failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

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
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-sky-600 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              OTP code
            </label>
            <input
              id="otp"
              type="text"
              required
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-sky-600 py-2 font-semibold text-white hover:bg-sky-7 00 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-sky-600 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}
