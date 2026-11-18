import type { Metadata } from 'next';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqList } from '@/components/content/ContentPage';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { ScrollImage } from '@/components/shared/ScrollImage';
import { Card } from '@/components/landing/Card';
import { ProcessSteps } from '@/components/landing/ProcessSteps';
import { AnimatedBeamHero } from '@/components/landing/AnimatedBeamBackground';
import { SHOW_HERO_BEAM } from '@/lib/feature-flags';
import { cn } from '@/lib/utils/cn';

export const metadata: Metadata = buildPageMetadata('/', {
  ogTitle: 'BiltyOne: Transport Management Software',
  ogDescription: 'Create GR/LR (bilty) in under 2 minutes, print 3 copies, bill customers. Online or offline. Free to start.',
});

// Distinct from the /faq questions on purpose: Google asks for each FAQ to
// be marked up on one page only. These target the head search terms.
// "Best transport management software in India" lives on
// /transport-management-software-india, which owns the India keyword.
const homeFaqs = [
  {
    q: 'What is transport management software?',
    a: 'Transport management software helps a transport business record, track and bill the movement of goods. For Indian road transporters that means creating GR/LR (bilty), printing copies for the driver, consignor and consignee, keeping customer records, tracking delivery and payment status, and sending freight bills. BiltyOne does all of this.',
  },
  {
    q: 'Is there a transport management system for small businesses?',
    a: 'Yes. BiltyOne is built for small and mid-size transporters with roughly 1 to 50 trucks. It needs no training or setup fee, one person can run it, and it is free for early transporters. Larger transport ERP suites usually suit companies with big fleets, workshops and in-house accounting teams.',
  },
  {
    q: 'Can I use transport management software online?',
    a: 'Yes. BiltyOne is online transport management software: it runs in any browser on a phone or computer, with nothing to install, and your records are stored securely online. For offices with unreliable internet, BiltyOne Desktop is a free Windows app that works offline after a one-time activation.',
  },
  {
    q: 'How is a TMS different from transport ERP software?',
    a: 'A TMS (transport management system) handles day-to-day transport operations: bookings, GR/LR, delivery status and freight billing. A transport ERP adds accounting, payroll, fleet maintenance, fuel and inventory. Most small and mid-size transporters need the TMS part first; BiltyOne covers it and exports to Excel for your accountant.',
  },
  {
    q: 'How much does transport software cost?',
    a: 'Prices range from free tools to transport ERP suites with yearly licences, implementation fees and per-user charges. BiltyOne is currently free for early transporters, with no credit card needed. If paid plans are introduced, existing users get advance notice, and you can export all your data at any time.',
  },
];

export const jsonLd = pageJsonLd('/', {
  aboutSoftware: true,
  faqs: homeFaqs,
  speakable: ['#hero-summary', '#what-is-biltyone-answer', '#how-it-works-summary'],
});

