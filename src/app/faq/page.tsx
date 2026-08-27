import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import FAQSection from '@/components/landing/FAQSection';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to the most common questions about BiltyOne: setup time, pricing, data safety, customisation, and more for Indian transporters.',
  alternates: { canonical: 'https://biltyone.com/faq' },
};

const faqs = [
  {
    q: 'How quickly can we get started?',
    a: 'Most transporters are up and running within 2 to 24 hours. We help you set up your account, add your customers, and print your first GR together.',
  },
  {
    q: "We've been doing this on paper for years. Is it hard to switch?",
    a: 'Not at all. BiltyOne was designed for transporters, not software people. If you can fill a paper GR, you can use BiltyOne. Most users are comfortable within a day.',
  },
  {
    q: 'Can we customise what appears on the printed GR?',
    a: 'Yes. You choose which fields appear on print. Every transport business is different BiltyOne works around your format, not a fixed template.',
  },
  {
    q: 'What happens to our data if something goes wrong?',
    a: 'Your data is stored securely on our servers not on paper, not on a single computer. It won\'t burn, won\'t get soaked, won\'t be eaten by rats. It\'s always there when you need it.',
  },
  {
    q: 'Is BiltyOne free?',
    a: 'Yes BiltyOne is completely free right now. We\'re onboarding our first transporters, gathering real feedback, and improving the product. After the free period, it will become a paid service but we\'ll always give you fair notice before anything changes.',
  },
  {
    q: 'Do you have a referral programme?',
    a: 'Yes. Refer a fellow transporter and if they purchase a plan, both of you get 15 extra days free. No catch.',
  },
  {
    q: 'What is a Transport Management System (TMS)?',
    a: 'A Transport Management System (TMS) is software that helps logistics companies plan, execute, and optimise the movement of goods. BiltyOne focuses specifically on GR creation, printing, and record-keeping for Indian transporters, with no complex modules you don\'t need.',
  },
  {
    q: 'Is BiltyOne suitable for small fleets with just 1-2 trucks?',
    a: 'Absolutely. BiltyOne is designed for transporters of all sizes. Whether you own one truck or fifty, the GR creation, customer management, and analytics features work exactly the same. Small fleet owners actually benefit the most because BiltyOne eliminates the need to hire a dedicated person just for paperwork.',
  },
  {
    q: 'What happens when the free period ends?',
    a: 'We will notify you well in advance. Early adopters may get extended access or special pricing. No surprises.',
  },
  {
    q: 'Can I export my data if I leave?',
    a: 'Yes. You can export all your GRs and customer data anytime. Your data belongs to you.',
  },
  {
    q: 'Do you offer on-premise deployment?',
    a: 'Not currently. BiltyOne is cloud-based, which means you can access it from anywhere with an internet connection.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://biltyone.com/faq#faq',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="pt-20 bg-[#F8FAFC] dark:bg-slate-950 [background-image:linear-gradient(to_right,rgba(226,232,240,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(226,232,240,0.5)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] [background-size:48px_48px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <FAQSection faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
