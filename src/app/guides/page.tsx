import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { pagesInSection } from '@/config/pages';
import { ContentPage, H2, P } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/guides');

const reference = ['/transport-management-system', '/logistics-glossary', '/digital-transport-management', '/transport-business-automation'];

export default function GuidesIndexPage() {
  const guides = pagesInSection('guide');
  const refs = pagesInSection('resource').filter((p) => reference.includes(p.path));
  const tms = pagesInSection('solution').filter((p) => reference.includes(p.path));

  return (
    <ContentPage
      path="/guides"
      eyebrow="Guides"
      title="Guides for Indian Transporters"
      intro="Plain-language guides to the documents, rules and software that Indian road transporters deal with every day, written by the BiltyOne team from a transport family in Delhi."
      collection
      related={['/transport-management-system', '/logistics-glossary']}
      ctaTitle="Put the guides into practice"
      ctaBody="Create correct GRs, print three copies and bill customers with BiltyOne. Free for early transporters."
    >
      <H2 id="guides">Latest guides</H2>
      <ul className="mb-12 grid gap-4">
        {guides.map((g) => (
          <li key={g.path}>
            <Link
              href={g.path}
              className="block rounded-2xl border border-slate-200 p-6 transition-colors hover:border-[#0369A1] dark:border-slate-800 dark:hover:border-sky-500"
            >
              <span className="block text-lg font-bold text-slate-900 dark:text-white">{g.title.replace(/\s*\|\s*BiltyOne$/, '')}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">{g.description}</span>
            </Link>
          </li>
        ))}
      </ul>

      <H2 id="reference">Reference</H2>
      <P>Background reading on transport management and the terms used in Indian road transport.</P>
      <ul className="grid gap-4 sm:grid-cols-2">
        {[...tms, ...refs].map((g) => (
          <li key={g.path}>
            <Link
              href={g.path}
              className="block h-full rounded-2xl border border-slate-200 p-5 transition-colors hover:border-[#0369A1] dark:border-slate-800 dark:hover:border-sky-500"
            >
              <span className="block font-semibold text-slate-900 dark:text-white">{g.label}</span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">{g.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </ContentPage>
  );
}
