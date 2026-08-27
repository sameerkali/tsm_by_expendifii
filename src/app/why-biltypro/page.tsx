import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { Card } from '@/components/landing/Card';

export const metadata: Metadata = {
  title: 'Why BiltyOne? Built for Indian Transporters',
  description:
    'See why transporters across NCR choose BiltyOne, a fast, modern GR management system built for how Indian transport businesses actually work.',
  alternates: { canonical: 'https://biltyone.com/why-biltypro' },
};

const differentiators = [
  {
    id: '01',
    title: 'Built for Indian transport, not adapted for it',
    description: 'GR workflows, three-copy printing, Indian address formats: all native. Not an afterthought, not a workaround.',
  },
  {
    id: '02',
    title: 'Faster than any alternative',
    description: 'Our competitors run on old PHP and WordPress. Pages load slowly, interfaces are cluttered, and basic tasks take too many clicks. BiltyOne is built on modern technology, so it\'s noticeably faster from the first click.',
  },
  {
    id: '03',
    title: 'Customise your GR the way you want',
    description: 'Different transporters show different fields. Some want less, some want more. In BiltyOne, you control exactly what appears on your printed GR, with no developer needed.',
  },
  {
    id: '04',
    title: 'No more paper records that disappear',
    description: 'A paper GR can be lost to water, fire, rats, or just misplacement. In BiltyOne, every GR is stored permanently and searchable by name, number, or date, always.',
  },
  {
    id: '05',
    title: 'Replacing a data-entry person shouldn\'t cost more than one',
    description: 'Many transporters hire someone just to manage GR paperwork. BiltyOne eliminates that cost: one person can manage everything in the time it used to take three.',
  },
  {
    id: '06',
    title: 'We\'re building with you, not for you',
    description: 'BiltyOne is in its early stage. We\'re onboarding real transporters, listening to real feedback, and adding features based on what actually matters on the ground. Your input shapes the product.',
  },
];

const vsComparison = [
  { label: 'Page load speed', tsm: 'Fast, modern tech stack', generic: 'Slow, PHP/WordPress' },
  { label: 'UI/UX quality', tsm: 'Clean, simple, modern', generic: 'Cluttered, outdated' },
  { label: 'GR creation time', tsm: 'Under 1 minute', generic: '5–10 minutes' },
  { label: 'GR print (3 copies)', tsm: '✓ One click', generic: '✗ Manual setup' },
  { label: 'Customisable GR layout', tsm: '✓ Yes', generic: '✗ Fixed template' },
  { label: 'Customer management', tsm: '✓ Built in', generic: '✗ Often missing' },
  { label: 'Setup time', tsm: '2–24 hours', generic: 'Days to weeks' },
  { label: 'Mobile friendly', tsm: '✓ Yes', generic: '✗ Rarely' },
  { label: 'Pricing', tsm: 'Transparent, flat', generic: 'Complex, hidden fees' },
  { label: 'Built for India', tsm: '✓ From the ground up', generic: '✗ Adapted, not native' },
];

const proofPoints = [
  { value: '2–24H', label: 'From sign-up to your first printed GR' },
  { value: '3 Copies', label: 'Auto-generated per GR: Driver, Consigner, Consignee' },
  { value: '20+ Fields', label: 'Supported per GR, all customisable' },
  { value: '₹0', label: 'Cost right now: completely free to start' },
];

