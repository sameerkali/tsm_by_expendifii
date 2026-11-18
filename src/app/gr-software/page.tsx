import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { ProductVideo } from '@/components/content/ProductVideo';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/gr-software');

// Keywords: "GR software", "GR creation software". Angle: CREATING a GR at
// the booking desk. Life after creation is /gr-management; the printed
// document and its fields are /lorry-receipt-software.
// Behaviour matches CORE_APP_SPEC.md 3.5 (numbering), 7.3-7.6 (form,
// customer linking, auto-create, freight) and 7.12 (duplicate).

const faqs = [
  {
    q: 'What is GR software?',
    a: 'GR software creates goods receipts (GRs) on a computer or phone instead of a paper GR book. BiltyOne numbers each GR automatically, fills in saved customers, calculates freight from the rate and quantity, and prints driver, consignor and consignee copies, so one GR takes under two minutes instead of fifteen.',
  },
  {
    q: 'How long does it take to create a GR in BiltyOne?',
    a: 'Under two minutes for a regular customer. Picking the customer fills their phone, GSTIN, address, pricing type and rate, so you only add the consignee, route, goods and quantity. The GR number and freight fill in automatically. A new customer takes a little longer the first time, then is saved for next time.',
  },
  {
    q: 'What happens if I type a new consignor on a GR?',
    a: 'If the consignor is not in your customer list, enter their phone number, GSTIN and address on the GR. When you create the GR, BiltyOne saves them as a customer and links the GR to them, so next time you just pick their name from the list and everything fills in.',
  },
];

export default function GrSoftwarePage() {
  return (
    <ContentPage
      path="/gr-software"
      eyebrow="GR software"
      title="GR Creation Software for Indian Transporters"
      intro="BiltyOne is GR software built for one job above all: creating a correct goods receipt (GR) fast. Pick the customer and their details fill in, the GR number is automatic, freight is calculated as you type, and three copies print in one click."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'paper-vs-software', label: 'From 15 minutes to under 2' },
        { id: 'how-to', label: 'How a GR is created in BiltyOne' },
        { id: 'numbering', label: 'GR numbers you never think about' },
        { id: 'new-customers', label: 'New customers save themselves' },
        { id: 'repeat-loads', label: 'Repeat loads in seconds' },
        { id: 'checks', label: 'Checks before you save' },
      ]}
      related={['/gr-management', '/lorry-receipt-software', '/bilty-software', '/lr-software']}
    >
      <AnswerBox>
        <Strong>GR creation software</Strong> replaces the GR book at the booking desk. In BiltyOne a GR takes under two
        minutes: choose a saved consignor, add the consignee, route and goods, and the GR number, rate and freight fill in.
        Save, print three copies, and the GR is searchable from then on.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grFormAutofill} priority />

      <H2 id="paper-vs-software">From 15 minutes to under 2</H2>
      <P>Where the time goes when a GR is written by hand, and what BiltyOne does instead:</P>
      <DataTable
        caption="Creating a GR in a paper GR book compared with BiltyOne GR software"
        highlight={2}
        headers={['Step', 'Paper GR book', 'BiltyOne']}
        rows={[
          ['Consignor details', 'Written out in full every time', 'Pick the customer; phone, GSTIN and address fill in'],
          ['GR number', 'Next page of the book', 'Automatic, never reused'],
          ['Rate and freight', 'Looked up, then worked out on a calculator', 'Customer’s rate fills in; freight = rate × quantity'],
          ['Three copies', 'Carbon paper, pressing hard', 'One PDF with all three copies'],
          ['Mistakes', 'Scratched out on all three copies', 'Caught by checks before you save'],
        ]}
      />

      <H2 id="how-to">How a GR is created in BiltyOne</H2>
      <OL
        items={[
          'Open the GR tab and click New Receipt. Today’s date is filled in and the GR number shows “Auto”.',
          <>
            Start typing the consignor’s name and pick them from the list. A <Strong>Customer linked</Strong> badge appears,
            and their phone, GSTIN, address, pricing type and rate fill in. The from city fills in too if it is empty.
          </>,
          'Add the consignee and their GSTIN, and the to city.',
          'Describe the goods and enter the weight or the number of boxes. Freight is calculated as you type.',
          'Choose the billing type (Paid, To Pay or To Be Billed), and add the vehicle, driver, invoice and e-way bill numbers if you have them.',
          'Click Create GR, then print the driver, consignor and consignee copies in one PDF.',
        ]}
      />

      <ProductVideo />

      <H2 id="numbering">GR numbers you never think about</H2>
      <P>
        Every new GR takes the next number in your series, in the form GR-5A9-0001: a short code fixed for your company, then
        a counter. The counter goes up for every GR you create, duplicate or import. Numbers cannot be edited and are never
        reused, even after a deletion, so a gap in the series always means a deliberate deletion, not a missing page.
      </P>
      <P>
        Moving from a paper book? Note the last paper GR number and the first BiltyOne number in your records; the{' '}
        <A href="/guides/paper-gr-book-to-software">paper GR book to software guide</A> explains how.
      </P>

      <H2 id="new-customers">New customers save themselves</H2>
      <P>
        You don’t have to set up every customer before you start. Type a new consignor’s name with their phone number,
        GSTIN and address on the GR, and when you click Create GR, BiltyOne saves them as a customer and links the GR to them.
        Enter a 6-digit pincode and the city and state fill in from India Post data.
      </P>

      <H2 id="repeat-loads">Repeat loads in seconds</H2>
      <P>
        For a load that goes out every week, use the copy icon on an existing GR. The new GR gets the next number, today’s
        date and the status Booked; the parties, goods, rate and freight are copied. Check the invoice and e-way bill numbers
        before printing, because those are copied too.
      </P>

      <H2 id="checks">Checks before you save</H2>
      <UL
        items={[
          'GSTIN fields must be in the correct GSTIN format.',
          'Freight must be more than zero, so a GR can’t be saved without its charge.',
          'Driver mobile numbers must have 10 digits, and vehicle numbers are kept in capitals.',
        ]}
      />
      <P>
        Once the GR exists, everything that happens to it next, from status and payment to search and the customer’s bill,
        is covered under <A href="/gr-management">GR management</A>. Every field on the printed copy is listed on the{' '}
        <A href="/lorry-receipt-software">lorry receipt software</A> page.
      </P>
    </ContentPage>
  );
}
