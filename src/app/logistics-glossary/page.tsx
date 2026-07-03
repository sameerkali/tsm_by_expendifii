import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Indian Logistics & Transport Glossary — TSM by Expendifii',
  description:
    'A quick reference guide for Indian transport operators: definitions and explanations for GR, LR, POD, E-Way Bill, Consignor, Freight, Fleet, and TMS.',
  alternates: { canonical: 'https://tsm.expendifii.com/logistics-glossary' },
};

const glossaryTerms = [
  {
    term: 'GR (Goods Receipt)',
    def: 'A legal document issued by a transporter acknowledging receipt of goods for shipment. It serves as an official contract of carriage, detailing terms, freight rates, and party names. TSM by Expendifii creates and manages GRs digitally.',
  },
  {
    term: 'LR (Lorry Receipt)',
    def: 'Same as GR — used interchangeably in the Indian transport industry. It outlines the freight, consignor, consignee, and vehicle information. In manual systems, it consists of a driver copy, consigner copy, and consignee copy.',
  },
  {
    term: 'POD (Proof of Delivery)',
    def: 'A signed document or delivery acknowledgment confirming that goods were delivered to the consignee in satisfactory condition. Essential for releasing transportation payments and completing the job loop.',
  },
  {
    term: 'E-way Bill',
    def: 'An electronic document required under the GST regime for the movement of goods worth over ₹50,000 between states or within a state. TSM allows you to save the E-way bill details alongside your GR record for seamless auditing.',
  },
  {
    term: 'Consignor (Consigner)',
    def: 'The sender of the goods being shipped. They are the billing party responsible for hiring the transporter. Consignor details (Name, phone, GSTIN, address) are mandatory on every GR form.',
  },
  {
    term: 'Consignee',
    def: 'The recipient of the goods being transported. Their details are recorded on the GR to verify who is authorised to sign the Proof of Delivery (POD) upon vehicle arrival.',
  },
  {
    term: 'Freight',
    def: 'The charge or cost paid to a transporter for moving goods from one destination to another. Freight calculations in TSM support box rates, weight rates, or flat trip rates.',
  },
  {
    term: 'Dispatch / Transit',
    def: 'The stage in the logistics cycle where a vehicle is loaded, documentation is verified, and the shipment is actively traveling from point of origin to destination.',
  },
  {
    term: 'Fleet Management',
    def: 'The coordination of a company&apos;s transport vehicles. Includes vehicle tracking, maintenance, dispatch schedules, and driver assignments to keep operational costs low.',
  },
  {
    term: 'Transport Management System (TMS)',
    def: 'A software platform designed to automate and optimise logistics operations. Simplifies document generation (GR/LR), record lookup, driver communication, and invoices.',
  },
];

export default function GlossaryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-50"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/0 dark:from-slate-950/0 to-[#F8FAFC] dark:to-slate-950" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-6">
              Indian Logistics Glossary
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Common terms, documents, and concepts in the Indian transport sector explained in simple words.
            </p>
          </div>
        </section>

        {/* Glossary Terms List */}
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {glossaryTerms.map((item) => (
                <div key={item.term} className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-850 bg-[#F8FAFC] dark:bg-slate-900/50">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.term}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center border-t border-slate-200 dark:border-slate-800 pt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0369A1] transition-colors">Home</Link>
              <Link href="/features" className="hover:text-[#0369A1] transition-colors">Features</Link>
              <Link href="/product" className="hover:text-[#0369A1] transition-colors">Product</Link>
              <Link href="/why-tsm" className="hover:text-[#0369A1] transition-colors">Why Choose TSM</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
