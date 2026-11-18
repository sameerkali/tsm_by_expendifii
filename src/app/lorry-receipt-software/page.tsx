import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/lorry-receipt-software');

// Every field and check below matches the GR form and PDF layout in
// CORE_APP_SPEC.md (sections 3.3, 7.6, 11.1, 13.1).

const faqs = [
  {
    q: 'What is lorry receipt software?',
    a: 'Lorry receipt software creates, prints and stores LRs (also called GRs or bilty) on a computer or phone instead of a carbon book. Good LR software numbers each receipt automatically, calculates freight, fills in regular customers, prints all copies with your letterhead and keeps every LR searchable for years.',
  },
  {
    q: 'Is BiltyOne lorry receipt software free?',
    a: 'Yes. BiltyOne is free for early transporters, including unlimited LR creation and printing, customer records and statements. No credit card is needed to sign up. If paid plans are introduced later, existing users will get fair notice, and you can export all your GRs to Excel at any time.',
  },
  {
    q: 'Can I print lorry receipts on my existing printer?',
    a: 'Yes. BiltyOne produces each lorry receipt as a PDF with three A5 landscape pages, labelled driver copy, consignor copy and consignee copy. Print it on any normal office printer, or save the PDF to share or print later. No special stationery or pre-printed forms are needed.',
  },
  {
    q: 'Can I create a lorry receipt without internet?',
    a: 'Yes, with BiltyOne Desktop for Windows. After a one-time online activation it creates, prints and searches lorry receipts with no internet connection. The regular BiltyOne web app needs internet but works on any device with a browser, including phones.',
  },
];

