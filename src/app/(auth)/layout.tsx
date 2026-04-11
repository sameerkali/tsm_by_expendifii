import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* 90/10 Asymmetric Layout - Left Visual / Typographic Side */}
      <div className="hidden lg:flex lg:w-3/5 xl:w-[70%] bg-slate-900 relative overflow-hidden flex-col justify-end p-20 select-none">
        {/* Massive Background Typography */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="text-[40rem] font-black leading-none tracking-tighter -rotate-12 translate-y-[-10%] translate-x-[-10%]">
            TMS
          </div>
        </div>

        {/* Floating Accent Shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full" />

        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold tracking-widest uppercase">
            Expendifii TMS
          </div>
          <h2 className="text-6xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            Control your <br />
            <span className="text-emerald-500">logistics</span> flow.
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-lg leading-relaxed">
            The modern transport management system designed for speed, visibility, and absolute reliability.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex items-center justify-between text-slate-500 text-sm font-medium">
          <div>© 2026 TMS by Expendifii</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Auth Content Area - Right Side */}
      <main className="w-full lg:w-2/5 xl:w-[30%] flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
