import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, H3, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/digital-transport-management');

const faqs = [
  {
    q: 'Is Excel good enough for managing GRs?',
    a: 'For a handful of GRs a month, Excel can work. As volume grows it breaks down: there is no automatic GR numbering, customer details are retyped, formulas get overwritten, printing three copies is fiddly, and one corrupted or lost file can wipe out months of records. Transport software solves these by design.',
  },
  {
    q: 'What is digital transport management?',
    a: 'Digital transport management means running a transport business on software instead of paper books and spreadsheets: creating GR/LR on screen, printing copies, keeping customers and loads in one searchable system, and producing bills from data already entered. It is the day-to-day use of a transport management system (TMS).',
  },
  {
    q: 'Is it safe to keep transport records online instead of on paper?',
    a: 'Generally safer. Paper can be lost to rain, fire, pests or misplacement, and a single office PC can fail. Good online software encrypts data, keeps it on managed servers and lets you download your own backup at any time. With BiltyOne you can export all your GRs to Excel whenever you want.',
  },
];

export default function DigitalTransportManagementPage() {
  return (
    <ContentPage
      path="/digital-transport-management"
      eyebrow="Comparison"
      title="Paper vs Excel vs Digital Transport Management"
      intro="Indian transporters run their GRs in one of three ways: a paper GR book, an Excel sheet, or transport management software. This page compares all three on speed, mistakes, record safety, search and billing, so you can see what each one really costs."
      faqs={faqs}
      toc={[
        { id: 'comparison', label: 'Side-by-side comparison' },
        { id: 'paper', label: 'Paper GR books' },
        { id: 'excel', label: 'Excel sheets' },
        { id: 'software', label: 'Transport management software' },
        { id: 'which', label: 'Which is right for you?' },
      ]}
      related={['/guides/paper-gr-book-to-software', '/transport-management-system', '/transport-business-automation', '/why-biltyone']}
    >
      <AnswerBox>
        <Strong>Paper GR books</Strong> are cheap to start but slow, error-prone and easily lost. <Strong>Excel</Strong> is
        searchable but still manual and fragile. <Strong>Transport management software</Strong> numbers GRs, calculates
        freight, fills in customers, prints three copies and builds bills automatically, and keeps records safe. For most
        transporters, software saves the most time and money.
      </AnswerBox>

      <H2 id="comparison">Side-by-side comparison</H2>
      <DataTable
        caption="Paper GR book, Excel and transport management software compared"
        highlight={3}
        headers={['', 'Paper GR book', 'Excel sheet', 'Transport software (BiltyOne)']}
        rows={[
          ['Time per GR', 'Around 15 minutes', 'Less than paper, still all typed', 'About 2 minutes'],
          ['GR numbering', 'By hand', 'By hand or fragile formulas', 'Automatic, never reused'],
          ['Freight calculation', 'By hand', 'Formulas that can break', 'Automatic'],
          ['Customer details', 'Written every time', 'Copied and pasted', 'Saved once, auto-filled'],
          ['Three copies', 'Carbon paper', 'Print the sheet three times', 'One click'],
          ['Search', 'Flip through books', 'Ctrl+F in one file', 'By GR number, party, vehicle or city'],
          ['Customer bills', 'Typed separately', 'Built manually', 'Statement PDF for any period'],
          ['If disaster strikes', 'Records gone', 'File may be lost or corrupted', 'Stored online, plus Excel backup'],
          ['Cost', 'Books and staff time', 'Licence and staff time', 'Free for early transporters'],
        ]}
      />

      <H2 id="paper">Paper GR books</H2>
      <P>
        The carbon GR book has served Indian transport for decades. It needs no electricity and no training. But every load
        means writing the same details three times, freight is worked out by hand, and the book itself is the only record.
      </P>
      <H3>Where it hurts</H3>
      <UL
        items={[
          'Records lost to rain, fire, pests or misplacement, often exactly when a dispute comes up.',
          'Faint carbon copies that drivers and customers cannot read.',
          'Hours spent at month end copying GRs into bills.',
          'Shelves of books that are almost impossible to search.',
        ]}
      />

      <H2 id="excel">Excel sheets</H2>
      <P>
        Moving to Excel or Google Sheets solves storage and gives you a basic search. Many transporters stop here. The work,
        though, is still manual, and the file is only as safe as the computer it sits on.
      </P>
      <H3>Where it hurts</H3>
      <UL
        items={[
          'No real GR numbering: duplicates and gaps creep in.',
          'GSTINs and addresses retyped or pasted for every load.',
          'One wrong edit can overwrite a formula or a whole column.',
          'Printing a proper three-copy GR with your letterhead is awkward.',
          'No live view of loads in transit or payments pending.',
        ]}
      />

      <H2 id="software">Transport management software</H2>
      <P>
        A <A href="/transport-management-system">transport management system</A> is built around the GR. In BiltyOne, you
        pick a saved customer and enter the route, goods and rate; the GR number and freight are filled in, three copies
        print in one click, and the GR stays searchable. Status, payment and billing type live on the same record, and
        statements are built from GRs already entered.
      </P>
      <UL
        items={[
          <>
            <Strong>Faster:</Strong> about two minutes per GR once customers are saved.
          </>,
          <>
            <Strong>Fewer mistakes:</Strong> automatic numbers and freight, checked GSTINs.
          </>,
          <>
            <Strong>Safer:</Strong> stored online, with a full Excel backup whenever you want.
          </>,
          <>
            <Strong>Flexible:</Strong> online in any browser, or <A href="/desktop">offline on Windows</A>.
          </>,
        ]}
      />

      <H2 id="which">Which is right for you?</H2>
      <P>
        If you make only a few GRs a month and never bill on account, paper may still be enough. If you already use Excel,
        you have done the hard part of going digital, and moving to software is a small step that removes most of the
        remaining manual work. Our <A href="/guides/paper-gr-book-to-software">one-week switching plan</A> shows how to do it
        without stopping work.
      </P>
    </ContentPage>
  );
}
