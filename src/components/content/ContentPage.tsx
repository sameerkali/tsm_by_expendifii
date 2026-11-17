import Link from 'next/link';
import type { ReactNode } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPage } from '@/config/pages';
import { FOUNDER } from '@/config/site';
import { crumbsFor, formatDate, pageJsonLd, type Faq } from '@/lib/seo';

/*
 * Long-form page shell used by the solution pages, explainers and guides.
 * One H1, a visible breadcrumb, an author/date byline (E-E-A-T), optional
 * table of contents, the article body, a CTA and related links. JSON-LD
 * (WebPage + BreadcrumbList + Organization + Person + Article + FAQPage) is
 * generated from the page registry so it always matches the visible page.
 */

const LINK = 'font-semibold text-sky-700 underline-offset-2 hover:underline dark:text-sky-400';

interface ContentPageProps {
  path: string;
  eyebrow?: string;
  /** The page's only H1. */
  title: ReactNode;
  /** One or two sentences under the H1. The first sentence should answer the page's main question. */
  intro: ReactNode;
  children: ReactNode;
  toc?: { id: string; label: string }[];
  faqs?: Faq[];
  /** Registry paths to link at the bottom. */
  related?: string[];
  ctaTitle?: string;
  ctaBody?: string;
  /** Adds SoftwareApplication to the graph (pages about BiltyOne itself). */
  aboutSoftware?: boolean;
  extraJsonLd?: Record<string, unknown>[];
  /** Index/listing pages: CollectionPage, no Article node. */
  collection?: boolean;
}

export function ContentPage({
  path,
  eyebrow,
  title,
  intro,
  children,
  toc,
  faqs,
  related = [],
  ctaTitle = 'Try BiltyOne free',
  ctaBody = 'Create your first GR in minutes. No credit card, no training needed.',
  aboutSoftware = false,
  extraJsonLd,
  collection = false,
}: ContentPageProps) {
  const page = getPage(path);
  const crumbs = crumbsFor(page);

  return (
    <>
      <JsonLd
        data={pageJsonLd(path, {
          article: !collection,
          pageType: collection ? 'CollectionPage' : 'WebPage',
          faqs,
          aboutSoftware,
          speakable: ['#page-intro', '#key-takeaways'],
          extra: extraJsonLd,
        })}
      />
      <Navbar />
      <main
        id="main-content"
        className="bg-white pt-20 dark:bg-slate-950"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-[#F8FAFC] dark:border-slate-800 dark:bg-slate-950">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[48px_48px] opacity-50 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#F8FAFC]/0 to-[#F8FAFC] dark:from-slate-950/0 dark:to-slate-950" />
          <div className="relative mx-auto max-w-4xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                {crumbs.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.path} className="hover:text-sky-700 dark:hover:text-sky-400">
                        {c.name}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-slate-700 dark:text-slate-300">
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            {eyebrow && (
              <p className="mb-4 text-sm font-semibold tracking-widest text-sky-700 uppercase dark:text-sky-400">{eyebrow}</p>
            )}
            <h1 className="text-4xl font-black tracking-tight text-[#0F172A] sm:text-5xl dark:text-white">{title}</h1>
            <p id="page-intro" className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {intro}
            </p>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              By{' '}
              <Link href="/about" rel="author" className={LINK}>
                {FOUNDER.name}
              </Link>
              , founder of BiltyOne · Updated <time dateTime={page.lastModified}>{formatDate(page.lastModified)}</time>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          {toc && toc.length > 0 && (
            <nav aria-label="On this page" className="mb-12 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-3 text-sm font-bold text-slate-900 dark:text-white">On this page</p>
              <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-400">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="hover:text-sky-700 dark:hover:text-sky-400">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{children}</article>

          {faqs && faqs.length > 0 && <FaqList faqs={faqs} />}

          <aside className="mt-16 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{ctaTitle}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{ctaBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-[#0369A1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Get started free
              </Link>
              <LiveDemoLink className="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-[#0369A1] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Try the live demo
              </LiveDemoLink>
            </div>
          </aside>

          {related.length > 0 && (
            <nav aria-label="Related pages" className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
              <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white">Related reading</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((p) => {
                  const r = getPage(p);
                  return (
                    <li key={p}>
                      <Link
                        href={p}
                        className="block rounded-xl border border-slate-200 p-4 transition-colors hover:border-[#0369A1] dark:border-slate-800 dark:hover:border-sky-500"
                      >
                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{r.label}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{r.summary}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Body building blocks ────────────────────────────────────────────────

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-14 mb-4 scroll-mt-28 text-2xl font-extrabold tracking-tight text-slate-900 first:mt-0 sm:text-3xl dark:text-white">
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-8 mb-3 scroll-mt-28 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
      {children}
    </h3>
  );
}

export function P({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p id={id} className="mb-4">
      {children}
    </p>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={LINK}>
      {children}
    </Link>
  );
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-6 list-disc space-y-2 pl-6 marker:text-sky-600">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function OL({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mb-6 list-decimal space-y-3 pl-6 marker:font-bold marker:text-sky-700 dark:marker:text-sky-400">
      {items.map((item, i) => (
        <li key={i} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>;
}

/** Short, self-contained answer box. Put the 40-60 word answer to the page's main question here. */
export function AnswerBox({ id = 'key-takeaways', title = 'Short answer', children }: { id?: string; title?: string; children: ReactNode }) {
  return (
    <div id={id} className="mb-10 rounded-2xl border-l-4 border-[#0369A1] bg-sky-50 p-6 text-slate-700 dark:bg-sky-950/30 dark:text-slate-300">
      <p className="mb-2 text-sm font-bold tracking-wide text-[#0369A1] uppercase dark:text-sky-400">{title}</p>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
      {children}
    </div>
  );
}

interface TableProps {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
  /** Index of a column to highlight (e.g. the BiltyOne column). */
  highlight?: number;
}

/** Semantic comparison table: eligible for table featured snippets. */
export function DataTable({ caption, headers, rows, highlight }: TableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-[#0F172A] text-white dark:bg-slate-800">
            {headers.map((h, i) => (
              <th key={h} scope="col" className={`px-4 py-3 font-semibold ${i === highlight ? 'bg-[#0369A1]' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {rows.map((row, r) => (
            <tr key={r} className="align-top even:bg-slate-50/60 dark:even:bg-slate-900/40">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {cell}
                  </th>
                ) : (
                  <td
                    key={c}
                    className={`px-4 py-3 leading-relaxed ${c === highlight ? 'bg-sky-50/70 font-medium text-slate-800 dark:bg-sky-950/20 dark:text-slate-200' : ''}`}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Visible FAQ list. Answers stay in the HTML (open or closed) so crawlers read them. */
export function FaqList({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2 id="faq-heading" className="mb-6 scroll-mt-28 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {faqs.map((f, i) => (
          <details key={f.q} className="group px-5 sm:px-6" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-slate-900 marker:hidden dark:text-white [&::-webkit-details-marker]:hidden">
              <h3 className="text-base">{f.q}</h3>
              <span aria-hidden="true" className="text-slate-400 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
