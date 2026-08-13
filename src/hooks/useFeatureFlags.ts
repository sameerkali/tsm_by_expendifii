"use client";

import { useMemo } from "react";
import { useSession } from "@/hooks/useSession";
import { LEGACY_FLAG_KEYS } from "@/config/feature-flags";

/**
 * Central hook for feature flag checks, modeled on usePlanStatus.ts — reads
 * off the already-fetched profile (useSession), no extra network round trip.
 */
export function useFeatureFlags() {
  const { user, isLoading } = useSession();

  const isEnabled = useMemo(() => {
    const flags = user?.flags;
    return (key: string): boolean => {
      const value = flags?.[key];
      if (value !== undefined) return value;
      return LEGACY_FLAG_KEYS.includes(key);
    };
  }, [user?.flags]);

  return { isEnabled, isLoading };
}
