import type { Metadata } from 'next';
import { IDS, buildPageMetadata, pageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  DatabaseBackup,
  Download,
  FileText,
  FolderArchive,
  KeyRound,
  MapPin,
  Monitor,
  Power,
  ShieldCheck,
  UserCheck,
  Users,
  Wifi,
  WifiOff,
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { DesktopDownloadButton } from '@/components/desktop/DesktopDownloadButton';

const PAGE_URL = absoluteUrl('/desktop');
const DESCRIPTION =
  'Download BiltyOne Desktop for Windows. Create, print and search GRs without internet. Free download and free licence key for Indian transporters.';

export const metadata: Metadata = buildPageMetadata('/desktop');

// Every claim below matches what BiltyOne Desktop (tsm_desktop) actually does.
// Keep them in sync when the app changes.

const steps = [
  {
    icon: Download,
    title: 'Download',
    body: 'Enter your email and we send you the download link straight away.',
  },
  {
    icon: FolderArchive,
    title: 'Install',
    body: 'Extract the .zip and run the setup file. If Windows says "Windows protected your PC", choose More info, then Run anyway.',
  },
  {
    icon: KeyRound,
    title: 'Get your free key',
    body: 'Use the link in the email to ask for a licence key. It is free, and we usually reply within one business day.',
  },
  {
    icon: Power,
    title: 'Activate',
    body: 'Open BiltyOne, enter your key and start creating GRs. This is the only step that needs internet.',
  },
];

const comparison = [
  { label: 'Runs on', web: 'Any browser, on a phone or computer', desktop: 'One Windows 10 or 11 PC' },
  { label: 'Internet', web: 'Needed while you work', desktop: 'Only once, to activate' },
  {
    label: 'Your data',
    web: 'Stored online by BiltyOne',
    desktop: 'Stored on your computer, with a weekly backup copy sent to BiltyOne',
  },
  { label: 'Sign in', web: 'From anywhere, with your account', desktop: 'No account. The app is tied to that one computer' },
  { label: 'Dashboard and analytics', web: 'Included', desktop: 'Not included' },
  { label: 'Price', web: 'Free for early transporters', desktop: 'Free download and free licence key' },
];

const requirements = [
  { icon: Monitor, text: 'Windows 10 or Windows 11, 64-bit' },
  { icon: Wifi, text: 'Internet once, to activate your key' },
  { icon: UserCheck, text: 'No administrator rights. It installs for your Windows user' },
  { icon: KeyRound, text: 'A free licence key, sent to you by email' },
];

const faqs = [
  {
    q: 'Is BiltyOne Desktop free?',
    a: 'Yes. The download is free and the licence key is free. Ask for your key with the link in the download email, or from the licence key page.',
  },
  {
    q: 'Do I need internet to use it?',
    a: 'Only once, to activate your licence key. After that you can create, print and search GRs with no connection. When the computer is online, the app also sends a backup copy to BiltyOne once a week.',
  },
  {
    q: 'Where is my data stored?',
    a: 'In a database on your own computer. You can save a full backup file at any time, keep automatic backups in a folder you choose, and export to Excel. If the computer breaks, contact us and we will help you restore from the latest weekly copy.',
  },
  {
    q: 'Can I use one licence key on two computers?',
    a: 'No. A key works on one computer at a time. If you move to a new computer, contact us and we will move your key to it.',
  },
  {
    q: 'Windows says the app might be unsafe. Is that normal?',
    a: 'Yes. Windows shows "Windows protected your PC" for new apps that are not widely downloaded yet. Click More info, then Run anyway to continue the install.',
  },
  {
    q: 'Can I bring in GRs I already have?',
    a: 'Yes. In Settings you can import GRs from an Excel or CSV file, using the import template in the app or a file exported from BiltyOne.',
  },
  {
    q: 'Does it work on Mac?',
    a: 'Not yet. BiltyOne Desktop is for Windows 10 and 11 (64-bit) for now. On a Mac, use BiltyOne in your browser.',
  },
  {
    q: 'I did not get the download email.',
    a: 'It usually arrives within a minute. Check your Spam or Promotions folder. You can ask for the link again after two minutes.',
  },
];

// Shared graph (WebPage, BreadcrumbList, Organization, founder) plus the
// desktop app itself and its FAQ.
const jsonLd = pageJsonLd('/desktop', {
  faqs,
  extra: [
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE_URL}#app`,
      name: 'BiltyOne Desktop',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Transport management software',
      operatingSystem: 'Windows 10, Windows 11 (64-bit)',
      description: DESCRIPTION,
      url: PAGE_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
      publisher: { '@id': IDS.organization },
      isRelatedTo: { '@id': IDS.software },
    },
  ],
});

const sectionHeading = 'text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white';
const sectionLead = 'mt-4 max-w-[65ch] text-base leading-relaxed text-slate-600 dark:text-slate-400';

