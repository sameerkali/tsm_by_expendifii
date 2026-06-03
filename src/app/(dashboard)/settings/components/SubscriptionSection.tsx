'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

type Coupon = {
  _id: string;
  code: string;
  durationDays: number;
  startDate: string | null;
  expiresAt: string | null;
  isActive: boolean;
  isUsed: boolean;
  isExpired: boolean;
  usedAt?: string | null;
  createdAt?: string;
};

type SubscriptionUser = {
  coupons?: Coupon[];
} | null;

interface SubscriptionSectionProps {
  user: SubscriptionUser;
  isLoadingProfile: boolean;
  getDaysLeft: (expiresAt: string) => number;
}

export function SubscriptionSection({ user, isLoadingProfile, getDaysLeft }: SubscriptionSectionProps) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const now = new Date().getTime();

  // Helper to calculate total active subscription days
  const calculateTotalActiveDays = () => {
    if (!user?.coupons) return 0;
    let total = 0;
    user.coupons.forEach((coupon) => {
      if (!coupon.isActive || !coupon.isUsed) return;
      if (!coupon.startDate || !coupon.expiresAt) return;

      const startTime = new Date(coupon.startDate).getTime();
      const expiresTime = new Date(coupon.expiresAt).getTime();

      if (expiresTime <= now) return;

      if (startTime <= now && expiresTime > now) {
        total += Math.max(0, getDaysLeft(coupon.expiresAt));
      } else if (startTime > now) {
        total += coupon.durationDays;
      }
    });
    return total;
  };

  const totalActiveDays = calculateTotalActiveDays();

  const getActiveAndScheduledCoupons = () => {
    if (!user?.coupons) return [];
    return user.coupons
      .filter((coupon) => {
        if (!coupon.isActive || !coupon.isUsed) return false;
        if (!coupon.startDate || !coupon.expiresAt) return false;
        
        const expiresTime = new Date(coupon.expiresAt).getTime();
        return expiresTime > now;
      })
      .sort((a, b) => {
        const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
        const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
        return aTime - bTime;
      });
  };

  const activeAndScheduledCoupons = getActiveAndScheduledCoupons();

  const formatDateRange = (startDateStr: string, endDateStr: string) => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.toLocaleDateString('en-US', { day: 'numeric' });
    
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const endDay = end.toLocaleDateString('en-US', { day: 'numeric' });
    
    const endYear = end.toLocaleDateString('en-US', { year: 'numeric' });
    
    return `${startMonth} ${startDay} to ${endMonth} ${endDay}, ${endYear}`;
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Subscription & Plan</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your active dashboard access duration and applied plan logs.</p>
        </div>
        <div className="flex items-center gap-4 self-start sm:self-center">
          {!isLoadingProfile && activeAndScheduledCoupons.length > 0 && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline cursor-pointer"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
          )}
          <button
            onClick={() => router.push('/activate')}
            className="px-4 py-2 bg-sky-700 dark:bg-sky-600 hover:bg-sky-800 dark:hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer"
          >
            Activate Coupon
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isLoadingProfile ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* ── Active Subscription Summary ── */}
            <div className="py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {totalActiveDays}
                </span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  days remaining
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-md">
                {totalActiveDays > 0 
                  ? 'Your subscription is active. Below is the list of active and scheduled coupons contributing to your access.'
                  : 'No active subscription. Please apply a valid coupon code to restore dashboard access.'
                }
              </p>
            </div>

            {/* ── Coupons List (Toggleable) ── */}
            {showDetails && (
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Applied Plans</h3>

                {activeAndScheduledCoupons.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">No active or scheduled plans found.</p>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {activeAndScheduledCoupons.map((coupon) => {
                      const startTime = coupon.startDate ? new Date(coupon.startDate).getTime() : 0;
                      const isCurrentlyActive = startTime <= now;

                      return (
                        <div
                          key={coupon._id}
                          className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {isCurrentlyActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                              )}
                              <span className="font-semibold text-sm text-slate-900 dark:text-white tracking-wide uppercase">
                                {coupon.code}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {coupon.durationDays} Days Duration
                            </p>
                          </div>

                          <div className="flex items-center gap-6 text-xs">
                            {coupon.startDate && coupon.expiresAt && (
                              <div className="text-left sm:text-right">
                                <p className="font-medium text-slate-600 dark:text-slate-300">
                                  {formatDateRange(coupon.startDate, coupon.expiresAt)}
                                </p>
                              </div>
                            )}

                            {isCurrentlyActive && coupon.expiresAt && (
                              <div className="px-3 py-1 bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100/50 dark:border-sky-900/30 rounded-lg text-center min-w-[70px]">
                                <span className="text-[9px] font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                                  Days Left
                                </span>
                                <p className="text-sm font-bold text-sky-600 dark:text-sky-400 leading-none mt-0.5">
                                  {getDaysLeft(coupon.expiresAt)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
