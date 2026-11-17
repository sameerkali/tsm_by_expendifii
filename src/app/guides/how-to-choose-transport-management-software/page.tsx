import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, Callout, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/guides/how-to-choose-transport-management-software');

// Supports the head term "transport management software (in India)" with a
// genuinely useful, vendor-neutral checklist.

const faqs = [
  {
    q: 'What should transport management software cost a small transporter?',
    a: 'It depends on scope. Focused tools for GRs, customers and billing range from free to a modest monthly fee, while transport ERP suites add licence, implementation and per-user charges. Compare the total over three years, including setup, training and renewals, not just the first-year price. BiltyOne is free for early transporters.',
  },
  {
    q: 'How long should a software trial take?',
    a: 'One working week is enough. Use your real customers and real GRs, run the software alongside your paper book, and have the person who writes GRs every day do most of the testing. By day five you will know whether it is faster, whether the printout is right and whether staff like it.',
  },
  {
    q: 'Should I choose cloud (online) or installed transport software?',
    a: 'Online software lets you work from any device, keeps records safe if a PC fails, and updates itself. Installed software keeps working without internet and stores data on your own computer. If your internet is unreliable, pick a product that offers both, as BiltyOne does with its web app and offline Windows app.',
  },
];

export default function HowToChooseTmsPage() {
  return (
    <ContentPage
      path="/guides/how-to-choose-transport-management-software"
      eyebrow="Guide"
      title="How to Choose Transport Management Software in India"
      intro="Choosing transport management software comes down to one test: does it make your daily GR, billing and record work faster without adding new problems? Use this checklist, the questions to ask vendors, and the one-week trial plan to decide with confidence."
      faqs={faqs}
      toc={[
        { id: 'start-with-work', label: 'Start with your work, not the software' },
        { id: 'must-haves', label: 'Must-have features' },
        { id: 'nice-to-haves', label: 'Nice-to-haves' },
        { id: 'questions', label: 'Questions to ask every vendor' },
        { id: 'red-flags', label: 'Red flags' },
        { id: 'scorecard', label: 'Comparison scorecard' },
        { id: 'trial', label: 'A one-week trial plan' },
      ]}
      related={['/transport-management-system', '/transport-erp-software', '/transport-management-system-for-small-business', '/features']}
    >
      <AnswerBox>
        To choose <Strong>transport management software in India</Strong>, list the jobs you do daily (GRs, customers,
        billing, records), check each product prints a correct GR with your details, calculates freight your way, builds
        customer statements, imports and exports Excel, and works offline if needed. Then trial it for a week with real GRs
        before you commit.
      </AnswerBox>

      <H2 id="start-with-work">Start with your work, not the software</H2>
      <P>
        Before looking at any product, write down what happens in your office in a normal week. How many GRs do you make?
        Who makes them? How do you price loads (per KM, per box, by weight)? How many customers are on monthly billing? How
        long does month-end take? Where do mistakes happen?
      </P>
      <P>
        This list is your requirement. Software that is excellent at things you do not do is not good software for you.
      </P>

      <H2 id="must-haves">Must-have features</H2>
      <UL
        items={[
          <>
            <Strong>Correct GR/LR printing</Strong> with your logo, GSTIN, PAN and address, and copies for driver, consignor
            and consignee.
          </>,
          <>
            <Strong>Automatic GR numbering</Strong> that never repeats or skips.
          </>,
          <>
            <Strong>Freight calculation</Strong> per KM, box, kg, quintal or ton, whichever you use.
          </>,
          <>
            <Strong>Customer directory</Strong> that fills in a regular customer’s details and rate.
          </>,
          <>
            <Strong>Billing types</Strong>: paid, to pay and to be billed, plus a payment status on each GR.
          </>,
          <>
            <Strong>Customer statements</Strong> for any date range.
          </>,
          <>
            <Strong>Search</Strong> by GR number, party, vehicle and city.
          </>,
          <>
            <Strong>Excel import</Strong> to bring your existing data in, and <Strong>Excel export</Strong> to take all of it
            out at any time.
          </>,
        ]}
      />

      <H2 id="nice-to-haves">Nice-to-haves</H2>
      <UL
        items={[
          'An offline mode or desktop app for days when the internet is down.',
          'A dashboard showing revenue, loads in transit and pending payments.',
          'Phone access through the browser, for checking GRs away from the office.',
          'Duplicate-a-GR for repeat loads.',
          'GPS tracking integration, if live location genuinely matters to your customers.',
        ]}
      />

      <H2 id="questions">Questions to ask every vendor</H2>
      <OL
        items={[
          'What will I pay in total over three years, including setup, training, users and renewals?',
          'Can I see a GR printed with my own company details before I sign up?',
          'How long until my staff are creating GRs on their own?',
          'Can I import my existing customers and GRs from Excel myself?',
          'Can I export all my data to Excel at any time, without asking you or paying?',
          'What happens to my data if I stop paying or leave?',
          'Does it work without internet? If not, what do I do when the connection drops?',
          'Who answers when I have a problem, in which language, and how quickly?',
        ]}
      />

      <H2 id="red-flags">Red flags</H2>
      <UL
        items={[
          'No free trial or demo with your own data.',
          'Your data can only be exported by the vendor, or for a fee.',
          'Long contracts or large upfront payments before you have used the product.',
          'A GR printout you cannot match to what your customers expect.',
          'Training that takes weeks for the person who writes GRs.',
          'Vague answers about where your data is kept and who can see it.',
        ]}
      />

      <H2 id="scorecard">Comparison scorecard</H2>
      <P>Score each product from 1 to 5 during your trial. Weight the rows that matter most to your business.</P>
      <DataTable
        caption="Scorecard for comparing transport management software during a trial"
        headers={['What to check', 'How to test it', 'Score (1-5)']}
        rows={[
          ['GR speed', 'Time ten real GRs for saved customers', ''],
          ['Printout', 'Print three copies; show them to a driver and a customer', ''],
          ['Freight', 'Enter your usual rates and pricing types', ''],
          ['Billing', 'Make a statement for one customer for last month', ''],
          ['Data in and out', 'Import your customer list; export everything to Excel', ''],
          ['Ease of use', 'Ask the least technical staff member to make a GR', ''],
          ['Offline', 'Disconnect the internet and try to work', ''],
          ['Total cost', 'Three-year cost including every fee', ''],
        ]}
      />

      <H2 id="trial">A one-week trial plan</H2>
      <H3>Day 1: set up</H3>
      <P>Enter your company details and logo. Print a test GR and check it against your paper book.</P>
      <H3>Day 2: customers</H3>
      <P>Import or add your 10 to 20 most regular customers with their usual rates.</P>
      <H3>Days 3 and 4: run in parallel</H3>
      <P>Make every GR in the software and on paper. Note the time taken and any problems.</P>
      <H3>Day 5: bill and export</H3>
      <P>Produce one customer statement and export all data to Excel. Make sure you can read it.</P>
      <H3>Decide</H3>
      <P>If it was faster, the printout was right and your staff were comfortable, switch. If not, you lost nothing.</P>
      <Callout>
        BiltyOne is free for early transporters, so you can run this whole plan without paying anything.{' '}
        <A href="/register">Create an account</A> or open the <A href="/live-demo">live demo</A> first.
      </Callout>
    </ContentPage>
  );
}
