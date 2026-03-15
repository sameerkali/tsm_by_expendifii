# System Design Document
**TMS by Expendifii – Transport Management System**
*Last Updated: March 2026*

---

## 1. System Overview

TMS by Expendifii is a SaaS platform designed for small transport companies to manage daily operations including:

- GR (Goods Receipt) booking
- Transport document printing
- E-way bill generation
- Customer, vehicle, and driver management
- Operational reporting

The system is designed to be simple, fast, and reliable for office staff who may not have strong technical experience. It follows a **modern web architecture** with a React-based frontend and a Node.js backend connected to a PostgreSQL database.

---

## 2. High-Level Architecture

The system follows a standard **three-layer architecture**:

```
Frontend (Next.js)
  ↓
Backend API (Node.js + Express)
  ↓
Database (PostgreSQL via Supabase)
```

**External services:**

| Service | Purpose |
|---|---|
| Cloudinary | Image storage |
| Razorpay | Payments |
| Resend | Email delivery |
| GSP Provider | E-way bill generation |
| Swagger | API documentation |
| Railway | Backend hosting |
| Vercel | Frontend hosting |

---

## 3. Frontend System Design

### 3.1 Frontend Architecture

The frontend is built using **Next.js with App Router** following a component-based architecture.

**Frontend responsibilities:**
- UI rendering
- API communication
- Form handling
- Table data display
- Dashboard visualization
- Document printing

> The frontend does **not contain business logic**. All business logic is handled by the backend.

---

### 3.2 Frontend Component Structure

```
src/
├── app/           # Application routing and layout
├── components/    # Reusable UI components
├── features/      # Feature-specific components (bookings, customers, reports)
├── hooks/         # Reusable React hooks
├── services/      # API communication layer
├── store/         # Global state management
├── utils/         # Helper utilities
└── types/         # TypeScript interfaces
```

---

### 3.3 State Management

State management uses two approaches:

| Scope | Approach |
|---|---|
| Local UI state | React `useState` / `useReducer` |
| Global state | Zustand |

**Examples of global state:**
- Authentication state
- User profile
- UI preferences

---

### 3.4 Server State Management

Server state is managed using **TanStack Query (React Query)**.

**Benefits:**
- API caching
- Automatic refetch
- Loading state handling
- Mutation support

**Example use cases:**
- Bookings list
- Customer data
- Reports data

---

### 3.5 UI Design System

**UI stack:**
- `Tailwind CSS` — utility-first styling
- `shadcn/ui` — accessible, reusable components
- `Lucide Icons` — modern, tree-shakeable icon set

These tools provide a consistent design system with accessible interfaces.

---

### 3.6 Forms and Validation

**Libraries:**
- `React Hook Form` — minimal re-renders, performant form management
- `Zod` — schema-based, type-safe validation

---

### 3.7 Data Tables

Large datasets such as bookings and reports are displayed using **TanStack Table**.

**Features:**
- Sorting
- Filtering
- Pagination
- Column configuration

---

### 3.8 Document Printing System

Transport documents are printed using browser-based printing.

**Documents include:**
- GR (Goods Receipt)
- Loading Slip
- Manifest / Challan

**Printing flow:**

```
Booking Data
  ↓
React Template
  ↓
A4 Print Layout
  ↓
Browser Print
```

**Library:** `react-to-print`

---

### 3.9 Image Handling

Images such as company logos are uploaded to **Cloudinary**.

**Upload flow:**

```
Frontend
  ↓
Cloudinary Upload API
  ↓
Cloudinary URL returned
  ↓
URL saved in database
```

---

### 3.10 Frontend Deployment

**Platform:** Vercel

```
GitHub push
  ↓
Vercel build
  ↓
Automatic deployment
```

---

## 4. Backend System Design

### 4.1 Backend Architecture

The backend follows a **layered modular architecture**:

```
routes → controllers → services → repositories → database
```

| Layer | Responsibility |
|---|---|
| Routes | Define API endpoints |
| Controllers | Handle HTTP requests and responses |
| Services | Contain business logic |
| Repositories | Handle database queries |

---

### 4.2 Backend Folder Structure

```
src/
├── controllers/    # Handle incoming requests
├── routes/         # Define API endpoints
├── services/       # Business logic layer
├── repositories/   # Database access layer
├── middlewares/    # Authentication and request validation
├── validators/     # Zod schema validation
├── config/         # Environment configuration
└── utils/          # Helper functions
```

---

### 4.3 Database Design

**Database:** PostgreSQL
**Provider:** Supabase

