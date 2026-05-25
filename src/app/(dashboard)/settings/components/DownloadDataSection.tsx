'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui';
import { toast } from 'sonner';
import apiClient from '@/lib/api/client';

export function DownloadDataSection() {
  const [isExportingAll, setIsExportingAll] = useState(false);

  const handleExportAll = async () => {
    try {
      setIsExportingAll(true);
      
      // Request Excel file backup from railway backend via Next proxy
      const response = await apiClient.get('/gr/backup/excel', {
        responseType: 'blob',
      });
      
      const blob = response as unknown as Blob;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `tsm_complete_backup_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('System backup downloaded successfully.');
    } catch (e) {
      console.error(e);
      toast.error('Failed to export system backup.');
    } finally {
      setIsExportingAll(false);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60">
        <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Download Data</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">Export all your company data to Excel format.</p>
      </div>
      <div className="p-8">
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Full System Backup</p>
              <p className="text-xs text-slate-400 mt-0.5">Download all your records in a single dynamic Excel sheet</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200/60 dark:border-slate-700/60 pt-4">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">GR Records</p>
                <p className="text-[11px] font-medium text-slate-400">All goods receipts in CSV</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Customer Records</p>
                <p className="text-[11px] font-medium text-slate-400">Full customer database in CSV</p>
              </div>
            </div>
          </div>

          <Button 
            variant="primary" 
            className="h-11 px-5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700 hover:opacity-90 transition-all shrink-0 flex items-center gap-1.5"
            onClick={handleExportAll}
            disabled={isExportingAll}
            loading={isExportingAll}
          >
            <Download size={14} />Download Backup
          </Button>
        </div>
      </div>
    </section>
  );
}
