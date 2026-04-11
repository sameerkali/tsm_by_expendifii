# TMS by Expendifii — Development Phases

> Feed this file alongside `context.md` to any AI when starting work on a specific phase. Tell the AI: "We are on Phase X. Complete only the tasks listed under that phase."

---

## How to use this document

Each phase is a self-contained unit of work. Complete all tasks in a phase and verify them before moving to the next. Phases are ordered by dependency — later phases build on earlier ones. Do not skip ahead.

When handing a phase to an AI:
1. Provide `context.md`
2. Provide this file
3. State which phase you are on
4. Provide the relevant file(s) to work on

---

## Phase 0 — Foundation & configuration

**Goal:** Project runs, compiles without errors, all config files are correct.

**Tasks:**

- [ ] Configure `tsconfig.json` — `strict: true`, `noUncheckedIndexedAccess: true`, path alias `@/*` → `./src/*`
- [ ] Configure `next.config.ts` — add security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Content-Security-Policy, Strict-Transport-Security)
- [ ] Configure `tailwind.config.ts` — add custom colours for GR status badges (grey, yellow, green)
- [ ] Create `.env.local` with all required variables (`NEXT_PUBLIC_API_URL`, `JWT_SECRET`, `COOKIE_NAME`, `NEXT_PUBLIC_GA_ID`)
- [ ] Create `.env.example` with placeholder values (no real secrets)
- [ ] Add `.env.local` and `.env.production` to `.gitignore`
- [ ] Configure `.prettierrc` with `prettier-plugin-tailwindcss`
- [ ] Verify `npm run build` passes with zero TypeScript errors

**Completion check:** `npm run build` succeeds. `npm run dev` starts without errors.

---

## Phase 1 — Core infrastructure (no UI yet)

**Goal:** All the invisible plumbing that every feature depends on.

**Files to create:**

### `middleware.ts`
- Read `tms_session` httpOnly cookie
- Verify JWT with `jose` using `JWT_SECRET`
- Allow public paths: `/login`, `/activate`
- If no cookie or invalid JWT → redirect to `/login`, clear cookie
- If `status === INACTIVE` and not on `/activate` → redirect to `/activate`
- Forward `x-company-id` as request header for downstream use

### `src/lib/auth/jwt.ts`
- `verifyJWT(token: string)` → returns payload or null
- Uses `jose`, Edge-compatible
- Returns typed `SessionPayload` from `src/types/session.ts`

### `src/lib/auth/cookies.ts`
- `import 'server-only'` at top
- `setSessionCookie(token: string)` — httpOnly, secure, sameSite: lax, 8h maxAge
- `clearSessionCookie()`

### `src/lib/api/client.ts`
- Axios instance with `baseURL: process.env.NEXT_PUBLIC_API_URL`
- `withCredentials: true` (sends cookie on every request)
- Response interceptor: on 401 → `window.location.href = '/login'`
- Response interceptor: normalise error shape to `ApiError`

### `src/types/api.ts`
- `ApiResponse<T>` generic wrapper
- `ApiError` type
- `PaginatedResponse<T>` if backend uses pagination

### `src/types/session.ts`
- `SessionPayload` — `companyId`, `userId`, `status`, `exp`

### `src/types/gr.ts`
- `GR`, `GRStatus` enum, `PricingType` enum, `PaymentStatus` enum
- `CreateGRInput`, `UpdateGRInput`, `BulkEditGRInput`

### `src/types/customer.ts`
- `Customer`, `CreateCustomerInput`, `UpdateCustomerInput`

### `src/types/company.ts`
- `Company`, `CompanyStatus` enum

### `src/lib/validations/auth.schema.ts`
- `LoginSchema` — email, password
- `ActivateSchema` — couponCode

### `src/lib/validations/gr.schema.ts`
- `CreateGRSchema` — all GR fields with correct Zod types
- `UpdateGRSchema` — same fields, all optional except grNumber
- `BulkEditGRSchema` — vehicleNumber, driverName, status (all optional)
- Refinement: if `pricingType === PRICE_BY_WEIGHT`, weight is required; if `PRICE_BY_BOX`, boxCount is required

