import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import FAQSection from '@/components/landing/FAQSection';

export const metadata: Metadata = {
  title: 'Bilty Transport Management System',
  description:
    'Create, print, and manage lorry receipts in minutes. BiltyOne is the modern transport management system built for Indian transporters — no paper, no spreadsheets.',
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
    title: 'BiltyOne — Transport OS',
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
      'BiltyOne — Transport Management System for Indian Logistics',
    description:
      'Create, print, and manage lorry receipts in minutes. BiltyOne is the modern transport management system built for Indian transporters — no paper, no spreadsheets.',
    images: ['/og-image.png'],
  },
};

const faqs = [
  {
    q: 'How quickly can we get started?',
    a: 'Most transporters are up and running within 2 to 24 hours. We help you set up your account, add your customers, and print your first GR together.',
  },
  {
    q: "We've been doing this on paper for years. Is it hard to switch?",
    a: 'Not at all. BiltyOne was designed for transporters, not software people. If you can fill a paper GR, you can use BiltyOne. Most users are comfortable within a day.',
  },
  {
    q: 'Can we customise what appears on the printed GR?',
    a: 'Yes. You choose which fields appear on print. Every transport business is different BiltyOne works around your format, not a fixed template.',
  },
  {
    q: 'What happens to our data if something goes wrong?',
    a: 'Your data is stored securely on our servers not on paper, not on a single computer. It won\'t burn, won\'t get soaked, won\'t be eaten by rats. It\'s always there when you need it.',
  },
  {
    q: 'Is BiltyOne free?',
    a: 'Yes BiltyOne is completely free right now. We\'re onboarding our first transporters, gathering real feedback, and improving the product. After the free period, it will become a paid service but we\'ll always give you fair notice before anything changes.',
  },
  {
    q: 'Do you have a referral programme?',
    a: 'Yes. Refer a fellow transporter and if they purchase a plan, both of you get 15 extra days free. No catch.',
  },
  {
    q: 'What is a Transport Management System (TMS)?',
    a: 'A Transport Management System (TMS) is software that helps logistics companies plan, execute, and optimise the movement of goods. BiltyOne focuses specifically on GR creation, printing, and record-keeping for Indian transporters — no complex modules you don\'t need.',
  },
  {
    q: 'Is BiltyOne suitable for small fleets with just 1-2 trucks?',
    a: 'Absolutely. BiltyOne is designed for transporters of all sizes. Whether you own one truck or fifty, the GR creation, customer management, and analytics features work exactly the same. Small fleet owners actually benefit the most because BiltyOne eliminates the need to hire a dedicated person just for paperwork.',
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
    a: 'Not currently. BiltyOne is cloud-based, which means you can access it from anywhere with an internet connection.'
  },
];

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
      '@type': 'FAQPage',
      '@id': 'https://biltyone.com/#faq',
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
    description: 'Show more fields or fewer your choice. Every transporter works differently. BiltyOne adapts to you, not the other way around.',
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

