'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, ChevronDown, CheckCircle2, UserPlus, AlertCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateGR, useUpdateGR } from '@/hooks/useGR';
import { useCustomers, useCreateCustomer, extractMessage } from '@/hooks/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';
import type { GR, CreateGRInput } from '@/types/gr';
import type { Customer } from '@/types/customer';
import { GRStatus, PricingType, PaymentStatus } from '@/types/gr';
import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────────────────────

interface GRFormPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: GR | null;
}

interface FormState {
  bookingDate: string;
  fromCity: string;
  toCity: string;
  consignor: string;
  consignorPhone: string;
  consignorAddress: string;
  consignorCity: string;
  consignorState: string;
  consignorPincode: string;
  consignee: string;
  productDescription: string;
  hsnCode: string;
  weight: string;
  boxCount: string;
  pricingType: string;
  rate: string;
  freightAmount: string;
  vehicleNumber: string;
  driverName: string;
  driverMobile: string;
  paymentStatus: string;
  status: string;
  remarks: string;
}

type SaveCustomerState = 'idle' | 'saving' | 'saved' | 'error';

const today = new Date().toISOString().slice(0, 10);

const EMPTY_FORM: FormState = {
  bookingDate: today,
  fromCity: '',
  toCity: '',
  consignor: '',
  consignorPhone: '',
  consignorAddress: '',
  consignorCity: '',
  consignorState: '',
  consignorPincode: '',
  consignee: '',
  productDescription: '',
  hsnCode: '',
  weight: '',
  boxCount: '',
  pricingType: PricingType.KG,
  rate: '',
  freightAmount: '',
  vehicleNumber: '',
  driverName: '',
  driverMobile: '',
  paymentStatus: PaymentStatus.PENDING,
  status: GRStatus.BOOKED,
  remarks: '',
};

