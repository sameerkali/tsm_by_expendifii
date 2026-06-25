"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import posthog from "posthog-js";
import authApi from "@/lib/api/auth.api";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  DEMO_READ_ONLY_MESSAGE,
  exitGuestMode,
  isGuestModeClient,
} from "@/lib/demo/guest";
import { COMPANY_KEYS } from "@/config/query-keys";
import {
  LoginInput,
  RegisterInput,
  ActivateInput,
} from "@/lib/validations/auth.schema";
import { ApiError } from "@/types/api";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: async (res) => {
      const accountStatus = res.data?.accountStatus;

      // Clear guest mode state and cache immediately
      exitGuestMode();
      queryClient.clear();

      // Fetch full profile from API and persist to localStorage
      // (the hard redirect below kills JS context, so we save before navigating)
      try {
        const profile = await authApi.getProfile();
        if (profile.data && typeof window !== "undefined") {
          localStorage.setItem("profile", JSON.stringify(profile.data));
        }
      } catch {
        // Non-critical: useSession will fetch on next load
      }

      // Refetch profile so useSession picks up the authenticated user
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });

      const email = res.data?.user?.email;
      if (email) {
        posthog.identify(email, { email });
        posthog.capture("user_signed_in", { email });
      }

      if (accountStatus === "INACTIVE") {
        toast.info("Account is inactive. Enter your coupon code to activate.");
        window.location.href = "/activate";
      } else {
        toast.success("Welcome back!");
        window.location.href = "/gr";
      }
    },
    onError: (error: unknown) => {
      toast.error(
        getApiErrorMessage(
          error,
          "Login failed. Check your credentials and try again.",
          "auth",
        ),
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (res, variables) => {
      posthog.capture("user_registered", { email: variables.email });
      toast.success(
        res.message || "Account created! Activate with your coupon code.",
      );
      window.location.href = "/activate";
    },
    onError: (error: unknown) => {
      console.warn("[useAuth] Register failed:", error);
      toast.error(
        getApiErrorMessage(
          error,
          "Registration failed. Please try again.",
          "auth",
        ),
      );
    },
  });

  const activateMutation = useMutation({
    mutationFn: (data: ActivateInput) => authApi.activate(data),
    onSuccess: async (res) => {
      console.group("[useAuth] Activate onSuccess");
      console.log("Response:", JSON.stringify(res, null, 2));
      console.groupEnd();

      // Clear guest mode state and cache immediately
      exitGuestMode();
      queryClient.clear();

      const durationDays = res.data?.durationDays;
      posthog.capture("account_activated", { duration_days: durationDays });
      const msg = durationDays
        ? `Account activated! Valid for ${durationDays} days.`
        : "Account activated successfully!";
      toast.success(msg);

      // Fetch and persist profile before the hard redirect
      try {
        const profile = await authApi.getProfile();
        if (profile.data && typeof window !== "undefined") {
          localStorage.setItem("profile", JSON.stringify(profile.data));
        }
      } catch {
        // Non-critical: useSession will fetch on next load
      }

      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
      window.location.href = "/gr";
    },
    onError: (error: unknown) => {
      console.group("[useAuth] Activate onError");
      console.warn("Error:", error);
      console.groupEnd();

      toast.error(
        getApiErrorMessage(
          error,
          "Invalid or expired coupon code. Please try again.",
          "auth",
        ),
      );
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Parameters<typeof authApi.updateProfile>[0]) => {
      if (isGuestModeClient())
        throw { success: false, message: DEMO_READ_ONLY_MESSAGE };
      return authApi.updateProfile(data);
    },
    onSuccess: () => {
      posthog.capture("company_profile_updated");
      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
    },
    onError: (error: unknown) => {
      toast.error(
        getApiErrorMessage(
          error,
          "Failed to update profile. Please try again.",
          "auth",
        ),
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      if (isGuestModeClient()) {
        return Promise.resolve({ success: true });
      }
      return authApi.logout();
    },
    onSuccess: () => {
      posthog.capture("user_signed_out");
      posthog.reset();
      if (typeof window !== "undefined") {
        localStorage.removeItem("profile");
        exitGuestMode();
      }
      queryClient.clear();
      window.location.href = "/login";
    },
    onError: () => {
      // Even if the logout API fails, clear local state and send user to login.
      // Never leave the user stuck on a "logging out" screen.
      if (typeof window !== "undefined") {
        localStorage.removeItem("profile");
        exitGuestMode();
      }
      queryClient.clear();
      window.location.href = "/login";
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error as ApiError | null,

    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error as ApiError | null,

    activate: activateMutation.mutate,
    isActivating: activateMutation.isPending,
    activateError: activateMutation.error as ApiError | null,

    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error as ApiError | null,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
