"use client";

import { useMemo } from "react";
import { useSession } from "@/hooks/useSession";
import { Coupon } from "@/types/session";

export interface PlanStatusInfo {
  isPlanActive: boolean;
  totalDaysLeft: number;
  totalDuration: number;
  progressPercentage: number;
  activeCoupons: Coupon[];
  coupons: Coupon[];
  getDaysLeft: (expiresAt: string) => number;
}

/**
 * Calculates days remaining from an expiration date string
 */
export function getDaysLeft(expiresAt: string): number {
  if (!expiresAt) return 0;
  const today = new Date();
  const expDate = new Date(expiresAt);
  const diffTime = expDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Pure function to calculate active plan status from a list of coupons
 */
export function calculatePlanStatus(coupons: Coupon[] | null | undefined): PlanStatusInfo {
  const list = coupons ?? [];
  if (list.length === 0) {
    return {
      isPlanActive: false,
      totalDaysLeft: 0,
      totalDuration: 0,
      progressPercentage: 0,
      activeCoupons: [],
      coupons: [],
      getDaysLeft,
    };
  }

  const now = Date.now();
  let totalDaysLeft = 0;
  let totalDuration = 0;
  let isPlanActive = false;
  const activeCoupons: Coupon[] = [];

  list.forEach((coupon) => {
    if (!coupon.isActive || !coupon.isUsed) return;
    if (!coupon.startDate || !coupon.expiresAt) return;

    const startTime = new Date(coupon.startDate).getTime();
    const expiresTime = new Date(coupon.expiresAt).getTime();

    if (expiresTime <= now) return;

    if (startTime <= now && expiresTime > now) {
      const days = getDaysLeft(coupon.expiresAt);
      totalDaysLeft += days;
      totalDuration += coupon.durationDays;
      isPlanActive = true;
      activeCoupons.push(coupon);
    } else if (startTime > now) {
      totalDaysLeft += coupon.durationDays;
      totalDuration += coupon.durationDays;
      isPlanActive = true;
      activeCoupons.push(coupon);
    }
  });

  const progressPercentage = totalDuration > 0 ? (totalDaysLeft / totalDuration) * 100 : 0;

  return {
    isPlanActive,
    totalDaysLeft,
    totalDuration,
    progressPercentage,
    activeCoupons,
    coupons: list,
    getDaysLeft,
  };
}

/**
 * Central Hook for subscription plan status, active coupons, and remaining days.
 */
export function usePlanStatus(customCoupons?: Coupon[] | null) {
  const { user } = useSession();
  const couponsToUse = customCoupons !== undefined ? customCoupons : user?.coupons;

  return useMemo(() => calculatePlanStatus(couponsToUse), [couponsToUse]);
}
