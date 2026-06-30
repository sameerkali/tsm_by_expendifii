'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, CheckCircle, AlertTriangle, FileText, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { toast } from 'sonner';
import apiClient from '@/lib/api/client';
import * as XLSX from 'xlsx';

interface ImportResult {
  imported: { grs: number; customers: number };
  skipped: { grs: number; customers: number };
  errors: {
    grs: Array<{ row: number; errors: string[] }>;
    customers: Array<{ row: number; errors: string[] }>;
  };
}

export function ImportDataSection() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showFullError, setShowFullError] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const ext = droppedFile.name.split('.').pop()?.toLowerCase();
      if (ext === 'csv' || ext === 'xlsx') {
        setFile(droppedFile);
        setResult(null);
      } else {
        toast.error('Invalid file type. Only CSV and Excel (.xlsx) files are supported.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/demo_data_migration_tsm.xlsx';
    link.setAttribute('download', 'tsm_data_migration_template.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Template Excel file downloaded.');
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      setResult(null);

      let fileToUpload: Blob = file;

      // If it is a CSV file, convert it to XLSX format containing the "All GR Records" sheet
      if (file.name.endsWith('.csv')) {
        const reader = new FileReader();
        const csvBlob = await new Promise<Blob>((resolve, reject) => {
          reader.onload = (e) => {
            try {
              const data = e.target?.result;
              const workbook = XLSX.read(data, { type: 'binary' });
              const sheetName = workbook.SheetNames[0];
              if (!sheetName) throw new Error('No sheets found in the uploaded file.');
              const sheet = workbook.Sheets[sheetName];
              if (!sheet) throw new Error('Sheet could not be parsed.');

              const newWorkbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(newWorkbook, sheet, 'All GR Records');

              const out = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
              const xlsxBlob = new Blob([out], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              });
              resolve(xlsxBlob);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = (err) => reject(err);
          reader.readAsBinaryString(file);
        });
        fileToUpload = csvBlob;
      }

      const formData = new FormData();
      // Ensure we append the converted file with the correct name and type
      formData.append(
        'file',
        fileToUpload,
        file.name.endsWith('.csv') ? file.name.replace('.csv', '.xlsx') : file.name
      );

      // POST file to Backend Settings Import API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await apiClient.post<any, any>('/settings/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response && response.success) {
        setResult(response.data as ImportResult);
        const importedGrs = response.data.imported.grs || 0;
        const importedCustomers = response.data.imported.customers || 0;
        toast.success(`Successfully imported ${importedGrs} GRs and ${importedCustomers} Customers!`);
        setFile(null);
      } else {
        toast.error('Failed to import records.');
      }
    } catch (e: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = e;
      const apiError = err?.response?.data;
      if (apiError?.errors) {
        setResult({
          imported: { grs: 0, customers: 0 },
          skipped: { grs: 0, customers: 0 },
          errors: apiError.errors,
        });
      } else {
        const errorMsg = err?.message || 'Failed to import backup.';
        setUploadError(errorMsg);
        toast.error(errorMsg.length > 20 ? `${errorMsg.slice(0, 50)}...` : errorMsg);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const grErrors = result?.errors?.grs || [];
  const customerErrors = result?.errors?.customers || [];
  const hasErrors = grErrors.length > 0 || customerErrors.length > 0;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
      <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Import / Migrate Data</h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Upload populated CSV or Excel templates to migrate your records.</p>
        </div>
        <button
          onClick={handleDownloadTemplate}
          className="flex items-center gap-1 text-xs font-black text-sky-600 dark:text-sky-400 hover:opacity-80 uppercase tracking-wider"
        >
          <Download size={14} /> Download Excel Template
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instructions Box */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Instructions</h3>
            <ol className="text-xs text-slate-500 dark:text-slate-400 space-y-3 list-decimal list-inside leading-relaxed font-medium">
              <li>Download the Excel Migration template.</li>
              <li>Add your existing Goods Receipts (GRs) and Customer records to the file.</li>
              <li>Ensure headers remain unmodified.</li>
              <li>Fields like <strong className="text-slate-700 dark:text-slate-300">From City, To City, Pricing Type,</strong> and <strong className="text-slate-700 dark:text-slate-300">Freight Amount</strong> are required.</li>
              <li>Save and upload the file below.</li>
            </ol>
          </div>

          {/* Drag & Drop Area */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
                       onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                 fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload CSV or XLSX file"
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group min-h-[160px] ${
                dragActive
                  ? 'border-sky-500 bg-sky-50/20 dark:bg-sky-500/5'
                  : 'border-slate-200 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv, .xlsx"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="h-12 w-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors">
                {isUploading ? <Loader2 className="animate-spin text-sky-500" size={24} /> : <Upload size={24} />}
              </div>
              <div className="text-center space-y-1">
                {file ? (
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 justify-center">
                    <FileText size={16} className="text-sky-500" />
                    {file.name}
                  </p>
                ) : (
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Drag and drop file here, or <span className="text-sky-600 dark:text-sky-400">browse</span>
                  </p>
                )}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Supports CSV or XLSX up to 5MB</p>
              </div>
            </div>

            {/* Action Buttons */}
            {file && (
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setFile(null)}
                  disabled={isUploading}
                  className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                >
                  Cancel
                </button>
                <Button
                  variant="primary"
                  className="h-10 px-5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-slate-700 hover:opacity-90 transition-all flex items-center gap-1.5"
                  onClick={handleUpload}
                  disabled={isUploading}
                  loading={isUploading}
                >
                  Start Import
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* API Error Display */}
        {uploadError && !result && (
          <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/50 space-y-3">
            <h3 className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle size={16} />
              Import Failed
            </h3>
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
  {showFullError || uploadError.length <= 100
    ? uploadError
    : `${uploadError.slice(0, 100)}...`}
  
  {uploadError.length > 100 && (
    <button
      onClick={() => setShowFullError(!showFullError)}
      className="ml-1 text-purple-600 hover:underline"
    >
      {showFullError ? "less" : "more"}
    </button>
  )}
</p>
            <button
              onClick={() => setUploadError(null)}
              className="text-xs font-bold text-red-500 hover:text-red-700 underline underline-offset-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Results Panel */}
        {result && (
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-6">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={16} className="text-sky-500" />
              Migration Results
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GRs Imported</p>
                <p className="text-2xl font-black text-sky-600 dark:text-sky-400">{result.imported.grs}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customers Imported</p>
                <p className="text-2xl font-black text-sky-600 dark:text-sky-400">{result.imported.customers}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GRs Skipped</p>
                <p className="text-2xl font-black text-slate-500">{result.skipped.grs}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customers Skipped</p>
                <p className="text-2xl font-black text-slate-500">{result.skipped.customers}</p>
              </div>
            </div>

            {hasErrors && (
              <div className="space-y-3 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <p className="text-xs font-black text-red-500 flex items-center gap-1.5 uppercase tracking-wide">
                  <AlertTriangle size={14} />
                  Validation Failures
                </p>
                
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/60 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 font-medium">
                  {grErrors.map((err, idx) => (
                    <div key={`gr-err-${idx}`} className="p-3.5 flex flex-col sm:flex-row sm:items-start gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold shrink-0">
                        Row {err.row} (GR Records)
                      </span>
                      <div className="text-slate-600 dark:text-slate-300 space-y-1">
                        {(err.errors || []).map((msg, mIdx) => (
                          <p key={mIdx} className="leading-relaxed">{msg}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {customerErrors.map((err, idx) => (
                    <div key={`cust-err-${idx}`} className="p-3.5 flex flex-col sm:flex-row sm:items-start gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold shrink-0">
                        Row {err.row} (Customers)
                      </span>
                      <div className="text-slate-600 dark:text-slate-300 space-y-1">
                        {(err.errors || []).map((msg, mIdx) => (
                          <p key={mIdx} className="leading-relaxed">{msg}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
