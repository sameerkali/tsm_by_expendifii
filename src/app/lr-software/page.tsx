import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/lr-software');

// Keyword: "LR software". Angle: the busy booking counter (parcel and
// part-load offices, agents) where LR is the everyday word: speed at the
// counter, per-box pricing and finding LRs later. The LR document itself is
// /lorry-receipt-software; the bilty-book owner is /bilty-software.
// Behaviour matches CORE_APP_SPEC.md 5.6 (search), 7.1 (list), 7.6 (Per Box),
// 7.12 (duplicate), 10.4 and 12.1 (Excel backup).

const faqs = [
  {
    q: 'What is LR software?',
    a: 'LR software creates lorry receipts (LRs) on a computer instead of a carbon LR book. For a booking office it also remembers regular senders, prices parcels per box or by weight, prints the copies and finds any LR later by number, party, vehicle or city. BiltyOne does all of this and is free to start.',
  },
  {
    q: 'Can LR software price parcels per box?',
    a: 'Yes. Choose Per Box as the pricing type and BiltyOne multiplies the box count by the rate. Save a regular sender with a default rate per box and it fills in on every LR, so counter staff only type the number of cartons. Weight can be left empty on per-box LRs.',
  },
  {
    q: 'How do I find an LR when a customer calls?',
    a: 'Type the start of the LR number, the sender or receiver name, the vehicle number or the city into the search box on the GR list. Matching LRs appear straight away with their route, freight, payment and status, and the status buttons narrow the list to Booked, In Transit or Delivered loads.',
  },
];

export default function LrSoftwarePage() {
  return (
    <ContentPage
      path="/lr-software"
      eyebrow="LR software"
      title="LR Software for Busy Booking Counters"
      intro="BiltyOne is LR software for transport booking offices, parcel services and part-load desks that issue many LRs a day. Regular senders fill in with one pick, box pricing calculates freight per carton, and any LR can be found again in seconds by number, party, vehicle or city."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'counter', label: 'A day at the LR counter' },
        { id: 'per-box', label: 'Per-box pricing for parcels' },
        { id: 'finding', label: 'Finding an LR when a customer calls' },
        { id: 'repeat', label: 'Repeat senders and repeat loads' },
        { id: 'register', label: 'Your LR register, without the register' },
        { id: 'who', label: 'Who uses BiltyOne as LR software' },
      ]}
      related={['/lorry-receipt-software', '/bilty-software', '/gr-software', '/transport-billing-software']}
    >
      <AnswerBox>
        <Strong>LR software</Strong> for a booking office has to be fast at the counter and fast at finding things later.
        BiltyOne fills in regular senders from your customer list, prices parcels per box, prints the LR copies on any office
        printer, and finds any LR by number, party, vehicle or city when a customer calls.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grSearch} priority />

      <H2 id="counter">A day at the LR counter</H2>
      <P>
        A booking counter faces a queue of senders, many small consignments and a phone that keeps ringing. Here is where
        LR software changes the day:
      </P>
      <DataTable
        caption="Booking counter jobs with a paper LR book compared with BiltyOne LR software"
        highlight={2}
        headers={['Counter job', 'Paper LR book', 'BiltyOne']}
        rows={[
          ['Booking a regular sender', 'Write their name, phone and GSTIN again', 'Pick their name; details and rate fill in'],
          ['Pricing a parcel', 'Look up the rate, multiply by cartons', 'Box count × rate, calculated as you type'],
          ['Copies for sender, receiver and truck', 'Carbon copies', 'One PDF with three copies, any printer'],
          ['“Where is my parcel?”', 'Search the book page by page', 'Search by LR number, party, vehicle or city'],
          ['End-of-day register', 'Copy LRs into a register', 'Every LR is already in the list and the Excel backup'],
        ]}
      />

      <H2 id="per-box">Per-box pricing for parcels</H2>
      <P>
        Parcel and part-load counters usually charge per carton. Choose <Strong>Per Box</Strong> as the pricing type and
        BiltyOne multiplies the box count by the rate; the weight can stay empty. Save each regular sender with their pricing
        type and default rate, and every LR for them is priced the same way without anyone looking up a rate card. Full
        loads can still be priced per KM, kg, quintal or ton on the same system.
      </P>

      <H2 id="finding">Finding an LR when a customer calls</H2>
      <P>
        Type the start of an LR number, the sender or receiver, the vehicle number or a city into the search box. Matching
        LRs appear with their route, vehicle, freight, payment and status, and the Booked, In Transit and Delivered buttons
        narrow the list further. Anyone at the counter can answer the call, not just the person who booked the load.
      </P>

      <H2 id="repeat">Repeat senders and repeat loads</H2>
      <UL
        items={[
          <>
            <Strong>Repeat senders</Strong> are picked from the customer list; a new sender entered with phone, GSTIN and
            address is saved automatically when the LR is created.
          </>,
          <>
            <Strong>Repeat loads</Strong> are one click: the copy icon makes a new LR with the next number, today’s date and
            status Booked.
          </>,
        ]}
      />

      <H2 id="register">Your LR register, without the register</H2>
      <P>
        There is no separate register to keep. Every LR stays in the list, newest first, and the dashboard shows how many
        were booked today. From Settings you can download every LR as one Excel workbook at any time, which works as your
        register and your backup. At month end, account customers’ LRs become one freight bill; see{' '}
        <A href="/transport-billing-software">transport billing software</A>.
      </P>

      <H2 id="who">Who uses BiltyOne as LR software</H2>
      <UL
        items={[
          'Parcel booking offices issuing many small LRs a day.',
          'Part-load services combining several senders’ goods on one truck.',
          'Transport agents and brokers booking loads on hired vehicles.',
          'Transporters in regions where “LR” is the everyday name for the document; in north India the same paper is usually called a GR or bilty.',
        ]}
      />
      <P>
        Every field on the printed LR is listed on the <A href="/lorry-receipt-software">lorry receipt software</A> page.
      </P>
    </ContentPage>
  );
}
