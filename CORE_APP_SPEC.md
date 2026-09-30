# BiltyOne Core App Spec — GR, Customers, Printing, Settings

A complete behaviour specification of the four core tabs of the logged-in BiltyOne app. It is written so the same features can be rebuilt as an **offline desktop app** with identical behaviour. It covers every field, validation rule, calculation, file format and edge case. There is no code in this document.

**Sources.** Both halves of the current system were read in full:

- **Frontend:** this repository, last commit 18 September 2026.
- **Backend:** the tsm_backend project on this machine, last commit 13 August 2026.

Several important rules live only in the backend: GR numbering, PDF layout, search, import and export. Those are included here. If production runs a newer backend, re-check the items marked **(backend)**.

**Labels used throughout**

- **Web today** — how the current web app behaves.
- **Server rule** — a rule the backend enforces. In a desktop app, this becomes a rule your local data layer must enforce.
- **Known issue** — current behaviour that looks unintended. Each one is listed again in section 15 with a recommendation to copy it or fix it.
- **Desktop decision** — something that cannot work the same way offline, where you need to choose a replacement.

**Out of scope:** the Dashboard tab, the public website, sign-up/login flows and the guest demo. They are covered in ULTIMATE_PROJECT_GUIDE.md.

---

## Contents

**Part A — Foundations**
1. How the four tabs fit together
2. Going offline: what depends on the internet today
3. Data model
4. Fixed value lists and their labels
5. Rules shared by all four tabs

**Part B — The four tabs**
6. App shell (as it affects these tabs)
7. GR tab
8. Customers tab
9. Printing tab
10. Settings tab

**Part C — Reference**
11. PDF layouts
12. Excel formats (export and import)
13. Validation matrix
14. Backend features that have no screen yet
15. Master list of edge cases and known issues
16. Parity checklist for the desktop build

---

# Part A — Foundations

## 1. How the four tabs fit together

- **GR (Goods Receipts):** the core record, also called Lorry Receipt, LR or bilty. The GR tab is the landing screen after login.
- **Customers:** the directory of senders (consignors). A GR can be linked to one customer. Picking a customer fills in their details and default pricing.
- **Printing:** picks a customer and a date range, then produces a combined PDF of that customer's GRs, with a bill summary page on top.
- **Settings:** company identity (name, GSTIN, address, bank, logo), which appears on every printed GR. It also holds appearance, plan status, full Excel backup, Excel import, sign-out and the account-deletion request.

**How the data relates:**

- One company account holds many customers and many GRs.
- A GR optionally points to one customer, always as the **consignor**. The consignee is always free text.
- Company profile data (name, GSTIN, PAN, phone, address, logo, bank details) is printed on GRs and statements. It is read at print time, so editing the profile changes all future printouts, including old GRs.

---

## 2. Going offline: what depends on the internet today

| Today (web) | What it does | Desktop decision |
| --- | --- | --- |
| Login, session cookie, password reset by email | Identifies the company | Likely a single local company profile. Optionally add an app PIN or password. |
| Coupon codes, nightly plan-expiry job | Decides whether writes are allowed (5.10) | Replace with a licence mechanism, or remove gating. |
| India Post pincode lookup | Auto-fills city, district and state from a pincode (5.11) | Bundle a pincode dataset, or offer manual entry only. |
| Cloudinary logo upload | Stores the company logo online | Store the image file locally. PDFs need it as PNG or JPEG. |
| Server-side PDF generation | Single-GR 3-copy PDF, and customer statement PDF | Generate locally, matching section 11. |
| Server-side Excel export and import | Backup and bulk import | Do locally, matching section 12. |
| Server-side search and pagination | Prefix search with exact matches first | Do locally, matching 5.6. |
| Feature flags | Show or hide tabs per account | Not needed, or use a local config. |
| Account deletion request (admin approves) | Asks the admin to delete the account | Replace with "Delete all local data", or drop. |
| Cookie consent settings | Web analytics consent | Not applicable unless you add telemetry. |
| Rate limits and import lock | Protect the shared server | Not needed. Keep the 10,000-row import cap for performance if you like. |
| Referral code | Growth programme | Drop, or display only. |
| Multi-device access | Same data everywhere | Out of scope offline. Excel backup and restore is the portability path. |
| Server time zone (UTC) | Dates stored as UTC midnight | Store booking dates as plain calendar dates (5.4). |

---

## 3. Data model

Types are described in plain words. "Text" means a string. "Stored trimmed" means leading and trailing spaces are removed when saved.

### 3.1 Company profile (one per account)

| Field | Type | Notes |
| --- | --- | --- |
| Owner name | Text | At least 2 characters (server). |
| Owner email | Text | Login identity. Cannot be changed in the app. |
| Owner phone | Text | — |
| Company name | Text | At least 2 characters when provided (server). |
| Company GSTIN | Text, stored uppercase | **(backend)** Unique across all companies on the server. A second company using the same GSTIN is rejected. Not relevant offline. |
| PAN | Text, uppercase | — |
| Company phone | Text | — |
| Company email | Text, lowercase | Must be a valid email when provided. |
| Contact person | Text | — |
| Logo | Image reference | Web: a Cloudinary web address. |
| Address | Full address, city, district, state, pincode | All text. |
| Bank details | Bank name, account holder, account number (text, to keep leading zeros), IFSC (uppercase) | — |
| GR counter | Whole number, starts at 0 | Drives GR numbering (3.5). |
| Print field list | List of print-field names (section 11.3) | Chooses which fields appear on printed GRs. **The web app has no screen for this.** |
| Account status | ACTIVE, INACTIVE, EXPIRED, DELETION_REQUESTED | Drives write permission (5.10). |

### 3.2 Customer

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| Name | Text | — | Required. |
| Phone | Text | empty | Required when created from the Customers form. Empty for customers auto-created by import. |
| Email | Text, lowercase | — | — |
| GSTIN | Text, uppercase | empty | Used to match customers during import. |
| Address | Text | — | — |
| City | Text | — | — |
| State | Text | — | — |
| Pincode | Text | — | Kept as text to preserve digits exactly. |
| Pricing type | One of KM, BOX, KG, QUINTAL, TON, or none | none | — |
| Default rate | Number | — | Filled into the GR rate when the customer is picked. |
| Created at / updated at | Timestamps | — | — |

- **No uniqueness rules.** Two customers can share the same name, phone or GSTIN.
- **Deleting a customer is permanent (backend).** The record is erased, not hidden (8.5).

### 3.3 GR (Goods Receipt)

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| GR number | Text | assigned automatically | Unique; never reused (3.5). |
| Linked customer | Reference to a customer, or none | none | Always the consignor. |
| Booking date | Date | today | — |
| From city | Text | — | Required. |
| To city | Text | — | Required. |
| Consignor | Text | — | Sender name. |
| Consignor GST | Text | — | — |
| Consignee | Text | — | Receiver name. |
| Consignee GST | Text | — | — |
| Product description | Text | — | — |
| Weight | Number | — | The quantity for every pricing type except Box (7.6). |
| Box count | Whole number | — | The quantity for Box pricing. |
| Value | Text | — | Declared goods value; digits only in the form. |
| GST paid by | CONSIGNOR, CONSIGNEE, TRANSPORTER, or none | none | — |
| Ship to | Text | — | Delivery address. |
| Door delivery | Yes/No | No | — |
| Billing type | TO_BE_BILLED, PAID, TO_PAID | TO_PAID | — |
| Pricing type | KM, BOX, KG, QUINTAL, TON | — | Required (server). |
| Rate | Number | — | — |
| Freight amount | Number | — | Required and above 0 (server). Web form: always rate × quantity. |
| Vehicle number | Text | — | — |
| Driver name | Text | — | — |
| Driver document ID | Text | — | Licence or Aadhaar number. |
| Driver mobile | Text | — | — |
| Payment status | PENDING, PAID | PENDING | — |
| Status | BOOKED, IN_TRANSIT, DELIVERED | BOOKED | — |
| Invoice number | Text | — | — |
| E-way bill number | Text | — | — |
| Insurance | Company, policy number, date, amount, risk | none | Stored only if at least one part is filled. |
| Remarks | Text | — | — |
| Deleted flag and deleted date | Yes/No, date | No | Deleting a GR hides it permanently (7.13). |
| Created at / updated at | Timestamps | — | New GRs are listed first by *created* time. |

### 3.4 Plan (coupons)

- **Each coupon has:** a code, a duration in days, a start date, an expiry date, and active / used / expired flags.
- **One-time and tied to an email:** each coupon can be used once, and only by the account whose email it was issued to.
- **The plan's days left** are calculated from the coupons (10.3).
- **Maximum stacked total: 730 days (backend).**

### 3.5 GR number generation (backend)

**Format:** "GR-" + a 3-character company code + "-" + the counter, padded to at least 4 digits. Example: GR-5A9-0001.

- **The company code** is taken from characters 2, 4 and 6 of the account's internal database ID, in capitals. It is fixed per account and cannot be set by the user.
- **The counter** goes up by 1 for every new GR, whether it is created, duplicated or imported. It starts at 1.
- **It never goes down.** Deleted GRs leave gaps, and numbers are never reused.
- **Large counters:** after 9999 the number simply grows (GR-5A9-10000).
- **Import** reserves a block of numbers in one step. Imported rows are numbered in file order, continuing from the current counter.
- **The number cannot be edited.**

**Desktop decision:** generate a company code once (for example, 3 random letters/digits, or the first letters of the company name), keep a local counter, and keep numbers unique even across restores (12.3).

---

## 4. Fixed value lists and their labels

The same value is labelled differently in different places. For exact parity, use the labels below.

