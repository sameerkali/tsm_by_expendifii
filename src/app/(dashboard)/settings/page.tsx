'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2, Phone, Upload, Download, Trash2, LogOut,
  AlertTriangle, Loader2, Lock, Sun, Moon, Monitor, Type, Mail, User, Tag, Calendar, Clock, CreditCard
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils/cn';
import { usePreferences, type Theme, type FontSize, FONT_SIZE_MAP } from '@/providers/PreferencesProvider';
import { Button, inputClass, Modal } from '@/components/ui';

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'light', label: 'Light', icon: <Sun size={20} />, desc: 'Always use light mode' },
  { value: 'dark', label: 'Dark', icon: <Moon size={20} />, desc: 'Always use dark mode' },
  { value: 'system', label: 'System', icon: <Monitor size={20} />, desc: 'Match your OS setting' },
];

const FONT_OPTIONS: { value: FontSize; label: string; size: string }[] = [
  { value: 'sm', label: 'Small', size: '14px' },
  { value: 'md', label: 'Default', size: '16px' },
  { value: 'lg', label: 'Large', size: '18px' },
  { value: 'xl', label: 'X-Large', size: '20px' },
];

export default function SettingsPage() {
  const { logout, updateProfile, isUpdatingProfile, isLoggingOut } = useAuth();
  const { user, isLoading: isLoadingProfile } = useSession();
  const { theme, setTheme, fontSize, setFontSize } = usePreferences();

  const [form, setForm] = useState({ name: '', phone: '', companyName: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Populate form once profile loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? '',
        phone: user.phone ?? '',
        companyName: user.company?.companyName ?? '',
      });
    }
  }, [user]);

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = () => {
    updateProfile({
      name: form.name.trim() || undefined,
      phone: form.phone.trim() || undefined,
    });
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
        <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">SYSTEM CONFIGURATION</p>
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Settings</h1>
      </div>

      {/* ─── SECTION: Appearance ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Appearance</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Customize how TMS looks and feels on your screen.</p>
        </div>

        <div className="p-8 space-y-10">
          {/* ── Theme ── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun size={16} className="text-slate-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Color Theme</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={cn(
                    'relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98]',
                    theme === opt.value
                      ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-800/30',
                  )}
                >
                  <div
                    className={cn(
                      'h-16 w-full rounded-xl overflow-hidden border flex items-center justify-center relative',
                      opt.value === 'dark'
                        ? 'bg-slate-900 border-slate-700'
                        : opt.value === 'light'
                          ? 'bg-white border-slate-200'
                          : 'bg-gradient-to-r from-white to-slate-900 border-slate-300',
                    )}
                  >
                    <div className={cn('text-2xl', opt.value === 'dark' ? 'text-white' : opt.value === 'light' ? 'text-slate-900' : '')}>
                      {opt.icon}
                    </div>
                    <div className={cn('absolute left-0 top-0 bottom-0 w-4', opt.value === 'dark' ? 'bg-slate-800' : opt.value === 'light' ? 'bg-slate-100' : 'bg-slate-700')} />
                    <div className={cn('absolute top-2 left-6 h-1 w-8 rounded-full', opt.value === 'dark' ? 'bg-slate-700' : 'bg-slate-200')} />
                    <div className={cn('absolute top-5 left-6 h-1 w-6 rounded-full', opt.value === 'dark' ? 'bg-emerald-500/40' : 'bg-emerald-500/30')} />
                  </div>
                  <div className="text-center">
                    <p className={cn('text-sm font-black tracking-tight', theme === opt.value ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300')}>
                      {opt.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</p>
                  </div>
                  {theme === opt.value && (
                    <div className="absolute top-3 right-3 h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Font Size ── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type size={16} className="text-slate-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Text Size</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {FONT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFontSize(opt.value)}
                  className={cn(
                    'relative flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98]',
                    fontSize === opt.value
                      ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-800/30',
                  )}
                >
                  <span
                    className={cn(
                      'font-black text-slate-900 dark:text-white leading-none',
                      opt.value === 'sm' ? 'text-sm' : opt.value === 'md' ? 'text-base' : opt.value === 'lg' ? 'text-lg' : 'text-xl',
                    )}
                  >
                    Aa
                  </span>
                  <p className={cn('text-[10px] font-black uppercase tracking-widest', fontSize === opt.value ? 'text-emerald-500' : 'text-slate-400')}>
                    {opt.label}
                  </p>
                  <p className="text-[9px] text-slate-400 font-mono">{opt.size}</p>
                  {fontSize === opt.value && (
                    <div className="absolute top-2 right-2 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L2.8 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Live Preview */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Live Preview</p>
              <p className="font-extrabold tracking-tighter text-slate-900 dark:text-white" style={{ fontSize: FONT_SIZE_MAP[fontSize] }}>
                GR-0001 • Mumbai → Delhi
              </p>
              <p className="text-slate-500 dark:text-slate-400" style={{ fontSize: `calc(${FONT_SIZE_MAP[fontSize]} * 0.875)` }}>
                Stark Industries → Avengers HQ • 5,400 kg • ₹ 64,800
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Company Profile ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Company Profile</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Update your name, phone, and company. Email is locked.</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Logo placeholder */}
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 shrink-0">
              <Building2 size={32} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Logo</p>
              <button className="flex items-center gap-2 h-9 px-4 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                <Upload size={14} />
                Upload Logo
              </button>
              <p className="text-[10px] text-slate-400">PNG or JPG. Max 2MB. Appears on printed GR documents.</p>
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

      {/* ─── SECTION: Coupons & Subscription ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Subscription & Coupons</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Manage your active plans and applied coupons.</p>
        </div>

        <div className="p-8 space-y-6">
          {isLoadingProfile ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            </div>
          ) : user?.coupons && user.coupons.length > 0 ? (
            <div className="space-y-4">
              {user.coupons.map((coupon) => {
                const isCurrentlyActive = coupon.isActive && !coupon.isExpired;
                const daysLeft = getDaysLeft(coupon.expiresAt);
                
                return (
                  <div key={coupon._id} className={cn(
                    "p-6 rounded-2xl border transition-all",
                    isCurrentlyActive 
                      ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50" 
                      : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
                  )}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Tag size={16} className={isCurrentlyActive ? "text-emerald-500" : "text-slate-400"} />
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{coupon.code}</p>
                          {isCurrentlyActive && (
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                              Active
                            </span>
                          )}
                          {coupon.isExpired && (
                            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {coupon.durationDays} Days Plan
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar size={14} />
                            <span className="text-[10px] font-bold uppercase">Expires On</span>
                          </div>
                          <p className="font-semibold text-slate-700 dark:text-slate-300">
                            {new Date(coupon.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {isCurrentlyActive && (
                          <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm text-center">
                            <div className="flex items-center gap-1 text-emerald-500 mb-0.5 justify-center">
                              <Clock size={12} />
                              <span className="text-[10px] font-black uppercase tracking-wider">Days Left</span>
                            </div>
                            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-none">
                              {daysLeft}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-3">
                <CreditCard size={24} />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No active subscriptions</p>
              <p className="text-xs text-slate-500 mt-1">Activate a coupon to use premium features.</p>
            </div>
          )}
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
              <Button variant="primary" className="h-10 px-4 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700">
                <Download size={14} />Export
              </Button>
            </div>
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">Customer Records</p>
                <p className="text-xs text-slate-400 mt-0.5">Full customer database in Excel</p>
              </div>
              <Button variant="primary" className="h-10 px-4 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700">
                <Download size={14} />Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Session ─── */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Session</h2>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Sign out of your account</p>
              <p className="text-xs text-slate-400 mt-0.5">This will end your current session.</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="h-10 px-6 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2"
            >
              {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
              Sign Out
            </Button>
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
                <p className="text-xs text-slate-400 mt-0.5">
                  Submit a deletion request. The Expendifii admin will review and approve. All data will be permanently erased.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="h-10 px-6 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0 ml-4"
              >
                <Trash2 size={16} />Request Deletion
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-700/50 space-y-4">
              <p className="text-sm font-bold text-red-700 dark:text-red-300">
                Are you absolutely sure? This will permanently delete all GR records, customer data, and your company account.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="danger" className="h-10 px-6 font-bold text-sm">
                  Yes, Submit Deletion Request
                </Button>
                <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)} className="h-10 px-4 text-sm font-bold">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  locked,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  locked?: boolean;
  hint?: string;
}) {
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
