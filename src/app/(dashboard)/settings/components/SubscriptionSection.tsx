'use client';

import React from 'react';
import { Tag, Calendar, Clock, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SubscriptionSectionProps {
  user: any;
  isLoadingProfile: boolean;
  getDaysLeft: (expiresAt: string) => number;
}

export function SubscriptionSection({ user, isLoadingProfile, getDaysLeft }: SubscriptionSectionProps) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
        <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Subscription & Coupons</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">Manage your active plans and applied coupons.</p>
      </div>

      <div className="p-8 space-y-6">
        {isLoadingProfile ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        ) : user?.coupons && user.coupons.length > 0 ? (
          <div className="space-y-4">
            {user.coupons.map((coupon: any) => {
              const isCurrentlyActive = coupon.isActive && !coupon.isExpired;
              const daysLeft = getDaysLeft(coupon.expiresAt);

              return (
                <div key={coupon._id} className={cn(
                  "p-6 rounded-2xl border transition-all",
                  isCurrentlyActive
                    ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50"
                    : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
                )}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className={isCurrentlyActive ? "text-emerald-500" : "text-slate-400"} />
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{coupon.code}</p>
                        {isCurrentlyActive && (
                          <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            Active
                          </span>
                        )}
                        {coupon.isExpired && (
                          <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {coupon.durationDays} Days Plan
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Calendar size={14} />
                          <span className="text-[10px] font-bold uppercase">Expires On</span>
                        </div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300">
                          {new Date(coupon.expiresAt).toLocaleDateString()}
                        </p>
                      </div>

                      {isCurrentlyActive && (
                        <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm text-center">
                          <div className="flex items-center gap-1 text-emerald-500 mb-0.5 justify-center">
                            <Clock size={12} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Days Left</span>
                          </div>
                          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-none">
                            {daysLeft}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-3">
              <CreditCard size={24} />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No active subscriptions</p>
            <p className="text-xs text-slate-500 mt-1">Activate a coupon to use premium features.</p>
          </div>
        )}
      </div>
    </section>
  );
}
