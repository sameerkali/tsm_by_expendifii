import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/transport-management-system');

// Primary keyword: "transport management system". Informational intent, so
// this is a complete guide first and a product page second.

const faqs = [
  {
    q: 'What does TMS stand for in transport?',
    a: 'TMS stands for transport management system (also called transportation management system). It is software that records, tracks and bills the movement of goods. In Indian road transport, a TMS is mainly used to create GR/LR (bilty), keep customer records, track delivery status and produce freight bills.',
  },
  {
    q: 'Is a transport management system only for large logistics companies?',
    a: 'No. Enterprise TMS products are built for large shippers, but simpler transport management systems exist for small and mid-size transporters. A transporter with even one or two trucks benefits from automatic GR numbers, printed copies, saved customer details and a searchable record of every load.',
  },
  {
    q: 'What is the difference between a TMS and a WMS?',
    a: 'A TMS manages goods while they move: bookings, transport documents, vehicles, delivery and freight billing. A WMS (warehouse management system) manages goods while they are stored: receiving, storage locations, picking and stock levels. Transporters need a TMS; warehouses and distributors need a WMS, and large logistics firms use both.',
  },
  {
    q: 'Does a transport management system include GPS tracking?',
    a: 'Not always. Some transport management systems connect to GPS devices for live vehicle location; many, including BiltyOne, track each load by status (booked, in transit, delivered) instead. If you need live location, a GPS device or app can run alongside your TMS, which handles documents and billing.',
  },
  {
    q: 'Can a TMS generate e-way bills?',
    a: 'Some can, through integration with the GST e-way bill system. BiltyOne records the e-way bill number on each GR, so it prints on every copy and stays with the GR record; you generate the e-way bill itself on the official GST e-way bill portal.',
  },
];

