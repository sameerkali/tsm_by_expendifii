'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GRFormPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: GRFormData | null;
}

export interface GRFormData {
  grNumber?: string | undefined;
  bookingDate: string;
  fromCity: string;
  toCity: string;
  consignor: string;
  consignee: string;
  productDescription: string;
  hsnCode: string;
  weight: string;
  pricingType: 'by_weight' | 'by_box';
  rate: string;
  freightAmount: string;
  vehicleNumber: string;
  driverName: string;
  driverMobile: string;
  paymentStatus: 'paid' | 'to_pay' | 'to_be_billed';
  status: 'booked' | 'in_transit' | 'delivered';
}

const today = new Date().toISOString().slice(0, 10);

const EMPTY_FORM: GRFormData = {
  bookingDate: today,
  fromCity: '',
  toCity: '',
  consignor: '',
  consignee: '',
  productDescription: '',
  hsnCode: '',
  weight: '',
  pricingType: 'by_weight',
  rate: '',
  freightAmount: '',
  vehicleNumber: '',
  driverName: '',
  driverMobile: '',
  paymentStatus: 'to_pay',
  status: 'booked',
};

const STATUS_BADGE = {
  booked: 'bg-slate-100 text-slate-600 border-slate-200',
  in_transit: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export function GRFormPanel({ isOpen, onClose, editData }: GRFormPanelProps) {
  const [form, setForm] = useState<GRFormData>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!editData?.grNumber;

  // Reset or populate form
  useEffect(() => {
    if (isOpen) {
      setForm(editData ?? EMPTY_FORM);
    }
  }, [isOpen, editData]);

  // Auto-calculate freight amount
  useEffect(() => {
    const rate = parseFloat(form.rate) || 0;
    const qty = parseFloat(form.weight) || 0;
    setForm((prev) => ({ ...prev, freightAmount: (rate * qty).toFixed(2) }));
  }, [form.rate, form.weight, form.pricingType]);

  const set = (field: keyof GRFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save — wire to API later
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 800);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Slide-in Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Panel Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">
              {isEditing ? 'EDIT RECORD' : 'NEW RECORD'}
            </p>
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              {isEditing ? editData?.grNumber : 'Create GR'}
            </h2>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-8">

          {/* Status Badge Row */}
          <div className="flex gap-2">
            {(['booked', 'in_transit', 'delivered'] as const).map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                className={cn(
                  "px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
                  form.status === s ? STATUS_BADGE[s] + " scale-105 shadow-sm" : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                )}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Section: Shipment Info */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Shipment Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Booking Date" required>
                <input type="date" value={form.bookingDate} onChange={set('bookingDate')} className={inputClass} required />
              </Field>
              <Field label="GR Number" hint="Auto-generated">
                <input type="text" value={isEditing ? editData?.grNumber : 'GR-XXXX'} readOnly className={inputClass + " opacity-50 cursor-not-allowed"} />
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

          {/* Section: Parties */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Parties</h3>
            <Field label="Consignor (Sender)" required>
              <input placeholder="Company or person sending goods" value={form.consignor} onChange={set('consignor')} className={inputClass} required />
            </Field>
            <Field label="Consignee (Receiver)" required>
              <input placeholder="Company or person receiving goods" value={form.consignee} onChange={set('consignee')} className={inputClass} required />
            </Field>
          </section>

          {/* Section: Goods */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Goods Details</h3>
            <Field label="Product Description">
              <textarea placeholder="Describe the goods being transported..." value={form.productDescription} onChange={set('productDescription')} rows={2} className={inputClass + " resize-none"} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="HSN Code">
                <input placeholder="e.g. 8471" value={form.hsnCode} onChange={set('hsnCode')} className={inputClass} />
              </Field>
              <Field label="Weight (kg) / Box Count" required>
                <input type="number" min={0} placeholder="0" value={form.weight} onChange={set('weight')} className={inputClass} required />
              </Field>
            </div>
          </section>

          {/* Section: Pricing */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Freight & Pricing</h3>
            <Field label="Pricing Type">
              <div className="relative">
                <select value={form.pricingType} onChange={set('pricingType')} className={inputClass + " appearance-none pr-10"}>
                  <option value="by_weight">Price by Weight</option>
                  <option value="by_box">Price by Box</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rate (₹)" required>
                <input type="number" min={0} placeholder="0.00" value={form.rate} onChange={set('rate')} className={inputClass} required />
              </Field>
              <Field label="Freight Amount (₹ auto)" hint="Rate × Qty">
                <input type="text" value={`₹ ${form.freightAmount || '0.00'}`} readOnly className={inputClass + " font-black text-emerald-600 dark:text-emerald-400 opacity-90 cursor-not-allowed"} />
              </Field>
            </div>
            <Field label="Payment Status">
              <div className="relative">
                <select value={form.paymentStatus} onChange={set('paymentStatus')} className={inputClass + " appearance-none pr-10"}>
                  <option value="to_pay">To Pay</option>
                  <option value="paid">Paid</option>
                  <option value="to_be_billed">To Be Billed</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </Field>
          </section>

          {/* Section: Vehicle & Driver */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Vehicle & Driver</h3>
            <Field label="Vehicle Number">
              <input placeholder="e.g. MH04 AB 1234" value={form.vehicleNumber} onChange={set('vehicleNumber')} className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Driver Name">
                <input placeholder="Driver's full name" value={form.driverName} onChange={set('driverName')} className={inputClass} />
              </Field>
              <Field label="Driver Mobile">
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.driverMobile} onChange={set('driverMobile')} className={inputClass} />
              </Field>
            </div>
          </section>

        </form>

        {/* Panel Footer */}
        <div className="h-20 border-t border-slate-100 dark:border-slate-800 px-8 flex items-center justify-between gap-4 shrink-0">
          <button type="button" onClick={onClose} className="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            Cancel
          </button>
          <button
            type="submit"
            form="gr-form"
            disabled={isSaving}
            onClick={handleSubmit}
            className="h-12 px-8 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold text-sm tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create GR'}
          </button>
        </div>
      </div>
    </>
  );
}

// ----- Helpers -----
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

const inputClass = "w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all";
