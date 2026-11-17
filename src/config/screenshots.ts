/**
 * Real screenshots of the BiltyOne web app, captured from the live demo
 * (guest mode, sample data) at 1440x900 and resized to 1920px wide, saved as AVIF.
 * Retake them whenever these screens change; never mock them up.
 *
 * Edge-safe plain data so pages and JSON-LD can share it.
 */

export interface Screenshot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const SCREENSHOTS = {
  grList: {
    src: '/screenshots/gr-list.avif',
    width: 1920,
    height: 1200,
    alt: 'BiltyOne GR list showing GR numbers, consignor and consignee, route, vehicle number, freight, payment and Booked, In Transit or Delivered status',
    caption: 'The GR tab: every GR with its route, freight, payment and status, searchable by GR number, party, vehicle or city.',
  },
  grCreateForm: {
    src: '/screenshots/gr-create-form.avif',
    width: 1920,
    height: 1200,
    alt: 'BiltyOne Create Goods Receipt form with consignor, consignee and GSTIN, booking date, automatic GR number, from and to city, goods, weight, box count, billing type, pricing type, rate, freight, vehicle and driver fields',
    caption: 'Creating a GR: the GR number shows "Auto" and freight is calculated from rate × quantity as you type.',
  },
  customers: {
    src: '/screenshots/customers.avif',
    width: 1920,
    height: 1200,
    alt: 'BiltyOne customer list with each consignor’s phone, email, GSTIN, pricing type and default rate',
    caption: 'The Customers tab: each regular consignor saved once, with GSTIN, pricing type and default rate.',
  },
  printing: {
    src: '/screenshots/printing.avif',
    width: 1920,
    height: 1200,
    alt: 'BiltyOne Printing tab listing customers with a Print GRs button to download a freight bill for a date range',
    caption: 'The Printing tab: pick a customer and a date range to download their freight bill with every GR attached.',
  },
  grListMobile: {
    src: '/screenshots/gr-list-mobile.avif',
    width: 739,
    height: 1600,
    alt: 'BiltyOne GR list on a mobile phone browser with the New Receipt button, search and status filters',
    caption: 'The same GR list in a phone browser. Nothing to install.',
  },
} satisfies Record<string, Screenshot>;
