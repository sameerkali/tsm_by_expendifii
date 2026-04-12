'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CustomerFormPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: CustomerFormData | null;
}

export interface CustomerFormData {
  id?: string;
  name: string;
  mobile: string;
  gstin: string;
  address: string;
  defaultRate: string;
  rateType: 'per_kg' | 'per_box' | 'per_km';
}

const EMPTY_FORM: CustomerFormData = {
  name: '',
  mobile: '',
  gstin: '',
  address: '',
  defaultRate: '',
  rateType: 'per_kg',
};

export function CustomerFormPanel({ isOpen, onClose, editData }: CustomerFormPanelProps) {
  const [form, setForm] = useState<CustomerFormData>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = !!editData?.id;

  useEffect(() => {
    if (isOpen) setForm(editData ?? EMPTY_FORM);
  }, [isOpen, editData]);

  const set = (field: keyof CustomerFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />}

      <div className={cn(
        "fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
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
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-6">
          <Field label="Full Name / Company Name" required>
            <input placeholder="e.g. Stark Industries" value={form.name} onChange={set('name')} className={inputClass} required />
          </Field>
          <Field label="Mobile Number" required>
            <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.mobile} onChange={set('mobile')} className={inputClass} required />
          </Field>
          <Field label="GSTIN">
            <input placeholder="e.g. 27AABCU9603R1ZX" value={form.gstin} onChange={set('gstin')} className={inputClass} />
          </Field>
          <Field label="Address">
            <textarea
              placeholder="Full address including city, state, and pincode"
              value={form.address}
              onChange={set('address')}
              rows={3}
              className={inputClass + " resize-none h-auto py-3"}
            />
          </Field>
          <Field label="Default Rate &amp; Rate Type" hint="Auto-fills GR rate when creating a booking">
            <div className="flex gap-3">
              {/* Rate Number Input */}
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0.00"
                  value={form.defaultRate}
                  onChange={set('defaultRate')}
                  className={inputClass + " pl-8"}
                />
              </div>
              {/* Rate Type Dropdown */}
              <div className="relative w-36 shrink-0">
                <select
                  value={form.rateType}
                  onChange={set('rateType')}
                  className={inputClass + " appearance-none pr-8 cursor-pointer"}
                >
                  <option value="per_kg">Per KG</option>
                  <option value="per_box">Per Box</option>
                  <option value="per_km">Per KM</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </Field>

          {/* Rate preview */}
          {form.defaultRate && (
            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹ {form.defaultRate}</span>
              <span className="text-xs font-bold text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-widest">
                {form.rateType === 'per_kg' ? '/ KG' : form.rateType === 'per_box' ? '/ BOX' : '/ KM'}
              </span>
              <span className="ml-auto text-[10px] text-slate-400 font-medium">Default GR rate for this customer</span>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="h-20 border-t border-slate-100 dark:border-slate-800 px-8 flex items-center justify-between gap-4 shrink-0">
          <button type="button" onClick={onClose} className="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
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

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && <span className="text-slate-400 font-normal italic">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all";
