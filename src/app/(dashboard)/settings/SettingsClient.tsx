'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { usePreferences } from '@/providers/PreferencesProvider';
import { cloudinaryApi } from '@/lib/api/cloudinary.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authApi from '@/lib/api/auth.api';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/errors';
import { COMPANY_KEYS } from '@/config/query-keys';

// Components
import { AppearanceSection } from './components/AppearanceSection';
import { CompanyProfileSection } from './components/CompanyProfileSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { DownloadDataSection } from './components/DownloadDataSection';
import { ImportDataSection } from './components/ImportDataSection';
import { SessionSection } from './components/SessionSection';
import { DangerZoneSection } from './components/DangerZoneSection';

export function SettingsClient() {
  const { logout, updateProfile, isUpdatingProfile, isLoggingOut } = useAuth();
  const { user, isLoading: isLoadingProfile } = useSession();
  const { theme, setTheme, fontSize, setFontSize } = usePreferences();
  const queryClient = useQueryClient();

  // Query deletion status - only call if user profile has deletionRequest
  const { data: deletionStatusData, refetch: refetchDeletionStatus } = useQuery({
    queryKey: ['deletionStatus'],
    queryFn: () => authApi.getDeletionStatus(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enabled: !!user && (!!(user as any).deletionRequest || (user as any).accountStatus === 'DELETION_REQUESTED'),
    retry: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletionRequest = deletionStatusData?.data || (user as any)?.deletionRequest;

  // Submit deletion request mutation
  const requestDeletionMutation = useMutation({
    mutationFn: () => authApi.requestDeletion(),
    onSuccess: (res) => {
      toast.success(res.message || 'Deletion request submitted successfully.');
      setShowDeleteConfirm(false);
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.profile() });
      refetchDeletionStatus();
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to submit deletion request.', 'auth'));
    },
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    companyName: '',
    gstin: '',
    pan: '',
    companyPhone: '',
    companyEmail: '',
    contactPerson: '',
    logoUrl: '',
    addressFullAddress: '',
    addressCity: '',
    addressDistrict: '',
    addressState: '',
    addressPincode: '',
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState('');

  // Populate form once profile loads
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: user.name ?? '',
        phone: user.phone ?? '',
        companyName: user.company?.companyName ?? '',
        gstin: user.company?.gstin ?? '',
        pan: user.company?.pan ?? '',
        companyPhone: user.company?.phone ?? '',
        companyEmail: user.company?.email ?? '',
        contactPerson: user.company?.contactPerson ?? '',
        logoUrl: user.company?.logoUrl ?? '',
        addressFullAddress: user.company?.address?.fullAddress ?? '',
        addressCity: user.company?.address?.city ?? '',
        addressDistrict: user.company?.address?.district ?? '',
        addressState: user.company?.address?.state ?? '',
        addressPincode: user.company?.address?.pincode ?? '',
        bankName: user.company?.bankDetails?.bankName ?? '',
        accountHolder: user.company?.bankDetails?.accountHolder ?? '',
        accountNumber: user.company?.bankDetails?.accountNumber ?? '',
        ifscCode: user.company?.bankDetails?.ifscCode ?? '',
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
    e.target.value = '';
    if (!file) return;

    // Validate: must be an image
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed.');
      return;
    }

    // Validate: max 2 MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2 MB.');
      return;
    }

    setLogoUploadError('');
    setIsUploadingLogo(true);

    try {
      const logoUrl = await cloudinaryApi.uploadCompanyLogo(file);
      setForm((prev) => ({ ...prev, logoUrl }));
    } catch (error) {
      setLogoUploadError(error instanceof Error ? error.message : 'Logo upload failed.');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const getDaysLeft = (expiresAt: string) => {
    const today = new Date();
    const expDate = new Date(expiresAt);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs font-black tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase italic">SYSTEM CONFIGURATION</p>
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Settings</h1>
      </div>

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

      <AppearanceSection
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <SubscriptionSection
        user={user || null}
        isLoadingProfile={isLoadingProfile}
        getDaysLeft={getDaysLeft}
      />

      <DownloadDataSection />

      <ImportDataSection />

      <SessionSection
        logout={logout}
        isLoggingOut={isLoggingOut}
      />

      <DangerZoneSection
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        onSubmitDeletionRequest={() => requestDeletionMutation.mutate()}
        isSubmittingDeletion={requestDeletionMutation.isPending}
        deletionRequest={deletionRequest}
      />
    </div>
  );
}
