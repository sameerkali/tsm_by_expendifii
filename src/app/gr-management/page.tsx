import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';
import { ProductVideo } from '@/components/content/ProductVideo';

export const metadata: Metadata = buildPageMetadata('/gr-management');

// Behaviour described here matches CORE_APP_SPEC.md sections 7 and 9
// (status, duplicate, delete, numbering, statements).

const faqs = [
  {
    q: 'What is GR creation software?',
    a: 'GR creation software makes goods receipts on a computer or phone instead of a paper GR book. In BiltyOne you pick the consignor, enter the route, goods and rate, and save: the GR number and freight fill in. The same GR record then carries its printing, status, payment and billing, so nothing is retyped.',
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
      eyebrow="GR software"
      title="GR Creation Software: Every GR From Booking to Payment"
      intro="BiltyOne is GR software for Indian transporters. GR creation takes under two minutes, with automatic numbering and freight, and the same record then carries three-copy printing, booking to delivery status, payment status, instant search and customer statements. One record per load, from booking to payment."
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
      related={['/lorry-receipt-software', '/guides/what-is-bilty', '/transport-company-software', '/features']}
    >
      <AnswerBox>
        <Strong>GR creation software</Strong> like BiltyOne gives you one record per load: create the GR with automatic
        numbering and freight, print driver, consignor and consignee copies, move it from booked to in transit to delivered,
        mark it paid, and include it in the customer’s statement. Every step is searchable later.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grList} priority />

      <H2 id="life-cycle">The GR life cycle in BiltyOne</H2>
      <OL
        items={[
          <>
            <Strong>Create.</Strong> Pick the consignor, enter route, goods and rate. The GR number and freight fill in.
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

      <ProductVideo />

      <H2 id="printing">Three-copy printing</H2>
      <P>
        The print button creates a PDF with three identical A5 landscape pages labelled driver copy, consignor copy and
        consignee copy. The header carries your company name, logo, GSTIN, PAN, phone and address; the body shows the GR
        number, date, route, parties, goods, freight, billing and status. Insurance, vehicle and driver, GST and ship-to
        boxes appear only when filled in. Every field on the printed copy is listed on the{' '}
        <A href="/lorry-receipt-software">bilty and LR software</A> page.
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
