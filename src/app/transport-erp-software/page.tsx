import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, H3, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/transport-erp-software');

// Keyword: "transport ERP software". BiltyOne is NOT an ERP, so this page is
// an honest buyer's guide (ERP vs focused TMS), which is what most people
// searching this term are trying to decide.

const faqs = [
  {
    q: 'What is transport ERP software?',
    a: 'Transport ERP software is an all-in-one business system for transport companies. Alongside operations such as bookings, GR/LR and billing, it usually includes accounting, GST, payroll, fleet maintenance, fuel and tyre management, inventory and reports, all sharing one database. It suits larger fleets with dedicated accounts and workshop teams.',
  },
  {
    q: 'Is BiltyOne a transport ERP?',
    a: 'No. BiltyOne is a focused transport management system (TMS). It covers the operations core: GR/LR creation and printing, customers, delivery and payment status, freight statements and records. It does not include accounting, payroll or fleet maintenance; its Excel export gives your accountant everything needed for the books.',
  },
  {
    q: 'When does a transport company need ERP software?',
    a: 'Usually when it runs a large fleet with its own workshop and stores, employs many drivers on payroll, keeps its accounts in-house, and needs one system to connect all of them. Below that size, a focused TMS plus existing accounting software is typically cheaper, faster to adopt and easier for staff.',
  },
  {
    q: 'Can I start with a TMS and move to an ERP later?',
    a: 'Yes, if your TMS lets you export everything. BiltyOne downloads all your GRs as one Excel workbook at any time, a format most ERP systems can import. Starting with a simple TMS also teaches your team to work digitally, which makes a later ERP rollout far smoother.',
  },
];

