import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { A, AnswerBox, ContentPage, DataTable, H2, OL, P, Screenshot, Strong, UL } from '@/components/content/ContentPage';
import { SCREENSHOTS } from '@/config/screenshots';

export const metadata: Metadata = buildPageMetadata('/online-transport-management-software');

// Keywords: "online transport management software", "transport management
// application". Every claim matches the web app and BiltyOne Desktop as
// shipped (see CORE_APP_SPEC.md and /desktop).

const faqs = [
  {
    q: 'Is there a BiltyOne mobile app?',
    a: 'BiltyOne runs in your phone’s browser, so there is nothing to download from an app store. Open it in Chrome or Safari and add it to your home screen from the browser menu, and it opens like an app. On Windows PCs you can also install BiltyOne Desktop, which works offline.',
  },
  {
    q: 'Do I need to install anything to use BiltyOne online?',
    a: 'No. Sign up at biltyone.com and start creating GRs in your browser. There is no software to install, no server to buy and no updates to run: every improvement reaches you automatically the next time you open BiltyOne. Install BiltyOne Desktop only if you need to work offline.',
  },
  {
    q: 'What happens if my internet connection goes down?',
    a: 'Your records stay safe online, but the web app needs a connection to create or open GRs. If your office often loses internet, use BiltyOne Desktop on a Windows PC: after a one-time activation it creates, prints and searches GRs with no connection at all.',
  },
  {
    q: 'Can I use BiltyOne on more than one device?',
    a: 'Yes. Sign in from any browser, on your office PC, your laptop at home or your phone at the yard, and you see the same GRs, customers and statements. Everything is saved online as you work, so a GR created on the office PC is on your phone a moment later.',
  },
  {
    q: 'How much does online transport management software cost?',
    a: 'It varies from free tools to monthly per-user subscriptions and annual licences. BiltyOne’s online version is currently free for early transporters, with no credit card needed at signup. If paid plans are introduced, existing users get advance notice, and you can export all your data to Excel at any time.',
  },
];

