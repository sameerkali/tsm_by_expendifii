import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';
import { CONTACT } from '@/config/site';

export const metadata: Metadata = buildPageMetadata('/transport-management-software-india');

// Keyword: "transport management software India". Owns the India intent;
// the homepage targets the generic term. Angle: what Indian road transport
// needs from software (documents, GST, e-way bills, billing customs, units,
// language, connectivity, price) and how BiltyOne handles each, never claims
// about other products. E-way bill facts stay general and cite the portal.

const EWAY_PORTAL = 'https://ewaybillgst.gov.in';

const faqs = [
  {
    q: 'What is the best transport management software in India?',
    a: 'The best transport management software is the one that fits your operation. For most road transporters it should create and print GRs fast, keep customer records, calculate freight, produce customer bills, back up your data and be easy for staff to learn. BiltyOne was built for exactly that and is free to start.',
  },
  {
    q: 'Does BiltyOne record GST details on every GR?',
    a: 'Yes. Every GR records the consignor’s and consignee’s GSTIN, checked for the correct format, and who pays GST on the freight: the consignor, the consignee or the transporter. Your own GSTIN and PAN print on every copy. BiltyOne does not file GST returns; give your accountant the Excel export for that.',
  },
  {
    q: 'Does BiltyOne work for transporters in every Indian state?',
    a: 'Yes. The web app works anywhere in India with an internet connection, and the 6-digit pincode lookup fills the city and state for any Indian address. We are onboarding transporters in Delhi NCR first, but transporters in any state can sign up, and BiltyOne Desktop works offline where the network is weak.',
  },
];

export default function TransportManagementSoftwareIndiaPage() {
  return (
    <ContentPage
      path="/transport-management-software-india"
      eyebrow="Made for India"
      title="Transport Management Software for India’s Road Transporters"
      intro="BiltyOne is transport management software made for how road transport works in India: the GR, LR or bilty in three copies, GSTIN on every party, e-way bill numbers on every load, Paid, To Pay and To Be Billed freight, pricing per quintal or box, support in Hindi, and a price of ₹0 for early transporters."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'indian-needs', label: 'What Indian road transport needs' },
        { id: 'gst', label: 'GSTIN and GST paid by' },
        { id: 'eway', label: 'E-way bill numbers on every GR' },
        { id: 'offices', label: 'Built for how Indian transport offices work' },
        { id: 'where', label: 'Where BiltyOne is used' },
      ]}
      related={['/pricing', '/guides/gr-vs-lr-vs-eway-bill', '/bilty-software', '/transport-software-small-business']}
    >
      <AnswerBox>
        <Strong>Transport management software for India</Strong> has to speak the language of Indian road transport: it
        should produce the GR/LR (bilty) with driver, consignor and consignee copies, carry GSTINs and e-way bill numbers,
        handle To Pay and To Be Billed freight, and work on a phone or an office PC with patchy internet. BiltyOne is built
        around exactly these needs.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grCreateForm} priority />

      <H2 id="indian-needs">What Indian road transport needs, and how BiltyOne handles it</H2>
      <DataTable
        caption="Requirements of Indian road transport and how BiltyOne meets each one"
        headers={['Indian requirement', 'How BiltyOne handles it']}
        rows={[
          ['The GR, LR or bilty as the core document', 'One GR record per load, printed as driver, consignor and consignee copies'],
          ['GSTIN on every party', 'Consignor and consignee GSTIN, format-checked; your GSTIN and PAN on every copy'],
          ['GST on freight under GTA rules', '“GST paid by” on each GR: consignor, consignee or transporter'],
          ['E-way bills for most loads', 'The e-way bill number is recorded on the GR and printed on every copy'],
          ['Paid, To Pay and To Be Billed freight', 'A billing type on every GR, printed as a badge, plus monthly freight bills'],
          ['Indian units', 'Freight per KM, kg, quintal, ton or box'],
          ['Indian addresses', '6-digit pincode lookup fills the city and state from India Post data'],
          ['Hindi-speaking offices', 'Support in Hindi and English'],
          ['Weak internet in yards and godowns', 'BiltyOne Desktop works offline on Windows after a one-time activation'],
          ['Tight budgets', 'Free for early transporters, priced in rupees, no credit card'],
        ]}
      />

      <H2 id="gst">GSTIN and GST paid by</H2>
      <P>
        Every GR records the consignor’s and consignee’s GSTIN, and BiltyOne checks that each one is in the correct GSTIN
        format before saving. Under GST, a goods transport agency (GTA) is a transporter that issues a consignment note, so
        who pays the GST on freight matters: each GR records whether it is the consignor, the consignee or the transporter.
        Your own GSTIN and PAN print at the top of every copy. BiltyOne does not file GST returns; the Excel export gives your
        accountant every GR’s freight and billing details.
      </P>

      <H2 id="eway">E-way bill numbers on every GR</H2>
      <P>
        For most consignments worth more than ₹50,000, an e-way bill has to travel with the goods, and its transport details
        refer to the GR or LR. BiltyOne records the e-way bill number and the invoice number on each GR and prints them on all
        three copies, so they are at hand at a checkpost. The e-way bill itself is generated on the official portal,{' '}
        <A href={EWAY_PORTAL}>ewaybillgst.gov.in</A>; rules and limits change, so check the portal for current ones. How the
        documents fit together is explained in <A href="/guides/gr-vs-lr-vs-eway-bill">GR vs LR vs e-way bill</A>.
      </P>

      <H2 id="offices">Built for how Indian transport offices work</H2>
      <UL
        items={[
          <>
            <Strong>Phone first.</Strong> The web app runs in any phone browser, so a GR can be made at the godown or on the
            road.
          </>,
          <>
            <Strong>Weak internet.</Strong> <A href="/desktop">BiltyOne Desktop</A> keeps working offline on a Windows PC.
          </>,
          <>
            <Strong>Many names, one document.</Strong> Whether your office says GR, LR or bilty, it is the same record. See{' '}
            <A href="/bilty-software">bilty software</A>, <A href="/lr-software">LR software</A> and{' '}
            <A href="/gr-software">GR software</A>.
          </>,
          <>
            <Strong>Language.</Strong> Help in {CONTACT.languages.join(' and ')}, by email, form or WhatsApp.
          </>,
          <>
            <Strong>Price.</Strong> ₹0 for early transporters, with at least 14 days’ notice before any paid plan; see{' '}
            <A href="/pricing">pricing</A>.
          </>,
        ]}
      />

      <H2 id="where">Where BiltyOne is used</H2>
      <P>
        BiltyOne is built in New Delhi by a founder from a Delhi transport family, and we are onboarding transporters across
        Delhi NCR first. The web app works for transporters in any state, from full-truckload fleet owners to parcel booking
        offices; see <A href="/transport-company-software">transport company software</A> and{' '}
        <A href="/transport-software-small-business">transport software for small business</A>.
      </P>
    </ContentPage>
  );
}
