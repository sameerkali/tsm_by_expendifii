'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Loader2, ChevronDown, CheckCircle2, AlertCircle, Search, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCustomer, useUpdateCustomer } from '@/hooks/useCustomers';
import { getApiFieldErrors } from '@/lib/api/errors';
import { PRICING_TYPE_OPTIONS } from '@/lib/validations/customer.schema';
import type { CreateCustomerInput, Customer, PricingType } from '@/types/customer';
import { sanitizeValue } from '@/lib/validation/sanitize';
import { validateValue } from '@/lib/validation/validate';
import {
  customerNameSchema,
  customerPhoneSchema,
  customerEmailSchema,
  customerGstinSchema,
  customerAddressSchema,
  customerCitySchema,
  customerPincodeSchema,
  defaultRateSchema,
} from '@/lib/validation/schemas';
import type { FieldSchema } from '@/lib/validation/fieldSchema';
import { usePincodeAutofill } from '@/hooks/usePincodeAutofill';

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
  pincode: number;
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
  pincode: 0,
  pricingType: '',
  defaultRate: '',
};

// Schema map — links each form field to its validation schema
const FIELD_SCHEMAS: Partial<Record<keyof FormState, FieldSchema>> = {
  name: customerNameSchema,
  phone: customerPhoneSchema,
  email: customerEmailSchema,
  gstin: customerGstinSchema,
  address: customerAddressSchema,
  city: customerCitySchema,
  pincode: customerPincodeSchema,
  defaultRate: defaultRateSchema,
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
    pincode: c.pincode ? Number(c.pincode) : 0,
    pricingType: c.pricingType ?? '',
    defaultRate: c.defaultRate != null ? String(c.defaultRate) : '',
  };
}

function formToPayload(form: FormState): CreateCustomerInput {
  const payload: CreateCustomerInput = {
    name: String(form.name).trim(),
    phone: String(form.phone).trim(),
  };
  if (form.email != null && String(form.email).trim()) payload.email = String(form.email).trim();
  if (form.gstin != null && String(form.gstin).trim()) payload.gstin = String(form.gstin).trim();
  if (form.address != null && String(form.address).trim()) payload.address = String(form.address).trim();
  if (form.city != null && String(form.city).trim()) payload.city = String(form.city).trim();
  if (form.state != null && String(form.state).trim()) payload.state = String(form.state).trim();
  if (form.pincode != null && String(form.pincode).trim() !== '') payload.pincode = Number(form.pincode);
  if (form.pricingType) payload.pricingType = form.pricingType as PricingType;
  if (form.defaultRate != null && String(form.defaultRate).trim() !== '') payload.defaultRate = parseFloat(String(form.defaultRate));
  return payload;
}

// ─── Locality Combobox (inline, reused pattern from RegisterForm) ─────────────

interface LocalityComboboxProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

