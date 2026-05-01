'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Search, Filter, User as UserIcon, Phone, Mail, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CustomerFormPanel } from '@/components/customers/CustomerFormPanel';
import { useCustomers } from '@/hooks/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';

export default function CustomersPage() {
  const router = useRouter();
  
  // Panel state for creating a new customer
  const [panelOpen, setPanelOpen] = useState(false);
  
  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);

  // Fetch customers
  const { data: response, isLoading, isError, error } = useCustomers({
    search: debouncedSearch,
    page: page,
  });

  const customers = response?.data || [];
  const pagination = response?.pagination;

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const openNew = () => { setPanelOpen(true); };

  const handleRowClick = (id: string) => {
    router.push(`/customers/${id}`);
  };

  return (
    <>
      <CustomerFormPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />

      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">CRM INTEGRITY</p>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Customer Registry</h1>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">
                {pagination?.total || 0} ACCOUNTS
              </span>
            </div>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-6 h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
            <Plus size={18} />Add Customer
          </button>
        </div>

        {/* Stats - Reduced as per API data availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter italic">
              {pagination?.total || 0}
            </h3>
            <p className="text-xs font-bold text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-widest mt-1">Total Customers</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
             <h3 className="text-2xl font-black text-white tracking-tighter italic">
                Active
             </h3>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Status</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or mobile..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium" 
            />
          </div>
          {/* <button className="h-12 px-6 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Filter size={16} />Segment
          </button> */}
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
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Type</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                        <span className="text-sm font-medium">Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-red-400 gap-3">
                        <span className="text-sm font-medium">Failed to load customers. {(error as any)?.message}</span>
                      </div>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                        <UserIcon className="w-8 h-8 opacity-50" />
                        <span className="text-sm font-medium">No customers found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => handleRowClick(row.id)}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0">
                            <UserIcon size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white italic tracking-tight">{row.name}</p>
                            {row.city && (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  {row.city}{row.state ? `, ${row.state}` : ''}
                                </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 space-y-1">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Phone size={12} className="text-emerald-500" />
                          <span className="text-xs font-bold">{row.phone}</span>
                        </div>
                        {row.email && (
                            <div className="flex items-center gap-2 text-slate-500">
                              <Mail size={12} className="text-slate-400" />
                              <span className="text-xs font-medium">{row.email}</span>
                            </div>
                        )}
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">{row.gstin || '—'}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{row.pricingType || '—'}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                            {row.defaultRate ? `₹ ${row.defaultRate}` : '—'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && !isError && pagination && pagination.totalPages > 1 && (
            <div className="h-20 border-t border-slate-50 dark:border-slate-800/50 px-8 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-400">
                Showing page <span className="text-slate-900 dark:text-white font-black">{pagination.currentPage}</span> of {pagination.totalPages}
                </p>
                <div className="flex items-center gap-2">
                <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={18} />
                </button>
                <button 
                    disabled={page === pagination.totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight size={18} />
                </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
