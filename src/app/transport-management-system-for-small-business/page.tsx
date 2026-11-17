import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, Callout, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/transport-management-system-for-small-business');

// Keyword: "transport management system for small business".

const faqs = [
  {
    q: 'What is the best transport management system for a small business?',
    a: 'For a small transport business, the best system is simple, cheap and quick to learn. It should print GR/LR, save customers, calculate freight, track payments and back up your data, and one person should be able to run it. BiltyOne is built for exactly that and is free for early transporters.',
  },
  {
    q: 'Do I need a TMS if I only have one or two trucks?',
    a: 'It helps more than you might expect. Even two trucks generate dozens of GRs a month, and every lost GR, wrong freight calculation or forgotten payment costs money. A simple TMS keeps all of it in one searchable place, and with BiltyOne there is no cost to start.',
  },
  {
    q: 'How long does it take a small transport business to start using BiltyOne?',
    a: 'Most small transporters are running within a few hours. Sign up, upload your logo, add your five or ten regular customers, and create your first GR. If you have old records in Excel, you can import them using the template in Settings. No training course is needed.',
  },
  {
    q: 'Can a small transport business use BiltyOne on a phone?',
    a: 'Yes. BiltyOne runs in the browser on any smartphone, so you can create or check a GR from the yard. For printing GR copies, a computer connected to a printer is easiest; you can also save the PDF on your phone and print it later or share it.',
  },
  {
    q: 'Will I need to hire someone to manage the software?',
    a: 'No. BiltyOne is designed so the owner or one office person can run everything: GRs, customers, statements and backups. Many small transporters find it removes the need for a separate person just to write and file GRs, which is often the biggest saving.',
  },
];

export default function SmallBusinessTmsPage() {
  return (
    <ContentPage
      path="/transport-management-system-for-small-business"
      eyebrow="For small transport businesses"
      title="Transport Management System for Small Business"
      intro="BiltyOne is a simple transport management system for small transport businesses with 1 to 20 trucks. Create and print GRs, keep customer records, calculate freight and bill customers, without hiring office staff or paying for software you will never use."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'what-small-transporters-need', label: 'What a small transporter actually needs' },
        { id: 'what-you-can-skip', label: 'What you can skip' },
        { id: 'cost', label: 'What it costs' },
        { id: 'a-day', label: 'A day with BiltyOne' },
        { id: 'start', label: 'Start in one afternoon' },
      ]}
      related={[
        '/transport-company-software',
        '/online-transport-management-software',
        '/desktop',
        '/guides/paper-gr-book-to-software',
      ]}
    >
      <AnswerBox>
        A <Strong>transport management system for a small business</Strong> should do a few things very well: print a
        correct GR/LR in minutes, remember your customers, calculate freight, show who has paid, and keep every record
        safe. It should cost little or nothing and be easy enough for one person to run. That is what BiltyOne is built for.
      </AnswerBox>

      <H2 id="what-small-transporters-need">What a small transporter actually needs</H2>
      <P>
        Large transport ERPs are built for companies with hundreds of trucks, a workshop and an accounts department. A small
        transport business has different problems: the owner often writes the GRs, there is no time for training, and
        every rupee spent on software has to pay for itself.
      </P>
      <UL
        items={[
          <>
            <Strong>Fast GRs.</Strong> A complete GR/LR in under two minutes, with the GR number and freight filled in for
            you.
          </>,
          <>
            <Strong>Clean printed copies.</Strong> Driver, consignor and consignee copies with your name, logo and GSTIN,
            so a small business looks as professional as a big one.
          </>,
          <>
            <Strong>Customer memory.</Strong> Save regular customers once; their details and default rate fill in
            automatically.
          </>,
          <>
            <Strong>Know who owes you.</Strong> Mark each GR paid or pending, and send a statement for any period.
          </>,
          <>
            <Strong>Records that survive.</Strong> Everything stored online, with a full Excel backup whenever you want one.
          </>,
          <>
            <Strong>Works where you work.</Strong> On a phone at the yard, a PC in the office, or{' '}
            <A href="/desktop">offline on Windows</A> when the internet is unreliable.
          </>,
        ]}
      />

      <H2 id="what-you-can-skip">What you can skip</H2>
      <P>Plenty of transport software is sold with modules a small transporter rarely needs on day one:</P>
      <DataTable
        caption="Features a small transport business needs now compared with ones it can add later"
        headers={['Feature', 'Small business needs it now?', 'Notes']}
        rows={[
          ['GR / LR creation and printing', 'Yes', 'The core of every transport business'],
          ['Customer records and statements', 'Yes', 'Saves hours at month end'],
          ['Payment tracking', 'Yes', 'Stops money slipping through the cracks'],
          ['Backups and export', 'Yes', 'Your records are your business'],
          ['GPS tracking', 'Usually not', 'A phone call or a separate GPS device is often enough'],
          ['Route optimisation', 'No', 'Built for large multi-drop fleets'],
          ['Payroll and HR', 'No', 'A few drivers do not need an HR module'],
          ['Full accounting', 'Not in the TMS', 'Give the Excel export to your CA or accounting software'],
        ]}
      />
      <P>
        If you are weighing a full suite, read <A href="/transport-erp-software">transport ERP software vs a TMS</A>{' '}
        first.
      </P>

      <H2 id="cost">What it costs</H2>
      <P>
        BiltyOne is <Strong>free for early transporters</Strong>: no setup fee, no per-user charge and no credit card at
        signup. If paid plans are introduced later, existing users get fair notice in advance, and you can download all of
        your data to Excel at any time, so there is no lock-in. The real saving for most small businesses is time: fewer
        hours writing GRs, fewer billing mistakes and no separate person just for paperwork.
      </P>
      <Callout>
        <Strong>Tip:</Strong> try BiltyOne for a week with your real GRs before you stop using the paper book. You lose
        nothing, and you will know quickly whether it suits your business.
      </Callout>

      <H2 id="a-day">A day with BiltyOne</H2>
      <H3>Morning: bookings</H3>
      <P>
        A regular customer calls with a load for Jaipur. Pick their name, enter the goods, weight and rate, and save. The GR
        number and freight are filled in; print the three copies and hand the driver their copy.
      </P>
      <H3>Afternoon: delivery and payment</H3>
      <P>
        The driver reports delivery. Mark the GR delivered and, once the money arrives, paid. If a customer calls about an
        old load, search by GR number, their name or the vehicle number.
      </P>
      <H3>Month end: billing</H3>
      <P>
        Open the Printing tab, choose the customer and the month, and download a freight bill that lists every GR with
        totals, amount paid and balance due. Download an Excel backup for your records.
      </P>

      <H2 id="start">Start in one afternoon</H2>
      <OL
        items={[
          <>
            <A href="/register">Sign up free</A> with your company details. No credit card.
          </>,
          'Upload your logo in Settings.',
          'Add your regular customers. If you have old GRs in Excel, import them too.',
          'Create and print your first GR.',
          'Keep the paper book for a week as a safety net, then switch.',
        ]}
      />
      <P>
        Want to look first? Open the <A href="/live-demo">live demo</A> with sample data. No signup needed.
      </P>
    </ContentPage>
  );
}
