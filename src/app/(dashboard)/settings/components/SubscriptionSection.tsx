'use client';

import React, { useState } from 'react';
import { Tag, Calendar, Clock, Sparkles, ChevronDown, ChevronUp, CalendarCheck, AlertCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import authApi from '@/lib/api/auth.api';
import { getApiErrorMessage } from '@/lib/api/errors';
import { COMPANY_KEYS } from '@/config/query-keys';
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
  const queryClient = useQueryClient();

  // Local mutation to handle in-place coupon activation
  const activateMutation = useMutation({
    mutationFn: (code: string) => authApi.activate({ couponCode: code }),
    onSuccess: async (res) => {
      const durationDays = res.data?.durationDays;
      const msg = durationDays
        ? `Account activated successfully! Valid for ${durationDays} days.`
        : 'Account activated successfully!';
      toast.success(msg);

      // Refresh the local profile cache in localStorage
      try {
        const profile = await authApi.getProfile();
        if (profile.data && typeof window !== 'undefined') {
          localStorage.setItem('profile', JSON.stringify(profile.data));
        }
      } catch (e) {
        console.error('[SubscriptionSection] Failed to refetch profile after activation', e);
      }

      // Invalidate the query key to refresh the main layout and view count
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to activate coupon. Please try again.', 'auth'));
    },
  });

  // Helper to calculate total active subscription days
  const calculateTotalActiveDays = () => {
    if (!user?.coupons) return 0;
    let total = 0;
    const now = new Date().getTime();
    user.coupons.forEach((coupon) => {
      // Must be active and used
      if (!coupon.isActive || !coupon.isUsed) return;
      
      // Must have dates set
      if (!coupon.startDate || !coupon.expiresAt) return;

      const startTime = new Date(coupon.startDate).getTime();
      const expiresTime = new Date(coupon.expiresAt).getTime();

      // Skip if already expired
      if (expiresTime <= now) return;

      // If currently active (now is between start and expires)
      if (startTime <= now && expiresTime > now) {
        total += Math.max(0, getDaysLeft(coupon.expiresAt));
      } 
      // If upcoming (starts in the future)
      else if (startTime > now) {
        total += coupon.durationDays;
      }
    });
    return total;
  };

  const totalActiveDays = calculateTotalActiveDays();

  // Sort coupons: 
  // 1. Currently active
  // 2. Scheduled (isUsed: true, startDate in future)
  // 3. Unused (isUsed: false / no dates)
  // 4. Expired
  const getSortedCoupons = () => {
    if (!user?.coupons) return [];
    const now = new Date().getTime();
    
    return [...user.coupons].sort((a, b) => {
      const getStatusRank = (coupon: Coupon) => {
        if (!coupon.isActive) return 4; // Inactive / Expired
        
        // Expired by date
        if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() <= now) {
          return 4;
        }

        // Unused
        if (!coupon.isUsed || !coupon.startDate || !coupon.expiresAt) {
          return 3;
        }

        const startTime = new Date(coupon.startDate).getTime();
        const expiresTime = new Date(coupon.expiresAt).getTime();

        // Currently running
        if (startTime <= now && expiresTime > now) {
          return 1;
        }
        
        // Scheduled
        if (startTime > now) {
          return 2;
        }

        return 3;
      };

      return getStatusRank(a) - getStatusRank(b);
    });
  };

  const sortedCoupons = getSortedCoupons();
  const now = new Date().getTime();

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Subscription & Coupons</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Manage your active plans and applied coupons.</p>
        </div>
        {!isLoadingProfile && user?.coupons && user.coupons.length > 0 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="self-start sm:self-center text-xs font-black uppercase tracking-wider text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 underline underline-offset-4 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            {showDetails ? 'Hide details' : 'See full details'}
            {showDetails ? (
              <ChevronUp size={14} className="animate-bounce" style={{ animationDuration: '2s' }} />
            ) : (
              <ChevronDown size={14} className="animate-bounce" style={{ animationDuration: '2s' }} />
            )}
          </button>
        )}
      </div>

      <div className="p-8 space-y-6">
        {isLoadingProfile ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-28 bg-slate-100 dark:bg-slate-800 rounded-[2rem]" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* ── Active Subscription Summary Card ── */}
            <div className="relative overflow-hidden p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] blur-[40px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-28 h-28 bg-blue-500/[0.04] dark:bg-blue-500/[0.02] blur-[30px] rounded-full pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Sparkles size={18} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Active Account Duration</span>
                  </div>
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {totalActiveDays > 0 ? (
                      <>
                        <span className="text-emerald-500">{totalActiveDays}</span> Days Remaining
                      </>
                    ) : (
                      'No Active Subscription'
                    )}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 max-w-md leading-relaxed">
                    {totalActiveDays > 0 
                      ? 'Your subscription is active and fully functional. Below are the coupons combined to give you this duration.'
                      : 'Please apply or purchase a coupon code to reactivate your dashboard access and fleet tools.'
                    }
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Coupons</p>
                    <p className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                      {user?.coupons?.length ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Expandable Details Panel ── */}
            {showDetails && user?.coupons && user.coupons.length > 0 && (
              <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="border-t border-slate-50 dark:border-slate-800/60 pt-4 pb-2">
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase italic">Detailed Coupon Log</p>
                </div>

                <div className="space-y-4">
                  {sortedCoupons.map((coupon: Coupon) => {
                    // Check coupon states
                    const isExpired = !coupon.isActive || coupon.isExpired || (coupon.expiresAt && new Date(coupon.expiresAt).getTime() <= now);
                    
                    const isUnused = !coupon.isUsed || !coupon.startDate || !coupon.expiresAt;
                    
                    let isCurrentlyActive = false;
                    let isScheduled = false;

                    if (!isExpired && !isUnused && coupon.startDate && coupon.expiresAt) {
                      const startTime = new Date(coupon.startDate).getTime();
                      const expiresTime = new Date(coupon.expiresAt).getTime();
                      if (startTime <= now && expiresTime > now) {
                        isCurrentlyActive = true;
                      } else if (startTime > now) {
                        isScheduled = true;
                      }
                    }

                    // Style mapping based on status
                    let containerClass = "";
                    let badgeColor = "";
                    let badgeText = "";
                    let statusIcon = null;

                    if (isCurrentlyActive) {
                      containerClass = "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40 shadow-sm shadow-emerald-500/[0.02]";
                      badgeColor = "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
                      badgeText = "Active / Running";
                      statusIcon = <Clock size={16} className="text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />;
                    } else if (isScheduled) {
                      containerClass = "bg-blue-50/40 dark:bg-blue-950/10 border-blue-200/60 dark:border-blue-900/40 shadow-sm shadow-blue-500/[0.01]";
                      badgeColor = "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900";
                      badgeText = "Scheduled";
                      statusIcon = <CalendarCheck size={16} className="text-blue-500" />;
                    } else if (isUnused) {
                      containerClass = "bg-slate-50/50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800/80";
                      badgeColor = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";
                      badgeText = "Unused / Open";
                      statusIcon = <Tag size={16} className="text-slate-400" />;
                    } else {
                      // Expired
                      containerClass = "bg-slate-50/20 dark:bg-slate-900/10 border-slate-100 dark:border-slate-800/40 opacity-60";
                      badgeColor = "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200/50 dark:border-slate-800";
                      badgeText = "Expired";
                      statusIcon = <AlertCircle size={16} className="text-slate-400" />;
                    }

                    return (
                      <div
                        key={coupon._id}
                        className={cn(
                          "p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                          containerClass
                        )}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                              {statusIcon}
                              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{coupon.code}</p>
                              <span className={cn("px-2.5 py-0.5 border text-[9px] font-black rounded-full uppercase tracking-wider", badgeColor)}>
                                {badgeText}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {coupon.durationDays} Days Plan
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Calendar size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">Validity Period</span>
                              </div>
                              <p className="font-semibold text-slate-700 dark:text-slate-300">
                                {coupon.startDate && coupon.expiresAt ? (
                                  <>
                                    {new Date(coupon.startDate).toLocaleDateString()} — {new Date(coupon.expiresAt).toLocaleDateString()}
                                  </>
                                ) : (
                                  <span className="italic text-slate-400 font-normal">Not yet activated</span>
                                )}
                              </p>
                            </div>

                            {isCurrentlyActive && coupon.expiresAt && (
                              <div className="px-4 py-2 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900/30 rounded-xl shadow-sm text-center min-w-[80px]">
                                <div className="flex items-center gap-1 text-emerald-500 mb-0.5 justify-center">
                                  <Clock size={12} />
                                  <span className="text-[9px] font-black uppercase tracking-wider">Days Left</span>
                                </div>
                                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-none">
                                  {getDaysLeft(coupon.expiresAt)}
                                </p>
                              </div>
                            )}

                            {isUnused && (
                              <button
                                onClick={() => activateMutation.mutate(coupon.code)}
                                disabled={activateMutation.isPending}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0"
                              >
                                {activateMutation.isPending && activateMutation.variables === coupon.code ? (
                                  <>
                                    <Clock size={12} className="animate-spin" />
                                    Activating...
                                  </>
                                ) : (
                                  'Activate Now'
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
