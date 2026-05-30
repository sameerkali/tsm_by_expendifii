import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'TSM by Expendifii — Transport Management System',
  description:
    'Replace manual transport workflows with an intelligent dashboard. Real-time visibility, automated billing, and effortless fleet management for modern logistics teams.',
  alternates: { canonical: 'https://tsm.expendifii.com' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TSM by Expendifii',
  applicationCategory: 'BusinessApplication',
  description:
    'B2B Transport Management System that replaces manual workflows with an intelligent dashboard.',
  url: 'https://tsm.expendifii.com',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
};

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Real-Time Fleet Tracking',
    description: 'Live GPS visibility across your entire fleet. Know exactly where every vehicle is, reducing delays and improving ETA accuracy.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Automated Billing',
    description: 'Generate invoices, track payments, and reconcile accounts automatically — eliminating spreadsheet errors and saving hours every week.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 8V5L19 2L20 4L22 5L19 8H16ZM16 8L12 12M22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M4 6H2V20C2 21.1046 2.89543 22 4 22H18V20" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Smart Job Dispatching',
    description: 'Intelligently assign jobs to the nearest available driver based on location, load capacity, and shift schedule.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Analytics Dashboard',
    description: 'Gain actionable insights into trip costs, driver performance, and route efficiency with visual, data-dense reports.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21V19C17 17.8954 16.1046 17 15 17H9C7.89543 17 7 17.8954 7 19V21M21 7V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V7M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Customer & Driver Portals',
    description: 'Empower customers to self-track shipments and drivers to manage tasks — reducing inbound support calls by up to 60%.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22C12 22 3 16 3 9C3 7.14348 3.7375 5.36301 5.05025 4.05025C6.36301 2.7375 8.14348 2 10 2H14C15.8565 2 17.637 2.7375 18.9497 4.05025C20.2625 5.36301 21 7.14348 21 9C21 16 12 22 12 22Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
    title: 'Route Optimisation',
    description: 'Cut fuel costs and time with AI-assisted route planning that factors in traffic, delivery windows, and load requirements.',
  },
];

const comparisonRows = [
  { label: 'Job dispatch speed', manual: 'Manual calls & WhatsApp', tsm: 'One-click auto-dispatch' },
  { label: 'Invoice generation', manual: 'Hours of Excel work', tsm: 'Instant automated billing' },
  { label: 'Driver tracking', manual: 'Phone calls every hour', tsm: 'Real-time GPS dashboard' },
  { label: 'Proof of delivery', manual: 'Paper signatures, often lost', tsm: 'Digital POD with photos' },
  { label: 'Payment tracking', manual: 'Manual reconciliation', tsm: 'Auto-matched payments' },
  { label: 'Customer updates', manual: 'Ad-hoc phone calls', tsm: 'Automated SMS / portal' },
];

const testimonials = [
  {
    quote: 'TSM cut our invoice processing time from 3 days to under 2 hours. It has completely transformed how we run operations.',
    name: 'Rajiv M.',
    role: 'Operations Head, FastMove Logistics',
    initials: 'RM',
  },
  {
    quote: 'Our drivers love the app. No more confusion about jobs, and our customers are happier because they can track deliveries themselves.',
    name: 'Priya S.',
    role: 'Director, ShipFirst Express',
    initials: 'PS',
  },
  {
    quote: 'We scaled from 20 vehicles to 80 without hiring extra admin staff. TSM handled all the complexity transparently.',
    name: 'Arun K.',
    role: 'CEO, KPL Transport',
    initials: 'AK',
  },
];

