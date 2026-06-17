# API Endpoints Reference

> Base URL: `https://tsm-backend-mu.vercel.app/api`  
> Proxy Path: `/api/proxy/{path}` (Next.js Route Handler forwards to backend)

---

## Authentication (`/auth/*`)

| Endpoint | Method | Description |
|---|---|---|
| `/auth/register` | POST | Register new company account |
| `/auth/activate` | POST | Activate account with coupon code |
| `/auth/login` | POST | Login (sets httpOnly cookie) |
| `/auth/profile` | GET | Get current user profile |
| `/auth/profile` | PATCH | Update user profile fields |
| `/auth/forgot-password` | POST | Request password reset OTP |
| `/auth/reset-password` | POST | Reset password using OTP |

---

## Dashboard (`/auth/dashboard`)

| Endpoint | Method | Description |
|---|---|---|
| `/auth/dashboard` | GET | Fetch dashboard analytics (GR counts, revenue, top customers, recent GRs) |

---

## Goods Receipt / GR (`/gr/*`)

| Endpoint | Method | Description |
|---|---|---|
| `/gr` | GET | List GRs (paginated, with search/status filters) |
| `/gr` | POST | Create a new GR |
| `/gr/{id}` | GET | Get single GR by ID |
| `/gr/{id}` | PATCH | Update an existing GR |
| `/gr/{id}` | DELETE | Delete a GR |
| `/gr/{id}/status` | PATCH | Update GR status only |
| `/gr/{id}/duplicate` | POST | Duplicate a GR (same details, new number) |
| `/gr/{id}/pdf` | GET | Download single GR PDF (blob) |
| `/gr/backup/excel` | GET | Export full system backup as Excel (blob) |
| `/gr/customer/{customerId}/download` | GET | Download GRs for a customer by date range as PDF |

---

## Customers (`/customers/*`)

| Endpoint | Method | Description |
|---|---|---|
| `/customers` | GET | List customers (paginated, with search) |
| `/customers` | POST | Create a new customer |
| `/customers/{id}` | GET | Get single customer by ID |
| `/customers/{id}` | PUT | Update an existing customer |
| `/customers/{id}` | DELETE | Soft-delete a customer |

---

## Carousel (`/carousel`)

| Endpoint | Method | Description |
|---|---|---|
| `/carousel` | GET | Fetch carousel slides for dashboard banner |

---

## Cloudinary (`/cloudinary/*`)

| Endpoint | Method | Description |
|---|---|---|
| `/cloudinary/signature` | GET | Get Cloudinary upload signature (api_key, cloud_name, folder, timestamp, signature) |
| `https://api.cloudinary.com/v1_1/{cloud_name}/image/upload` | POST | Upload image to Cloudinary (direct, not via proxy) |

---

## Settings (`/settings/*`)

| Endpoint | Method | Description |
|---|---|---|
| `/settings/request-deletion` | POST | Request account deletion |
| `/settings/deletion-status` | GET | Get account deletion request status |
| `/settings/import` | POST | Import data from CSV/XLSX (multipart/form-data) |

---

## Contact (`/contact`)

| Endpoint | Method | Description |
|---|---|---|
| `/contact` | POST | Submit contact/enquiry form (landing page) |

---

## Internal / Health

| Endpoint | Method | Description |
|---|---|---|
| `/logo.png` | HEAD | Ping server reachability (network status check) |

---