export default function OnlineTransportManagementSoftwarePage() {
  return (
    <ContentPage
      path="/online-transport-management-software"
      eyebrow="Online transport software"
      title="Online Transport Software That Also Works Offline"
      intro="BiltyOne is online transport software for Indian transporters. Open it in any browser on a phone or computer to create, print and track GR/LR from anywhere, and switch to the BiltyOne Desktop application when your office has weak internet."
      aboutSoftware
      faqs={faqs}
      toc={[
        { id: 'what-you-can-do', label: 'What you can do online' },
        { id: 'online-vs-desktop-vs-paper', label: 'Online vs desktop vs paper' },
        { id: 'why-online', label: 'Why transporters are moving online' },
        { id: 'is-it-safe', label: 'Is online transport software safe?' },
        { id: 'application', label: 'A transport management application for phone and PC' },
        { id: 'get-started', label: 'Get started in five minutes' },
      ]}
      related={['/desktop', '/transport-company-software', '/pricing', '/security']}
    >
      <AnswerBox>
        <Strong>Online transport software</Strong> (online transport management software) runs in a web browser instead of being installed on one
        computer. Your GRs, customers and bills are stored securely online, so the owner, the booking clerk and the
        accountant work from the same records on any device. BiltyOne works this way and also offers an offline Windows
        app.
      </AnswerBox>

      <Screenshot shot={SCREENSHOTS.grList} priority />

      <H2 id="what-you-can-do">What you can do online with BiltyOne</H2>
      <UL
        items={[
          <>
            <Strong>Create GR / LR (bilty)</Strong> with automatic GR numbers and freight calculated per KM, box, kg, quintal
            or ton.
          </>,
          <>
            <Strong>Print three copies</Strong> (driver, consignor, consignee) with your logo, GSTIN, PAN and address, or save
            the PDF to share.
          </>,
          <>
            <Strong>Save customers once</Strong> and pick them from a list; pincode lookup fills in city and state.
          </>,
          <>
            <Strong>Track every load</Strong> as booked, in transit or delivered, and every payment as pending or paid.
          </>,
          <>
            <Strong>Send freight statements:</Strong> a PDF bill for any customer and date range, with every GR attached.
          </>,
          <>
            <Strong>Find anything</Strong> by GR number, consignor, consignee, vehicle number or city.
          </>,
          <>
            <Strong>Import and back up:</Strong> bring old records in from Excel or CSV and download a full Excel backup at
            any time.
          </>,
          <>
            <Strong>See the business at a glance</Strong> on the dashboard: revenue, GRs booked, loads in transit and pending
            payments.
          </>,
        ]}
      />

      <H2 id="online-vs-desktop-vs-paper">Online vs desktop vs paper</H2>
      <P>Both BiltyOne versions create the same GRs. Choose by how your office works:</P>
      <DataTable
        caption="BiltyOne online web app compared with BiltyOne Desktop and a paper GR book"
        highlight={1}
        headers={['', 'BiltyOne online', 'BiltyOne Desktop', 'Paper GR book']}
        rows={[
          ['Runs on', 'Any browser, phone or computer', 'One Windows 10/11 PC', 'A desk'],
          ['Internet', 'Needed while you work', 'Only once, to activate', 'Not needed'],
          ['Access from anywhere', 'Yes', 'No, that one PC', 'No'],
          ['Where data lives', 'Stored securely online', 'On your PC, plus a weekly backup copy', 'In the book'],
          ['Backups', 'Online, plus Excel download', 'Backup file, auto-backups and Excel', 'None'],
          ['Updates', 'Automatic', 'Installed by you', 'Not applicable'],
          ['Dashboard', 'Included', 'Not included', 'No'],
          ['Cost', 'Free for early transporters', 'Free download, 7-day trial', 'Books, carbon and staff time'],
        ]}
      />

      <H2 id="why-online">Why transporters are moving online</H2>
      <UL
        items={[
          <>
            <Strong>Work from anywhere.</Strong> Check a GR or a customer’s pending payments from home, from the yard or
            while travelling, without calling the office.
          </>,
          <>
            <Strong>No single point of failure.</Strong> A crashed computer, a lost pen drive or a flooded office no longer
            means lost records.
          </>,
          <>
            <Strong>Always up to date.</Strong> Improvements arrive automatically. Nobody has to install updates or call an
            engineer.
          </>,
          <>
            <Strong>Faster month-end.</Strong> Statements are built from GRs already in the system, so billing a customer
            takes minutes.
          </>,
          <>
            <Strong>Nothing to buy.</Strong> No server, no installation fee, no annual maintenance contract.
          </>,
        ]}
      />

      <H2 id="is-it-safe">Is online transport software safe?</H2>
      <P>
        It is usually safer than paper or a single office PC. BiltyOne encrypts data between your browser and our servers
        and stores your records encrypted. Only people signed in to your company account can see your data. You can also download a complete Excel backup whenever you
        like, so your records are never locked inside the software. Details are on our{' '}
        <A href="/security">security page</A>.
      </P>

      <H2 id="application">A transport management application for phone and PC</H2>
      <P>
        BiltyOne is available as two applications. The <Strong>web application</Strong> works on Android phones, iPhones,
        tablets, Windows PCs and Macs in any modern browser; on a phone, use “Add to Home screen” in the browser menu and
        BiltyOne opens like an app. The <Strong>desktop application</Strong>,{' '}
        <A href="/desktop">BiltyOne Desktop</A>, installs on Windows 10 or 11 and keeps working with no internet after a
        one-time activation.
      </P>
      <Screenshot shot={SCREENSHOTS.grListMobile} phone />
      <P>Choose the desktop application if:</P>
      <UL
        items={[
          'Your office or yard regularly loses internet during the day.',
          'You prefer your records stored on your own computer.',
          'GRs are made on one fixed PC next to the printer.',
        ]}
      />

      <H2 id="get-started">Get started in five minutes</H2>
      <OL
        items={[
          <>
            <A href="/register">Create a free account</A> with your name, phone number and company details. No credit card.
          </>,
          'Check your company details and upload your logo in Settings. They print on every GR.',
          'Add your regular customers. If you have old GRs in Excel, import them too.',
          'Create your first GR: pick the customer, enter route, goods and rate, and save.',
          'Print the three copies, or save the PDF to share.',
        ]}
      />
      <P>
        Prefer to look around first? The <A href="/live-demo">live demo</A> opens BiltyOne with sample data and no signup.
      </P>
    </ContentPage>
  );
}
