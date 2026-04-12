'use client';

import React, { useState } from 'react';
import { Building2, Phone, MapPin, Upload, Download, Trash2, LogOut, AlertTriangle, Loader2, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';

// Mock company data — wire to API later
const COMPANY = {
  name: 'Expendifii Transport Ltd.',
  email: 'admin@expendifii.com',
  gstin: '27AAIEX1234B1ZX',
  phone: '+91 98765 43210',
  address: '404, Terminal Tower, Andheri East, Mumbai, MH 400069',
  logoUrl: '',
};

export default function SettingsPage() {
  const { logout } = useAuth();
  const [form, setForm] = useState({ name: COMPANY.name, phone: COMPANY.phone, address: COMPANY.address });
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">SYSTEM CONFIGURATION</p>
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Settings</h1>
      </div>

      {/* ─── SECTION: Company Profile ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Company Profile</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Update your company information. GSTIN and Email are locked.</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 shrink-0">
              {COMPANY.logoUrl ? (
                <img src={COMPANY.logoUrl} alt="logo" className="h-full w-full object-contain rounded-2xl" />
              ) : (
                <Building2 size={32} />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Logo</p>
              <button className="flex items-center gap-2 h-9 px-4 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <Upload size={14} />Upload Logo
              </button>
              <p className="text-[10px] text-slate-400">PNG or JPG. Max 2MB. Appears on printed GR documents.</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <Field label="Company Name" required>
              <input value={form.name} onChange={set('name')} placeholder="Your company name" className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="GSTIN" locked hint="Cannot be changed">
                <input value={COMPANY.gstin} readOnly className={inputClass + " opacity-50 cursor-not-allowed"} />
              </Field>
              <Field label="Email Address" locked hint="Cannot be changed">
                <input value={COMPANY.email} readOnly className={inputClass + " opacity-50 cursor-not-allowed"} />
              </Field>
            </div>
            <Field label="Phone Number">
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" className={inputClass + " pl-10"} />
              </div>
            </Field>
            <Field label="Company Address">
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-4 text-slate-400" />
                <textarea value={form.address} onChange={set('address')} placeholder="Full company address..." rows={3} className={inputClass + " pl-10 py-3 h-auto resize-none"} />
              </div>
            </Field>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 px-8 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </section>

      {/* ─── SECTION: Download Data ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Download Data</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Export all your company data to Excel format.</p>
        </div>
        <div className="p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">GR Records</p>
                <p className="text-xs text-slate-400 mt-0.5">All goods receipts in Excel</p>
              </div>
              <button className="flex items-center gap-2 h-10 px-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all">
                <Download size={14} />Export
              </button>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">Customer Records</p>
                <p className="text-xs text-slate-400 mt-0.5">Full customer database in Excel</p>
              </div>
              <button className="flex items-center gap-2 h-10 px-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all">
                <Download size={14} />Export
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Logout ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Session</h2>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Sign out of your account</p>
              <p className="text-xs text-slate-400 mt-0.5">This will end your current session. Max 2 concurrent sessions allowed.</p>
            </div>
            <button
              onClick={() => logout()}
              className="h-10 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <LogOut size={16} />Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Danger Zone ─── */}
      <section className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-red-100 dark:border-red-900/30">
          <h2 className="text-lg font-black tracking-tight text-red-600 dark:text-red-400 uppercase italic flex items-center gap-2">
            <AlertTriangle size={18} />Danger Zone
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">These actions are irreversible. Proceed with caution.</p>
        </div>
        <div className="p-8 space-y-4">
          {!showDeleteConfirm ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Request Account Deletion</p>
                <p className="text-xs text-slate-400 mt-0.5">Submit a deletion request. The Expendifii admin will review and approve. All data will be permanently erased.</p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="h-10 px-6 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2 shrink-0 ml-4"
              >
                <Trash2 size={16} />Request Deletion
              </button>
            </div>
          ) : (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-700/50 space-y-4">
              <p className="text-sm font-bold text-red-700 dark:text-red-300">
                Are you absolutely sure? This will permanently delete all GR records, customer data, and your company account.
              </p>
              <div className="flex items-center gap-3">
                <button className="h-10 px-6 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all">
                  Yes, Submit Deletion Request
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} className="h-10 px-4 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children, required, locked, hint }: { label: string; children: React.ReactNode; required?: boolean; locked?: boolean; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {locked && <Lock size={10} className="text-slate-400" />}
        {label}
        {required && <span className="text-emerald-500">*</span>}
        {hint && <span className="text-slate-400 font-normal">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full h-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all";