| Value | GR form label | GR list label | Printed GR label | Excel |
| --- | --- | --- | --- | --- |
| BOOKED | Booked | Booked (grey badge) | BOOKED | BOOKED |
| IN_TRANSIT | In Transit | In Transit (amber badge) | IN_TRANSIT (on the statement table: TRANSIT) | IN_TRANSIT |
| DELIVERED | Delivered | Delivered (blue badge) | DELIVERED | DELIVERED |
| PENDING (payment) | not shown in the form | Pending | PENDING | PENDING |
| PAID (payment) | not shown in the form | Paid | PAID | PAID |
| TO_PAID (billing) | To Paid (default) | — | badge "TO PAY" (grey) | TO_PAID |
| TO_BE_BILLED (billing) | To be Billed | — | badge "TO BE BILLED" (yellow) | TO_BE_BILLED |
| PAID (billing) | Paid | — | badge "PAID" (green) | PAID |
| KG | Per KG (GR default) | KG | KG | KG |
| BOX | Per Box | BOX | BOX | BOX |
| KM | Per KM | KM | KM | KM |
| QUINTAL | Per Quintal | QUINTAL | QUINTAL | QUINTAL |
| TON | Per Ton | TON | TON | TON |
| CONSIGNOR / CONSIGNEE / TRANSPORTER (GST paid by) | Consignor / Consignee / Transporter | — | raw value | raw value |

- **The Customers form** offers the pricing options in a different order: None, Per KM, Per Box, Per KG, Per Quintal, Per Ton.
- **The customer detail page** shows "Per KM", "Per BOX" and so on, each with its own badge colour: KM green, BOX blue, KG amber, QUINTAL cyan, TON orange.

---

## 5. Rules shared by all four tabs

### 5.1 Text cleaning (web today)

**While typing:**

- Leading spaces are removed.
- Runs of 2 or more spaces collapse to one.
- HTML tags (anything between < and >) are removed from most text fields.
- The invisible "null" character is always removed.

**When leaving a field:** trailing spaces are trimmed.

**When saving (server):** most text fields are stored trimmed. The exceptions, stored as typed, are product description and remarks.

### 5.2 Standard formats

| Format | Rule | Example |
| --- | --- | --- |
| Phone / mobile | Exactly 10 digits; typing strips non-digits; no +91 | 9876543210 |
| Pincode | Exactly 6 digits | 110037 |
| GSTIN | 15 characters: 2 digits, 5 letters, 4 digits, 1 letter, 1 character from 1–9 or A–Z, the letter Z, 1 letter or digit. Converted to capitals. | 22AAAAA0000A1Z5 |
| PAN | 10 characters: 5 letters, 4 digits, 1 letter; capitals | ABCDE1234F |
| IFSC | 11 characters: 4 letters, the digit 0, 6 letters or digits; capitals | SBIN0001234 |
| Bank account number | 9–18 digits (checked at registration only) | — |
| Email | something@something.something; stored lower-case | — |

### 5.3 Number boxes (web today)

- The minus sign and the letter "e" cannot be typed.
- Scrolling the mouse wheel over a number box does not change its value.
- Some boxes stop accepting input after 7 characters (weight, box count and GR rate).

### 5.4 Dates and time zones

- **Booking date:** a calendar date. The web form sends it as year-month-day, and the server stores it as midnight UTC on that date.
- **Other booking times:** GRs created by **Duplicate** (7.12), or imported without a date, get a booking time of "now" with a real time of day. This matters for statement date ranges (9.3).
- **Display formats:**

| Where | Format |
| --- | --- |
| GR list | YYYY-MM-DD |
| Printed GR and statement | dd Mon yyyy, e.g. 05 Mar 2026 |
| Customer detail "Member since" | dd Mon yyyy |
| Excel | YYYY-MM-DD, in UTC |

**Desktop decision:** store booking dates as plain local calendar dates. This avoids every "wrong day near midnight" issue in 15.

### 5.5 Money and number display

| Where | Format |
| --- | --- |
| GR list | "₹ 1,500", Indian digit grouping, decimals only when present |
| Printed documents | "Rs. 1,500.00", always 2 decimals, Indian grouping |
| Customers list and detail | "₹ 150" as stored |

### 5.6 Search behaviour (backend)

Every list search in these tabs works the same way:

- **Prefix match:** each field must *start with* the typed text, ignoring capitals. Spaces around the search text are ignored. Characters like "." or "(" are treated literally.
- **Where it matches:** a record matches if *any* of its searchable fields starts with the text.
- **Ranking:** records where a key field *exactly equals* the text come first. Within each group, newest-created comes first.
- **Timing:** the web app waits after typing stops before searching — 0.5 seconds for lists, 0.4 seconds for the consignor dropdown.

| List | Searchable fields | Exact-match fields (ranked first) |
| --- | --- | --- |
| GRs | GR number, consignor, consignee, vehicle number, from city, to city | GR number, consignor, consignee, vehicle number |
| Customers (Customers tab, Printing tab, GR consignor dropdown) | name, email, phone, GSTIN, city, state | name, email, phone, GSTIN |

**Consequences users will notice:**

- **Middle-of-number searches fail.** "0001" does not find "GR-5A9-0001"; the user must type from "GR-". "1234" does not find vehicle "MH04AB1234".
- **Middle-of-name searches fail.** "Traders" does not find "Sharma Traders"; "Sharma" does.
- **Placeholders undersell the search.** They mention fewer fields than are actually searched, so results can surprise users.
- **The consignor dropdown matches more than names.** Typing "Del" also lists customers whose *city* is Delhi.

### 5.7 Lists and pagination

- **Order:** newest created first, for both GRs and customers.
- **Rows per page:** 10, 20, 50 or 100, default 10. One shared choice for the GR, Customers and Printing lists. It is remembered, and synced across open windows.
- **Footer:** "Showing *X* - *Y* of *Z* records/accounts/customers", then "Page *N* of *M*", with Previous and Next buttons only.
- **Hidden** when everything fits on one page.
- **Resets to page 1** whenever the search, filter or page size changes.
- **Known issue:** if the list shrinks so everything fits on one page while the user is on page 2 or later (for example, after deleting), the footer disappears. The user is left on an empty page with no way back except changing the search, filter or page size.

### 5.8 Messages

- **Success and error toasts** appear at the top-right with a close button.
- **Field errors** show in red under the field. In the GR and Customer forms, a field's error appears once the user has left that field; clicking Save shows errors on every field.
- **Server errors are translated** by the first rule that applies:
  1. Up to 3 field problems joined with " • " using friendly names. For example: "Default rate must be greater than 0 • GSTIN Invalid input".
  2. Duplicate records: "*Field* already exists. Please use a different *field*."
  3. The server's own message (unless it is a bare "Internal server error").
  4. A generic message by error type, e.g. "We could not find the requested record."
  5. A fallback by area: "Could not complete the GR action. Please try again." / "Could not complete the customer action…" / "Could not prepare the print document…".

### 5.9 Dialogs and panels

| Element | Escape closes | Clicking outside closes |
| --- | --- | --- |
| GR and Customer slide-in panels | No | Yes, even while saving (the save still finishes) |
| Delete confirmations | No | Yes, except while deleting |
| Printing statement dialog | No | Yes, even while downloading |
| Activation dialog, cookie policy | Yes | Yes |

There is no "unsaved changes" warning anywhere.

### 5.10 Which actions need an active plan (backend)

"Active plan" on the server means the account status is ACTIVE.

- **Becomes ACTIVE** when a coupon is activated.
- **Becomes EXPIRED** through a nightly job at midnight server time, once no unexpired coupon remains.
- **Becomes DELETION_REQUESTED** when the user asks to delete the account.

| Action | Needs an active plan |
| --- | --- |
| Create GR, edit GR, change GR status | **Yes** |
| Duplicate GR, delete GR | No |
| Print a GR, download a statement | No |
| Create customer, edit customer | **Yes** |
| Delete customer | No |
| Import | **Yes** |
| Export backup | No |
| Edit company profile, request account deletion | No |

**When blocked:** the message is "This action requires an active coupon. Please activate or renew your coupon to continue."

**Edge cases**

- **The web app never blocks up front.** It only shows warnings (a banner and a sidebar card), and the save fails when the server rejects it.
- **The web app and server can disagree for up to a day.** The web app computes "active" from coupon dates; the server uses the account status, updated nightly. A coupon that expires at 3 PM still allows saving until the midnight job runs.
- **Duplicate works without an active plan,** unlike Create.
- **Requesting account deletion blocks all create and edit actions,** because the status becomes DELETION_REQUESTED.

**Desktop decision:** decide which of these to gate under your licence model.

### 5.11 Pincode lookup (used by the Customers form and the GR new-customer block)

**When it runs:** when the pincode has exactly 6 digits, 0.3 seconds after typing stops. Any older lookup still in flight is cancelled. The source is the India Post public API.

**Status icons in the pincode box:**

- spinner (looking up)
- green tick (found)
- red "!" with one of these messages:
  - "No locations found for this pincode."
  - "Could not fetch pincode data. Please enter manually."

  followed by a **"Fill manually instead"** link.

**Filling in the address:**

- **One post office:** the city/locality is filled automatically.
- **Several post offices:** the user must pick one from a searchable list.
  - The hint "Select your locality above" shows until they do.
  - The list shows "No results for '…'" when their search matches nothing.
  - It closes on an outside click.
- **State** is filled automatically, shown locked with "Auto-filled" and a pencil icon to unlock and edit.

**Manual entry:**

- **"Skip, enter manually"** appears while waiting.
- **Manual mode** shows an amber "Manual entry" banner with **"← Auto-detect"**. Going back clears city and state.

**Clearing:** changing the pincode to anything other than 6 digits clears city and state.

**Desktop decision:** without internet, bundle a pincode-to-post-office dataset or use manual entry only. Keep the same states and messages.

---

# Part B — The four tabs

## 6. App shell (as it affects these tabs)

- **Sidebar order in the web app:** GR, Dashboard, Customers, Printing, Settings. GR is the landing screen. For desktop, drop Dashboard if it is out of scope.
- **Top bar:** the user name in capitals and the company logo (or 2 initials); clicking them opens Settings.
- **Plan warnings:**
  - A top banner, "Account not activated — Click to activate with a coupon code", when no plan is active.
  - A sidebar card showing "*N*d left" with a progress bar (red at 20% or less, amber at 50% or less, blue otherwise), or "⚠ No active plan".
