import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/guides/what-is-bilty');

const faqs = [
  {
    q: 'Are bilty, GR and LR the same thing?',
    a: 'Yes. Bilty, GR (goods receipt) and LR (lorry receipt) are different names for the same document: the receipt a road transporter issues when it accepts goods for carriage. Bilty is the common Hindi trade word, GR is widely used in north India, and LR is common elsewhere. Consignment note is the formal term.',
  },
  {
    q: 'Who keeps which copy of the bilty?',
    a: 'The consignor (sender) keeps one copy as proof that the goods were handed over. The driver carries one with the load for checkposts and delivery. The consignee (receiver) gets one, and often needs it to take delivery. Many transporters also keep an office copy in the book or, with software, as a stored record.',
  },
  {
    q: 'What is a to-pay bilty?',
    a: 'A to-pay bilty is one where the freight is paid by the consignee when the goods are delivered, instead of by the consignor at booking. The other common types are paid (freight collected at booking) and to be billed, or TBB (freight added to the customer’s account and billed later, usually monthly).',
  },
  {
    q: 'Is a bilty required for every load?',
    a: 'For commercial loads, in practice yes. The consignee and the consignor’s accounts expect one, the GST rules define a goods transport agency by its issuing a consignment note, and the e-way bill for a load usually references it. It is also your best evidence if goods are lost, damaged or disputed.',
  },
  {
    q: 'Can I make a bilty online?',
    a: 'Yes. Transport software like BiltyOne lets you create a bilty in your browser: choose the customer, enter the route, goods and rate, and save. The GR number and freight are filled in automatically, and the consignor, consignee and driver copies print together with your company details.',
  },
];

