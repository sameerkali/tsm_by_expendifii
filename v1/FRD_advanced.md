# TMS by Expendifii   Functional Requirements Document
**Version:** 1.1 | **Last Updated:** March 2026 | **Status:** Pre-Development prepared by sameer faridi

---

## Developer Notes

- Platform integrates Google Analytics for usage tracking
- Admin can enable or disable any feature for any specific company or user via feature flags
- Account deletion is not instant   user submits a deletion request, Expendifii admin reviews and approves
- Data onboarding (migrating existing customer/vehicle/driver data for new companies) is handled manually by the Expendifii team on the backend   no in-app import flow
- All APIs documented via Swagger

---

## Quick Reference

- Signup → login → plan selection → dashboard
- Dashboard locked until subscription is active
- Plans: Starter (₹5K/mo, 10 vehicles, 1 concurrent login) and Business (₹7K/mo, 20 vehicles, 3 concurrent logins)
- Annual billing with 10% discount
- Coupon / day-pass system   admin creates codes with duration in days
- Payment via Razorpay
- On subscription expiry: email sent to user, all features disabled, login still works, must renew to continue
- Business plan gets 30% higher API rate limits than Starter
- E-way bill generation has a daily limit per company for all users regardless of plan (limit TBD before development)
- Concurrent logins enforced per plan   Starter: 1, Business: 3
- Dashboard shows today's bookings, active trips, pending deliveries
- GR creation: auto GR number, rate field pre-fills from rate card if one exists and is always overridable, auto freight calculation (weight × rate)
- Consignor and consignee on GR can be different parties
- Vehicle and driver selected from saved records or entered manually on the GR if not in system
- GR statuses: Booked → In Transit → Delivered
- Payment status on GR: Paid / Pending (flag only, no amount tracking)
- E-way bill generation via Masters India GSP API   one click from GR
- E-way bill Part B update (vehicle change mid-route)
- E-way bill cancellation within 24 hours of generation
- E-way bill register view
- Document printing: GR copy, Loading Slip, Manifest   A4 with company logo and letterhead
- Bulk print with date and customer filters
- Customer fields: name, mobile, GSTIN, address
- Rate card: optional default rate per customer or per lane, always overridable per GR
- Vehicle fields: vehicle number, type, capacity, owner name
- Driver fields: name, mobile, license number
- Reports: GR report, dispatch report, daily booking summary   filters by date, customer, route
- Excel export for all reports (no other format)
- Monthly auto email backup of all data as Excel attachments
- Settings: download all data (Excel only), trigger manual backup, request account deletion, logout
- Admin panel: company management, subscriptions, coupon management, feature flags, deletion request approvals

---

## 1. Authentication

- Email and password login
- Password hashed securely
- JWT stored in httpOnly cookies
- Protected routes enforced on both frontend and backend
- Every protected API call validates the JWT
- Login response includes subscription status so frontend knows whether to lock or unlock the dashboard
- Concurrent login limit enforced per plan: Starter allows 1 active session, Business allows 3
- When a new login exceeds the session limit, the oldest active session is invalidated automatically

---

## 2. Onboarding Flow

1. User signs up   company record and admin user are created
2. Subscription record created with status `PENDING`
3. After login, user is redirected to plan selection   dashboard is locked
4. User either selects a plan (Razorpay) or enters a coupon code
5. On successful payment or valid coupon, subscription becomes `ACTIVE`
6. Dashboard unlocks

If a user logs in with a `PENDING` or `EXPIRED` subscription, they see a locked screen with a prompt to select or renew a plan. All features are disabled   only login and the renewal flow are accessible.

---

## 3. Subscription & Plans

| Plan | Monthly | Annual | Vehicle Limit | Concurrent Logins |
|---|---|---|---|---|
| Starter | ₹5,000 | ₹54,000 | 10 | 1 |
| Business | ₹7,000 | ₹75,600 | 20 | 3 |

Annual pricing is 10% off the monthly equivalent.

### Subscription States

- `PENDING`   signed up, no plan selected yet
- `ACTIVE`   valid subscription in place
- `EXPIRED`   subscription end date has passed

### On Expiry

- Automated email sent to the company's registered email notifying them of expiry
- All product features disabled immediately   no grace period
- User can still log in but sees only a renewal prompt
- Subscription renewed by going through plan selection and Razorpay again