- **Sign Out** sits at the bottom of the sidebar, with a confirmation.
- **Collapsing:** the sidebar collapses to icons on wide screens and becomes a drawer on narrow screens.
- **Highlighting quirk:** a tab is highlighted only on an exact address match, so none is highlighted on a customer's detail page.

---

## 7. GR tab

### 7.1 GR list screen

**Header:**

- small caption "FREIGHT MANAGEMENT"
- title "Goods Receipts"
- a "*N* RECORDS" count (the total matching the current search and filter)
- a **"New Receipt"** button

**Filters:**

- **Search box:** placeholder "Search by GR number, consignor, vehicle...". It actually searches the six fields in 5.6.
- **Status buttons:** All, Booked, In Transit, Delivered.

**Table columns:**

| Column | Content |
| --- | --- |
| GR Details | GR number (bold), booking date as YYYY-MM-DD |
| Consignor → Consignee | Consignor name; "→ *consignee*"; plus "Customer: *name*" in blue when linked to a customer |
| Route | From city, a pin icon, to city; then vehicle number, or "-" |
| Freight | "₹ *amount*"; underneath, "*PRICING TYPE* × ₹*rate*" |
| Payment | Pending or Paid |
| Status | Coloured status badge |
| Actions | Print, Duplicate, Edit, Delete icons |

**Table states:**

- "Loading goods receipts…"
- "Failed to load GRs. Please try again."
- "No goods receipts found."

The table is at least 900 pixels wide and scrolls sideways on small screens.

### 7.2 Create / Edit panel layout

- **Panel:** slides in from the right. It is full width on small screens, about 80–85% of the width on larger ones, with a dark overlay behind it.
- **Header:**
  - **New:** caption "NEW RECORD", title "Create Goods Receipt".
  - **Edit:** caption "EDIT RECORD", title = the GR number.
- **Footer:**
  - "Cancel"
  - "Create GR" or "Save Changes" ("Saving…" with a spinner while working)
- **Layout:** two columns on wide screens, one on narrow. Fields appear in this order:

| Left column | Right column |
| --- | --- |
| Customer Linked badge (when linked) | Product Description |
| Consignor (Sender) — with customer search dropdown | Weight (kg) · Box Count |
| Consignor Phone | Billing Type · Pricing Type |
| New-customer "Additional Details" block (when shown) | Rate (₹) · Freight Amount (₹) |
| Consignor GST | GST Paid By |
| Consignee (Receiver) · Consignee GST | Vehicle Number |
| Booking Date · GR Number | Driver Name · Driver Document ID |
| From City · To City | Driver Mobile |
| Ship To Address | Remarks |
| Door Delivery toggle | Value (₹) |
| Invoice Number · E-way Bill Number | |
| Insurance Details: Company, Policy No., Date, Amount (₹), Risk | |
| Status buttons: Booked / In Transit / Delivered | |

- **Reset:** the form starts fresh every time it opens.
- **Closing:** X, Cancel, or clicking the overlay. Escape does nothing, and there is no unsaved-changes warning.

### 7.3 GR fields: rules

| Field | Required | Default | Web form rule | Server rule |
| --- | --- | --- | --- | --- |
| Consignor (Sender) | **Yes** | — | Up to 60 characters. Letters, digits, spaces and . - ' & only. Placeholder "Company or person sending goods". | Optional text |
| Consignor Phone | No | — | Digits only, max 10; exactly 10 if filled. Live "*n*/10" counter; the border turns blue at 10. **Not stored on the GR** — used only to create a customer (7.5). | — |
| Consignor GST | No | — | GSTIN format; capitals; up to 15 characters. | Optional text |
| Consignee (Receiver) | No | — | Up to 60 characters; same characters as Consignor. | Optional text |
| Consignee GST | No | — | GSTIN format; capitals. | Optional text |
| Booking Date | — | Today | New GR: today or later (past dates blocked, with the message "Booking date cannot be in the past."). Edit: any date. | Optional; defaults to now |
| GR Number | — | "Auto" | Read-only. | Assigned by the server (3.5) |
| From City | **Yes** | — | Up to 60 characters. Letters, digits, spaces and . - ' only. Placeholder "e.g. Mumbai". | Required, not empty |
| To City | **Yes** | — | Same as From City. Placeholder "e.g. Delhi". | Required, not empty |
| Ship To Address | No | — | Up to 300 characters; HTML tags removed. | Optional text |
| Door Delivery | — | Off | On/off toggle. | Yes/No, default No |
| Invoice Number | No | — | Up to 60 characters. Letters, digits, spaces and - / only. | Optional text |
| E-way Bill Number | No | — | Up to 60 characters; no format check. | Optional text |
| Insurance Company | No | — | Up to 80 characters. | Optional |
| Insurance Policy No. | No | — | Up to 80 characters. | Optional |
| Insurance Date | No | — | Any date. | Optional |
| Insurance Amount (₹) | No | — | 0 to 9,999,999, at most 2 decimals. | Must be above 0 if given |
| Insurance Risk | No | — | Up to 120 characters. | Optional |
| Status | — | Booked | Three buttons. | BOOKED / IN_TRANSIT / DELIVERED |
| Product Description | No | — | Up to 300 characters. Letters, digits, spaces and , . - / # ( ) & only. Placeholder "Describe the goods…". | Optional text |
| Weight (kg) | Shows "*" but see 7.6 | — | 0 to 9,999,999, at most 2 decimals; max 7 characters typed. Up/Down arrow keys add or subtract 1. | Above 0 if given |
| Box Count | Shows "*" but see 7.6 | — | Whole numbers only ("." blocked); 0 to 9,999,999; max 7 characters. | Whole number above 0 if given |
| Billing Type | — | To Paid | To Paid / To be Billed / Paid. | Default TO_PAID |
| Pricing Type | — | Per KG | Per KG / Per Box / Per KM / Per Quintal / Per Ton. | **Required** |
| Rate (₹) | Shows "*" but see 7.6 | — | 0 to 9,999,999, at most 2 decimals; max 7 characters; steps by 1 but decimals allowed. | Above 0 if given |
| Freight Amount (₹) | **Yes** | ₹ 0.00 | Read-only, calculated (7.6). Must be above 0 to save; up to 99,999,999. | **Required, above 0** |
| GST Paid By | No | blank | Blank / Consignor / Consignee / Transporter. | Optional value from the list |
| Vehicle Number | No | — | Converted to capitals as typed. Characters other than letters, digits, spaces and - _ . @ are removed. Up to 15 characters valid, though the box allows 20. Placeholder "e.g. MH04 AB 1234". | Optional text |
| Driver Name | No | — | Up to 60 characters. Letters, spaces and . - ' only. | Optional text |
| Driver Document ID | No | — | Up to 60 characters; no format check. Placeholder "Licence / Aadhar No.". | Optional text |
| Driver Mobile | No | — | Digits only, max 10; exactly 10 if filled; counter. | Optional text |
| Remarks | No | — | Up to 300 characters; same characters as Product Description. | Optional text |
| Value (₹) | No | — | Digits only, up to 30 digits; stored as text. Placeholder "e.g. 250000". | Optional text |
| Payment Status | — | Pending | **Hidden in the form.** New GRs are always Pending. | PENDING / PAID |

**Error message styles:**

- "*Label* is required."
- "*Label* must be at least *N* characters"
- "*Label* cannot exceed *N* characters"
- "*Label* contains invalid characters"
- "*Label* format is invalid"
- "*Label* must be a number"
- "*Label* must be a whole number"
- "*Label* can have at most 2 decimal places"

**Save button** is disabled until:

- Consignor, From City and To City are filled, and
- freight is above 0.

**On submit:**

- Every field is checked.
- If anything fails, every field is marked, and the toast "Please fix the errors in the form before submitting." appears.

### 7.4 Linking the consignor to a customer (create only)

- **Search:** typing in Consignor opens a dropdown of matching customers. It uses the customer search in 5.6 and shows the first page of results (10 by default).
- **Each result shows:** the name, and "*phone* · *city*".
- **Dropdown states:**
  - "Searching…"
  - "No matches found. You can save this as a new customer."
- **Selecting a customer:**
  - shows the badge "CUSTOMER LINKED — *name* · *phone*"
  - fills consignor name, phone, GST, address, city, state and pincode
  - fills **From City**, only if From City is empty
  - fills **Pricing Type**, if the customer has one
  - fills **Rate** with the customer's default rate, if they have one
  - makes Consignor, Phone and GST read-only
- **"Clear"** (next to the badge) unlinks the customer. It also:
  - wipes consignor name, phone, GST and address
  - resets pricing to Per KG
  - empties Rate and From City
- **Typing** in Consignor after linking is not possible, because the field is read-only.
- **No dropdown in edit mode.**

**When the "Additional Details" block appears.** On a new GR, the new-customer block shows when all of these are true:

- the consignor is not linked
- the Consignor box is not empty
- the typed name does not exactly equal (ignoring capitals) the name of any customer in the current dropdown results

**Its fields:**

- **Address** (required): up to 300 characters. Letters, digits, spaces and , . - / # ( ) only.
- **Pincode** (required): 6 digits, with lookup (5.11).
- **City / Locality** (required): up to 50 characters are valid, though the box allows 60.
- **State** (required): up to 50 characters.

### 7.5 Automatic customer creation on save (create only)

It happens when the consignor is not linked **and** both Consignor and Consignor Phone are filled.

1. A customer is created with:
   - name and phone
   - GSTIN (from Consignor GST), address, city, state and pincode
   - pricing type and default rate copied **from this GR**
2. Toast: "Customer "*name*" created successfully."
3. The GR is then created, linked to the new customer.

**If a step fails:**

- If customer creation fails, the GR is not created. The error toast comes from the customer step.
- If the customer is created but the GR fails, the new customer stays linked in the open form, so a retry does not create a second customer.

