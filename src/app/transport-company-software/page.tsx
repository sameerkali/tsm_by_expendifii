import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/transport-company-software');

// Keywords: "transport company software", "transport business software".
// Organised by the real jobs in a transport office.

const faqs = [
  {
    q: 'What is the best software for a transport company in India?',
    a: 'The best software is the one your staff will use every day. For an Indian transport company it should create and print GR/LR fast, save customer details, calculate freight, track delivery and payment status, produce customer statements and export to Excel. BiltyOne does all of this and is free to start.',
  },
  {
    q: 'Can transport company software handle To Pay and To Be Billed GRs?',
    a: 'Yes. In BiltyOne every GR has a billing type: Paid (freight collected at booking), To Pay (collected from the consignee on delivery) or To Be Billed (billed to the customer later). Each GR also has a payment status, so you always know which freight is still outstanding and from whom.',
  },
  {
    q: 'Can I bring my existing customer list and old GRs into BiltyOne?',
    a: 'Yes. Download the Excel template from Settings, fill in your past GRs one per row, and upload it. Consignors with a GSTIN are added to your customer list automatically. From city, to city, pricing type and freight amount are the only required columns, so even a simple old register can be imported.',
  },
  {
    q: 'Will our company name and GSTIN print on every GR?',
    a: 'Yes. The company name, logo, GSTIN, PAN, phone and full address you enter in your company profile print at the top of every GR copy and on customer statements. Update the profile once and every future printout uses the new details, so your letterhead is always consistent.',
  },
  {
    q: 'Is BiltyOne suitable for transport agents and booking offices?',
    a: 'Yes. Anyone who books loads and issues GRs can use BiltyOne, whether you own trucks, hire them, or run a booking office for several fleet owners. Record the vehicle and driver on each GR, and use box pricing for parcel and part-load bookings or KM and weight pricing for full loads.',
  },
];

