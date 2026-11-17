import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, Callout, ContentPage, DataTable, H2, H3, OL, P, Strong, UL } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/guides/gr-vs-lr-vs-eway-bill');

// E-way bill facts are kept general and point to the official portal: rules
// and state thresholds change, and the portal is the authority.
const EWAY_PORTAL = 'https://ewaybillgst.gov.in';

const faqs = [
  {
    q: 'What is the difference between GR and LR?',
    a: 'There is no real difference. GR (goods receipt) and LR (lorry receipt) are two names for the same consignment note a road transporter issues when it accepts goods. GR is the more common term in north India and LR elsewhere; both are also called a bilty. The fields and the three copies are the same.',
  },
  {
    q: 'Can an e-way bill replace the GR or LR?',
    a: 'No. The e-way bill is a GST compliance document generated on the government portal to record that goods are moving. The GR/LR is the transporter’s own receipt and contract of carriage with the consignor. A typical load needs both, plus the seller’s tax invoice, and the e-way bill can reference the GR/LR number.',
  },
  {
    q: 'Who generates the e-way bill: the transporter or the consignor?',
    a: 'Usually the consignor (the registered person sending the goods) generates it, or the consignee in some cases. A transporter can also generate it on their behalf, and the transporter is responsible for the vehicle details in Part B. Check the current rules on the official e-way bill portal before relying on any one arrangement.',
  },
  {
    q: 'Does BiltyOne generate e-way bills?',
    a: 'No. BiltyOne records the e-way bill number on each GR, so it prints on all three copies and you can find it later by opening the GR. You generate the e-way bill itself on the official GST e-way bill portal, then type its number into the GR.',
  },
];

