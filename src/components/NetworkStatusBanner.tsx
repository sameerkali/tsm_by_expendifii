"use client";

import React, { useState, useEffect } from "react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { WifiOff, AlertTriangle, CheckCircle, X, RefreshCw } from "lucide-react";

export default function NetworkStatusBanner() {
  const { isOnline, isSlow, downlink, rtt, recheck } = useNetworkStatus();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const prevIsOnlineRef = React.useRef(isOnline);
  const prevIsSlowRef = React.useRef(isSlow);

  // Monitor connection transitions to show a brief "Reconnected" confirmation
  useEffect(() => {
    const prevIsOnline = prevIsOnlineRef.current;
    const prevIsSlow = prevIsSlowRef.current;

    // 1. Offline -> Online transition
    if (isOnline && !prevIsOnline) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Defer setting state to avoid synchronous calls in effect body
      setTimeout(() => {
        setShowSuccess(true);
        setIsDismissed(false);
      }, 0);

      prevIsOnlineRef.current = isOnline;
      prevIsSlowRef.current = isSlow;
      return () => clearTimeout(timer);
    }

    // 2. Slow -> Fast transition
    if (isOnline && !isSlow && prevIsSlow && prevIsOnline) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Defer setting state to avoid synchronous calls in effect body
      setTimeout(() => {
        setShowSuccess(true);
        setIsDismissed(false);
      }, 0);

      prevIsOnlineRef.current = isOnline;
      prevIsSlowRef.current = isSlow;
      return () => clearTimeout(timer);
    }

    // Reset dismissed state if we transition from fast to slow, or online to offline
    if ((isSlow && !prevIsSlow) || (!isOnline && prevIsOnline)) {
      setTimeout(() => {
        setIsDismissed(false);
      }, 0);
    }

    prevIsOnlineRef.current = isOnline;
    prevIsSlowRef.current = isSlow;
  }, [isOnline, isSlow]);

  // Handle manual retry action
  const handleRetry = async () => {
    setIsRetrying(true);
    await recheck();
    setIsRetrying(false);
  };

  // If dismissed or if connection is normal/fast (and no active success banner), show nothing
  if ((isDismissed && !showSuccess) || (isOnline && !isSlow && !showSuccess)) {
    return null;
  }

  // 1. Success Reconnected State
  if (showSuccess) {
    return (
      <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 transform animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-50/90 px-5 py-3 text-emerald-800 shadow-lg backdrop-blur-md dark:border-emerald-500/30 dark:bg-emerald-950/90 dark:text-emerald-200">
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium tracking-wide">
            Connection restored successfully
          </span>
        </div>
      </div>
    );
  }

  // 2. Offline State
  if (!isOnline) {
    return (
      <div className="fixed bottom-6 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transform animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="overflow-hidden rounded-2xl border border-rose-500/30 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:border-rose-500/20 dark:bg-slate-900/95">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <WifiOff className="h-5.5 w-5.5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                </span>
                <h4 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                  Offline Mode
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You are currently disconnected. Check your network cables or Wi-Fi settings.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500 disabled:bg-rose-600/50"
                >
                  <RefreshCw className={`h-3 w-3 ${isRetrying ? "animate-spin" : ""}`} />
                  {isRetrying ? "Checking..." : "Check Connection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Slow Connection State
  if (isSlow) {
    return (
      <div className="fixed bottom-6 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transform animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:border-amber-500/20 dark:bg-slate-900/95">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <AlertTriangle className="h-5.5 w-5.5" />
            </div>
            <div className="flex-1 space-y-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                <h4 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                  Slow Connection Detected
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your speed seems low{downlink ? ` (~${downlink.toFixed(1)} Mbps)` : ""}{rtt ? ` with high latency (~${rtt}ms)` : ""}. Pages may load slowly.
              </p>
            </div>
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
