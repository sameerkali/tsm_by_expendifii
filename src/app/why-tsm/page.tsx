import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Why TSM by Expendifii? Built for Indian Logistics',
  description:
    'See why logistics businesses across India choose TSM by Expendifii over generic tools   purpose-built, locally trusted, and proven to save 60%+ admin time.',
  alternates: { canonical: 'https://tsm.expendifii.com/why-tsm' },
};

const differentiators = [
  {
    emoji: null,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Purpose-built for Indian logistics',
    body: 'Every feature in TSM was designed around how Indian transport businesses actually work   GST-compliant billing, lorry receipt (GR) workflows, and INR-native financials. No awkward workarounds.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: '10× faster than spreadsheets',
    body: 'What takes 3 hours in Excel takes 15 minutes in TSM. Auto-calculated freight, pre-filled GR templates, and one-click invoice generation   no copy-pasting.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21V19C17 17.8954 16.1046 17 15 17H9C7.89543 17 7 17.8954 7 19V21M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M3 21V19C3 17.8954 3.89543 17 5 17H7M21 21V19C21 17.8954 20.1046 17 19 17H17M15 6.34C16.1413 6.79 17 7.9 17 9C17 10.1 16.1413 11.21 15 11.66M9 6.34C7.85875 6.79 7 7.9 7 9C7 10.1 7.85875 11.21 9 11.66" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Your entire team on one platform',
    body: 'Admin, dispatchers, drivers, and customers all have their own role-scoped view. No WhatsApp groups, no information silos   everyone sees exactly what they need.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'GST-ready billing, automatically',
    body: 'Generate GSTIN-compliant tax invoices with correct HSN codes, CGST/SGST/IGST splits, and digital-signature-ready PDFs   all in under 60 seconds.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22C12 22 3 16 3 9C3 7.14348 3.7375 5.36301 5.05025 4.05025C6.36301 2.7375 8.14348 2 10 2H14C15.8565 2 17.637 2.7375 18.9497 4.05025C20.2625 5.36301 21 7.14348 21 9C21 16 12 22 12 22Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
    title: 'Real-time GPS, no hardware needed',
    body: "Driver's existing smartphone becomes your GPS tracker. Live ETA, route deviation alerts, and digital POD capture   zero additional hardware investment.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Data you can act on',
    body: 'TSM turns raw trip data into decisions   best-performing routes, costliest delays, driver efficiency, and receivables ageing   in an executive dashboard built for ops leads.',
  },
];

const vsComparison = [
  { label: 'Setup time', tsm: '48 hours', generic: '3–6 months' },
  { label: 'GR (Lorry Receipt) workflow', tsm: '✓ Native', generic: '✗ Manual workaround' },
  { label: 'GST-compliant invoicing', tsm: '✓ Built in', generic: '✗ External tool needed' },
  { label: 'Driver mobile app', tsm: '✓ Included', generic: '✗ Add-on cost' },
  { label: 'Indian address & pincode support', tsm: '✓ Native', generic: '✗ Custom fields only' },
  { label: 'Customer tracking portal', tsm: '✓ Included', generic: '✗ Not available' },
  { label: 'Onboarding support', tsm: '✓ Dedicated team', generic: '✗ Self-serve docs' },
  { label: 'Price (per vehicle/month)', tsm: 'Transparent flat rate', generic: 'Complex per-seat model' },
];

const proofPoints = [
  { value: '500+', label: 'Vehicles managed across India' },
  { value: '60%', label: 'Admin time saved on average' },
  { value: '48h', label: 'From sign-up to first live run' },
  { value: '₹0', label: 'Extra hardware needed' },
];