### Rate Limiting

- Login: 5 attempts per 15 minutes per IP
- Coupon redemption: 5 attempts per hour per IP
- E-way bill generation: daily limit per company regardless of plan   exact number to be confirmed before development starts
- All other endpoints: Business plan gets 30% higher limits than Starter

### Coupon / Day-Pass System

Admin creates coupon codes with:
- Code   unique alphanumeric string
- Label   internal description (e.g. "60-Day Partner Demo")
- Duration in days   e.g. 14, 30, 60
- Plan tier granted   Starter or Business
- Max uses   0 means unlimited
- Expiry date   optional, code cannot be used after this date
- Active toggle   admin can disable without deleting

On user redemption, all of the following must pass:
- Code exists and is active
- Not past expiry date
- Usage limit not reached
- This company has not already used this code
- Company has no currently active subscription

On successful redemption:
- Active subscription created: `start_date = today`, `end_date = today + duration_days`
- Coupon `used_count` incremented by 1
- Redemption logged: company, user, date, subscription end date

---

## 4. Dashboard

Visible only when subscription is `ACTIVE`.

- Today's GR bookings count
- Active trips count (GRs with status In Transit)
- Pending deliveries count (GRs with status Booked)
- Quick action buttons: Create GR, Print Documents, View Reports

All data is scoped strictly to the logged-in company.

---

## 5. GR (Goods Receipt) Management

### GR Fields

| Field | Notes |
|---|---|
| GR Number | Auto-generated, sequential per company, read-only |
| Booking Date | Defaults to today, editable |
| From City | Text |
| To City | Text |
| Consignor | Party sending goods   selected from saved customers |
| Consignee | Party receiving goods   selected from saved customers, can differ from consignor |
| Product Description | Free text |
| HSN Code | Free text, required for e-way bill generation |
| Weight | Numeric, kg |
| Rate | Pre-fills from rate card if a match exists, always manually overridable |
| Freight Amount | Auto-calculated: Weight × Rate, read-only |
| Declared Value | Numeric, required for e-way bill |
| Vehicle | Selected from saved vehicles, or entered manually |
| Driver | Selected from saved drivers, or entered manually |
| Status | Booked / In Transit / Delivered |
| Payment Status | Paid / Pending |
| E-Way Bill Number | Read-only, populated after e-way bill is generated |

### Vehicle and Driver   Manual Entry

If a vehicle or driver is not saved in the system, the user can enter details manually on the GR form instead of selecting from the dropdown. Manually entered details are stored on that GR only   they are not added to the master vehicle or driver list. The user must add them separately if they want them saved for future use.

Manual vehicle fields: vehicle number, vehicle type
Manual driver fields: driver name, mobile number, license number

### GR Behaviour

- GR number is assigned by the system on creation and cannot be edited
- Selecting a consignor or consignee auto-fills their GSTIN and address from the customer record
- If a rate card entry exists for the selected customer or the from/to lane, the rate field pre-fills with that value   user can change it freely
- Freight amount recalculates automatically when weight or rate changes
- Status can be updated after creation as the shipment progresses
- E-way bill number populates on the GR after successful generation

---

## 6. Rate Card

The rate card stores a default rate per customer or per lane (from city + to city). It exists solely to pre-fill the rate field on the GR form so the clerk has a starting point   it never locks the rate. Every GR rate is editable.

- Rate card entries are linked to a company
- Entry types: by customer, or by lane (from city + to city)
- If both a customer rate and a lane rate match a GR, lane rate takes priority
- User can add, edit, and delete rate card entries from the customer management area or a dedicated rate card section
- Rate card is optional   GRs work fine without one

---

## 7. E-Way Bill

### Generation Flow

1. User opens a completed GR and clicks Generate E-Way Bill
2. Confirmation screen shows all pre-filled data for review
3. User confirms   backend calls Masters India GSP API
4. Response received in 5–60 seconds
5. E-way bill number saved on the GR record
6. Full API response stored for audit

### Data Sent to GSP API

- Supplier GSTIN (from company settings)
- Recipient GSTIN (consignee GSTIN from customer record)
- Document number (GR number) and document date
- Transaction type
- Product description and HSN code
- Quantity and unit
- Declared value
- Tax rates (IGST / CGST / SGST)
- Vehicle number and vehicle type
- Transport distance

