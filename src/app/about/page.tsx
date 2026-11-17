import type { Metadata } from 'next';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Card } from '@/components/landing/Card';
import { FaqList } from '@/components/content/ContentPage';
import { ADDRESS, CONTACT, FOUNDER, FOUNDING_YEAR } from '@/config/site';

export const metadata: Metadata = buildPageMetadata('/about');

const values = [
  {
    id: '01',
    title: 'Transparency',
    description: 'No hidden fees, no surprises. You always know what BiltyOne does with your data, what the pricing is, and what\'s coming next.',
  },
  {
    id: '02',
    title: 'Trust',
    description: 'Your data is yours. We don\'t sell it, we don\'t share it, and we\'ve built the platform to keep it secure. See our Security page for full details.',
  },
  {
    id: '03',
    title: 'Easiness',
    description: 'If a transporter who\'s never used software before can use BiltyOne comfortably within one day, we\'ve done our job right.',
  },
];

const team = [
  { name: 'Sameer Faridi', role: 'Founder. Handles product, frontend, SEO, marketing, content, pricing, and client relationships.', initials: 'SF' },
  { name: 'Dev Sharma', role: 'Backend Engineer. Responsible for all APIs, data infrastructure, and platform reliability.', initials: 'DS' },
];

// Fact sheet built from src/config/site.ts so it always matches the
// Organization schema, footer and contact page.
const facts: [string, string][] = [
  ['What it is', 'Transport management software for Indian road transporters: GR/LR (bilty) creation and printing, customer records, freight statements and Excel backup'],
  ['Founded', `${FOUNDING_YEAR}, by ${FOUNDER.name}`],
  ['Based in', `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality} ${ADDRESS.postalCode}, ${ADDRESS.countryName}`],
  ['Team', `${team.length} people: product and engineering`],
  ['Works on', 'Any web browser on phone or computer, plus BiltyOne Desktop for Windows 10/11, which works offline'],
  ['Built for', 'Transporters with roughly 1 to 50 trucks, transport agents and booking offices'],
  ['Price', 'Free for early transporters, no credit card needed'],
  ['Support', `${CONTACT.languages.join(' and ')}, ${CONTACT.responseTime.toLowerCase()}`],
];

// 40-60 word answers, distinct from questions marked up on other pages.
const faqs = [
  {
    q: 'Who makes BiltyOne?',
    a: `BiltyOne is built by ${FOUNDER.name}, a software engineer from a Delhi transport family, with backend engineer Dev Sharma. The idea came from years of watching relatives fill paper GRs by hand: more than 20 fields and three copies for every trip. The first version went live in ${FOUNDING_YEAR}.`,
  },
  {
    q: 'Where is BiltyOne based?',
    a: `BiltyOne is based at ${ADDRESS.streetAddress}, ${ADDRESS.addressLocality} ${ADDRESS.postalCode}. We are onboarding transporters across Delhi NCR first, and the web app works for transporters anywhere in India. Support is in English and Hindi, and we reply ${CONTACT.responseTime.toLowerCase()}.`,
  },
  {
    q: 'How can I suggest a feature for BiltyOne?',
    a: 'Write to us from the contact page or on WhatsApp. Tell us how your office works today and what still happens on paper or in Excel. BiltyOne is early, and feedback from the first transporters using it decides what we build next, from printing details to new screens.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('/about', { pageType: 'AboutPage', aboutSoftware: true, faqs })} />
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-6 leading-tight">
              Built by a transporter&apos;s son, for transporters
            </h1>
            <div className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed space-y-4 text-left sm:text-center">
              <p className="font-medium text-[#0369A1] dark:text-sky-400">
                BiltyOne replaces paper GRs, Excel sheets, and hired data-entry staff with one fast, simple, and trustworthy platform built specifically for Indian transporters.
              </p>
              <p>
                My father and relatives have been in the transport business for years. Growing up, I watched them fill paper GRs by hand: 20+ fields, three copies, every single trip. I watched records get lost, misplaced, soaked in rain. I watched them hire people just to manage paperwork that a good system should handle automatically.
              </p>
              <p>
                I&apos;m a software engineer. I knew the tools to fix this existed. So in 2025, I built BiltyOne.
              </p>
              <p>
                Not as a generic logistics platform. Not as a repurposed project management tool. As something built specifically for how Indian transporters actually work, from the GR format to the three-copy print to the way customers and drivers are managed on the ground.
              </p>
              <p>
                BiltyOne is still early. We&apos;re onboarding our first transporters, listening hard, and improving fast. If you&apos;re a transporter willing to help shape what this becomes, we&apos;d love to have you.
              </p>
              <p className="font-semibold text-slate-800 dark:text-slate-200 pt-2 text-center">
                Sameer Faridi, Founder, BiltyOne
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 sm:py-24 bg-white dark:bg-slate-950" aria-labelledby="mission-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Mission</p>
                <h2 id="mission-heading" className="text-3xl font-bold text-[#0F172A] dark:text-white tracking-tight mb-5">
                  Operational clarity for every transport business in India
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  We believe every transporter, whether you run one truck or fifty, deserves a system that&apos;s fast, honest, and actually built for your work. Not a spreadsheet. Not a paper file. Not software from 2008.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  BiltyOne exists to give every transport business the same operational clarity that used to require a full admin team.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 p-8">
                <div className="space-y-6">
                  {[
                    { num: '2025', label: 'Founded by Sameer Faridi after seeing the gap firsthand' },
                    { num: '2025', label: 'First version live: GR creation, printing, and customer management' },
                    { num: 'Now', label: 'Onboarding first transporters across NCR, building with real feedback' },
                    { num: 'Next', label: 'Driver app, invoicing, analytics, and pan-India expansion' },
                  ].map((milestone) => (
                    <div key={milestone.label} className="flex items-start gap-4">
                      <div className="shrink-0 w-16 text-sm font-bold text-[#0369A1] dark:text-sky-400">{milestone.num}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">{milestone.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 sm:py-24 bg-[#F8FAFC] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800" aria-labelledby="values-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Core Principles</p>
              <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Three values that guide every decision
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v) => (
                <Card key={v.id} id={v.id} title={v.title} description={v.description} />
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 sm:py-24 bg-white dark:bg-slate-950" aria-labelledby="team-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-3">Who We Are</p>
            <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight mb-12">
              A focused team obsessed with operations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6">
              {team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 px-6 py-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0F172A] dark:bg-[#0369A1] text-white text-sm font-bold">
                    {member.initials}
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A] dark:text-white">{member.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fact sheet + FAQ */}
        <section className="py-20 sm:py-24 bg-[#F8FAFC] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" aria-labelledby="facts-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="facts-heading" className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white tracking-tight">
              BiltyOne at a glance
            </h2>
            <dl className="mt-8 divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-4">
                  <dt className="text-sm font-semibold text-[#0F172A] dark:text-white">{label}</dt>
                  <dd className="sm:col-span-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
            <FaqList faqs={faqs} title="About BiltyOne: common questions" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0F172A] dark:bg-slate-900 py-20 border-t border-slate-800" aria-labelledby="about-cta-heading">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 id="about-cta-heading" className="text-3xl font-bold text-white mb-4">Want to learn more?</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">Reach out &mdash; we&apos;re always happy to show you around the platform.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#0369A1] px-6 py-3.5 text-sm font-semibold text-white hover:bg-sky-600 transition-colors duration-200 cursor-pointer">
                Contact us
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors duration-200 cursor-pointer">
                Get started free
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
