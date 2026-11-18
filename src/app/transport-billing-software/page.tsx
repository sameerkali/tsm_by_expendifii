import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/transport-billing-software');

// Keyword: "transport billing software". The deep page on freight billing:
// /transport-company-software links here instead of repeating it.
// Every behaviour matches CORE_APP_SPEC.md sections 7.6 (freight), 9
// (Printing tab) and 11.2 (statement PDF). Don't claim GST filing,
// e-invoicing, ledgers or marking GRs paid from a screen.

const faqs = [
  {
    q: 'What is transport billing software?',
    a: 'Transport billing software turns the GRs a transporter creates into freight bills for customers. It calculates freight on each GR, records who pays and whether they have paid, and builds a customer’s bill for any period from GRs already entered. In BiltyOne that bill is a PDF with the total, amount paid and balance due.',
  },
  {
    q: 'Does the BiltyOne freight bill show what the customer has already paid?',
    a: 'Yes. The first page of every BiltyOne freight bill shows the total amount, the amount already paid and the balance due, and marks the bill Fully Paid or Partially Due. The GR table also shows each GR’s payment status, so the customer can see exactly which loads are still outstanding.',
  },
  {
    q: 'Is the BiltyOne freight bill a GST invoice?',
    a: 'BiltyOne’s freight bill lists every GR with its freight, plus your GSTIN, the amount paid and the balance due. BiltyOne does not file GST returns or generate e-invoices with an IRN. Whether you also need a separate GST tax invoice depends on how your transport services are taxed, so confirm the format with your CA.',
  },
  {
    q: 'Can I give my accountant BiltyOne’s billing data?',
    a: 'Yes. Download every GR as one Excel workbook from Settings, with each GR’s freight amount, billing type and payment status. Your accountant can bring it into their own accounting software. BiltyOne does not keep ledgers or accounts itself, so this export is the link between your transport operations and your books.',
  },
];

