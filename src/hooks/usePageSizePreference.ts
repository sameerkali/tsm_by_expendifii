"use client";

import { useState, useEffect, useCallback } from "react";
import { PAGE_SIZE_OPTIONS, type PageSizeOption } from "@/components/shared/Pagination";

const STORAGE_KEY = "tsm_page_size";

export function getStoredPageSize(fallback: PageSizeOption = 10): PageSizeOption {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = Number(saved);
      if (PAGE_SIZE_OPTIONS.includes(parsed as PageSizeOption)) {
        return parsed as PageSizeOption;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return fallback;
}

/**
 * Hook to manage page size preference with localStorage persistence & tab syncing.
 */
export function usePageSizePreference(defaultSize: PageSizeOption = 10) {
  const [limit, setLimitState] = useState<PageSizeOption>(() =>
    getStoredPageSize(defaultSize),
  );

  // Sync state on client mount (hydration-safe)
  useEffect(() => {
    const stored = getStoredPageSize(defaultSize);
    setLimitState(stored);
  }, [defaultSize]);

  const setLimit = useCallback((newLimit: PageSizeOption) => {
    setLimitState(newLimit);
    try {
      localStorage.setItem(STORAGE_KEY, String(newLimit));
      window.dispatchEvent(new Event("tsm_page_size_change"));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Sync across tabs and components
  useEffect(() => {
    const handleSync = () => {
      const stored = getStoredPageSize(defaultSize);
      setLimitState(stored);
    };

    window.addEventListener("tsm_page_size_change", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("tsm_page_size_change", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [defaultSize]);

  return [limit, setLimit] as const;
}
