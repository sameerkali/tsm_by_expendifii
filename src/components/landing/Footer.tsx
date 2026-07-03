import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#0F172A] dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-slate-700 dark:border-slate-800">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0369A1]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9Z" fill="white" />
                </svg>
              </div>
              <span className="text-[15px] font-bold text-white">TSM by Expendifii</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Replace manual workflows with an intelligent transport management dashboard built for modern logistics teams.
            </p>
            {/* Live demo call-out */}
            <Link
              href="/live-demo"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-150 cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="currentColor" />
              </svg>
              Try live demo no signup
            </Link>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Product</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Features', href: '/features' },
                { label: 'Overview', href: '/product' },
                { label: 'Why Choose TSM', href: '/why-tsm' },
                { label: 'Live Demo', href: '/live-demo' },
                { label: 'Sign In', href: '/login' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer">
                    {item.label}
                  </Link>
                </li>
              ))}
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
                { label: 'Contact', href: '/contact' },
                { label: 'Security', href: '/security' },
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
            &copy; {year} Expendifii. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built for transparency, trust &amp; easiness.
          </p>
        </div>
      </div>
    </footer>
  );
}
