# MVP Technical Documentation
## TMS by Expendifii – Transport Management System
Last Updated: March 2026

---

# 1. Purpose of This Document

This document defines the **technical scope and implementation details of the Minimum Viable Product (MVP)** for TMS by Expendifii.

The MVP focuses only on **core features required by transport offices** to run daily operations.

The goal is to launch a **stable, usable product quickly**, avoiding unnecessary complexity or feature bloat.

---

# 2. MVP Goals

The MVP must allow transport companies to:

1. Create Goods Receipt (GR) bookings
2. Print transport documents
3. Generate E-way Bills
4. Manage customers
5. Manage vehicles
6. Manage drivers
7. View operational reports

If these tasks can be completed efficiently, the MVP is considered successful.

---

# 3. Non-Goals (Not Included in MVP)

The following features are intentionally excluded from MVP to reduce complexity:

Fuel tracking  
Fleet expense management  
Trip profit/loss analysis  
Inventory tracking  
Returns management  
Purchase invoices  
Advanced analytics  
Multi-company support  
Mobile applications  

These features may be considered in future versions.

---

# 4. Technology Stack

## Frontend

Framework  
Next.js (App Router)

Styling  
Tailwind CSS

Component system  
shadcn/ui

State management  
Zustand

Server state management  
TanStack Query

Form handling  
React Hook Form

Validation  
Zod

Tables  
TanStack Table

Charts  
Recharts

Icons  
Lucide

Image storage  
Cloudinary

Hosting  
Vercel

---

## Backend

Runtime  
Node.js

Framework  
Express.js

ORM  
Prisma

Database  
PostgreSQL (Supabase)

Email service  
Resend

Payment processing  
Razorpay

Image storage  
Cloudinary

API documentation  
Swagger

Hosting  
Railway

---

# 5. System Architecture

High-level architecture:

Frontend (Next.js)
↓
Backend API (Node.js + Express)
↓
Database (PostgreSQL via Supabase)

External integrations:

Cloudinary → image storage  
Razorpay → payments  
Resend → email service  
GSP Provider → e-way bill generation  

---

# 6. Core System Modules (MVP)

The MVP will include the following modules:

Dashboard  
Bookings  
Customers  
Vehicles  
Drivers  
Document Printing  
E-Way Bill Generation  
Reports  
Settings  

---

# 7. Module Details

---

# 7.1 Dashboard

The dashboard provides a summary of daily operations.

Displayed data:

Today's bookings count  
Active trips  
Pending deliveries  

Quick action buttons:

Create GR  
Print Documents  
Generate E-way Bill  
View Reports

Dashboard queries should be optimized for fast loading.

---

# 7.2 Booking Management

This is the **core feature of the system**.

Users must be able to create GR (Goods Receipt) bookings.

Booking fields:

GR Number (auto generated)  
Booking Date  
From City  
To City  
Customer  
Product Description  
Weight  
Rate  
Freight Amount  
Vehicle  
Driver  

Freight calculation:

Freight = Weight × Rate

Booking statuses:

Booked  
In Transit  
Delivered  

Users must be able to update booking status.

---

# 7.3 Customer Management

Users can maintain a customer list.

Fields stored:

Customer Name  
Mobile Number  
GSTIN  
Address  
Credit Period  

Customer data must auto-fill when selected during booking creation.

---

# 7.4 Vehicle Management

Users can add vehicles used for transport.

Vehicle fields:

Vehicle Number  
Vehicle Type  
Vehicle Capacity  
Owner Name  

Vehicles can be assigned to bookings.

---

# 7.5 Driver Management

Users can manage driver information.

Fields:

Driver Name  
Mobile Number  
License Number  

Drivers can be assigned to bookings.

---

# 7.6 Document Printing

Transport offices need to print documents frequently.

Documents supported:

Goods Receipt (GR)  
Loading Slip  
Manifest / Challan  

Printing approach:

Booking data  
↓  
React template  
↓  
Formatted A4 document  
↓  
Browser print

Library used:

react-to-print

---

# 7.7 E-Way Bill Generation

E-way bill generation must be integrated with bookings.

Workflow:

Create GR  
↓  
Click Generate E-Way Bill  
↓  
Backend sends request to GSP API  
↓  
E-way bill number returned  
↓  
Stored in database

Fields automatically populated:

Customer GSTIN  
Product details  
Vehicle number  
Weight  
Declared value  

An E-way Bill Register must be available.

---

# 7.8 Reports

Reports available in MVP:

GR Reports  
Dispatch Reports  
Daily Booking Summary  

Report filters:

Date range  
Customer  
Route  

Reports must support Excel export.

---

# 7.9 Settings

Settings module includes:

Company profile  
Company logo upload  
User profile  
Subscription management  
Data backup

Logo uploads are stored using Cloudinary.

---

# 8. Authentication System

Authentication uses JWT tokens.

Flow:

User enters credentials  
↓  
Backend validates login  
↓  
JWT issued  
↓  
Stored in httpOnly cookie  
↓  
Token verified for protected routes

Password hashing uses bcrypt.

---

# 9. Subscription Management

Two subscription plans:

Starter Plan  
Business Plan

Starter Plan:

3 concurrent users

Business Plan:

8 concurrent users

If subscription expires:

User can login  
Dashboard remains locked  
User must renew subscription

Payments processed through Razorpay.

---

# 10. Database Design Overview

Primary tables required:

Users  
Companies  
Customers  
Vehicles  
Drivers  
Bookings  
EwayBills  
Subscriptions  

Relationships:

Customer → Bookings  
Vehicle → Bookings  
Driver → Bookings  
Booking → EwayBill  

---

# 11. API Design

The backend exposes REST APIs.

Core APIs:

Authentication API  
Customer API  
Vehicle API  
Driver API  
Booking API  
E-Way Bill API  
Reports API  
Subscription API  

All APIs must be documented using Swagger.

---

# 12. Logging and Monitoring

Logging system uses Pino.

Logs include:

API requests  
Errors  
System events

Logs should help diagnose operational issues.

---

# 13. Security

Security measures include:

HTTPS communication  
Password hashing  
JWT authentication  
Rate limiting  
Secure headers

Libraries used:

helmet  
cors  
express-rate-limit  

---

# 14. Deployment Architecture

Frontend deployment:

Vercel

Backend deployment:

Railway

Database hosting:

Supabase

Image storage:

Cloudinary

---

# 15. Backup Strategy

Users can download system backups manually.

Location:

Settings → Backup

Formats available:

Excel  
JSON

Backup includes:

Bookings  
Customers  
Vehicles  
Drivers  

---

# 16. Development Phases

Phase 1

Authentication  
Customer module  
Vehicle module  
Driver module

Phase 2

Booking system  
Document printing

Phase 3

E-way bill integration  
Reports

Phase 4

Subscription system  
Payments

---

# 17. MVP Success Criteria

The MVP is considered successful if users can:

Create GR bookings quickly  
Print transport documents easily  
Generate e-way bills from the system  
Manage customers, vehicles, and drivers  
View operational reports

If these tasks work reliably, the MVP is ready for production use.

---

# 18. Summary

The MVP version of TMS focuses strictly on the **core operational workflow of transport companies**.

Core workflow:

Create GR  
Print document  
Generate E-way Bill

Everything else in the system supports this workflow.

The architecture ensures the system is:

Simple  
Reliable  
Scalable  
Maintainable