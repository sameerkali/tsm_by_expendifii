import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TMS by Expendifii | Transport Management System',
  description: 'Modern transport management system for running your logistics business faster.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans p-6 text-center relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/[0.03] dark:bg-blue-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
          TMS by Expendifii
        </h1>
        <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
          its a landing page
        </p>
        
        <div className="pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-md transition-all shadow-sm"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
