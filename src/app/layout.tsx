import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import { PreferencesProvider } from "@/providers/PreferencesProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SmoothScroll from "@/components/landing/SmoothScroll";
import { Agentation } from "agentation";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import NetworkStatusBanner from "@/components/NetworkStatusBanner";
import CookieConsentBanner from "@/components/cookie/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  metadataBase: new URL("https://tsm.expendifii.com"),
  title: {
    default: "TSM by Expendifii",
    template: "%s | TSM by Expendifii",
  },
  description:
    "Modern transport management for Indian logistics and fleet tracking.",
  keywords: [
    "transport management system",
    "transport management software",
    "GR software",
    "lorry receipt software",
    "logistics software India",
    "fleet management system",
    "TSM by Expendifii",
  ],
  authors: [{ name: "Expendifii", url: "https://tsm.expendifii.com/about" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  alternates: {
    canonical: "https://tsm.expendifii.com",
    languages: {
      en: "https://tsm.expendifii.com",
    },
  },
  openGraph: {
    title: "TSM by Expendifii — Transport OS",
    description:
      "Create, print, and manage lorry receipts in minutes. Built for Indian transporters.",
    url: "https://tsm.expendifii.com",
    siteName: "TSM by Expendifii",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TSM Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TSM by Expendifii — Transport Management System for Indian Logistics",
    description:
      "Create, print, and manage lorry receipts in minutes. TSM is the modern transport management system built for Indian transporters — no paper, no spreadsheets.",
    images: ["/og-image.png"],
    site: "@expendifii",
    creator: "@expendifii",
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
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
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
              var t=localStorage.getItem('tms-theme')||'system';
              var dark=(t==='dark')||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
              if(dark){document.documentElement.classList.add('dark');}
              else{document.documentElement.classList.remove('dark');}
              var s=localStorage.getItem('tms-font-size')||'md';
              var sizes={sm:'14px',md:'16px',lg:'18px',xl:'20px'};
              document.documentElement.style.fontSize=sizes[s]||'16px';
            }catch(e){}})();`,
          }}
        />
        <PreferencesProvider>
          <QueryProvider>
            <SmoothScroll />
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
            {process.env.NODE_ENV === "development" && <Agentation />}
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
