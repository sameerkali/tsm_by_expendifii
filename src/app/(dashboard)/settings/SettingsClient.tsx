"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { usePlanStatus } from "@/hooks/usePlanStatus";
import { usePreferences } from "@/providers/PreferencesProvider";
import { cloudinaryApi } from "@/lib/api/cloudinary.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "@/lib/api/auth.api";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/errors";
import { COMPANY_KEYS } from "@/config/query-keys";
import { cn } from "@/lib/utils/cn";

// React Heroicons (24/outline)
import {
  PaintBrushIcon,
  CreditCardIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  UserIcon,
  CheckBadgeIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

// Components
import { AppearanceSection } from "./components/AppearanceSection";
import { CompanyProfileSection } from "./components/CompanyProfileSection";
import { SubscriptionSection } from "./components/SubscriptionSection";
import { DownloadDataSection } from "./components/DownloadDataSection";
import { ImportDataSection } from "./components/ImportDataSection";
import { SessionSection } from "./components/SessionSection";
import { DangerZoneSection } from "./components/DangerZoneSection";
import { CookieSettingsSection } from "./components/CookieSettingsSection";

export function SettingsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string | null>(tabParam);

  const { logout, updateProfile, isUpdatingProfile, isLoggingOut } = useAuth();
  const {
    user,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useSession();
  const { theme, setTheme, fontSize, setFontSize } = usePreferences();
  const queryClient = useQueryClient();

  // Sync state with URL parameter changes
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const selectTab = (tabId: string | null) => {
    setActiveTab(tabId);
    if (tabId) {
      router.push(`/settings?tab=${tabId}`, { scroll: false });
    } else {
      router.push("/settings", { scroll: false });
    }
  };

  // Force a fresh profile fetch on mount
  useEffect(() => {
    refetchProfile({ cancelRefetch: true });
  }, [refetchProfile]);

  // Query deletion status - only call if user profile has deletionRequest
  const { data: deletionStatusData, refetch: refetchDeletionStatus } = useQuery(
    {
      queryKey: ["deletionStatus"],
      queryFn: () => authApi.getDeletionStatus(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enabled:
        !!user &&
        (!!(user as any).deletionRequest ||
          (user as any).accountStatus === "DELETION_REQUESTED"),
      retry: false,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletionRequest =
    deletionStatusData?.data || (user as any)?.deletionRequest;

  // Submit deletion request mutation
  const requestDeletionMutation = useMutation({
    mutationFn: () => authApi.requestDeletion(),
    onSuccess: (res) => {
      toast.success(res.message || "Deletion request submitted successfully.");
      setShowDeleteConfirm(false);
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
      refetchDeletionStatus();
    },
    onError: (error: unknown) => {
      toast.error(
        getApiErrorMessage(error, "Failed to submit deletion request.", "auth"),
      );
    },
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    companyName: "",
    gstin: "",
    pan: "",
    companyPhone: "",
    companyEmail: "",
    contactPerson: "",
    logoUrl: "",
    addressFullAddress: "",
    addressCity: "",
    addressDistrict: "",
    addressState: "",
    addressPincode: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState("");

  // Populate form once profile loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
        companyName: user.company?.companyName ?? "",
        gstin: user.company?.gstin ?? "",
        pan: user.company?.pan ?? "",
        companyPhone: user.company?.phone ?? "",
        companyEmail: user.company?.email ?? "",
        contactPerson: user.company?.contactPerson ?? "",
        logoUrl: user.company?.logoUrl ?? "",
        addressFullAddress: user.company?.address?.fullAddress ?? "",
        addressCity: user.company?.address?.city ?? "",
        addressDistrict: user.company?.address?.district ?? "",
        addressState: user.company?.address?.state ?? "",
        addressPincode: user.company?.address?.pincode ?? "",
        bankName: user.company?.bankDetails?.bankName ?? "",
        accountHolder: user.company?.bankDetails?.accountHolder ?? "",
        accountNumber: user.company?.bankDetails?.accountNumber ?? "",
        ifscCode: user.company?.bankDetails?.ifscCode ?? "",
      });
    }
  }, [user]);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    const address = {
      fullAddress: form.addressFullAddress.trim() || undefined,
      city: form.addressCity.trim() || undefined,
      district: form.addressDistrict.trim() || undefined,
      state: form.addressState.trim() || undefined,
      pincode: form.addressPincode.trim() || undefined,
    };
    const bankDetails = {
      bankName: form.bankName.trim() || undefined,
      accountHolder: form.accountHolder.trim() || undefined,
      accountNumber: form.accountNumber.trim() || undefined,
      ifscCode: form.ifscCode.trim() || undefined,
    };

    const hasAddress = Object.values(address).some(Boolean);
    const hasBankDetails = Object.values(bankDetails).some(Boolean);

    updateProfile({
      name: form.name.trim() || undefined,
      phone: form.phone.trim() || undefined,
      company: {
        companyName: form.companyName.trim() || undefined,
        gstin: form.gstin.trim() || undefined,
        pan: form.pan.trim() || undefined,
        phone: form.companyPhone.trim() || undefined,
        email: form.companyEmail.trim() || undefined,
        contactPerson: form.contactPerson.trim() || undefined,
        logoUrl: form.logoUrl.trim() || undefined,
        ...(hasAddress ? { address } : {}),
        ...(hasBankDetails ? { bankDetails } : {}),
      },
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB.");
      return;
    }

    setLogoUploadError("");
    setIsUploadingLogo(true);

    try {
      const logoUrl = await cloudinaryApi.uploadCompanyLogo(file);
      setForm((prev) => ({ ...prev, logoUrl }));
    } catch (error) {
      setLogoUploadError(
        error instanceof Error ? error.message : "Logo upload failed.",
      );
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const { isPlanActive, getDaysLeft } = usePlanStatus();

  // Define Mobile Settings Options using React Heroicons
  const settingsItems = useMemo(() => {
    const companyName = user?.company?.companyName || "Configure business profile";
    const userRole = user?.role ? user.role.toUpperCase() : "ACCOUNT";
    const planName =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (user as any)?.subscriptionTier ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (user as any)?.subscription?.plan ||
      "Standard Plan";

    return [
      {
        id: "company",
        title: "Company & Business Profile",
        description: "Manage business identity, GSTIN, PAN, logo, bank details & address",
        icon: HomeModernIcon,
        iconBg: "bg-sky-500/10 text-sky-500 border border-sky-500/20 dark:bg-sky-500/15",
        badge: companyName,
        isDanger: false,
      },
      {
        id: "appearance",
        title: "Appearance & Display",
        description: "Customize color theme (Light / Dark / System) and interface font sizing",
        icon: PaintBrushIcon,
        iconBg: "bg-violet-500/10 text-violet-500 border border-violet-500/20 dark:bg-violet-500/15",
        badge: `${theme.toUpperCase()} (${fontSize.toUpperCase()})`,
        isDanger: false,
      },
      {
        id: "subscription",
        title: "Subscription & Billing",
        description: "Check active plan features, usage quotas, validity days & upgrade options",
        icon: CreditCardIcon,
        iconBg: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 dark:bg-emerald-500/15",
        badge: planName,
        isDanger: false,
      },
      {
        id: "download",
        title: "Export & Data Backup",
        description: "Download ledger entries, customer invoices, and JSON data backups",
        icon: ArrowDownTrayIcon,
        iconBg: "bg-amber-500/10 text-amber-500 border border-amber-500/20 dark:bg-amber-500/15",
        badge: "Backup Data",
        isDanger: false,
      },
      {
        id: "import",
        title: "Bulk Data Import",
        description: "Import clients, inventory items, and historical business records",
        icon: ArrowUpTrayIcon,
        iconBg: "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 dark:bg-indigo-500/15",
        badge: "CSV / Excel",
        isDanger: false,
      },
      {
        id: "session",
        title: "Active Sessions & Security",
        description: "Monitor logged-in devices and active security sessions",
        icon: ShieldCheckIcon,
        iconBg: "bg-teal-500/10 text-teal-500 border border-teal-500/20 dark:bg-teal-500/15",
        badge: userRole,
        isDanger: false,
      },
      {
        id: "cookies",
        title: "Cookie & Consent Settings",
        description: "Control analytical, functional, and marketing cookie permissions",
        icon: AdjustmentsHorizontalIcon,
        iconBg: "bg-orange-500/10 text-orange-500 border border-orange-500/20 dark:bg-orange-500/15",
        badge: "Preferences",
        isDanger: false,
      },
      {
        id: "danger",
        title: "Danger Zone & Account Deletion",
        description: "Submit an account deletion request or check deletion request status",
        icon: ExclamationTriangleIcon,
        iconBg: "bg-rose-500/10 text-rose-500 border border-rose-500/20 dark:bg-rose-500/15",
        badge: deletionRequest ? "Deletion Pending" : "Sensitive",
        isDanger: true,
      },
    ];
  }, [user, theme, fontSize, deletionRequest]);

  // Find current active item for detail view header
  const activeItem = useMemo(() => {
    if (!activeTab) return null;
    return settingsItems.find((i) => i.id === activeTab) || null;
  }, [activeTab, settingsItems]);

  // RENDER FEATURE DETAIL VIEW WITH BACK BUTTON
  if (activeTab && activeItem) {
    const Icon = activeItem.icon;
    return (
      <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
        {/* Mobile Settings Detail Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => selectTab(null)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
              <span>Back to Settings</span>
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-3.5">
              <div className={cn("p-3 rounded-2xl shrink-0", activeItem.iconBg)}>
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeItem.title}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 self-start sm:self-auto border border-slate-200/60 dark:border-slate-700/60">
            <span>Status:</span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">
              {activeItem.badge}
            </span>
          </div>
        </div>

        {/* Feature Section Body */}
        <div className="transition-all duration-300">
          {activeTab === "company" && (
            <CompanyProfileSection
              form={form}
              set={set}
              setForm={setForm}
              handleSave={handleSave}
              handleLogoUpload={handleLogoUpload}
              isUploadingLogo={isUploadingLogo}
              logoUploadError={logoUploadError}
              isUpdatingProfile={isUpdatingProfile}
              isLoadingProfile={isLoadingProfile}
              user={user}
              deletionRequest={deletionRequest}
            />
          )}

          {activeTab === "appearance" && (
            <AppearanceSection
              theme={theme}
              setTheme={setTheme}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          )}

          {activeTab === "subscription" && (
            <SubscriptionSection
              user={user || null}
              isLoadingProfile={isLoadingProfile}
              getDaysLeft={getDaysLeft}
            />
          )}

          {activeTab === "download" && <DownloadDataSection />}

          {activeTab === "import" && <ImportDataSection />}

          {activeTab === "session" && (
            <SessionSection logout={logout} isLoggingOut={isLoggingOut} />
          )}

          {activeTab === "cookies" && <CookieSettingsSection />}

          {activeTab === "danger" && (
            <DangerZoneSection
              showDeleteConfirm={showDeleteConfirm}
              setShowDeleteConfirm={setShowDeleteConfirm}
              onSubmitDeletionRequest={() => requestDeletionMutation.mutate()}
              isSubmittingDeletion={requestDeletionMutation.isPending}
              deletionRequest={deletionRequest}
            />
          )}
        </div>
      </div>
    );
  }

  // RENDER ROOT MOBILE SETTINGS HUB MENU
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your business configuration, preferences, and security settings.
        </p>
      </div>

      {/* Human-Centered Custom Profile Header Banner */}
      <div className="w-full relative overflow-hidden p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-sky-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-slate-950/20 border border-slate-200/90 dark:border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Background glow mesh effect */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          {/* Avatar with status dot */}
          <div className="relative shrink-0">
            {user?.company?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.company.logoUrl}
                alt="Company Logo"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700/80 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-sky-500/20">
                {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-8 h-8 text-white" />}
              </div>
            )}
            <span
              className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm",
                isPlanActive ? "bg-emerald-500" : "bg-red-500",
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {user?.name || "Business Account"}
              </h2>
              {isPlanActive ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-400/30">
                  <CheckBadgeIcon className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                  ⚠ No active plan
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {user?.email || user?.phone || "Managing TMS Account"}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {user?.company?.companyName
                ? `${user.company.companyName}`
                : "Organization profile pending setup"}
            </p>
          </div>
        </div>

        <button
          onClick={() => selectTab("company")}
          className="relative z-10 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/15 active:scale-[0.98] text-white border border-slate-900 dark:border-white/10 text-xs font-bold tracking-wide shadow-sm transition-all hover:border-slate-800 dark:hover:border-white/20 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <HomeModernIcon className="w-4 h-4 text-sky-400" />
          <span>Manage Business Profile</span>
        </button>
      </div>

      {/* Spacious Option Cards List */}
      <div className="w-full space-y-3.5">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => selectTab(item.id)}
              className={cn(
                "w-full p-5 sm:p-6 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group",
                item.isDanger
                  ? "border-rose-200/80 dark:border-rose-950/80 hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50/30 dark:hover:bg-rose-950/10"
                  : "border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40",
              )}
            >
              <div className="flex items-center gap-4.5 min-w-0">
                <div
                  className={cn(
                    "p-3.5 rounded-2xl shrink-0 transition-transform group-hover:scale-105 shadow-sm",
                    item.iconBg,
                  )}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="min-w-0 space-y-1">
                  <h3
                    className={cn(
                      "text-base font-bold truncate",
                      item.isDanger
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed truncate">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {item.badge && (
                  <span
                    className={cn(
                      "hidden sm:inline-flex px-3 py-1 rounded-xl text-xs font-bold max-w-[170px] truncate border shadow-2xs",
                      item.isDanger
                        ? "bg-rose-100/80 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                        : "bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRightIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
