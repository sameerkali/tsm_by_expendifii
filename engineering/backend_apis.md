# TMS by Expendifii — Backend API Reference

> This file documents every backend REST API endpoint. Feed this alongside `context.md` when asking an AI to implement API calls in `src/lib/api/`.
>
> **Base URL:** `https://wgqck8kv-3000.inc1.devtunnels.ms/api` (development)
> **Auth method:** httpOnly cookie set by the backend on login. All authenticated routes read this cookie automatically — do NOT manually attach Authorization headers.
> **Cookie name:** `tms_session` (set by backend, read by Next.js middleware)

---

## Response envelope

All responses follow this shape:

```ts
// Success
{
  success: true,
  data: <payload>,
  message?: string       // present on some endpoints
}

// Error
{
  success: false,
  message: string,
  errors?: any           // validation errors if applicable
}
```

---

## Auth endpoints

### POST `/api/auth/register`

Creates a new company account. Account starts as `INACTIVE` — must be activated with a coupon before login is useful.

**Authentication:** None (public)

**Request body:**
```json
{
  "name": "sameer",
  "email": "s.faridi007@gmail.com",
  "password": "qqqqqq",
  "phone": "9639356395",
  "companyName": "expendifii"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | User's full name |
| `email` | string | yes | Becomes the login email. Cannot be changed later |
| `password` | string | yes | Min 6 characters |
| `phone` | string | yes | |
| `companyName` | string | yes | |

**Success response — 200:**
```json
{
  "success": true,
  "data": {
    "id": "8a56e217-57bb-4eab-b63b-8f3e08c0e0e5",
    "email": "s.faridi007@gmail.com",
    "name": "sameer",
    "role": "CUSTOMER",
    "createdAt": "2026-04-11T15:58:51.895Z"
  },
  "message": "Account created. Please activate your account with a coupon code."
}
```

**Frontend usage — `src/lib/api/auth.api.ts`:**
```ts
// Call after successful register → redirect to /activate page
// Do NOT auto-login after register — account must be activated first
```

**User flow after register:**
```
Register → show success message → redirect to /activate
```

---

### POST `/api/auth/activate`

Activates a newly registered account using a coupon code provided by the Expendifii admin. Can be called before or after login.

**Authentication:** None required (coupon is tied to email, not session)

**Request body:**
```json
{
  "couponCode": "TMS-XT158A-MNONCU1Z"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `couponCode` | string | yes | Admin-generated code, linked to the registered email |

**Success response — 200:**
```json
{
  "success": true,
  "data": {
    "accountStatus": "ACTIVE",
    "startDate": "2026-04-07T13:22:48.786Z",
    "endDate": "2026-04-14T13:22:48.786Z",
    "durationDays": 7
  },
  "message": "Account activated successfully"
}
```

| Field | Type | Notes |
|---|---|---|
| `accountStatus` | `"ACTIVE"` \| `"INACTIVE"` | Will be `ACTIVE` on success |
| `startDate` | ISO string | Activation date |
| `endDate` | ISO string | Access expiry date |
| `durationDays` | number | How many days access was granted |

**Frontend usage:**
```ts
// On success → redirect to /login (or /dashboard if already logged in)
// On error → show "Invalid or expired coupon code" message
```

**User flow after activate:**
```
Activate → success message → redirect to /login
```

---

### POST `/api/auth/login`

Authenticates the user. On success, the backend sets a **httpOnly cookie** (`tms_session`) containing the JWT. The frontend never sees or stores the token — all subsequent authenticated requests automatically include this cookie.

**Authentication:** None (public)

**Request body:**
```json
{
  "email": "tony@stark.com",
  "password": "111111"
}
```

| Field | Type | Required |
|---|---|---|
| `email` | string | yes |
| `password` | string | yes |

**Success response — 200:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "775bc361-0cff-43d8-b827-2f673635c43d",
      "email": "tony@stark.com",
      "name": "Tony",
      "companyName": "Stark Industry",
      "role": "CUSTOMER"
    },
    "accountStatus": "INACTIVE"
  }
}
```

| Field | Type | Notes |
|---|---|---|
| `user.id` | string UUID | |
| `user.email` | string | |
| `user.name` | string | |
| `user.companyName` | string | |
| `user.role` | `"CUSTOMER"` | Only role in V1 |
| `accountStatus` | `"ACTIVE"` \| `"INACTIVE"` | **Critical for routing** |

**Frontend routing logic after login:**
```ts
if (data.accountStatus === "INACTIVE") {
  redirect("/activate")   // account not yet activated or coupon expired
} else {
  redirect("/dashboard")  // normal entry
}
```

**Important:** The httpOnly cookie is set by the backend in the response headers. Axios must be configured with `withCredentials: true` to send and receive cookies cross-origin.

---

### POST `/api/auth/logout`

Clears the session. The backend invalidates the httpOnly cookie.

**Authentication:** Required (httpOnly cookie)

**Request body:** None

**Success response — 200:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Frontend usage:**
```ts
// After logout → clear any client-side state → redirect to /login
// React Query cache should also be cleared on logout
```

---

### GET `/api/auth/profile`

Returns the full profile of the currently logged-in user.

**Authentication:** Required (httpOnly cookie)

**Request body:** None

**Success response — 200:**
```json
{
  "success": true,
  "data": {
    "id": "775bc361-0cff-43d8-b827-2f673635c43d",
    "email": "tony@stark.com",
    "name": "Tony",
    "phone": "6666668888",
    "companyName": "Stark Industry",
    "role": "CUSTOMER",
    "isActive": true,
    "createdAt": "2026-04-07T12:12:01.808Z"
  }
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string UUID | |
| `email` | string | Read-only — cannot be changed |
| `name` | string | |
| `phone` | string | |
| `companyName` | string | |
| `role` | `"CUSTOMER"` | |
| `isActive` | boolean | `true` if account is currently active |
| `createdAt` | ISO string | Account creation date |

**Frontend usage:**
```ts
// Used by useCompany() hook and ProfileForm
// Cache with COMPANY_KEYS.profile() in React Query
// staleTime: 5 minutes (profile doesn't change often)
```

---

### PUT `/api/auth/profile`

Updates the editable fields of the company profile. Email and GSTIN cannot be changed.

**Authentication:** Required (httpOnly cookie)

**Request body:**
```json
{
  "name": "Tony Stark",
  "phone": "8989898989",
  "companyName": "Stark Industries"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | no | Send only fields being updated |
| `phone` | string | no | |
| `companyName` | string | no | |

> All fields are optional — send only what is being changed.

**Success response — 200:**
```json
{
  "success": true,
  "data": {
    "id": "775bc361-0cff-43d8-b827-2f673635c43d",
    "email": "tony@stark.com",
    "name": "Tony Stark",
    "phone": "8989898989",
    "companyName": "Stark Industries"
  }
}
```

**Frontend usage:**
```ts
// After success → invalidate COMPANY_KEYS.profile() in React Query
// Show success toast
```

---

## Axios client configuration

The following must be set in `src/lib/api/client.ts` for cookies to work correctly:

```ts
// withCredentials: true is REQUIRED for httpOnly cookies to be sent cross-origin
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

---

## Error handling reference

| HTTP status | Meaning | Frontend action |
|---|---|---|
| 400 | Validation error | Show field-level errors from `errors` object |
| 401 | Not authenticated | Redirect to `/login`, clear cookie |
| 403 | Forbidden | Show "Access denied" message |
| 404 | Not found | Show `ErrorState` component |
| 409 | Conflict (e.g. email already registered) | Show inline error on form |
| 422 | Unprocessable (e.g. invalid coupon) | Show inline error |
| 500 | Server error | Show generic error toast |

---

## Full auth flow diagram

```
Register (/api/auth/register)
    ↓
Redirect to /activate page
    ↓
Enter coupon (/api/auth/activate)
    ↓
Redirect to /login page
    ↓
Login (/api/auth/login)  ← backend sets httpOnly cookie here
    ↓
Check accountStatus in response
    ├── INACTIVE → redirect to /activate
    └── ACTIVE   → redirect to /dashboard
                        ↓
              All subsequent requests
              send cookie automatically
              (withCredentials: true)
                        ↓
              Logout (/api/auth/logout)
              ← backend clears cookie
              → redirect to /login
```

---

## Endpoints to be added

The following sections will be filled in as backend endpoints are confirmed:

- **GR endpoints** — list, get, create, update, duplicate, bulk update
- **Customer endpoints** — list, get, create, update, delete
- **Export endpoints** — Excel download
- **Admin endpoints** — coupon management, deletion request approval (admin panel only)