**Name without phone:** the GR is saved with a free-text consignor and no customer.

**Known issue (backend):** the server refuses to create a customer unless GSTIN, address, city, state and pincode are all *present* (empty is accepted, missing is not). The web form leaves blank fields out entirely. So:

- A new consignor with a phone but **no Consignor GST** fails with "GSTIN Invalid input", and the GR is not saved.
- The same rule affects the Customers tab (8.2).

### 7.6 Freight calculation

**Freight = Rate × Quantity**, rounded to 2 decimals.

- **Quantity** is the **Box Count** for Per Box, and the **Weight (kg)** box for everything else: KG, KM, Quintal and Ton.
- **Recalculates live** whenever rate, weight, box count or pricing type changes.
- **Cannot be typed** manually.
- **Neither server nor import checks it.** Freight is simply stored as sent.

**What this means in practice:**

- **Per KM:** the distance goes in the box labelled "Weight (kg)".
- **Per Quintal / Per Ton:** quintals or tons go in "Weight (kg)". The label never changes, and the PDF also says "Weight (Kg)".
- **Only the combination is required.** The fields marked "*" (Weight, Box Count, Rate) are never checked on their own; only freight above 0 is required. A Per Box GR needs Box Count and Rate; Weight can stay empty.
- **Opening an existing GR for edit recalculates freight immediately:**
  - If the stored freight differed from rate × quantity, saving silently replaces it.
  - If the GR has no rate or no quantity (common for **imported** GRs, which only require freight), freight shows ₹ 0.00 and Save is disabled until they are filled.

### 7.7 What is saved

- **Only filled values are sent.** Blank text is left out, and so are zeros in number fields.
- **In edit mode, a field cannot be cleared.** Emptying it sends nothing, so the old value stays (for example, a saved vehicle number cannot be removed).
- **Billing type** is normalised to upper case with underscores.
- **Door Delivery** is always sent.
- **Insurance** is sent only if at least one insurance field is filled.
- **Server check:** it confirms that a linked customer belongs to this account ("Customer not found or access denied.").
- **On success:**
  1. Toast "GR "*number*" created successfully." or "GR "*number*" updated successfully."
  2. The panel closes.
  3. The list refreshes.

### 7.8 Editing an existing GR

- **Opening:** from the pencil icon. The panel fills with the GR's values.
- **The customer link is not shown.** The server returns only the linked customer's name and phone, not its ID. So in edit mode:
  - the "Customer Linked" badge never appears
  - the Consignor name is freely editable, even on linked GRs; changing it does not change the customer
  - Consignor Phone shows the linked customer's phone and can be edited, but the change is never saved
  - the link itself cannot be changed or removed
- **No new-customer block, and no customer search,** in edit mode.
- **Past booking dates are allowed.**
- **Freight recalculates** on open (7.6).

### 7.9 GR Number

See 3.5. It is shown as "Auto" while creating, and as the real number in the edit title and field.

### 7.10 Status changes

- **Status is changed only through the edit form,** using the three buttons. Quick status updates also exist on the server, but no screen uses them.
- **Changing status needs an active plan** (5.10).
- **There are no rules on transitions.** Any status can change to any other, including Delivered back to Booked.

### 7.11 Print (single GR)

- **What it produces:** the printer icon generates a **3-page PDF**, one page each: DRIVER COPY, CONSIGNOR COPY, CONSIGNEE COPY. Each page is A5 landscape; the full layout is in 11.1.
- **Opening it:**
  - Chrome-family browsers open a new tab. If popups are blocked: "Popup blocked. Please allow popups to open the GR PDF."
  - Other browsers open it through a new-tab link.
- **While printing:** a spinner shows on that row, and all print buttons are disabled until it finishes.
- **The server's suggested file name** is "GR-*number*.pdf". The web app shows the PDF in a tab, so the name is lost unless the user saves it from the viewer.
- **Does not need an active plan.**

### 7.12 Duplicate

The copy icon creates a new GR from an existing one.

**Copied:** every field, **including** the customer link, payment status, invoice number, e-way bill number, insurance, freight, and remarks.

**Changed:**

- a new GR number (the counter goes up)
- **status set to Booked**
- **booking date set to now** (today, with the current time)
- new created/updated times

**Afterwards:**

- Toast: "GR duplicated as "*number*"."
- The new row is highlighted amber for 3 seconds. This is only visible if it lands on the current page and matches the current filter; with default sorting it appears at the top.

**Edge cases**

- **Payment status is copied.** A duplicate of a Paid GR is also Paid.
- **Document numbers are copied.** The duplicate carries the same invoice and e-way bill numbers as the original.
- **No active plan needed** (5.10).
- **Date-range gap.** Because the booking date includes a time of day, the duplicate can fall outside a statement whose range *ends* on that day (9.3).

### 7.13 Delete

1. The trash icon opens a confirmation: "Delete GR — Are you sure you want to delete GR "*number*"? This action cannot be undone." with buttons "Delete GR" and "Cancel".
2. The server **hides** the GR (soft delete) and records the deletion date.
3. Toast: "GR deleted successfully."

**After deletion:**

- The GR disappears from lists, search, PDFs, statements and Excel export.
- There is no restore screen.
- Its number is never reused.
- **Does not need an active plan.**

### 7.14 GR edge cases (summary)

1. **Address required without a phone.** The new-customer address block is required even when no phone is entered, so no customer would be created anyway.
2. **Exact name without selecting.** Typing an existing customer's exact name without picking it hides the address block. If a phone is also entered, a *second* customer with the same name is created.
3. **Missing GST blocks creation.** Automatic customer creation fails without Consignor GST (7.5 known issue).
4. **"Today" is stale after midnight.** The earliest allowed booking date, and the default, are fixed when the app loads; a window left open past midnight still uses yesterday.
5. **Fields cannot be cleared in edit mode** (7.7).
6. **Imported GRs can't be saved** without first filling rate and quantity (7.6).
7. **No screen marks a GR as Paid.** Payment status is hidden; only import or the (unused) server can set Paid.
8. **Length mismatches:** vehicle number 15 vs 20; new-customer city and state 50 vs 60.
9. **Editing a looked-up pincode** clears city and state.
10. **Missing rate in the list.** A GR without a rate shows "KG × ₹" with no number.
11. **Clicking outside while saving** closes the panel, but the save still completes.
12. **Deleted customers.** After a linked customer is deleted, the GR keeps its consignor text but loses the "Customer: *name*" line.

---

## 8. Customers tab

### 8.1 Customer list screen

**Header:**

- caption "CRM INTEGRITY"
- title "Customer Registry"
- "*N* ACCOUNTS"
- an **"Add Customer"** button

**Search:** placeholder "Search by name, email, or mobile...". It actually searches name, email, phone, GSTIN, city and state (5.6).

**Table columns:**

| Column | Content |
| --- | --- |
| Customer | Name, with "*city*, *state*" beneath (only if a city exists) |
| Contact | Phone; email beneath if present |
| GSTIN | GSTIN or "-" |
| Pricing Type | Code (KM, BOX…) or "-" |
| Default Rate | "₹ *rate*" or "-". A rate of 0 also shows "-". |

- **Clicking a row** opens the detail page.
- **Table states:**
  - "Loading customers…"
  - "Failed to load customers." (the reason is not shown)
  - "No customers found."

### 8.2 Add / Edit customer panel

- **Panel:** a narrow slide-in from the right.
- **Header:**
  - **New:** caption "NEW CUSTOMER", title "Add Customer".
  - **Edit:** caption "EDIT CUSTOMER", title = the customer name.
- **Footer:** "Cancel", then "Add Customer" or "Save Changes".

| Field | Web form rule | Server rule |
| --- | --- | --- |
| Full Name / Company Name (required) | 2–60 characters; HTML removed. "*n*/60" counter, amber from 48. Placeholder "e.g. Sharma Traders". | Required text (the server alone would accept an empty string) |
| Phone (required) | Exactly 10 digits; non-digits removed. Placeholder "9876543210". | At least 10 characters |
| Email | Optional; valid email; lower-cased; up to 254 characters. | Valid email, or empty |
| GSTIN | Optional; GSTIN format; capitals. Placeholder "e.g. 27AABCU9603R1ZX". | **Must be present**, may be empty (see known issue) |
| Address | Optional; up to 300 characters. Letters, digits, spaces and , . - / # ( ) only. Placeholder "Full street address". | **Must be present**, may be empty |
| Pincode | Optional; exactly 6 digits; lookup (5.11). | **Must be present**: a number, or empty |
| Locality / City | Optional; up to 50 characters; picked from the lookup, or typed in manual mode. | **Must be present**, may be empty |
| State | Optional; auto-filled and locked, pencil to edit; no length check. | **Must be present**, may be empty |
| Pricing Type | None / Per KM / Per Box / Per KG / Per Quintal / Per Ton. | One of the list, or none |
| Default Rate (₹) | Optional; 0 to 9,999,999, at most 2 decimals. | **Above 0** if given |

- **Rate preview:** when both pricing type and rate are set, a chip shows "₹ *rate* / *TYPE* — Default GR rate".
- **When errors show:** after leaving a field. Clicking Save checks everything first.
- **Server field errors** are attached to the matching fields.
- **Success toasts:** "Customer "*name*" created successfully." or "Customer "*name*" updated successfully."

**Known issues**

- **(backend) Hidden required fields.** Creating a customer fails unless GSTIN, Address, City, State and Pincode are all filled. The form marks them optional but leaves blank fields out, and the server requires them to be present. The error reads, for example: "GSTIN Invalid input • Address Invalid input • City Invalid input".
- **Default rate of 0.** The form allows 0, the server rejects it: "Default rate must be greater than 0".
- **Opening Edit repeats the pincode lookup.** This can overwrite the saved state, and the saved city if the pincode has only one post office.
- **Changing or clearing the pincode** wipes city and state.
- **Blank fields in edit mode** are not sent, so saved values cannot be cleared.
- **No duplicate check.** The same phone or GSTIN can be used by several customers.
- **Imported customers need a phone to be edited.** Customers created by import have no phone, so the form's required-phone rule blocks every edit until one is added.

