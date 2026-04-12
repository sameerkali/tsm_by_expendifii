'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, User as UserIcon, Phone, Mail, MapPin, ChevronLeft, ChevronRight, ShieldCheck, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CustomerFormPanel, type CustomerFormData } from '@/components/customers/CustomerFormPanel';

const CUSTOMER_DATA: (CustomerFormData & { id: string; activeGRs: number; type: string })[] = [
  { id: '1', name: 'Stark Industries', mobile: '+91 98765 43210', gstin: '27AIAAI1234B1Z5', address: '200, Tony Tower, Mumbai, MH 400001', defaultRate: '12', rateType: 'per_kg', activeGRs: 42, type: 'CORPORATE' },
  { id: '2', name: 'Wayne Enterprises', mobile: '+91 99887 76655', gstin: '29WBWEI5678B1Z3', address: 'Wayne Manor, Gotham, Bangalore, KA 560001', defaultRate: '15', rateType: 'per_kg', activeGRs: 18, type: 'CORPORATE' },
  { id: '3', name: 'Peter Parker', mobile: '+91 91234 56789', gstin: '', address: '20 Ingram St, Queens, Chennai, TN 600001', defaultRate: '10', rateType: 'per_box', activeGRs: 5, type: 'RETAIL' },
  { id: '4', name: 'Oscorp', mobile: '+91 88776 65544', gstin: '07ONCO9012C1Z9', address: 'Oscorp Tower, New York Nagar, Delhi, DL 110001', defaultRate: '18', rateType: 'per_kg', activeGRs: 29, type: 'CORPORATE' },
  { id: '5', name: 'Baxter Foundation', mobile: '+91 77665 54433', gstin: '19BFOU3456D1Z7', address: 'Baxter Bldg, 42nd St, Kolkata, WB 700001', defaultRate: '20', rateType: 'per_km', activeGRs: 12, type: 'CORPORATE' },
];

export default function CustomersPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [editData, setEditData] = useState<(CustomerFormData & { id: string; activeGRs: number; type: string }) | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setEditData(null); setPanelOpen(true); };
  const openEdit = (row: typeof CUSTOMER_DATA[0]) => { setEditData(row); setPanelOpen(true); };

  return (
    <>
      <CustomerFormPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} editData={editData} />

      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">CRM INTEGRITY</p>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Customer Registry</h1>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">5 ACCOUNTS</span>
            </div>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-6 h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
            <Plus size={18} />Add Customer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter italic">4</h3>
            <p className="text-xs font-bold text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-widest mt-1">Active Corporate Accounts</p>
          </div>
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
            <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter italic">1</h3>
            <p className="text-xs font-bold text-blue-700/60 dark:text-blue-400/60 uppercase tracking-widest mt-1">Retail Clients</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-2xl font-black text-white tracking-tighter italic">106</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Total Active GRs</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name, company, or mobile..." className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium" />
          </div>
          <button className="h-12 px-6 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Filter size={16} />Segment
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 h-16 text-left">
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">GSTIN</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Rate</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active GRs</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {CUSTOMER_DATA.map((row) => (
                  <tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0">
                          <UserIcon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight">{row.name}</p>
                          <span className={cn(
                            "inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mt-1",
                            row.type === 'CORPORATE' ? "bg-slate-900 text-white border-slate-900" : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                          )}>
                            {row.type === 'CORPORATE' && <ShieldCheck size={8} className="text-emerald-500" />}
                            {row.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 space-y-1">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone size={12} className="text-emerald-500" />
                        <span className="text-xs font-bold">{row.mobile}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">{row.gstin || '—'}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-slate-900 dark:text-white">₹ {row.defaultRate}/kg</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(row.activeGRs * 2, 100)}%` }} />
                        </div>
                        <span className="text-xs font-black text-slate-900 dark:text-white">{row.activeGRs}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(row)} title="Edit" className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-emerald-500 transition-all">
                          <Pencil size={16} />
                        </button>
                        <button title="Delete" className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="h-20 border-t border-slate-50 dark:border-slate-800/50 px-8 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400">Showing <span className="text-slate-900 dark:text-white font-black">1-5</span> of 5</p>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 opacity-50 cursor-not-allowed"><ChevronLeft size={18} /></button>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 opacity-50 cursor-not-allowed"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