export default function LorryReceiptSoftwarePage() {
  return (
    <ContentPage
      path="/lorry-receipt-software"
      eyebrow="Lorry receipt software"
      title="Lorry Receipt Software: Every LR Field, Printed in 3 Copies"
      intro="BiltyOne lorry receipt software creates a complete LR with every field a transporter needs, calculates the freight by KM, box, kg, quintal or ton, checks the details before saving, and prints the driver, consignor and consignee copies with your company details."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'what-it-does', label: 'What BiltyOne does for your lorry receipts' },
        { id: 'fields', label: 'Every field on a BiltyOne lorry receipt' },
        { id: 'how-to', label: 'How to create a lorry receipt' },
        { id: 'freight', label: 'Freight calculation' },
        { id: 'checks', label: 'Checks that prevent mistakes' },
        { id: 'vs-paper', label: 'LR software vs a paper LR book' },
      ]}
      related={['/lr-software', '/bilty-software', '/gr-software', '/guides/gr-vs-lr-vs-eway-bill']}
    >
      <AnswerBox>
        <Strong>Lorry receipt software</Strong> replaces the carbon LR book. In BiltyOne you pick a saved customer, enter the
        route, goods and rate, and save: the LR number and freight are filled in, and one click prints driver, consignor and
        consignee copies with your logo, GSTIN, PAN and address. Every LR stays searchable.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grCreateForm} priority />

      <H2 id="what-it-does">What BiltyOne does for your lorry receipts</H2>
      <UL
        items={[
          <>
            <Strong>Automatic LR numbers.</Strong> Each new LR gets the next number in your series. Numbers are never reused,
            even after a deletion, so your records stay audit-friendly.
          </>,
          <>
            <Strong>Automatic freight.</Strong> Rate × quantity, priced per KM, box, kg, quintal or ton.
          </>,
          <>
            <Strong>Customer auto-fill.</Strong> Choose a saved consignor and their details and default pricing fill in. A
            new consignor is saved automatically when you save the LR.
          </>,
          <>
            <Strong>Three-copy print.</Strong> One PDF with driver, consignor and consignee copies on A5 landscape.
          </>,
          <>
            <Strong>Your letterhead.</Strong> Company name, logo, GSTIN, PAN, phone and address on every copy, from your
            company profile.
          </>,
          <>
            <Strong>Duplicate for repeat loads.</Strong> Copy an existing LR to a new one with a fresh number and today’s
            date.
          </>,
          <>
            <Strong>Search.</Strong> Find any LR by its number, consignor, consignee, vehicle number or city.
          </>,
          <>
            <Strong>Statements.</Strong> Turn a customer’s LRs for any period into a freight bill PDF.
          </>,
        ]}
      />

      <H2 id="fields">Every field on a BiltyOne lorry receipt</H2>
      <DataTable
        caption="Fields on a BiltyOne lorry receipt, grouped by section"
        headers={['Section', 'Fields']}
        rows={[
          ['Header', 'Your company name, logo, GSTIN, PAN, phone and address; LR number, date, from and to city'],
          ['Parties', 'Consignor and consignee with GSTIN; ship-to address; door delivery'],
          ['Goods', 'Description, number of packages, weight, declared value'],
          ['Charges', 'Pricing type, rate, freight, billing type (paid / to pay / to be billed), payment status, GST paid by'],
          ['Trip', 'Vehicle number, driver name, driver mobile, licence or ID number, status'],
          ['Documents', 'Invoice number, e-way bill number'],
          ['Insurance', 'Company, policy number, date, amount and risk'],
          ['Other', 'Remarks; copy label (driver, consignor or consignee)'],
        ]}
      />
      <P>
        Optional sections such as insurance, vehicle and driver, and remarks only print when you fill them in, so a simple LR
        stays clean. For what each field means, see <A href="/guides/what-is-bilty">what is a bilty</A>.
      </P>
      <P>
        Issuing many LRs a day at a booking counter? See <A href="/lr-software">LR software</A> for booking offices. Still
        writing a bilty book? See <A href="/bilty-software">bilty software</A>. After the LR is saved, status, payment,
        search and billing are covered under <A href="/gr-management">GR management</A>.
      </P>

      <H2 id="how-to">How to create a lorry receipt in BiltyOne</H2>
      <OL
        items={[
          <>
            <A href="/register">Sign up free</A> with your company details; they print on every copy.
          </>,
          'Open the GR tab and start a new GR (LR).',
          'Choose the consignor from your customers, or type a new one.',
          'Enter the consignee, from and to city, goods, and weight or number of boxes.',
          'Pick the pricing type and rate; the freight is calculated as you type.',
          'Add vehicle, driver, invoice and e-way bill numbers if you have them, then save and print.',
        ]}
      />

      <H2 id="freight">Freight calculation</H2>
      <P>BiltyOne calculates freight as rate × quantity, rounded to two decimals, using the pricing type you choose:</P>
      <DataTable
        caption="BiltyOne freight pricing types"
        headers={['Pricing type', 'Typical use', 'Quantity used']}
        rows={[
          ['Per KM', 'Full-truck trips priced by distance', 'Distance'],
          ['Per box', 'Parcel and part-load bookings', 'Number of boxes'],
          ['Per kg', 'Light or mixed goods', 'Weight in kg'],
          ['Per quintal', 'Grain, produce and bulk goods', 'Quintals'],
          ['Per ton', 'Heavy full loads', 'Tons'],
        ]}
      />

      <H2 id="checks">Checks that prevent mistakes</H2>
      <UL
        items={[
          'GSTIN fields are checked for the correct GSTIN format before you can save.',
          'Driver mobile numbers must have 10 digits; vehicle numbers are kept in capitals.',
          'From and to city are required, and freight must be above zero.',
          'When adding a customer, a 6-digit pincode fills in the city and state from India Post data.',
        ]}
      />

      <H2 id="vs-paper">LR software vs a paper LR book</H2>
      <DataTable
        caption="BiltyOne lorry receipt software compared with a paper LR book"
        highlight={2}
        headers={['', 'Paper LR book', 'BiltyOne']}
        rows={[
          ['Time per LR', 'Around 15 minutes', 'About 2 minutes'],
          ['Copies', 'Carbon, often faint', 'Three clean printed copies'],
          ['Numbering', 'By hand', 'Automatic, never reused'],
          ['Freight', 'Calculated by hand', 'Automatic'],
          ['Finding an old LR', 'Search the books', 'Instant search'],
          ['Billing customers', 'Retype every LR', 'Statement PDF'],
          ['Risk of loss', 'Rain, fire, misplacement', 'Stored online, with Excel backup'],
        ]}
      />
      <P>
        Working where the internet drops? <A href="/desktop">BiltyOne Desktop</A> creates and prints LRs offline on Windows.
      </P>
    </ContentPage>
  );
}