### 8.3 Customer detail screen

**Top bar:** "← Back to Customers", **Edit** and **Delete**.

**Header:** the customer name, an **"Active"** badge (always shown), and "Member since *dd Mon yyyy*".

**Three sections:**

- **Contact Information:**
  - Phone Number, tap to call.
  - Email Address, tap to send (only if set).
- **Business Profile:**
  - GSTIN, with a copy button (toast "GSTIN copied to clipboard"; the icon briefly turns into a tick), or "Not Provided".
  - Pricing Unit as a coloured badge "Per *TYPE*", or "Not Set".
  - Default Rate "₹*rate*", or "N/A".
- **Billing Address:** Street Address (or "Not Provided"), City / State (or "N/A"), Pincode (or "N/A").

**Not found:** "Customer Not Found", the reason, and "Back to Customers".

**Gap:** the detail screen does not list the customer's GRs or totals. Statements come from the Printing tab.

### 8.4 Editing from the detail screen

Edit opens the same panel, pre-filled. After saving, the detail screen and the list both refresh.

### 8.5 Delete customer

1. Confirmation: "Delete Customer — Are you sure you want to delete *name*? This action cannot be undone."
2. Toast: "Customer deleted successfully."
3. The app returns to the list.

**(backend) The customer record is erased permanently,** even though a log line calls it "soft deleted".

**What happens to linked GRs:**

- They keep their consignor name text, but the customer link now points to nothing.
- The GR list no longer shows "Customer: *name*" for them.
- A statement for that customer can never be produced again.
- In the Excel export, their per-customer sheet is named by an ID fragment (12.1).

**Does not need an active plan.**

**Desktop decision:** either keep permanent deletion, or block deleting customers that have GRs, or hide them instead.

---

## 9. Printing tab

### 9.1 Customer picker screen

- **Header:** caption "DOCUMENT CENTER", title "Printing".
- **Search:** placeholder "Search customers by name, phone...". It uses the same customer search as 5.6.
- **Table columns:** Customer (name, city and state), Contact (phone and email), GSTIN, and Action (a "PRINT GRS" button).
- **Clicking anywhere on a row** opens the export dialog.
- **States and pagination** are the same as the Customers list; the footer says "customers".

### 9.2 "Export GR Report" dialog

- **Title:** "Export GR Report", with an X.
- **Customer:** name and phone.
- **"DATE SELECTION"**, with an info tooltip: "Dates cannot exceed today. If you leave the end date empty, it will include all records up to the present."

| Field | Required | Rule |
| --- | --- | --- |
| Start Date | Yes | Cannot be after today (local date). |
| End Date (opt) | No | Cannot be after today. |

- **End before start** shows the toast "End date cannot be earlier than start date." and nothing is downloaded.
- **"Download Statement"** is disabled until a start date is chosen, and shows "Processing…" while working.
- **On success:**
  1. The file downloads.
  2. The dialog closes.
  3. The file is named "GR_Statement_*Name*_*from*_to_*to*.pdf", or "GR_Statement_*Name*_up_to_*from*.pdf" with no end date. Characters other than letters and digits in the name become "_".
- **When no GRs match (backend):** "No GRs found for this customer in the given range."
- **Does not need an active plan.**

### 9.3 Which GRs are included (backend)

**Included:** GRs of this customer that are linked to it and not deleted, where:

- **start:** the booking date is on or after midnight UTC of the start date
- **end (if given):** the booking date is **on or before midnight UTC** of the end date

**Order:** booking date, newest first.

**Edge cases**

- **Time-of-day GRs can drop out.** GRs whose booking time is not exactly midnight are **excluded** on the end date itself: duplicates (7.12) and imports without a date, both of which get "now". A GR duplicated today is missing from a statement that ends today.
- **Only linked GRs.** GRs with the same consignor *name* but no customer link are not included.
- **Misleading file name.** With no end date, the name says "up_to_*start*", but the file actually covers everything *from* the start date onward, including future-dated GRs.
- **Future dates only with an open end.** The date pickers stop at today, so GRs with future booking dates are included only when the end date is empty.

**Desktop fix:** compare plain calendar dates, inclusive at both ends.

### 9.4 Statement PDF

Page 1 is an A4 bill summary. It is followed by one A5 landscape page per GR, a single copy with no copy label. Full layout in 11.2.

---

## 10. Settings tab

### 10.1 Settings hub

**Top:**

- Title "Settings", with the subtitle "Manage your business configuration, preferences, and security settings."
- A profile banner:
  - the company logo, or the owner's first initial
  - a green or red plan dot
  - the owner's name, with a "Verified" or "⚠ No active plan" badge
  - email (or phone), and the company name
  - a **"Manage Business Profile"** button

**Eight cards:**

| Card | Badge |
| --- | --- |
| Company & Business Profile | Company name |
| Appearance & Display | THEME (SIZE), e.g. "SYSTEM (MD)" |
| Subscription & Billing | "Standard Plan" |
| Export & Data Backup | "Backup Data" |
| Bulk Data Import | "CSV / Excel" |
| Active Sessions & Security | Account role in capitals |
| Cookie & Consent Settings | "Preferences" |
| Danger Zone & Account Deletion | "Deletion Pending" or "Sensitive" |

- **Opening a card** shows a detail view with "← Back to Settings", the card's icon, title and description, and "Status: *badge*".
- **Each section has its own address** (?tab=company, appearance, subscription, download, import, session, cookies, danger). An unknown tab shows the hub.
- **Opening Settings** always reloads the profile from the server.

### 10.2 Company & Business Profile

**View mode:**

- All fields are read-only.
- **"Edit Profile"** is disabled while an account deletion is pending, with the toast "Cannot edit profile while account deletion is pending."

**Edit mode** (an "Editing" badge shows):

| Field | Web form rule | Server rule |
| --- | --- | --- |
| Full Name (required) | 2–60 characters; HTML removed. | At least 2 characters |
| Email Address | Locked: "Cannot be changed". | — |
| Phone Number | Exactly 10 digits. **Required to save,** even if never set. | Any text |
| Company Name | Up to 60 characters. | **At least 2 characters if provided** |
| GSTIN | Optional; GSTIN format; capitals. | Any text. Unique across all companies (server): a clash shows "GSTIN already exists. Please use a different gstin." |
| PAN | Optional; PAN format; capitals. | Any text |
| Company Phone | Optional; exactly 10 digits. | Any text |
| Company Email | Optional; valid email. | Valid email if provided |
| Contact Person | Up to 60 characters. | Any text |
| Referral Code | Locked, with a copy button ("Referral code copied!"), or "NOT GENERATED". | — |
| Company Address: Full Address, City, District, State, Pincode | Free text. **No checks and no pincode lookup** here. | Any text |
| Bank Details: Bank Name, Account Holder, Account Number, IFSC Code | Free text (IFSC shown in capitals). **No checks here.** | Any text; IFSC stored uppercase |

**Company logo** (edit mode only):

- **Upload:** a small upload badge on the round logo. Only images, up to 2 MB. Errors: "Only image files are allowed." / "Image must be under 2 MB." / "Logo upload failed. Please try again."
- **Preview:** the logo previews immediately, but is saved only when "Save Profile" is clicked.
- **Where it appears:** the top-bar avatar, the Settings banner, the profile header, and printed GRs and statements.
- **On PDFs:** it is converted to PNG, 5 seconds are allowed to load it, and it is silently left out if it cannot load.

**Buttons:**

- **"Save Profile"** checks the fields; problems show "Please fix the errors before saving." On success: "Profile updated successfully."
- **"Cancel"** restores the values from before editing.

**What is sent:** only non-empty values. Address and bank details are sent only if at least one of their fields is filled.

**Known issues**

- **Saved values cannot be cleared** (for example, removing a GSTIN).
- **The screen leaves edit mode before the save is confirmed.** On failure, it still shows the unsaved values.
- **Background refresh can overwrite edits.** A profile refresh in the background (for example, after returning to the window 5+ minutes later) replaces unsaved edits.
- **Company name minimum mismatch.** A 1-character company name passes the form but fails on the server.
- **Orphaned logos.** Cancelling after uploading a logo leaves the uploaded file unused online.
- **Weaker checks than signup.** Address and bank details are unchecked here, although registration checks them.

**Desktop note:** the print-field choice (11.3) belongs on this screen. The server supports it, but the web app has no control for it.

### 10.3 Subscription & Billing

**How days left are worked out.** A coupon counts only if it is active, used, has start and expiry dates, and has not expired:

- a coupon already running adds its days until expiry, rounded up
- a coupon scheduled to start later adds its full duration

**Chaining (backend):** activating a coupon while one is active chains it. It starts when the current one ends, so it shows as "scheduled". The combined remaining time may not exceed **730 days**: "Adding this coupon would exceed the maximum allowed limit of 730 days. You currently have *N* days remaining."

**What the screen shows:**

- A large "*N* days remaining".
- A message: "Your subscription is active. Below is the list of active and scheduled coupons contributing to your access." or "No active subscription. Please apply a valid coupon code to restore dashboard access."
- **"Show details"** lists the running and scheduled coupons, oldest start first. Each shows:
  - the code
  - "*N* Days Duration"
  - "Mon D to Mon D, YYYY"
  - a "Days Left" box, for the running one
- **"Activate Coupon"** opens the activation dialog.

**Activation errors (backend):**

| Case | Message |
| --- | --- |
| Invalid or already used | shown as "wrong coupon" |
| Issued to another email | "This coupon is not valid for your account." |
| Duration over 730 days | "Coupon duration cannot exceed 730 days." |
| Race condition | "Coupon was just used by another request." |

Any message containing "expired" is shown as "Your session has expired. Please log in again."

**Gap:** expired coupon history is not listed.

**Desktop decision:** replace with your licence screen, keeping "days remaining" and "activate" if you use time-limited licences.

### 10.4 Export & Data Backup

