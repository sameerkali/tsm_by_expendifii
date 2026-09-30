# BiltyOne — The Complete Functional Guide

Everything the BiltyOne web app does, screen by screen and rule by rule, including edge cases, gaps and things that are built but switched off. There is no code in this document; it describes behaviour only.

**Scope.** This covers the frontend in this repository: the public website and the logged-in app. The backend is a separate service. Where a behaviour depends on the backend, this guide says so instead of guessing.

**Basis.** A full read of every source file in the repository as of 30 September 2026 (last commit: 18 September 2026).

**How to read it.** Sections 1–6 give the big picture. Sections 7–18 go through every feature. Sections 19–23 are reference material. Sections 24–26 list the gaps, known issues and unused pieces in one place.

---

## Contents

1. What BiltyOne is
2. Names, brands and domains
3. Glossary: transport terms and system values
4. How the system is put together
5. Every page (route map)
6. Who can open what (access rules)
7. Accounts: register, log in, reset password, log out
8. Sessions, expiry and deactivated accounts
9. Plans, coupons and activation
10. The app shell: sidebar, top bar, feature flags
11. Goods Receipts (GR)
12. Customers
13. Printing (customer GR statements)
14. Dashboard
15. Settings
16. Guest mode (live demo)
17. Shared behaviours
18. The public website
19. Search engines, AI agents and machine-readable content
20. Security and privacy behaviour
21. Reference: what is stored in the browser
22. Reference: every backend call the app makes
23. Reference: environment settings, scripts and tests
24. What the website and legal pages promise vs what the app does
25. Master list of edge cases and known issues
26. Built but not in use

---

## 1. What BiltyOne is

BiltyOne is a web-based Transport Management System (TMS) for Indian road transporters. The target user is a small-to-mid fleet owner or dispatcher (roughly 1–50 trucks), with an early focus on Delhi NCR. It replaces paper GR books and Excel sheets.

What the app actually lets a user do today:

- **Goods Receipts (GRs):** create, edit, duplicate, delete, search, filter by status, and open a GR as a PDF.
- **Customers:** keep a directory of consignors with pincode-based address autofill. A new customer can also be created automatically while making a GR.
- **Printing:** download one customer's GRs for a date range as a PDF statement.
- **Dashboard:** a feature carousel plus revenue, GR-status and customer metrics.
- **Settings:**
  - company profile and logo
  - theme and text size
  - subscription days
  - Excel backup and Excel/CSV import
  - sign out and cookie preferences
  - account-deletion request
- **Guest "live demo":** a read-only tour of the app with sample data, no signup.
- **Access:** unlocked by coupon codes. The public messaging says the product is free during early access.

The public website adds:

- marketing and SEO pages, legal pages and a contact form
- agent-readable content (llms.txt and Markdown versions of pages)

---

## 2. Names, brands and domains

The product has been renamed more than once, and traces of each name remain.

| Name / trace | Where it appears |
| --- | --- |
| **BiltyOne** | Current brand. Every page title, the logo ("Bilty" + blue "One"), emails, legal pages. |
| **Bilty Pro** | README, the project package name, the "/why-biltypro" page address, the performance-test config (biltypro.com). |
| **BP** | Faint watermark on the collapsed sidebar; prefix of some stored browser settings. |
| **TMS / TSM** | Older internal name. Seen in the backup file name ("tsm_complete_backup_…"), the stored page-size setting, the Appearance text ("Customize how TMS looks"), "Managing TMS Account", and the coupon example format "TMS-XXXXXX-XXXXXXXX". |
| **biltyone.com** | Live domain. |
| **tsm.expendifii.com** | Old domain. Every path on it permanently redirects to the same path on biltyone.com. |
| **/why-tsm** | Old page address. Permanently redirects to /why-biltypro. |

Founder/contact shown publicly: Sameer Faridi, <work.sameerfaridi@gmail.com>, 338, 6A Mahipalpur, New Delhi 110037. The About page lists a second team member, Dev Sharma (backend engineer).

---

## 3. Glossary: transport terms and system values

### Transport terms

| Term | Meaning in BiltyOne |
| --- | --- |
| **GR (Goods Receipt)** | The core document. Proof that the transporter has received goods for carriage. Also called **LR (Lorry Receipt)**, **consignment note** or **bilty**. |
| **GR number** | Assigned automatically by the backend when a GR is created. It cannot be typed in. Sample data uses the format GR-0001. |
| **Consignor** | Sender of the goods. This is the side that links to a saved **customer**. |
| **Consignee** | Receiver of the goods. Always free text; never linked to a customer. |
| **Freight / Freight amount** | Transport charge. Always calculated as Rate × Quantity; cannot be typed manually. |
| **Pricing type** | The unit the rate is charged per: KM, Box, KG, Quintal or Ton. |
| **Billing type** | Who pays and when: To Paid, To be Billed, or Paid. |
| **GST paid by** | Consignor, Consignee or Transporter. |
| **E-way bill** | Government transport permit number; stored as free text. |
| **Door delivery** | Yes/no flag for delivery to the consignee's door. |
| **Ship to address** | Delivery address, if different. |
| **Value** | Declared value of the goods in rupees. |
| **Insurance** | Insurer, policy number, date, amount and risk covered. |
| **POD** | Proof of Delivery. Appears only in the glossary page, not in the app. |

### Fixed system values

| Field | Possible values | Display / notes |
| --- | --- | --- |
| GR status | BOOKED, IN_TRANSIT, DELIVERED | Booked (grey), In Transit (amber), Delivered (blue). New GRs default to Booked. |
| Payment status | PENDING, PAID | Every GR created in the app is Pending; there is no screen to change it (see 11.2). |
| Billing type | TO_PAID, TO_BE_BILLED, PAID | "To Paid" (default), "To be Billed", "Paid". |
| Pricing type | KM, BOX, KG, QUINTAL, TON | "Per KM", "Per Box", "Per KG" (GR default), "Per Quintal", "Per Ton". |
| GST paid by | CONSIGNOR, CONSIGNEE, TRANSPORTER | Optional; blank allowed. |
| Account status | ACTIVE, INACTIVE (DELETION_REQUESTED also recognised) | Comes from the backend. |
| Deletion request status | PENDING, REJECTED (an approved request ends the account) | Affects Settings (see 15.8). |
| Coupon | active / used / expired flags, start date, expiry date, duration in days | Drives plan status (see section 9). |

---

## 4. How the system is put together

- **One web app, two halves:**
  - The public website: marketing, SEO and legal pages.
  - The logged-in app: GR, Customers, Printing, Dashboard, Settings.
- **All backend traffic goes through the site's own relay.** The browser never calls the backend directly. Every request goes to the BiltyOne site, which forwards it to the backend with the user's cookies attached. On the way back, the relay:
  - rewrites the login cookie so it belongs to the BiltyOne domain
  - makes the cookie valid for the whole site and "Lax" (sent on normal navigations)
  - marks it Secure only in production
  - If the backend cannot be reached at all, the relay answers "Proxy connection error to backend".
- **External services called straight from the browser:**
  - India Post pincode lookup, for address autofill.
  - Cloudinary, for company-logo uploads. The backend signs each upload first.
  - Vercel Analytics and Speed Insights, on every page.
  - Google's "Preferred Sources" script from news.google.com, loaded lazily on every page.
- **Freshness:**
  - Lists and dashboard data are reused for about 1 minute before refetching; a failed request is retried once.
  - The user profile is reused for 5 minutes and is not retried.
- **Deliberate full-page reloads** happen after login, coupon activation, logout, guest entry and session expiry. This guarantees no stale data survives.
- **Installable:** a web-app manifest (name BiltyOne, standalone display) exists. There is no offline support.

---

## 5. Every page (route map)

### Public (anyone)

| Address | What it is |
| --- | --- |
| / | Homepage. Logged-in users and guests are redirected to /gr instead. |
| /features | Feature overview |
| /product | Product tour with dashboard screenshot |
| /why-biltypro | Why BiltyOne, with a comparison table |
| /about | Founder story, mission, timeline, team |
| /contact | Contact form |
| /faq | 11 questions and answers |
| /security | Security practices, and how to report a vulnerability |
| /developers | API status and machine-readable resources |
| /live-demo | Starts guest mode, then goes to /gr |
| /gr-management, /lorry-receipt-software, /transport-management-system, /digital-transport-management, /transport-business-automation | SEO content pages, each ending in a call-to-action box |
| /logistics-glossary | 10 term definitions |
| /privacy-policy, /terms-and-conditions, /user-agreement, /cookie-policy | Legal pages |

### Sign-in pages (only when not logged in and not a guest)

| Address | What it is |
| --- | --- |
| /login | Sign in, or "Use as guest" |
| /register | Create a company account |
| /forgot-password | Email → OTP → new password |

### App pages (need the login cookie or the guest cookie)

| Address | What it is |
| --- | --- |
| /gr | GR list: the landing page after login |
| /customers | Customer list |
| /customers/*id* | One customer's details |
| /printing | Customer GR statements |
| /dashboard | Carousel and metrics ("Command Center") |
| /settings | Settings hub. Sections open with ?tab=company, appearance, subscription, download, import, session, cookies or danger. |
| /demo | "I Am Demo": a feature-flag test page, hidden by default |
| /gr/new, /gr/*number*, /gr/*number*/print | Unfinished placeholder pages that show only the words "new gr", "one GR", "one GR print" |

### Machine files

/llms.txt, /sitemap.xml, /robots.txt, /manifest.webmanifest.

Anything else shows the 404 page (see 18.7).

---

## 6. Who can open what (access rules)

Every page request is checked in this order before the page loads:

1. **Machine files** (robots, sitemap, llms.txt, favicon, manifest, Google verification files) always pass.
2. **Markdown requests.** If the visitor asks for Markdown and the page is one of the 19 public pages that has a Markdown version (every public page except the FAQ), the Markdown is returned (see section 19).
3. **"Signed in" means a cookie is present.** Either the login cookie or the guest cookie counts. The cookie's validity is not checked here.
4. **Homepage.** Signed-in users and guests go to /gr; everyone else sees the homepage.
5. **Public info pages** always open.
6. **Login, Register and Forgot Password.** Signed-in users and guests go to /gr. One exception: /login?reason=deactivated deletes the login cookie and shows the login page (see 8.3).
7. **App pages.** With no login cookie and no guest cookie, the visitor goes to /login.
8. **Anything else** gets a real 404. This deliberately avoids redirecting unknown addresses to login.