export default function TransportBillingSoftwarePage() {
  return (
    <ContentPage
      path="/transport-billing-software"
      eyebrow="Transport billing software"
      title="Transport Billing Software for Freight Bills and Statements"
      intro="BiltyOne is transport billing software for Indian transporters. Freight is calculated on every GR as you create it, every GR records who pays and whether it is paid, and one download turns a customer’s GRs into a freight bill with the total, amount paid and balance due."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'problem', label: 'Why billing goes wrong in a transport office' },
        { id: 'freight', label: 'Freight that matches the rate you agreed' },
        { id: 'billing-types', label: 'Paid, To Pay and To Be Billed' },
        { id: 'freight-bill', label: 'What is on a BiltyOne freight bill' },
        { id: 'month-end', label: 'Month-end billing in three steps' },
        { id: 'outstanding', label: 'Knowing what is still unpaid' },
        { id: 'not-included', label: 'What BiltyOne billing does not do' },
      ]}
      related={['/transport-company-software', '/gr-management', '/pricing', '/logistics-glossary']}
    >
      <AnswerBox>
        <Strong>Transport billing software</Strong> builds customer bills from the GRs you already create, so nothing is
        typed twice. In BiltyOne, freight on each GR is rate × quantity, each GR records who pays (Paid, To Pay or To Be
        Billed) and whether it is paid, and one download turns a customer’s GRs for any period into a freight bill.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.freightBillExport} priority />

      <H2 id="problem">Why billing goes wrong in a transport office</H2>
      <P>Most billing mistakes in road transport come from the same few places:</P>
      <UL
        items={[
          <>
            <Strong>Retyping.</Strong> Each load is written once in the GR book and again on the bill, so every mistake gets
            two chances.
          </>,
          <>
            <Strong>Freight arithmetic.</Strong> Rate × weight worked out on a calculator, slightly differently by each person
            at the desk.
          </>,
          <>
            <Strong>Forgotten To Pay freight.</Strong> A load is delivered, the freight was meant to be collected on delivery,
            and nobody notices it wasn’t until month end.
          </>,
          <>
            <Strong>The month-end rush.</Strong> Contract customers on To Be Billed accounts expect one bill covering dozens
            of GRs.
          </>,
          <>
            <Strong>Disputes.</Strong> A customer questions the bill, and nobody can quickly show which GRs it covers.
          </>,
        ]}
      />

      <H2 id="freight">Freight that matches the rate you agreed</H2>
      <P>
        In BiltyOne, freight is rate × quantity, rounded to two decimals and calculated as you type. It cannot be typed over
        by hand, so the freight on the bill always follows from the rate on the GR. Pick a saved customer and their default
        pricing type and rate fill in, so the rate is the one you agreed with them, not the one the clerk remembers.
      </P>
      <P>
        Freight can be priced per KM, box, kg, quintal or ton. The full pricing table is on the{' '}
        <A href="/lorry-receipt-software">lorry receipt software</A> page.
      </P>

      <H2 id="billing-types">Paid, To Pay and To Be Billed</H2>
      <P>
        Every GR carries one of the three billing types used in Indian road transport. It prints as a badge on all three
        copies, so the booking office, the driver and the delivery end all know who pays.
      </P>
      <DataTable
        caption="How BiltyOne handles the three freight billing types"
        headers={['Billing type', 'Who pays the freight', 'When', 'What BiltyOne does']}
        rows={[
          ['Paid', 'Consignor', 'At booking', 'Prints a PAID badge on every copy'],
          ['To Pay', 'Consignee', 'On delivery', 'Prints a TO PAY badge, so the delivery end knows to collect'],
          [
            'To Be Billed (TBB)',
            'The customer, usually the consignor',
            'Later, usually monthly',
            'Prints a TO BE BILLED badge; the GR goes into that customer’s freight bill',
          ],
        ]}
      />

      <H2 id="freight-bill">What is on a BiltyOne freight bill</H2>
      <P>The first page is an A4 freight bill. It contains:</P>
      <UL
        items={[
          'Your logo, company name, GSTIN and phone, with the title “Freight Bill” and a bill reference.',
          'Bill To: the customer’s name and phone.',
          'Bill details: the bill date, total GRs, and a payment status of Fully Paid or Partially Due.',
          'The GR period, and a count of GRs booked, in transit, delivered and with payment pending.',
          'A table of every GR: GR number, date, from, to, description, weight, boxes, billing type, freight, payment and status.',
          'Subtotal freight, total amount, amount paid and balance due.',
          'Your bank details, if they are in your company profile, and signature blocks for you and the customer.',
        ]}
      />
      <P>
        Every GR in the period then follows on its own A5 page, newest first, so the customer can check each load against
        the bill before paying.
      </P>

      <H2 id="month-end">Month-end billing in three steps</H2>
      <OL
        items={[
          'Open the Printing tab and pick the customer.',
          'Choose the start date and, if you want, an end date. Leave the end date empty to include everything up to today.',
          'Click Download Statement. The freight bill PDF downloads straight away.',
        ]}
      />
      <P>
        Only GRs linked to that customer are included, so always pick the consignor from your customer list when you create
        a GR. Old GRs can be imported from Excel first; imported GRs whose consignor has a GSTIN are linked to that customer.
      </P>

      <H2 id="outstanding">Knowing what is still unpaid</H2>
      <P>
        Every GR shows a payment status, Pending or Paid, in the GR list. The dashboard shows your outstanding amount at a
        glance, and each customer’s freight bill shows their balance due. Together they answer the question every owner asks
        at month end: who still owes us, and for which loads?
      </P>

      <H2 id="not-included">What BiltyOne billing does not do</H2>
      <P>
        BiltyOne handles freight billing for your GRs. It does not file GST returns, generate e-invoices with an IRN, keep
        ledgers or accounts, reconcile bank payments or collect payments online. Download your GRs to Excel for your
        accountant, or compare <A href="/transport-erp-software">transport ERP software</A> if you need accounting in the
        same product.
      </P>
    </ContentPage>
  );
}