### GSTIN Validation

Validate GSTIN format before the API call. If invalid, show an inline error and block submission   do not call the API.

### Error Handling

- API error response: display the returned error message clearly to the user
- NIC server unavailable: show a clear human-readable message and allow retry
- Retry must not create a duplicate e-way bill record
- All failed attempts logged with error details for support

### Part B Update

After an e-way bill is generated, if the vehicle changes mid-route:
- User can enter the new vehicle number and submit a Part B update
- Backend calls the GSP API Part B update endpoint
- Updated vehicle number saved on both the GR and the e-way bill record

### Cancellation

- User can cancel an e-way bill within 24 hours of generation
- Backend calls GSP API cancellation endpoint
- E-way bill status updated to `CANCELLED` on the record

### E-Way Bill Register

- Lists all e-way bills generated by the company
- Columns: GR number, date, from city, to city, consignee name, vehicle number, e-way bill number, status, expiry date
- Filterable by date range

---

## 8. Document Printing

### Supported Documents

- GR Copy
- Loading Slip
- Manifest / Challan

### Requirements

- All documents rendered in A4 format
- Company logo and letterhead on every document
- Each document includes: company details, consignor and consignee details, vehicle details, driver details, product description, HSN code, weight, freight amount, e-way bill number if generated
- Print triggered via browser print dialog   no server-side PDF generation in V1

### Bulk Print

- User applies a date range filter and/or a customer filter
- Matching GRs listed with checkboxes
- User selects records and clicks Print All
- All selected documents open in a single print-ready view

---

## 9. Customer Management

### Fields

- Name
- Mobile number
- GSTIN
- Address

### Behaviour

- Customers are scoped to the company   each company sees only their own records
- Selecting a customer in the GR form auto-fills their GSTIN and address
- A customer can appear as consignor on some GRs and consignee on others
- Rate card entries can be linked to a customer

---

## 10. Vehicle Management

### Fields

- Vehicle number (e.g. MH12AB1234)
- Vehicle type (e.g. Truck, Mini Truck, Trailer)
- Capacity in tonnes
- Owner name

Vehicles are selectable from a dropdown in the GR form. If not in the list, the user can enter details manually on the GR (see Section 5).

---

## 11. Driver Management

### Fields

- Name
- Mobile number
- License number

Drivers are selectable from a dropdown in the GR form. If not in the list, the user can enter details manually on the GR (see Section 5).

---

## 12. Payment Status on GR

Each GR has a payment status:

- `PENDING`   default on creation
- `PAID`   marked manually by the user

User toggles this from the GR detail view. No amount entry, no partial payment tracking   boolean flag only.

---

## 13. Reports

### Available Reports

| Report | What It Shows |
|---|---|
| GR Report | All GRs with status, freight amount, consignor, consignee, vehicle, e-way bill number, payment status |
| Dispatch Report | GRs that are In Transit or Delivered, with relevant dates |
| Daily Booking Summary | Total GR count and total freight value grouped by day |

### Filters (all reports)

- Date range
- Customer   matches on consignor or consignee
- Route   from city + to city
- Status

### Export

All reports export to Excel (.xlsx) only. No other format.

---

## 14. Monthly Auto Backup

On the 1st of every month, a scheduled backend job sends an email to the company's registered email with four Excel attachments: all GRs, all customers, all vehicles, all drivers.

User can also trigger a manual backup at any time from Settings.

---

## 15. Settings

Settings is intentionally minimal.

- **Download All Data**   exports all company data (GRs, customers, vehicles, drivers) as Excel. No other format.
- **Manual Backup**   triggers the backup email immediately
- **Request Account Deletion**   user submits a deletion request with a confirmation step. Request sent to Expendifii admin. User sees a "deletion pending" status. No features change until admin approves. On admin approval, all company data is permanently deleted and account is deactivated.
- **Logout**   ends current session

---

## 16. Admin Panel (Expendifii Internal Only)

Not accessible to transport company users. Super admin access only.

### Company Management

- List all companies with subscription status, plan, and expiry date
- View company details
- Manually activate or deactivate a subscription

### Coupon Management