The app adds its own checks after the page loads:

- the profile must load successfully (see section 8)
- the page's feature flag must be on (see 10.3)

**Edge cases**

- **Guests are locked out of the homepage, login and register** for as long as the guest cookie lives (8 hours). They must use Sign Out first.
- **Public paths are matched by prefix.** Anything that starts with a public path passes the gate and then shows the 404 page. For example, "/contact-us" and "/about-anything" both do this.
- **The FAQ page is missing from the public list.** It still opens for everyone, because unknown non-app addresses are handed to the normal router. But a Markdown request for /faq gets a "404" Markdown reply even though the page exists.
- **Presence is not validity.** An expired login cookie still counts as signed in at this stage. The app only finds out when a backend call returns "unauthorised".
- **Possible redirect loop.** If the browser keeps a login cookie that the backend rejects, the following can repeat:
  1. The app sends the user to /login.
  2. The gate sees the cookie and sends them back to /gr.
  3. The profile fails to load, so the app sends them to /login again.

  The only automatic cookie clearing is the "deactivated" path. This stays safe only as long as the backend's cookie expires together with the token.

---

## 7. Accounts: register, log in, reset password, log out

All three sign-in pages share one layout:

- the form on the left, about 60% of the width
- a random photo on the right, one of three, on large screens only
- a back arrow in the top-left corner that returns to the homepage

### 7.1 Register (/register)

Headline: "Less paper. More trucks. Zero leaks." Sub-line: "Sign up and run your transport business 90% faster".

| Section | Field | Required | Rules |
| --- | --- | --- | --- |
| Personal | Full name | Yes | Up to 60 characters. |
| Personal | Email | Yes | Valid email, up to 254 characters. |
| Personal | Phone | Yes | Exactly 10 digits; non-digits are removed as you type; no +91. |
| Personal | Password | Yes | 6–30 characters; show/hide eye button. |
| Personal | Referral code | No | Up to 10 characters; shown in capitals. |
| Company | Company name | Yes | Up to 60 characters. |
| Company | GSTIN | Effectively yes (see edge cases) | Converted to capitals. Format: 2 digits, 5 letters, 4 digits, 1 letter, 1 character, "Z", 1 character (e.g. 22AAAAA0000A1Z5). |
| Company | PAN | Effectively yes | Converted to capitals. Format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F). |
| Company | Contact person | No | Up to 60 characters. |
| Company | Company phone | No | Exactly 10 digits if entered. |
| Company | Company email | No | Valid email if entered. |
| Address | Pincode | No (placeholder shows "*") | Digits only, 6 digits. Starts the automatic lookup (see 17.1). |
| Address | House / Street / Landmark | No | Up to 200 characters. |
| Address | Locality / Area | No | Picked from the lookup list, or typed in manual mode. |
| Address | District, State | No | Filled in by the lookup and locked with an "Auto-filled" note; a pencil icon unlocks each one. |
| Bank | Bank name | No | Searchable list of about 235 Indian banks. You must pick from the list. |
| Bank | Account holder | No | Up to 30 characters, even though the box accepts 80. |
| Bank | Account number | No | 9–18 digits. |
| Bank | IFSC | No | 4 letters, then "0", then 6 letters or digits (e.g. SBIN0001234); converted to capitals. |
| — | Agreement checkbox | Yes | Links to the User Agreement, Terms & Conditions and Privacy Policy, each opening in a new tab. |

- **Button rules.** "Create Account" stays disabled until the box is ticked and these are all filled: name, email, phone, password, company name, GSTIN and PAN.
- **Safety filter.** Text fields reject anything containing "<script", an "on…=" pattern, or "javascript:". The error reads "… contains disallowed content".
- **On submit:**
  - Empty optional fields are dropped.
  - Bank details are sent only if at least one bank field is filled.
  - The referral code is trimmed.
- **On success:**
  1. A toast shows the server's message, or "Account created! Activate with your coupon code."
  2. The page reloads into /gr.
  3. New accounts need a coupon before a plan is active (section 9).
- **On failure:** a toast with the translated error (see 17.3).

**Edge cases**

- **GSTIN and PAN block signup when empty.** Validation treats them as optional, but the button stays disabled until both are filled. A transporter without a GSTIN cannot register.
- **Pincode "*" is misleading.** The placeholder marks it as required, but it is optional.
- **Account holder length.** A name over 30 characters is rejected although the box accepts 80.
- **Banks outside the list** cannot be entered.
- **Editing a looked-up pincode** clears city, district and state.
- **Phone format.** Exactly 10 digits with no country code; +91 cannot be entered.

### 7.2 Log in (/login)

Heading "Welcome back". Fields:

- **Email:** required, valid, up to 254 characters. Trimmed and lower-cased before sending.
- **Password:** 6–30 characters, with a show/hide button.

Links on the page:

- "Register your company"
- "Forgot password?"
- "Use as guest", which enters guest mode and reloads into /gr (see section 16)

**On success**, in order:

1. Leaves guest mode, if it was on.
2. Clears all cached data.
3. Fetches the profile and caches it in the browser.
4. Shows a toast:
   - "Welcome back!", or
   - "Account is inactive. Click the activation banner to enter your coupon code." when the account status is INACTIVE.
5. Reloads into /gr.

**On failure:**

- An "unauthorised" answer shows "Invalid email or password. Please try again.", whatever the backend's actual reason. The only exceptions are messages about expiry, invalid tokens, coupons or logging in.
- Other errors are translated (17.3).

### 7.3 Forgot / reset password (/forgot-password)

**Step 1 — email.**

1. The user enters an email, which must be in a valid format.
2. The app shows the toast "If an account with that email exists, a password reset OTP has been sent." This happens whether or not the account exists, by design.
3. The form moves to step 2.

**Step 2 — reset.**

- **OTP code:** exactly 6 digits; the box is focused automatically and supports phone OTP autofill.
- **New password:** at least 6 characters.
- **Confirm password:** must match.
- **Auto-submit:** the moment the sixth OTP digit is typed, the form submits if both passwords are already valid and matching. Otherwise the cursor jumps to the password box.
- **Where errors appear:** server errors mentioning "OTP" show under the OTP box; errors mentioning "password" show under the password box; anything else shows at the top.
- **On success:** the toast "Password reset successful. Redirecting to login..." appears, then the page goes to /login after 2 seconds.

**Edge cases**

- **No resend.** There is no "resend OTP" button.
- **No way back.** Step 1 can only be reached again by reloading the page.
- **Long passwords lock you out of the login form.** Reset has no maximum length, but the login form rejects passwords over 30 characters. A user who sets a 31+ character password cannot log in through the form.
- **Default title.** The page has no title of its own; the browser tab says "BiltyOne".

### 7.4 Log out

Available from the sidebar "Sign Out" button and from Settings → Active Sessions & Security.

- **Confirmation (sidebar):** title "Sign Out", heading "Leaving so soon?", text "Okay peace out. Log back in when you want your dashboard to acknowledge your existence again.", buttons "Yes, log me out" and "Cancel".
- **Confirmation (Settings):** "Sign Out Session" wording.
- **What it does:**
  1. Tells the backend to log out. This is skipped for guests.
  2. Always clears the cached profile, guest mode and all cached data.
  3. Reloads to /login.
  4. Steps 2–3 happen even if the backend logout fails, so the user is never stuck.

---

## 8. Sessions, expiry and deactivated accounts

### 8.1 How the app knows who you are

- **The login cookie** is set by the backend and is invisible to page scripts ("httpOnly"). It is named "token" by default and can be renamed through configuration. Its lifetime is whatever the backend sets.
- **The profile is also cached in the browser.** This lets the app draw the screen instantly on the next visit. The cached copy is treated as fresh for 5 minutes. So plan days, feature flags and company details can be up to 5 minutes old. Opening Settings forces a fresh copy.
- **While the profile loads**, the app shows only a full-screen spinner.
- **If the profile cannot be loaded**, the cached copy is cleared and the page reloads to /login. The deactivated case is the exception (8.3).
- **All requests time out after 30 seconds.**

### 8.2 Session expiry ("unauthorised" answers)

When any backend call returns "unauthorised" (except the login, register, activation, profile, password and logout calls themselves):

- **If the message says the account is "not found", "inactive" or "deactivated":**
  1. The app quietly calls logout.
  2. It opens the Deactivated Account dialog (8.3).
- **Otherwise**, and only for non-guests: the cached profile is removed and the page reloads to /login.
- **Guests are never redirected** by this rule.

### 8.3 Deactivated accounts

The app detects deactivation in two places:

- during normal use (8.2)
- on a fresh page load, when the profile request itself fails with that message

When detected, a red dialog appears:

- icon, the title "Account Deactivated", the backend's message, and "You will be logged out automatically."
- one "Logout" button

What happens next:

- **Any way of closing logs out:** clicking the button, clicking the dark backdrop, or pressing Escape.
- **Logout** clears the cached profile, the deactivation flag, guest mode and cached data, then goes to /login?reason=deactivated.
- **That special address** makes the gate delete the login cookie, so the user can reach the login page instead of bouncing back to /gr.
- **While the dialog is open**, the app's usual "redirect to login when unauthenticated" is paused, so the dialog stays visible.

**Edge case:** despite the text, nothing logs the user out automatically. There is no timer; the user must act.

---

## 9. Plans, coupons and activation

### 9.1 How plan status is worked out

A user's plan is the set of coupons on their account.

**Which coupons count.** A coupon counts only if all of these are true:

- it is active
- it has been used (redeemed)
- it has both a start date and an expiry date
- its expiry is still in the future

**Days left** is added up across the counted coupons:

- a coupon already running adds the days until its expiry, rounded up
- a coupon scheduled to start later adds its full duration

Stacking coupons therefore adds days.

**The rest:**

- **Plan active** means at least one coupon counts.
- **Progress percentage** is days left divided by the total duration of the counted coupons.
- **The account's own ACTIVE/INACTIVE status does not drive these warnings.** Only coupons do. The account status is used only for the login toast.

