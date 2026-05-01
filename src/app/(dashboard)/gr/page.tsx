'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Filter, Download, FileText,
  MapPin, Calendar, ChevronLeft, ChevronRight, Loader2, Trash2, Pencil
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { GRFormPanel } from '@/components/gr/GRFormPanel';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useGRs, useDeleteGR } from '@/hooks/useGR';
import { useDebounce } from '@/hooks/useDebounce';
import type { GR } from '@/types/gr';
import { GRStatus } from '@/types/gr';

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  [GRStatus.BOOKED]:     { label: 'Booked',     className: 'bg-slate-100 text-slate-600 border-slate-200' },
  [GRStatus.IN_TRANSIT]: { label: 'In Transit', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  [GRStatus.DELIVERED]:  { label: 'Delivered',  className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
};

const PAYMENT_MAP: Record<string, string> = {
  PENDING: 'Pending',
  PAID: 'Paid',
};

const STATUS_FILTERS = ['All', GRStatus.BOOKED, GRStatus.IN_TRANSIT, GRStatus.DELIVERED];

export default function GRListPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [editData, setEditData] = useState<GR | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GR | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const deleteGR = useDeleteGR();

  const { data: response, isLoading, isError } = useGRs({
    search: debouncedSearch || undefined,
    status: statusFilter !== 'All' ? statusFilter : undefined,
    page,
    limit: 10,
  });

  const grs = response?.data || [];
  const pagination = response?.pagination;

  useEffect(() => { setPage(1); }, [debouncedSearch, statusFilter]);

  const openNew = () => { setEditData(null); setPanelOpen(true); };
  const openEdit = (row: GR) => { setEditData(row); setPanelOpen(true); };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteGR.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  return (
    <>
      <GRFormPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} editData={editData} />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete GR"
        message={`Are you sure you want to delete GR "${deleteTarget?.grNumber}"? This action cannot be undone.`}
        confirmLabel="Delete GR"
        variant="danger"
        isLoading={deleteGR.isPending}
      />

      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic">FREIGHT MANAGEMENT</p>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Goods Receipts</h1>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">
                {pagination?.total ?? 0} RECORDS
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openNew}
              className="flex items-center gap-2 px-6 h-12 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold tracking-tight hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Plus size={18} />New Receipt
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by GR number, consignor, vehicle..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-12 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none focus:border-emerald-500 transition-all font-medium"
            />
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'h-12 px-4 flex-1 lg:flex-none rounded-2xl text-xs font-black uppercase tracking-widest transition-all border',
                  statusFilter === s
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white border-transparent'
                    : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                )}
              >
                {s === 'All' ? 'All' : STATUS_MAP[s]?.label ?? s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/50 h-16 text-left">
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">GR Details</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Consignor → Consignee</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Freight</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                        <span className="text-sm font-medium">Loading goods receipts...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <span className="text-sm font-medium text-red-400">Failed to load GRs. Please try again.</span>
                    </td>
                  </tr>
                ) : grs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                        <FileText className="w-8 h-8 opacity-50" />
                        <span className="text-sm font-medium">No goods receipts found.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  grs.map((row) => {
                    const statusCfg = STATUS_MAP[row.status] ?? { label: row.status, className: 'bg-slate-100 text-slate-600 border-slate-200' };
                    return (
                      <tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">{row.grNumber}</p>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">{row.bookingDate?.slice(0, 10)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{row.consignor}</p>
                          <p className="text-xs text-slate-400 mt-0.5">→ {row.consignee}</p>
                          {row.customer && (
                            <p className="text-[10px] text-emerald-600 font-bold mt-1">Customer: {row.customer.name}</p>
                          )}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{row.fromCity}</span>
                            <MapPin size={10} className="text-emerald-500" />
                            <span className="font-bold text-slate-500">{row.toCity}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{row.vehicleNumber || '—'}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-black text-slate-900 dark:text-white">
                            ₹ {(row.freightAmount ?? 0).toLocaleString('en-IN')}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {row.pricingType} × ₹{row.rate}
                          </p>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            {PAYMENT_MAP[row.paymentStatus] ?? row.paymentStatus}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={cn('inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest', statusCfg.className)}>
                            {statusCfg.label}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEdit(row)}
                              title="Edit"
                              className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-400 hover:text-emerald-500"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(row)}
                              title="Delete"
                              className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-slate-400 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && pagination && pagination.totalPages > 1 && (
            <div className="h-20 border-t border-slate-50 dark:border-slate-800/50 px-8 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400">
                Page <span className="text-slate-900 dark:text-white font-black">{pagination.currentPage}</span> of {pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