A relational database is essential because:
- Bookings are linked to customers
- Vehicles are linked to drivers
- Bookings are linked to vehicles
- Reports are based on relational queries

Relational integrity is a core requirement.

---

### 4.4 ORM Layer

**ORM:** Prisma

**Responsibilities:**
- Schema definition
- Database migrations
- Query building
- Type-safe database operations

---

### 4.5 Authentication System

Authentication uses **JWT tokens**.

**Authentication flow:**

```
User Login
  ↓
Backend validates credentials
  ↓
JWT issued
  ↓
Token stored in httpOnly cookie
  ↓
Token verified on protected routes
```

**Libraries:** `jsonwebtoken`, `bcrypt`

---

### 4.6 Subscription Control

Subscription logic is enforced at the backend level.

```
User login
  ↓
Check subscription status
  ↓
If active   → allow access
If expired  → return subscription required response
```

The frontend then displays the renewal page.

---

### 4.7 E-Way Bill Integration

E-way bills are generated using a **GST Suvidha Provider (GSP)** API.

**Workflow:**

```
User creates GR
  ↓
User clicks Generate E-way Bill
  ↓
Backend prepares payload
  ↓
API request sent to GSP
  ↓
E-way bill number returned
  ↓
Stored in database
```

---

### 4.8 Payment Integration

**Provider:** Razorpay

**Payment flow:**

```
User selects plan
  ↓
Razorpay checkout opened
  ↓
Payment processed
  ↓
Razorpay webhook triggered
  ↓
Backend verifies payment
  ↓
Subscription activated
```

---

### 4.9 Email System

**Provider:** Resend

**Emails sent for:**
- Password reset
- Subscription renewal reminders
- System notifications

---

### 4.10 API Documentation

**Tool:** Swagger / OpenAPI

All APIs are documented and available at `/api-docs`.

---

### 4.11 Security

**Middleware stack:**
- `helmet` — secure HTTP headers
- `cors` — cross-origin request control
- `express-rate-limit` — request throttling

**Security measures:**
- Secure headers
- Request throttling
- Authentication validation
- Protected routes

---

### 4.12 Logging System

**Library:** Pino

**Logs include:**
- API requests
- Errors
- System events

---

### 4.13 Error Handling

A centralized error handler manages all server errors.

**Standard error response format:**

```json
{
  "success": false,
  "message": "Error message"
}
```

---

### 4.14 Backend Deployment

**Platform:** Railway

```
GitHub push
  ↓
Railway build
  ↓
Automatic deployment
```

---

## 5. Data Flow Example

**Example: Create Booking**

```
User fills booking form
  ↓
Frontend sends API request
  ↓
Backend validates request
  ↓
Service processes booking
  ↓
Repository saves booking in database
  ↓
Response returned to frontend
  ↓
Frontend updates UI
```

---

## 6. Scalability Considerations

The system is designed to scale horizontally.

**Scalability strategies:**
- Stateless backend APIs
- Managed PostgreSQL database
- CDN for frontend assets (via Vercel)
- Cloud storage for images (via Cloudinary)

---

## 7. Reliability Considerations

System reliability is ensured by:
- Database transactions
- Structured logging with Pino
- Centralized error handling
- Managed hosting platforms (Railway + Vercel)

---

## 8. Performance Considerations

**Optimizations implemented:**
- Database indexing
- Query optimization via Prisma
- API response caching on the frontend (TanStack Query)
- Minimized frontend bundle size

---

## 9. Backup Strategy

Users can manually download data backups from **Settings → Backup**.

**Available formats:**
- Excel
- JSON

**Backup includes:** Bookings, Customers, Vehicles, Drivers

---

## 10. Summary

TMS by Expendifii uses a modern full-stack architecture designed for reliability, scalability, and simplicity.

**Frontend:**

| Technology | Role |
|---|---|
| Next.js | Core framework |
| Tailwind CSS | Styling |
| shadcn/ui | Component system |
| Zustand | Global state |
| TanStack Query | Server state |

**Backend:**

| Technology | Role |
|---|---|
| Node.js + Express | Server framework |
| Prisma ORM | Database access |
| PostgreSQL (Supabase) | Primary database |
| JWT + bcrypt | Authentication |
| Zod | Validation |

**Infrastructure:**

| Service | Role |
|---|---|
| Vercel | Frontend hosting |
| Railway | Backend hosting |
| Cloudinary | Image storage |
| Razorpay | Payments |
| Resend | Email delivery |
| Swagger | API documentation |

This architecture supports a clean separation between UI, business logic, and data layers — ensuring long-term maintainability and scalability.