const STATUS_CONFIG = {
  [GRStatus.BOOKED]:     { label: 'Booked',     cls: 'bg-slate-100 text-slate-700 border-slate-300' },
  [GRStatus.IN_TRANSIT]: { label: 'In Transit', cls: 'bg-amber-100 text-amber-700 border-amber-300' },
  [GRStatus.DELIVERED]:  { label: 'Delivered',  cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
};

// ─── Phone input handler (strips non-digits, caps at 10) ─────────────────────

function makePhoneHandler(
  field: 'consignorPhone' | 'driverMobile',
  setForm: React.Dispatch<React.SetStateAction<FormState>>,
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  fieldErrors: Record<string, string>
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm(prev => ({ ...prev, [field]: val }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function GRFormPanel({ isOpen, onClose, editData }: GRFormPanelProps) {
  const isEditing = !!editData?.id;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search uses the consignor field directly
  const debouncedSearch = useDebounce(form.consignor, 400);

  const createGR = useCreateGR();
  const updateGR = useUpdateGR();
  const createCustomer = useCreateCustomer();

  // Fetch customers based on consignor input
  const { data: customerListRes, isLoading: isLoadingCustomers } = useCustomers(
    { search: debouncedSearch || undefined },
  );
  const customers = isOpen ? (customerListRes?.data ?? []) : [];

  // Determine if the exact typed name matches an existing customer
  const exactMatchExists = customers.some(
    c => c.name.toLowerCase() === form.consignor.trim().toLowerCase()
  );

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm({
          bookingDate: editData.bookingDate?.slice(0, 10) ?? today,
          fromCity: editData.fromCity ?? '',
          toCity: editData.toCity ?? '',
          consignor: editData.consignor ?? '',
          consignorPhone: editData.customer?.phone ?? '',
          consignorAddress: editData.customer?.address ?? '',
          consignorCity: editData.customer?.city ?? '',
          consignorState: editData.customer?.state ?? '',
          consignorPincode: editData.customer?.pincode ?? '',
          consignee: editData.consignee ?? '',
          productDescription: editData.productDescription ?? '',
          hsnCode: editData.hsnCode ?? '',
          weight: editData.weight != null ? String(editData.weight) : '',
          boxCount: editData.boxCount != null ? String(editData.boxCount) : '',
          pricingType: editData.pricingType ?? PricingType.KG,
          rate: editData.rate != null ? String(editData.rate) : '',
          freightAmount: editData.freightAmount != null ? String(editData.freightAmount) : '',
          vehicleNumber: editData.vehicleNumber ?? '',
          driverName: editData.driverName ?? '',
          driverMobile: editData.driverMobile ?? '',
          paymentStatus: editData.paymentStatus ?? PaymentStatus.PENDING,
          status: editData.status ?? GRStatus.BOOKED,
          remarks: editData.remarks ?? '',
        });
        setCustomerId(editData.customer?.id ?? null);
      } else {
        setForm(EMPTY_FORM);
        setCustomerId(null);
        setFieldErrors({});

      }
    }
  }, [isOpen, editData]);

  // Auto-calculate freight amount
  useEffect(() => {
    const rate = parseFloat(form.rate) || 0;
    const qty = form.pricingType === PricingType.BOX
      ? parseFloat(form.boxCount) || 0
      : parseFloat(form.weight) || 0;
    setForm(prev => ({ ...prev, freightAmount: (rate * qty).toFixed(2) }));
  }, [form.rate, form.weight, form.boxCount, form.pricingType]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (fieldErrors[field]) {
        setFieldErrors(prev => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
      
      // If user types in consignor name, clear customerId and open dropdown
      if (field === 'consignor') {
        if (customerId) setCustomerId(null);
        setIsDropdownOpen(true);
      }
    };

  // ── Phone-specific handlers (digits only, max 10) ──
  const handleConsignorPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm(prev => ({ ...prev, consignorPhone: val }));
    if (fieldErrors.consignorPhone) {
      setFieldErrors(prev => { const n = { ...prev }; delete n.consignorPhone; return n; });
    }
  };

  const handleDriverMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm(prev => ({ ...prev, driverMobile: val }));
    if (fieldErrors.driverMobile) {
      setFieldErrors(prev => { const n = { ...prev }; delete n.driverMobile; return n; });
    }
  };

  // Select existing customer from dropdown
  const handleSelectCustomer = (c: Customer) => {
    setCustomerId(c.id);
    setForm(prev => ({
      ...prev,
      consignor: c.name,
      consignorPhone: c.phone || '',
      consignorAddress: c.address || '',
      consignorCity: c.city || '',
      consignorState: c.state || '',
      consignorPincode: c.pincode || '',
      fromCity: prev.fromCity || c.city || '',
      pricingType: c.pricingType ?? prev.pricingType,
      rate: c.defaultRate != null ? String(c.defaultRate) : prev.rate,
    }));
    setIsDropdownOpen(false);
  };

  const handleClearCustomer = () => {
    setCustomerId(null);
    setFieldErrors({});
    setForm(prev => ({ ...prev, consignor: '', consignorPhone: '', consignorAddress: '', consignorCity: '', consignorState: '', consignorPincode: '', pricingType: PricingType.KG, rate: '', fromCity: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const errors: Record<string, string> = {};

    if (!isEditing && form.bookingDate < today) {
      errors.bookingDate = 'Booking date cannot be in the past.';
    }

    if (!isEditing && !customerId && form.consignor.trim()) {
      if (!form.consignorPhone.trim() || !/^\d{10}$/.test(form.consignorPhone.trim())) {
        errors.consignorPhone = 'Enter a valid 10-digit mobile number.';
      }
      if (form.consignorPincode.trim() && !/^\d{6}$/.test(form.consignorPincode.trim())) {
        errors.consignorPincode = 'Pincode must be exactly 6 digits.';
      }
    }

    if (form.driverMobile.trim() && !/^\d{10}$/.test(form.driverMobile.trim())) {
      errors.driverMobile = 'Enter a valid 10-digit mobile number.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    let finalCustomerId = customerId;

    // IMPLICIT CUSTOMER CREATION
    if (!isEditing && !customerId && form.consignor.trim()) {
      if (!form.consignorPhone.trim()) {
        toast.error('Consignor Phone is required for new customers.');
        return;
      }
      try {
        const res = await createCustomer.mutateAsync({
          name: form.consignor.trim(), 
          phone: form.consignorPhone.trim(),
          address: form.consignorAddress.trim() || "",
          city: form.fromCity.trim() || form.consignorCity.trim() || "",
          state: form.consignorState.trim() || "",
          pincode: form.consignorPincode.trim() ? Number(form.consignorPincode.trim()) : 0,
          pricingType: form.pricingType as PricingType,
          defaultRate: parseFloat(form.rate) || 0
        });
        finalCustomerId = res.data.id;
        setCustomerId(res.data.id); // Save it locally in case GR creation fails and they retry
      } catch (err: any) {
        // Error toast is already handled by useCreateCustomer hook
        return;
      }
    }

    const payload: CreateGRInput = {
      ...(finalCustomerId ? { customerId: finalCustomerId } : {}),
      bookingDate: form.bookingDate,
      fromCity: form.fromCity,
      toCity: form.toCity,
      consignor: form.consignor,
      consignee: form.consignee,
      productDescription: form.productDescription || undefined,
      hsnCode: form.hsnCode || undefined,
      weight: parseFloat(form.weight) || undefined,
      boxCount: parseInt(form.boxCount, 10) || undefined,
      pricingType: form.pricingType,
      rate: parseFloat(form.rate) || 0,
      freightAmount: parseFloat(form.freightAmount) || 0,
      vehicleNumber: form.vehicleNumber,
      driverName: form.driverName || undefined,
      driverMobile: form.driverMobile || undefined,
      paymentStatus: form.paymentStatus,
      status: form.status,
      remarks: form.remarks || undefined,
    };
    if (isEditing && editData?.id) {
      updateGR.mutate({ id: editData.id, data: payload }, { onSuccess: () => onClose() });
    } else {
      createGR.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  const isSaving = createGR.isPending || updateGR.isPending || createCustomer.isPending;
  const isNewCustomer = !isEditing && !customerId && form.consignor.trim().length > 0 && !exactMatchExists;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />}

      <div className={cn(
        'fixed top-0 right-0 h-full bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out',
        'w-full md:w-[85vw] lg:w-[80vw] max-w-6xl',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-10 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">
              {isEditing ? 'EDIT RECORD' : 'NEW RECORD'}
            </p>
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              {isEditing ? editData?.grNumber : 'Create Goods Receipt'}
            </h2>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-8">

              {/* SECTION: Customer */}
              <section className="space-y-4">
                <SectionHeader>1. Consignor Details</SectionHeader>

                {/* Customer linked badge */}
                {customerId && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl mb-4">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Customer Linked</p>
                      <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200 truncate">{form.consignor} · {form.consignorPhone}</p>
                    </div>
                    {!isEditing && (
                      <button type="button" onClick={handleClearCustomer} className="text-xs text-slate-500 hover:text-red-500 font-bold transition-colors">
                        Clear
                      </button>
                    )}
                  </div>
                )}

                {/* Consignor combobox */}
                <div ref={dropdownRef} className="relative">
                  <Field label="Consignor (Sender)" required hint="Type to search existing" error={fieldErrors.consignor}>
                    <div className="relative">
                      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        placeholder="Company or person sending goods"
                        value={form.consignor}
                        onChange={set('consignor')}
                        onFocus={() => setIsDropdownOpen(true)}
                        readOnly={!!customerId}
                        maxLength={50}
                        className={cn(inputClass, 'pl-11', !!customerId && 'opacity-60 cursor-not-allowed', fieldErrors.consignor && errorInputClass)}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </Field>
                  
                  {isDropdownOpen && !customerId && !isEditing && (
                    <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                      <div className="max-h-52 overflow-y-auto">
                        {isLoadingCustomers ? (
                          <div className="flex items-center justify-center p-4 text-slate-400 gap-2">
                            <Loader2 size={15} className="animate-spin" /> Searching...
                          </div>
                        ) : customers.length === 0 ? (
                          <div className="px-4 py-4 text-sm text-slate-500 flex flex-col items-center justify-center gap-2">
                            <p>No matches found.</p>
                            {form.consignor.trim().length > 0 && (
                              <p className="text-xs">You can save this as a new customer.</p>
                            )}
                          </div>
                        ) : customers.map(c => (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => handleSelectCustomer(c)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0"
                          >
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{c.phone}{c.city ? ` · ${c.city}` : ''}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Consignor Phone ── */}
                <Field
                  label="Consignor Phone"
                  required={isNewCustomer}
                  hint="10-digit mobile number"
                  error={fieldErrors.consignorPhone}
                >
                  <div className="relative">
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="9XXXXXXXXX"
                      value={form.consignorPhone}
                      onChange={handleConsignorPhoneChange}
                      readOnly={!!customerId}
                      maxLength={10}
                      className={cn(
                        inputClass,
                        !!customerId && 'opacity-60 cursor-not-allowed',
                        fieldErrors.consignorPhone && errorInputClass,
                        // live green border when exactly 10 digits
                        !fieldErrors.consignorPhone && form.consignorPhone.length === 10 && '!border-emerald-500',
                      )}
                    />
                    {/* digit counter */}
                    {!customerId && form.consignorPhone.length > 0 && (
                      <span className={cn(
                        'absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tabular-nums pointer-events-none',
                        form.consignorPhone.length === 10 ? 'text-emerald-500' : 'text-slate-400'
                      )}>
                        {form.consignorPhone.length}/10
                      </span>
                    )}
                  </div>
                </Field>

                {/* Additional New Customer Fields */}
                {isNewCustomer && (
                  <div className="pt-2">
                    {!showMoreDetails ? (
                      <button
                        type="button"
                        onClick={() => setShowMoreDetails(true)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        + Add Full Address (Optional)
                      </button>
                    ) : (
                      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold text-slate-500">Additional Details</p>
                          <button type="button" onClick={() => setShowMoreDetails(false)} className="text-xs text-slate-400 hover:text-slate-600">Hide</button>
                        </div>
                        <Field label="Address" error={fieldErrors.consignorAddress}>
                          <input placeholder="Street address" value={form.consignorAddress} onChange={set('consignorAddress')} maxLength={100} className={cn(inputClass, fieldErrors.consignorAddress && errorInputClass)} />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="City" error={fieldErrors.consignorCity}>
                            <input placeholder="City" value={form.consignorCity} onChange={set('consignorCity')} maxLength={50} className={cn(inputClass, fieldErrors.consignorCity && errorInputClass)} />
                          </Field>
                          <Field label="State" error={fieldErrors.consignorState}>
                            <input placeholder="State" value={form.consignorState} onChange={set('consignorState')} maxLength={50} className={cn(inputClass, fieldErrors.consignorState && errorInputClass)} />
                          </Field>
                          <Field label="Pincode" error={fieldErrors.consignorPincode}>
                            <input type="number" placeholder="Pincode" value={form.consignorPincode} onChange={set('consignorPincode')} maxLength={6} className={cn(inputClass, fieldErrors.consignorPincode && errorInputClass)} />
                          </Field>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Consignee */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Field label="Consignee (Receiver)" required error={fieldErrors.consignee}>
                    <input
                      placeholder="Company or person receiving goods"
                      value={form.consignee}
                      onChange={set('consignee')}
                      maxLength={50}
                      className={cn(inputClass, fieldErrors.consignee && errorInputClass)}
                      required
                    />
                  </Field>
                </div>
              </section>

              {/* SECTION: Shipment Info */}
              <section className="space-y-4">
                <SectionHeader>2. Shipment Info</SectionHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Booking Date" required error={fieldErrors.bookingDate}>
                    <input type="date" value={form.bookingDate} onChange={set('bookingDate')} min={!isEditing ? today : undefined} className={cn(inputClass, fieldErrors.bookingDate && errorInputClass)} required />
                  </Field>
                  <Field label="GR Number" hint="Auto-generated">
                    <input type="text" value={isEditing ? (editData?.grNumber ?? '') : 'Auto'} readOnly className={inputClass + ' opacity-50 cursor-not-allowed'} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="From City" required error={fieldErrors.fromCity}>
                    <input placeholder="e.g. Mumbai" value={form.fromCity} onChange={set('fromCity')} maxLength={50} className={cn(inputClass, fieldErrors.fromCity && errorInputClass)} required />
                  </Field>
                  <Field label="To City" required error={fieldErrors.toCity}>
                    <input placeholder="e.g. Delhi" value={form.toCity} onChange={set('toCity')} maxLength={50} className={cn(inputClass, fieldErrors.toCity && errorInputClass)} required />
                  </Field>
                </div>
              </section>

              {/* SECTION: Status */}
              <section className="space-y-4">
                <SectionHeader>3. GR Status</SectionHeader>
                <div className="flex gap-2 flex-wrap">
                  {[GRStatus.BOOKED, GRStatus.IN_TRANSIT, GRStatus.DELIVERED].map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    if (!cfg) return null;
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm(prev => ({ ...prev, status: s }))}
                        className={cn(
                          'px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all',
                          form.status === s
                            ? cfg.cls + ' scale-105 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        )}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-8">

              {/* SECTION: Goods */}
              <section className="space-y-4">
                <SectionHeader>4. Goods Details</SectionHeader>
                <Field label="Product Description" error={fieldErrors.productDescription}>
                  <textarea
                    placeholder="Describe the goods..."
                    value={form.productDescription}
                    onChange={set('productDescription')}
                    rows={2}
                    maxLength={300}
                    className={cn(inputClass, 'h-auto resize-none py-3', fieldErrors.productDescription && errorInputClass)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="HSN Code" error={fieldErrors.hsnCode}>
                    <input placeholder="e.g. 8542" value={form.hsnCode} onChange={set('hsnCode')} maxLength={20} className={cn(inputClass, fieldErrors.hsnCode && errorInputClass)} />
                  </Field>
                  <Field label="Weight (kg)">
                    <input type="number" min={0} step="0.01" placeholder="0.00" value={form.weight} onChange={set('weight')} className={inputClass} />
                  </Field>
                </div>
                <Field label="Box Count">
                  <input type="number" min={0} placeholder="Number of boxes" value={form.boxCount} onChange={set('boxCount')} className={inputClass} />
                </Field>
              </section>

              {/* SECTION: Pricing */}
              <section className="space-y-4">
                <SectionHeader>5. Freight & Pricing</SectionHeader>
                <Field label="Pricing Type">
                  <div className="relative">
                    <select value={form.pricingType} onChange={set('pricingType')} className={inputClass + ' appearance-none pr-10'}>
                      <option value={PricingType.KG}>Price per KG</option>
                      <option value={PricingType.BOX}>Price per Box</option>
                      <option value={PricingType.KM}>Price per KM</option>
                      <option value={PricingType.QUINTEL}>Price per Quintel</option>
                      <option value={PricingType.TON}>Price per Ton</option>
                    </select>
                    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Rate (₹)" required>
                    <input type="number" min={0} step="0.01" placeholder="0.00" value={form.rate} onChange={set('rate')} className={inputClass} required />
                  </Field>
                  <Field label="Freight Amount (₹)" hint="Auto-calculated">
                    <input
                      type="text"
                      value={`₹ ${form.freightAmount || '0.00'}`}
                      readOnly
                      className={inputClass + ' font-black text-emerald-600 dark:text-emerald-400 cursor-not-allowed'}
                    />
                  </Field>
                </div>
                <Field label="Payment Status">
                  <div className="relative">
                    <select value={form.paymentStatus} onChange={set('paymentStatus')} className={inputClass + ' appearance-none pr-10'}>
                      <option value={PaymentStatus.PENDING}>Pending</option>
                      <option value={PaymentStatus.PAID}>Paid</option>
                    </select>
                    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </Field>
              </section>

              {/* SECTION: Vehicle & Driver */}
              <section className="space-y-4">
                <SectionHeader>6. Vehicle & Driver</SectionHeader>
                <Field label="Vehicle Number" error={fieldErrors.vehicleNumber}>
                  <input placeholder="e.g. MH04 AB 1234" value={form.vehicleNumber} onChange={set('vehicleNumber')} maxLength={20} className={cn(inputClass, fieldErrors.vehicleNumber && errorInputClass)} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Driver Name" error={fieldErrors.driverName}>
                    <input placeholder="Driver's full name" value={form.driverName} onChange={set('driverName')} maxLength={50} className={cn(inputClass, fieldErrors.driverName && errorInputClass)} />
                  </Field>

                  {/* ── Driver Mobile ── */}
                  <Field label="Driver Mobile" error={fieldErrors.driverMobile}>
                    <div className="relative">
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="9XXXXXXXXX"
                        value={form.driverMobile}
                        onChange={handleDriverMobileChange}
                        maxLength={10}
                        className={cn(
                          inputClass,
                          fieldErrors.driverMobile && errorInputClass,
                          !fieldErrors.driverMobile && form.driverMobile.length === 10 && '!border-emerald-500',
                        )}
                      />
                      {form.driverMobile.length > 0 && (
                        <span className={cn(
                          'absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tabular-nums pointer-events-none',
                          form.driverMobile.length === 10 ? 'text-emerald-500' : 'text-slate-400'
                        )}>
                          {form.driverMobile.length}/10
                        </span>
                      )}
                    </div>
                  </Field>
                </div>
              </section>

              {/* SECTION: Remarks */}
              <section className="space-y-4">
                <SectionHeader>7. Remarks</SectionHeader>
                <Field label="Remarks" error={fieldErrors.remarks}>
                  <textarea
                    placeholder="Any additional notes..."
                    value={form.remarks}
                    onChange={set('remarks')}
                    rows={3}
                    maxLength={300}
                    className={cn(inputClass, 'h-auto resize-none py-3', fieldErrors.remarks && errorInputClass)}
                  />
                </Field>
              </section>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="h-20 border-t border-slate-100 dark:border-slate-800 px-10 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            onClick={handleSubmit}
            className="h-12 px-10 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold text-sm tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving && <Loader2 size={15} className="animate-spin" />}
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create GR'}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">{children}</h3>;
}

function Field({ label, children, required, hint, error }: { label: string; children: React.ReactNode; required?: boolean; hint?: string; error?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && <span className="text-slate-400 font-normal">({hint})</span>}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = 'w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';
const errorInputClass = '!border-red-500 !ring-red-500/20';