export default function TransportCompanySoftwarePage() {
  return (
    <ContentPage
      path="/transport-company-software"
      eyebrow="For transport companies"
      title="Transport Company Software for Indian Transporters"
      intro="BiltyOne is transport company software that runs the daily work of a transport office in one place: bookings and GR/LR, customer accounts, delivery status and freight bills. It is built for transport companies, transport agencies and fleet owners across India."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'daily-work', label: 'Where software helps a transport company' },
        { id: 'people', label: 'Built around the people in your office' },
        { id: 'business-types', label: 'For every kind of transport business' },
        { id: 'features', label: 'Features transport companies use most' },
        { id: 'switching', label: 'Moving your company to BiltyOne' },
        { id: 'not-included', label: 'What BiltyOne does not do' },
      ]}
      related={[
        '/transport-management-system-for-small-business',
        '/transport-erp-software',
        '/features',
        '/guides/paper-gr-book-to-software',
      ]}
    >
      <AnswerBox>
        <Strong>Transport company software</Strong>, also called transport business software, replaces the GR book, the
        customer register and the billing spreadsheet with one system. Bookings become GRs with automatic numbers and
        freight, copies print in one click, every load’s status and payment is tracked, and customer bills are built from
        GRs you already entered.
      </AnswerBox>

      <H2 id="daily-work">Where software helps a transport company</H2>
      <P>Here is a typical day in a transport office, before and after BiltyOne:</P>
      <DataTable
        caption="Transport company tasks on paper or Excel compared with BiltyOne"
        highlight={2}
        headers={['Task', 'Paper book / Excel', 'In BiltyOne']}
        rows={[
          ['Taking a booking', 'Note it in a register, then copy it into the GR book', 'Pick the customer; details fill in'],
          ['Writing the GR', '20+ fields by hand, three carbon copies', 'Under 2 minutes, three copies printed together'],
          ['GR numbering', 'Kept by hand; gaps and duplicates happen', 'Automatic, unique and never reused'],
          ['Freight', 'Calculated on paper or a calculator', 'Rate × quantity, calculated as you type'],
          ['“Where is my maal?”', 'Phone the driver', 'Check the GR status: booked, in transit, delivered'],
          ['Month-end billing', 'Type up each customer’s GRs again', 'Statement PDF for any customer and date range'],
          ['Pending payments', 'Remember or search the books', 'Payment status on every GR'],
          ['Finding an old GR', 'Search through stacks of books', 'Search by GR number, party, vehicle or city'],
          ['Keeping records safe', 'Shelves, cupboards and luck', 'Stored online, with a full Excel backup'],
        ]}
      />

      <H2 id="people">Built around the people in your office</H2>
      <H3>The owner</H3>
      <P>
        The dashboard shows revenue, GRs booked, loads in transit and outstanding payments. Because BiltyOne runs{' '}
        <A href="/online-transport-management-software">online</A>, you can check any GR or customer from home or on the
        road, without phoning the office.
      </P>
      <H3>The booking clerk</H3>
      <P>
        Regular customers are saved once and chosen from a list. The GR number and freight are filled in automatically, the
        pincode fills the city and state, and the three copies print together. A GR that took 15 minutes by hand takes a
        couple of minutes.
      </P>
      <H3>The accounts person</H3>
      <P>
        Every GR carries a billing type (Paid, To Pay, To Be Billed) and a payment status. At month end, the Printing tab
        turns a customer’s GRs into a freight bill with totals, amount paid and balance due. The full Excel backup goes
        straight to your CA.
      </P>
      <H3>The driver</H3>
      <P>
        A clean, printed driver copy with the GR number, route, consignor, consignee, goods, vehicle number, invoice and
        e-way bill numbers. No smudged carbon, no missing details at a checkpost.
      </P>

      <H2 id="business-types">Transport business software for every kind of transport business</H2>
      <UL
        items={[
          <>
            <Strong>Full-truckload transporters</Strong> pricing by KM, weight, quintal or ton.
          </>,
          <>
            <Strong>Part-load and parcel booking offices</Strong> pricing by box or package.
          </>,
          <>
            <Strong>Fleet owners</Strong> who run their own trucks and book directly with factories and traders.
          </>,
          <>
            <Strong>Transport agents and brokers</Strong> who book loads on hired vehicles and issue their own GRs.
          </>,
          <>
            <Strong>Tempo and mini-truck operators</Strong> doing local and intercity deliveries.
          </>,
          <>
            <Strong>Contract transporters</Strong> serving regular factory customers on monthly “to be billed” accounts.
          </>,
        ]}
      />
      <P>
        Running a small operation? See our page on the{' '}
        <A href="/transport-management-system-for-small-business">transport management system for small business</A>.
      </P>

      <H2 id="features">Features transport companies use most</H2>
      <UL
        items={[
          'GR / LR (bilty) creation with every field a transporter needs: parties with GSTIN, goods, weight or boxes, declared value, vehicle and driver, invoice and e-way bill numbers, insurance and remarks.',
          'Automatic GR numbers and freight calculation per KM, box, kg, quintal or ton.',
          'Three-copy print (driver, consignor, consignee) with your logo, GSTIN, PAN and address.',
          'Customer directory with default pricing and pincode lookup.',
          'Duplicate a GR for repeat loads.',
          'Booking, in-transit and delivered status, and pending or paid payment status.',
          'Customer freight statements for any date range.',
          'Excel / CSV import and one-click Excel backup.',
          'Analytics dashboard.',
          'BiltyOne Desktop for offline work on Windows.',
        ]}
      />
      <P>
        Full details are on the <A href="/features">features page</A> and the <A href="/product">product tour</A>.
      </P>

      <H2 id="switching">Moving your transport company to BiltyOne</H2>
      <OL
        items={[
          <>
            <A href="/register">Create your company account</A> with your GSTIN, PAN, address and bank details.
          </>,
          'Upload your logo in Settings so it prints on every GR.',
          'Add your regular customers, and import old GRs from Excel if you want them in the system.',
          'Run BiltyOne alongside the paper book for a week while staff get comfortable.',
          'Switch fully. Keep the Excel backup as your archive.',
        ]}
      />
      <P>
        The full plan, with tips for training staff, is in{' '}
        <A href="/guides/paper-gr-book-to-software">how to move from a paper GR book to software</A>.
      </P>

      <H2 id="not-included">What BiltyOne does not do</H2>
      <P>
        Being clear about this saves you time. BiltyOne is a focused transport management system, so it does not offer
        live GPS tracking, route planning, accounting or GST return filing, payroll, or fleet maintenance. It records the
        e-way bill number on each GR, but you generate the e-way bill on the GST portal. If you need all of these in one
        product, compare <A href="/transport-erp-software">transport ERP software</A>; many transporters use BiltyOne for
        operations and their existing accounting software for the books.
      </P>
    </ContentPage>
  );
}
