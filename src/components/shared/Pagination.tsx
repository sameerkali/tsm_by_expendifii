'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  total: number;
  limit?: number;
}

interface PaginationProps {
  pagination: PaginationMeta;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: PageSizeOption) => void;
  itemLabel?: string;
  className?: string;
}

export function Pagination({
  pagination,
  page,
  limit,
  onPageChange,
  onLimitChange,
  itemLabel = 'records',
  className,
}: PaginationProps) {
  const currentPage = pagination.currentPage || page;
  const totalPages = Math.max(pagination.totalPages || 1, 1);
  const total = pagination.total || 0;
  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = total === 0 ? 0 : Math.min(currentPage * limit, total);

  if (total <= limit || totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'min-h-20 border-t border-slate-50 dark:border-slate-800/50 px-5 md:px-8 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        <p className="text-xs font-bold text-slate-400">
          Showing{' '}
          <span className="text-slate-900 dark:text-white font-black">{startItem}</span>
          {' - '}
          <span className="text-slate-900 dark:text-white font-black">{endItem}</span>
          {' of '}
          <span className="text-slate-900 dark:text-white font-black">{total}</span> {itemLabel}
        </p>

        <label className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span>Rows</span>
          <div className="relative">
            <select
              value={limit}
              onChange={(event) => onLimitChange(Number(event.target.value) as PageSizeOption)}
              className="h-10 appearance-none rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 pl-3 pr-9 text-xs font-black text-slate-700 dark:text-slate-200 outline-none transition-all hover:bg-slate-50 dark:hover:bg-slate-800 focus:border-sky-500"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronRight
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>
        </label>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <p className="text-xs font-bold text-slate-400">
          Page <span className="text-slate-900 dark:text-white font-black">{currentPage}</span> of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            title="Previous page"
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            title="Next page"
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