export default function TransportErpSoftwarePage() {
  return (
    <ContentPage
      path="/transport-erp-software"
      eyebrow="Buyer’s guide"
      title="Transport ERP Software vs TMS: Which Does Your Business Need?"
      intro="Transport ERP software runs a whole transport company in one system: operations, accounts, fleet, staff and stock. This guide explains what a transport ERP includes, who really needs one, and when a focused transport management system like BiltyOne is the better choice."
      faqs={faqs}
      toc={[
        { id: 'what-is-transport-erp', label: 'What is transport ERP software?' },
        { id: 'modules', label: 'Typical transport ERP modules' },
        { id: 'erp-vs-tms', label: 'Transport ERP vs TMS compared' },
        { id: 'who-needs-erp', label: 'Who needs a transport ERP' },
        { id: 'who-needs-tms', label: 'Who is better off with a TMS' },
        { id: 'questions', label: 'Questions to ask any ERP vendor' },
        { id: 'biltyone', label: 'Where BiltyOne fits' },
      ]}
      related={[
        '/transport-management-system',
        '/transport-software-small-business',
        '/transport-company-software',
        '/guides/how-to-choose-transport-management-software',
      ]}
    >
      <AnswerBox>
        <Strong>Transport ERP software</Strong> combines transport operations (bookings, GR/LR, billing) with accounting,
        payroll, fleet maintenance and inventory in one system. It suits large fleets with in-house accounts and workshops.
        Most small and mid-size transporters get more value from a focused transport management system plus their existing
        accounting software.
      </AnswerBox>

      <H2 id="what-is-transport-erp">What is transport ERP software?</H2>
      <P>
        ERP stands for enterprise resource planning: one software system that connects every department of a business
        through a shared database. A transport ERP applies this to a transport company, so a GR created at the booking desk
        automatically feeds the customer’s ledger, the vehicle’s trip history, the driver’s records and the monthly
        profit-and-loss.
      </P>
      <P>
        That connection is powerful, but it comes at a price: more modules to configure, more data to enter, more staff to
        train, and usually a licence, an implementation project and yearly support fees.
      </P>

      <H2 id="modules">Typical transport ERP modules</H2>
      <UL
        items={[
          <>
            <Strong>Operations:</Strong> bookings, GR/LR, loading and unloading, delivery and POD. (This is the part a TMS
            covers.)
          </>,
          <>
            <Strong>Billing and accounts:</Strong> freight bills, ledgers, receivables and payables, GST.
          </>,
          <>
            <Strong>Fleet management:</Strong> vehicle documents and renewals, maintenance, tyres, fuel and mileage.
          </>,
          <>
            <Strong>Driver and HR:</Strong> driver records, trip advances, salaries and payroll.
          </>,
          <>
            <Strong>Inventory:</Strong> spare parts and stores for the workshop.
          </>,
          <>
            <Strong>Tracking and reports:</Strong> GPS integration, MIS and management dashboards.
          </>,
        ]}
      />

      <H2 id="erp-vs-tms">Transport ERP vs TMS compared</H2>
      <DataTable
        caption="Transport ERP software compared with a focused transport management system"
        highlight={2}
        headers={['', 'Transport ERP', 'Focused TMS (e.g. BiltyOne)']}
        rows={[
          ['Scope', 'Whole company: operations, accounts, fleet, HR, stock', 'Transport operations: GRs, customers, status, freight billing'],
          ['Typical user', 'Large fleets with several departments', 'Small and mid-size transporters, agents, booking offices'],
          ['Setup', 'Weeks to months, often with a consultant', 'Hours; import old GRs from Excel'],
          ['Training', 'Per module, often formal', 'About a day for most staff'],
          ['Cost', 'Licence, implementation, per-user and support fees', 'Low; BiltyOne is free for early transporters'],
          ['Accounting', 'Built in', 'Excel export to your existing accounting'],
          ['Risk if it goes wrong', 'High: the whole business depends on it', 'Low: easy to start, easy to export and leave'],
          ['Time to first GR', 'After implementation', 'The same day'],
        ]}
      />

      <H2 id="who-needs-erp">Who needs a transport ERP</H2>
      <P>A full ERP usually makes sense when most of these are true:</P>
      <UL
        items={[
          'You run a large owned fleet with your own workshop and spare-parts store.',
          'Many drivers are on payroll, with trip advances to settle.',
          'Your accounts are kept in-house by a team, not by an outside CA.',
          'Several branches need one consolidated view of the business.',
          'You have the budget and the people to run a months-long implementation.',
        ]}
      />

      <H2 id="who-needs-tms">Who is better off with a TMS</H2>
      <P>A focused transport management system is usually the better first step if:</P>
      <UL
        items={[
          'You have roughly 1 to 50 trucks, or you book loads on hired vehicles.',
          'Your biggest daily pain is writing GRs, finding old ones and billing customers.',
          'An outside CA or existing accounting software already handles your books.',
          'Your staff are not used to software and need something they can learn in a day.',
          'You want to see results this week, not after an implementation project.',
        ]}
      />
      <P>
        Many transporters start here and add more later. See the{' '}
        <A href="/transport-software-small-business">transport software for small business</A> page
        for what a lean setup looks like.
      </P>

      <H2 id="questions">Questions to ask any ERP vendor</H2>
      <OL
        items={[
          'What is the total cost for three years: licence, implementation, per-user fees, support and upgrades?',
          'How long until my staff create GRs in the system, and who trains them?',
          'Can I see the GR/LR print with my own letterhead before I buy?',
          'Which modules can I switch off if I do not need them?',
          'Can I export all my data to Excel myself, at any time, without paying?',
          'Does it work when our internet is down?',
          'Who do I call when something breaks, and how fast do they respond?',
        ]}
      />

      <H2 id="biltyone">Where BiltyOne fits</H2>
      <Screenshot shot={SCREENSHOTS.customers} />
      <H3>What BiltyOne covers</H3>
      <P>
        BiltyOne is the operations core of a transport business: GR/LR creation with automatic numbers and freight,
        three-copy printing with your branding, a customer directory, booking and payment status, customer freight
        statements, Excel import and backup, a dashboard, and an{' '}
        <A href="/desktop">offline Windows app</A>.
      </P>
      <H3>What it leaves to other tools</H3>
      <P>
        Accounting and GST returns, payroll, fleet maintenance and GPS tracking. Its one-click Excel backup gives your
        accountant every GR, so BiltyOne fits alongside the tools you already use. Read the{' '}
        <A href="/transport-management-system">transport management system guide</A> or the full{' '}
        <A href="/features">feature list</A> to see if it covers what you need.
      </P>
    </ContentPage>
  );
}
