import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { getPage } from '@/config/pages';
import { ContentPage, H2, P } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/guides');

// Articles grouped by the question a transporter is asking, each group
// linked to the product pages that put it into practice. Every path must
// exist in src/config/pages.ts; new guides go into one of these groups.
const categories: {
  id: string;
  title: string;
  intro: string;
  articles: string[];
  products: { path: string; anchor: string }[];
}[] = [
  {
    id: 'documents',
    title: 'GR, LR and bilty basics',
    intro: 'What the documents on every load are called, what they prove, and which fields they need.',
    articles: ['/guides/what-is-bilty', '/guides/gr-vs-lr-vs-eway-bill', '/logistics-glossary'],
    products: [
      { path: '/lorry-receipt-software', anchor: 'Bilty and LR software' },
      { path: '/gr-management', anchor: 'GR creation software' },
    ],
  },
  {
    id: 'choosing',
    title: 'Choosing transport software',
    intro: 'What a transport management system does, how it compares with Excel and ERP, and how to pick one.',
    articles: [
      '/transport-management-system',
      '/guides/how-to-choose-transport-management-software',
      '/transport-erp-software',
      '/digital-transport-management',
    ],
    products: [
      { path: '/features', anchor: 'BiltyOne features' },
      { path: '/pricing', anchor: 'Pricing and comparisons' },
      { path: '/transport-management-system-for-small-business', anchor: 'Small transport business software' },
    ],
  },
  {
    id: 'going-digital',
    title: 'Running a digital transport office',
    intro: 'Moving off the paper GR book, and the office work software can take off your hands.',
    articles: ['/guides/paper-gr-book-to-software', '/transport-business-automation'],
    products: [
      { path: '/product', anchor: 'Product tour' },
      { path: '/online-transport-management-software', anchor: 'Online transport software' },
      { path: '/desktop', anchor: 'Offline desktop app' },
    ],
  },
];

export default function GuidesIndexPage() {
  return (
    <ContentPage
      path="/guides"
      eyebrow="Guides"
      title="Guides for Indian Transporters"
      intro="Plain-language guides to the documents, rules and software that Indian road transporters deal with every day, written by the BiltyOne team from a transport family in Delhi."
      collection
      speakable={['#page-intro']}
      toc={categories.map((c) => ({ id: c.id, label: c.title }))}
      ctaTitle="Put the guides into practice"
      ctaBody="Create correct GRs, print three copies and bill customers with BiltyOne. Free for early transporters."
    >
      {categories.map((cat) => (
        <section key={cat.id} aria-labelledby={cat.id} className="mb-14">
          <H2 id={cat.id}>{cat.title}</H2>
          <P>{cat.intro}</P>
          <ul className="grid gap-4">
            {cat.articles.map((path) => {
              const page = getPage(path);
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className="block rounded-2xl border border-slate-200 p-6 transition-colors hover:border-[#0369A1] dark:border-slate-800 dark:hover:border-sky-500"
                  >
                    <span className="block text-lg font-bold text-slate-900 dark:text-white">
                      {page.title.replace(/\s*\|\s*BiltyOne$/, '')}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">{page.description}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Put it into practice: </span>
            {cat.products.map((prod, i) => (
              <span key={prod.path}>
                {i > 0 && ' · '}
                <Link href={prod.path} className="font-semibold text-sky-700 underline-offset-2 hover:underline dark:text-sky-400">
                  {prod.anchor}
                </Link>
              </span>
            ))}
          </p>
        </section>
      ))}
    </ContentPage>
  );
}
