'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCustomer, useUpdateCustomer } from '@/hooks/useCustomers';
import { PRICING_TYPE_OPTIONS, INDIAN_STATES } from '@/lib/validations/customer.schema';
import type { Customer, PricingType } from '@/types/customer';

interface CustomerFormPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: Customer | null;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  pricingType: string;
  defaultRate: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  phone: '',
  email: '',
  gstin: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  pricingType: '',
  defaultRate: '',
};

function customerToForm(c: Customer): FormState {
  return {
    name: c.name ?? '',
    phone: c.phone ?? '',
    email: c.email ?? '',
    gstin: c.gstin ?? '',
    address: c.address ?? '',
    city: c.city ?? '',
    state: c.state ?? '',
    pincode: c.pincode ?? '',
    pricingType: c.pricingType ?? '',
    defaultRate: c.defaultRate != null ? String(c.defaultRate) : '',
  };
}

function formToPayload(form: FormState) {
  const payload: Record<string, unknown> = {
    name: form.name,
    phone: form.phone,
  };
  if (form.email.trim()) payload.email = form.email.trim();
  if (form.gstin.trim()) payload.gstin = form.gstin.trim();
  if (form.address.trim()) payload.address = form.address.trim();
  if (form.city.trim()) payload.city = form.city.trim();
  if (form.state.trim()) payload.state = form.state.trim();
  if (form.pincode.trim()) payload.pincode = form.pincode.trim();
  if (form.pricingType) payload.pricingType = form.pricingType as PricingType;
  if (form.defaultRate.trim()) payload.defaultRate = parseFloat(form.defaultRate);
  return payload;
}

export function CustomerFormPanel({ isOpen, onClose, editData }: CustomerFormPanelProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const isEditing = !!editData?.id;

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isOpen) {
      setForm(editData ? customerToForm(editData) : EMPTY_FORM);
      setFieldErrors({});
    }
  }, [isOpen, editData]);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (fieldErrors[field]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Basic client-side validation
    if (!form.name.trim()) {
      setFieldErrors({ name: 'Name is required' });
      return;
    }
    if (!form.phone.trim() || form.phone.trim().length < 10) {
      setFieldErrors({ phone: 'Phone must be at least 10 digits' });
      return;
    }

    const payload = formToPayload(form);

    const onError = (error: unknown) => {
      // Handle backend field-level validation errors
      if (error && typeof error === 'object' && 'errors' in error) {
        const details = (error as any).errors;
        if (Array.isArray(details)) {
          const mapped: Record<string, string> = {};
          details.forEach((d: { field: string; message: string }) => {
            mapped[d.field] = d.message;
          });
          setFieldErrors(mapped);
        }
      }
    };

    if (isEditing && editData?.id) {
      updateMutation.mutate(
        { id: editData.id, data: payload },
        { onSuccess: () => onClose(), onError },
      );
    } else {
      createMutation.mutate(payload as any, {
        onSuccess: () => onClose(),
        onError,
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      )}

      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">
              {isEditing ? 'EDIT CUSTOMER' : 'NEW CUSTOMER'}
            </p>
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              {isEditing ? editData?.name : 'Add Customer'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-6"
        >
          {/* Basic Info */}
          <Field label="Full Name / Company Name" required error={fieldErrors.name}>
            <input
              placeholder="e.g. Sharma Traders"
              value={form.name}
              onChange={set('name')}
              className={cn(inputClass, fieldErrors.name && errorInputClass)}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" required error={fieldErrors.phone}>
              <input
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={set('phone')}
                className={cn(inputClass, fieldErrors.phone && errorInputClass)}
                required
              />
            </Field>
            <Field label="Email" error={fieldErrors.email}>
              <input
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={set('email')}
                className={cn(inputClass, fieldErrors.email && errorInputClass)}
              />
            </Field>
          </div>

          <Field label="GSTIN" error={fieldErrors.gstin}>
            <input
              placeholder="e.g. 27AABCU9603R1ZX"
              value={form.gstin}
              onChange={set('gstin')}
              className={cn(inputClass, fieldErrors.gstin && errorInputClass)}
            />
          </Field>

          {/* Address Section */}
          <Field label="Address" error={fieldErrors.address}>
            <textarea
              placeholder="Full street address"
              value={form.address}
              onChange={set('address')}
              rows={2}
              className={cn(inputClass, 'resize-none h-auto py-3', fieldErrors.address && errorInputClass)}
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="City" error={fieldErrors.city}>
              <input
                placeholder="e.g. Delhi"
                value={form.city}
                onChange={set('city')}
                className={cn(inputClass, fieldErrors.city && errorInputClass)}
              />
            </Field>
            <Field label="State" error={fieldErrors.state}>
              <div className="relative">
                <select
                  value={form.state}
                  onChange={set('state')}
                  className={cn(inputClass, 'appearance-none pr-8 cursor-pointer', fieldErrors.state && errorInputClass)}
                >
                  <option value="">Select</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Pincode" error={fieldErrors.pincode}>
              <input
                placeholder="110001"
                value={form.pincode}
                onChange={set('pincode')}
                className={cn(inputClass, fieldErrors.pincode && errorInputClass)}
              />
            </Field>
          </div>

          {/* Pricing Section */}
          <Field
            label="Pricing Type & Default Rate"
            hint="Auto-fills GR rate for this customer"
            error={fieldErrors.pricingType || fieldErrors.defaultRate}
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <select
                  value={form.pricingType}
                  onChange={set('pricingType')}
                  className={cn(inputClass, 'appearance-none pr-8 cursor-pointer')}
                >
                  <option value="">None</option>
                  {PRICING_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              <div className="relative w-36 shrink-0">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={form.defaultRate}
                  onChange={set('defaultRate')}
                  className={cn(inputClass, 'pl-8')}
                />
              </div>
            </div>
          </Field>

          {/* Rate preview */}
          {form.defaultRate && form.pricingType && (
            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                ₹ {form.defaultRate}
              </span>
              <span className="text-xs font-bold text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-widest">
                / {form.pricingType}
              </span>
              <span className="ml-auto text-[10px] text-slate-400 font-medium">
                Default GR rate
              </span>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="h-20 border-t border-slate-100 dark:border-slate-800 px-8 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="h-12 px-8 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold text-sm tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Customer'}
          </button>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  children,
  required,
  hint,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && (
          <span className="text-slate-400 font-normal italic">— {hint}</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  'w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

const errorInputClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/20';
