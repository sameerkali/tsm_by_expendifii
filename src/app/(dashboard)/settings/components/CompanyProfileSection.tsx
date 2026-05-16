'use client';

import React from 'react';
import { Building2, Phone, Upload, User, Mail, Hash, Briefcase, MapPin, Landmark, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button, inputClass } from '@/components/ui';
import { Field } from './Field';

interface CompanyProfileSectionProps {
  form: any;
  set: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingLogo: boolean;
  logoUploadError: string;
  isUpdatingProfile: boolean;
  isLoadingProfile: boolean;
  user: any;
}

export function CompanyProfileSection({
  form,
  set,
  handleSave,
  handleLogoUpload,
  isUploadingLogo,
  logoUploadError,
  isUpdatingProfile,
  isLoadingProfile,
  user,
}: CompanyProfileSectionProps) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
        <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Company Profile</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">Update your name, phone, and company. Email is locked.</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Logo upload */}
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 shrink-0 overflow-hidden">
            {form.logoUrl ? (
              <img src={form.logoUrl} alt="Company logo" className="h-full w-full object-contain p-2" />
            ) : (
              <Building2 size={32} />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Logo</p>
            <label className={cn(
              'flex w-fit items-center gap-2 h-9 px-4 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all',
              isUploadingLogo ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
            )}>
              {isUploadingLogo ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {isUploadingLogo ? 'Uploading...' : 'Upload Logo'}
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                disabled={isUploadingLogo}
                onChange={handleLogoUpload}
              />
            </label>
            <p className="text-[10px] text-slate-400">PNG or JPG. Max 2MB. Appears on printed GR documents.</p>
            {logoUploadError && <p className="text-[10px] font-bold text-red-500">{logoUploadError}</p>}
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoadingProfile ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Field label="Full Name" required>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your full name"
                  className={inputClass + ' pl-10'}
                />
              </div>
            </Field>

            <Field label="Email Address" locked hint="Cannot be changed">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={user?.email ?? ''}
                  readOnly
                  className={inputClass + ' pl-10 opacity-50 cursor-not-allowed'}
                />
              </div>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phone Number">
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClass + ' pl-10'}
                  />
                </div>
              </Field>

              <Field label="Company Name">
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.companyName}
                    onChange={set('companyName')}
                    placeholder="Your company name"
                    className={inputClass + ' pl-10'}
                  />
                </div>
              </Field>

              <Field label="GSTIN">
                <div className="relative">
                  <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.gstin} onChange={set('gstin')} placeholder="Company GSTIN" className={inputClass + ' pl-10 uppercase'} />
                </div>
              </Field>

              <Field label="PAN">
                <div className="relative">
                  <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.pan} onChange={set('pan')} placeholder="Company PAN" className={inputClass + ' pl-10 uppercase'} />
                </div>
              </Field>

              <Field label="Company Phone">
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" value={form.companyPhone} onChange={set('companyPhone')} placeholder="Company phone" className={inputClass + ' pl-10'} />
                </div>
              </Field>

              <Field label="Company Email">
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" value={form.companyEmail} onChange={set('companyEmail')} placeholder="Company email" className={inputClass + ' pl-10'} />
                </div>
              </Field>

              <Field label="Contact Person">
                <div className="relative">
                  <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.contactPerson} onChange={set('contactPerson')} placeholder="Primary contact" className={inputClass + ' pl-10'} />
                </div>
              </Field>

              <Field label="Logo URL">
                <div className="relative">
                  <Upload size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.logoUrl} onChange={set('logoUrl')} placeholder="https://..." className={inputClass + ' pl-10'} />
                </div>
              </Field>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Company Address</h3>
              <Field label="Full Address">
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.addressFullAddress} onChange={set('addressFullAddress')} placeholder="Registered address" className={inputClass + ' pl-10'} />
                </div>
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field label="City">
                  <input value={form.addressCity} onChange={set('addressCity')} placeholder="City" className={inputClass} />
                </Field>
                <Field label="District">
                  <input value={form.addressDistrict} onChange={set('addressDistrict')} placeholder="District" className={inputClass} />
                </Field>
                <Field label="State">
                  <input value={form.addressState} onChange={set('addressState')} placeholder="State" className={inputClass} />
                </Field>
                <Field label="Pincode">
                  <input value={form.addressPincode} onChange={set('addressPincode')} placeholder="Pincode" className={inputClass} />
                </Field>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Bank Name">
                  <div className="relative">
                    <Landmark size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.bankName} onChange={set('bankName')} placeholder="Bank name" className={inputClass + ' pl-10'} />
                  </div>
                </Field>
                <Field label="Account Holder">
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.accountHolder} onChange={set('accountHolder')} placeholder="Account holder" className={inputClass + ' pl-10'} />
                  </div>
                </Field>
                <Field label="Account Number">
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.accountNumber} onChange={set('accountNumber')} placeholder="Account number" className={inputClass + ' pl-10'} />
                  </div>
                </Field>
                <Field label="IFSC Code">
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.ifscCode} onChange={set('ifscCode')} placeholder="IFSC code" className={inputClass + ' pl-10 uppercase'} />
                  </div>
                </Field>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleSave}
          loading={isUpdatingProfile}
          disabled={isLoadingProfile || isUpdatingProfile}
          className="w-[180px]"
        >
          {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </section>
  );
}