export default function WhatIsBiltyPage() {
  return (
    <ContentPage
      path="/guides/what-is-bilty"
      eyebrow="Guide"
      title="What is a Bilty? GR and LR Meaning, Format and Fields"
      intro="A bilty is the receipt a road transporter issues when it accepts goods for carriage. It is also called a GR (goods receipt), LR (lorry receipt) or consignment note. This guide explains what it proves, who gets each copy, and every field a correct bilty should contain."
      faqs={faqs}
      toc={[
        { id: 'meaning', label: 'Bilty meaning' },
        { id: 'what-it-proves', label: 'What a bilty proves' },
        { id: 'copies', label: 'The three copies' },
        { id: 'format', label: 'Bilty format: every field' },
        { id: 'billing-types', label: 'Paid, to pay and to be billed' },
        { id: 'make-online', label: 'How to make a bilty online' },
      ]}
      related={['/guides/gr-vs-lr-vs-eway-bill', '/lorry-receipt-software', '/logistics-glossary', '/gr-management']}
    >
      <AnswerBox>
        A <Strong>bilty</Strong> (also GR, goods receipt, or LR, lorry receipt) is the document a road transporter issues
        when it accepts goods for transport. It records who sent the goods, who will receive them, what they are, the route
        and the freight. It is the transporter’s receipt for the goods and the contract of carriage, usually made in three
        copies.
      </AnswerBox>

      <H2 id="meaning">Bilty meaning</H2>
      <P>
        “Bilty” is the everyday word for the consignment note in Indian road transport, especially in Hindi-speaking
        markets. In north India the same document is usually called a <Strong>GR</Strong> (goods receipt); elsewhere,{' '}
        <Strong>LR</Strong> (lorry receipt) is more common. All of them mean the same thing: the paper, or now the digital
        record, that a transporter gives when it takes goods on board.
      </P>
      <P>
        The business that issues it is usually a transport company, a fleet owner or a transport agent. Under GST, a goods
        transport agency (GTA) is defined as a person who transports goods by road and issues a consignment note, so the
        bilty also matters for tax.
      </P>

      <H2 id="what-it-proves">What a bilty proves</H2>
      <UL
        items={[
          <>
            <Strong>Receipt of goods:</Strong> the transporter has taken charge of the listed packages in the stated
            condition.
          </>,
          <>
            <Strong>Contract of carriage:</Strong> the route, freight and terms both sides agreed to.
          </>,
          <>
            <Strong>Who pays freight:</Strong> paid, to pay or to be billed.
          </>,
          <>
            <Strong>Trip details:</Strong> the vehicle, driver, invoice and e-way bill numbers, useful at checkposts and in
            disputes.
          </>,
          <>
            <Strong>Delivery entitlement:</Strong> in many trades the consignee’s copy is what the receiver shows to take
            delivery.
          </>,
        ]}
      />

      <H2 id="copies">The three copies</H2>
      <DataTable
        caption="Who keeps each copy of a bilty and why"
        headers={['Copy', 'Who keeps it', 'Used for']}
        rows={[
          ['Consignor copy', 'The sender', 'Proof the goods were handed over; matching against invoices and payments'],
          ['Driver copy', 'Travels with the load', 'Checkposts, delivery and collecting to-pay freight'],
          ['Consignee copy', 'The receiver', 'Taking delivery; matching against the purchase'],
          ['Office copy (optional)', 'The transporter', 'Records, billing and disputes; with software, the stored GR replaces it'],
        ]}
      />

      <H2 id="format">Bilty format: every field</H2>
      <P>
        There is no single official layout, but a complete bilty carries the details below. This is the field list BiltyOne
        uses, grouped the way they appear on a printed copy.
      </P>
      <H3>Header</H3>
      <UL
        items={[
          'Transporter’s name, logo, GSTIN, PAN, phone and address',
          'GR / LR number and date',
          'From city and to city',
        ]}
      />
      <H3>Parties</H3>
      <UL items={['Consignor (sender) name and GSTIN', 'Consignee (receiver) name and GSTIN', 'Ship-to / delivery address, and whether door delivery is included']} />
      <H3>Goods</H3>
      <UL items={['Description of goods', 'Number of packages (boxes)', 'Weight', 'Declared value of the goods']} />
      <H3>Charges</H3>
      <UL
        items={[
          'Pricing basis: per KM, box, kg, quintal or ton',
          'Rate and freight amount',
          'Billing type: paid, to pay or to be billed',
          'Who pays GST: consignor, consignee or transporter',
        ]}
      />
      <H3>Trip and compliance</H3>
      <UL
        items={[
          'Vehicle number, driver name, driver mobile and licence or ID number',
          'Invoice number and e-way bill number',
          'Insurance: company, policy number, date, amount and risk',
          'Remarks, and the copy label (driver, consignor or consignee copy)',
        ]}
      />

      <H2 id="billing-types">Paid, to pay and to be billed</H2>
      <DataTable
        caption="Bilty billing types compared"
        headers={['Billing type', 'Who pays freight', 'When']}
        rows={[
          ['Paid', 'Consignor (sender)', 'At booking'],
          ['To pay', 'Consignee (receiver)', 'At delivery'],
          ['To be billed (TBB)', 'The account customer', 'Later, usually on a monthly bill'],
        ]}
      />
      <P>
        Getting this right on every bilty is what makes month-end billing work. In BiltyOne, every GR carries its billing
        type and a payment status, and the Printing tab builds a statement for any customer and period. Definitions of
        related terms are in the <A href="/logistics-glossary">logistics glossary</A>.
      </P>

      <H2 id="make-online">How to make a bilty online</H2>
      <OL
        items={[
          <>
            <A href="/register">Sign up for BiltyOne</A> (free) with your company details. They print on every copy.
          </>,
          'Open the GR tab and click to create a new GR.',
          'Pick the consignor from your saved customers, or type a new one; it is saved for next time.',
          'Enter the consignee, route, goods, weight or boxes, and rate. The freight is calculated for you.',
          'Add the vehicle, driver, invoice and e-way bill numbers if you have them, and save.',
          'Print: you get the driver, consignor and consignee copies in one PDF.',
        ]}
      />
      <P>
        Want to see it before signing up? The <A href="/live-demo">live demo</A> has sample bilties ready to open. For more
        on the software side, see <A href="/lorry-receipt-software">lorry receipt software</A>.
      </P>
    </ContentPage>
  );
}