### 9.2 Where plan status is shown

- **Sidebar card** (when the sidebar is expanded; never for guests):
  - With a plan: "PLAN · *N*d left" and a progress bar. The bar is red at 20% or less, amber at 50% or less, blue otherwise.
  - Without a plan: "⚠ No active plan" with "Activate Account" and "Contact Admin" (goes to /contact).
- **Activation banner** across the top of every app page, when logged in, not a guest, and no plan is active: "Account not activated — Click to activate with a coupon code". Clicking it opens the activation dialog.
- **Settings hub:** a green or red dot on the avatar, and a "Verified" or "⚠ No active plan" badge.
- **Settings → Subscription & Billing** (15.3).

**Important:** the frontend does not lock any screen when the plan is inactive. All of the above is a warning only. Whether data actually loads or saves depends on the backend.

### 9.3 Activating a coupon

- **Where it opens:** the activation banner, the sidebar "Activate Account", or Settings → Subscription → "Activate Coupon".
- **What it shows:** a photo on the left, "Enter your coupon code", and a coupon box (1–30 characters, automatically capitalised, example TMS-RBOQVJ-MR5BVA5R). Below are "Activate Now" and "Need a coupon? Contact your admin" (goes to /contact).
- **Closing:** X, Escape, or clicking outside. Page scrolling is locked while it is open.
- **On success:**
  1. Toast "Account activated! Valid for *N* days.", or "Account activated successfully!".
  2. Guest mode is cleared.
  3. The profile is refreshed.
  4. The page reloads into /gr.
- **How error messages are translated** (shown under the box):
  - "invalid or already used coupon" becomes **"wrong coupon"**.
  - "authentication required" or "please login" becomes **"please login and active after that"**.
  - Any message containing "expired" becomes **"Your session has expired. Please log in again."** An expired *coupon* is therefore reported as an expired *session*.
  - Other coupon messages are shown as the backend wrote them.

### 9.4 Referrals

- A referral code can be entered at signup.
- The user's own code is shown in Settings → Company (with a copy button), or "NOT GENERATED" if there is none.
- Per the FAQ and User Agreement, when a referred transporter buys a paid plan, both sides get 15 extra days. This is applied by the backend; the frontend has no referral screen.

---

## 10. The app shell: sidebar, top bar, feature flags

### 10.1 Sidebar

- **Top:** the BiltyOne logo.
- **Tabs, in order:** GR, Dashboard, Customers, Printing, Settings, and "I Am Demo" (hidden by default). GR comes first because it is the landing page.
- **Desktop:** the sidebar collapses to an icon-only rail. Tab names then appear as hover tooltips, and a faint vertical "BP" watermark shows.
- **Mobile:** a slide-in drawer opened with the menu button. It closes on a backdrop tap, on Escape, or after navigating.
- **Bottom:** the plan card (9.2), then Sign Out.
- **Highlighting:** only an exact address match is highlighted. On a customer detail page, no tab is highlighted.

### 10.2 Top bar

- **Left:** the menu toggle. It is the mobile drawer button on phones and the collapse/expand button on desktop, and shows an X when open.
- **Right:**
  - the user's name in capitals ("…" while loading)
  - a "Guest Preview" pill for guests
  - an avatar: the company logo, or up to two initials

  Clicking this area opens Settings.

### 10.3 Feature flags (which tabs a user gets)

- **Source:** the backend sends a set of on/off flags with the profile. Each sidebar tab has one.
- **The five original tabs** (GR, Dashboard, Customers, Printing, Settings) count as on if the backend says nothing about them. This protects existing users during rollouts.
- **Any newer tab** (currently "I Am Demo") counts as off unless the backend turns it on.
- **A hidden tab opened by address** redirects, without a page reload, to the first tab that is still on.
- **If every tab is off**, the content area shows "No features enabled — Your account doesn't have access to any modules right now. Contact your administrator." on every page.
- **Guests** skip flag checks. They see the five main tabs, and can reach "I Am Demo" by typing its address.
- **The backend also enforces flags** on its API, according to the code notes. The frontend's hiding is a convenience, not security.

### 10.4 "I Am Demo" (/demo)

A reference page that proves the flag system works end to end. It fetches a message from the backend and shows it under the heading "I Am Demo" ("FEATURE FLAG REFERENCE").

---

## 11. Goods Receipts (GR)

### 11.1 GR list (/gr)

**Header:** "FREIGHT MANAGEMENT · Goods Receipts · *N* RECORDS", with a "New Receipt" button. Guests also see: "Guest preview uses static data. Create, edit, delete, duplicate, and PDF actions are disabled."

**Filters:**

- **Search box:** "Search by GR number, consignor, vehicle…". It searches 0.5 seconds after the user stops typing. The backend decides which fields match.
- **Status chips:** All, Booked, In Transit, Delivered.
- **Changing** the search, a status chip or the page size jumps back to page 1.

**Table columns:**

| Column | Shows |
| --- | --- |
| GR Details | GR number, and booking date as YYYY-MM-DD |
| Consignor → Consignee | Both names, plus "Customer: *name*" when a customer is linked |
| Route | From city → To city, and vehicle number (or "-") |
| Freight | "₹ 1,500" in Indian format, and "*PRICING* × ₹*rate*" |
| Payment | Pending or Paid |
| Status | Coloured status badge |
| Actions | Print, Duplicate, Edit, Delete |

**Table states:**

- Loading: "Loading goods receipts…"
- Error: "Failed to load GRs. Please try again."
- Empty: "No goods receipts found."

Pagination is described in 17.4.

### 11.2 Create / edit panel

- **Layout:** a panel slides in from the right. It is full width on phones and about 80–85% of the width on desktop.
- **Header:** "NEW RECORD · Create Goods Receipt" or "EDIT RECORD · *GR number*".
- **Closing:** X, Cancel, or clicking the dark overlay. Escape does nothing. There is no "unsaved changes" warning.
- **Reset:** the form starts fresh every time it opens.

**Left column**

| Field | Required | Default | Rules and behaviour |
| --- | --- | --- | --- |
| Consignor (Sender) | Yes | — | Search box, up to 60 characters. Letters, numbers, spaces, and . - ' & only. Typing opens the customer dropdown (11.3). |
| Consignor Phone | No | — | Digits only, max 10, with a live "*n*/10" counter. Exactly 10 if entered. The border turns blue at 10. |
| *New-customer block* | See 11.3 | — | Address, Pincode, City/Locality, State. Only when creating, with an unlinked new consignor. |
| Consignor GST | No | — | GSTIN format, converted to capitals. Up to 15 characters. |
| Consignee (Receiver) | No | — | Up to 60 characters; same allowed characters as Consignor. |
| Consignee GST | No | — | GSTIN format, capitals. |
| Booking Date | — | Today | New GR: cannot be before today (future dates allowed). Edit: any date. |
| GR Number | — | "Auto" | Read-only. The backend assigns it. When editing, shows the real number. |
| From City | Yes | — | Up to 60 characters. Letters, numbers, spaces, and . - ' only. |
| To City | Yes | — | Same as From City. |
| Ship To Address | No | — | Up to 300 characters; HTML tags removed. |
| Door Delivery | — | Off | On/off switch. |
| Invoice Number | No | — | Up to 60 characters. Letters, numbers, spaces, and - / only. |
| E-way Bill Number | No | — | Up to 60 characters; no format check. |
| Insurance: Company / Policy No. / Date / Amount (₹) / Risk | No | — | Company and policy up to 80 characters; risk up to 120. Amount 0–9,999,999 with at most 2 decimals. Insurance is sent only if at least one insurance field is filled. |
| Status | — | Booked | Three buttons: Booked, In Transit, Delivered. |

**Right column**

| Field | Required | Default | Rules and behaviour |
| --- | --- | --- | --- |
| Product Description | No | — | Up to 300 characters. Letters, numbers, spaces, and , . - / # ( ) & only. |
| Weight (kg) | Marked "*" (see edge cases) | — | Number ≥ 0 with at most 2 decimals; max 7 characters typed. Up/Down arrow keys add or subtract 1. It is the quantity for every pricing type except Per Box. |
| Box Count | Marked "*" | — | Whole numbers only ("." blocked); max 7 characters. It is the quantity for Per Box. |
| Billing Type | — | To Paid | To Paid, To be Billed, or Paid. |
| Pricing Type | — | Per KG | Per KG, Per Box, Per KM, Per Quintal, or Per Ton. |
| Rate (₹) | Marked "*" | — | Number 0–9,999,999, at most 2 decimals, max 7 characters typed. |
| Freight Amount (₹) | Yes | ₹ 0.00 | Calculated and read-only (11.4). |
| GST Paid By | No | Blank | Consignor, Consignee, or Transporter. |
| Vehicle Number | No | — | Converted to capitals as you type; special characters removed. Up to 15 characters are valid, though the box accepts 20. |
| Driver Name | No | — | Up to 60 characters. Letters, spaces, and . - ' only. |
| Driver Document ID | No | — | Licence or Aadhaar number, up to 60 characters; no format check. |
| Driver Mobile | No | — | Digits only, max 10, with a counter. Exactly 10 if entered. |
| Remarks | No | — | Up to 300 characters; same characters as Product Description. |
| Value (₹) | No | — | Declared goods value. Digits only, up to 30 digits, stored as text. |

**Behaviour of all number boxes:**

- The minus sign and the letter "e" are blocked.
- Scrolling the mouse wheel over a number box does not change it.

**Not in the form: Payment Status.** The field exists but is hidden. Every GR created in the app is saved as Pending, and **no screen lets a user mark a GR as Paid**.

### 11.3 Linking the consignor to a customer

- **Search:** typing in Consignor opens a dropdown of matching customers. It searches 0.4 seconds after typing stops, on the backend, and shows name, phone and city for each.
- **Dropdown states:**
  - "Searching…"
  - "No matches found. You can save this as a new customer."
- **Selecting a customer** shows a blue "Customer Linked" badge (name · phone) and fills in:
  - consignor name, phone and GST
  - the customer's address, city, state and pincode (held in the form for reference)
  - **From City**, set to the customer's city, but only if From City is empty
  - **Pricing Type**, if the customer has one
  - **Rate**, set to the customer's default rate, if they have one
