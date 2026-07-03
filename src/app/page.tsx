import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import FAQSection from '@/components/landing/FAQSection';

export const metadata: Metadata = {
  title: 'TSM by Expendifii Transport Management System',
  description:
    'Stop creating GRs on paper. TSM is the fast, modern transport management system built for Indian transporters create, print, and manage lorry receipts in minutes.',
  alternates: { canonical: 'https://tsm.expendifii.com' },
};

const faqs = [
  {
    q: 'How quickly can we get started?',
    a: 'Most transporters are up and running within 2 to 24 hours. We help you set up your account, add your customers, and print your first GR together.',
  },
  {
    q: "We've been doing this on paper for years. Is it hard to switch?",
    a: 'Not at all. TSM was designed for transporters, not software people. If you can fill a paper GR, you can use TSM. Most users are comfortable within a day.',
  },
  {
    q: 'Can we customise what appears on the printed GR?',
    a: 'Yes. You choose which fields appear on print. Every transport business is different TSM works around your format, not a fixed template.',
  },
  {
    q: 'What happens to our data if something goes wrong?',
    a: 'Your data is stored securely on our servers not on paper, not on a single computer. It won\'t burn, won\'t get soaked, won\'t be eaten by rats. It\'s always there when you need it.',
  },
  {
    q: 'Is TSM free?',
    a: 'Yes TSM is completely free right now. We\'re onboarding our first transporters, gathering real feedback, and improving the product. After the free period, it will become a paid service but we\'ll always give you fair notice before anything changes.',
  },
  {
    q: 'Do you have a referral programme?',
    a: 'Yes. Refer a fellow transporter and if they purchase a plan, both of you get 15 extra days free. No catch.',
  },
  {
    q: 'What is a Transport Management System (TMS)?',
    a: 'A Transport Management System (TMS) is software that helps logistics companies plan, execute, and optimise the movement of goods. TSM by Expendifii focuses specifically on GR creation, printing, and record-keeping for Indian transporters — no complex modules you don\'t need.',
  },
  {
    q: 'Is TSM suitable for small fleets with just 1-2 trucks?',
    a: 'Absolutely. TSM is designed for transporters of all sizes. Whether you own one truck or fifty, the GR creation, customer management, and analytics features work exactly the same. Small fleet owners actually benefit the most because TSM eliminates the need to hire a dedicated person just for paperwork.',
  },
   {
    q: 'What happens when the free period ends?',
    a: 'We will notify you well in advance. Early adopters may get extended access or special pricing. No surprises.',
  },
   {
    q: 'Can I export my data if I leave?',
    a: 'Yes. You can export all your GRs and customer data anytime. Your data belongs to you.'
  },
     {
    q: 'Do you offer on-premise deployment?',
    a: 'Not currently. TSM by Expendifii is cloud-based, which means you can access it from anywhere with an internet connection.'
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://tsm.expendifii.com',
      url: 'https://tsm.expendifii.com',
      name: 'TSM by Expendifii Transport Management System',
      description:
        'Stop creating GRs on paper. TSM is the fast, modern transport management system built for Indian transporters create, print, and manage lorry receipts in minutes.',
      inLanguage: 'en',
      dateModified: '2026-06-29',
      isPartOf: { '@id': 'https://tsm.expendifii.com/#website' },
      breadcrumb: { '@id': 'https://tsm.expendifii.com/#breadcrumb' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hero-summary', '#key-takeaways', '#how-it-works-summary'],
      },
      mainEntity: { '@id': 'https://tsm.expendifii.com/#softwareapplication' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://tsm.expendifii.com/#softwareapplication',
      name: 'TSM by Expendifii',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Stop creating GRs on paper. TSM is the fast, modern transport management system built for Indian transporters create, print, and manage lorry receipts in minutes.',
      url: 'https://tsm.expendifii.com',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
      dateModified: '2026-06-29',
      author: { '@id': 'https://tsm.expendifii.com/#author' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://tsm.expendifii.com/#organization',
      name: 'TSM by Expendifii',
      url: 'https://tsm.expendifii.com',
      logo: 'https://tsm.expendifii.com/logo.png',
      founder: { '@type': 'Person', name: 'Sameer Faridi' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: 'https://tsm.expendifii.com/contact',
      },
      sameAs: [
        'https://github.com/expendifii',
        'https://www.linkedin.com/company/expendifii',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://tsm.expendifii.com/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tsm.expendifii.com' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://tsm.expendifii.com/#faq',
      mainEntity: faqs.map(function (f) {
        return {
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        };
      }),
    },
    {
      '@type': 'Person',
      '@id': 'https://tsm.expendifii.com/#author',
      name: 'Sameer Faridi',
      jobTitle: 'Founder & CEO',
      sameAs: 'https://www.linkedin.com/in/sameerfaridi',
      description: 'Founder of TSM by Expendifii, building transport management software for Indian logistics.',
    },
  ],
};

const brandName = 'TSM by Expendifii';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'GR Creation in Seconds',
    description: 'Create a complete lorry receipt with all required fields in under a minute. No paper, no pen, no mistakes.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Print-Ready GR (3 Copies)',
    description: 'Generate all three copies Driver, Consigner, Consignee in one click. Print instantly. Always legible, always complete.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12M18.4142 6.58579L12.5 12.5L9 11.5L10 8L15.9142 2.08579C16.6953 1.30474 17.9616 1.30474 18.7426 2.08579L20.9142 4.25736C21.6953 5.03841 21.6953 6.30474 20.9142 7.08579L18.4142 6.58579Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Customisable GR Layout',
    description: 'Show more fields or fewer your choice. Every transporter works differently. TSM adapts to you, not the other way around.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Batch GR Management',
    description: 'Update, track, and organise multiple GRs at once. No more digging through piles of paper or scrolling through Excel rows.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21V19C17 17.8954 16.1046 17 15 17H9C7.89543 17 7 17.8954 7 19V21M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Add & Manage Customers',
    description: 'Maintain a clean customer list. Auto-fill consigner and consignee details when creating new GRs no retyping the same information every time.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Analytics Dashboard',
    description: 'Get visibility into your trips, volumes, and operations in a simple dashboard designed for transport owners, not accountants.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Driver App (Soon)',
    description: 'Give drivers their own GR copy digitally. No more lost paper slips.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Smart Billing',
    description: 'Auto-generate invoices from GR data. GST-compliant, fast, and accurate.',
  },
];

