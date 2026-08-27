import Link from 'next/link';
import { LiveDemoLink } from '@/components/shared/LiveDemoLink';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#0F172A] dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-slate-700 dark:border-slate-800">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/brand/logo-mark-white.svg" alt="" className="h-8 w-8" />
              <span className="text-[15px] font-bold text-white">BiltyOne</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Replace manual workflows with an intelligent transport management dashboard built for modern logistics teams.
            </p>
            {/* Live demo call-out */}
            <LiveDemoLink className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-150 cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" />
              </svg>
              Try live demo, no signup
            </LiveDemoLink>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Product</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Features', href: '/features' },
                { label: 'Overview', href: '/product' },
                { label: 'Why Choose BiltyOne', href: '/why-biltypro' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <LiveDemoLink className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                  Live Demo
                </LiveDemoLink>
              </li>
              <li>
                <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Lorry Receipt Software', href: '/lorry-receipt-software' },
                { label: 'GR Management', href: '/gr-management' },
                { label: 'What is a TMS?', href: '/transport-management-system' },
                { label: 'Digital vs Paper', href: '/digital-transport-management' },
                { label: 'Logistics Glossary', href: '/logistics-glossary' },
                { label: 'Transport Automation', href: '/transport-business-automation' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '/about' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
                { label: 'Security', href: '/security' },
                { label: 'Developers', href: '/developers' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                { label: 'User Agreement', href: '/user-agreement' },
                { label: 'Cookie Policy', href: '/cookie-policy' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-slate-500">
            &copy; {year} BiltyOne. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="text-sm text-slate-500">
              Built for transparency, trust &amp; easiness.
            </p>
            {/* Google "Preferred Sources" button: lets readers mark BiltyOne
                as a preferred source in Google Search. Rendered by the
                publisher.js script loaded in layout.tsx. */}
            <div {...{ 'google-add-preferred-source-btn': '', 'data-theme': 'dark' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
