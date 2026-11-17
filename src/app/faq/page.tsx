import type { Metadata } from 'next';
import { buildPageMetadata, pageJsonLd } from '@/lib/seo';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import FAQSection from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildPageMetadata('/faq');

// Answers are 40-60 words and open with a direct answer: the length search
// engines and voice assistants most often lift into featured snippets.
// Every claim must match the product (see CORE_APP_SPEC.md). The FAQPage
// JSON-LD below is generated from this same list.
const faqs = [
  {
    q: 'What is BiltyOne?',
    a: 'BiltyOne is transport management software for Indian road transporters. It creates and prints GR/LR (bilty) in three copies, keeps your customer list, calculates freight, tracks booking and payment status, and produces customer freight statements. It runs in any browser, and BiltyOne Desktop works offline on Windows.',
  },
  {
    q: 'Is BiltyOne free?',
    a: 'Yes. BiltyOne is free for early transporters while we onboard our first users and improve the product with their feedback. No credit card is needed to sign up. If paid plans are introduced later, existing users will get fair notice in advance, and you can export all your data at any time.',
  },
  {
    q: 'How quickly can we get started?',
    a: 'Most transporters are up and running within 2 to 24 hours. Signing up takes about a minute. Then upload your logo, add your regular customers, import old GRs from Excel if you want them, and create your first GR. We are happy to help you set up and print your first GR together.',
  },
  {
    q: "We've been doing this on paper for years. Is it hard to switch?",
    a: 'No. BiltyOne uses the same fields as a paper GR book, so if you can fill a paper GR, you can use BiltyOne. Most users are comfortable within a day. You can import old records from Excel and keep the paper book alongside for the first week while your staff gets used to it.',
  },
  {
    q: 'What appears on the printed GR?',
    a: 'Every copy carries your company name, logo, GSTIN, PAN, phone and address from your company profile, plus the GR number, date, route, consignor, consignee, goods and freight. Insurance, vehicle and driver, and remarks sections print only when you fill them in, so unused fields never clutter the page.',
  },
  {
    q: 'Can BiltyOne make customer bills or freight statements?',
    a: 'Yes. In the Printing tab, pick a customer and a date range, and BiltyOne produces a PDF freight bill: a summary page with totals, amount paid and balance due, followed by every GR in that period. It uses the GRs you have already created, so there is nothing to retype.',
  },
  {
    q: 'What happens to our data if something goes wrong?',
    a: "Your GRs and customers are stored securely online, not on paper or on a single computer, so they can't be lost to rain, fire or a broken PC. You can also download a full Excel backup of all your GRs at any time from Settings. Our Security page explains how the data is protected.",
  },
  {
    q: 'Can I export my data if I leave?',
    a: 'Yes. Settings has a one-click Download Backup that saves all your GRs, with consignor and consignee details, as a single Excel workbook. Your data belongs to you: take it to another system, share it with your accountant or keep it as an archive. There is no lock-in and no fee for exporting.',
  },
  {
    q: 'Does BiltyOne work offline or on-premise?',
    a: 'Yes, on Windows. BiltyOne Desktop is a free Windows 10/11 app that stores your data on your own computer and works without internet after a one-time activation. The regular web app is cloud-based and works in any browser on a phone or computer, from anywhere with an internet connection.',
  },
  {
    q: 'Which devices does BiltyOne work on?',
    a: 'The web app works in any modern browser, such as Chrome, Edge, Firefox or Safari, on Windows and Mac computers, Android phones and iPhones. Printing is easiest from a computer connected to your printer. BiltyOne Desktop runs on Windows 10 and 11 (64-bit) and does not need a browser.',
  },
  {
    q: 'Is BiltyOne suitable for small fleets with just 1-2 trucks?',
    a: 'Yes. Small transporters often benefit most, because BiltyOne removes the need for a separate person just for paperwork. GR creation, printing, customer records and statements work the same whether you run one truck or fifty, and it is free to start, so there is no cost risk in trying it.',
  },
  {
    q: 'What is a transport management system (TMS)?',
    a: "A transport management system (TMS) is software that helps transport businesses record, track and bill the movement of goods. For Indian road transporters, the core of a TMS is the GR/LR (bilty): booking, printing copies, tracking delivery and billing customers. BiltyOne focuses on exactly that, without modules you don't need.",
  },
  {
    q: 'Is BiltyOne a transport ERP?',
    a: 'No. A transport ERP also covers accounting, payroll, fleet maintenance and more. BiltyOne is a focused transport management system for GRs, customers, freight statements and records. Many small and mid-size transporters run operations in BiltyOne and give its Excel export to their accountant for the books.',
  },
  {
    q: 'Does BiltyOne track vehicles by GPS?',
    a: 'No. BiltyOne records each GR\'s status (Booked, In Transit or Delivered) along with its vehicle number and driver details, but it does not do live GPS tracking or route planning. If you need GPS, use a tracking device or app alongside BiltyOne, which handles your paperwork and billing.',
  },
  {
    q: 'Do you have a referral programme?',
    a: 'Yes. Refer a fellow transporter, and when they activate a plan on BiltyOne, both of you get 15 extra days added to your plan. It is our way of thanking the transporters who help BiltyOne grow by word of mouth, the way most good tools spread in this trade.',
  },
];

// Questions shown here but marked up as FAQPage on another page. Google asks
// for repeated FAQ content to be marked up once, so these stay visible on
// /faq and are left out of this page's JSON-LD.
const MARKED_UP_ELSEWHERE = new Set([
  'Is BiltyOne a transport ERP?', // /transport-erp-software
]);
const faqSchema = faqs.filter((f) => !MARKED_UP_ELSEWHERE.has(f.q));

export default function FAQPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('/faq', { faqs: faqSchema, speakable: ['#faq-heading'] })} />
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <FAQSection faqs={faqs} headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
