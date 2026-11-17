import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import { PreferencesProvider } from "@/providers/PreferencesProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";
import SmoothScroll from "@/components/landing/SmoothScroll";
import DevTools from "@/components/DevTools";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import NetworkStatusBanner from "@/components/NetworkStatusBanner";
import CookieConsentBanner from "@/components/cookie/CookieConsentBanner";
import { SITE_URL } from "@/config/site";
import { OG_IMAGE } from "@/lib/seo";

// Only used by `font-mono` text inside the dashboard, so it isn't preloaded:
// a preload would make every marketing page download it before first paint.
// Pages that do render monospace text still fetch it on demand.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  themeColor: "#0284c7",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Pages set their own absolute title via buildPageMetadata (lib/seo.ts).
  title: {
    default: "BiltyOne: Transport Management Software for India",
    template: "%s | BiltyOne",
  },
  description:
    "BiltyOne is transport management software for Indian transporters: create, print and manage GR/LR (bilty), customers and freight bills.",
  applicationName: "BiltyOne",
  authors: [{ name: "Sameer Faridi", url: `${SITE_URL}/about` }],
  creator: "BiltyOne",
  publisher: "BiltyOne",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon-32.png",
    apple: "/apple-icon.png",
  },
  // No `alternates` here on purpose: a canonical in the root layout is
  // inherited by every page that forgets its own, which pointed /contact,
  // /login and others at the homepage. Each page sets its own canonical.
  openGraph: {
    siteName: "BiltyOne",
    locale: "en_IN",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
        suppressHydrationWarning
      >
        {/* Anti-flash: applies dark class & font size BEFORE first paint, preventing flicker */}
        <Script
          id="theme-anti-flash"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              var t=localStorage.getItem('bp-theme')||'system';
              var dark=(t==='dark')||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
              if(dark){document.documentElement.classList.add('dark');}
              else{document.documentElement.classList.remove('dark');}
              var s=localStorage.getItem('bp-font-size')||'md';
              var sizes={sm:'14px',md:'16px',lg:'18px',xl:'20px'};
              document.documentElement.style.fontSize=sizes[s]||'16px';
            }catch(e){}})();`,
          }}
        />
        {/* Google "Preferred Sources" publisher.js is loaded by
            <GooglePreferredSourceButton /> in the footer, only when that
            button is about to scroll into view. */}
        <PreferencesProvider>
          <QueryProvider>
            <SmoothScroll />
            {/* No <Suspense> around children here: on a large static page
                React streams a wrapped tree as a hidden, out-of-order
                boundary, so nothing paints until the entire HTML has parsed
                and React's reveal script runs (which React 19.2 can delay by
                up to 300ms). Pages that need a boundary (e.g. for
                useSearchParams) declare their own. */}
            {children}
            <Analytics />
            <GoogleAnalytics />
            {process.env.NODE_ENV === "development" && <DevTools />}
            <Toaster position="top-right" richColors closeButton />
            {/* <NetworkStatusBanner /> */}
            <CookieConsentBanner />
          </QueryProvider>
          <SpeedInsights />
        </PreferencesProvider>
      </body>
    </html>
  );
}
