# Backend Tech Stack
**TMS by Expendifii**
*Last Updated: March 2026*

---

## Overview

The backend of TMS is built using **Node.js and Express** with a modular architecture designed for:

- Scalability
- Maintainability
- Clear separation of responsibilities

The backend exposes **REST APIs** consumed by the Next.js frontend.

---

## Core Framework

### Node.js

Runtime environment used for building the server.

**Reasons:**
- Asynchronous architecture
- Large ecosystem
- High performance
- Widely used in SaaS systems

### Express.js

Express is used as the web server framework.

**Responsibilities:**
- Routing
- Middleware handling
- API endpoints
- Request/response lifecycle

**Example route structure:**

```
routes/
├── booking.routes.js
├── customer.routes.js
└── vehicle.routes.js
```

---

## Application Architecture

The backend follows a **modular layered architecture**.

**Project structure:**

```
src/
├── controllers/
├── routes/
├── services/
├── repositories/
├── middlewares/
├── config/
├── utils/
└── validators/
```

**Layer responsibilities:**

| Layer | Responsibility |
|---|---|
| Controllers | Handle incoming requests |
| Services | Contain business logic |
| Repositories | Interact with the database |
| Routes | Define API endpoints |
| Middlewares | Handle auth, logging, and validation |

---

## Database

**Database:** PostgreSQL
**Provider:** Supabase

**Reasons:**
- Relational integrity
- Strong consistency
- SQL support for reporting
- Scalable managed infrastructure

---

## ORM

### Prisma

**Benefits:**
- Type-safe queries
- Schema migrations
- Automatic client generation
- Strong developer experience

**Example model:**

```prisma
model Customer {
  id        String   @id @default(uuid())
  name      String
  mobile    String
  gstin     String?
  createdAt DateTime @default(now())
}
```

---

## Authentication

**Method:** JWT (JSON Web Tokens)

**Libraries used:**
- `jsonwebtoken`
- `bcrypt`

**Features implemented:**
- Login
- Password hashing
- Session validation
- Role-based access

---

## API Validation

### Zod

**Benefits:**
- Schema-based validation
- Shared validation with frontend
- Predictable request validation

**Example:**

```js
z.object({
  customerId: z.string(),
  weight: z.number()
})
```

---

## Email Service

**Provider:** Resend

**Used for:**
- Password reset emails
- Subscription renewal reminders
- System notifications

**Benefits:**
- Simple API
- Reliable delivery
- Developer friendly

---

## File Storage

**Provider:** Cloudinary

**Use cases:**
- Company logos

**Upload flow:**

```
Frontend upload
  ↓
Cloudinary
  ↓
URL stored in database
```

---

## Payment Processing

**Provider:** Razorpay

**Used for:**
- Subscription payments
- Plan upgrades
- Renewals

Webhook events are handled by the backend.

---

## API Documentation

**Tool:** Swagger / OpenAPI

**Benefits:**
- Clear API documentation
- Easier integration
- Debugging support

**Available at:** `/api-docs`

---

## Security Middleware

**Libraries used:**
- `helmet`
- `cors`
- `express-rate-limit`

**Purpose:**
- Prevent common attacks
- Secure HTTP headers
- Rate limiting

---

## Logging

### Pino

**Benefits:**
- Fast logging
- Structured logs
- Production friendly

**Logs include:**
- API requests
- Errors
- System events

---

## Error Handling

Centralized error handling middleware is used across the application.

**Responsibilities:**
- Catch unhandled errors
- Return consistent API responses
- Log server issues

**Standard error response format:**

```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

## Environment Configuration

**Library:** `dotenv`

**Key variables:**

```env
DATABASE_URL
JWT_SECRET
RAZORPAY_KEY
RESEND_API_KEY
CLOUDINARY_SECRET
```

---

## Backup System

Users can manually download backups.

**Formats supported:**
- Excel
- JSON

**Backup includes:**
- Bookings
- Customers
- Vehicles
- Drivers

---

## Hosting

**Platform:** Railway

**Reasons:**
- Simple deployment
- Auto scaling
- Easy database connections

**Deployment flow:**

```
GitHub push
  ↓
Railway build
  ↓
Automatic deployment
```

---

## External Services

| Service | Purpose |
|---|---|
| Supabase | PostgreSQL database hosting |
| Cloudinary | Image storage |
| Resend | Email delivery |
| Razorpay | Payment processing |
| Swagger | API documentation |
| Railway | Backend hosting |

---

## Stack Summary

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| DB Provider | Supabase |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| Validation | Zod |
| Email | Resend |
| File Storage | Cloudinary |
| Payments | Razorpay |
| API Docs | Swagger / OpenAPI |
| Security | Helmet, CORS, Rate Limit |
| Logging | Pino |
| Hosting | Railway |

This architecture ensures **reliable data storage**, **scalable APIs**, a **maintainable codebase**, and **production-ready SaaS infrastructure**.