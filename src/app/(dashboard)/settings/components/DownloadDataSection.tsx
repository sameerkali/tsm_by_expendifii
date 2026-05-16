'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui';
import { toast } from 'sonner';
import { grApi } from '@/lib/api/gr.api';
import { customerApi } from '@/lib/api/customer.api';

export function DownloadDataSection() {
  const [isExportingGR, setIsExportingGR] = useState(false);
  const [isExportingCustomers, setIsExportingCustomers] = useState(false);

  const convertToCsv = (data: any[]) => {
    if (!data || data.length === 0) return '';
    // Flatten basic objects just 1 level or convert direct keys
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const row of data) {
      const values = headers.map(header => {
        let val = row[header];
        if (val !== null && typeof val === 'object') {
          val = JSON.stringify(val);
        } else if (val == null) {
          val = '';
        }
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  };

  const triggerDownload = (csvString: string, filename: string) => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportGR = async () => {
    try {
      setIsExportingGR(true);
      const res = await grApi.getAll({ limit: 10000 });
      const dataToExport = res.data || [];
      if (!dataToExport.length) {
        toast.error('No GR records found to export.');
        return;
      }
      const csv = convertToCsv(dataToExport);
      triggerDownload(csv, `gr_records_${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('GR records exported successfully.');
    } catch (e) {
      console.error(e);
      toast.error('Failed to export GR records.');
    } finally {
      setIsExportingGR(false);
    }
  };

  const handleExportCustomers = async () => {
    try {
      setIsExportingCustomers(true);
      const res = await customerApi.getAll({ page: 1, limit: 10000 } as any);
      const dataToExport = res.data || [];
      if (!dataToExport.length) {
        toast.error('No customers found to export.');
        return;
      }
      const csv = convertToCsv(dataToExport);
      triggerDownload(csv, `customers_${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('Customers exported successfully.');
    } catch (e) {
      console.error(e);
      toast.error('Failed to export customers.');
    } finally {
      setIsExportingCustomers(false);
    }
  };

  return (
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
            <Button 
              variant="primary" 
              className="h-10 px-4 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700"
              onClick={handleExportGR}
              disabled={isExportingGR}
              loading={isExportingGR}
            >
              <Download size={14} />Export
            </Button>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Customer Records</p>
              <p className="text-xs text-slate-400 mt-0.5">Full customer database in Excel</p>
            </div>
            <Button 
              variant="primary" 
              className="h-10 px-4 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700"
              onClick={handleExportCustomers}
              disabled={isExportingCustomers}
              loading={isExportingCustomers}
            >
              <Download size={14} />Export
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
