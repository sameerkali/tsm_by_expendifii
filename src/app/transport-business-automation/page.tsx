import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/transport-business-automation');

// Only tasks BiltyOne actually automates today are listed as automated.

const faqs = [
  {
    q: 'What can be automated in a transport business?',
    a: 'The repetitive office work: numbering GRs, calculating freight, filling in regular customers’ details, looking up city and state from a pincode, printing GR copies, building customer statements, and backing up records. These tasks eat hours every week and are where most paperwork mistakes happen.',
  },
  {
    q: 'Will automation replace my office staff?',
    a: 'It changes their work more than it replaces them. Instead of writing and copying GRs all day, one person can handle bookings, billing and customer calls. Growing transporters often use automation to take on more trucks without hiring more office staff, rather than to cut the team they have.',
  },
  {
    q: 'How much does transport automation software cost?',
    a: 'It ranges from free tools to large ERP projects. BiltyOne automates the core GR, customer and billing work and is currently free for early transporters, with no setup fee. Start there, measure the time saved for a month, and only then decide whether you need anything bigger.',
  },
];

export default function TransportBusinessAutomationPage() {
  return (
    <ContentPage
      path="/transport-business-automation"
      eyebrow="Automation"
      title="Transport Business Automation: What to Automate First"
      intro="Transport business automation means letting software do the repetitive office work: numbering GRs, calculating freight, filling in customer details, printing copies and building bills. Here is what you can automate today with BiltyOne, and what each task used to cost you."
      faqs={faqs}
      toc={[
        { id: 'what-to-automate', label: 'Tasks you can automate today' },
        { id: 'customer-memory', label: 'Stop retyping customers' },
        { id: 'billing', label: 'Automate month-end billing' },
        { id: 'records', label: 'Automate record-keeping' },
        { id: 'not-automated', label: 'What still needs a person' },
      ]}
      related={['/digital-transport-management', '/features', '/transport-company-software', '/guides/paper-gr-book-to-software']}
    >
      <AnswerBox>
        <Strong>Transport business automation</Strong> starts with the tasks you repeat for every load: GR numbering, freight
        calculation, customer details, three-copy printing, customer statements and backups. Software like BiltyOne does
        these automatically, so a GR that took around 15 minutes by hand takes about 2, and month-end billing takes minutes.
      </AnswerBox>

      <H2 id="what-to-automate">Tasks you can automate today</H2>
      <DataTable
        caption="Transport office tasks done by hand compared with automated in BiltyOne"
        highlight={2}
        headers={['Task', 'By hand', 'Automated in BiltyOne']}
        rows={[
          ['GR numbering', 'Track the last number; risk duplicates', 'Next number assigned, never reused'],
          ['Freight', 'Rate × quantity on a calculator', 'Calculated as you type, per KM, box, kg, quintal or ton'],
          ['Customer details', 'Write name, GSTIN and address every time', 'Pick from the list; details and rate fill in'],
          ['New customers', 'Copy into a separate register', 'Saved automatically when the GR is saved'],
          ['City and state', 'Look up or guess', 'Filled from the pincode (India Post data)'],
          ['Three copies', 'Carbon paper', 'One PDF with all three copies'],
          ['Repeat loads', 'Write the whole GR again', 'Duplicate the GR'],
          ['Customer bills', 'Retype GRs into a bill', 'Statement PDF for any date range'],
          ['Backups', 'None', 'Records stored online; Excel backup on demand'],
        ]}
      />

      <H2 id="customer-memory">Stop retyping customers</H2>
      <P>
        In most transport offices, the same twenty or thirty customers account for most loads, yet their names, GSTINs,
        addresses and rates are written out again on every GR. In BiltyOne each customer is saved once, with a default
        pricing type and rate. Picking them fills the GR in, and typing a new consignor saves them for next time.
      </P>

      <H2 id="billing">Automate month-end billing</H2>
      <P>
        Billing account customers is usually the most painful job of the month. Because every GR in BiltyOne already holds
        its freight, billing type and payment status, the Printing tab can build a statement for any customer and period in
        one step: a summary with totals, amount paid and balance due, followed by every GR. See{' '}
        <A href="/transport-billing-software">transport billing software</A> for the details.
      </P>

      <H2 id="records">Automate record-keeping</H2>
      <UL
        items={[
          <>
            <Strong>Every GR is stored</Strong> the moment it is saved, with its status and payment history.
          </>,
          <>
            <Strong>Search replaces filing:</Strong> find a GR by number, party, vehicle or city.
          </>,
          <>
            <Strong>The dashboard</Strong> shows revenue, GRs booked, loads in transit and pending payments without a
            single report being typed.
          </>,
          <>
            <Strong>Backups</Strong> are one click: download every GR as an Excel workbook from Settings.
          </>,
        ]}
      />

      <H2 id="not-automated">What still needs a person</H2>
      <P>
        Software cannot load a truck or negotiate a rate. In BiltyOne you still update a GR’s status when the driver
        reports delivery and mark payments when money arrives; BiltyOne does not track vehicles by GPS or post entries to
        your accounts. Those remain quick manual steps, or jobs for other tools. Everything around them, the writing,
        copying, calculating and filing, is automated.
      </P>
    </ContentPage>
  );
}
