import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/config/site';
import { A, ContentPage, H2, P } from '@/components/content/ContentPage';

export const metadata: Metadata = buildPageMetadata('/logistics-glossary');

// Each definition opens with "X is ..." so it stands alone as a featured
// snippet or AI answer. The DefinedTermSet JSON-LD is built from this list.
const terms: { term: string; slug: string; def: string; link?: { href: string; label: string } }[] = [
  {
    term: 'Bilty',
    slug: 'bilty',
    def: 'A bilty is the everyday Hindi trade word for the consignment note a road transporter issues when it accepts goods. It is the same document as a GR or LR, usually printed in three copies for the driver, consignor and consignee.',
    link: { href: '/bilty-software', label: 'Bilty software' },
  },
  {
    term: 'GR (Goods Receipt)',
    slug: 'gr',
    def: 'A GR, or goods receipt, is the transporter’s receipt for goods accepted for carriage and the contract of carriage. It records the consignor, consignee, goods, route, freight and who pays it. GR is the usual term in north India.',
    link: { href: '/gr-software', label: 'GR software' },
  },
  {
    term: 'LR (Lorry Receipt)',
    slug: 'lr',
    def: 'An LR, or lorry receipt, is the same document as a GR, under the name more common outside north India. It lists freight, consignor, consignee, goods and vehicle details, and is usually made in driver, consignor and consignee copies.',
    link: { href: '/lr-software', label: 'LR software' },
  },
  {
    term: 'Consignment note',
    slug: 'consignment-note',
    def: 'A consignment note is the formal name for a GR, LR or bilty. Under GST, a goods transport agency (GTA) is defined as a person who transports goods by road and issues a consignment note, by whatever name called.',
  },
  {
    term: 'Consignor',
    slug: 'consignor',
    def: 'The consignor is the sender of the goods: the party that hands the load to the transporter and is named as sender on the GR. Their name and GSTIN are printed on every copy. Also spelled consigner.',
  },
  {
    term: 'Consignee',
    slug: 'consignee',
    def: 'The consignee is the receiver of the goods, named on the GR as the party entitled to take delivery. Their name, GSTIN and delivery address are recorded so the right person receives the load and signs for it.',
  },
  {
    term: 'Freight',
    slug: 'freight',
    def: 'Freight is the charge paid to a transporter for moving goods. In India it is commonly priced per KM, per box or package, or by weight (per kg, quintal or ton). BiltyOne calculates freight as rate × quantity on every GR.',
  },
  {
    term: 'Paid (billing type)',
    slug: 'paid',
    def: 'Paid is the billing type for a GR whose freight is collected from the consignor at the time of booking, before the goods move.',
  },
  {
    term: 'To pay',
    slug: 'to-pay',
    def: 'To pay is the billing type for a GR whose freight is collected from the consignee when the goods are delivered. The driver or delivery office collects the amount shown on the GR.',
  },
  {
    term: 'To be billed (TBB)',
    slug: 'to-be-billed',
    def: 'To be billed, or TBB, is the billing type for a GR whose freight is added to a regular customer’s account and billed later, usually in a monthly statement listing all their GRs for the period.',
  },
  {
    term: 'E-way bill',
    slug: 'e-way-bill',
    def: 'An e-way bill is an electronic document generated on the GST e-way bill portal for the movement of goods, generally required when the consignment value exceeds ₹50,000. Its Part B records the vehicle number and transport document (GR/LR) number.',
    link: { href: '/guides/gr-vs-lr-vs-eway-bill', label: 'GR vs LR vs e-way bill' },
  },
  {
    term: 'POD (Proof of Delivery)',
    slug: 'pod',
    def: 'A POD, or proof of delivery, is the consignee’s signed acknowledgment that the goods arrived. It closes the trip, settles disputes about delivery, and is often needed before to-be-billed freight is paid.',
  },
  {
    term: 'Declared value',
    slug: 'declared-value',
    def: 'Declared value is the value of the goods as stated by the consignor and recorded on the GR. It matters for insurance, claims if goods are lost or damaged, and e-way bill thresholds.',
  },
  {
    term: 'Door delivery',
    slug: 'door-delivery',
    def: 'Door delivery means the transporter delivers the goods to the consignee’s premises rather than the consignee collecting them from the transporter’s godown. It is usually marked on the GR because it can change the charge.',
  },
  {
    term: 'GTA (Goods Transport Agency)',
    slug: 'gta',
    def: 'A GTA, or goods transport agency, is the GST term for a business that provides road transport of goods and issues a consignment note. Most transport companies and transport agents that issue GRs fall under it.',
  },
  {
    term: 'FTL and part load',
    slug: 'ftl-part-load',
    def: 'FTL, or full truckload, is a load that fills a vehicle for one customer, usually priced per trip, KM or ton. A part load (or PTL) shares the vehicle with other customers’ goods and is usually priced per box or by weight.',
  },
  {
    term: 'Freight bill / statement',
    slug: 'freight-bill',
    def: 'A freight bill, or statement, is the transporter’s bill to a customer listing GRs over a period with their freight, amounts paid and balance due. BiltyOne builds one for any customer and date range.',
  },
  {
    term: 'Dispatch and transit',
    slug: 'dispatch',
    def: 'Dispatch is when a loaded vehicle leaves with its documents checked; transit is the period it is on the road until delivery. In BiltyOne a GR moves from Booked to In Transit to Delivered.',
  },
  {
    term: 'Fleet management',
    slug: 'fleet-management',
    def: 'Fleet management is running a company’s vehicles: documents and renewals, maintenance, fuel, tyres, drivers and often GPS tracking. It is related to, but separate from, managing the loads and GRs those vehicles carry.',
  },
  {
    term: 'TMS (Transport Management System)',
    slug: 'tms',
    def: 'A TMS, or transport management system, is software that records, tracks and bills the movement of goods. For Indian road transporters its core is GR/LR creation, customer records, delivery status and freight billing.',
    link: { href: '/transport-management-system', label: 'TMS guide' },
  },
  {
    term: 'Transport ERP',
    slug: 'transport-erp',
    def: 'A transport ERP is an all-in-one system that adds accounting, payroll, fleet maintenance and inventory to transport operations. It suits large fleets; smaller transporters usually start with a focused TMS.',
    link: { href: '/transport-erp-software', label: 'ERP vs TMS' },
  },
];