const faqs = [
  {
    q: 'How quickly can we get started?',
    a: 'Most teams are fully onboarded within 48 hours. We handle data migration, driver setup, and your first live run — together.',
  },
  {
    q: 'Do we need to replace our existing tools?',
    a: 'No. TSM integrates with your existing billing software and ERP. We plug in, not pull out.',
  },
  {
    q: 'Is our data secure?',
    a: 'Yes. All data is encrypted in transit and at rest. We follow industry-standard security practices. Read our Security page for full details.',
  },
  {
    q: 'Can drivers use it on mobile?',
    a: 'Absolutely. Drivers get a clean mobile interface for accepting jobs, navigation, POD capture, and shift management.',
  },
  {
    q: 'What support is included?',
    a: 'Every plan includes dedicated onboarding support, a help centre, and a direct line to our team. We treat your success as ours.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── HERO ────────────────────────────────── */}
        <section
          id="hero"
          className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
          aria-label="Hero section"
        >
          {/* Background grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-60"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 via-[#F8FAFC]/40 dark:via-slate-950/40 to-[#F8FAFC] dark:to-slate-950" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0369A1]/30 dark:border-sky-500/30 bg-[#0369A1]/8 dark:bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-[#0369A1] dark:text-sky-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0369A1] dark:bg-sky-400 animate-pulse" aria-hidden="true" />
                Now live for logistics teams
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] dark:text-white max-w-4xl mx-auto leading-[1.12]">
              Stop managing transport{' '}
              <span className="relative">
                <span className="text-[#0369A1] dark:text-sky-400">manually.</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 5C50 1 150 1 200 5" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-center text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              TSM is the intelligent dashboard that replaces WhatsApp chains, Excel sheets, and phone-tag dispatching — with one transparent, trustworthy platform.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="hero-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#0369A1] dark:hover:bg-sky-500 transition-all duration-200 cursor-pointer"
              >
                Get Started — It&apos;s Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/why-tsm"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-[#0369A1] dark:hover:text-sky-400 transition-all duration-200 cursor-pointer"
              >
                Why TSM? Talk to sales →
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              {['No credit card required', 'Onboarded in 48 hours', '99.9% uptime SLA'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13L9 17L19 7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            {/* Live Demo nudge */}
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              Not ready to sign up?{' '}
              <Link href="/live-demo" className="font-semibold text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer">
                Try the live demo — no account needed →
              </Link>
            </p>

            {/* Dashboard preview card */}
            <div className="mt-14 mx-auto max-w-4xl">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/60 dark:shadow-slate-900/60 overflow-hidden">
                {/* Fake browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                  <span className="h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" aria-hidden="true" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
                  <div className="ml-4 flex-1 rounded-md bg-slate-200/70 dark:bg-slate-700 px-3 py-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                    tsm.expendifii.com/dashboard
                  </div>
                </div>
                {/* Dashboard preview */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-[220px]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Active Jobs', value: '48', trend: '+12%', up: true },
                      { label: 'Vehicles Live', value: '31', trend: '100%', up: true },
                      { label: 'Invoices Due', value: '₹2.4L', trend: '-8%', up: false },
                      { label: 'On-time Rate', value: '94%', trend: '+3%', up: true },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-3 shadow-sm">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-[#0F172A] dark:text-white">{stat.value}</p>
                        <p className={`text-xs font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>{stat.trend}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-4 py-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">Recent Jobs</p>
                      {[
                        { id: 'JB-1042', route: 'Mumbai → Pune', status: 'In Transit', color: 'bg-blue-500' },
                        { id: 'JB-1041', route: 'Nashik → Nagpur', status: 'Delivered', color: 'bg-emerald-500' },
                        { id: 'JB-1040', route: 'Pune → Kolhapur', status: 'Pending', color: 'bg-amber-400' },
                      ].map((job) => (
                        <div key={job.id} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-600 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${job.color}`} aria-hidden="true" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{job.id}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">{job.route}</span>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{job.status}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">Fleet Status</p>
                      {[
                        { label: 'Active', count: 31, color: 'bg-emerald-500' },
                        { label: 'Idle', count: 8, color: 'bg-amber-400' },
                        { label: 'Service', count: 3, color: 'bg-red-400' },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`h-2 w-2 rounded-full ${s.color}`} aria-hidden="true" />
                            <span className="text-xs text-slate-600 dark:text-slate-300">{s.label}</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{s.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">Actual TSM dashboard interface</p>
            </div>
          </div>
        </section>

        {/* ── TRANSPORT IMAGERY BAND ───────────────── */}
        <section className="py-16 bg-[#0F172A] dark:bg-slate-900 overflow-hidden" aria-label="Fleet on road">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
              Managing fleets across India
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
                  alt: 'Heavy logistics truck on Indian highway at dawn',
                },
                {
                  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                  alt: 'Fleet of cargo trucks parked at a logistics yard',
                },
                {
                  src: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
                  alt: 'Delivery truck driving on a highway',
                },
              ].map((img, i) => (
                <div key={i} className="relative h-48 sm:h-56 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES ────────────────────────── */}
        <section id="features" className="py-20 sm:py-28 bg-white dark:bg-slate-950" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Platform Capabilities</p>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Everything your team needs,<br className="hidden sm:block" /> nothing they don&apos;t
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Purpose-built for transport and logistics — not a generic project tool repurposed.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900 transition-all duration-200"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F172A] dark:bg-[#0369A1]/20 text-white dark:text-sky-400 group-hover:bg-[#0369A1] dark:group-hover:bg-[#0369A1]/40 transition-colors duration-200">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MANUAL vs TSM COMPARISON ─────────────── */}
        <section
          id="how-it-works"
          className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
          aria-labelledby="comparison-heading"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Before vs After</p>
              <h2 id="comparison-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Manual workflows cost you more than you think
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                See exactly what changes when you switch from duct-tape operations to TSM.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-md overflow-hidden">
              <div className="grid grid-cols-3 bg-[#0F172A] dark:bg-slate-800 text-white text-sm font-semibold">
                <div className="px-6 py-4 text-slate-300">Workflow</div>
                <div className="px-6 py-4 text-center border-l border-slate-700 text-slate-300">Without TSM</div>
                <div className="px-6 py-4 text-center border-l border-[#0369A1] bg-[#0369A1]/20 text-white">With TSM ✓</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-900/50'}`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-[#0F172A] dark:text-slate-200">{row.label}</div>
                  <div className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 border-l border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-red-400" aria-hidden="true">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {row.manual}
                  </div>
                  <div className="px-6 py-4 text-sm font-medium text-[#0369A1] dark:text-sky-400 border-l border-[#0369A1]/20 bg-[#0369A1]/5 dark:bg-sky-500/5 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-emerald-500" aria-hidden="true">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {row.tsm}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/register"
                id="comparison-cta"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#0F172A] dark:hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
              >
                Switch to TSM today
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────── */}
        <section id="testimonials" className="py-20 sm:py-28 bg-white dark:bg-slate-950" aria-labelledby="testimonials-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Customer Stories</p>
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Trusted by logistics teams across India
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 transition-all duration-200"
                >
                  <div className="flex gap-1 mb-4" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] dark:bg-[#0369A1] text-white text-xs font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A] dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Stats band */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '500+', label: 'Vehicles managed' },
                { value: '98%', label: 'Customer satisfaction' },
                { value: '60%', label: 'Admin time saved' },
                { value: '48h', label: 'Average onboarding' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900">
                  <p className="text-3xl font-bold text-[#0369A1] dark:text-sky-400 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────── */}
        <section id="faq" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">FAQ</p>
              <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Questions we hear often
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-6 py-5 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-sm font-semibold text-[#0F172A] dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
              More questions?{' '}
              <Link href="/contact" className="font-semibold text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer">
                Get in touch with our team →
              </Link>
            </p>
          </div>
        </section>

        {/* ── CTA BAND ────────────────────────────── */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-800" aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to modernise your operations?
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Join logistics teams who&apos;ve already replaced chaos with clarity in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="bottom-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors duration-200 cursor-pointer"
              >
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/live-demo"
                id="bottom-cta-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-7 py-4 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors duration-200 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" />
                </svg>
                Live demo — no signup
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
