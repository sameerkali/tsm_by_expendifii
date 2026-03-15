# Product Requirements Document (PRD)
## TMS by Expendifii – Transport Management System
Last Updated: March 2026

---

# 1. Product Overview

TMS (Transport Management System) by Expendifii is a web-based platform designed to help small transport companies manage daily operations such as booking goods receipts, printing transport documents, generating e-way bills, and managing customers, vehicles, and drivers.

The system replaces manual registers, Excel tracking, and outdated transport software with a modern web-based solution.

The platform is designed for companies with approximately **5 to 20 vehicles and small office teams**.

---

# 2. Product Goals

Primary goals of the system:

1. Simplify GR (Goods Receipt) creation.
2. Enable fast document printing for transport operations.
3. Provide integrated e-way bill generation.
4. Manage transport master data such as customers, vehicles, and drivers.
5. Provide operational reports.

The system must be simple enough for **non-technical office staff**.

---

# 3. Target Users

Primary users include:

Transport Company Owners  
Transport Office Managers  
Booking Clerks  
Dispatch Managers

Typical user behavior:

• Create multiple GR bookings daily  
• Print transport documents  
• Generate e-way bills  
• Track dispatch and deliveries  

---

# 4. System Architecture Overview

High-level architecture:

Frontend (Next.js)
↓
REST API
↓
Backend (Node.js + Express)
↓
Database (PostgreSQL via Supabase)

External services used:

Cloudinary – image storage  
Razorpay – payments  
Resend – email service  
GSP Provider – e-way bill API  
Swagger – API documentation  
Railway – backend hosting  

---

# 5. Core System Modules

The V1 system will include the following modules:

Dashboard  
Bookings (GR creation and management)  
Customer Management  
Vehicle Management  
Driver Management  
Document Printing  
E-Way Bill Generation  
Reports  
System Settings  

---

# 6. Functional Requirements

## 6.1 Dashboard

The dashboard provides a quick operational summary.

Displayed information:

Today's bookings count  
Active trips  
Pending deliveries  

Quick actions:

Create GR  
Print Documents  
Generate E-way Bill  
View Reports

---

## 6.2 Booking Management (GR)

Users must be able to create Goods Receipt bookings.

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

Freight amount is automatically calculated using:

Weight × Rate

Booking statuses:

Booked  
In Transit  
Delivered  

System should allow users to update status.

---

## 6.3 Document Printing

Transport offices must print documents daily.

Documents supported:

Goods Receipt (GR)  
Loading Slip  
Manifest / Challan  

Requirements:

Documents must include:

Company logo  
Company name  
Customer details  
Vehicle details  
Driver details  
Product information  
Freight details  

Documents must be printable in **A4 format**.

---

## 6.4 E-Way Bill Generation

Users must be able to generate e-way bills directly from a booking.

Workflow:

Create GR  
↓  
Click Generate E-Way Bill  
↓  
Confirm details  
↓  
System calls GSP API  
↓  
E-way bill number returned  

The following fields are auto-filled:

Company GSTIN  
Customer GSTIN  
Product HSN  
Vehicle number  
Weight  
Declared value  

The generated e-way bill number must be saved with the booking.

Users should also be able to view an **E-way bill register**.

---

## 6.5 Customer Management

Users must be able to manage customer records.

Customer fields:

Customer Name  
Mobile Number  
GSTIN  
Address  
Credit Period  

Customer information is auto-filled during booking creation.

---

## 6.6 Vehicle Management

Users must be able to register vehicles.

Vehicle fields:

Vehicle Number  
Vehicle Type  
Vehicle Capacity  
Owner Name  

Vehicles can be assigned during booking creation.

---

## 6.7 Driver Management

Users must manage driver information.

Driver fields:

Driver Name  
Mobile Number  
License Number  

Drivers are linked to bookings.

---

## 6.8 Reports

Reports available in the system:

GR Reports  
Dispatch Reports  
Daily Booking Summary  

Reports must support:

Date filters  
Customer filters  
Route filters  

Reports should support **Excel export**.

---

## 6.9 Backup System

Users must be able to download system backups.

Location:

Settings → Backup

Available formats:

Excel  
JSON

Backup data includes:

Bookings  
Customers  
Vehicles  
Drivers  

---

## 6.10 Subscription System

The platform operates on a subscription model.

Plans available:

Starter Plan  
Business Plan

Features controlled:

Concurrent login limits  
Advanced reporting  

When subscription expires:

User can login  
Dashboard remains locked  
User must renew subscription to continue

---

# 7. Frontend Requirements

Frontend stack:

Next.js  
Tailwind CSS  
shadcn/ui  
Zustand  
TanStack Query  
React Hook Form  
Zod  
Recharts  
Lucide Icons  

Responsibilities of the frontend:

Display dashboards  
Provide user forms  
Manage UI state  
Call backend APIs  
Render tables and reports  
Handle document printing  
Display notifications  

Frontend must include:

Responsive layout  
Fast loading UI  
Clear navigation  
Accessible components  

---

# 8. Backend Requirements

Backend stack:

Node.js  
Express.js  
Prisma ORM  
PostgreSQL (Supabase)

Responsibilities of the backend:

User authentication  
Business logic processing  
Database operations  
API endpoints  
Subscription enforcement  
External service integrations

---

# 9. API Requirements

Backend must expose REST APIs.

Core APIs include:

Authentication API  
Customer API  
Vehicle API  
Driver API  
Booking API  
E-way bill API  
Reports API  
Subscription API  

API documentation must be available via Swagger.

---

# 10. Authentication

Authentication method:

JWT (JSON Web Tokens)

Features:

User login  
Password hashing (bcrypt)  
Session validation  
Protected routes  

Authentication tokens should be stored using **httpOnly cookies**.

---

# 11. Image Storage

Images such as company logos are stored using **Cloudinary**.

Upload process:

Frontend uploads image  
Cloudinary stores file  
Cloudinary URL saved in database  

---

# 12. Email Notifications

Email service provider:

Resend

Used for:

Password reset  
Subscription reminders  
System notifications  

---

# 13. Payment Integration

Payment provider:

Razorpay

Used for:

Subscription payments  
Plan upgrades  
Renewals  

Backend must process Razorpay webhook events.

---

# 14. Security Requirements

Security practices include:

HTTPS communication  
Password hashing  
JWT authentication  
Rate limiting  
Secure headers using Helmet  

Sensitive data must never be exposed in APIs.

---

# 15. Hosting Infrastructure

Frontend Hosting:

Vercel

Backend Hosting:

Railway

Database:

Supabase (PostgreSQL)

Image Storage:

Cloudinary

---

# 16. Non Functional Requirements

The system must support:

Fast page loads  
Secure authentication  
Reliable database transactions  
Scalable backend architecture  

The application must handle **thousands of bookings without performance issues**.

---

# 17. Success Metrics

The product will be considered successful if:

Transport companies can create GR bookings quickly.  
Users can generate e-way bills within seconds.  
Office staff can print documents easily.  
Manual paperwork is significantly reduced.

---

# 18. Future Enhancements (Not part of V1)

Potential future improvements:

Fuel tracking  
Trip expense management  
Profit analysis  
Advanced fleet analytics  

These features are not included in the initial release.

---

# 19. Summary

TMS by Expendifii is a web-based transport management platform focused on simplifying daily operations for small transport companies.

Core capabilities:

GR creation  
Transport document printing  
E-way bill generation  
Customer and vehicle management  
Operational reporting  

The system prioritizes **simplicity, speed, and reliability** to help transport businesses run efficiently.