const seoKeywords = [
  {
    category: "Primary Commercial Keywords",
    keywords: ["transport management system", "transport management software", "transport software", "transport software india", "transport ERP", "transport ERP software", "logistics software", "logistics management software", "logistics ERP", "fleet management software", "fleet management system", "freight management software", "trucking software", "trucking management software", "road transport software", "cargo management software", "shipment management software", "dispatch management software", "delivery management software"]
  },
  {
    category: "GR / LR Keywords",
    keywords: ["GR software", "GR management software", "GR creation software", "GR generator", "online GR software", "digital GR software", "transport GR software", "lorry receipt software", "LR software", "LR management software", "LR generation software", "online LR software", "LR tracking software", "digital LR software", "goods receipt software", "transport receipt software", "consignment note software", "e-GR software", "electronic GR software"]
  },
  {
    category: "Transport Company Keywords",
    keywords: ["software for transporters", "software for transport company", "software for transport business", "software for logistics company", "software for fleet owners", "software for truck operators", "transport business software", "transport office software", "transport booking software", "transport agency software", "truck owner software", "fleet owner software"]
  },
  {
    category: "Logistics Keywords",
    keywords: ["logistics software", "logistics management software", "logistics automation", "digital logistics platform", "logistics ERP software", "logistics solution", "logistics solutions india", "logistics tracking software", "logistics business software", "warehouse logistics software", "road logistics software", "freight logistics software", "supply chain software", "supply chain management software"]
  },
  {
    category: "Fleet Management",
    keywords: ["fleet software", "fleet management system", "fleet management software", "vehicle management software", "truck management software", "fleet tracking software", "vehicle tracking software", "fleet operations software", "truck fleet software", "fleet maintenance software", "fleet scheduling software", "driver management software"]
  },
  {
    category: "Dispatch & Booking",
    keywords: ["dispatch software", "dispatch management software", "truck dispatch software", "transport dispatch software", "load dispatch software", "booking management software", "transport booking software", "trip booking software", "load booking software", "vehicle dispatch software"]
  },
  {
    category: "Trip Management",
    keywords: ["trip management software", "trip sheet software", "trip tracking software", "trip planning software", "trip expense software", "trip settlement software", "trip management system"]
  },
  {
    category: "Billing & Accounting",
    keywords: ["transport billing software", "freight billing software", "invoice software for transporters", "transport invoice software", "GST billing software transport", "transport accounting software", "truck accounting software"]
  },
  {
    category: "Freight",
    keywords: ["freight software", "freight management software", "freight booking software", "freight tracking software", "freight ERP", "road freight software", "freight forwarding software"]
  },
  {
    category: "Truck",
    keywords: ["truck management software", "truck booking software", "truck dispatch software", "truck tracking software", "truck fleet management", "truck operator software", "truck logistics software", "truck ERP"]
  },
  {
    category: "Delivery",
    keywords: ["delivery management software", "delivery tracking software", "delivery planning software", "proof of delivery software", "POD software", "last mile delivery software"]
  },
  {
    category: "Driver Management",
    keywords: ["driver management software", "driver attendance software", "driver expense software", "driver payroll software", "driver tracking software"]
  },
  {
    category: "Expense Management",
    keywords: ["transport expense software", "fuel management software", "diesel management software", "toll management software", "FASTag management software", "vehicle expense software"]
  },
  {
    category: "Vehicle Management",
    keywords: ["vehicle management software", "vehicle maintenance software", "vehicle tracking software", "RC management software", "insurance tracking software", "permit management software"]
  },
  {
    category: "Tracking",
    keywords: ["shipment tracking software", "truck tracking software", "consignment tracking software", "load tracking software", "GPS fleet software"]
  },
  {
    category: "Automation",
    keywords: ["transport automation software", "logistics automation software", "digital transport management", "paperless transport software", "transport workflow automation", "transport digitization"]
  },
  {
    category: "Business",
    keywords: ["transport business automation", "transport office management", "transport company software", "transport operations software", "transport workflow software", "transport CRM"]
  },
  {
    category: "Indian Search Keywords",
    keywords: ["GR banane ka software", "LR software India", "lorry receipt software india", "transport software india", "transport management software india", "best transport software india", "best logistics software india", "truck management software india", "transport ERP india"]
  },
  {
    category: "Feature-Based Keywords",
    keywords: ["cloud transport software", "online transport software", "mobile transport software", "transport software with GST", "transport software with invoice", "transport software with GPS", "transport software with WhatsApp", "transport software with SMS", "transport software with reports", "transport software with analytics"]
  },
  {
    category: "Problem-Based Keywords",
    keywords: ["replace excel for transport business", "paperless GR software", "digital lorry receipt", "transport office automation", "manage transport business online", "transport management app", "transport business digitization"]
  },
  {
    category: "Comparison Keywords",
    keywords: ["best transport management software", "best logistics software", "best fleet management software", "best transport ERP", "top transport software india", "transport ERP vs excel", "transport software comparison"]
  },
  {
    category: "Local SEO Keywords",
    keywords: ["transport software Delhi", "transport software Mumbai", "transport software Bangalore", "transport software Chennai", "transport software Hyderabad", "transport software Pune", "transport software Ahmedabad", "transport software Kolkata"]
  },
  {
    category: "High-Intent Long-Tail Keywords",
    keywords: ["best transport management software for transporters", "best GR software for transport company", "software to generate lorry receipt", "digital GR software for transport business", "cloud transport management software", "GST transport billing software", "trip management software for transporters", "fleet management software for truck owners", "transport office management software", "transport ERP for logistics company", "online transport booking software", "paperless transport management software", "transport software with trip tracking", "transport software with driver management", "transport software with billing", "transport software with GR creation"]
  },
  {
    category: "Dedicated SEO Landing Pages",
    keywords: ["Transport Management Software", "GR Software", "Lorry Receipt Software", "LR Software", "Logistics Management Software", "Fleet Management Software", "Transport ERP", "Freight Management Software", "Trip Management Software", "Transport Billing Software", "Driver Management Software", "Vehicle Management Software", "Dispatch Management Software", "Transport CRM", "Truck Management Software", "Logistics Software India", "Transport Software India", "Digital Transport Management", "Transport Business Automation", "Paperless Transport Office"]
  }
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
                href="/why-tsm"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-400 transition-all duration-200 cursor-pointer"
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
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-sky-700 dark:text-sky-400">Platform:</strong> BiltyOne &middot;{' '}
              <strong className="text-sky-700 dark:text-sky-400">Type:</strong> Transport Management System &middot;{' '}
              <strong className="text-sky-700 dark:text-sky-400">Users:</strong> Transporters across India &middot;{' '}
              <strong className="text-sky-700 dark:text-sky-400">Setup:</strong> 2–24 hours
            </p>

            {/* Live Demo nudge */}
            <div className="mt-5 flex flex-col items-center gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">Not ready to sign up?</p>
              <Link
                href="/live-demo"
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-700/30 dark:border-sky-500/30 bg-sky-700/5 dark:bg-sky-500/10 px-4 py-1.5 text-sm font-semibold text-sky-700 dark:text-sky-400 hover:bg-sky-700/10 dark:hover:bg-sky-500/20 transition-colors cursor-pointer"
              >
                Try the live demo no account needed →
              </Link>
            </div>

            {/* Product preview */}
            <div className="relative mt-14 sm:mt-20">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/25 dark:bg-sky-500/15 blur-[110px]"
              />
              <div className="hero-float mx-auto max-w-5xl">
                <Image
                  src="/dashboard_img_herosection_straight.webp"
                  alt="BiltyOne dashboard showing revenue overview, active shipments, and recent GRs"
                  width={1536}
                  height={1024}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900 transition-all duration-200"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F172A] dark:bg-[#0369A1]/20 text-white dark:text-sky-400 group-hover:bg-[#0369A1] dark:group-hover:bg-[#0369A1]/40 transition-colors duration-200">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/features" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-sky-400 hover:underline">
                Explore all capabilities and layouts &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW BiltyOne WORKS IN 4 STEPS ────────────── */}
        <section id="how-tsm-works-steps" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" aria-labelledby="steps-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Simple Process</p>
              <h2 id="steps-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                How BiltyOne Works in <span className="text-sky-700 dark:text-sky-400">4 Simple Steps</span>
              </h2>
              <p id="how-it-works-summary" className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                From paper chaos to digital control. Here is exactly how BiltyOne transforms your GR workflow.
              </p>
            </div>
            <ol className="space-y-4">
              {[
                { step: '1', title: 'Create Your Account', desc: 'Sign up in under 60 seconds. No credit card required. Add your company name, GST, and basic details — we guide you through it.' },
                { step: '2', title: 'Add Your Customers', desc: 'Enter your regular consigners and consignees once. BiltyOne remembers them so you never retype the same information. Manage your customer list from a clean dashboard.' },
                { step: '3', title: 'Create a GR in Minutes', desc: 'Select the customer, fill in shipment details (origin, destination, vehicle number, charges), and hit submit. BiltyOne generates all three copies — Driver, Consigner, Consignee — instantly.' },
                { step: '4', title: 'Print, Track & Analyse', desc: 'Print your GRs immediately or access them anytime from the dashboard. Search by name, date, or GR number. Get analytics on your trip volumes, active jobs, and billing status.' },
              ].map(function (s) {
                return (
                  <li key={s.step} className="flex items-start gap-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0369A1] text-white text-lg font-bold">{s.step}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong className="text-sky-700 dark:text-sky-400">Setup time:</strong> 2–24 hours &middot;{' '}
                <strong className="text-sky-700 dark:text-sky-400">Pricing:</strong> Free right now &middot;{' '}
                <strong className="text-sky-700 dark:text-sky-400">No training needed:</strong> Most users get it in a day
              </p>
            </div>
          </div>
        </section>

        {/* ── PRODUCT TEASER ──────────────────────── */}
        <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Explore BiltyOne Dashboard Cockpit
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              Track active transit orders, fleet status yards, and invoicing records inside a beautifully designed user interface.
            </p>
            <Link href="/product" className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] dark:bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-sky-600 dark:hover:bg-sky-500 transition-all duration-200 cursor-pointer">
              View Product Dashboard &rarr;
            </Link>
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
                href="/why-tsm"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-[#0369A1] transition-all"
              >
                Why Transporters Pick BiltyOne &rarr;
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

        {/* ── FAQ ─────────────────────────────────── */}
        <FAQSection faqs={faqs} />

        {/* ── FINAL CTA ───────────────────────────── */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-16 sm:py-20 border-t border-slate-800" aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="final-cta-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Digitise Your Transport Business Today
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                id="bottom-cta-primary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors cursor-pointer"
              >
                Sign Up Free
              </Link>
              <Link
                href="/live-demo"
                id="bottom-cta-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-white transition-colors cursor-pointer"
              >
                Try Free Demo
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-6">
              BiltyOne a NCR Transport Management System
            </p>
          </div>
        </section>

        {/* ── SEO LOGISTICS & TRANSPORT DIRECTORY ─── */}
        <section className="bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200/50 dark:border-slate-800/50 py-4 sm:py-6" aria-labelledby="directory-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none marker:hidden text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors select-none">
                <h2 id="directory-heading" className="flex items-center gap-2 text-xs font-bold normal-case tracking-wide">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-sky-700 dark:text-sky-400" aria-hidden="true">
                    <path d="M19 11H5M19 11L12 4M19 11L12 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Logistics & Transport Solutions Directory
                </h2>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium normal-case group-open:hidden">
                  Expand Index
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="hidden group-open:flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium normal-case">
                  Collapse Index
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200/40 dark:border-slate-800/40">
                {seoKeywords.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keywords.map((kw) => {
                        let href = "";
                        const kwLower = kw.toLowerCase();
                        if (kwLower.includes("lorry receipt") || kwLower.includes("lr")) {
                          href = "/lorry-receipt-software";
                        } else if (kwLower.includes("gr")) {
                          href = "/gr-management";
                        } else if (kwLower.includes("tms") || kwLower.includes("transport management system") || kwLower.includes("transport management software")) {
                          href = "/transport-management-system";
                        } else if (kwLower.includes("automation")) {
                          href = "/transport-business-automation";
                        } else if (kwLower.includes("digital")) {
                          href = "/digital-transport-management";
                        } else if (kwLower.includes("glossary")) {
                          href = "/logistics-glossary";
                        } else if (kwLower.includes("feature")) {
                          href = "/features";
                        } else if (kwLower.includes("product") || kwLower.includes("dashboard")) {
                          href = "/product";
                        }

                        if (href) {
                          return (
                            <Link
                              key={kw}
                              href={href}
                              className="inline-block bg-sky-50/50 hover:bg-sky-50 dark:bg-slate-900/60 dark:hover:bg-slate-900 text-xs text-sky-700 dark:text-sky-400 px-2 py-0.5 rounded border border-sky-100/50 dark:border-slate-800/50 transition-colors"
                            >
                              {kw}
                            </Link>
                          );
                        }

                        return (
                          <span
                            key={kw}
                            className="inline-block bg-slate-100 dark:bg-slate-900/45 text-xs text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200/20 dark:border-slate-800/20"
                          >
                            {kw}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