export default function DesktopPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />

      <main id="main-content" className="bg-white pt-20 dark:bg-slate-950">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="desktop-hero-heading"
          className="relative overflow-hidden border-b border-slate-200 bg-[#F8FAFC] dark:border-slate-800 dark:bg-slate-950"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(226,232,240,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.6)_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent)] dark:bg-[linear-gradient(to_right,rgba(30,41,59,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.6)_1px,transparent_1px)]"
          />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pt-24 lg:pb-24">
            <div>
              <p className="text-sm font-semibold tracking-widest text-[#0369A1] uppercase dark:text-sky-400">
                BiltyOne Desktop
              </p>
              <h1
                id="desktop-hero-heading"
                // Sized per breakpoint so the headline stays on two lines next to the image.
                className="mt-4 text-4xl leading-[1.1] font-bold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[2.5rem] xl:text-5xl dark:text-white"
              >
                GR software that works without internet.
              </h1>
              <p className="mt-6 max-w-136 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Create, print and search lorry receipts on your Windows PC. Internet is needed only once, to activate.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <DesktopDownloadButton id="desktop-hero-download" />
                <a
                  href="#compare"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-slate-700 transition-colors duration-200 hover:border-[#0369A1] hover:text-[#0369A1] active:translate-y-px dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400"
                >
                  Compare with web app
                </a>
              </div>
            </div>

            {/* TODO: replace with a real BiltyOne Desktop screenshot (same 16:9 ratio). */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-sky-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40">
                <Image
                  src="/dashboard_img_herosection_straight.avif"
                  alt="BiltyOne showing recent GRs, active shipments and a revenue overview"
                  width={1672}
                  height={941}
                  preload
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WORKS OFFLINE (bento) ──────────────────────────────── */}
        <section id="features" aria-labelledby="desktop-features-heading" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="desktop-features-heading" className={sectionHeading}>
              Everything for daily GR work, on your PC
            </h2>
            <p className={sectionLead}>
              The GR, customer and printing tools from the web app, running on one Windows computer.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <article className="rounded-2xl border border-sky-100 bg-linear-to-br from-sky-50 via-white to-white p-7 md:col-span-2 sm:p-8 dark:border-sky-900/40 dark:from-sky-950/50 dark:via-slate-900 dark:to-slate-900">
                <FileText size={24} strokeWidth={1.75} className="text-[#0369A1] dark:text-sky-400" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">Create, print and find GRs</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-slate-600 dark:text-slate-400">
                  Fill a GR once and print the driver, consigner and consignee copies. Find any old GR by number,
                  customer or date.
                </p>
              </article>

              <article className="flex flex-col rounded-2xl bg-[#0F172A] p-7 text-white md:col-span-2 sm:p-8 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 dark:bg-slate-800">
                <WifiOff size={24} strokeWidth={1.75} className="text-sky-400" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold">No internet? Work carries on.</h3>
                <p className="mt-2 leading-relaxed text-slate-300">
                  After the one-time activation the app runs fully offline, so a slow or dead connection at the office
                  doesn&apos;t stop your GR work.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200 lg:mt-auto lg:pt-8">
                  {['Create and edit GRs', 'Print and save PDFs', 'Search, import and export'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Check size={16} strokeWidth={2.25} className="shrink-0 text-sky-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                <Users size={24} strokeWidth={1.75} className="text-[#0369A1] dark:text-sky-400" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">Customers fill in for you</h3>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
                  Save consigners and consignees once, then pick them on a new GR instead of typing it all again.
                </p>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] p-7 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(rgba(3,105,161,0.14)_1px,transparent_1px)] bg-size-[16px_16px] dark:bg-[radial-gradient(rgba(56,189,248,0.12)_1px,transparent_1px)]"
                />
                <div className="relative">
                  <MapPin size={24} strokeWidth={1.75} className="text-[#0369A1] dark:text-sky-400" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">Pincode to city, offline</h3>
                  <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
                    City and state fill in from the pincode, using India Post data built into the app.
                  </p>
                </div>
              </article>

              <article className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-7 md:col-span-2 sm:p-8 lg:col-span-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center dark:border-slate-800 dark:bg-slate-900">
                <div>
                  <DatabaseBackup size={24} strokeWidth={1.75} className="text-[#0369A1] dark:text-sky-400" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">Your records are backed up</h3>
                  <p className="mt-2 max-w-[52ch] leading-relaxed text-slate-600 dark:text-slate-400">
                    A broken computer doesn&apos;t have to mean lost GRs. Keep copies on your side, and we keep one too.
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {[
                    { title: 'Backup file', body: 'Save everything to one file, whenever you like.' },
                    { title: 'Automatic backups', body: 'Copies saved to a folder you choose.' },
                    { title: 'Weekly cloud copy', body: 'Sent to BiltyOne once a week when online.' },
                  ].map((b) => (
                    <li
                      key={b.title}
                      className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 dark:border-slate-700 dark:bg-slate-800/60"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{b.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{b.body}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ── GET STARTED ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="desktop-steps-heading"
          className="border-y border-slate-200 bg-[#F8FAFC] py-20 sm:py-28 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="desktop-steps-heading" className={sectionHeading}>
              Up and running in four steps
            </h2>
            <p className={sectionLead}>Here is the whole process, from download to your first GR.</p>

            <ol className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <span
                aria-hidden="true"
                className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-slate-300 lg:block dark:bg-slate-700"
              />
              {steps.map((s) => (
                <li key={s.title} className="relative">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0369A1] shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-sky-400">
                    <s.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── WEB OR DESKTOP ──────────────────────────────────────────── */}
        <section id="compare" aria-labelledby="desktop-compare-heading" className="scroll-mt-28 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="desktop-compare-heading" className={sectionHeading}>
              Web app or desktop app?
            </h2>
            <p className={sectionLead}>Both are BiltyOne. Pick the one that fits how your office works.</p>

            <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <caption className="sr-only">BiltyOne web app compared with BiltyOne Desktop</caption>
                <colgroup>
                  <col className="w-[30%] sm:w-[28%]" />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-slate-900">
                    <th scope="col" className="px-4 py-4 font-semibold text-slate-500 sm:px-6 dark:text-slate-400">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="px-4 py-4 font-semibold text-slate-900 sm:px-6 dark:text-white">
                      Web app
                    </th>
                    <th
                      scope="col"
                      className="bg-sky-50 px-4 py-4 font-semibold text-[#0369A1] sm:px-6 dark:bg-sky-950/40 dark:text-sky-400"
                    >
                      Desktop app
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {comparison.map((row) => (
                    <tr key={row.label} className="align-top">
                      <th scope="row" className="px-4 py-4 font-semibold text-slate-900 sm:px-6 dark:text-slate-100">
                        {row.label}
                      </th>
                      <td className="px-4 py-4 leading-relaxed text-slate-600 sm:px-6 dark:text-slate-400">{row.web}</td>
                      <td className="bg-sky-50/60 px-4 py-4 leading-relaxed text-slate-800 sm:px-6 dark:bg-sky-950/20 dark:text-slate-200">
                        {row.desktop}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
              Prefer working in the browser?{' '}
              <LiveDemoLink className="cursor-pointer font-semibold text-[#0369A1] hover:underline dark:text-sky-400">
                Try the live demo
              </LiveDemoLink>
            </p>
          </div>
        </section>

        {/* ── REQUIREMENTS + LICENCE ──────────────────────────────────── */}
        <section
          aria-labelledby="desktop-requirements-heading"
          className="border-t border-slate-200 py-20 sm:py-28 dark:border-slate-800"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <h2 id="desktop-requirements-heading" className={sectionHeading}>
                What you need
              </h2>
              <ul className="mt-8 space-y-5">
                {requirements.map((r) => (
                  <li key={r.text} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0369A1] dark:bg-sky-500/10 dark:text-sky-400">
                      <r.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="pt-2 leading-relaxed text-slate-700 dark:text-slate-300">{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-sky-100 bg-linear-to-br from-sky-50 to-white p-8 sm:p-10 dark:border-sky-900/40 dark:from-sky-950/40 dark:to-slate-900">
              <ShieldCheck size={28} strokeWidth={1.75} className="text-[#0369A1] dark:text-sky-400" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Licence keys are free</h3>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                The first time you open BiltyOne Desktop, it asks for a licence key. Ask for one and we email it to you,
                usually within one business day. One key works on one computer.
              </p>
              <Link
                href="/desktop/licence-key"
                className="mt-7 inline-flex items-center gap-2 self-start rounded-xl border border-[#0369A1] px-5 py-3 text-sm font-semibold text-[#0369A1] transition-colors hover:bg-[#0369A1] hover:text-white active:translate-y-px dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-400 dark:hover:text-slate-950"
              >
                Request a free key
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section
          id="faq"
          aria-labelledby="desktop-faq-heading"
          className="border-t border-slate-200 bg-[#F8FAFC] py-20 sm:py-28 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="desktop-faq-heading" className={sectionHeading}>
              Desktop app questions
            </h2>
            <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              {faqs.map((f) => (
                <details key={f.q} className="group px-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-slate-900 marker:hidden dark:text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 dark:text-slate-400"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-5 leading-relaxed text-slate-600 dark:text-slate-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────────── */}
        <section aria-labelledby="desktop-cta-heading" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-sky-100 bg-sky-50 px-7 py-10 sm:px-10 md:flex-row md:items-center dark:border-sky-900/40 dark:bg-sky-950/30">
              <div>
                <h2 id="desktop-cta-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  Ready to work offline?
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Free download for Windows 10 and 11.</p>
              </div>
              <DesktopDownloadButton id="desktop-cta-download" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
