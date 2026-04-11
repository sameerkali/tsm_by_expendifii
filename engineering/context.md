# TMS by Expendifii — Project Context

> Feed this file to any AI at the start of every session. It contains everything the AI needs to understand the project without re-reading the FRD.

---

## What this project is

TMS (Transport Management System) by Expendifii is a **web dashboard** for small Indian transport companies. It lets transport office staff manage Goods Receipt (GR) bookings and print transport documents. The product is intentionally minimal — version 1 has no payment gateway, no multi-user accounts, and no complex analytics. Speed and simplicity for non-technical daily users is the primary goal.

---

## Repository layout

```
tms-frontend/          ← this repo (Next.js 15, TypeScript)
tms-backend/           ← separate Node.js REST API project (already built)
```

The frontend communicates with the backend exclusively over REST APIs. There is no tRPC, no GraphQL, no shared monorepo. The two repos are completely independent.

---

## Tech stack (frontend only)

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | `src/` directory, TypeScript strict mode |
| Language | TypeScript | `strict: true`, `noUncheckedIndexedAccess: true` |
| Styling | Tailwind CSS + shadcn/ui | shadcn components in `src/components/ui/` — never hand-edit |
| Server state | TanStack React Query v5 | All API calls go through custom hooks in `src/hooks/` |
| Forms | react-hook-form + Zod | `zodResolver` connects the two |
| HTTP client | Axios | Single instance in `src/lib/api/client.ts` |
| Auth | JWT in httpOnly cookie | Cookie set by Node backend; verified in Next.js middleware |
| Schema validation | Zod | Schemas in `src/lib/validations/` — used on both form and API boundary |
| Date handling | date-fns | |
| Excel export | xlsx | Blob download from backend |
| Icons | lucide-react | |

---

## Authentication model

- The Node.js backend sets a **httpOnly cookie** named `tms_session` on successful login.
- The cookie contains a signed JWT. JS running in the browser **cannot read this cookie**.
- `middleware.ts` (Next.js Edge runtime) intercepts every request, reads the cookie, verifies the JWT using `jose`, and either passes the request or redirects to `/login`.
- If the company account status is `INACTIVE`, middleware redirects to `/activate` regardless of JWT validity.
- The backend enforces **max 2 concurrent sessions** via Redis. A third login evicts the oldest session.
- The JWT payload contains: `companyId`, `userId`, `status` (`ACTIVE` | `INACTIVE`).
- `src/lib/auth/cookies.ts` has `import 'server-only'` at the top — it cannot be imported by any client component.

---

## Routing structure

```
/login                         → public, (auth) route group
/activate                      → public, (auth) route group
/dashboard                     → protected, shows recent GRs
/customers                     → protected, customer list
/customers/[id]                → protected, edit customer
/gr                            → protected, GR list + bulk actions
/gr/new                        → protected, create GR
/gr/[grNumber]                 → protected, view + edit GR
/gr/[grNumber]/print           → protected, print-only layout (no sidebar)
/printing                      → protected, bulk print queue
/settings                      → protected, profile + export + deletion
```

Route groups:
- `(auth)` — centred card layout, no sidebar, no topbar
- `(dashboard)` — full shell with `Sidebar.tsx` and `TopBar.tsx`

---

## Core domain: GR (Goods Receipt)

This is the heart of the product. Everything else is secondary.

**GR number format:** `GR-0001`, `GR-0002` — auto-incremented per company by the backend.

**GR fields:**
- GR Number (auto, read-only after creation)
- Booking Date
- From City / To City (free text — no dropdown lock)
- Consignor Name, Consignee Name
- Product Description, HSN Code
- Weight, Box Count
- Pricing Type: `PRICE_BY_WEIGHT` or `PRICE_BY_BOX`
- Rate
- Freight Amount (calculated: weight × rate OR box count × rate)
- Vehicle Number, Driver Name, Driver Mobile
- Payment Status: `PAID` | `UNPAID` | `TO_PAY`
- Status: `BOOKED` | `IN_TRANSIT` | `DELIVERED`

**Status colours:**
- `BOOKED` → grey
- `IN_TRANSIT` → yellow
- `DELIVERED` → green

**Key GR rules:**
- GR number cannot be changed after creation
- All fields except GR number are editable at any time
- Duplicate GR: copies all fields into a new GR with a new auto-incremented number
- Bulk edit: select multiple GRs → change Vehicle Number, Driver Name, or Status across all selected
- Bulk print: select multiple GRs → open all in a single print view

---

## Printing system

- Three document types: **GR Copy**, **Loading Slip**, **Manifest**
- Format: A4
- Method: browser `window.print()` — no server-side PDF generation
- Each document includes: company logo, company name, company address, customer info, vehicle info, driver info, product details, freight details
- The print page at `/gr/[grNumber]/print` renders without sidebar or topbar
- Bulk print opens all selected GR documents in one print view

---

## Customer management