- Create coupon   code, label, duration in days, plan tier, max uses, expiry date, active toggle
- List all coupons with used count and max uses
- Edit coupon   label, expiry date, max uses only (code and duration are fixed after creation)
- Disable or re-enable a coupon
- View redemption log per coupon: company name, redeemed by, date, subscription end date
- Delete coupon   only allowed if used count is 0

### Feature Flags

- Enable or disable any platform feature for a specific company or user
- Feature flag state is enforced on the backend, not just hidden on the frontend

### Account Deletion Requests

- View all pending deletion requests with company name and request date
- Approve or reject each request
- On approval: all company data permanently deleted, account deactivated

---

## 17. Security

- HTTPS only
- Passwords hashed
- JWT stored in httpOnly cookies   never in localStorage
- Secure HTTP headers
- Rate limiting as defined in Section 3
- All API endpoints require valid JWT except signup and login
- Admin endpoints require super-admin role in JWT
- All API keys and secrets stored in environment variables only   never in the codebase
- Company data strictly scoped   no cross-company data access possible

---

## 18. API Overview

All endpoints are REST. Full documentation via Swagger.

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Plans & Subscriptions
- `GET /api/plans`
- `POST /api/subscriptions/create`   initiates Razorpay order
- `POST /api/subscriptions/verify`   verifies Razorpay payment, activates subscription
- `POST /api/coupons/redeem`

### GR Bookings
- `GET /api/bookings`   list with filters
- `POST /api/bookings`   create new GR
- `GET /api/bookings/:id`   single GR detail
- `PUT /api/bookings/:id`   update GR
- `PATCH /api/bookings/:id/status`   update delivery status only
- `PATCH /api/bookings/:id/payment`   toggle payment status

### E-Way Bill
- `POST /api/eway/generate/:bookingId`
- `PATCH /api/eway/update-vehicle/:ewayId`   Part B update
- `POST /api/eway/cancel/:ewayId`
- `GET /api/eway/register`   list with filters

### Customers
- `GET /api/customers`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

### Rate Cards
- `GET /api/ratecards`
- `POST /api/ratecards`
- `PUT /api/ratecards/:id`
- `DELETE /api/ratecards/:id`
- `GET /api/ratecards/lookup`   returns matching rate for a customer or lane, called on GR form load

### Vehicles
- `GET /api/vehicles`
- `POST /api/vehicles`
- `PUT /api/vehicles/:id`
- `DELETE /api/vehicles/:id`

### Drivers
- `GET /api/drivers`
- `POST /api/drivers`
- `PUT /api/drivers/:id`
- `DELETE /api/drivers/:id`

### Reports
- `GET /api/reports/gr`
- `GET /api/reports/dispatch`
- `GET /api/reports/daily-summary`
- `GET /api/reports/gr/export`   returns Excel file
- `GET /api/reports/dispatch/export`
- `GET /api/reports/daily-summary/export`

### Settings & Data
- `GET /api/settings`
- `PUT /api/settings`
- `GET /api/data/export`   full Excel download
- `POST /api/data/backup-email`   trigger manual backup

### Account
- `POST /api/account/delete-request`   submit deletion request

### Admin
- `GET /api/admin/companies`
- `PATCH /api/admin/companies/:id/subscription`   manually activate or deactivate
- `GET /api/admin/coupons`
- `POST /api/admin/coupons`
- `PUT /api/admin/coupons/:id`
- `PATCH /api/admin/coupons/:id/toggle`
- `DELETE /api/admin/coupons/:id`
- `GET /api/admin/coupons/:id/redemptions`
- `GET /api/admin/feature-flags`
- `PATCH /api/admin/feature-flags`   set flag for a company or user
- `GET /api/admin/deletion-requests`
- `PATCH /api/admin/deletion-requests/:id`   approve or reject

---

## 19. Future Implementation

- SMS to driver when GR status changes to In Transit   message includes driver name, vehicle number, from/to city, GR number, e-way bill number
- WhatsApp document sharing   share button on GR and e-way bill views, uses native share intent on mobile and WhatsApp Web link on desktop, no WhatsApp Business API needed
- Multi-branch support   multiple branches under one company, each with their own vehicles, drivers, and bookings, reports filterable by branch, users assignable to specific branches