export default function GrVsLrVsEwayBillPage() {
  return (
    <ContentPage
      path="/guides/gr-vs-lr-vs-eway-bill"
      eyebrow="Guide"
      title="GR vs LR vs E-Way Bill: What’s the Difference?"
      intro="GR and LR are two names for the same transporter’s receipt; the e-way bill is a separate GST document for goods on the move. This guide compares all three, shows who issues each one, and explains how they fit together on a single trip."
      faqs={faqs}
      toc={[
        { id: 'quick-comparison', label: 'Quick comparison' },
        { id: 'gr-and-lr', label: 'GR and LR: one document, two names' },
        { id: 'e-way-bill', label: 'What an e-way bill is' },
        { id: 'one-trip', label: 'How they fit together on one trip' },
        { id: 'mistakes', label: 'Common mistakes' },
      ]}
      related={['/guides/what-is-bilty', '/logistics-glossary', '/lorry-receipt-software', '/transport-management-system']}
    >
      <AnswerBox>
        <Strong>GR and LR are the same document</Strong>: the receipt and contract of carriage a road transporter issues for
        a load. An <Strong>e-way bill</Strong> is different: an electronic GST document generated on the government portal
        for most goods worth over ₹50,000 that are being moved. A typical load carries the invoice, the e-way bill and the
        GR/LR together.
      </AnswerBox>

      <H2 id="quick-comparison">Quick comparison</H2>
      <DataTable
        caption="GR, LR and e-way bill compared"
        headers={['', 'GR (goods receipt)', 'LR (lorry receipt)', 'E-way bill']}
        rows={[
          ['What it is', 'Transporter’s receipt and contract of carriage', 'Same as GR', 'GST record of goods in movement'],
          ['Issued by', 'Transporter / transport agent', 'Transporter / transport agent', 'Generated on the GST portal, usually by the consignor'],
          ['Format', 'Paper or software, usually 3 copies', 'Same as GR', 'Electronic, with a 12-digit EWB number'],
          ['Needed for', 'Every commercial load', 'Every commercial load', 'Most consignments over ₹50,000 (check rules)'],
          ['Proves', 'Goods handed over, route, freight, who pays', 'Same as GR', 'Tax-compliant movement of goods'],
          ['Also called', 'Bilty, consignment note', 'Bilty, consignment note', 'EWB'],
        ]}
      />

      <H2 id="gr-and-lr">GR and LR: one document, two names</H2>
      <P>
        Walk into transport offices in Delhi and in Mumbai and you will hear different words for the same paper: GR in the
        north, LR in many other regions, and bilty almost everywhere in Hindi. The content is identical: consignor and
        consignee, goods and packages, weight, declared value, route, freight and who pays it, vehicle and driver, and the
        transporter’s terms. Our <A href="/guides/what-is-bilty">bilty guide</A> lists every field.
      </P>
      <P>
        Because the transporter issues it, the GR/LR is the document that matters most to the transport business itself.
        It is the basis for collecting freight, billing account customers, settling claims and answering “where is my
        consignment?”
      </P>

      <H2 id="e-way-bill">What an e-way bill is</H2>
      <P>
        The e-way bill (EWB) was introduced under GST to track goods in movement. It is generated on the official portal,{' '}
        <A href={EWAY_PORTAL}>ewaybillgst.gov.in</A>, and has two parts:
      </P>
      <UL
        items={[
          <>
            <Strong>Part A:</Strong> the goods: GSTINs of supplier and recipient, invoice number and date, value, HSN code
            and reason for transport.
          </>,
          <>
            <Strong>Part B:</Strong> the transport: the vehicle number and the transport document (GR/LR) number. Part B is
            updated if the goods are moved to a different vehicle.
          </>,
        ]}
      />
      <P>
        It is generally required when the consignment value is more than ₹50,000, with exceptions for some goods and
        state-specific rules for movement within a state. Validity depends on the distance (for regular cargo, one day for
        every 200 km or part of it). Always confirm current thresholds and validity on the official portal.
      </P>
      <Callout>
        This guide explains how the documents relate. It is not tax advice: for your specific goods and routes, check the
        e-way bill portal or ask your CA.
      </Callout>

      <H2 id="one-trip">How they fit together on one trip</H2>
      <OL
        items={[
          <>
            <Strong>Invoice.</Strong> The seller raises a tax invoice for the goods.
          </>,
          <>
            <Strong>GR / LR.</Strong> The transporter accepts the load and issues the GR/LR, with copies for the consignor,
            driver and consignee.
          </>,
          <>
            <Strong>E-way bill.</Strong> If required, it is generated with the invoice details (Part A) and the vehicle and
            GR/LR numbers (Part B).
          </>,
          <>
            <Strong>On the road.</Strong> The driver carries the invoice, the GR/LR copy and the e-way bill (or its number).
          </>,
          <>
            <Strong>Delivery.</Strong> The consignee receives the goods against the GR/LR; the transporter collects to-pay
            freight and records proof of delivery.
          </>,
          <>
            <Strong>Billing.</Strong> Paid and to-pay freight is settled; to-be-billed GRs go on the customer’s statement.
          </>,
        ]}
      />
      <H3>Keeping the numbers together</H3>
      <P>
        Most disputes and audits come down to matching an invoice, an e-way bill and a GR. In BiltyOne each GR stores the
        invoice number and e-way bill number alongside the vehicle and driver, prints them on every copy, and keeps them on
        the GR record so they are there when you open it later.
      </P>

      <H2 id="mistakes">Common mistakes</H2>
      <UL
        items={[
          'Leaving the e-way bill number off the GR, so the two cannot be matched later.',
          'Not updating Part B when goods are moved to another vehicle.',
          'Mismatched GSTINs or party names between the invoice, e-way bill and GR.',
          'Writing freight on the GR but forgetting the billing type, which causes arguments at delivery.',
          'Losing the office copy of a paper GR, the one you need most in a dispute.',
        ]}
      />
      <P>
        Software removes most of these: required fields are checked, numbers are stored with the GR, and nothing gets lost.
        See how in <A href="/lorry-receipt-software">BiltyOne’s lorry receipt software</A>.
      </P>
    </ContentPage>
  );
}
