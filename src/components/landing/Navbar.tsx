import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] dark:bg-[#0369A1] shadow-sm group-hover:bg-[#0369A1] dark:group-hover:bg-sky-500 transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9Z" fill="white" />
                <path d="M9 21V15H15V21" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="text-[15px] tracking-tight text-[#0F172A] dark:text-white" style={{ fontWeight: 700 }}>
              TSM <span className="text-[#0369A1] dark:text-sky-400">by Expendifii</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {[
              { label: 'Features', href: '/#features' },
              { label: 'How it Works', href: '/#how-it-works' },
              { label: 'Live Demo', href: '/live-demo' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-colors duration-150 cursor-pointer"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F172A] dark:bg-[#0369A1] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0369A1] dark:hover:bg-sky-500 transition-colors duration-200 cursor-pointer"
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
