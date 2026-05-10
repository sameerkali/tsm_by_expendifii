'use client';

import React, { useState, useEffect } from 'react';
import { Search, Loader2, User as UserIcon, Phone, Mail, ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCustomers, useDownloadCustomerGrPdf } from '@/hooks/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';
import type { Customer } from '@/types/customer';

function PrintModal({ 
  customer, 
  onClose 
}: { 
  customer: Customer | null; 
  onClose: () => void 
}) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const downloadMutation = useDownloadCustomerGrPdf();

  if (!customer) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate) return;
    
    downloadMutation.mutate(
      { customerId: customer.id, from: fromDate, to: toDate || undefined },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-950 z-50 rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">GENERATE REPORT</p>
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">Print GRs</h2>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleDownload} className="p-6 space-y-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
              <UserIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">{customer.name}</p>
              <p className="text-xs text-slate-500">{customer.phone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">From Date <span className="text-emerald-500">*</span></label>
              <input 
                type="date" 
                required 
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium outline-none focus:border-emerald-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">To Date <span className="text-slate-400 font-normal italic">— optional</span></label>
              <input 
                type="date" 
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium outline-none focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={downloadMutation.isPending || !fromDate}
            className="w-full h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold text-sm tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {downloadMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {downloadMutation.isPending ? 'Generating PDF...' : 'Download GRs'}
          </button>
        </form>
      </div>
    </>
  );
}

export default function PrintingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

  const { data: response, isLoading, isError, error } = useCustomers({
    search: debouncedSearch,
    page: page,
  });

  const customers = response?.data || [];
  const pagination = response?.pagination;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <>
      {activeCustomer && (
        <PrintModal 
          customer={activeCustomer} 
          onClose={() => setActiveCustomer(null)} 
        />
      )}

      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">DOCUMENT CENTER</p>
            <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Printing</h1>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 rounded-2xl">
          <p className="text-xs font-bold text-blue-700 dark:text-blue-300">
            <span className="font-black">How to print:</span> Click on a customer from the list below to select a date range and generate a PDF report of their GRs.
          </p>
        </div>

        {/* Search */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search customers by name, phone..."
              className="w-full h-12 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 h-16 text-left">
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">GSTIN</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                        <span className="text-sm font-medium">Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-red-400 gap-3">
                        <span className="text-sm font-medium">Failed to load customers. {(error as any)?.message}</span>
                      </div>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
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
                      onClick={() => setActiveCustomer(row)}
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
                      <td className="px-8 py-5 text-right">
                        <button className="h-8 px-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-xs font-black tracking-widest uppercase hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
                          Print GRs
                        </button>
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