### `src/lib/validations/customer.schema.ts`
- `CreateCustomerSchema`, `UpdateCustomerSchema`

### `src/lib/utils/freight.ts`
- `calculateFreight(pricingType, rate, weight?, boxCount?)` → number
- Throws if required value is missing for pricing type

### `src/lib/utils/gr-number.ts`
- `formatGRNumber(n: number)` → `'GR-0001'`
- `parseGRNumber(s: string)` → number

### `src/lib/utils/cn.ts`
- `cn(...inputs)` using `clsx` + `tailwind-merge`

### `src/lib/utils/format-date.ts`
- `formatDate(date: string | Date)` → `'DD MMM YYYY'` using date-fns
- `formatDateInput(date: string | Date)` → `'YYYY-MM-DD'` for form inputs

### `src/config/constants.ts`
- `GR_STATUS_COLORS` — maps status to Tailwind class strings
- `NAV_ITEMS` — sidebar nav config (label, href, icon name)
- `MAX_LOGO_SIZE_MB`

### `src/config/query-keys.ts`
- `GR_KEYS.all()`, `.lists()`, `.list(search?)`, `.detail(grNumber)`
- `CUSTOMER_KEYS.all()`, `.lists()`, `.list(search?)`
- `COMPANY_KEYS.profile()`

**Completion check:** No TypeScript errors. `middleware.ts` redirects unauthenticated requests correctly when tested manually.

---

## Phase 2 — API layer

**Goal:** All REST API calls defined and typed. No UI yet.

### `src/lib/api/auth.api.ts`
- `login(email, password)` → sets cookie via backend response
- `logout()` → clears cookie
- `activate(couponCode)` → activates account

### `src/lib/api/gr.api.ts`
- `listGRs(search?)` → `GR[]`
- `getGR(grNumber)` → `GR`
- `createGR(data: CreateGRInput)` → `GR`
- `updateGR(grNumber, data: UpdateGRInput)` → `GR`
- `duplicateGR(grNumber)` → `GR` (new GR with new number)
- `bulkUpdateGRs(grNumbers: string[], data: BulkEditGRInput)` → `GR[]`

### `src/lib/api/customer.api.ts`
- `listCustomers(search?)` → `Customer[]`
- `getCustomer(id)` → `Customer`
- `createCustomer(data)` → `Customer`
- `updateCustomer(id, data)` → `Customer`
- `deleteCustomer(id)` → void

### `src/lib/api/settings.api.ts`
- `getProfile()` → `Company`
- `updateProfile(data)` → `Company`
- `requestAccountDeletion()` → void

### `src/lib/api/export.api.ts`
- `downloadExcel()` → triggers file download from blob response

**Completion check:** Each API function can be called from the browser console and returns the correct shape. No TypeScript errors.

---

## Phase 3 — React Query hooks

**Goal:** Hooks wrap every API call with caching, loading states, and error handling.

### `src/hooks/useGRList.ts`
- `useGRList(search?)` — `useQuery` with `GR_KEYS.list(search)`, staleTime 30s
- `useCreateGR()` — `useMutation`, invalidates `GR_KEYS.lists()` on success
- `useBulkUpdateGRs()` — `useMutation`, invalidates `GR_KEYS.lists()` on success

### `src/hooks/useGR.ts`
- `useGR(grNumber)` — `useQuery` with `GR_KEYS.detail(grNumber)`
- `useUpdateGR()` — `useMutation`, invalidates detail + list on success
- `useDuplicateGR()` — `useMutation`, invalidates `GR_KEYS.lists()` on success

### `src/hooks/useCustomers.ts`
- `useCustomers(search?)` — `useQuery`
- `useCreateCustomer()`, `useUpdateCustomer()`, `useDeleteCustomer()` — mutations with invalidation

### `src/hooks/useCompany.ts`
- `useCompany()` — `useQuery` with `COMPANY_KEYS.profile()`
- `useUpdateCompany()` — mutation