const features = [
  {
    id: '01',
    title: 'GR Creation in Under 2 Minutes',
    description: 'Create a complete lorry receipt (bilty) with all required fields. GR numbers and freight are calculated for you. No paper, no pen, no arithmetic.',
  },
  {
    id: '02',
    title: 'Print-Ready GR (3 Copies)',
    description: 'Generate all three copies (Driver, Consignor, Consignee) in one click. Print instantly. Always legible, always complete.',
  },
  {
    id: '03',
    title: 'Your Branding on Every Copy',
    description: 'Your company name, logo, GSTIN, PAN and address print on every GR automatically. Insurance, vehicle and driver sections appear only when you fill them in.',
  },
  {
    id: '04',
    title: 'Customer Freight Statements',
    description: 'Pick a customer and a date range to get a PDF freight bill with totals, amount paid and balance due, followed by every GR in that period.',
  },
  {
    id: '05',
    title: 'Add & Manage Customers',
    description: 'Maintain a clean customer list. Auto-fill consigner and consignee details when creating new GRs no retyping the same information every time.',
  },
  {
    id: '06',
    title: 'Analytics Dashboard',
    description: 'See revenue, GRs booked, shipments in transit and outstanding payments in a simple dashboard designed for transport owners, not accountants.',
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
  { label: 'Creating a GR', manual: 'Fill 20+ fields by hand, write 3 copies', tsm: 'Under 2 minutes, 3 copies printed together' },
  { label: 'GR numbers & freight', manual: 'Counted and calculated by hand', tsm: 'Automatic GR numbers and freight' },
  { label: 'Storing records', manual: 'Paper lost to rats, rain or fire', tsm: 'Stored online, with a full Excel backup' },
  { label: 'Finding old GRs', manual: 'Search through stacks of paper', tsm: 'Search by GR number, party, vehicle or city' },
  { label: 'Billing customers', manual: 'Typed up separately at month end', tsm: 'Statement PDF for any date range' },
  { label: 'Staff needed', manual: 'Someone just to manage paperwork', tsm: 'One person can run it all' },
];

const audiences = [
  {
    title: 'Transport companies',
    body: 'Bookings, GRs, customer accounts, freight bills and delivery status for a busy transport office.',
    href: '/transport-company-software',
    cta: 'Transport company software',
  },
  {
    title: 'Small transport businesses',
    body: 'For owners with 1 to 20 trucks who want to stop writing GR books without hiring an office team.',
    href: '/transport-software-small-business',
    cta: 'TMS for small business',
  },
  {
    title: 'Teams working on the move',
    body: 'Online transport software that runs in any browser, on a phone at the yard or a PC in the office.',
    href: '/online-transport-management-software',
    cta: 'Online transport software',
  },
  {
    title: 'Offices with weak internet',
    body: 'BiltyOne Desktop for Windows creates, prints and searches GRs with no internet after activation.',
    href: '/desktop',
    cta: 'Desktop app',
  },
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
      <JsonLd data={jsonLd} />
      <Navbar />

      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── HERO ────────────────────────────────── */}
        <section
          id="hero"
          className={cn(
            'relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800',
            // Pulled up over <main>'s pt-20 so the beam covers the strip behind
            // the floating navbar too, instead of leaving main's own grid
            // pattern visible there (a mismatched seam right under the navbar).
            // The grid fallback doesn't need this: main's own grid already
            // matches it seamlessly.
            SHOW_HERO_BEAM && '-mt-20',
          )}
          aria-label="Hero section"
        >
          {/* Background: animated beam by default, static grid when SHOW_HERO_BEAM is flipped off */}
          {SHOW_HERO_BEAM ? (
            <AnimatedBeamHero />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-60"
            />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 via-[#F8FAFC]/40 dark:via-slate-950/40 to-[#F8FAFC] dark:to-slate-950" />

          <div
            className={cn(
              'relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 lg:pb-36',
              // Compensates for the section's -mt-20 above so the headline lands
              // at the exact same spot it always has: pt-40/48/56 = the old
              // py-20/28/36 plus the 80px main used to contribute via pt-20.
              SHOW_HERO_BEAM ? 'pt-40 sm:pt-48 lg:pt-56' : 'pt-20 sm:pt-28 lg:pt-36',
            )}
          >


            {/* Headline */}
            <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]">
              {/* The search keyword leads the H1 as a kicker line; the tagline keeps its look. */}
              <span className="mb-5 block text-sm sm:text-base font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400">
                Transport Management Software
              </span>{' '}
              Stop managing transport{' '}
              <span className="relative">
                <span className="text-sky-700 dark:text-sky-400">manually.</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 5C50 1 150 1 200 5" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p id="hero-summary" className="mt-6 text-center text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              BiltyOne replaces paper GR books and slow Excel sheets for Indian transporters. Create a GR/LR (bilty) in under 2 minutes, print all 3 copies, auto-fill customer details and bill customers, online or offline.
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
                href="/why-biltyone"
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

            {/* Product preview. Not preloaded: it isn't the LCP element (the
                hero text is) and sits below the fold on phones, so a
                high-priority preload only competed with the fonts, CSS and
                JS needed for first paint. */}
            <ScrollImage
              src="/dashboard_img_herosection_straight.avif"
              alt="BiltyOne dashboard showing revenue overview, active shipments, and recent GRs"
              containerClassName="mt-4 sm:mt-8"
            />
          </div>
        </section>

        {/* ── WHAT IS BILTYONE (definition for snippets / AI answers) ── */}
        <section id="what-is-biltyone" className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="what-is-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 id="what-is-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              What is BiltyOne transport management software?
            </h2>
            <p id="what-is-biltyone-answer" className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              BiltyOne is transport management software built for Indian road transporters. It creates and prints GR/LR
              (bilty) in three copies, keeps your customer list, calculates freight, tracks each load from booking to
              delivery, and produces customer freight statements. It runs online in any browser, works offline on
              Windows, and is free for early transporters.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Built for how Indian road transport works, with GSTIN, e-way bill numbers and To Pay bilty on every GR. See{' '}
              <Link href="/transport-management-software-india" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                transport management software for India
              </Link>
              .
            </p>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-slate-700 dark:text-slate-300">
              {[
                'GR / LR (bilty) in under 2 minutes',
                'Automatic GR numbers and freight',
                'Driver, consignor and consignee copies',
                'Customer statements for any date range',
                'Excel import and full Excel backup',
                'Web app plus offline Windows app',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-slate-600 dark:text-slate-400 leading-relaxed">
              New to the term? Read our guide to{' '}
              <Link href="/transport-management-system" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                transport management systems (TMS)
              </Link>{' '}
              or see{' '}
              <Link href="/guides/what-is-bilty" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                what a bilty is
              </Link>
              .
            </p>
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
                Here&apos;s what actually changes when a transport office moves from a paper GR book or Excel register to BiltyOne.
              </p>
            </div>

            {/* A real <table> (not a div grid) so search engines can lift it as a table snippet. */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-md overflow-hidden">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <caption className="sr-only">Paper GR book compared with BiltyOne transport management software</caption>
                <thead>
                  <tr className="bg-[#0F172A] dark:bg-slate-800 text-white font-semibold">
                    <th scope="col" className="px-4 sm:px-6 py-4 text-slate-300 font-semibold">Task</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 text-center border-l border-slate-700 text-slate-300 font-semibold">Paper / Excel</th>
                    {/* SVG check, not a "✓" character: Plus Jakarta Sans has no
                        U+2713 glyph, so the browser ran a system font-fallback
                        search during the page's first layout, which roughly
                        tripled its cost. */}
                    <th scope="col" className="px-4 sm:px-6 py-4 text-center border-l border-[#0369A1] bg-[#0369A1]/20 text-white font-semibold">
                      With BiltyOne{' '}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block align-[-2px]" aria-hidden="true">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-slate-100 dark:border-slate-800 last:border-0 align-top ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-900/50'}`}
                    >
                      <th scope="row" className="px-4 sm:px-6 py-4 font-medium text-slate-900 dark:text-slate-200">{row.label}</th>
                      <td className="px-4 sm:px-6 py-4 text-slate-500 dark:text-slate-400 border-l border-slate-100 dark:border-slate-800">
                        <span className="flex items-start gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-red-400" aria-hidden="true">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          {row.manual}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-medium text-sky-700 dark:text-sky-400 border-l border-[#0369A1]/20 bg-[#0369A1]/5 dark:bg-sky-500/5">
                        <span className="flex items-start gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {row.tsm}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/why-biltyone"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-[#0369A1] transition-all"
              >
                Why Transporters Pick BiltyOne
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR (links to the solution pages) ── */}
        <section id="who-its-for" className="py-20 sm:py-28 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="who-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Who it&apos;s for</p>
              <h2 id="who-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Transport software for every kind of transporter
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                From a single-truck owner to a busy booking office, BiltyOne fits how Indian transport businesses already work.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiences.map((a) => (
                <li key={a.href} className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{a.body}</p>
                  <Link href={a.href} className="mt-4 text-sm font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                    {a.cta} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
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
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DESKTOP APP TEASER ──────────────────── */}
        {/* Plain link to /desktop: no client JS added to the homepage. */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="desktop-teaser-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-950/30 px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="desktop-teaser-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Online, or offline on Windows
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Use BiltyOne online in any browser, or install BiltyOne Desktop on your Windows PC: it needs internet only once, to activate. Free download, free licence key.{' '}
                  <Link href="/online-transport-management-software" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                    Compare online and desktop
                  </Link>
                  .
                </p>
              </div>
              <Link
                href="/desktop"
                className="inline-flex shrink-0 items-center gap-2 self-start md:self-auto rounded-xl border border-[#0369A1] dark:border-sky-400 px-6 py-3.5 text-sm font-semibold text-[#0369A1] dark:text-sky-400 hover:bg-[#0369A1] hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 transition-colors"
              >
                See the desktop app
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PRICING PREVIEW ─────────────────────── */}
        <section className="py-20 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400 mb-3">Simple Pricing</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">100% Free For Early Transporters</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-6 text-sm sm:text-base">
              Early transporters get full access to GR creation, customer directories and dashboards for ₹0. No credit card, no hidden contracts, and you can export all your data at any time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-sky-600 transition-colors">
                Claim Free Access Now
              </Link>
              <Link href="/pricing" className="text-sm font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                See pricing and comparisons
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ (keyword questions; FAQPage JSON-LD comes from homeFaqs) ── */}
        <section className="py-20 sm:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <FaqList faqs={homeFaqs} title="Transport management software: common questions" />
            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              More questions about pricing, data and setup?{' '}
              <Link href="/faq" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">
                Read the full FAQ
              </Link>
              .
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