function LocalityCombobox({ options, value, onChange, disabled }: LocalityComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={open ? query : value}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (!disabled && options.length > 0) setOpen(true); }}
          onClick={() => { if (!disabled && options.length > 0) setOpen(true); }}
          placeholder={disabled ? 'Enter pincode first' : 'Select Locality / Area'}
          disabled={disabled}
          autoComplete="off"
          className={cn(
            inputClass,
            'pr-8',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {open ? <Search size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          {filtered.map((name) => (
            <button
              key={name}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(name)}
              className={cn(
                'w-full text-left px-4 py-2.5 text-sm transition-colors',
                value === name
                  ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      {open && filtered.length === 0 && query && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-3 text-sm text-slate-400">
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function CustomerFormPanel({ isOpen, onClose, editData }: CustomerFormPanelProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const isEditing = !!editData?.id;

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  // ── Pincode autofill state ─────────────────────────────────────────────────
  const [manualMode, setManualMode] = useState(false);
  const [districtLocked, setDistrictLocked] = useState(true);
  const [stateLocked, setStateLocked] = useState(true);

  const pincodeStr = String(form.pincode || '');

  const onAutofill = useCallback((payload: { city: string; district: string; state: string }) => {
    setForm((prev) => ({
      ...prev,
      ...(payload.city ? { city: payload.city } : {}),
      ...(payload.district ? { } : {}), // district stored separately
      ...(payload.state ? { state: payload.state } : {}),
    }));
    // Store district in fieldErrors-adjacent state via a dedicated holder
    setAutofillDistrict(payload.district);
    setForm((prev) => ({
      ...prev,
      ...(payload.city ? { city: payload.city } : {}),
      state: payload.state || prev.state,
    }));
  }, []);

  const onClear = useCallback(() => {
    setForm((prev) => ({ ...prev, city: '', state: '' }));
    setAutofillDistrict('');
  }, []);

  const [autofillDistrict, setAutofillDistrict] = useState('');

  const { status: pincodeStatus, errorMessage: pincodeError, localityOptions, selectLocality, clearAutofill } =
    usePincodeAutofill(pincodeStr, onAutofill, onClear);

  // Re-lock when autofill succeeds; reset manual mode if pincode becomes valid
  useEffect(() => {
    if (pincodeStatus === 'success') {
      setDistrictLocked(true);
      setStateLocked(true);
      setManualMode(false);
    }
    if (pincodeStatus === 'idle') {
      setDistrictLocked(true);
      setStateLocked(true);
    }
  }, [pincodeStatus]);

  const handleEnterManually = () => {
    clearAutofill();
    setManualMode(true);
  };

  const handleBackToAuto = () => {
    setManualMode(false);
    setForm((prev) => ({ ...prev, city: '', state: '' }));
    setAutofillDistrict('');
  };
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isOpen) {
      setForm(editData ? customerToForm(editData) : EMPTY_FORM);
      setFieldErrors({});
      setTouched({});
      setManualMode(false);
      setAutofillDistrict('');
    }
  }, [isOpen, editData]);

  // Sanitize + validate on change, show error only if touched
  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const schema = FIELD_SCHEMAS[field];
      let value = e.target.value;

      if (schema) {
        value = sanitizeValue(value, schema) as string;
      }

      setForm((prev) => ({ ...prev, [field]: value }));

      // Only show error if already touched
      if (touched[field] && schema) {
        const error = validateValue(value != null ? String(value) : '', schema);
        setFieldErrors((prev) => ({ ...prev, [field]: error ?? '' }));
      }
    };

  const blur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const schema = FIELD_SCHEMAS[field];
    if (schema) {
      let value = form[field];
      if (typeof value === 'string') {
        value = value.trim();
        setForm(prev => ({ ...prev, [field]: value }));
      }
      const error = validateValue(value != null ? String(value) : '', schema);
      setFieldErrors((prev) => ({ ...prev, [field]: error ?? '' }));
    }
  };

  // Validate all fields on submit
  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    const allTouched: Record<string, boolean> = {};

    for (const [field, schema] of Object.entries(FIELD_SCHEMAS)) {
      if (!schema) continue;
      allTouched[field] = true;
      const value = form[field as keyof FormState];
      const error = validateValue(value != null ? String(value) : '', schema);
      if (error) errors[field] = error;
    }

    setTouched((prev) => ({ ...prev, ...allTouched }));
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    const payload = formToPayload(form);

    const onError = (error: unknown) => {
      const mapped = getApiFieldErrors(error);
      if (Object.keys(mapped).length > 0) {
        setFieldErrors((prev) => ({ ...prev, ...mapped }));
        setTouched((prev) => ({
          ...prev,
          ...Object.keys(mapped).reduce<Record<string, boolean>>((acc, field) => {
            acc[field] = true;
            return acc;
          }, {}),
        }));
      }
    };

    if (isEditing && editData?.id) {
      updateMutation.mutate(
        { id: editData.id, data: payload },
        { onSuccess: () => onClose(), onError },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => onClose(),
        onError,
      });
    }
  };

  const err = (field: keyof FormState) => (touched[field] && fieldErrors[field]) || '';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40" onClick={onClose} />
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
            <p className="text-[10px] font-black tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase italic">
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
          <Field label="Full Name / Company Name" required error={err('name')}>
            <input
              placeholder="e.g. Sharma Traders"
              value={form.name}
              onChange={set('name')}
              onBlur={blur('name')}
              className={cn(inputClass, err('name') && errorInputClass)}
              maxLength={60}
            />
            <CharCount value={form.name} max={60} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone" required error={err('phone')} >
              <input
                type="tel"
                inputMode="numeric"
                placeholder="9876543210"
                value={form.phone}
                onChange={set('phone')}
                onBlur={blur('phone')}
                className={cn(inputClass, err('phone') && errorInputClass)}
                maxLength={10}
              />
            </Field>
            <Field label="Email" error={err('email')}>
              <input
                type="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={set('email')}
                onBlur={blur('email')}
                className={cn(inputClass, err('email') && errorInputClass)}
              />
            </Field>
          </div>

          <Field label="GSTIN" error={err('gstin')} >
            <input
              placeholder="e.g. 27AABCU9603R1ZX"
              value={form.gstin}
              onChange={set('gstin')}
              onBlur={blur('gstin')}
              className={cn(inputClass, err('gstin') && errorInputClass)}
              maxLength={15}
            />
          </Field>

          {/* Address Section */}
          <Field label="Address" error={err('address')}>
            <textarea
              placeholder="Full street address"
              value={form.address}
              onChange={set('address')}
              onBlur={blur('address')}
              rows={2}
              maxLength={300}
              className={cn(inputClass, 'resize-none h-auto py-3', err('address') && errorInputClass)}
            />
          </Field>

          {/* ── Pincode-first address autofill ─────────────────────────── */}
          {manualMode ? (
            /* Manual fallback */
            <>
              <div className="flex items-center justify-between px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <span className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Pencil size={11} />
                  Manual address entry
                </span>
                <button
                  type="button"
                  onClick={handleBackToAuto}
                  className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium transition-colors"
                >
                  ← Back to auto-detect
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Pincode" error={err('pincode')}>
                  <input
                    inputMode="numeric"
                    placeholder="110001"
                    value={form.pincode || ''}
                    onChange={set('pincode')}
                    onBlur={blur('pincode')}
                    maxLength={6}
                    className={cn(inputClass, err('pincode') && errorInputClass)}
                  />
                </Field>
                <Field label="Locality / City" error={err('city')}>
                  <input
                    placeholder="e.g. Saket"
                    value={form.city}
                    onChange={set('city')}
                    onBlur={blur('city')}
                    maxLength={50}
                    className={cn(inputClass, err('city') && errorInputClass)}
                  />
                </Field>
                <Field label="State" error={fieldErrors.state}>
                  <input
                    placeholder="e.g. Maharashtra"
                    value={form.state}
                    onChange={set('state')}
                    onBlur={blur('state')}
                    maxLength={60}
                    className={cn(inputClass, fieldErrors.state && errorInputClass)}
                  />
                </Field>
              </div>
            </>
          ) : (
            /* Smart autofill mode */
            <>
              {/* Row: Pincode (trigger) */}
              <Field
                label="Pincode"
                error={err('pincode')}
                hint={pincodeStatus === 'loading' ? 'looking up…' : undefined}
              >
                <div className="relative">
                  <input
                    inputMode="numeric"
                    placeholder="Enter 6-digit pincode"
                    value={form.pincode || ''}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setForm((prev) => ({ ...prev, pincode: Number(v) || 0 }));
                      if (touched.pincode) {
                        const error = validateValue(v, customerPincodeSchema);
                        setFieldErrors((prev) => ({ ...prev, pincode: error ?? '' }));
                      }
                    }}
                    onBlur={blur('pincode')}
                    maxLength={6}
                    className={cn(
                      inputClass, 'pr-10',
                      pincodeStatus === 'error' && 'border-red-400 focus:border-red-500',
                      pincodeStatus === 'success' && 'border-emerald-400 focus:border-emerald-500',
                      err('pincode') && errorInputClass
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {pincodeStatus === 'loading' && <Loader2 size={15} className="animate-spin text-sky-500" />}
                    {pincodeStatus === 'success' && <CheckCircle2 size={15} className="text-emerald-500" />}
                    {pincodeStatus === 'error' && <AlertCircle size={15} className="text-red-400" />}
                  </div>
                </div>
                {pincodeStatus === 'error' && pincodeError && (
                  <div className="mt-1 space-y-1">
                    <p className="text-xs text-red-500">{pincodeError}</p>
                    <button
                      type="button"
                      onClick={handleEnterManually}
                      className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium"
                    >
                      Fill manually instead →
                    </button>
                  </div>
                )}
              </Field>

              {/* Row: Locality + State */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Locality / City" error={err('city')}>
                  <LocalityCombobox
                    options={localityOptions}
                    value={form.city}
                    onChange={(name) => {
                      selectLocality(name);
                      setForm((prev) => ({ ...prev, city: name }));
                    }}
                    disabled={pincodeStatus !== 'success'}
                  />
                  {pincodeStatus === 'success' && localityOptions.length > 1 && !form.city && (
                    <p className="text-xs text-sky-500 mt-1">Select your locality above</p>
                  )}
                  {(pincodeStatus === 'idle' || pincodeStatus === 'loading') && (
                    <button
                      type="button"
                      onClick={handleEnterManually}
                      className="mt-1 text-xs text-slate-400 hover:text-sky-500 transition-colors"
                    >
                      Skip, enter manually
                    </button>
                  )}
                </Field>

                <Field label="State">
                  {pincodeStatus === 'success' && stateLocked ? (
                    <div className={cn(inputClass, 'bg-sky-50 dark:bg-sky-900/20 border-sky-300 dark:border-sky-700 flex items-center justify-between')}>
                      <span className="text-sm font-medium text-slate-900 dark:text-sky-100">
                        {form.state || 'State'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setStateLocked(false)}
                        className="text-sky-400 hover:text-sky-600 transition-colors ml-2 flex-shrink-0"
                        title="Edit manually"
                      >
                        <Pencil size={13} />
                      </button>
                    </div>
                  ) : (
                    <input
                      placeholder="e.g. Maharashtra"
                      value={form.state}
                      onChange={set('state')}
                      onBlur={blur('state')}
                      maxLength={60}
                      className={cn(inputClass, fieldErrors.state && errorInputClass)}
                    />
                  )}
                  {pincodeStatus === 'success' && stateLocked && (
                    <p className="text-xs text-sky-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Auto-filled
                    </p>
                  )}
                </Field>
              </div>
            </>
          )}
          {/* ────────────────────────────────────────────────────────────── */}

          {/* Pricing Section */}
          <Field
            label="Pricing Type & Default Rate"
            error={err('defaultRate')}
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
                  inputMode="decimal"
                  min={0}
                  max={9999999}
                  step="0.01"
                  placeholder="0.00"
                  value={form.defaultRate}
                  onChange={set('defaultRate')}
                  onBlur={blur('defaultRate')}
                  onWheel={(e) => e.currentTarget.blur()}
                  className={cn(inputClass, 'pl-8', err('defaultRate') && errorInputClass)}
                />
              </div>
            </div>
          </Field>

          {/* Rate preview */}
          {form.defaultRate && form.pricingType && (
            <div className="flex items-center gap-2 px-4 py-3 bg-sky-500/5 border border-sky-500/20 rounded-2xl">
              <span className="text-lg font-black text-sky-600 dark:text-sky-400">
                ₹ {form.defaultRate}
              </span>
              <span className="text-xs font-bold text-sky-700/60 dark:text-sky-400/60 uppercase tracking-widest">
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
            className="h-12 px-8 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-bold text-sm tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-sky-500/25 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Customer'}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Helper Components ──────────────────────────────────────

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
        {required && <span className="text-sky-500">*</span>}
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

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const isNear = len >= max * 0.8;
  return (
    <p className={cn('text-[10px] font-medium text-right mt-0.5', isNear ? 'text-amber-500' : 'text-slate-400')}>
      {len}/{max}
    </p>
  );
}

const inputClass =
  'w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all';

const errorInputClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/20';
