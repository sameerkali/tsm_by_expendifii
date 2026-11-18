import Link from 'next/link';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';
import { GooglePreferredSourceButton } from '@/components/landing/GooglePreferredSourceButton';
import { CONTACT, SOCIAL_PROFILES } from '@/config/site';
import { addressLines, phoneHref, phoneNumber, whatsappHref } from '@/lib/contact';

const LINK = 'text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer';
// Column labels are <p>, not headings: they repeat on every page and would
// otherwise add four off-topic headings to each page's outline.
const LABEL = 'text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4';

const columns: { label: string; links: { label: string; href: string }[] }[] = [
  {
    label: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Product Tour', href: '/product' },
      { label: 'Why BiltyOne', href: '/why-biltyone' },
      { label: 'Desktop App (Windows)', href: '/desktop' },
      { label: 'GR Software', href: '/gr-software' },
      { label: 'Bilty Software', href: '/bilty-software' },
      { label: 'LR Software', href: '/lr-software' },
      { label: 'Lorry Receipt Software', href: '/lorry-receipt-software' },
      { label: 'GR Management', href: '/gr-management' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Solutions',
    links: [
      { label: 'Online Transport Software', href: '/online-transport-management-software' },
      { label: 'Transport Company Software', href: '/transport-company-software' },
      { label: 'Transport Billing Software', href: '/transport-billing-software' },
      { label: 'Transport Software for Small Business', href: '/transport-software-small-business' },
      { label: 'Transport ERP vs TMS', href: '/transport-erp-software' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Guides', href: '/guides' },
      { label: 'TMS Guide', href: '/transport-management-system' },
      { label: 'What is a Bilty?', href: '/guides/what-is-bilty' },
      { label: 'GR vs LR vs E-Way Bill', href: '/guides/gr-vs-lr-vs-eway-bill' },
      { label: 'How to Choose a TMS', href: '/guides/how-to-choose-transport-management-software' },
      { label: 'Paper GR Book to Software', href: '/guides/paper-gr-book-to-software' },
      { label: 'Logistics Glossary', href: '/logistics-glossary' },
      { label: 'Paper vs Excel vs Software', href: '/digital-transport-management' },
      { label: 'Transport Automation', href: '/transport-business-automation' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security', href: '/security' },
      { label: 'Developers', href: '/developers' },
    ],
  },
];

const legal = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'User Agreement', href: '/user-agreement' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const phone = phoneNumber();
  const tel = phoneHref();
  const whatsapp = whatsappHref();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#0F172A] dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-700 dark:border-slate-800">
          {/* Brand + NAP (name, address, phone): identical to the Organization schema */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/brand/logo-mark-white.svg" alt="" className="h-8 w-8" />
              <span className="text-[15px] font-bold text-white">BiltyOne</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Transport management software for Indian transporters. Create GR/LR (bilty), print 3 copies, bill customers and keep every record safe.
            </p>
            <address className="mt-5 not-italic text-sm text-slate-400 leading-relaxed">
              {addressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={`mailto:${CONTACT.email}`} className="mt-2 block text-sky-400 hover:text-sky-300">
                {CONTACT.email}
              </a>
              {phone && tel && (
                <a href={tel} className="block text-sky-400 hover:text-sky-300">
                  {phone}
                </a>
              )}
              {whatsapp && (
                <a href={whatsapp} className="block text-sky-400 hover:text-sky-300" target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>
              )}
            </address>
            {SOCIAL_PROFILES.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm">
                {SOCIAL_PROFILES.map((url) => (
                  <li key={url}>
                    <a href={url} rel="me noopener noreferrer" target="_blank" className="text-slate-400 hover:text-white">
                      {new URL(url).hostname.replace(/^www\./, '')}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <LiveDemoLink className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-150 cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" />
              </svg>
              Try live demo, no signup
            </LiveDemoLink>
          </div>

          {columns.map((col) => (
            <nav key={col.label} aria-label={col.label}>
              <p className={LABEL}>{col.label}</p>
              <ul className="space-y-2.5">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={LINK}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {col.label === 'Product' && (
                  <>
                    <li>
                      <LiveDemoLink className={LINK}>Live Demo</LiveDemoLink>
                    </li>
                    <li>
                      <Link href="/login" className={LINK}>
                        Sign In
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:items-center lg:justify-between">
          {/* slate-400, not slate-500: slate-500 on the #0F172A footer is
              only 3.7:1, below the WCAG AA 4.5:1 minimum for body text. */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-sm text-slate-400 sm:whitespace-nowrap">&copy; {year} BiltyOne. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm text-slate-400">Built for transparency, trust &amp; easiness.</p>
            <GooglePreferredSourceButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
