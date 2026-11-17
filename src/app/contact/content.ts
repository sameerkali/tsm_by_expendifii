import type { Faq } from '@/lib/seo';

/**
 * Contact page copy shared by the client page (visible list) and the server
 * layout (FAQPage JSON-LD), so the two can never drift apart.
 * Answers are 40-60 words and distinct from questions marked up elsewhere.
 */

export const HELP_TOPICS: { title: string; body: string }[] = [
  {
    title: 'A walkthrough',
    body: 'We show you the GR, customer, printing and dashboard screens and answer questions about how your office works today.',
  },
  {
    title: 'Setting up',
    body: 'Your logo and company details, your regular customers, old GRs from Excel, and printing your first GR together.',
  },
  {
    title: 'BiltyOne Desktop',
    body: 'Moving your licence key to a new computer, or restoring records from your latest weekly backup copy.',
  },
  {
    title: 'Partnerships',
    body: 'Partnership requests from businesses that work with Indian transporters. Use the form and tell us what you have in mind.',
  },
];

export const CONTACT_FAQS: Faq[] = [
  {
    q: 'How do I book a BiltyOne demo?',
    a: 'Send the form with your name, company and phone number, or message us on WhatsApp, and we will set up a time that suits you. We reply within one business day, in English or Hindi. If you would rather look around first, the live demo opens BiltyOne with sample data and needs no signup.',
  },
  {
    q: 'Can the BiltyOne team help us set up?',
    a: 'Yes. We can help you add your logo and company details, bring regular customers and old GRs in from Excel, and print your first GR together. Most transporters are running within a day. Tell us roughly how many GRs you create a month and how you keep records today.',
  },
  {
    q: 'What should I include in a support message?',
    a: 'Your company name, the GR number or customer involved, what you expected and what happened instead. A screenshot helps. For something urgent, such as a GR you need to print today, message us on WhatsApp; otherwise use the form or email and we reply within one business day.',
  },
];
