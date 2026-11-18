import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, Callout, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/guides/paper-gr-book-to-software');

// Import rules mirror CORE_APP_SPEC.md 10.5 / 12.2 (required columns,
// all-or-nothing validation). Keep in sync if the importer changes.

const faqs = [
  {
    q: 'Do I have to enter all my old paper GRs into the software?',
    a: 'No. Most transporters start fresh from a chosen date and keep the old books as an archive. Import only what you will actually look up: your customer list, and perhaps GRs that are still unpaid or from the current financial year. Enter those in Excel first, then upload them in one go.',
  },
  {
    q: 'Can I continue my paper GR numbering in BiltyOne?',
    a: 'BiltyOne numbers GRs in its own sequence, for example GR-5A9-0001, and you cannot set a custom starting number. To keep both series traceable, write the last paper GR number and the first BiltyOne GR number on the inside cover of your final paper book and in your records.',
  },
  {
    q: 'Why did my Excel import fail?',
    a: 'The import is all-or-nothing: if any row has a problem, nothing is imported. Delete the template’s notes row (row 2) and sample rows, then check every row has From City, To City, a Pricing Type of BOX, KM, KG, QUINTAL or TON, and a Freight Amount, with the headers unchanged.',
  },
  {
    q: 'How do I convince older staff to use software?',
    a: 'Show, do not tell. Let them watch one GR being made and printed in under two minutes, then sit with them while they make their own. Keep the paper book available for the first week so nobody feels forced, and put the person who writes the most GRs in charge of the switch.',
  },
];