### `src/hooks/useSession.ts`
- Returns session state (companyId, status) from a lightweight `/api/me` call or cookie parsing
- Used by components that need to know account status client-side

**Root layout setup in `src/app/layout.tsx`:**
- Wrap children in `QueryClientProvider`
- Include `ReactQueryDevtools` in development only

**Completion check:** Hooks return correct data shapes when called from a test component. React Query Devtools shows queries and cache correctly.

---

## Phase 4 — Shared components & layout shell

**Goal:** The dashboard shell is visible. Shared utility components exist.

### `src/components/shared/`

- `DataTable.tsx` — generic table with typed columns, optional checkbox column, empty state slot
- `SearchInput.tsx` — debounced (300ms) controlled input, calls `onChange` with debounced value
- `ConfirmDialog.tsx` — shadcn AlertDialog wrapper, props: `title`, `description`, `onConfirm`, `loading`
- `LoadingSpinner.tsx` — centred spinner for page-level loading
- `EmptyState.tsx` — props: `title`, `description`, optional `action` button
- `ErrorState.tsx` — props: `message`, optional `retry` callback
- `PageTitle.tsx` — h1 with optional subtitle

### `src/components/layout/`

- `Sidebar.tsx` — renders `NAV_ITEMS` from constants, highlights active route with `usePathname`
- `TopBar.tsx` — shows current page title, logout button (calls `auth.api.logout()` then redirects)
- `PageShell.tsx` — padding wrapper, accepts `title` and `children`

### `src/app/(auth)/layout.tsx`
- Centred card layout, no sidebar, no topbar

### `src/app/(dashboard)/layout.tsx`
- Sidebar + TopBar shell
- Checks session; if `INACTIVE`, redirects to `/activate`

**Completion check:** Navigating to `/dashboard` shows the sidebar and topbar. Active nav item is highlighted. Logout works.

---

## Phase 5 — Authentication pages

**Goal:** Login and activation flows work end-to-end.

### `src/components/auth/LoginForm.tsx`
- Fields: Email, Password
- react-hook-form + `LoginSchema` via zodResolver
- On submit: calls `auth.api.login()`, on success redirects to `/dashboard`
- On error: shows inline error message from API
- Password field has show/hide toggle

### `src/components/auth/ActivateForm.tsx`
- Field: Coupon Code
- react-hook-form + `ActivateSchema`
- On submit: calls `auth.api.activate()`, on success redirects to `/dashboard`
- Shows current email (read-only) for context

### Pages
- `src/app/(auth)/login/page.tsx` — renders `LoginForm`
- `src/app/(auth)/activate/page.tsx` — renders `ActivateForm`

**Completion check:** Login with valid credentials sets the cookie and redirects. Invalid credentials shows error. Unauthenticated visit to `/dashboard` redirects to `/login`. `INACTIVE` account after login redirects to `/activate`.

---

## Phase 6 — Customer management

**Goal:** Full CRUD for customers.

### `src/components/customers/CustomerSearchBar.tsx`
- Wraps `SearchInput`, wired to parent state

### `src/components/customers/CustomerTable.tsx`
- Columns: Name, Mobile, GSTIN, Address, Default Rate, Actions (Edit, Delete)
- Delete triggers `ConfirmDialog` before calling `useDeleteCustomer`
- Uses `DataTable` base component

### `src/components/customers/CustomerForm.tsx`
- Fields: Name, Mobile Number, GSTIN, Address, Default Rate
- Used for both create and edit (mode prop)
- react-hook-form + `CreateCustomerSchema`
- Renders inside a shadcn Sheet (slide-over panel)

### Pages
- `src/app/(dashboard)/customers/page.tsx` — list + search + create button → opens `CustomerForm` in Sheet
- `src/app/(dashboard)/customers/[id]/page.tsx` — loads customer, renders `CustomerForm` pre-filled

**Completion check:** Create, edit, delete all work. Search filters the list. Delete shows confirmation dialog.

