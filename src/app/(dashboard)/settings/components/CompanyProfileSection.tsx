'use client';

import React, { useState } from 'react';
import { Building2, Phone, Upload, User, Mail, Hash, Briefcase, MapPin, Landmark, Loader2, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button, inputClass } from '@/components/ui';
import { Field } from './Field';
import { 
  fullNameSchema, customerPhoneSchema, companyNameSchema, 
  gstinSchema, panSchema, emailSchema, contactPersonSchema,
  sanitizeValue, validateValue, type FieldSchema
} from '@/lib/validation';
import { toast } from 'sonner';

const PROFILE_SCHEMAS: Record<string, FieldSchema> = {
  name: fullNameSchema,
  phone: customerPhoneSchema,
  companyName: companyNameSchema,
  gstin: gstinSchema,
  pan: panSchema,
  companyPhone: { ...customerPhoneSchema, required: false, label: 'Company Phone' },
  companyEmail: { ...emailSchema, required: false, label: 'Company Email' },
  contactPerson: contactPersonSchema,
};

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

// Style for read-only inputs (view mode)
const readOnlyStyle = 'bg-slate-50/50 dark:bg-slate-800/50 cursor-default !border-transparent';

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
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const schema = PROFILE_SCHEMAS[field];
    if (schema) {
      e.target.value = sanitizeValue(e.target.value, schema) as string;
    }
    set(field)(e);
    if (touched[field] && schema) {
      const error = validateValue(e.target.value, schema);
      setFieldErrors(prev => ({ ...prev, [field]: error ?? '' }));
    }
  };

  const handleBlur = (field: string) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const schema = PROFILE_SCHEMAS[field];
    if (schema) {
      let value = form[field];
      if (typeof value === 'string') {
        value = value.trim();
        set(field)({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
      }
      const error = validateValue(value, schema);
      setFieldErrors(prev => ({ ...prev, [field]: error ?? '' }));
    }
  };

  const onSave = () => {
    const errors: Record<string, string> = {};
    for (const [field, schema] of Object.entries(PROFILE_SCHEMAS)) {
      const value = form[field];
      if (!schema.required && (!value || (typeof value === 'string' && !value.trim()))) continue;
      const error = validateValue(value, schema);
      if (error) errors[field] = error;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched(Object.keys(errors).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
      toast.error('Please fix the errors before saving.');
      return;
    }

    handleSave();
    setIsEditing(false);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Round company logo */}
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 text-slate-400 shrink-0 overflow-hidden">
              {form.logoUrl ? (
                <img src={form.logoUrl} alt="Company logo" className="h-full w-full object-cover" />
              ) : (
                <Building2 size={24} />
              )}
            </div>
            {isEditing && (
              <label className={cn(
                'absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md border-2 border-white dark:border-slate-900',
                isUploadingLogo ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              )}>
                {isUploadingLogo ? <Loader2 size={10} className="animate-spin" /> : <Upload size={10} />}
                <input type="file" accept="image/png,image/jpeg" className="sr-only" disabled={isUploadingLogo} onChange={handleLogoUpload} />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Company Profile</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {isEditing ? 'Edit your details below and click Save Profile.' : 'Your company details. Click Edit Profile to make changes.'}
            </p>
            {logoUploadError && <p className="text-[10px] font-bold text-red-500 mt-0.5">{logoUploadError}</p>}
          </div>
        </div>
        {/* Editing indicator badge */}
        {isEditing && (
          <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200 dark:border-emerald-800/50">
            Editing
          </span>
        )}
      </div>

      <div className="p-8 space-y-6">

        {/* Loading skeleton */}
        {isLoadingProfile ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Field label="Full Name" required error={fieldErrors.name}>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={form.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  maxLength={60}
                  readOnly={!isEditing}
                  placeholder="Your full name"
                  className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle, fieldErrors.name && '!border-red-500 !ring-red-500/20')}
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
              <Field label="Phone Number" error={fieldErrors.phone}>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" value={form.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')} readOnly={!isEditing} placeholder="+91 XXXXX XXXXX" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle, fieldErrors.phone && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

              <Field label="Company Name" error={fieldErrors.companyName}>
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.companyName} onChange={handleChange('companyName')} onBlur={handleBlur('companyName')} maxLength={60} readOnly={!isEditing} placeholder="Your company name" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle, fieldErrors.companyName && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

              <Field label="GSTIN" error={fieldErrors.gstin}>
                <div className="relative">
                  <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.gstin} onChange={handleChange('gstin')} onBlur={handleBlur('gstin')} maxLength={15} readOnly={!isEditing} placeholder="Company GSTIN" className={cn(inputClass, 'pl-10 uppercase', !isEditing && readOnlyStyle, fieldErrors.gstin && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

              <Field label="PAN" error={fieldErrors.pan}>
                <div className="relative">
                  <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.pan} onChange={handleChange('pan')} onBlur={handleBlur('pan')} maxLength={10} readOnly={!isEditing} placeholder="Company PAN" className={cn(inputClass, 'pl-10 uppercase', !isEditing && readOnlyStyle, fieldErrors.pan && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

              <Field label="Company Phone" error={fieldErrors.companyPhone}>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" value={form.companyPhone} onChange={handleChange('companyPhone')} onBlur={handleBlur('companyPhone')} readOnly={!isEditing} placeholder="Company phone" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle, fieldErrors.companyPhone && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

              <Field label="Company Email" error={fieldErrors.companyEmail}>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" value={form.companyEmail} onChange={handleChange('companyEmail')} onBlur={handleBlur('companyEmail')} readOnly={!isEditing} placeholder="Company email" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle, fieldErrors.companyEmail && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

              <Field label="Contact Person" error={fieldErrors.contactPerson}>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.contactPerson} onChange={handleChange('contactPerson')} onBlur={handleBlur('contactPerson')} maxLength={60} readOnly={!isEditing} placeholder="Primary contact" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle, fieldErrors.contactPerson && '!border-red-500 !ring-red-500/20')} />
                </div>
              </Field>

          
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Company Address</h3>
              <Field label="Full Address">
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.addressFullAddress} onChange={set('addressFullAddress')} readOnly={!isEditing} placeholder="Registered address" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle)} />
                </div>
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field label="City">
                  <input value={form.addressCity} onChange={set('addressCity')} readOnly={!isEditing} placeholder="City" className={cn(inputClass, !isEditing && readOnlyStyle)} />
                </Field>
                <Field label="District">
                  <input value={form.addressDistrict} onChange={set('addressDistrict')} readOnly={!isEditing} placeholder="District" className={cn(inputClass, !isEditing && readOnlyStyle)} />
                </Field>
                <Field label="State">
                  <input value={form.addressState} onChange={set('addressState')} readOnly={!isEditing} placeholder="State" className={cn(inputClass, !isEditing && readOnlyStyle)} />
                </Field>
                <Field label="Pincode">
                  <input value={form.addressPincode} onChange={set('addressPincode')} readOnly={!isEditing} placeholder="Pincode" className={cn(inputClass, !isEditing && readOnlyStyle)} />
                </Field>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Bank Name">
                  <div className="relative">
                    <Landmark size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.bankName} onChange={set('bankName')} readOnly={!isEditing} placeholder="Bank name" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle)} />
                  </div>
                </Field>
                <Field label="Account Holder">
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.accountHolder} onChange={set('accountHolder')} readOnly={!isEditing} placeholder="Account holder" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle)} />
                  </div>
                </Field>
                <Field label="Account Number">
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.accountNumber} onChange={set('accountNumber')} readOnly={!isEditing} placeholder="Account number" className={cn(inputClass, 'pl-10', !isEditing && readOnlyStyle)} />
                  </div>
                </Field>
                <Field label="IFSC Code">
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={form.ifscCode} onChange={set('ifscCode')} readOnly={!isEditing} placeholder="IFSC code" className={cn(inputClass, 'pl-10 uppercase', !isEditing && readOnlyStyle)} />
                  </div>
                </Field>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              disabled={isLoadingProfile}
              className="w-[180px] flex items-center justify-center gap-2"
            >
              <Pencil size={14} />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={onSave}
                loading={isUpdatingProfile}
                disabled={isUpdatingProfile}
                className="w-[180px]"
              >
                {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(false)}
                disabled={isUpdatingProfile}
                className="px-6 text-sm font-bold"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