export default function WhyTsmPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-60"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0369A1]/30 dark:border-sky-500/30 bg-[#0369A1]/8 dark:bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-[#0369A1] dark:text-sky-400 uppercase tracking-wider mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0369A1] dark:bg-sky-400 animate-pulse" aria-hidden="true" />
              Why choose TSM?
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6 leading-[1.1]">
              The only TMS built for{' '}
              <span className="text-[#0369A1] dark:text-sky-400">Indian logistics</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Generic tools force your operations into their mould. TSM was built around how transport businesses in India actually work   from GR generation to GST billing to ground-level driver workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="why-tsm-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#0369A1] dark:hover:bg-sky-500 transition-colors duration-200 cursor-pointer"
              >
                Start for free   48h onboarding
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/live-demo"
                id="why-tsm-cta-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-7 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-[#0369A1] dark:hover:text-sky-400 transition-all duration-200 cursor-pointer"
              >
                Try live demo →
              </Link>
            </div>
          </div>
        </section>

        {/* Proof metrics */}
        <section className="py-14 bg-[#0F172A] dark:bg-slate-900 border-b border-slate-800" aria-label="Key metrics">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {proofPoints.map((p) => (
              <div key={p.label}>
                <p className="text-4xl font-bold text-[#0369A1] dark:text-sky-400 mb-1">{p.value}</p>
                <p className="text-sm text-slate-400">{p.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why us differentiators */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-950" aria-labelledby="differentiators-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">What makes us different</p>
              <h2 id="differentiators-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Six reasons logistics teams pick TSM
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((d) => (
                <div
                  key={d.title}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-7 hover:border-[#0369A1]/40 dark:hover:border-sky-500/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 transition-all duration-200"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F172A] dark:bg-[#0369A1]/20 text-white dark:text-sky-400 group-hover:bg-[#0369A1] dark:group-hover:bg-[#0369A1]/40 transition-colors duration-200">
                    {d.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] dark:text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TSM vs Generic Tools comparison */}
        <section className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800" aria-labelledby="vs-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Head to head</p>
              <h2 id="vs-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                TSM vs generic project tools
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Jira, Notion, Airtable, and generic ERPs were built for everyone   which means they&apos;re perfect for no one in transport logistics.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md">
              <div className="grid grid-cols-3 bg-[#0F172A] dark:bg-slate-800 text-white text-sm font-semibold">
                <div className="px-6 py-4 text-slate-300">Feature</div>
                <div className="px-6 py-4 text-center border-l border-[#0369A1] bg-[#0369A1]/20">TSM ✓</div>
                <div className="px-6 py-4 text-center border-l border-slate-700 text-slate-400">Generic Tools</div>
              </div>
              {vsComparison.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-900/50'}`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-[#0F172A] dark:text-slate-200">{row.label}</div>
                  <div className="px-6 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border-l border-[#0369A1]/20 bg-[#0369A1]/4 dark:bg-sky-500/5">
                    {row.tsm}
                  </div>
                  <div className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 border-l border-slate-100 dark:border-slate-800">
                    {row.generic}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial pull-quote */}
        <section className="py-20 bg-white dark:bg-slate-950" aria-labelledby="quote-heading">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 id="quote-heading" className="sr-only">Customer testimonial</h2>
            <svg className="mx-auto mb-6 text-[#0369A1] dark:text-sky-500" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl sm:text-3xl font-semibold text-[#0F172A] dark:text-white leading-snug mb-8">
              &ldquo;We scaled from 20 vehicles to 80 without hiring extra admin staff. TSM handled all the complexity   transparently.&rdquo;
            </blockquote>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Arun K., CEO   KPL Transport
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-800" aria-labelledby="why-tsm-final-cta">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 id="why-tsm-final-cta" className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to see it for yourself?
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              No sales calls required. Jump straight into a live demo   no account, no credit card.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/live-demo"
                id="why-tsm-demo-cta"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" />
                </svg>
                Launch live demo
              </Link>
              <Link
                href="/register"
                id="why-tsm-signup-cta"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-7 py-4 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-400 transition-colors duration-200 cursor-pointer"
              >
                Create your account →
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Have questions? <Link href="/contact" className="text-sky-400 hover:underline cursor-pointer">Talk to our team →</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