export default function PaperToSoftwareGuidePage() {
  return (
    <ContentPage
      path="/guides/paper-gr-book-to-software"
      eyebrow="Guide"
      title="How to Move From a Paper GR Book to Software in One Week"
      intro="You can move a transport office from paper GR books or Excel registers to software in about a week, without stopping work. This guide gives a day-by-day plan, shows how to bring old records across, and covers the questions staff usually ask."
      faqs={faqs}
      toc={[
        { id: 'before', label: 'Before you start' },
        { id: 'plan', label: 'The one-week plan' },
        { id: 'import', label: 'Bringing old records across' },
        { id: 'staff', label: 'Getting staff on board' },
        { id: 'after', label: 'What changes after the switch' },
      ]}
      related={['/digital-transport-management', '/transport-software-small-business', '/guides/how-to-choose-transport-management-software', '/transport-business-automation']}
    >
      <AnswerBox>
        To move from a <Strong>paper GR book to software</Strong>: set up your company profile and logo, add or import your
        regular customers, run the software alongside the paper book for a few days, train staff on real bookings, then
        switch fully and keep the old books as an archive. Most offices finish within a week.
      </AnswerBox>

      <H2 id="before">Before you start</H2>
      <UL
        items={[
          'Pick a start date, ideally the 1st of a month, so billing periods are clean.',
          'List your regular customers with their GSTIN, phone, city and usual rate.',
          'Decide which old records you really need in the software (usually unpaid GRs and the current year).',
          'Check the printer next to the booking desk works and has paper.',
          'Choose one person to own the switch: normally whoever writes the most GRs.',
        ]}
      />

      <H2 id="plan">The one-week plan</H2>
      <H3>Day 1: set up the company</H3>
      <P>
        <A href="/register">Create your BiltyOne account</A> with your company name, GSTIN, PAN, address and bank details,
        and upload your logo in Settings. Create one test GR and print it. Compare it with a page from your paper book.
      </P>
      <H3>Day 2: add customers</H3>
      <P>
        Add your 10 to 20 most frequent customers with their GSTIN and usual rate. Typing the pincode fills in the city and
        state. If you import old GRs (below), consignors that have a GSTIN are added to your customer list automatically.
      </P>
      <H3>Days 3 and 4: run both side by side</H3>
      <P>
        Make every new GR in BiltyOne and keep writing the paper book too. It feels like double work, but it builds
        confidence and catches anything you have missed in setup.
      </P>
      <H3>Day 5: first statement</H3>
      <P>
        In the Printing tab, produce a statement for one account customer covering the GRs entered so far. Check the totals.
        Then download a full Excel backup from Settings so you know where it is.
      </P>
      <H3>Days 6 and 7: switch</H3>
      <P>
        Stop writing new paper GRs. Write the last paper GR number and the first BiltyOne GR number on the inside cover of
        the final book. File the old books as your archive.
      </P>

      <H2 id="import">Bringing old records across</H2>
      <P>BiltyOne’s Excel import (Settings, Bulk Data Import) brings GRs in from a spreadsheet:</P>
      <OL
        items={[
          'Download the Excel migration template from Settings.',
          'Fill in the All GR Records sheet, one GR per row, without changing the headers. Delete the two sample rows and the notes row (row 2) under the headers.',
          'Make sure every row has From City, To City, Pricing Type and Freight Amount; the other columns are optional.',
          'Save and upload the file (XLSX or CSV, up to 5 MB).',
        ]}
      />
      <DataTable
        caption="Required and optional columns in the BiltyOne Excel import"
        headers={['Column', 'Required?', 'Notes']}
        rows={[
          ['From City, To City', 'Yes', 'Plain text'],
          ['Pricing Type', 'Yes', 'BOX, KM, KG, QUINTAL or TON'],
          ['Freight Amount', 'Yes', 'A number'],
          ['Booking Date', 'Recommended', 'If empty, the import date is used'],
          ['Billing Type', 'Optional', 'PAID, TO_PAID or TO_BE_BILLED; defaults to TO_PAID'],
          ['Payment Status, Status', 'Optional', 'Default to PENDING and BOOKED'],
          ['Everything else', 'Optional', 'Consignor, consignee, GST numbers, goods, vehicle, driver, invoice, e-way bill, insurance, remarks'],
        ]}
      />
      <Callout>
        <Strong>Important:</Strong> the import is all-or-nothing. If even one row is missing a required value, nothing is
        imported. If an upload fails, first make sure the template’s notes row (row 2) is deleted, then check those four required columns on every row. Imported GRs get BiltyOne GR
        numbers in the order of your file.
      </Callout>

      <H2 id="staff">Getting staff on board</H2>
      <UL
        items={[
          <>
            <Strong>Start with the win.</Strong> Show a GR printed in under two minutes with the freight already calculated.
          </>,
          <>
            <Strong>Use real work.</Strong> Train on today’s bookings, not made-up examples.
          </>,
          <>
            <Strong>Keep a safety net.</Strong> The paper book stays on the desk for the first week.
          </>,
          <>
            <Strong>Make one person the expert.</Strong> Others ask them first, which builds confidence quickly.
          </>,
          <>
            <Strong>Let them explore.</Strong> The <A href="/live-demo">live demo</A> has sample data, so nobody worries
            about breaking anything.
          </>,
        ]}
      />

      <H2 id="after">What changes after the switch</H2>
      <DataTable
        caption="Transport office work before and after moving from a paper GR book to software"
        highlight={2}
        headers={['', 'Paper GR book', 'BiltyOne']}
        rows={[
          ['Writing a GR', '15 minutes, three carbon copies', 'About 2 minutes, three printed copies'],
          ['Freight', 'Calculated by hand', 'Calculated automatically'],
          ['Finding last year’s GR', 'Search the cupboard', 'Search by number, party, vehicle or city'],
          ['Month-end billing', 'Hours of retyping', 'A statement PDF per customer'],
          ['If the office floods', 'Records lost', 'Records stored online, plus an Excel backup'],
        ]}
      />
      <P>
        For a fuller comparison, see <A href="/digital-transport-management">paper vs Excel vs transport software</A>.
      </P>
    </ContentPage>
  );
}