---

## Phase 7 — GR management (core feature)

**Goal:** Full GR lifecycle — create, view, edit, duplicate, search, status change.

### `src/components/gr/GRStatusBadge.tsx`
- Maps `GRStatus` to colour class from `GR_STATUS_COLORS` in constants
- Returns a shadcn Badge

### `src/components/gr/GRSearchBar.tsx`
- Three search modes: GR Number, Customer Name, Vehicle Number
- Debounced, wired to parent state

### `src/components/gr/GRForm.tsx`
- All GR fields
- Pricing Type dropdown changes which field shows (Weight or Box Count)
- Freight Amount auto-calculates using `calculateFreight` from utils — displayed read-only
- Consignor/Consignee: type-ahead from customer list (but allow free text)
- Vehicle Number, Driver Name, Driver Mobile: free text always (no dropdown lock)
- react-hook-form + `CreateGRSchema` or `UpdateGRSchema` based on mode prop
- On submit: calls `useCreateGR` or `useUpdateGR`

### `src/components/gr/GRDuplicateButton.tsx`
- Button that calls `useDuplicateGR`
- Shows loading state
- On success: navigates to the new GR's edit page

### `src/components/gr/GRTable.tsx`
- Columns: GR Number, Booking Date, Customer, Route (From → To), Status, Actions
- Checkbox column for bulk selection
- Row click navigates to `/gr/[grNumber]`
- Status cell renders `GRStatusBadge`
- Uses `DataTable` base

### `src/components/gr/GRBulkBar.tsx`
- Appears at bottom of screen when 1+ rows are selected
- Shows count of selected GRs
- Buttons: Edit Selected, Print Selected, Clear Selection

### `src/components/gr/GRBulkEditDialog.tsx`
- shadcn Dialog
- Fields: Vehicle Number, Driver Name, Status (all optional)
- Only filled fields are sent to the API
- On submit: calls `useBulkUpdateGRs`

### Pages
- `src/app/(dashboard)/gr/page.tsx` — list, search, bulk bar, create button
- `src/app/(dashboard)/gr/new/page.tsx` — `GRForm` in create mode
- `src/app/(dashboard)/gr/[grNumber]/page.tsx` — loads GR, `GRForm` in edit mode + `GRDuplicateButton`

**Completion check:** Create GR → number auto-generates. Freight calculates on rate/weight change. Edit works. Duplicate creates new GR. Bulk edit updates all selected. Status badge colours are correct.

---

## Phase 8 — Dashboard page

**Goal:** Dashboard shows recent GRs.

### `src/app/(dashboard)/dashboard/page.tsx`
- Calls `useGRList()` with no search filter, limited to most recent 20
- Renders a read-only version of `GRTable` (no checkboxes, no bulk bar)
- Columns: GR Number, Booking Date, Customer, Route, Status
- No charts, no analytics, no stats — table only

**Completion check:** Dashboard shows the 20 most recent GRs. Status badges are correct. Clicking a row navigates to the GR detail page.

---

## Phase 9 — Printing system

**Goal:** Single and bulk print work from the browser.

### `src/components/printing/PrintLayout.tsx`
- Shared header for all print documents
- Renders: company logo, company name, company address
- Fetches company data via `useCompany()`
- Print-specific CSS: hide sidebar, topbar, and any non-print elements

### `src/components/printing/GRCopyTemplate.tsx`
- Full GR Copy document layout for A4
- Props: `gr: GR`, `company: Company`

### `src/components/printing/LoadingSlipTemplate.tsx`
- Loading Slip layout for A4
- Props: `gr: GR`, `company: Company`

### `src/components/printing/ManifestTemplate.tsx`
- Manifest layout for A4
- Props: `grs: GR[]`, `company: Company` (manifest covers multiple GRs)

### `src/lib/utils/print.ts`
- `printGR(grNumber)` → navigates to print page or triggers `window.print()`
- `bulkPrint(grNumbers: string[])` → opens bulk print page with all GRs