**Screen text:**

- "Full System Backup — Download all your records in a single dynamic Excel sheet".
- Two info lines: "GR Records — All goods receipts in CSV" and "Customer Records — Full customer database in CSV". **Both are wrong:** the download is one Excel workbook.

**"Download Backup":**

1. Downloads the workbook described in 12.1.
2. Saves it as "tsm_complete_backup_*YYYY-MM-DD*.xlsx". The date is in UTC, so between midnight and 5:30 AM India time it shows the previous day.
3. Toast: "System backup downloaded successfully." or "Failed to export system backup."

**Does not need an active plan.**

### 10.5 Bulk Data Import

**Screen:**

- An instructions box:
  1. Download the Excel migration template.
  2. Add your GRs and customer records.
  3. Keep the headers unmodified.
  4. From City, To City, Pricing Type and Freight Amount are required.
  5. Save and upload.
- **"Download Excel Template"** saves "bilty_one_data_migration_template.xlsx" (format in 12.2).
- **An upload area:** "Drag and drop file here, or browse", "Supports CSV or XLSX up to 5MB". The chosen file name is shown, with "Cancel" and "Start Import".

**File handling (web today):**

- **Drag and drop** accepts only names ending .csv or .xlsx; anything else shows "Invalid file type. Only CSV and Excel (.xlsx) files are supported."
- **The browse picker** relies on the file-type filter only.
- **A CSV** is converted inside the app into an Excel file with one sheet named "All GR Records". So a CSV can only carry GR rows, and its first row must hold the headers.
- **Server limits:**
  - .xlsx only (the app's conversion handles CSV)
  - at most 5 MB: "File too large. Maximum allowed size is 5MB."
  - at most 10,000 data rows
  - 3 imports per 10 minutes: "Too many import attempts. Please wait a few minutes and try again."
  - one import at a time: "An import is already in progress for your account. Please wait for it to complete."
- **Needs an active plan.**

**Import rules** are in 12.2.

**On success:**

- Four counters: **GRs Imported**, **Customers Imported**, **GRs Skipped**, **Customers Skipped**.
  - The skipped counts are always 0.
  - "Customers Imported" counts every customer the import linked to, **including ones that already existed**.
- A "Validation Failures" list (empty on success).
- Toast: "Successfully imported *X* GRs and *Y* Customers!"
- The chosen file is cleared.

**On failure:**

- A red "Import Failed" box with the message ("more/less" for long text) and "Dismiss".
- A toast; messages over 20 characters are cut to 50 characters plus "…".

**Known issues**

- **Row errors are never shown.** When rows fail validation, the server sends the list of bad rows, but the web app shows only "Import failed — *N* row(s) have validation errors. Fix them and re-upload."
- **Unmatched consignors aren't shown.** The server also returns a list of consignors that couldn't be linked (no GST); the web app ignores it.
- **The template's notes row breaks imports** (12.2).

### 10.6 Active Sessions & Security

- **The whole section** is a single "Sign out of your account — This will end your current session." row with a **"Sign Out"** button.
- **Confirmation:** "Sign Out Session — Are you sure you want to end your current session?…"
- **Gap:** there is no device or session list, despite the card description.
- **Desktop decision:** replace with "Lock app" if you add a PIN, or drop.

### 10.7 Cookie & Consent Settings

- **Necessary cookies:** always on, locked ("Required").
- **Analytics cookies:** an on/off switch.
- **"Save Preferences"** is enabled only when something changed. Toast: "Cookie preferences saved."
- **"Reset to Default"** turns analytics off; it still needs Save.
- **Unsaved changes** show "Unsaved changes: click Save to apply."
- **Known issue:** the choice is stored but has no effect.
- **Desktop:** not applicable, unless you add optional usage telemetry.

### 10.8 Danger Zone & Account Deletion

**Warning text (Hinglish):** "Account delete karoge toh pura data permanently udh jayega 💀 No undo, no Ctrl+Z, no 'bhai recover kar do' later."

**Requesting deletion:**

1. A **"Delete Account"** link opens a confirmation: "Delete Account — Final warning 😭 Once approved, your account and all company data will be permanently deleted." with "Yes, Delete Everything" and "Cancel".
2. **(backend)** A deletion request is created with status PENDING, and the account status becomes DELETION_REQUESTED. **This blocks all create and edit actions** (5.10).
3. **The server rejects repeats:** "A deletion request is already pending." / "Your account has already been approved for deletion."

**While PENDING:**

- The link is hidden.
- The hub badge reads "Deletion Pending".
- The company profile shows an amber "⚠️ Account Deletion Pending" notice with the request date and any reason, and editing is blocked.

**If REJECTED:**

- The link is hidden. (The server would accept a new request, but the web app gives no way to send one.)
- The message reads "Your account deletion request was rejected by the admin. Please contact admin for details."
- **Known issue:** the "contact admin" link points to a page that does not exist (/contact-us).

**Desktop decision:** replace with "Delete all data on this computer", with a strong confirmation and an offer to export a backup first.

---

# Part C — Reference

## 11. PDF layouts (backend)

Both documents use the Roboto font, near-black text, and "Rs." for currency. Empty values print as "—".

### 11.1 Single GR — 3 copies, A5 landscape

The PDF has 3 pages. They are identical except for the copy label at the bottom-right: "DRIVER COPY", "CONSIGNOR COPY", "CONSIGNEE COPY".

Each page is one outer box containing, top to bottom:

1. **Header row**
   - **Left:**
     - the logo (28×28, if available)
     - the company name in capitals, dark blue, bold (or "TRANSPORT COMPANY" if empty)
     - "GSTIN: … PAN: … Ph: …" (only the parts that exist)
     - the address line: full address, city, state, pincode
   - **Right:** a boxed table:
     - G.R. No. (bold, dark blue)
     - Dated (dd Mon yyyy)
     - From (in capitals)
     - To (in capitals)
2. **Party row**
   - two boxes side by side: "Consignor:" with the name and "GSTIN: …", and "Consignee:" with the name and "GSTIN: …"
   - these always print, even when empty
3. **Goods table**, one header row and one data row:
   - "Pkgs." (box count)
   - "DESCRIPTION" (in capitals; the font shrinks for long text: 9pt for up to 20 characters, 8pt for up to 40, 7pt above)
   - "Weight (Kg)"
   - "Freight (Rs.)"

   Each column appears only if its print field is enabled (11.3).
4. **Summary box**
   - **Line 1** (only parts that exist): "Invoice: …", "E-Way: …", "Door Delivery" (green, only when Yes).
   - **Line 2:** "Pricing: …", "Rate: Rs. …", "Payment: …", "Status: …"; then, right-aligned, "Total: Rs. …" and the billing badge.
5. **Insurance box**, only if the GR has insurance data: "Insurance: … | Policy: …" and "Amount: … | Risk: … | Date: …".
6. **Vehicle box**, only if any exist: "Vehicle: …", "Driver: …", "Ph: …", "Doc ID: …".
7. **Bank box.** **Known issue:** this never prints on GR copies, because it reads bank details from the GR instead of the company profile.
8. **GST / Ship To box**, only if any exist: "GST Paid By: …", "Ship To: …".
9. **"Remarks: …"**, then **"Value: …"**, each only if present.
10. **The copy label.**

### 11.2 Customer statement — A4 bill page + A5 GR pages

**Page 1: A4 "Freight Bill".**

1. **Header**, between double rules:
   - **Left:** logo (38×38), company name (or "Transport Company"), and "GSTIN: … Ph: …" with city, state and pincode. **Known issue:** the full address line is missing here.
   - **Right:** "Freight Bill", a large "INVOICE", and a bill reference.
2. **Bill reference format:** "BILL-" + the last 6 characters of the customer's ID in capitals + "-" + the last 6 digits of the current time. It changes on every download.
3. **Bill To:** customer name, and "☎ *phone*".
4. **Bill Details table:**
   - Bill Reference
   - Bill Date (today)
   - Total GRs
   - Payment Status: "Fully Paid" when nothing is pending, otherwise **"Partially Due"** — even when *nothing* is paid.
5. **"GR PERIOD"** banner: earliest booking date → latest booking date among the included GRs.
6. **Stats strip:** TOTAL GRS, BOOKED, IN TRANSIT, DELIVERED, PENDING PAYMENT (a count).
7. **GR table.** Columns: #, GR No., Date, From, To, Description, Wt., Boxes, Billing, Freight (Rs.), Pay, Status.
   - Status shows "TRANSIT" for In Transit.
   - Pay cells are coloured: Paid green, Pending yellow.
   - Status cells are coloured: Delivered green, Transit purple, Booked blue.
   - Rows alternate grey and white.
8. **Amount summary**, right-aligned:
   - Subtotal Freight
   - TOTAL AMOUNT (black bar)
   - ✓ Amount Paid (green)
   - BALANCE DUE (yellow)
9. **Bank details line**, only if an account number or bank name exists: "BANK DETAILS: *bank* A/C Holder: … A/C No: … IFSC: …".
10. **Signature blocks:** "FOR *COMPANY NAME* / Authorised Signatory" and "Received & Acknowledged / Customer Signature & Stamp".
11. **Footer:** "Generated: *date time* · Computer-generated invoice."

**Following pages:** one A5 landscape page per GR, same as 11.1 but a single copy with no copy label, newest booking date first.

### 11.3 Print field selection (backend; no screen yet)

The company profile can hold a list of which fields to print. If the list is empty, **all fields print**.

**Available names:**

- **Goods:** Description of Goods, Weight (Kg), No. of Boxes, Pricing Type
- **Pricing:** Rate, Freight Amount
- **Vehicle:** Vehicle No., Driver Name, Document ID, Driver Phone
- **Invoice:** Invoice No., E-Way Bill No.
- **Insurance:** Insurance Company, Policy No., Policy Date, Coverage Amount, Risk Type
- **Bank:** Account Holder, Account No., Bank Name, IFSC Code
- **Shipment:** Value, GST Paid By, Ship To, Door Delivery
- **Status:** Billing Type, Payment Status, Delivery Status
- **Remarks**

**Always printed** regardless of the list: the header (company, GR number, date, from, to), consignor and consignee, and the copy label.

This is the "Customisable GR layout" the website advertises. **Desktop recommendation:** add a checklist of these names under Company Profile.

---

## 12. Excel formats

### 12.1 Backup workbook (web "Download Backup")

**Sheets, in order:**

1. **"Summary"** — two columns, Metric and Value. Rows:
   - User ID
   - Export Date (YYYY-MM-DD)
   - Date Range ("All Time")
   - Total GR Records
   - Unique Customers. **Known issue:** unlinked GRs count as one extra "customer".
2. **"Customers"** — columns Name, Phone, Email, GSTIN, Address, City, State, Pincode, Pricing Type, Default Rate. **Known issue (backend): this sheet is always empty,** because the query filters on a "deleted" field that customer records do not have.
3. **"All GR Records"** — every non-deleted GR, sorted by customer, then booking date newest first. 36 columns:
   - GR Number, Booking Date, Customer Name, From City, To City
   - Consignor, Consignor GST, Consignee, Consignee GST
   - Product Description, Weight (kg), Box Count, Value, GST Paid By, Ship To, Door Delivery
   - Billing Type, Pricing Type, Rate, Freight Amount
   - Vehicle Number, Driver Name, Driver Document ID, Driver Mobile
   - Payment Status, Status, Invoice Number, Eway Bill Number
   - Insurance Company, Insurance Policy No, Insurance Date, Insurance Amount, Insurance Risk
   - Remarks, Created At, Updated At

   Formats:
   - Dates: YYYY-MM-DD (UTC).
   - Created At / Updated At: "YYYY-MM-DD HH:MM:SS" (UTC).
   - Door Delivery: "Yes" / "No".
   - Value lists: raw codes (e.g. TO_PAID).

   **Known issue:** "Customer Name" is always blank, for the same reason as the empty Customers sheet.
4. **One sheet per customer**, same 36 columns, holding that customer's GRs. Plus a sheet named "No Customer" for unlinked GRs.
   - **Intended sheet name:** the customer's name, with \ / * ? : [ ] removed, cut to 28 characters. Duplicate names get "_1", "_2" (base cut to 25 characters).
   - **Known issue:** because of the customer bug above, sheets are actually named with the last 8 characters of the customer's internal ID.

**Formatting:** every sheet's header row is bold white on dark slate (#2E4057), centred, with filter arrows.

**Round trip:**

- The "All GR Records" sheet can be re-imported as-is. Extra columns (GR Number, Customer Name, Created At, Updated At) are ignored.
- **Re-importing creates new GRs with new numbers.** There is no duplicate detection.
- The Customers sheet is not read by import.

### 12.2 Import template and rules (backend)

**Template sheets:**

- **"Instructions"** — the rules.
- **"All GR Records"**:
  - row 1: headers
  - **row 2: a notes row** describing each column
  - rows 3–4: two sample GRs

**Header row** (a leading "* " is ignored when matching; matching is by exact text otherwise):

- * Booking Date, * From City, * To City
- Consignor, Consignor GST, Consignee, Consignee GST
- Product Description, Weight (kg), Box Count, Value, GST Paid By, Ship To, Door Delivery
- Billing Type, * Pricing Type, Rate, * Freight Amount
- Vehicle Number, Driver Name, Driver Document ID, Driver Mobile
- Payment Status, Status, Invoice Number, Eway Bill Number
- Insurance Company, Insurance Policy No, Insurance Date, Insurance Amount, Insurance Risk
- Remarks

**Accepted alternative headers:**

- "Product" for Product Description
- "Weight" for Weight (kg)
- "Driver Doc ID" or "Driver ID" for Driver Document ID

**Sheet lookup:**

- The sheet must be named "All GR Records"; the older name "GR Records" is also accepted.
- Otherwise: "Invalid file — sheet "All GR Records" not found. Please use a file exported from this platform."
- Completely empty rows are skipped.
- No data rows: "The sheet is empty — nothing to import."

**Per-row rules**

| Column | Rule | If empty or invalid |
| --- | --- | --- |
| From City, To City | Required text | Row error "From City required" / "To City required" |
| Pricing Type | One of BOX, KM, KG, QUINTAL, TON, ignoring capitals | Row error "Pricing Type invalid — allowed: BOX, KM, KG, QUINTAL, TON" |
| Freight Amount | Must read as a number. **0 and negative numbers are accepted.** | Row error "Freight Amount required" |
| Booking Date | A date cell or date text | Defaults to the **import time** ("now") |
| Billing Type | TO_BE_BILLED / PAID / TO_PAID, ignoring capitals | Silently becomes TO_PAID |
| Payment Status | PENDING / PAID | Silently becomes PENDING |
| Status | BOOKED / IN_TRANSIT / DELIVERED | Silently becomes BOOKED |
| GST Paid By | CONSIGNOR / CONSIGNEE / TRANSPORTER | Silently left empty |
| Door Delivery | Yes, true or 1 means Yes (ignoring capitals) | Anything else means No |
| Weight, Box Count, Rate, Insurance Amount | Numbers | Non-numbers are silently left empty |
| Consignor GST, Consignee GST | Converted to capitals | — (no format check) |
| Insurance Date | Date | Left empty |
| Insurance | Stored only if any insurance column has a value | — |
| Everything else | Text, trimmed | Empty cells stay empty |

- **Not checked on import:** GSTIN format, phone digits, freight = rate × quantity, whether numbers are positive, text lengths.

**All-or-nothing validation:**

- If **any** row has an error, **nothing** is imported. The server lists every bad row and its errors; the web app doesn't show them (10.5).
- Otherwise every row is imported.

**Linking and creating customers:**

- The key is the consignor's **GST**. For each distinct Consignor GST that has a Consignor name:
  - if a customer with that GSTIN already exists for this account, the GR links to it, and that customer is **not** changed
  - otherwise a new customer is created with **only a name and GSTIN** (no phone, address or pricing)
- Rows with a consignor but no GST are imported without a link. Those names are reported back as "unmatched consignors".
- If two rows share a GST with different names, the first name wins for a new customer.

**Numbering:** GR numbers continue from the counter, in file order.

**Failure partway through (server problem):** "Import stopped after *X* of *Y* row(s) — a database error interrupted the batch. The rows already imported are saved. Re-upload a file containing only the remaining rows rather than the whole file again."

**Known issue: the template's notes row breaks imports.**

- Row 2 of the template is not a sample row. Its cells hold notes such as "Required." and "BOX / KM / KG / QUINTAL / TON".
- The instructions say only to delete the two sample rows.
- A user who follows them exactly leaves row 2 in place. That row fails validation — Pricing Type and Freight Amount aren't valid — so **the whole import is rejected**.

**Desktop fix:** ignore that row by recognising the notes, remove it from the template, or tell users to delete it.

**Other edge cases**

- **Dates stored as plain numbers** instead of date cells may be read as a wrong date. The template instructions say to use real date cells.
- **CSV uploads** are converted by the app; date columns in CSV may arrive as text or numbers, depending on the spreadsheet program that saved them.
- **Imported GRs usually lack rate or quantity,** so they cannot be saved from the edit panel until those are filled (7.6).

---

## 13. Validation matrix

"Form" is the web GR, Customer or Profile form. "Server" is the backend rule. "Import" is the Excel import rule.

### 13.1 GR fields

| Field | Form | Server | Import |
| --- | --- | --- | --- |
| Booking date | Required-ish (defaults today); not in past on create | Optional; default now | Optional; default now |
| From / To city | Required; ≤60; letters digits space . - ' | Required | Required |
| Consignor | Required; ≤60; letters digits space . - ' & | Optional | Optional |
| Consignor / Consignee GST | GSTIN format | Any text | Uppercased; no format check |
| Consignee | ≤60 | Optional | Optional |
| Product description | ≤300; letters digits space , . - / # ( ) & | Optional | Optional ("Product" alias) |
| Weight | 0–9,999,999, 2 decimals | Above 0 | Number or empty |
| Box count | Whole, 0–9,999,999 | Whole, above 0 | Number or empty (not forced whole) |
| Pricing type | Chosen from list | Required, from list | Required, from list |
| Rate | 0–9,999,999, 2 decimals | Above 0 | Number or empty |
| Freight | Calculated; above 0 | Required, above 0 | Required number; 0 and negatives allowed |
| Billing type | From list | From list; default TO_PAID | Invalid becomes TO_PAID |
| Payment status | Hidden (Pending) | From list; default PENDING | Invalid becomes PENDING |
| Status | From list | From list; default BOOKED | Invalid becomes BOOKED |
| GST paid by | From list or blank | From list or empty | Invalid becomes empty |
| Vehicle number | Capitals; ≤15 | Any | Any |
| Driver name | ≤60; letters space . - ' | Any | Any |
| Driver document ID | ≤60 | Any | Any (aliases) |
| Driver mobile | 10 digits | Any | Any |
| Invoice number | ≤60; letters digits space - / | Any | Any |
| E-way bill | ≤60 | Any | Any |
| Insurance amount | 0–9,999,999, 2 decimals | Above 0 | Number or empty |
| Ship to | ≤300 | Any | Any |
| Door delivery | Toggle | Yes/No | Yes/true/1 means Yes |
| Value | Digits only, ≤30 | Any text | Any text |
| Remarks | ≤300; same characters as description | Any | Any |

### 13.2 Customer fields

| Field | Form | Server (create) | Import (auto-created) |
| --- | --- | --- | --- |
| Name | Required, 2–60 | Required text | From Consignor |
| Phone | Required, 10 digits | Required, at least 10 characters | Empty |
| Email | Optional, valid | Valid or empty | — |
| GSTIN | Optional, format | **Must be present** (may be empty) | From Consignor GST (the match key) |
| Address | Optional, ≤300 | **Must be present** | — |
| City | Optional, ≤50 | **Must be present** | — |
| State | Optional | **Must be present** | — |
| Pincode | Optional, 6 digits | **Must be present** (number or empty) | — |
| Pricing type | Optional | Optional | — |
| Default rate | Optional, 0–9,999,999 | Above 0 if given | — |

### 13.3 Company profile fields

| Field | Settings form | Server | Registration form (for reference) |
| --- | --- | --- | --- |
| Owner name | Required, 2–60 | At least 2 | Required, ≤60 |
| Owner phone | Required, 10 digits | Any | Required, 10 digits |
| Company name | ≤60 | At least 2 if given | Required, ≤60 |
| GSTIN | Format if given | Any; unique on server | Format (effectively required) |
| PAN | Format if given | Any | Format (effectively required) |
| Company phone | 10 digits if given | Any | 10 digits if given |
| Company email | Valid if given | Valid if given | Valid if given |
| Contact person | ≤60 | Any | ≤60 |
| Address fields | Free text | Any | Pincode 6 digits; lengths limited |
| Bank fields | Free text | Any | Account 9–18 digits; IFSC format; holder ≤30 |
| Logo | Image ≤2 MB | Valid web address | — |

---

## 14. Backend features that have no screen yet

These exist on the server today but have no web screen. They are candidates for the desktop app.

1. **Print field selection** — choose which fields appear on printed GRs (11.3).
2. **Bulk rate change for one customer** — for all of a customer's GRs, optionally within a date range, either set every rate to one value or add an amount (which can be negative). **Known issue:** this changes the *rate only*; freight amounts are not recalculated, so they go stale. Limited to 10 requests per minute.
3. **Selected edit** — change up to 500 chosen GRs of one customer, each with its own field changes, in one go.
4. **Customer GR list** — a customer's GRs within a date range, paged (20 per page by default, max 100), newest booking date first. Ideal for a "GR history" section on the customer detail screen.
5. **Quick status change** — change only a GR's status (needs an active plan).
6. **Simpler export** — a two-sheet workbook ("All GR Records" with 33 columns, without Customer Name or Created/Updated, plus a working "Customers" sheet). It does not have the empty-Customers-sheet bug.
7. **Deletion request reason** — the server accepts a reason text, but the web app never sends one.

The original product requirements also list **bulk printing** (print many selected GRs at once) and **bulk editing from the GR list** (select rows, then edit). Neither was built.

---

## 15. Master list of edge cases and known issues

Recommendation key: **Fix** = don't copy into the desktop app; **Keep** = intended or harmless; **Decide** = product choice.

| # | Issue | Where | Recommendation |
| --- | --- | --- | --- |
| 1 | Customer creation fails unless GSTIN, address, city, state and pincode are all filled, although the form says optional | 7.5, 8.2 | Fix: truly optional |
| 2 | New consignor with a phone but no GST blocks the GR from saving | 7.5 | Fix (follows #1) |
| 3 | No screen to mark a GR Paid; payment status hidden | 7.3 | Decide: add a Paid toggle (statements depend on it) |
| 4 | "Weight (kg)" box used as distance, quintals and tons | 7.6 | Fix: relabel by pricing type |
| 5 | Opening an old or imported GR recalculates freight; imported GRs can't be saved without rate and quantity | 7.6 | Decide: allow manual freight, or keep stored freight until inputs change |
| 6 | Weight, Box Count and Rate show "*" but aren't individually required | 7.6 | Fix: mark only what's required for the chosen pricing type |
| 7 | New-customer address required even with no phone | 7.14 | Fix |
| 8 | Exact-name match without selecting can create a duplicate customer | 7.14 | Fix: auto-link, or warn |
| 9 | Fields can't be cleared when editing a GR, customer or profile | 7.7, 8.2, 10.2 | Fix |
| 10 | Customer link invisible and unchangeable in GR edit; phone edit ignored | 7.8 | Fix |
| 11 | Duplicate copies payment status and invoice/e-way numbers; booking time "now" | 7.12 | Decide (likely reset Paid and clear document numbers) |
| 12 | Duplicate and delete allowed without an active plan | 5.10 | Decide |
| 13 | Statement end date excludes GRs with a time of day | 9.3 | Fix: calendar-date comparison |
| 14 | Statement file name "up_to_*start*" is misleading | 9.2 | Fix |
| 15 | Statement "Partially Due" even when nothing is paid | 11.2 | Fix: "Unpaid" / "Partially Paid" / "Fully Paid" |
| 16 | Bank details never print on GR copies | 11.1 | Fix |
| 17 | Full company address missing from the statement header | 11.2 | Fix |
| 18 | Backup Customers sheet empty, Customer Name blank, per-customer sheets named by ID | 12.1 | Fix |
| 19 | "Unique Customers" counts unlinked GRs as one | 12.1 | Fix |
| 20 | Backup screen says "CSV", but the file is Excel | 10.4 | Fix |
| 21 | Backup file name uses the UTC date | 10.4 | Fix |
| 22 | Import template's notes row makes every import fail | 12.2 | Fix |
| 23 | Import row errors and unmatched consignors not shown | 10.5 | Fix |
| 24 | Import accepts freight 0 and negatives; typos in value lists silently become defaults | 12.2 | Decide (probably reject) |
| 25 | Import can create duplicate GRs on re-upload; no duplicate check | 12.1 | Decide |
| 26 | Imported customers have no phone, so the edit form blocks until one is added | 8.2 | Fix: phone optional for imported customers, or collect it |
| 27 | "Customers Imported" counts existing customers; "Skipped" always 0 | 10.5 | Fix |
| 28 | Customer delete is permanent; GRs keep a dangling link | 8.5 | Decide |
| 29 | Opening customer Edit re-runs the pincode lookup, which may overwrite city and state | 8.2 | Fix: only look up when the pincode changes |
| 30 | Editing a pincode wipes city and state | 5.11 | Keep or soften |
| 31 | Default rate 0 allowed by the form, rejected by the server | 8.2 | Fix: pick one rule |
| 32 | Company name 1 character passes the form, fails the server | 10.2 | Fix |
| 33 | Settings phone mandatory; address and bank unchecked (unlike registration) | 10.2 | Fix: same rules in both places |
| 34 | Profile leaves edit mode before the save is confirmed; background refresh can overwrite edits | 10.2 | Fix |
| 35 | Search is prefix-only ("0001" doesn't find GR-XXX-0001) | 5.6 | Decide: add "contains" matching |
| 36 | Search placeholders list fewer fields than are searched | 5.6 | Fix |
| 37 | Consignor dropdown matches customers by city, state, phone, email and GSTIN too | 5.6 | Decide |
| 38 | Pagination can strand the user on an empty page | 5.7 | Fix |
| 39 | "Today" stale if the app stays open past midnight | 7.14 | Fix |
| 40 | Length mismatches (vehicle 15/20, city and state 50/60) | 7.14 | Fix |
| 41 | Clicking outside a panel closes it without warning, even mid-save | 5.9 | Fix: add an unsaved-changes prompt |
| 42 | Web plan status (coupon dates) and server status (nightly) can disagree for up to a day | 5.10 | Fix: one source of truth |
| 43 | Deletion request blocks all create and edit actions; rejected users can't re-request; broken "contact admin" link | 10.8 | Replace for desktop |
| 44 | "Active" badge on every customer | 8.3 | Keep or remove |
| 45 | Cookie preference has no effect | 10.7 | Not applicable |
| 46 | Coupon "expired" message is shown as "session expired" | 10.3 | Fix |
| 47 | Bulk rate change updates rate but not freight | 14 | Fix before exposing |

---

## 16. Parity checklist for the desktop build

Tick each item when the desktop app behaves the same, or deliberately differently per section 15.

**GR**

- [ ] New GR defaults: today, To Paid, Per KG, Booked, Pending, door delivery off, number shown as "Auto".
- [ ] Freight = rate × box count for Box pricing, rate × weight box otherwise; 2 decimals; read-only; save blocked at 0.
- [ ] Consignor search shows customers; selecting one fills name, phone, GST, address, From City (if empty), pricing type and rate, and locks name, phone and GST; "Clear" resets them.
- [ ] New consignor with name + phone creates a customer (with this GR's pricing and rate) before the GR.
- [ ] Every field limit and character rule in 7.3 and 13.1.
- [ ] GR numbers GR-XXX-0001 style, never reused, shared by create, duplicate and import.
- [ ] Duplicate: new number, Booked, today; everything else copied (per your decision on #11).
- [ ] Delete hides the GR everywhere; confirmation text matches.
- [ ] Single-GR PDF: 3 A5-landscape copies laid out per 11.1.
- [ ] GR list: columns, status filter, prefix search with exact-first ranking, newest first, pagination sizes and memory.

**Customers**

- [ ] Form rules per 8.2 (with #1 fixed).
- [ ] Pincode lookup states and messages per 5.11 (or an offline equivalent).
- [ ] Detail screen sections, copy GSTIN, Edit and Delete with confirmation.
- [ ] Linked GRs handled per your decision on #28.

**Printing**

- [ ] Customer picker, date dialog (start required, end optional, both ≤ today, end ≥ start).
- [ ] Statement PDF: A4 bill page + one A5 page per GR per 11.2; empty range shows "No GRs found for this customer in the given range."

**Settings**

- [ ] Company profile: fields, logo (image, ≤2 MB), save and cancel, used on all PDFs.
- [ ] Print field selection (recommended addition, 11.3).
- [ ] Appearance: Light / Dark / System theme; text size 14 / 16 / 18 / 20px; remembered.
- [ ] Licence or plan screen replacing coupons (10.3).
- [ ] Backup workbook per 12.1 (with #18 and #19 fixed); file name with the local date.
- [ ] Import per 12.2: .xlsx and .csv, "All GR Records" sheet, header aliases, required columns, all-or-nothing validation with a visible row-error list, customer link by GST, 10,000-row cap.
- [ ] Round trip: backup → import into a fresh install restores all GRs (with new numbers unless you add "restore" mode) and customers.