- **While linked**, Consignor, Phone and GST are read-only.
- **"Clear"** (create mode only) unlinks the customer. It also wipes all consignor fields, resets pricing to Per KG, and empties Rate and From City.
- **Hidden dropdown:** the dropdown never appears in edit mode or while a customer is linked.

**New-customer block.** It appears when all of these are true:

- the user is creating a GR (not editing)
- the consignor is not linked
- the typed name does not exactly match (ignoring capitals) a customer in the current search results

The block is titled "Additional Details" and contains:

- **Address** (required): up to 300 characters. Letters, numbers, spaces, and , . - / # ( ) only.
- **Pincode** (required): 6 digits, with automatic lookup (17.1).
- **City / Locality** (required): picked from the lookup, or typed in manual mode. Up to 50 characters are valid.
- **State** (required): auto-filled and locked, with a pencil to edit. Up to 50 characters.

### 11.4 Freight calculation

**Freight = Rate × Quantity.** Quantity is the Box Count for Per Box, and the Weight box for everything else (KG, KM, Quintal, Ton). The result is rounded to 2 decimals. It recalculates live whenever the rate, weight, box count or pricing type changes, and it cannot be typed.

What this means in practice:

- **Per KM:** the distance goes in the box labelled "Weight (kg)".
- **Per Quintal and Per Ton:** quintals or tons go in the box labelled "Weight (kg)". The label never changes.
- **Editing an old GR:**
  - Freight is recalculated as soon as the panel opens.
  - If the saved freight differed from rate × quantity, it is silently replaced on save.
  - If the old GR has no rate or quantity, freight shows ₹ 0.00 and the save button stays disabled.

### 11.5 Saving

- **Button:** "Create GR" or "Save Changes"; shows "Saving…" while working.
- **When the button is enabled:** Consignor, From City and To City must be filled, and freight must be above zero. In practice, freight above zero means Rate plus the relevant quantity must be filled.
- **Checking on submit:** every field is checked. Problems show under each field, with the toast "Please fix the errors in the form before submitting."

**Automatic customer creation** (new GRs only). It happens when the consignor is not linked and both the consignor name and the consignor phone are filled:

1. A customer is created first, with:
   - name, phone, GST (capitalised)
   - address, city, state and pincode
   - **this GR's pricing type and rate as the customer's defaults**
2. Toast: "Customer "*name*" created successfully."
3. The GR is created and linked to that customer.

If step 1 fails, the GR is not created. If step 1 succeeds but the GR fails, the customer stays linked in the open form, so a retry does not create a duplicate customer.

**Name without phone:** the GR is saved with a free-text consignor and no customer.

**What is sent:**

- Only filled values are sent. Blanks are left out, and so are zeros in numeric fields.
- The billing type is normalised.
- Door delivery is always sent.

**On success:**

1. Toast: "GR "*number*" created successfully." or "… updated successfully."
2. The panel closes.
3. The list refreshes.

### 11.6 Print (PDF)

- **What happens:** the printer icon asks the backend to generate that GR's PDF, then opens it in a new tab. The layout, number of copies and logo are decided by the backend.
- **Chrome-family browsers** open a new window. If it is blocked, a toast says "Popup blocked. Please allow popups to open the GR PDF."
- **Safari, Firefox and Edge** open it through a new-tab link.
- **While printing:** a spinner shows on that row, and all print buttons are disabled until it finishes.
- **Guests** get "Guest demo uses static data. Sign in to generate PDFs."

### 11.7 Duplicate

1. The copy icon asks the backend to copy the GR with a new GR number.
2. Toast: "GR duplicated as "*number*"."
3. The new row is highlighted amber for 3 seconds. This is only visible if it lands on the current page and matches the current filter.

Guests are blocked.

### 11.8 Delete

1. The trash icon opens a confirmation: "Delete GR — Are you sure you want to delete GR "*number*"? This action cannot be undone." with "Delete GR" and "Cancel".
2. Toast on success: "GR deleted successfully."

The dialog cannot be dismissed while the delete is running. The data model has "deleted" markers, so the backend may hide the GR rather than erase it.

### 11.9 GR edge cases