export default function WhyTsmPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
              Why choose BiltyOne?
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6 leading-[1.1]">
              The transport software that actually{' '}
              <span className="text-[#0369A1] dark:text-sky-400">works like you do</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Most transport software in India was built years ago slow, ugly, and painful to use. BiltyOne was built in 2025 by a software engineer who grew up watching transporters struggle with paper and Excel. It&apos;s fast, clean, and built around how you actually work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="why-biltypro-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#0369A1] dark:hover:bg-sky-500 transition-colors duration-200 cursor-pointer"
              >
                Start for free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <LiveDemoLink
                id="why-biltypro-cta-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-7 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-[#0369A1] dark:hover:text-sky-400 transition-all duration-200 cursor-pointer"
              >
                Try live demo
              </LiveDemoLink>
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

        {/* Key Takeaways summary */}
        <section id="key-takeaways" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="tldr-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-950/20 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Key Takeaways</p>
              <h2 id="tldr-heading" className="sr-only">Key Takeaways about BiltyOne</h2>
              <ul className="space-y-3">
                {[
                  'BiltyOne cuts GR creation time from 15 minutes to under 2 minutes, with 3 copies auto-generated.',
                  'No paper, no Excel, no hired data-entry staff. One platform handles your entire GR workflow.',
                  'Free to start right now. Up and running in 2–24 hours. Designed for Indian transporters of all sizes.',
                  'Your data is stored securely, so there are no more lost records from rain, rats, or fire.',
                  'Customisable GR layout, batch management, analytics dashboard, and smart billing: everything a transporter needs.',
                ].map(function (point) {
                  return (
                    <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Why us differentiators */}
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-950" aria-labelledby="differentiators-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">What makes us different</p>
              <h2 id="differentiators-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Six reasons transporters pick BiltyOne
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {differentiators.map((d) => (
                <Card key={d.id} id={d.id} title={d.title} description={d.description} />
              ))}
            </div>
          </div>
        </section>

        {/* BiltyOne vs Generic Tools comparison */}
        <section className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800" aria-labelledby="vs-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Head to head</p>
              <h2 id="vs-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                BiltyOne vs Old Software in Market
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                The existing transport software in India is outdated, built on old technology, with interfaces that feel like they&apos;re from 2008. Here&apos;s how BiltyOne compares.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-md">
              <div className="grid grid-cols-3 bg-[#0F172A] dark:bg-slate-800 text-white text-sm font-semibold">
                <div className="px-6 py-4 text-slate-300">Feature</div>
                <div className="px-6 py-4 text-center border-l border-[#0369A1] bg-[#0369A1]/20">BiltyOne</div>
                <div className="px-6 py-4 text-center border-l border-slate-700 text-slate-400">Old Market Software</div>
              </div>
              {vsComparison.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-900/50'}`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-[#0F172A] dark:text-slate-200">{row.label}</div>
                  <div className="px-6 py-4 text-sm font-semibold text-sky-600 dark:text-sky-400 border-l border-[#0369A1]/20 bg-[#0369A1]/4 dark:bg-sky-500/5">
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
              &ldquo;We scaled from 20 vehicles to 80 without hiring extra admin staff. BiltyOne handled all the complexity, transparently.&rdquo;
            </blockquote>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Arun K., CEO, KPL Transport
            </p>
          </div>
        </section>

        {/* ── CONCLUSION / THE VERDICT ──────────────── */}
        <section id="conclusion" className="py-20 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="conclusion-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Why BiltyOne</p>
            <h2 id="conclusion-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight mb-6">
              The Verdict: Go Digital, Stay Simple
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              BiltyOne is the transport management system built specifically for Indian transporters who are tired of paper GRs, lost records, and slow manual processes. It replaces 15-minute paperwork with a 2-minute digital workflow: 3 copies auto-generated, permanent digital records, customisable layouts, and a simple dashboard that gives you real visibility into your operations. <strong className="text-[#0F172A] dark:text-white">Best of all, it is free to start and takes just 2–24 hours to set up.</strong>
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-800" aria-labelledby="why-biltypro-final-cta">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 id="why-biltypro-final-cta" className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to see it for yourself?
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              No sales calls required. Jump straight into a live demo: no account, no credit card.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LiveDemoLink
                id="why-biltypro-demo-cta"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" />
                </svg>
                Launch live demo
              </LiveDemoLink>
              <Link
                href="/register"
                id="why-biltypro-signup-cta"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-7 py-4 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-400 transition-colors duration-200 cursor-pointer"
              >
                Create your account
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Have questions? <Link href="/contact" className="text-sky-400 hover:underline cursor-pointer">Talk to our team</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