export default function TransportManagementSystemPage() {
  return (
    <ContentPage
      path="/transport-management-system"
      eyebrow="Guide"
      title="Transport Management System (TMS): A Practical Guide for India"
      intro="A transport management system (TMS) is software that records, tracks and bills the movement of goods. This guide explains how a TMS works for Indian road transport, which features matter, how it compares with ERP and Excel, and how to choose one."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'what-is-a-tms', label: 'What is a transport management system?' },
        { id: 'how-it-works', label: 'How a TMS works: the life of one load' },
        { id: 'features', label: 'Core features of a transport management system' },
        { id: 'types', label: 'Types of transport management systems' },
        { id: 'why-india', label: 'Why Indian transporters need a TMS' },
        { id: 'tms-vs-erp-vs-excel', label: 'TMS vs transport ERP vs Excel' },
        { id: 'how-to-choose', label: 'How to choose a transport management system' },
        { id: 'biltyone', label: 'Where BiltyOne fits' },
      ]}
      related={[
        '/online-transport-management-software',
        '/transport-management-system-for-small-business',
        '/transport-erp-software',
        '/guides/how-to-choose-transport-management-software',
      ]}
    >
      <AnswerBox>
        A <Strong>transport management system (TMS)</Strong> is software that helps a transport business record, track and
        bill the movement of goods. For Indian road transporters, its core is the GR/LR (bilty): creating and printing it,
        keeping customer details, following each load from booking to delivery, and billing customers for freight.
      </AnswerBox>

      <H2 id="what-is-a-tms">What is a transport management system?</H2>
      <P>
        A transport management system is the software a transport business uses instead of paper registers and
        spreadsheets to run its daily operations. It holds every booking, the transport document issued for it, the
        vehicle and driver that carried it, its delivery status and the money owed for it, in one place that the whole
        office can search.
      </P>
      <P>
        The term covers two quite different kinds of product. Large manufacturers and retailers use a <em>shipper</em> TMS to
        plan shipments and choose carriers. Transport companies, fleet owners and booking agents, the businesses that
        actually move the goods, need a <em>transporter</em> TMS built around their own documents: in India that means the
        GR, LR or bilty. This guide is about the second kind.
      </P>

      <H2 id="how-it-works">How a TMS works: the life of one load</H2>
      <P>Follow a single consignment through a transport office and you see everything a TMS has to handle:</P>
      <OL
        items={[
          <>
            <Strong>Booking.</Strong> The customer (consignor) books a load: goods, weight or number of packages, from and to
            city, and who will receive it (consignee). A TMS fills in a regular customer’s details automatically.
          </>,
          <>
            <Strong>GR / LR issued.</Strong> The transporter issues a goods receipt (GR), also called a lorry receipt (LR) or
            bilty. The TMS gives it the next GR number, calculates freight from the rate, and prints copies for the driver,
            consignor and consignee.
          </>,
          <>
            <Strong>Dispatch.</Strong> The vehicle number, driver details, invoice number and e-way bill number are recorded
            against the GR, so everything about the trip sits in one record.
          </>,
          <>
            <Strong>In transit and delivery.</Strong> The load’s status moves from booked to in transit to delivered, so
            anyone in the office can answer “where is my maal?” without phoning the driver.
          </>,
          <>
            <Strong>Billing.</Strong> Freight is collected on the spot (paid), at delivery (to pay) or billed later (to be
            billed). A TMS turns the GRs for a customer and period into a freight bill or statement.
          </>,
          <>
            <Strong>Payment and records.</Strong> Payment status is marked when money arrives, and every GR stays searchable
            by number, party, vehicle or city for disputes, audits and repeat bookings.
          </>,
        ]}
      />

      <H2 id="features">Core features of a transport management system</H2>
      <P>These are the features that matter for a road transporter, in rough order of how often you will use them.</P>
      <DataTable
        caption="Core features of a transport management system and why they matter"
        headers={['Feature', 'What it does', 'Why it matters']}
        rows={[
          ['GR / LR creation', 'Builds the consignment note with all parties, goods, route and charges', 'The document every load needs; replaces the carbon GR book'],
          ['Automatic numbering', 'Gives each GR the next unique number', 'No duplicate or skipped numbers, no arguments later'],
          ['Freight calculation', 'Rate × quantity per KM, box, kg, quintal or ton', 'Removes arithmetic mistakes on every GR'],
          ['Customer master', 'Saves consignor details, GSTIN and default pricing', 'Regular customers are filled in with one click'],
          ['Printing', 'Prints driver, consignor and consignee copies', 'Clean, readable copies with your letterhead'],
          ['Status tracking', 'Booked, in transit, delivered', 'Answer customer calls without phoning drivers'],
          ['Billing and statements', 'Freight bill for a customer and date range', 'Month-end billing in minutes, not days'],
          ['Payment tracking', 'Paid or pending per GR', 'See who owes you money at a glance'],
          ['Search and records', 'Find any GR by number, party, vehicle or city', 'Years of records, instantly'],
          ['Import and export', 'Bring in Excel data; download full backups', 'Easy switch in, no lock-in out'],
          ['Offline access', 'Keeps working without internet', 'Essential in yards and towns with weak connectivity'],
        ]}
      />

      <H2 id="types">Types of transport management systems</H2>
      <H3>Shipper (enterprise) TMS</H3>
      <P>
        Built for manufacturers, retailers and 3PLs that send large volumes and hire many carriers. Focus: route and load
        planning, carrier selection, rate negotiation and freight audit. Usually priced as an enterprise contract with a
        long implementation.
      </P>
      <H3>Transporter TMS</H3>
      <P>
        Built for the transport company itself: fleet owners, transport agencies and booking offices. Focus: GR/LR
        creation, customer accounts, delivery status and freight billing. Quick to set up and learn. BiltyOne is a
        transporter TMS.
      </P>
      <H3>Transport ERP</H3>
      <P>
        An all-in-one suite that adds accounting, payroll, fleet maintenance, fuel, tyres and inventory to the TMS core.
        Suits larger fleets with in-house accounts and workshop teams. See{' '}
        <A href="/transport-erp-software">transport ERP software vs TMS</A>.
      </P>
      <H3>Fleet tracking (GPS) software</H3>
      <P>
        Shows where each vehicle is, using a GPS device or the driver’s phone. Useful, but it is not a TMS on its own: it
        knows where the truck is, not what it is carrying, for whom, or who owes you money for it.
      </P>

      <H2 id="why-india">Why Indian transporters need a TMS</H2>
      <P>Road transport in India runs on paperwork that a general business tool does not understand:</P>
      <UL
        items={[
          <>
            <Strong>The GR/LR is central.</Strong> It is the transporter’s receipt for the goods and the contract of carriage,
            and under GST a goods transport agency is defined by issuing a consignment note. Every load needs one, usually in
            three copies.
          </>,
          <>
            <Strong>E-way bills reference it.</Strong> For most goods worth more than ₹50,000, an e-way bill must accompany
            the movement, and its transport details include the transport document (GR/LR) number. Keeping both numbers on
            one record saves time at checkposts and audits. Official rules:{' '}
            <A href="https://ewaybillgst.gov.in">ewaybillgst.gov.in</A>.
          </>,
          <>
            <Strong>Billing types are specific.</Strong> Paid, to pay and to be billed (TBB) each change who pays and when.
            Spreadsheets rarely handle these cleanly.
          </>,
          <>
            <Strong>Paper does not survive.</Strong> Carbon copies fade, books get wet in the monsoon, and finding a GR from
            last year can take an afternoon.
          </>,
          <>
            <Strong>Staff cost adds up.</Strong> Many offices pay someone mainly to write and file GRs. A TMS lets one person
            do the work of several.
          </>,
        ]}
      />

      <H2 id="tms-vs-erp-vs-excel">TMS vs transport ERP vs Excel</H2>
      <DataTable
        caption="Paper or Excel compared with a transporter TMS and a transport ERP"
        highlight={2}
        headers={['', 'Paper book / Excel', 'Transporter TMS (e.g. BiltyOne)', 'Transport ERP']}
        rows={[
          ['Main job', 'Write and file GRs by hand', 'GRs, customers, status and freight billing', 'Operations plus accounts, HR, fleet and stock'],
          ['Setup time', 'None', 'Hours to a day', 'Weeks to months'],
          ['Training', 'None', 'About a day', 'Formal training for each module'],
          ['GR numbers and freight', 'By hand', 'Automatic', 'Automatic'],
          ['Customer bills', 'Typed separately', 'Built in', 'Built in'],
          ['Accounting and payroll', 'Separate', 'Excel export to your accountant', 'Built in'],
          ['Cost', 'Paper and staff time', 'Low or free', 'Licence, implementation and per-user fees'],
          ['Best for', 'Very low volume', 'Small and mid-size transporters', 'Large fleets with in-house accounts'],
        ]}
      />

      <H2 id="how-to-choose">How to choose a transport management system</H2>
      <P>Shortlist two or three options and check each one against this list, using your own GRs:</P>
      <OL
        items={[
          'Does it print a GR/LR that looks right to your customers and drivers, with your logo, GSTIN and address?',
          'Can you create a GR in under two minutes once a customer is saved?',
          'Does it calculate freight the way you charge: per KM, box, kg, quintal or ton?',
          'Can it produce a freight bill or statement for one customer over any date range?',
          'Can you import your existing customer list and old GRs from Excel?',
          'Can you export everything to Excel at any time, without asking the vendor?',
          'Does it keep working when the internet is down?',
          'Can your least technical staff member learn it in a day?',
          'Is the total cost clear: licence, setup, per-user and renewal fees?',
        ]}
      />
      <P>
        Our longer checklist, with questions to ask vendors and a one-week trial plan, is in{' '}
        <A href="/guides/how-to-choose-transport-management-software">how to choose transport management software in India</A>.
      </P>

      <H2 id="biltyone">Where BiltyOne fits</H2>
      <P>
        BiltyOne is a transporter TMS for Indian road transport. It covers the work every transport office does daily:
        GR/LR creation with automatic numbers and freight, three-copy printing with your branding, a customer directory,
        booking and payment status, customer freight statements, Excel import and backup, and an analytics dashboard. It
        runs online in any browser, and{' '}
        <A href="/desktop">BiltyOne Desktop</A> works offline on Windows.
      </P>
      <P>
        It deliberately does not do GPS tracking, route planning or accounting. If you need those, run them alongside
        BiltyOne or choose a full ERP. For most transporters with up to about 50 trucks, the focused tool is faster to
        adopt and costs far less: BiltyOne is <A href="/faq">free for early transporters</A>. See every capability on the{' '}
        <A href="/features">features page</A>.
      </P>
    </ContentPage>
  );
}
