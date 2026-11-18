import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { ProductVideo } from '@/components/content/ProductVideo';
import { SCREENSHOTS } from '@/config/screenshots';
import { CONTACT } from '@/config/site';

export const metadata: Metadata = buildPageMetadata('/bilty-software');

// Keyword: "bilty software" (बिल्टी सॉफ्टवेयर). Angle: the owner in a
// Hindi-speaking market who still writes the bilty book by hand, often on a
// phone, sometimes with weak internet. What a bilty IS lives in
// /guides/what-is-bilty; the LR document format in /lorry-receipt-software.

const faqs = [
  {
    q: 'Bilty software kya hota hai?',
    a: 'Bilty software bilty book ki jagah phone ya computer par bilty banane ka tareeka hai. BiltyOne mein party chuniye, maal, weight ya boxes aur rate daaliye: bilty number aur bhada apne aap aa jaata hai, aur driver, consignor aur consignee ki teeno copy ek click mein print hoti hain. Shuruaat free hai.',
  },
  {
    q: 'Can I print a to-pay bilty in BiltyOne?',
    a: 'Yes. Choose To Pay as the billing type and a TO PAY badge prints on all three copies, so the driver and the delivery end know to collect the freight from the consignee. Paid and To Be Billed bilty work the same way, and every bilty’s payment status shows in your list.',
  },
  {
    q: 'Is BiltyOne support available in Hindi?',
    a: `Yes. Write to us or message us on WhatsApp in Hindi or English, and we reply ${CONTACT.responseTime.toLowerCase()}. We can also help you add your company details and regular parties and print your first bilty together, so nobody in your office is left stuck on day one.`,
  },
];

export default function BiltySoftwarePage() {
  return (
    <ContentPage
      path="/bilty-software"
      eyebrow="Bilty software · बिल्टी सॉफ्टवेयर"
      title="Bilty Software: Make Every Bilty Online in 2 Minutes"
      intro="BiltyOne is bilty software for transporters who still write the bilty book by hand. Make a bilty on your phone or computer in about two minutes, print the driver, consignor and consignee copies on any printer, and never lose a bilty to rain or a missing book again. Help is available in Hindi and English."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'book-vs-software', label: 'Bilty book vs bilty software' },
        { id: 'first-bilty', label: 'Your first bilty in BiltyOne' },
        { id: 'to-pay', label: 'To pay, paid and TBB bilty' },
        { id: 'phone', label: 'Bilty on your phone' },
        { id: 'offline', label: 'When the internet goes' },
        { id: 'hindi', label: 'Help in Hindi' },
      ]}
      related={['/guides/what-is-bilty', '/lr-software', '/gr-software', '/desktop']}
    >
      <AnswerBox>
        <Strong>Bilty software</Strong> replaces the carbon bilty book with a bilty made on a phone or computer. In BiltyOne
        you pick the party, enter the maal (goods), weight or boxes and rate, and the bilty number and bhada (freight) fill
        in. Print three copies, and every old bilty stays searchable.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grFormMobile} phone priority />

      <H2 id="book-vs-software">Bilty book vs bilty software</H2>
      <DataTable
        caption="A handwritten bilty book compared with BiltyOne bilty software"
        highlight={2}
        headers={['', 'Bilty book', 'BiltyOne']}
        rows={[
          ['Making one bilty', '20+ fields by hand, about 15 minutes', 'About 2 minutes; regular parties fill in'],
          ['Bilty number', 'The next page in the book', 'Automatic, never repeated'],
          ['Bhada (freight)', 'Worked out on a calculator', 'Rate × quantity, calculated as you type'],
          ['Three copies', 'Carbon paper, often smudged', 'Clean print on any printer'],
          ['Finding an old bilty', 'Search stacks of old books', 'Search by number, party, vehicle or city'],
          ['Rain, fire or a lost book', 'Records gone for good', 'Stored online, with an Excel backup any time'],
        ]}
      />

      <H2 id="first-bilty">Your first bilty in BiltyOne</H2>
      <OL
        items={[
          <>
            <A href="/register">Sign up free</A> and add your company name, GSTIN, address and logo. They print on every bilty.
          </>,
          'Open the GR tab and tap New Receipt. In BiltyOne a bilty is called a GR; it is the same document.',
          'Pick the party (consignor) or type a new one, then add the consignee and the from and to city.',
          'Enter the maal, the weight or number of boxes, and the rate. The bhada is calculated for you.',
          'Choose who pays: Paid, To Pay or To Be Billed. Add the gaadi (vehicle) number and driver if you have them.',
          'Save and print the driver, consignor and consignee copies.',
        ]}
      />
      <P>
        New to the word or the fields? <A href="/guides/what-is-bilty">What is a bilty</A> explains every field and copy.
      </P>

      <ProductVideo />

      <H2 id="to-pay">To pay, paid and TBB bilty</H2>
      <UL
        items={[
          <>
            <Strong>Paid:</Strong> the consignor paid the bhada at booking; a PAID badge prints.
          </>,
          <>
            <Strong>To Pay:</Strong> the consignee pays on delivery; a TO PAY badge prints so the driver knows to collect.
          </>,
          <>
            <Strong>To Be Billed (TBB):</Strong> the bhada goes on the customer’s monthly bill; see{' '}
            <A href="/transport-billing-software">transport billing software</A>.
          </>,
        ]}
      />

      <H2 id="phone">Bilty on your phone</H2>
      <P>
        BiltyOne runs in the browser on any Android phone or iPhone, so you can make a bilty at the godown, the yard or on
        the road, with nothing to install. In your phone’s browser menu, choose “Add to Home screen” and BiltyOne opens like
        an app. The office PC sees the same bilty straight away.
      </P>

      <H2 id="offline">When the internet goes</H2>
      <P>
        If your office loses internet often, install <A href="/desktop">BiltyOne Desktop</A> on a Windows 10 or 11 PC. After
        a one-time activation it makes, prints and searches bilty with no internet at all, and keeps a backup on your
        computer.
      </P>

      <H2 id="hindi">Help in Hindi</H2>
      <P>
        Support is available in Hindi and English, by email, the contact form or WhatsApp. If you have never used software
        before, we will help you set up your company details and regular parties and print your first bilty together.
      </P>
    </ContentPage>
  );
}
