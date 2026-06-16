'use client';

import React, { useState } from 'react';
import { Search, Loader2, User as UserIcon, Phone, Mail, X, Download, Info } from 'lucide-react';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/errors';
import { useCustomers, useDownloadCustomerGrPdf } from '@/hooks/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';
import { Pagination, type PageSizeOption } from '@/components/shared/Pagination';
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
  const [today] = useState(() =>
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0]
  );
  
  const downloadMutation = useDownloadCustomerGrPdf();
  if (!customer) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate) return;
    if (toDate && toDate < fromDate) {
      toast.error('End date cannot be earlier than start date.');
      return;
    }
    
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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 transition-opacity" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[380px] bg-white dark:bg-slate-950 z-50 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 dark:border-slate-800">
        
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Export GR Report</h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-400 hover:text-slate-650 dark:hover:text-slate-350 cursor-pointer">
            <X size={16} />
          </button>
        </div>
        
        {/* Customer Information (Minimal) */}
        <div className="px-6 py-3 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-205">{customer.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{customer.phone}</p>
        </div>
        
        <form onSubmit={handleDownload} className="p-6 space-y-5">
          
          {/* Date Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Date Selection</span>
              
              {/* Info Tooltip */}
              <div className="relative group cursor-help flex items-center">
                <Info size={14} className="text-slate-400 hover:text-sky-500 transition-colors" />
                <div className="absolute bottom-full right-0 mb-2 w-64 p-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-left leading-normal font-normal pointer-events-none">
                  Dates cannot exceed today. If you leave the end date empty, it will include all records up to the present.
                  <div className="absolute top-full right-1.5 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Start Date</label>
                <input 
                  type="date" 
                  required 
                  max={today}
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-700 dark:text-slate-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">End Date <span className="opacity-60 lowercase">(opt)</span></label>
                <input 
                  type="date" 
                  max={today}
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 text-xs font-semibold outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={downloadMutation.isPending || !fromDate}
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-sm"
          >
            {downloadMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {downloadMutation.isPending ? 'Processing...' : 'Download Statement'}
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
  const [limit, setLimit] = useState<PageSizeOption>(10);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

  const { data: response, isLoading, isError, error } = useCustomers({
    search: debouncedSearch,
    page,
    limit,
  });

  const customers = response?.data || [];
  const pagination = response?.pagination;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleLimitChange = (nextLimit: PageSizeOption) => {
    setLimit(nextLimit);
    setPage(1);
  };

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
            <p className="text-xs font-black tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase italic">DOCUMENT CENTER</p>
            <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Printing</h1>
          </div>
        </div>

     

        {/* Search */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search customers by name, phone..."
              className="w-full h-12 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition-all font-medium"
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
                        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                        <span className="text-sm font-medium">Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-red-400 gap-3">
                        <span className="text-sm font-medium">
                          {getApiErrorMessage(error, 'Failed to load customers.', 'customer')}
                        </span>
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
                          <div className="h-11 w-11 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors shrink-0">
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
                          <Phone size={12} className="text-sky-500" />
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
                        <button className="h-8 px-4 bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400 rounded-lg text-xs font-black tracking-widest uppercase hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors">
                          Print GRs
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && !isError && pagination && (
            <Pagination
              pagination={pagination}
              page={page}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={handleLimitChange}
              itemLabel="customers"
            />
          )}
        </div>
      </div>
    </>
  );
}
