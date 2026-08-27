import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Developer Resources',
  description:
    'Developer and integration resources for BiltyOne: agent-readable docs (llms.txt), sitemap, and the current status of API and webhook access.',
  alternates: { canonical: 'https://biltyone.com/developers' },
};

const resources = [
  {
    title: 'llms.txt',
    body: 'A machine-readable summary of BiltyOne for AI agents and assistants: what the product does, who it is for, and which pages to read.',
    href: '/llms.txt',
    linkLabel: 'View llms.txt',
  },
  {
    title: 'Markdown content negotiation',
    body: 'Public marketing pages return a plain-Markdown rendition when requested with an "Accept: text/markdown" header, so agents can read page content without parsing HTML.',
    href: '/',
    linkLabel: 'Read about this on the homepage',
  },
  {
    title: 'Sitemap',
    body: 'A complete, up-to-date list of every public URL on biltyone.com in standard sitemap.xml format.',
    href: '/sitemap.xml',
    linkLabel: 'View sitemap.xml',
  },
  {
    title: 'Robots policy',
    body: 'Crawl rules for search engines and AI crawlers, including which agents are explicitly allowed.',
    href: '/robots.txt',
    linkLabel: 'View robots.txt',
  },
];

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-24">
          <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-2xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0369A1] dark:text-sky-400 mb-4">Developers</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white mb-4">
              Developer Resources
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              What&apos;s available today for integrating with, or building on top of, BiltyOne, and what isn&apos;t yet.
            </p>
          </div>
        </section>

        {/* Current API status */}
        <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800" aria-labelledby="api-status-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 id="api-status-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Public API status
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              BiltyOne is a web application, not an API product. There is currently no public REST or GraphQL
              API, OpenAPI specification, or webhook system for third-party developers to call on a user&apos;s behalf.
              Every feature (GR creation, customer management, printing, analytics) is accessed through the web
              dashboard at{' '}
              <a href="https://biltyone.com" className="text-[#0369A1] dark:text-sky-400 hover:underline">
                biltyone.com
              </a>
              .
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We&apos;re evaluating public API and webhook access for transport businesses that want to connect BiltyOne to
              their own tools. If that&apos;s something your business needs, tell us at{' '}
              <a href="mailto:work.sameerfaridi@gmail.com" className="text-[#0369A1] dark:text-sky-400 hover:underline">
                work.sameerfaridi@gmail.com
              </a>
              . It directly shapes what we prioritise next.
            </p>
          </div>
        </section>

        {/* What exists today */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" aria-labelledby="resources-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 id="resources-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              What&apos;s available today
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
              BiltyOne does publish machine-readable resources for AI agents and search crawlers to read the site
              accurately, and these are live now.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resources.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 hover:border-[#0369A1]/30 dark:hover:border-sky-500/30 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900 transition-all duration-200"
                >
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{r.body}</p>
                  <Link href={r.href} className="text-sm font-semibold text-[#0369A1] dark:text-sky-400 hover:underline">
                    {r.linkLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Have an integration need?</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Email <a href="mailto:work.sameerfaridi@gmail.com" className="text-[#0369A1] dark:text-sky-400 hover:underline">work.sameerfaridi@gmail.com</a> with what you&apos;re trying to build, or use the{' '}
              <Link href="/contact" className="text-[#0369A1] dark:text-sky-400 hover:underline">contact form</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
