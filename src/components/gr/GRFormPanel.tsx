'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, ChevronDown, CheckCircle2, UserPlus, AlertCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateGR, useUpdateGR } from '@/hooks/useGR';
import { useCustomers, useCreateCustomer } from '@/hooks/useCustomers';
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

// ─── Component ───────────────────────────────────────────────────────────────

export function GRFormPanel({ isOpen, onClose, editData }: GRFormPanelProps) {
  const isEditing = !!editData?.id;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerSaveState, setCustomerSaveState] = useState<SaveCustomerState>('idle');
  const [customerSaveError, setCustomerSaveError] = useState<string | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(customerSearch, 400);

  const createGR = useCreateGR();
  const updateGR = useUpdateGR();
  const createCustomer = useCreateCustomer();

  // Fetch customers whenever panel is open, debounced search as filter
  const { data: customerListRes, isLoading: isLoadingCustomers } = useCustomers(
    { search: debouncedSearch || undefined },
    // only enabled while panel is open
  );
  const customers = isOpen ? (customerListRes?.data ?? []) : [];

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
      } else {
        setForm(EMPTY_FORM);
        setCustomerId(null);
        setCustomerSaveState('idle');
        setCustomerSaveError(null);
        setCustomerSearch('');
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
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  // Select existing customer from dropdown — auto-fill all available fields
  const handleSelectCustomer = (c: Customer) => {
    setCustomerId(c.id);
    setCustomerSaveState('idle');
    setForm(prev => ({
      ...prev,
      consignor: c.name,
      consignorPhone: c.phone,
      fromCity: prev.fromCity || c.city || '',
      pricingType: c.pricingType ?? prev.pricingType,
      rate: c.defaultRate != null ? String(c.defaultRate) : prev.rate,
    }));
    setCustomerSearch('');
    setIsDropdownOpen(false);
  };

  const handleClearCustomer = () => {
    setCustomerId(null);
    setCustomerSaveState('idle');
    setCustomerSaveError(null);
    setForm(prev => ({ ...prev, consignor: '', consignorPhone: '', pricingType: PricingType.KG, rate: '', fromCity: '' }));
  };

  // Save consignor as new customer
  const handleSaveAsCustomer = () => {
    if (!form.consignor.trim()) return toast.error('Enter a consignor name first.');
    if (!form.consignorPhone.trim()) return toast.error('Enter a consignor phone number first.');
    setCustomerSaveState('saving');
    setCustomerSaveError(null);
    createCustomer.mutate(
      { name: form.consignor.trim(), phone: form.consignorPhone.trim() },
      {
        onSuccess: (res) => { setCustomerId(res.data.id); setCustomerSaveState('saved'); },
        onError: (err: any) => {
          setCustomerSaveState('error');
          setCustomerSaveError(err?.message || 'Failed to save customer.');
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerSaveState === 'saving') return toast.error('Please wait — saving customer first.');
    const payload: CreateGRInput = {
      ...(customerId ? { customerId } : {}),
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

  const isSaving = createGR.isPending || updateGR.isPending;

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

              {/* SECTION: Customer — always first */}
              <section className="space-y-4">
                <SectionHeader>1. Link Customer (Optional)</SectionHeader>

                {/* Customer linked badge */}
                {customerId && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl">
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

                {/* Dropdown search */}
                {!isEditing && !customerId && customerSaveState !== 'saved' && (
                  <div ref={dropdownRef} className="relative">
                    <Field label="Search Existing Customers">
                      <div className="relative">
                        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          placeholder="Type name to search customers..."
                          value={customerSearch}
                          onChange={e => { setCustomerSearch(e.target.value); setIsDropdownOpen(true); }}
                          onFocus={() => setIsDropdownOpen(true)}
                          className={inputClass + ' pl-11'}
                        />
                      </div>
                    </Field>
                    {isDropdownOpen && (
                      <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                        <div className="max-h-52 overflow-y-auto">
                          {isLoadingCustomers ? (
                            <div className="flex items-center justify-center p-4 text-slate-400 gap-2">
                              <Loader2 size={15} className="animate-spin" /> Loading customers...
                            </div>
                          ) : customers.length === 0 ? (
                            <p className="px-4 py-4 text-sm text-slate-400">No customers found.</p>
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
                )}

                {/* Consignor name */}
                <Field label="Consignor (Sender)" required>
                  <input
                    placeholder="Company or person sending goods"
                    value={form.consignor}
                    onChange={set('consignor')}
                    readOnly={customerSaveState === 'saved'}
                    className={cn(inputClass, customerSaveState === 'saved' && 'opacity-60 cursor-not-allowed')}
                    required
                  />
                  {customerSaveState === 'saved' && (
                    <p className="text-[10px] text-amber-500 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> Customer already saved — name change won't reflect.
                    </p>
                  )}
                </Field>

                <Field label="Consignor Phone" hint="Required to save as customer">
                  <input
                    type="tel"
                    placeholder="9XXXXXXXXX"
                    value={form.consignorPhone}
                    onChange={set('consignorPhone')}
                    readOnly={customerSaveState === 'saved' || !!customerId}
                    className={cn(inputClass, (customerSaveState === 'saved' || !!customerId) && 'opacity-60 cursor-not-allowed')}
                  />
                </Field>

                {/* Save as Customer button */}
                {!isEditing && !customerId && (
                  <div className="flex items-center gap-3">
                    {customerSaveState === 'saved' ? (
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        <CheckCircle2 size={15} /> Saved as customer
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={customerSaveState === 'saving'}
                        onClick={handleSaveAsCustomer}
                        className="flex items-center gap-2 h-9 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all"
                      >
                        {customerSaveState === 'saving'
                          ? <><Loader2 size={13} className="animate-spin" /> Saving...</>
                          : <><UserPlus size={13} /> Save as New Customer</>}
                      </button>
                    )}
                    {customerSaveState === 'error' && customerSaveError && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1">
                        <AlertCircle size={11} /> {customerSaveError}
                      </p>
                    )}
                  </div>
                )}

                {/* Consignee */}
                <Field label="Consignee (Receiver)" required>
                  <input
                    placeholder="Company or person receiving goods"
                    value={form.consignee}
                    onChange={set('consignee')}
                    className={inputClass}
                    required
                  />
                </Field>
              </section>

              {/* SECTION: Shipment Info */}
              <section className="space-y-4">
                <SectionHeader>2. Shipment Info</SectionHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Booking Date" required>
                    <input type="date" value={form.bookingDate} onChange={set('bookingDate')} className={inputClass} required />
                  </Field>
                  <Field label="GR Number" hint="Auto-generated">
                    <input type="text" value={isEditing ? (editData?.grNumber ?? '') : 'Auto'} readOnly className={inputClass + ' opacity-50 cursor-not-allowed'} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="From City" required>
                    <input placeholder="e.g. Mumbai" value={form.fromCity} onChange={set('fromCity')} className={inputClass} required />
                  </Field>
                  <Field label="To City" required>
                    <input placeholder="e.g. Delhi" value={form.toCity} onChange={set('toCity')} className={inputClass} required />
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
                <Field label="Product Description">
                  <textarea
                    placeholder="Describe the goods..."
                    value={form.productDescription}
                    onChange={set('productDescription')}
                    rows={2}
                    className={inputClass + ' h-auto resize-none py-3'}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="HSN Code">
                    <input placeholder="e.g. 8542" value={form.hsnCode} onChange={set('hsnCode')} className={inputClass} />
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
                <Field label="Vehicle Number">
                  <input placeholder="e.g. MH04 AB 1234" value={form.vehicleNumber} onChange={set('vehicleNumber')} className={inputClass} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Driver Name">
                    <input placeholder="Driver's full name" value={form.driverName} onChange={set('driverName')} className={inputClass} />
                  </Field>
                  <Field label="Driver Mobile">
                    <input type="tel" placeholder="9XXXXXXXXX" value={form.driverMobile} onChange={set('driverMobile')} className={inputClass} />
                  </Field>
                </div>
              </section>

              {/* SECTION: Remarks */}
              <section className="space-y-4">
                <SectionHeader>7. Remarks</SectionHeader>
                <Field label="Remarks">
                  <textarea
                    placeholder="Any additional notes..."
                    value={form.remarks}
                    onChange={set('remarks')}
                    rows={3}
                    className={inputClass + ' h-auto resize-none py-3'}
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
            disabled={isSaving || customerSaveState === 'saving'}
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

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && <span className="text-slate-400 font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = 'w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';
