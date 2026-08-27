import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { ScrollImage } from '@/components/shared/ScrollImage';
import { Card } from '@/components/landing/Card';
import { ProcessSteps } from '@/components/landing/ProcessSteps';

export const metadata: Metadata = {
  title: 'Bilty Transport Management System',
  description:
    'Create, print, and manage lorry receipts in minutes. BiltyOne is the modern transport management system built for Indian transporters, with no paper and no spreadsheets.',
  keywords: [
    'transport management system',
    'transport management software',
    'GR software',
    'lorry receipt software',
    'logistics software India',
    'fleet management system',
    'BiltyOne',
    'online GR generator',
    'digital lorry receipt',
    'NCR transport software',
  ],
  authors: [{ name: 'BiltyOne' }],
  alternates: { canonical: 'https://biltyone.com' },
  openGraph: {
    title: 'BiltyOne: Transport OS',
    description:
      'Create, print, and manage lorry receipts in minutes. Built for Indian transporters.',
    url: 'https://biltyone.com',
    siteName: 'BiltyOne',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BiltyOne Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'BiltyOne: Transport Management System for Indian Logistics',
    description:
      'Create, print, and manage lorry receipts in minutes. BiltyOne is the modern transport management system built for Indian transporters, with no paper and no spreadsheets.',
    images: ['/og-image.png'],
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://biltyone.com',
      url: 'https://biltyone.com',
      name: 'BiltyOne Transport Management System',
      description:
        'Stop creating GRs on paper. BiltyOne is the fast, modern transport management system built for Indian transporters create, print, and manage lorry receipts in minutes.',
      inLanguage: 'en',
      dateModified: '2026-06-29',
      isPartOf: { '@id': 'https://biltyone.com/#website' },
      breadcrumb: { '@id': 'https://biltyone.com/#breadcrumb' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hero-summary', '#key-takeaways', '#how-it-works-summary'],
      },
      mainEntity: { '@id': 'https://biltyone.com/#softwareapplication' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://biltyone.com/#softwareapplication',
      name: 'BiltyOne',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Stop creating GRs on paper. BiltyOne is the fast, modern transport management system built for Indian transporters create, print, and manage lorry receipts in minutes.',
      url: 'https://biltyone.com',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
      dateModified: '2026-06-29',
      author: { '@id': 'https://biltyone.com/#author' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://biltyone.com/#organization',
      name: 'BiltyOne',
      alternateName: ['BiltyOne', 'BiltyOne TMS'],
      url: 'https://biltyone.com',
      logo: 'https://biltyone.com/logo.png',
      founder: { '@type': 'Person', name: 'Sameer Faridi' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'work.sameerfaridi@gmail.com',
        url: 'https://biltyone.com/contact',
        availableLanguage: ['English', 'Hindi'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '338, 6A Mahipalpur',
        addressLocality: 'New Delhi',
        addressRegion: 'DL',
        postalCode: '110037',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://biltyone.com/#website',
      name: 'BiltyOne',
      url: 'https://biltyone.com',
      publisher: { '@id': 'https://biltyone.com/#organization' },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://biltyone.com/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biltyone.com' },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://biltyone.com/#author',
      name: 'Sameer Faridi',
      jobTitle: 'Founder & CEO',
      sameAs: 'https://www.linkedin.com/in/sameerfaridi',
      description: 'Founder of BiltyOne, building transport management software for Indian logistics.',
    },
  ],
};

const brandName = 'BiltyOne';

const features = [
  {
    id: '01',
    title: 'GR Creation in Seconds',
    description: 'Create a complete lorry receipt with all required fields in under a minute. No paper, no pen, no mistakes.',
  },
  {
    id: '02',
    title: 'Print-Ready GR (3 Copies)',
    description: 'Generate all three copies Driver, Consigner, Consignee in one click. Print instantly. Always legible, always complete.',
  },
  {
    id: '03',
    title: 'Customisable GR Layout',
    description: 'Show more fields or fewer your choice. Every transporter works differently. BiltyOne adapts to you, not the other way around.',
  },
  {
    id: '04',
    title: 'Batch GR Management',
    description: 'Update, track, and organise multiple GRs at once. No more digging through piles of paper or scrolling through Excel rows.',
  },
  {
    id: '05',
    title: 'Add & Manage Customers',
    description: 'Maintain a clean customer list. Auto-fill consigner and consignee details when creating new GRs no retyping the same information every time.',
  },
  {
    id: '06',
    title: 'Analytics Dashboard',
    description: 'Get visibility into your trips, volumes, and operations in a simple dashboard designed for transport owners, not accountants.',
  },
];

const processSteps = [
  {
    id: '1',
    title: 'Create Your Account',
    description: 'Sign up in under 60 seconds. No credit card required. Add your company name, GST, and basic details, and we guide you through it.',
  },
  {
    id: '2',
    title: 'Add Your Customers',
    description: 'Enter your regular consigners and consignees once. BiltyOne remembers them so you never retype the same information. Manage your customer list from a clean dashboard.',
  },
  {
    id: '3',
    title: 'Create a GR in Minutes',
    description: 'Select the customer, fill in shipment details (origin, destination, vehicle number, charges), and hit submit. BiltyOne generates all three copies (Driver, Consigner, Consignee) instantly.',
  },
  {
    id: '4',
    title: 'Print, Track & Analyse',
    description: 'Print your GRs immediately or access them anytime from the dashboard. Search by name, date, or GR number. Get analytics on your trip volumes, active jobs, and billing status.',
  },
];

const comparisonRows = [
  { label: 'Creating a GR', manual: 'Fill 20+ fields by hand, make 3 paper copies', tsm: 'Done in under a minute, 3 copies auto-generated' },
  { label: 'Storing records', manual: 'Paper files lost to rats, water, or fire', tsm: 'Permanent digital records, accessible anywhere' },
  { label: 'Finding old GRs', manual: 'Search through stacks of paper', tsm: 'Search by name, date, or GR number instantly' },
  { label: 'GR layout control', manual: 'Fixed printed format, no flexibility', tsm: 'Customise which fields appear on print' },
  { label: 'Hiring staff', manual: 'Pay someone just to manage paper GRs', tsm: 'One person can handle everything in BiltyOne' },
  { label: 'Using Excel', manual: 'Complex, slow, breaks easily', tsm: 'Not a solution BiltyOne is' },
];

const testimonials = [
  {
    quote: 'Pehle ek GR banane mein 15 minute lagte the. BiltyOne mein 2 minute mein ho jaata hai. Aur teen copy ek dum ready.',
    name: 'Nazim Faridi',
    role: 'Owner, Faridi Tempo Transport, Delhi',
    initials: 'NF',
    cite: 'https://www.linkedin.com/in/nazim-faridi',
  },
  {
    quote: 'Humara saara record paper mein tha. Ek baar baarish mein sab bheeg gaya. Ab BiltyOne mein sab safe hai, kabhi nahi jaayega.',
    name: 'Faisal Ali',
    role: 'Owner, Ali Roadlines, NCR',
    initials: 'FA',
    cite: 'https://www.linkedin.com/in/faisal-ali',
  },
  {
    quote: 'Simple hai, fast hai. Maine socha tha seekhne mein time lagega 1 din mein sab samajh aa gaya.',
    name: 'Ravi Sharma',
    role: 'Dispatcher, Northern Freight Co., Ghaziabad',
    initials: 'RS',
    cite: 'https://www.linkedin.com/in/ravi-sharma',
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

      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

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
            

            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
              Stop managing transport{' '}
              <span className="relative">
                <span className="text-sky-700 dark:text-sky-400">manually.</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 5C50 1 150 1 200 5" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p id="hero-summary" className="mt-6 text-center text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Replace manual paperwork, lost receipts, and slow Excel sheets with NCR&apos;s fastest digital GR generator. Auto-fill customer details, customize print layouts, and manage active jobs from one simple dashboard.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="hero-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-sky-700 dark:hover:bg-sky-500 transition-all duration-200 cursor-pointer"
              >
                Get Started It&apos;s Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/why-biltypro"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-400 transition-all duration-200 cursor-pointer"
              >
                See how it works
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              {['No credit card required', 'Up and running in 2–24 hours', 'Your data, always safe'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13L9 17L19 7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            {/* Live Demo nudge */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Not ready to sign up?{' '}
              <LiveDemoLink className="font-semibold text-sky-700 dark:text-sky-400 hover:underline cursor-pointer">
                Try the live demo, no account needed.
              </LiveDemoLink>
            </p>

            {/* Product preview */}
            <ScrollImage
              src="/dashboard_img_herosection_straight.webp"
              alt="BiltyOne dashboard showing revenue overview, active shipments, and recent GRs"
              priority
              containerClassName="mt-4 sm:mt-8"
            />
          </div>
        </section>

        {/* ── CORE FEATURES ───────────────────────── */}
        <section id="features" className="py-20 sm:py-28 bg-white dark:bg-slate-950" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Capabilities</p>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Everything a transporter actually needs.<br className="hidden sm:block" /> Nothing they don&apos;t.
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                BiltyOne is purpose-built for transport businesses not a generic tool forced to fit. Built on open standards for security and interoperability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f) => (
                <Card key={f.id} id={f.id} title={f.title} description={f.description} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/features" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-sky-400 hover:underline">
                Explore all capabilities and layouts
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW BiltyOne WORKS IN 4 STEPS ────────────── */}
        <section id="how-tsm-works-steps" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" aria-labelledby="steps-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Simple Process</p>
              <h2 id="steps-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                How BiltyOne Works in <span className="text-sky-700 dark:text-sky-400">4 Simple Steps</span>
              </h2>
              <p id="how-it-works-summary" className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                From paper chaos to digital control. Here is exactly how BiltyOne transforms your GR workflow.
              </p>
            </div>
            <ProcessSteps steps={processSteps} />
          </div>
        </section>

        {/* ── MANUAL vs BiltyOne COMPARISON ─────────────── */}
        <section
          id="how-it-works"
          className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="comparison-heading"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Before vs After</p>
              <h2 id="comparison-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Paper GRs cost you more than you think <br className="hidden sm:block" /> in time, money, and stress
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Here&apos;s what actually changes when you move to BiltyOne. Over 70% of Indian transporters still use paper-based systems for GR and LR management. BiltyOne is built to change that.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-md overflow-hidden">
              <div className="grid grid-cols-3 bg-[#0F172A] dark:bg-slate-800 text-white text-sm font-semibold">
                <div className="px-6 py-4 text-slate-300">Pain Point</div>
                <div className="px-6 py-4 text-center border-l border-slate-700 text-slate-300">Manual (Today)</div>
                <div className="px-6 py-4 text-center border-l border-[#0369A1] bg-[#0369A1]/20 text-white">With BiltyOne ✓</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-900/50'}`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">{row.label}</div>
                  <div className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 border-l border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-red-400" aria-hidden="true">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {row.manual}
                  </div>
                  <div className="px-6 py-4 text-sm font-medium text-sky-700 dark:text-sky-400 border-l border-[#0369A1]/20 bg-[#0369A1]/5 dark:bg-sky-500/5 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-emerald-500" aria-hidden="true">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {row.tsm}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/why-biltypro"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-[#0369A1] transition-all"
              >
                Why Transporters Pick BiltyOne
              </Link>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────── */}
        <section id="testimonials" className="py-20 sm:py-28 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="testimonials-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Real Feedback</p>
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                What transporters say about BiltyOne
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6 hover:border-[#0369A1]/35 dark:hover:border-sky-500/35 transition-all duration-205"
                >
                  <svg className="mb-4 text-sky-700/40 dark:text-sky-500/30" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] dark:bg-[#0369A1] text-white text-xs font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING PREVIEW ─────────────────────── */}
        <section className="py-20 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Simple Pricing</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">100% Free For Early Transporters</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6 text-sm sm:text-base">
              NCR transporters who sign up this month get full access to GR creation, customer directories, and dashboards for ₹0. No hidden contracts.
            </p>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-sky-600 transition-colors">
              Claim Free Access Now
            </Link>
          </div>
        </section>

        {/* ── FAQ TEASER ──────────────────────────── */}
        <section className="py-16 bg-[#F8FAFC] dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Still have questions?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
              Read answers to the questions transporters ask us most often.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-400 transition-all cursor-pointer"
            >
              Visit our FAQ page
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
