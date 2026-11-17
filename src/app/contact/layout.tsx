import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import { CONTACT_FAQS } from './content';

// The contact page is a client component (form state), so its metadata and
// ContactPage JSON-LD live here.
export const metadata: Metadata = buildPageMetadata('/contact');

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageJsonLd('/contact', { pageType: 'ContactPage', faqs: CONTACT_FAQS })} />
      {children}
    </>
  );
}