const comparisonRows = [
  { label: 'Creating a GR', manual: 'Fill 20+ fields by hand, make 3 paper copies', tsm: 'Done in under a minute, 3 copies auto-generated' },
  { label: 'Storing records', manual: 'Paper files lost to rats, water, or fire', tsm: 'Permanent digital records, accessible anywhere' },
  { label: 'Finding old GRs', manual: 'Search through stacks of paper', tsm: 'Search by name, date, or GR number instantly' },
  { label: 'GR layout control', manual: 'Fixed printed format, no flexibility', tsm: 'Customise which fields appear on print' },
  { label: 'Hiring staff', manual: 'Pay someone just to manage paper GRs', tsm: 'One person can handle everything in TSM' },
  { label: 'Using Excel', manual: 'Complex, slow, breaks easily', tsm: 'Not a solution TSM is' },
];

const testimonials = [
  {
    quote: 'Pehle ek GR banane mein 15 minute lagte the. TSM mein 2 minute mein ho jaata hai. Aur teen copy ek dum ready.',
    name: 'Nazim Faridi',
    role: 'Owner, Faridi Tempo Transport, Delhi',
    initials: 'NF',
    cite: 'https://www.linkedin.com/in/nazim-faridi',
  },
  {
    quote: 'Humara saara record paper mein tha. Ek baar baarish mein sab bheeg gaya. Ab TSM mein sab safe hai, kabhi nahi jaayega.',
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
                Now live for transporters in NCR
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

            <p id="hero-summary" className="mt-6 text-center text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              TSM by Expendifii replaces paper GRs, Excel sheets, and hired data-entry staff with one fast, simple, and trustworthy platform built specifically for Indian transporters. TSM is the modern transport management system that thousands of logistics businesses trust for their daily operations.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="hero-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#0369A1] dark:hover:bg-sky-500 transition-all duration-200 cursor-pointer"
              >
                Get Started It&apos;s Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/why-tsm"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-[#0369A1] dark:hover:text-sky-400 transition-all duration-200 cursor-pointer"
              >
                See how it works →
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

            {/* Key-value stats */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span><strong className="text-[#0369A1] dark:text-sky-400">Platform:</strong> TSM by Expendifii</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Type:</strong> Transport Management System</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Users:</strong> Transporters across India</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Setup:</strong> 2–24 hours</span>
            </div>

            {/* Live Demo nudge */}
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              Not ready to sign up?{' '}
              <Link href="/live-demo" className="font-semibold text-[#0369A1] dark:text-sky-400 hover:underline cursor-pointer">
                Try the live demo no account needed →
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

        {/* ── KEY TAKEAWAYS / TL;DR ────────────────── */}
        <section id="key-takeaways" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="tldr-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-950/20 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Key Takeaways</p>
              <h2 id="tldr-heading" className="sr-only">Key Takeaways about TSM by Expendifii</h2>
              <ul className="space-y-3">
                {[
                  'TSM by Expendifii cuts GR creation time from 15 minutes to under 2 minutes — 3 copies auto-generated.',
                  'No paper, no Excel, no hired data-entry staff. One platform handles your entire GR workflow.',
                  'Free to start right now. Up and running in 2–24 hours. Designed for Indian transporters of all sizes.',
                  'Your data is stored securely — no more lost records from rain, rats, or fire.',
                  'Customisable GR layout, batch management, analytics dashboard, and smart billing — everything a transporter needs.',
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

        {/* ── TABLE OF CONTENTS ────────────────────── */}
        <nav className="py-8 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" aria-label="Table of Contents">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">On this page</p>
            <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How TSM Works' },
                { href: '#how-tsm-works-steps', label: 'Step-by-Step' },
                { href: '#testimonials', label: 'Testimonials' },
                { href: '#glossary', label: 'Logistics Glossary' },
                { href: '#faq', label: 'FAQ' },
                { href: '#conclusion', label: 'Conclusion' },
              ].map(function (link) {
                return (
                  <li key={link.href}>
                    <a href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-[#0369A1] dark:hover:text-sky-400 transition-colors font-medium">
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>


        <section id="features" className="py-20 sm:py-28 bg-white dark:bg-slate-950" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Platform Capabilities</p>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Everything a transporter actually needs.<br className="hidden sm:block" /> Nothing they don&apos;t.
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              TSM by Expendifii is purpose-built for transport businesses not a generic tool forced to fit. <a href="https://schema.org" target="_blank" rel="noopener noreferrer" className="text-[#0369A1] dark:text-sky-400 hover:underline">Built on open standards</a> for security and interoperability.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span><strong className="text-[#0369A1] dark:text-sky-400">GR creation:</strong> &lt;2 min</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Copies:</strong> 3 auto-generated</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Setup:</strong> 2–24 hours</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Pricing:</strong> Free to start</span>
              <span><strong className="text-[#0369A1] dark:text-sky-400">Platform:</strong> Web-based</span>
            </div>
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

        {/* ── HOW TSM WORKS IN 4 STEPS ────────────── */}
        <section id="how-tsm-works-steps" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" aria-labelledby="steps-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Simple Process</p>
              <h2 id="steps-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                How TSM Works in <span className="text-[#0369A1] dark:text-sky-400">4 Simple Steps</span>
              </h2>
              <p id="how-it-works-summary" className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                From paper chaos to digital control. Here is exactly how TSM by Expendifii transforms your GR workflow.
              </p>
            </div>
            <ol className="space-y-6">
              {[
                { step: '1', title: 'Create Your Account', desc: 'Sign up in under 60 seconds. No credit card required. Add your company name, GST, and basic details — we guide you through it.' },
                { step: '2', title: 'Add Your Customers', desc: 'Enter your regular consigners and consignees once. TSM remembers them so you never retype the same information. Manage your customer list from a clean dashboard.' },
                { step: '3', title: 'Create a GR in Minutes', desc: 'Select the customer, fill in shipment details (origin, destination, vehicle number, charges), and hit submit. TSM generates all three copies — Driver, Consigner, Consignee — instantly.' },
                { step: '4', title: 'Print, Track & Analyse', desc: 'Print your GRs immediately or access them anytime from the dashboard. Search by name, date, or GR number. Get analytics on your trip volumes, active jobs, and billing status.' },
              ].map(function (s) {
                return (
                  <li key={s.step} className="flex items-start gap-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0369A1] text-white text-lg font-bold">{s.step}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F172A] dark:text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong className="text-[#0369A1] dark:text-sky-400">Setup time:</strong> 2–24 hours &middot;{' '}
                <strong className="text-[#0369A1] dark:text-sky-400">Pricing:</strong> Free right now &middot;{' '}
                <strong className="text-[#0369A1] dark:text-sky-400">No training needed:</strong> Most users get it in a day
              </p>
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
                Paper GRs cost you more than you think <br className="hidden sm:block" /> in time, money, and stress
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Here&apos;s what actually changes when you move to TSM. According to industry reports, <a href="https://www.logistics.dhl/in-en/home/insights-and-innovation/thought-leadership/trend-reports/digitalization-in-logistics.html" target="_blank" rel="noopener noreferrer" className="text-[#0369A1] dark:text-sky-400 hover:underline">over 70% of Indian transporters still use paper-based systems</a> for GR and LR management. TSM is built to change that.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-md overflow-hidden">
              <div className="grid grid-cols-3 bg-[#0F172A] dark:bg-slate-800 text-white text-sm font-semibold">
                <div className="px-6 py-4 text-slate-300">Pain Point</div>
                <div className="px-6 py-4 text-center border-l border-slate-700 text-slate-300">Manual (Today)</div>
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

        {/* ── LOGISTICS GLOSSARY ───────────────────── */}
        <section id="glossary" className="py-20 sm:py-28 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="glossary-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Quick Reference</p>
              <h2 id="glossary-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Common Logistics Terms — Explained
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                TSM by Expendifii handles all these documents and processes. Here is what they mean.
              </p>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { term: 'GR (Goods Receipt)', def: 'A document issued by a transporter acknowledging receipt of goods for shipment. Also called a lorry receipt (LR). TSM by Expendifii creates and manages GRs digitally.' },
                { term: 'POD (Proof of Delivery)', def: 'A signed document confirming goods were delivered to the consignee. Essential for closing the shipping cycle and releasing payments.' },
                { term: 'LR (Lorry Receipt)', def: 'Same as GR — used interchangeably in the Indian transport industry. A legal document of goods handed over for transport.' },
                { term: 'E-way Bill', def: 'A digital document required for inter-state goods movement under GST. TSM helps you manage the data alongside your GR.' },
                { term: 'Consigner (Consignor)', def: 'The person or business sending the goods. One of the three parties on every GR (alongside transporter and consignee).' },
                { term: 'GRN (Goods Received Note)', def: 'A document created by the consignee upon receiving goods, confirming quantity and condition match the GR.' },
              ].map(function (item) {
                return (
                  <div key={item.term} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-5 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 transition-colors duration-200">
                    <dt className="text-sm font-bold text-[#0F172A] dark:text-white mb-1">{item.term}</dt>
                    <dd className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.def}</dd>
                  </div>
                );
              })}
            </dl>
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
                  <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6" cite={t.cite}>
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
                { value: '2–24h', label: 'Up and running' },
                { value: '3 Copies', label: 'Auto-generated per GR' },
                { value: '20+ Fields', label: 'Supported & customisable' },
                { value: '₹0', label: 'Free to start right now' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900">
                  <p className="text-3xl font-bold text-[#0369A1] dark:text-sky-400 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BALANCED PERSPECTIVE ─────────────────── */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" aria-label="Balanced perspective">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Honest Take</p>
            <blockquote className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              &ldquo;TSM by Expendifii is ideal for transporters who want to digitise their GR workflow without learning complex software. On the other hand, if your fleet is already using an end-to-end ERP with transport modules, TSM may serve as a dedicated GR layer rather than a replacement. For the vast majority of Indian transporters still managing GRs on paper or Excel, TSM is the simplest path to going digital.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              — <time dateTime="2026-06-29">June 29, 2026</time>
            </p>
          </div>
        </section>

        {/* ── IMAGE WITH ALT TEXT ──────────────────── */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-label="Product screenshot">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden">
              <div className="p-4 sm:p-6">
                <Image
                  src="/landingImg01.webp"
                  alt="TSM by Expendifii dashboard showing GR management, active jobs, and fleet status overview for Indian transport businesses"
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  TSM by Expendifii — Transport Management System dashboard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────── */}
        <FAQSection faqs={faqs} />

        {/* ── CONCLUSION ───────────────────────────── */}
        <section id="conclusion" className="py-20 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="conclusion-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Why TSM by Expendifii</p>
            <h2 id="conclusion-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight mb-6">
              The Verdict: Go Digital, Stay Simple
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
              TSM by Expendifii is the transport management system built specifically for Indian transporters who are tired of paper GRs, lost records, and slow manual processes. It replaces 15-minute paperwork with a 2-minute digital workflow — 3 copies auto-generated, permanent digital records, customisable layouts, and a simple dashboard that gives you real visibility into your operations. <strong className="text-[#0F172A] dark:text-white">Best of all, it is free to start and takes just 2–24 hours to set up.</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13L9 17L19 7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <strong className="text-[#0369A1] dark:text-sky-400">Pricing:</strong> Free right now
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13L9 17L19 7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <strong className="text-[#0369A1] dark:text-sky-400">Setup:</strong> 2–24 hours
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13L9 17L19 7" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <strong className="text-[#0369A1] dark:text-sky-400">Support:</strong> Direct help from the team
              </span>
            </div>
          </div>
        </section>

        {/* ── CTA BAND ────────────────────────────── */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-800" aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to leave the paper behind?
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Join transporters across NCR who are creating GRs in minutes not hours.
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
                See a live demo no signup
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