Fields: Name, Mobile Number, GSTIN, Address, Default Rate

Default Rate auto-fills the Rate field when creating a GR. Customers can be created, edited, deleted, and searched. All customer data is scoped to the company — one company never sees another's customers.

---

## Account & activation model

- One account per company (no multi-user in V1)
- Signup requires: Company Name, GSTIN, Email, Password, Logo
- GSTIN and Email cannot be changed after signup
- New accounts start as `INACTIVE`
- Activation requires a **coupon code** generated by the Expendifii admin
- Coupon is linked to the company's email; codes are validated server-side
- Access duration is set per coupon (in days); account goes `INACTIVE` again on expiry
- No payment gateway in V1

---

## Settings page

Users can update: Company Name, Phone Number, Address, Logo
Users cannot change: GSTIN, Email

Other settings actions:
- **Download Data** — exports all GR and Customer records as Excel
- **Account Deletion Request** — submits request; Expendifii admin approves; data permanently deleted on approval
- **Logout** — clears the session cookie

---

## Folder structure quick reference

```
src/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (auth)/activate/page.tsx
│   └── (dashboard)/
│       ├── layout.tsx             ← sidebar + topbar
│       ├── dashboard/page.tsx
│       ├── customers/page.tsx
│       ├── gr/page.tsx
│       ├── gr/new/page.tsx
│       ├── gr/[grNumber]/page.tsx
│       ├── gr/[grNumber]/print/page.tsx
│       ├── printing/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── ui/                        ← shadcn — never edit manually
│   ├── layout/                    ← Sidebar, TopBar, PageShell
│   ├── auth/                      ← LoginForm, ActivateForm
│   ├── gr/                        ← GRTable, GRForm, GRStatusBadge, GRBulkBar, etc.
│   ├── printing/                  ← GRCopyTemplate, LoadingSlipTemplate, ManifestTemplate
│   ├── customers/                 ← CustomerTable, CustomerForm
│   ├── settings/                  ← ProfileForm, DownloadDataButton, DeleteAccountSection
│   └── shared/                    ← DataTable, SearchInput, ConfirmDialog, EmptyState
├── lib/
│   ├── api/                       ← client.ts + per-domain API modules
│   ├── auth/                      ← jwt.ts, cookies.ts (server-only)
│   ├── validations/               ← Zod schemas
│   └── utils/                     ← freight.ts, gr-number.ts, cn.ts, etc.
├── hooks/                         ← React Query hooks (useGRList, useGR, useCustomers…)
├── types/                         ← TypeScript types (gr.ts, customer.ts, api.ts…)
└── config/
    ├── constants.ts               ← GR_STATUS_COLORS, NAV_ITEMS
    └── query-keys.ts              ← GR_KEYS, CUSTOMER_KEYS factories
```

---

## Key rules every AI must follow

1. **Never edit `src/components/ui/`** — shadcn auto-generates these. Add new shadcn components with `npx shadcn@latest add <component>`.

2. **Never write fetch/axios calls inside a component** — all HTTP calls go in `src/lib/api/*.api.ts`. Components call hooks. Hooks call API modules.

3. **Never trust the client for company identity** — `companyId` always comes from the verified JWT in middleware, never from a request body or query param.

4. **Zod schema runs twice** — once in the form via `zodResolver` (client feedback), once in the API module before the request is sent (network boundary).

5. **No string literals for query keys** — always use `GR_KEYS.list()`, `GR_KEYS.detail()`, etc. from `src/config/query-keys.ts`.

6. **`src/lib/auth/cookies.ts` is server-only** — it has `import 'server-only'` at the top. Never import it from a client component or hook.

7. **All dropdowns must allow free-text fallback** — per FRD, transport offices work with new vehicles and drivers daily. Never hard-block manual entry.

8. **Freight is always calculated, never manually entered** — `PRICE_BY_WEIGHT`: weight × rate. `PRICE_BY_BOX`: boxCount × rate. Logic lives in `src/lib/utils/freight.ts`.

9. **Print pages strip the shell** — the `/gr/[grNumber]/print/page.tsx` must not render `Sidebar` or `TopBar`.

10. **`noUncheckedIndexedAccess` is on** — `array[0]` returns `T | undefined`. Always guard array access.

---

## Environment variables

```
NEXT_PUBLIC_API_URL      ← Node.js backend base URL (exposed to browser)
JWT_SECRET               ← must match backend signing secret exactly (server only)
COOKIE_NAME              ← cookie name used by backend (default: tms_session)
NEXT_PUBLIC_GA_ID        ← Google Analytics measurement ID
```

---

## What is NOT in V1

Do not implement, scaffold, or suggest any of the following — they are explicitly out of scope:

- E-way bill integration
- Multi-user accounts (one account per company only)
- Payment gateway
- Vehicle management module
- Driver management module
- Advanced reporting or analytics charts
- SMS or WhatsApp notifications
- In-app data import (migration is done manually by Expendifii team)