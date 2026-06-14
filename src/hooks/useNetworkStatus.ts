import { useState, useEffect, useRef, useCallback } from "react";

export interface NetworkState {
  isOnline: boolean;
  isSlow: boolean;
  effectiveType: "slow-2g" | "2g" | "3g" | "4g" | "unknown";
  downlink?: number; // Estimated download speed in Mbps
  rtt?: number;      // Estimated round-trip time in ms
}

export interface NetworkStatusHook extends NetworkState {
  recheck: () => Promise<boolean>;
}

// Thresholds for slow connection classification
const SLOW_SPEED_THRESHOLD_MBPS = 1.5; // Downlink < 1.5 Mbps is considered slow
const SLOW_RTT_THRESHOLD_MS = 400;     // RTT > 400ms is considered slow
const DEBOUNCE_DELAY_MS = 3000;        // Speed must be slow for 3s to trigger alert
const PING_INTERVAL_MS = 25000;        // Fallback ping interval (25 seconds)

// Extend Navigator for Network Information API support in TypeScript
interface NavigatorConnection {
  connection?: {
    effectiveType: "slow-2g" | "2g" | "3g" | "4g";
    downlink: number;
    rtt: number;
    saveData: boolean;
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  };
}

export function useNetworkStatus(): NetworkStatusHook {
  const [state, setState] = useState<NetworkState>({
    isOnline: typeof window !== "undefined" ? navigator.onLine : true,
    isSlow: false,
    effectiveType: "unknown",
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to determine slow status based on API readings
  const checkIsSlow = useCallback((effectiveType: string, downlink?: number, rtt?: number) => {
    if (effectiveType === "slow-2g" || effectiveType === "2g" || effectiveType === "3g") {
      return true;
    }
    if (downlink !== undefined && downlink < SLOW_SPEED_THRESHOLD_MBPS) {
      return true;
    }
    if (rtt !== undefined && rtt > SLOW_RTT_THRESHOLD_MS) {
      return true;
    }
    return false;
  }, []);

  // Update state with speed debouncing
  const updateNetworkState = useCallback((
    online: boolean,
    effectiveType: NetworkState["effectiveType"],
    downlink?: number,
    rtt?: number
  ) => {
    const slowDetected = online ? checkIsSlow(effectiveType, downlink, rtt) : false;

    // Clear any pending transition
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    if (!online) {
      // Going offline is critical; update state immediately
      setState({
        isOnline: false,
        isSlow: false,
        effectiveType: "unknown",
        downlink,
        rtt,
      });
    } else if (slowDetected) {
      // Going slow: debounce to avoid flickering warning banners
      debounceTimerRef.current = setTimeout(() => {
        setState({
          isOnline: true,
          isSlow: true,
          effectiveType,
          downlink,
          rtt,
        });
      }, DEBOUNCE_DELAY_MS);
    } else {
      // Transitioning back to fast/normal: update immediately for crisp responsiveness
      setState({
        isOnline: true,
        isSlow: false,
        effectiveType,
        downlink,
        rtt,
      });
    }
  }, [checkIsSlow]);

  // Fallback Ping Method (Safari/Firefox)
  const performPingCheck = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    // Only check if browser is online according to OS and the page is active
    if (!navigator.onLine || document.visibilityState !== "visible") return false;

    const startTime = performance.now();
    try {
      const response = await fetch(`/logo.png?t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
        // Set a short timeout to fail fast if connection is dead/extremely slow
        signal: AbortSignal.timeout(4000),
      });

      // Any HTTP status (even 404, 500) indicates we contacted the server and are online
      if (response.status >= 200 && response.status < 500) {
        const duration = performance.now() - startTime;
        const estimatedRtt = Math.round(duration);
        const slow = estimatedRtt > SLOW_RTT_THRESHOLD_MS;
        
        updateNetworkState(
          true,
          slow ? "2g" : "4g",
          slow ? 0.5 : 5, // mock estimation speeds
          estimatedRtt
        );
        return true;
      } else {
        if (!navigator.onLine) {
          updateNetworkState(false, "unknown");
        }
        return false;
      }
    } catch {
      // If abort or network error, check if offline or severely throttled
      if (!navigator.onLine) {
        updateNetworkState(false, "unknown");
      } else {
        // Severely slow / high packet loss
        updateNetworkState(true, "slow-2g", 0.1, 3000);
      }
      return false;
    }
  }, [updateNetworkState]);

  // Verified check connection action for manual trigger
  const recheck = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;

    // 1. If OS says offline, we are definitely offline
    if (!navigator.onLine) {
      updateNetworkState(false, "unknown");
      return false;
    }

    // 2. Perform verification ping check
    const startTime = performance.now();
    try {
      const response = await fetch(`/logo.png?t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      });

      // Any HTTP status (even 404, 500) indicates connectivity
      if (response.status >= 200 && response.status < 500) {
        const duration = performance.now() - startTime;
        const estimatedRtt = Math.round(duration);
        const slow = estimatedRtt > SLOW_RTT_THRESHOLD_MS;

        updateNetworkState(
          true,
          slow ? "2g" : "4g",
          slow ? 0.5 : 5,
          estimatedRtt
        );
        return true;
      } else {
        updateNetworkState(false, "unknown");
        return false;
      }
    } catch {
      updateNetworkState(false, "unknown");
      return false;
    }
  }, [updateNetworkState]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & NavigatorConnection;
    const hasConnectionApi = !!nav.connection;

    // 1. Connection API Event Listeners (Chromium)
    const handleConnectionChange = () => {
      if (!nav.connection) return;
      const { effectiveType, downlink, rtt } = nav.connection;
      updateNetworkState(navigator.onLine, effectiveType, downlink, rtt);
    };

    if (hasConnectionApi && nav.connection) {
      nav.connection.addEventListener("change", handleConnectionChange);
      // Initialize state with connection API values deferred to avoid SSR and eslint warnings
      const { effectiveType, downlink, rtt } = nav.connection;
      setTimeout(() => {
        updateNetworkState(navigator.onLine, effectiveType, downlink, rtt);
      }, 0);
    }

    // 2. Fallback Ping Method (Safari/Firefox)
    let pingInterval: NodeJS.Timeout | null = null;
    if (!hasConnectionApi) {
      // Defer initial ping check to avoid synchronous state updates in effect
      setTimeout(() => {
        performPingCheck();
      }, 0);
      pingInterval = setInterval(performPingCheck, PING_INTERVAL_MS);
      document.addEventListener("visibilitychange", performPingCheck);
    }

    // 3. Global Online/Offline Event Listeners
    const handleOnline = () => {
      if (hasConnectionApi && nav.connection) {
        const { effectiveType, downlink, rtt } = nav.connection;
        updateNetworkState(navigator.onLine, effectiveType, downlink, rtt);
      } else {
        updateNetworkState(navigator.onLine, "unknown");
        performPingCheck(); // Trigger immediate ping check on reconnection
      }
    };

    const handleOffline = () => {
      updateNetworkState(false, "unknown");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup functions
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (hasConnectionApi && nav.connection) {
        nav.connection.removeEventListener("change", handleConnectionChange);
      }
      if (pingInterval) clearInterval(pingInterval);
      if (!hasConnectionApi) {
        document.removeEventListener("visibilitychange", performPingCheck);
      }
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [updateNetworkState, performPingCheck]);

  return {
    ...state,
    recheck,
  };
}