const url = absoluteUrl('/logistics-glossary');
const definedTermSet = {
  '@type': 'DefinedTermSet',
  '@id': `${url}#terms`,
  name: 'Indian Logistics & Transport Glossary',
  url,
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${url}#${t.slug}`,
    name: t.term,
    description: t.def,
    url: `${url}#${t.slug}`,
    inDefinedTermSet: { '@id': `${url}#terms` },
  })),
};

export default function LogisticsGlossaryPage() {
  return (
    <ContentPage
      path="/logistics-glossary"
      eyebrow="Glossary"
      title="Indian Logistics and Transport Glossary"
      intro="Plain-English definitions of the terms used every day in Indian road transport: bilty, GR, LR, consignor, consignee, to pay, TBB, e-way bill, POD, GTA and more."
      extraJsonLd={[definedTermSet]}
      speakable={['#page-intro']}
      toc={terms.map((t) => ({ id: t.slug, label: t.term }))}
      related={['/guides/what-is-bilty', '/lorry-receipt-software', '/gr-management', '/guides']}
    >
      {terms.map((t) => (
        // H2 drops its top margin as a first child, so the spacing lives on the section.
        <section key={t.slug} className="mt-12 first:mt-0">
          <H2 id={t.slug}>{t.term}</H2>
          <P>{t.def}</P>
          {t.link && (
            <P>
              Read more: <A href={t.link.href}>{t.link.label}</A>
            </P>
          )}
        </section>
      ))}
    </ContentPage>
  );
}