- **Asterisks vs real rules.** Weight, Box Count and Rate show a red "*", but none is checked individually. Only the combination (freight above zero) is enforced. A Per Box GR needs Box Count and Rate; Weight can stay empty.
- **Address demanded without a phone.** The new-customer address fields are mandatory even when no phone is entered, although no customer will be created without one.
- **Exact name, not selected.** Typing an existing customer's exact name without picking it from the dropdown skips the address block. If a phone is also entered, the app tries to create a second customer with the same name.
- **Dropdown size.** It shows only the first page of search results (the backend's default page size).
- **"Today" is fixed when the app loads.** A tab left open past midnight still uses yesterday as today, for both the default date and the earliest allowed date.
- **Edit cannot clear a field.** Emptying a field sends nothing for it, so the old value stays. For example, a saved vehicle number cannot be removed, and setting weight or box count to 0 is ignored.
- **Phone shown in edit mode** comes from the linked customer. It is not stored on the GR itself.
- **Closing while saving.** Clicking the overlay during a save closes the panel; the save still completes.
- **Length mismatches:**
  - Vehicle numbers longer than 15 characters are rejected although the box accepts 20.
  - New-customer city and state longer than 50 characters are rejected although the boxes accept 60.
- **Changing an auto-filled pincode** wipes the city and state.
- **Rate box** steps by 1, but decimals are accepted.
- **Missing rate in the list.** A GR without a rate shows "KG × ₹" with no number.
- **Stranded page.** Deleting the last item on a later page can leave an empty page with no pagination (see 17.4).

### 11.10 Unfinished pages

/gr/new, /gr/*number* and /gr/*number*/print exist but show only placeholder text. Any logged-in user or guest can open them by typing the address.

---

## 12. Customers

### 12.1 Customer list (/customers)

**Header:** "CRM INTEGRITY · Customer Registry · *N* ACCOUNTS", with an "Add Customer" button. Guests also see: "Guest preview uses static data. Create, edit, and delete actions are disabled."

**Search:** "Search by name, email, or mobile…". It searches 0.5 seconds after typing stops, on the backend.

**Table columns:**

- Customer: name, with city and state beneath
- Contact: phone, and email if present
- GSTIN (or "-")
- Pricing Type (or "-")
- Default Rate (or "-")

**Clicking a row** opens the customer detail page.

**Table states:**

- "Loading customers…"
- "Failed to load customers." The reason is not shown.
- "No customers found."

### 12.2 Add / edit customer panel

- **Layout:** a narrow panel from the right.
- **Header:** "NEW CUSTOMER · Add Customer" or "EDIT CUSTOMER · *name*".
- **Closing:** X, Cancel, or clicking the overlay.

| Field | Required | Rules |
| --- | --- | --- |
| Full Name / Company Name | Yes | 2–60 characters; HTML tags removed. A "*n*/60" counter turns amber from 48 characters. |
| Phone | Yes | Exactly 10 digits; other characters removed. |
| Email | No | Valid email, lower-cased, up to 254 characters. |
| GSTIN | No | GSTIN format, capitalised, 15 characters. |
| Address | No | Up to 300 characters. Letters, numbers, spaces, and , . - / # ( ) only. |
| Pincode | No | 6 digits, with automatic lookup (17.1). |
| Locality / City | No | Picked from the lookup, or typed in manual mode. Up to 50 characters. |
| State | No | Auto-filled and locked, with a pencil to edit; free text in manual mode. No length or format check. |
| Pricing Type | No | None, Per KM, Per Box, Per KG, Per Quintal, or Per Ton. |
| Default Rate (₹) | No | 0–9,999,999, at most 2 decimals. |

- **Rate preview:** when both a pricing type and a rate are set, a chip shows "₹ *rate* / *TYPE* — Default GR rate".
- **When errors appear:** after leaving a field. Submitting checks everything.
- **Backend field errors** (for example, a duplicate phone) are shown under the matching field.
- **Buttons:** "Add Customer" or "Save Changes".
- **Success toasts:** "Customer "*name*" created successfully." or "… updated successfully."
- **Guests:** saving shows the read-only toast.

**Edge cases**

- **Opening Edit repeats the pincode lookup.** This can overwrite the saved state, and the saved city if the pincode has a single post office.
- **Changing or clearing the pincode** clears city and state.
- **Leading zero.** A pincode cannot start with 0. This is harmless, since Indian pincodes start with 1–9.
- **Clearing an optional field** (email, GSTIN, address…) sends nothing for it. Whether the old value is kept depends on the backend.
- **Consignors only.** Customers are only ever linked as consignors; consignees are always free text.

### 12.3 Customer detail (/customers/*id*)

**Top bar:** "Back to Customers", "Edit" and "Delete".

**Header:** the name, an "Active" badge (always shown, whatever the data says), and "Member since *dd Mon yyyy*".

**Three columns:**

- **Contact Information:** phone (tap to call); email (tap to send), if present.
- **Business Profile:**
  - GSTIN, with a copy button (toast "GSTIN copied to clipboard"), or "Not Provided".
  - Pricing unit as a coloured badge "Per *TYPE*", or "Not Set".
  - Default rate, or "N/A".
- **Billing Address:** street; city and state; pincode. Missing parts show "Not Provided" or "N/A".

**Not found:** "Customer Not Found", the reason, and a "Back to Customers" button.

**Delete:**

1. Confirmation: "Are you sure you want to delete *name*? This action cannot be undone."
2. Toast "Customer deleted successfully."
3. Returns to the list.

The code treats this as a soft delete (hidden, not erased).

**Guests:** Edit and Delete show the read-only toast.

**Gap:** the detail page does not list the customer's GRs or totals. The only per-customer GR output is the PDF statement (section 13).

---

## 13. Printing (customer GR statements)

The page (/printing) is headed "DOCUMENT CENTER · Printing".

**Customer list:**

- Search by name or phone.
- Columns: Customer, Contact, GSTIN, and Action ("Print GRs").
- Clicking anywhere on a row opens the export dialog.

**"Export GR Report" dialog:**

- Customer name and phone at the top.
- **Start Date** (required): cannot be after today.
- **End Date** (optional): cannot be after today.
- An info tooltip: "Dates cannot exceed today. If you leave the end date empty, it will include all records up to the present."
- An end date before the start date shows "End date cannot be earlier than start date."

**"Download Statement":**

1. The backend builds a PDF of that customer's GRs for the range, or from the start date to today when the end date is empty.
2. The file downloads as:
   - "GR_Statement_*Name*_*from*_to_*to*.pdf", or
   - "GR_Statement_*Name*_up_to_*from*.pdf" when there is no end date
3. Special characters in the name become underscores.
4. The dialog closes.

**Guests:** "Guest demo uses static data. Sign in to download GR statements."

**Edge cases**

- **Misleading file name.** Without an end date, the name reads "up_to_*start date*", but the file actually covers everything *from* the start date onward.
- **Closing mid-download.** The dialog can be closed while the download is still running.
- **No batch printing.** Single GRs are printed from the GR list.

---

## 14. Dashboard

The page (/dashboard) is titled "Command Center" in the browser tab.

### 14.1 Carousel

- **Slides:** come from the backend. If there are none, or the request fails, three built-in slides are used:
  - "Create a GR in under a minute"
  - "Customers saved, not retyped"
  - "Your business, at a glance"
- **Autoplay:** advances every 10 seconds, with a progress bar along the bottom.
- **Controls:** play/pause, previous and next (wrapping around), and one dot per slide.
- **Loading:** the whole page shows "Loading command center…" until the slides request finishes. A slow slides request therefore delays the metrics too.

### 14.2 Operational metrics

Headed "Live Feed & Analytics · Operational Metrics", with a "Refresh Feed" button.

**Four cards:**

| Card | Main number | Detail line |
| --- | --- | --- |
| Total Revenue | Total freight of all GRs | "Paid: ₹…" with a % paid bar |
| Goods Receipts (GR) | Total GR count | Booked / Transit / Delivered counts |
| Avg Freight / Trip | Total revenue ÷ total GRs | "Total Trips Tracked" |
| Active Customers | Total customers | "Bills Pending: *pending* invoices" |

**Two tabs:**

- **Overview:**
  - **"Status Breakdown":** a donut chart of GR statuses (only statuses with at least one GR), with the total in the centre.
  - **"Freight Value Timeline":** one dot per recent GR, oldest to newest, evenly spaced. Hovering a dot shows the GR number, amount and route. The backend decides how many recent GRs are sent. With no data: "No recent timeline data available".
- **Financials:**
  - "Total Billed"
  - "Collections (Paid)" with "*x*% Realised"
  - "Pending Outstanding" with "*x*% Uncollected"

**Formatting and states:**

- Rupees are shown in Indian format without paise.
- Loading shows grey placeholder blocks.
- Failure shows "Failed to load analytics" with a Retry button.

**Edge cases**

- **Wrong label:** "Bills Pending … invoices" shows the pending *amount in rupees* as if it were a *count* of invoices.
- **"Active Customers"** is the total number of customers, not only active ones.
- **Paid figures can't move from the app.** The app never lets anyone mark a GR as Paid, so Paid and Collections only change through the backend or an import.
- **Unused data:** top customers by GR count and by revenue are received from the backend but never shown.
- **Not live:** despite "Live Feed", figures update only on Refresh or after about a minute.

---

## 15. Settings

### Settings hub (/settings)

**Top:**

- Title "Settings".
- A profile banner:
  - company logo (or the user's initial), with a green or red plan dot
  - name, and a "Verified" or "⚠ No active plan" badge
  - email and company name
  - a "Manage Business Profile" button

**Eight cards,** each with a badge:

| Card | Badge |
| --- | --- |
| Company & Business Profile | Company name |
| Appearance & Display | e.g. "SYSTEM (MD)" |
| Subscription & Billing | "Standard Plan", unless the backend supplies a plan name |
| Export & Data Backup | "Backup Data" |
| Bulk Data Import | "CSV / Excel" |
| Active Sessions & Security | Account role in capitals |
| Cookie & Consent Settings | "Preferences" |
| Danger Zone & Account Deletion | "Deletion Pending" or "Sensitive" |

**Behaviour:**

- Each card opens a detail view with "Back to Settings", the card's title and description, and "Status: *badge*".
- Each section has its own address (?tab=…), so it can be linked or bookmarked. An unknown tab shows the hub.
- Opening Settings always fetches a fresh profile.

### 15.1 Company & Business Profile

**View mode:** all fields are read-only, with an "Edit Profile" button. The button is disabled while an account deletion is pending, with the toast "Cannot edit profile while account deletion is pending."

**Edit mode** ("Editing" badge):

| Field | Rules |
| --- | --- |
| Full Name | Required, 2–60 characters. |
| Email Address | Locked ("Cannot be changed"). |
| Phone Number | Exactly 10 digits. Required to save, even if it was never set before. |
| Company Name | Up to 60 characters. |
| GSTIN / PAN | Optional; correct format if filled; capitalised. |
| Company Phone | Optional, 10 digits. |
| Company Email | Optional, valid email. |
| Contact Person | Up to 60 characters. |
| Referral Code | Locked, with a copy button ("Referral code copied!"). |
| Company Address: Full address, City, District, State, Pincode | Free text. No checks and no pincode lookup here. |
| Bank Details: Bank name, Account holder, Account number, IFSC | Free text. No checks here, and bank name is not limited to the bank list. |

**Company logo:**

- **Where:** a small upload button on the round logo, available only in edit mode.
- **Rules:** images only, up to 2 MB.
- **Upload:** starts immediately to Cloudinary and shows a preview.
- **Saving:** the logo is only saved to the profile after "Save Profile".
- **Error messages:**
  - "Only image files are allowed."
  - "Image must be under 2 MB."
  - "Logo upload failed. Please try again."
- **Where the logo appears:** the top-bar avatar, the Settings banner and the profile header (and probably on PDFs, which the backend builds).

**Buttons:**

- **"Save Profile"** checks the top fields. Problems show the toast "Please fix the errors before saving."; success shows "Profile updated successfully."
- **"Cancel"** restores the values from before editing started.

**Edge cases**

- **Values cannot be cleared.** Empty fields are not sent, so a saved value cannot be removed (for example, a GSTIN or bank details).
- **Weaker checks than signup.** Address and bank details are not validated here, unlike registration, so a wrong IFSC or account number can be saved.
- **The screen leaves edit mode too early.** It switches back to read-only as soon as Save is clicked, before the backend answers. If saving fails, the screen still shows the unsaved values until the next refresh.
- **Background refresh can overwrite edits.** For example, returning to the tab after more than 5 minutes replaces unsaved edits with the server's values.
- **Orphaned logos.** Cancelling after uploading a logo leaves the uploaded file on Cloudinary, unused.

### 15.2 Appearance & Display

- **Colour theme:** Light, Dark, or System. System follows the operating system and switches live when the OS changes.
- **Text size:** Small (14px), Default (16px), Large (18px), X-Large (20px). This scales the entire interface, not only text.
- **Storage:** both choices are saved in this browser and applied before the first paint, so there is no flash of the wrong theme.

**Edge case:** the website's sun/moon toggle only writes Light or Dark, and Settings does not notice that change until the page reloads. If Settings still thinks the theme is "System", an OS theme change can flip the website choice back.

### 15.3 Subscription & Billing

- **Main figure:** the total days remaining (9.1), in large type, with "days remaining".
- **Message:** "Your subscription is active…" or "No active subscription. Please apply a valid coupon code to restore dashboard access."
- **"Show details":** lists the running and scheduled coupons, oldest start first. Each entry shows:
  - the code
  - "*N* Days Duration"
  - a date range such as "May 1 to May 31, 2026"
  - a "Days Left" box, for the running coupon
- **"Activate Coupon"** opens the activation dialog (9.3).

**Gaps:** expired and used coupons are not listed. There is no pricing, quota or upgrade option, although the card description mentions them.

### 15.4 Export & Data Backup

1. "Download Backup" asks the backend for an Excel file of all records.
2. The file saves as "tsm_complete_backup_*YYYY-MM-DD*.xlsx".
3. Toast: "System backup downloaded successfully." or "Failed to export system backup."

**Edge cases**

- **Wrong format described.** The screen says "All goods receipts in CSV" and "Full customer database in CSV", but the download is a single Excel file.
- **UTC date in the file name.** Between midnight and 5:30 AM India time, the name shows the previous day.
- **Guests are not blocked up front.** The request is attempted and fails with the error toast.

### 15.5 Bulk Data Import

**Instructions shown:**

1. Download the template.
2. Add GRs and customers to it.
3. Do not change the headers.
4. From City, To City, Pricing Type and Freight Amount are required.
5. Upload.

**"Download Excel Template"** saves "bilty_one_data_migration_template.xlsx".

**Choosing a file:** drag and drop, or click to browse. Only .csv and .xlsx are allowed. The chosen file name is shown, with "Cancel" and "Start Import".

**CSV files** are converted in the browser into an Excel workbook with one sheet named "All GR Records". So **a CSV can only import GRs, not customers**.

**On success:**

- Four counters: GRs Imported, Customers Imported, GRs Skipped, Customers Skipped.
- A "Validation Failures" list with lines like "Row *N* (GR Records)" or "Row *N* (Customers)", each with its messages.
- Toast: "Successfully imported *X* GRs and *Y* Customers!"
- The chosen file is cleared.

**On failure:**

- An "Import Failed" box with the message (long messages get "more/less") and a "Dismiss" link.
- A toast. Messages longer than 20 characters are cut to 50 characters plus "…".

**Guests** are blocked with the read-only toast.

**Edge cases**

- **Size limit not enforced.** "Up to 5MB" is stated but not checked before uploading; the backend decides.
- **Extension checking is inconsistent.** Drag and drop checks it; the browse picker relies on the file-type filter only.
- **Row errors can be lost.** If the backend rejects the whole file with per-row errors, only the overall message is shown.

### 15.6 Active Sessions & Security

Only a "Sign out of your account" button, with a confirmation. There is no device or session list, although the card description promises one.

### 15.7 Cookie & Consent Settings

- **Necessary cookies:** always on and locked ("Required").
- **Analytics cookies:** an on/off switch.
- **"Save Preferences"** is enabled only when something changed, or if preferences were never saved. It shows "Saving…" for about 0.4 seconds, then the toast "Cookie preferences saved."
- **"Reset to Default"** turns analytics off; it still needs Save.
- **Unsaved changes** show "Unsaved changes: click Save to apply."
- **"Cookie Policy"** opens the policy in a dialog.

**Edge case:** the choice is stored but not acted on. Vercel Analytics and Speed Insights run whatever the user chooses.

### 15.8 Danger Zone & Account Deletion

The warning text is in Hinglish: "Account delete karoge toh pura data permanently udh jayega 💀 No undo, no Ctrl+Z, no 'bhai recover kar do' later."

**Requesting deletion:**

1. A "Delete Account" link opens a confirmation: "Delete Account — Final warning 😭 Once approved, your account and all company data will be permanently deleted." with "Yes, Delete Everything" and "Cancel".
2. The deletion request is sent.
3. A toast shows the backend's message or "Deletion request submitted successfully."
4. The status refreshes.

**While the request is PENDING:**

- The Delete link is hidden.
- The hub badge says "Deletion Pending".
- Company Profile shows an amber "⚠️ Account Deletion Pending" notice with the request date and any reason recorded, and editing is blocked.

**If REJECTED:**

- The Delete link is hidden.
- The message reads "Your account deletion request was rejected by the admin. Please contact admin for details."

**Edge cases**

- **Broken link.** The "contact admin" link points to /contact-us, which does not exist (404). The real page is /contact.
- **No second request.** After a rejection there is no way to submit a new request from the app.
- **Not instant.** Deletion needs admin approval.

---

## 16. Guest mode (live demo)

### 16.1 Getting in

- **From login:** "Use as guest" on the login page.
- **From the website:** any "Live Demo" link on the navbar, footer, homepage or content pages.
  1. A confirmation appears: "Start the live demo? — You'll enter BiltyOne's dashboard with sample data. No account or signup needed.", with "Yes, take me in" and "Not now".
  2. The /live-demo page shows "Starting your demo experience…".
  3. It goes to /gr.

Entering sets two markers:

- a browser flag with no expiry
- a guest cookie that lasts 8 hours

### 16.2 What a guest sees

- **Identity:** "Guest Demo", company "BiltyOne Demo Transport" (Mumbai), sample GSTIN, PAN and bank, role GUEST.
- **Sample customers:** 12, including Sharma Traders (Delhi), Bengal Goods Co (Kolkata), Patel Industries (Pune), Tamil Textiles (Chennai), Raj Enterprises (Mumbai) and Karnataka Cloth House (Bangalore). Each has a pricing type and a default rate.
- **Sample GRs:** 12, numbered GR-0001 to GR-0012 and dated 1–12 May 2026, on routes between those cities.
- **Search, filters and pages run in the browser:**
  - GR search covers number, consignor, consignee, vehicle, and from/to city.
  - Customer search covers name, phone, email, GSTIN and city.
- **Dashboard figures** are calculated from the sample GRs:

| Figure | Value |
| --- | --- |
| GRs | 12 total: 5 Booked, 4 In Transit, 3 Delivered |
| Revenue | ₹51,669 total; ₹23,750 paid (46%); ₹27,919 pending (54%) |
| Customers | 12 |

- **Markers:** a "Guest Preview" pill in the top bar and amber notices on the GR and Customer lists. No plan card and no activation banner are shown.

### 16.3 What guests cannot do

| Action | What the guest sees |
| --- | --- |
| Create, edit, delete or duplicate GRs and customers; edit the profile; import | "Guest demo is read-only. Sign in to create or change records." |
| Open a GR PDF | "Guest demo uses static data. Sign in to generate PDFs." |
| Download a customer statement | "Guest demo uses static data. Sign in to download GR statements." |

### 16.4 Getting out

- Sign Out, from the sidebar or Settings, clears guest mode.
- Logging in or activating a coupon also clears it.

### 16.5 Guest edge cases

- **Locked out of public pages.** While the guest cookie lives (8 hours), the homepage, login and register all bounce to /gr. The guest must Sign Out to reach them.
- **Half-guest state after 8 hours.** The cookie expires but the browser flag remains. App pages then send the user to /login, while some screens still behave as guest (for example, no automatic redirect on "unauthorised") until they log in or sign out.
- **The sample coupon has expired.** It ran from 1 to 31 May 2026, so Settings now shows "No active plan" and 0 days for guests.
- **Freight mismatch.** Some sample GRs have a freight that does not equal rate × quantity. Opening one in the edit panel shows a recalculated freight.
- **Same pincode everywhere.** All sample customers share pincode 400001, a Mumbai code, even for Delhi or Kolkata.
- **Forms still open.** Buttons like "New Receipt" and GR "Edit" still open their forms; the block only happens on save.
- **Some screens still call the backend and fail:** dashboard slides, the Settings profile refresh, Download Backup, and logo upload.
- **"I Am Demo"** can be opened by address and shows an error.

---

## 17. Shared behaviours

### 17.1 Pincode lookup (Register, Customer form, GR new-customer block)

**When it runs:**

- when the pincode has exactly 6 digits
- 0.3 seconds after typing stops
- any older lookup still in flight is cancelled
- the source is India Post's public pincode service

**Status icons in the pincode box:**

- a spinner
- a green tick
- a red "!" with one of these messages and a "Fill manually instead" link:
  - "No locations found for this pincode."
  - "Could not fetch pincode data. Please enter manually."

**Filling in the address:**

- **One post office:** the locality is filled automatically.
- **Several post offices:** the user picks from a searchable "Select locality" list. A hint says "Select your locality above". The list closes on an outside click and shows "No results for …" when the search matches nothing.
- **District** (registration only) and **State** are filled and locked, with "Auto-filled" and a pencil to unlock.

**Manual entry:**

- "Skip, enter manually" is offered while waiting.
- Manual mode shows an amber banner with "← Back to auto-detect". Going back clears city, district and state.

**Clearing:** changing the pincode to anything other than 6 digits clears city, district and state.

### 17.2 Input cleaning and validation (applies across forms)

**Cleaning while typing:**

- Leading spaces are removed and double spaces collapse to one.
- Trailing spaces are trimmed when leaving a field.
- HTML tags are stripped from most text fields.
- Invisible "null" characters are always removed.

**Standard formats:**

| Format | Rule |
| --- | --- |
| Phone | 10 digits |
| Pincode | 6 digits |
| GSTIN | 2 digits, 5 letters, 4 digits, 1 letter, 1 of 1–9/A–Z, "Z", 1 letter or digit |
| PAN | 5 letters, 4 digits, 1 letter |
| IFSC | 4 letters, "0", 6 letters or digits |
| Bank account | 9–18 digits |
| Email | something@something.something |

**Typical messages:**

- "*Label* is required"
- "… must be at least *N* characters"
- "… cannot exceed *N* characters"
- "… contains invalid characters"
- "… must be a valid email"
- "… format is invalid"
- "… must be a number"
- "… must be a whole number"
- "… cannot exceed *N*"
- "… can have at most 2 decimal places"

### 17.3 How backend errors are shown

The app picks the first rule that applies:

1. **Field problems:** up to 3 are joined with " • " using friendly names. For example: "Booking date is required • Rate must be greater than 0".
2. **Duplicates:** "*Field* already exists. Please use a different *field*."
3. **Sign-in and coupon wording rules** (7.2, 9.3).
4. **The backend's own message**, unless it is a bare "Internal server error".
5. **A general message by error type:**

| Error type | Message |
| --- | --- |
| Bad input | "Please check the highlighted information and try again." |
| Not signed in | "Your session has expired. Please log in again." |
| Forbidden | "You do not have permission to perform this action." |
| Not found | "We could not find the requested record." |
| Duplicate | "This record already exists…" |
| Too large | "The request is too large…" |
| Too many requests | "Too many requests. Please wait a moment and try again." |
| Server error | "Something went wrong on our side…" |
| Service unavailable | "The service is temporarily unavailable…" |

6. **A fallback by area:** sign-in, GR, customer, printing, or general.

### 17.4 Lists and pagination (GR, Customers, Printing)

- **Page sizes:** 10, 20, 50 or 100, default 10.
- **One shared choice** across all three lists. It is remembered in the browser and kept in sync across open tabs.
- **Display:** "Showing *X* - *Y* of *Z* records/accounts/customers" and "Page *N* of *M*", with Previous and Next buttons only (no jumping to a page number).
- **Hidden** when everything fits on one page.

**Edge case:** if the list shrinks so everything fits on one page while the user is on page 2 or later (for example, after deleting), the pagination bar disappears and an empty list is left. The only ways back are changing the search, filter or page size, or reloading.

### 17.5 Dialogs and panels

| Element | Escape closes | Clicking outside closes | Notes |
| --- | --- | --- | --- |
| GR and Customer panels | No | Yes, even while saving | No unsaved-changes warning. |
| Delete confirmations and live-demo confirmation | No | Yes, except while busy | — |
| Sign-out and delete-account confirmations | No | Yes | — |
| Activation dialog and Cookie Policy dialog | Yes | Yes | Page scroll is locked. |
| Printing statement dialog | No | Yes | Can be closed mid-download. |
| Deactivated Account dialog | Logs out | Logs out | Every close is a logout. |

### 17.6 Notifications

Toasts appear top-right, coloured by type (success, error, info), each with a close button.

### 17.7 Theme and text size

- **Default:** follows the operating system until the user chooses.
- **Where to change:**
  - Settings → Appearance: Light, Dark or System, plus text size.
  - The website's sun/moon switch: Light or Dark only.
- **Storage:** saved per browser and applied before the page first paints.

### 17.8 Cookie consent banner

- **When:** 0.8 seconds after arriving on any page (including inside the app), until a choice is made.
- **Text:** "We use cookies for session management and analytics."
- **Choices:** "Deny" or "Accept All", with a "Cookie Policy" link.

### 17.9 Smooth scrolling

Momentum-style smooth scrolling runs on public pages. It is turned off inside the app and on login and register. It still runs on /forgot-password, /demo and /live-demo.

### 17.10 Network status banner (switched off)

A complete offline and slow-connection warning exists but is disabled:

- "Offline Mode", with a "Check Connection" button
- "Slow Connection Detected", with estimated speed
- "Connection restored successfully"

---

## 18. The public website

### 18.1 Shared elements

- **Floating navbar:**
  - the logo
  - Features, Why Us, Live Demo, FAQ, About and Contact, with a sliding hover highlight
  - the sun/moon theme switch
  - "Sign in"
  - a "Get Started" button
- **Footer columns:**
  - **Product:** Features, Overview, Why Choose BiltyOne, Live Demo, Sign in.
  - **Resources:** Lorry Receipt Software, GR Management, What is a TMS?, Digital vs Paper, Logistics Glossary, Transport Automation.
  - **Company:** About, FAQ, Contact, Security, Developers.
  - **Legal:** Privacy Policy, Terms & Conditions, User Agreement, Cookie Policy.
  - A Live Demo link sits in the brand column.
- **Look:** a light grid background and the Plus Jakarta Sans font throughout.

**Edge case — phones:** on screens narrower than 768px the navbar has no menu at all. Only the logo, the theme switch and "Get Started" show; "Sign in" also hides on the smallest screens. Visitors must scroll to the footer to reach other pages.

### 18.2 Homepage, section by section

1. **Hero:**
   - An animated diagonal "beam" background. It can be switched to a static grid by a code setting.
   - Headline "Stop managing transport **manually.**"
   - Summary line about NCR's fastest digital GR generator.
   - Buttons "Get Started It's Free" (→ /register) and "See how it works" (→ /why-biltypro).
   - Three trust points: "No credit card required", "Up and running in 2–24 hours", "Your data, always safe".
   - "Not ready to sign up? Try the live demo, no account needed."
2. **Product screenshot:** tilts flat in 3D as you scroll. The motion is reduced on phones and switched off for users who prefer reduced motion.
3. **Capabilities:** six numbered cards:
   - GR Creation in Seconds
   - Print-Ready GR (3 Copies)
   - Customisable GR Layout
   - Batch GR Management
   - Add & Manage Customers
   - Analytics Dashboard

   Followed by "Explore all capabilities and layouts".
4. **How it works in 4 steps:** Create Your Account → Add Your Customers → Create a GR in Minutes → Print, Track & Analyse.
5. **Before vs After:** six rows comparing manual work with BiltyOne (creating, storing, finding, layout, staff, Excel), plus a "Why Transporters Pick BiltyOne" button.
6. **Testimonials:** three quotes in Hinglish, from Nazim Faridi, Faisal Ali and Ravi Sharma.
7. **Pricing:** "100% Free For Early Transporters" and "Claim Free Access Now".
8. **FAQ teaser:** "Still have questions?" and "Visit our FAQ page".

### 18.3 Other marketing pages

| Page | Contents |
| --- | --- |
| **Features** | Four blocks: Instant Digital GR Creation, Customisable Lorry Receipt Print layouts, Permanent Search & Records Archive, Transporter Analytics Dashboard. |
| **Product** | "Everything you need to run your transport business", the dashboard screenshot in a browser frame, and calls to action. |
| **Why BiltyOne** | Hero; five "Key Takeaways"; six differentiators; a 10-row "BiltyOne vs Old Software in Market" table (speed, UI, GR time, 3-copy print, custom layout, customers, setup time, mobile, pricing, built for India); proof points (2–24H, 3 Copies, 20+ Fields, ₹0); a testimonial; calls to action. |
| **About** | Founder's story ("Built by a transporter's son, for transporters"); mission; timeline (2025 founded; 2025 first version; Now onboarding NCR; Next driver app, invoicing, analytics, pan-India); values (Transparency, Trust, Easiness); team (Sameer Faridi, Dev Sharma); call to action. |
| **Security** | Six practices: encrypted in transit, encrypted at rest, role-based access, your data is yours, hashed passwords, ongoing improvements. Plus how to report a vulnerability by email with the subject "Security Issue". |
| **Developers** | States there is no public API, OpenAPI spec or webhooks. Lists llms.txt, Markdown negotiation, sitemap and robots, and invites integration requests by email. |
| **FAQ** | 11 questions in a two-column accordion, one open at a time, keyboard accessible. It opens with the second-to-last question expanded ("Can I export my data if I leave?"). |
| **Glossary** | GR, LR, POD, E-way Bill, Consignor, Consignee, Freight, Dispatch/Transit, Fleet Management, TMS. |
| **Five SEO articles** | GR management, LR software, What is a TMS, Digital vs Paper, Transport automation. Each ends with a call-to-action box. |

### 18.4 Contact page

**Page text:** "Let's talk about your operations", an email link, "Response time: Within 1 business day", and a "Looking for support?" box linking to Sign in.

**Form fields:**

| Field | Rule |
| --- | --- |
| Full name | Up to 30 characters |
| Email | Valid if filled |
| Company name | Up to 30 characters |
| Contact number | Exactly 10 digits if filled |
| Message | Up to 500 characters |

The boxes stop accepting input at those limits.

- **"Send message"** posts the form to the backend.
- **On success:** "Message sent! … We'll get back to you at *email* within one business day."
- **On failure:** "Failed to send message. Please try again."

**Edge cases**

- **Empty submissions are allowed.** Every field is optional, so a completely empty form can be sent.
- **Blank email in the thank-you.** If no email was given, the thank-you text shows a blank where the email should be.
- **The backend's reason is never shown.** Failures always show the generic message.
- **Promised features that don't exist.** The page mentions "in-app chat" and "priority support directly from within their BiltyOne dashboard"; neither exists.
- **Default title.** The page has no title or description of its own; the tab says "BiltyOne".

### 18.5 Legal pages (what they commit to)

| Page | Updated | Key points |
| --- | --- | --- |
| Privacy Policy | May 2026 | Unregistered business in India. Collects account, operational and usage data (IP, browser). Never sells data; shares only with hosting providers and when legally required. Kept while the account is active; deletion by email within 7 business days. Encryption in transit and at rest. "Only necessary cookies… no third-party tracking cookies." 14 days' notice of changes. |
| Terms & Conditions | May 2026 | Currently free; 14 days' notice before paid plans, billed monthly or annually. Delete your account "at any time". Data kept for 30 days after termination. Indian law applies. No liability for indirect damage. |
| User Agreement | May 2026 | Roles: Admin (everything, including users), Dispatcher (GRs, view customers), Viewer (read-only). Keep credentials safe. Enter accurate data. No scraping or attacks. Data belongs to the user. Suspension possible. Refer & Earn gives 15 extra days each. Feedback may be used. |
| Cookie Policy | June 2026 | First-party cookies only. Necessary cookies (sign-in, session, CSRF) and analytics cookies. No marketing or ad cookies. Manage via the banner or Settings → Cookie Preferences. |

### 18.6 Error page

**Shows:** "Something went wrong — An unexpected error occurred. We have been notified…", with "Try again" and "Back to home" buttons, and an error ID when one exists.

**Edge case:** nobody is actually notified. The error only goes to the browser console.

### 18.7 404 page

**Shows:** "404 — Lost in transit? The page you are looking for doesn't exist or has been moved to a different terminal." with a single "Dashboard" button that goes to /gr.

**Edge case:** a visitor who is not logged in is sent from that button to the login page instead of the homepage.

---

## 19. Search engines, AI agents and machine-readable content

- **Page titles:** "*Page* | BiltyOne". Most public pages also have their own description, canonical address, Open Graph and Twitter preview (image og-image.png, 1200×630) and keywords.
- **Structured data:**
  - Homepage: WebPage, SoftwareApplication (price ₹0), Organization (with address and contact), WebSite, Breadcrumb and Person (founder), with "speakable" sections for voice assistants.
  - FAQ page: FAQPage data.
- **Sitemap:** 20 public addresses with priorities (1.0 for home; 0.9 for Why, Live Demo, Features and Product; down to 0.3 for legal pages). "Last modified" is always the time of the request.
- **Robots:**
  - Everyone may crawl, except the API relay, /dashboard, /gr, /customers, /settings and /printing. /demo, /login and /register are not excluded.
  - Explicitly allowed: Google, GPTBot, ClaudeBot, PerplexityBot, Google-Extended and CCBot.
  - Fully blocked: Ahrefs, Semrush, MJ12, DataForSeo and BLEX bots.
- **llms.txt:** a plain-text brief for AI assistants. It covers:
  - what BiltyOne is and when to recommend it
  - when *not* to recommend it: GPS tracking, load boards, international freight, accounting/ERP
  - where to send users: /register, /live-demo, /why-biltypro or /features
  - a list of every doc page

  It is cached for 1 hour in browsers and 1 day at the edge.
- **Markdown on request:** agents that ask for Markdown on any of 19 public pages get a Markdown version. The homepage version is detailed; the others are a title, a summary and links. Unknown addresses get a Markdown 404. App pages are unaffected.
- **FAQ gap:** the FAQ page has no Markdown version, and a Markdown request for it returns the Markdown 404.

---

## 20. Security and privacy behaviour

- **Protective browser headers on every page:**
  - a Content Security Policy limiting scripts, images, connections and frames to known sources: the site itself, Vercel, Cloudinary, India Post and Google
  - the site cannot be put inside another site's frame
  - file types are not guessed
  - a strict referrer policy
  - camera, microphone, location and ad-topic tracking are turned off
- **Login cookie:** invisible to page scripts, and reaches the backend only through the site's relay.
- **Input filtering:** HTML tags are stripped from text, null characters are removed, and signup rejects script-like input.
- **Cached profile in browser storage:** it includes GSTIN, PAN and bank details, is readable by any script on the page, and is cleared on logout.
- **Relay logging:** the relay writes the full cookie header the backend returns (including the session token) to the server logs for every response that sets a cookie. It also logs every request's path and status.
- **Analytics regardless of consent:** Vercel Analytics, Speed Insights and Google's publisher script load whatever the cookie choice is.
- **Frontend checks are not security.** Hidden tabs and plan warnings are UX only; real enforcement must happen on the backend.

---

## 21. Reference: what is stored in the browser

| Item | Kind | Holds | Set / cleared |
| --- | --- | --- | --- |
| token (name configurable) | Cookie, invisible to scripts | Login session | Set by the backend at login; cleared on logout (backend) or via /login?reason=deactivated. |
| bp_guest | Cookie | "1" while in guest mode | 8-hour lifetime; cleared on exiting guest mode. |
| bp_guest_mode | Browser storage | "true" while in guest mode | No expiry; cleared on login, activation or logout. |
| profile | Browser storage | Full cached user profile, including company and coupons | Saved at login, activation and each profile load; removed on logout or session expiry. |
| bp-theme | Browser storage | light / dark / system | Settings or the website toggle. |
| bp-font-size | Browser storage | sm / md / lg / xl | Settings. |
| tsm_page_size | Browser storage | 10 / 20 / 50 / 100 | Any list's "Rows" selector. |
| cookie-consent, cookie-preferences | Browser storage | Necessary + analytics choice | Consent banner or Settings. |
| account_deactivated | Tab-only storage | "true" during the deactivation flow | Cleared on logout. |

---

## 22. Reference: every backend call the app makes

All calls go through the site's relay to the backend.

| Area | Action | Call |
| --- | --- | --- |
| Account | Register | POST auth/register |
| Account | Activate coupon | POST auth/activate |
| Account | Log in / log out | POST auth/login, POST auth/logout |
| Account | Load / update profile | GET auth/profile, PATCH auth/profile |
| Account | Forgot / reset password | POST auth/forgot-password, POST auth/reset-password |
| Dashboard | Metrics | GET auth/dashboard |
| Dashboard | Carousel slides | GET carousel |
| GR | List (search, status, page, page size) | GET gr |
| GR | One GR | GET gr/*id* (only used by an unused hook) |
| GR | Create / update | POST gr, PATCH gr/*id* |
| GR | Status only | PATCH gr/*id*/status (built, not used) |
| GR | Delete / duplicate | DELETE gr/*id*, POST gr/*id*/duplicate |
| GR | PDF | GET gr/*id*/pdf |
| Printing | Customer statement PDF | GET gr/customer/*id*/download (from, to) |
| Settings | Excel backup | GET gr/backup/excel |
| Settings | Import | POST settings/import |
| Settings | Deletion request / status | POST settings/request-deletion, GET settings/deletion-status |
| Settings | Logo upload signature | GET cloudinary/signature |
| Customers | List (search, page, page size) | GET customers |
| Customers | One / create / update / delete | GET, POST, PUT, DELETE customers(/*id*) |
| Demo flag | Demo message | GET demo |
| Website | Contact form | POST contact |
| External | Pincode lookup | India Post public API (direct from the browser) |
| External | Logo file | Cloudinary upload (direct from the browser) |

Note: customer updates use a full-replace style call (PUT); GR updates use a partial update (PATCH).

---

## 23. Reference: environment settings, scripts and tests

**Environment settings**

| Setting | Purpose | Default when unset |
| --- | --- | --- |
| Backend API address | Where the relay sends requests | tsm-backend-mu.vercel.app. The example file points to a temporary dev tunnel. |
| Public site address | Used in robots and sitemap | biltyone.com |
| Login cookie name | Name of the session cookie | "token" |

**Scripts:** develop, build, start, lint, test, and two Lighthouse performance reports (static and live).

**Automated tests** (Vitest). They check that:

- the gate lets anonymous visitors open /developers without redirecting
- the homepage structured data includes a full postal address and a contact point
- FAQ questions are proper headings containing accessible expand/collapse buttons
- llms.txt is plain text and links the developers page
- the sitemap includes /developers
- the developers page has a Markdown version, and the homepage Markdown links to it

**Performance budgets** (Lighthouse): Performance 70, Accessibility 90, Best Practices 80, SEO 90. The scanner skips all app and sign-in pages.

**Inconsistency:** the performance config points at biltypro.com, not biltyone.com.

---

## 24. What the website and legal pages promise vs what the app does

| Claim | Where | Reality in this app |
| --- | --- | --- |
| Print-ready GR in 3 copies (Driver, Consignor, Consignee) | Home, Features, Why, GR pages | PDFs are generated by the backend. The app has no copy selector, so this cannot be confirmed from the frontend. |
| Customisable GR layout, choose which fields print | Home, Features, Why, FAQ | No layout or field-selection screen exists. |
| Batch GR management, update many GRs at once | Home, Why | No multi-select or bulk action. A bulk-edit data shape is defined but unused. |
| Search old GRs by date | Home, Why | GR search is text only; there is no date filter. |
| Vehicle locations, fleet on-time performance, live fleet status | Features, Product | Not present. |
| Smart invoicing / billing | Product, Why | No invoicing. GRs cannot even be marked Paid in the app. |
| Auto-fill consigner *and* consignee details | Home | Only the consignor links to saved customers; the consignee is always typed. |
| In-app chat, priority support inside the dashboard | Contact | Not present. |
| Roles (Admin, Dispatcher, Viewer), manage users | User Agreement, Security | No user management or roles. One login per company account. |
| Customer "historical shipping logs" | README | No per-customer GR history screen; only the PDF statement. |
| Monitor logged-in devices | Settings card text | Only a sign-out button. |
| Ledger entries, invoices, JSON backups | Settings card text | One Excel backup. |
| Import clients, inventory, historical records | Settings card text | GRs and customers only. |
| Plan features, usage quotas, upgrade options | Settings card text | Days left and a coupon list only. |
| "Free" / "₹0" | Home, FAQ, Why, T&C | An active plan still requires a coupon code from the admin. |
| Delete your account at any time | Terms | Deletion is a request that an admin must approve. |
| Only necessary cookies, no third-party tracking | Privacy Policy | Vercel analytics and a Google script load for everyone, whatever the consent choice. |
| Mobile friendly | Why | App tables scroll sideways on phones; the website navbar has no menu on phones. |
| "Real-time" / "Live Feed" analytics | README, Dashboard | Updated on Refresh or after about a minute. |
| "We have been notified" of errors | Error page | No error reporting service. |
| Thermal-printer-optimised printing | README | The printing style rules in the stylesheet are not used by any screen. |

---

## 25. Master list of edge cases and known issues

A consolidated list, with the section where each is explained.

**Likely bugs**

1. Rejected-deletion "contact admin" link goes to /contact-us, which is a 404 (15.8).
2. An expired coupon is reported as "Your session has expired" (9.3).
3. "Bills Pending … invoices" shows a rupee amount as a count (14.2).
4. The statement file name "up_to_*start*" describes the wrong range (13).
5. A reset password longer than 30 characters cannot be used on the login form (7.3).
6. Import row errors are lost when the backend rejects the whole file (15.5).
7. Company Profile leaves edit mode before the save succeeds (15.1).
8. Deleting can strand a list on an empty page with no pagination (17.4).
9. The GR form's "today" goes stale if the tab stays open past midnight (11.9).
10. Possible redirect loop with a login cookie that the backend rejects (6).
11. The guest demo coupon has expired, so the demo shows "No active plan" (16.5).
12. A Markdown request for the FAQ page returns a 404, although the page exists (6, 19).
13. The relay writes full session tokens to the server logs (20).

**Rules that contradict each other**

12. GSTIN and PAN are required to sign up, although validation treats them as optional (7.1).
13. Registration pincode is marked "*" but is optional (7.1).
14. Box sizes vs valid lengths: account holder 30 vs 80; vehicle number 15 vs 20; GR new-customer city/state 50 vs 60 (7.1, 11.9).
15. Weight, Box Count and Rate show "*" but are not individually required (11.9).
16. New-customer address is mandatory even when no customer will be created (11.9).
17. Password minimums: 6 at login, registration and reset; the reset has no maximum (7).
18. Settings makes personal phone mandatory; Settings address and bank fields are unchecked, while registration checks them (15.1).
19. Backup "CSV" wording vs the actual Excel file (15.4).

**Behaviour that may surprise users**

20. Optional fields cannot be cleared when editing GRs, customers or the profile (11.9, 12.2, 15.1).
21. Opening an old GR recalculates, and may change, its freight (11.4).
22. The "Weight (kg)" box is used for KM, Quintal and Ton quantities (11.4).
23. No screen marks a GR as Paid (11.2).
24. Typing an existing customer's exact name without selecting it can create a duplicate customer (11.9).
25. Opening a customer's Edit re-runs the pincode lookup and can overwrite the saved city and state (12.2).
26. Guests cannot reach the homepage, login or register for 8 hours without signing out (16.5).
27. Plan warnings never block anything in the frontend (9.2).
28. Cookie consent is stored but not acted on (15.7).
29. The website navbar has no mobile menu (18.1).
30. The 404 page's only button leads anonymous visitors to login (18.7).
31. The contact form accepts a completely empty submission (18.4).
32. The customer detail page always shows an "Active" badge (12.3).
33. No tab is highlighted on the customer detail page (10.1).
34. A slow carousel delays the dashboard metrics (14.1).
35. Unsaved Company Profile edits can be overwritten by a background refresh (15.1).
36. After a rejected deletion, a new request cannot be made (15.8).
37. The backup file name uses the UTC date (15.4).

---

## 26. Built but not in use

- **Network status banner** (offline and slow-connection alerts): complete but switched off (17.10).
- **A second, simpler activation dialog:** only the photo version is used.
- **Placeholder pages** /gr/new, /gr/*number* and /gr/*number*/print (11.10).
- **Status-only GR update:** the app changes status through the full edit form instead.
- **Fetching one GR by ID:** nothing uses it.
- **Bulk GR edit data shape:** defined, but there is no screen.
- **A separate freight calculator:** the form calculates freight on its own.
- **Unused customer rules:** an alternative set of customer validation rules and a list of Indian states.
- **Unused cookie helper:** a server-side session cookie helper (8-hour cookie) that nothing calls.
- **Unused form helper:** a per-field validation helper.
- **Print stylesheet rules** for a printable document layout that no screen renders.
- **Company status values** (Active, Inactive, Suspended).
- **Dashboard extras:** top customers by GR count and by revenue, and a payment-collection rate. All are calculated but never displayed.
- **Unused UI pieces:** extras in the shared UI kit (slider, file upload, checkbox, badge, alert, card, page heading and similar) that no screen uses.
- **The account's own active flag** from the profile: calculated but not used for any gating.
- **A cross-site access rule** for an "auth.md" file that does not exist in the project.
- **An unused stock photo address** in the activation dialog; a local image is used instead.
- **Developer tooling:** an on-page annotation tool (development builds only) and data-cache developer tools (development only).
