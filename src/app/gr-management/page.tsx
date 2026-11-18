import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/gr-management');

// Behaviour described here matches CORE_APP_SPEC.md sections 7 and 9
// (status, duplicate, delete, numbering, statements).

const faqs = [
  {
    q: 'What is GR management?',
    a: 'GR management is everything that happens to a goods receipt after it is created: printing its copies, following the load from booking to delivery, recording payment, finding it again later, and billing it to the customer. In BiltyOne all of this happens on the GR record itself, so nothing gets lost between books and spreadsheets.',
  },
  {
    q: 'Can I edit a GR after printing it?',
    a: 'Yes. Open the GR to change its details, status or billing, then print it again. The GR number itself cannot be changed, which keeps your series reliable. Your company details are read at print time, so a reprint always shows your current letterhead.',
  },
  {
    q: 'What happens when I delete a GR?',
    a: 'A deleted GR disappears from your lists, search, statements and Excel export, and its number is never given to another GR. That keeps your numbering honest: a gap in the series always means a deliberate deletion, not a mistake. Deletion asks for confirmation and cannot be undone.',
  },
  {
    q: 'How do I bill a customer for many GRs at once?',
    a: 'Open the Printing tab, choose the customer and a date range, and download the statement. You get a freight bill page with totals, amount paid and balance due, followed by every GR in that range. It includes GRs linked to that customer, so always pick the consignor from your customer list.',
  },
];

export default function GrManagementPage() {
  return (
    <ContentPage
      path="/gr-management"
      eyebrow="GR management"
      title="GR Management: Every GR From Booking to Payment"
      intro="BiltyOne manages every goods receipt (GR) after it is created: three-copy printing, booking to delivery status, payment status, instant search, duplicates for repeat loads, and customer statements. One record per load, from the day it is booked to the day it is paid."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'life-cycle', label: 'The GR life cycle in BiltyOne' },
        { id: 'statuses', label: 'Statuses at a glance' },
        { id: 'printing', label: 'Three-copy printing' },
        { id: 'search', label: 'Find any GR in seconds' },
        { id: 'numbering', label: 'Duplicates, edits, deletions and numbering' },
        { id: 'statements', label: 'Customer statements' },
      ]}
      related={['/gr-software', '/transport-billing-software', '/lorry-receipt-software', '/features']}
    >
      <AnswerBox>
        <Strong>GR management</Strong> in BiltyOne means one record per load: once the GR is created, print driver,
        consignor and consignee copies, move it from booked to in transit to delivered, follow its payment, and include it in
        the customer’s statement. Every step is searchable later.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grList} priority />

      <H2 id="life-cycle">The GR life cycle in BiltyOne</H2>
      <OL
        items={[
          <>
            <Strong>Create.</Strong> Pick the consignor, enter route, goods and rate. The GR number and freight fill in (see{' '}
            <A href="/gr-software">GR software</A>).
          </>,
          <>
            <Strong>Print.</Strong> Three A5 copies (driver, consignor, consignee) in one PDF.
          </>,
          <>
            <Strong>Dispatch.</Strong> Record the vehicle, driver, invoice and e-way bill numbers.
          </>,
          <>
            <Strong>Track.</Strong> Update the status from Booked to In Transit to Delivered.
          </>,
          <>
            <Strong>Get paid.</Strong> Mark the payment Paid when the freight arrives.
          </>,
          <>
            <Strong>Bill and archive.</Strong> Include it in the customer’s statement; it stays searchable for good.
          </>,
        ]}
      />

      <H2 id="statuses">Statuses at a glance</H2>
      <DataTable
        caption="GR status, payment status and billing type in BiltyOne"
        headers={['Field', 'Values', 'What it tells you']}
        rows={[
          ['Status', 'Booked, In Transit, Delivered', 'Where the load is'],
          ['Payment status', 'Pending, Paid', 'Whether the freight has been received'],
          ['Billing type', 'Paid, To Pay, To Be Billed', 'Who pays the freight, and when'],
          ['GST paid by', 'Consignor, Consignee, Transporter', 'Who is liable for GST on the freight'],
        ]}
      />
      <P>
        The dashboard rolls these up so you can see loads in transit and pending payments at a glance. Billing types are
        explained in the <A href="/guides/what-is-bilty">bilty guide</A>.
      </P>

      <H2 id="printing">Three-copy printing</H2>
      <P>
        The print button creates a PDF with three identical A5 landscape pages labelled driver copy, consignor copy and
        consignee copy. The header carries your company name, logo, GSTIN, PAN, phone and address; the body shows the GR
        number, date, route, parties, goods, freight, billing and status. Insurance, vehicle and driver, GST and ship-to
        boxes appear only when filled in. Every field on the printed copy is listed on the{' '}
        <A href="/lorry-receipt-software">lorry receipt software</A> page.
      </P>

      <H2 id="search">Find any GR in seconds</H2>
      <P>
        Type the start of a GR number, consignor name, consignee name, vehicle number or city into the search box. Exact
        matches are shown first, then the newest GRs. No more cupboards full of old books.
      </P>

      <H2 id="numbering">Duplicates, edits, deletions and numbering</H2>
      <UL
        items={[
          <>
            <Strong>Duplicate</Strong> a GR for a repeat load: it copies the details, gives a new GR number, sets the status
            to Booked and the date to today. Check the invoice and e-way bill numbers, which are copied too.
          </>,
          <>
            <Strong>Edit</Strong> any detail except the GR number, which is fixed once issued.
          </>,
          <>
            <Strong>Delete</Strong> with confirmation. The GR leaves all lists, statements and exports, and its number is
            never reused, so every gap in your series is explainable.
          </>,
        ]}
      />

      <H2 id="statements">Customer statements</H2>
      <P>
        In the Printing tab, choose a customer and a date range. BiltyOne builds a PDF freight bill: an A4 summary with the
        GR count, booked, in-transit and delivered totals, subtotal, amount paid and balance due, your bank details, and
        signature blocks, followed by one page per GR. Month-end billing takes minutes instead of a day.
      </P>
      <P>
        See all of this with sample data in the <A href="/live-demo">live demo</A>, or read about{' '}
        <A href="/lorry-receipt-software">creating lorry receipts</A>.
      </P>
    </ContentPage>
  );
}