### `src/app/(dashboard)/gr/[grNumber]/print/page.tsx`
- No sidebar, no topbar — print layout only
- Document type selector: GR Copy / Loading Slip / Manifest
- Print button triggers `window.print()`

### `src/app/(dashboard)/printing/page.tsx`
- Bulk print queue
- Receives selected GR numbers (via query params or local state)
- Renders all selected GR documents stacked for a single print call

### `src/components/gr/GRBulkBar.tsx` — update
- Wire Print Selected button to `bulkPrint()` utility

**Completion check:** Single GR print opens a clean A4 print dialog. Bulk print shows all selected GRs in one print view. Sidebar and topbar are hidden on print pages.

---

## Phase 10 — Settings page

**Goal:** Profile editing, data export, account deletion request.

### `src/components/settings/ProfileForm.tsx`
- Editable: Company Name, Phone Number, Address, Logo upload
- Read-only (displayed but not editable): GSTIN, Email
- react-hook-form, calls `useUpdateCompany` on submit
- Logo: file input, previews selected image, validates size against `MAX_LOGO_SIZE_MB`

### `src/components/settings/DownloadDataButton.tsx`
- Button that calls `export.api.downloadExcel()`
- Triggers browser file download
- Shows loading state during download

### `src/components/settings/DeleteAccountSection.tsx`
- Warning text explaining the consequences
- `ConfirmDialog` before submitting
- Calls `settings.api.requestAccountDeletion()` on confirm
- Shows success message after submission

### `src/app/(dashboard)/settings/page.tsx`
- Three sections: Profile, Download Data, Delete Account
- Each section separated visually

**Completion check:** Profile updates persist. Excel download triggers file save. Deletion request shows confirmation then success message.

---

## Phase 11 — Polish, error handling & edge cases

**Goal:** Production-quality error handling and UX polish throughout.

**Tasks:**

- [ ] Add `src/app/error.tsx` — global error boundary with retry button
- [ ] Add `src/app/not-found.tsx` — 404 page with link to dashboard
- [ ] Add `ErrorState` component to every page that fetches data (handles API errors gracefully)
- [ ] Add `EmptyState` to GR list (when no GRs exist), Customer list, Dashboard
- [ ] Add `LoadingSpinner` to all pages during initial data fetch
- [ ] Add toast notifications for all mutation success and error states using shadcn Sonner
- [ ] Handle network offline state gracefully
- [ ] Ensure all forms disable the submit button while mutation is in progress
- [ ] Ensure `GRForm` freight amount re-calculates on every relevant field change (not just on blur)
- [ ] Verify all print templates render correctly on A4 in Chrome print dialog
- [ ] Verify sidebar active state is correct on all routes including nested routes
- [ ] Add `title` metadata to every page for browser tab
- [ ] Test the full login → activate → dashboard → create GR → print flow end-to-end

**Completion check:** No unhandled promise rejections. All error states show user-friendly messages. All loading states are covered. Build passes with zero warnings.

---

## Phase 12 — Security audit & final checks

**Goal:** Verify every security requirement from the FRD is implemented.

**Checklist:**

- [ ] `middleware.ts` correctly rejects requests with no cookie
- [ ] `middleware.ts` correctly rejects requests with an expired JWT
- [ ] `middleware.ts` correctly rejects requests with a tampered JWT
- [ ] `INACTIVE` accounts cannot access any dashboard route
- [ ] `src/lib/auth/cookies.ts` fails to import in a client component (build error)
- [ ] All security headers are present in production build (verify with curl)
- [ ] `NEXT_PUBLIC_API_URL` is the only env variable accessible in the browser
- [ ] `JWT_SECRET` is never referenced in any client-side file
- [ ] No API module reads `companyId` from request body — only from verified JWT headers
- [ ] Excel download works and file is not corrupt
- [ ] Logout clears the cookie and redirects to login
- [ ] `npm run build` produces zero TypeScript errors and zero ESLint errors

**Completion check:** All checklist items pass. Project is ready for deployment.