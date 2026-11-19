import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { DataTable, FaqList } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/pricing');

// Pricing facts come from the Terms (section 6: "currently free", at least
// 14 days' notice before paid plans, monthly or annual billing) and the
// existing site copy. Never publish a price or limit that isn't decided.

const included = [
  'GR / LR (bilty) creation with automatic GR numbers and freight',
  'Three-copy print (driver, consignor, consignee) with your logo, GSTIN and address',
  'Customer directory with default pricing and pincode lookup',
  'Booked, In Transit and Delivered status, and payment status on every GR',
  'Customer freight bills for any date range',
  'Excel / CSV import and one-click Excel backup',
  'Analytics dashboard',
  'BiltyOne Desktop for Windows, with a free 7-day trial',
  'Support in English and Hindi',
];

const later = [
  {
    title: 'At least 14 days’ notice',
    body: 'If paid plans are introduced, our terms promise you will be told at least 14 days before anything changes.',
  },
  {
    title: 'Monthly or annual billing',
    body: 'Paid plans, when they come, will be a monthly or annual subscription. No long contracts.',
  },
  {
    title: 'Your data is never locked in',
    body: 'Download every GR as one Excel workbook at any time, even without an active plan.',
  },
];

const webVsDesktop: [string, string, string][] = [
  ['Price', 'Free for early transporters', 'Free download and 7-day trial. Contact us for a full key'],
  ['Runs on', 'Any browser, on a phone or computer', 'One Windows 10 or 11 PC'],
  ['Internet', 'Needed while you work', 'Only once, to activate'],
  ['Your data', 'Stored online by BiltyOne', 'Stored on your computer, with a weekly backup copy sent to BiltyOne'],
  ['Dashboard and analytics', 'Included', 'Not included'],
  ['Best for', 'Most transporters, and anyone who works from more than one place', 'Offices with weak or unreliable internet'],
];

const alternatives: [string, string, string, string, string][] = [
  ['Cost to start', 'GR books and carbon paper, bought again and again', 'Free, or an Office licence', 'Licence and implementation fees; varies by vendor', '₹0 for early transporters'],
  ['Time to set up', 'None', 'Build and maintain your own sheet', 'Often weeks, with vendor help', '2 to 24 hours'],
  ['GR numbering', 'By hand', 'By hand or with formulas', 'Automatic', 'Automatic, never reused'],
  ['Freight calculation', 'Calculator', 'Formulas you maintain', 'Automatic', 'Automatic: per KM, box, kg, quintal or ton'],
  ['Three-copy GR print', 'Carbon copies', 'Your own print layout', 'Depends on the vendor', 'One PDF with your letterhead'],
  ['Customer freight bills', 'Retyped by hand', 'Copied and pasted', 'Usually, via an accounts module', 'One click per customer and date range'],
  ['Finding an old GR', 'Search through books', 'Search the file', 'Search', 'Search by GR number, party, vehicle or city'],
  ['Works without internet', 'Yes', 'Yes', 'Depends on the vendor', 'Yes, with the Windows desktop app'],
  ['Accounting, payroll, fleet maintenance', 'No', 'Manual', 'Yes', 'No; export to Excel for your accountant'],
];

// 40-60 word answers, distinct from questions marked up on other pages.
const faqs = [
  {
    q: 'Do I need a credit card to start BiltyOne?',
    a: 'No. Signing up needs only your email and company details, not a card or bank details. There is no setup fee or per-user charge today, and BiltyOne Desktop comes with a free 7-day trial. If you want to look around first, the live demo opens BiltyOne with sample data and needs no signup.',
  },
  {
    q: 'Will BiltyOne stay free?',
    a: 'BiltyOne is free for early transporters today. If paid plans are introduced, our terms promise at least 14 days’ notice, with monthly or annual billing. Your data stays yours either way: you can download every GR as an Excel workbook at any time, even without an active plan.',
  },
  {
    q: 'Is there a setup or training fee for BiltyOne?',
    a: 'No. There is no setup fee and no training fee. Most transporters set BiltyOne up themselves in 2 to 24 hours: add your logo and company details, save regular customers and import old GRs from Excel if you want them. If you would like help, the BiltyOne team will set it up with you.',
  },
];

const H2 = 'text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white';
const LEAD = 'mt-3 max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed';

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('/pricing', { aboutSoftware: true, faqs, speakable: ['#pricing-summary'] })} />
      <Navbar />
      <main id="main-content" className="pt-20 bg-white dark:bg-slate-950" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero + plan */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400">Pricing</p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white">
                BiltyOne pricing: free for <span className="text-[#0369A1] dark:text-sky-400">early transporters</span>
              </h1>
              <p id="pricing-summary" className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                BiltyOne is free for early transporters: every feature, the web app and the Windows desktop app, with no credit card,
                no setup fee and no per-user charge. If you are comparing transport software prices, the tables below show how
                BiltyOne compares with paper, Excel and transport ERP.
              </p>
            </div>

            <div className="mt-12 mx-auto max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-8 sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Early transporter plan</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Everything in BiltyOne, web and desktop</p>
                </div>
                <p className="text-5xl font-black tracking-tight text-[#0F172A] dark:text-white">
                  ₹0
                  <span className="ml-2 text-base font-medium text-slate-500 dark:text-slate-400">today</span>
                </p>
              </div>
              <ul className="mt-8 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                {included.map((item) => (
                  <li key={item} className="flex gap-3">
                    <svg className="mt-0.5 shrink-0 text-[#0369A1] dark:text-sky-400" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5L10 17.5L19 7" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register"
                  id="pricing-cta-primary"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-sky-600 transition-colors"
                >
                  Get started free
                </Link>
                <LiveDemoLink
                  id="pricing-cta-demo"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-700 transition-colors"
                >
                  Try the live demo
                </LiveDemoLink>
              </div>
            </div>
          </div>
        </section>

        {/* What happens later */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950" aria-labelledby="later-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="later-heading" className={H2}>If paid plans are introduced</h2>
            <p className={LEAD}>
              BiltyOne is free while we onboard our first transporters. Here is what our{' '}
              <Link href="/terms-and-conditions" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">terms</Link>{' '}
              promise if that changes.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {later.map((l) => (
                <div key={l.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{l.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparisons */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800" aria-labelledby="compare-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="web-vs-desktop" className={H2}>Web app or desktop app?</h2>
            <p className={LEAD}>Both are free. Most transporters use the web app; offices with weak internet add BiltyOne Desktop.</p>
            <DataTable caption="BiltyOne web app compared with BiltyOne Desktop" headers={['', 'Web app', 'Desktop app (Windows)']} rows={webVsDesktop} />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              More on the offline app: <Link href="/desktop" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">BiltyOne Desktop</Link>.
            </p>

            <h2 id="compare-heading" className={`${H2} mt-16`}>BiltyOne vs paper, Excel and transport ERP</h2>
            <p className={LEAD}>
              What each option costs you in money and in time, for the work a transport office does every day.
            </p>
            <DataTable
              caption="BiltyOne compared with a paper GR book, Excel and transport ERP software"
              headers={['', 'Paper GR book', 'Excel', 'Transport ERP', 'BiltyOne']}
              rows={alternatives}
              highlight={4}
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Deeper comparisons: <Link href="/digital-transport-management" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">paper vs Excel vs software</Link>{' '}
              and <Link href="/transport-erp-software" className="font-semibold text-sky-700 dark:text-sky-400 hover:underline">transport ERP vs TMS</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20 bg-white dark:bg-slate-950" aria-label="Pricing questions">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <FaqList faqs={faqs} title="Pricing: common questions" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
