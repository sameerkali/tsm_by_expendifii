# TMS by Expendifii  
Functional Requirements Document (FRD)

Version: 1.0  
Status: Pre-Development (Simplified V1)  
Prepared by: Sameer Faridi  
Last Updated: March 2026

---

# 1. Product Overview

TMS by Expendifii is a simple web application designed for transport companies to manage Goods Receipt (GR) bookings and print transport documents.

The first version of the system focuses only on essential transport office operations.

Core workflow:

Create GR  
Edit GR  
Print documents  
Download data

The system must be extremely simple so transport office staff can use it without training.

---

# 2. Platform Notes

Platform integrates Google Analytics for usage tracking.

All APIs must be documented using Swagger.

Account deletion is not instant. The user submits a deletion request and the Expendifii admin reviews and approves the request.

Data onboarding (migrating existing customer data for new companies) is handled manually by the Expendifii team on the backend. There is no in-app import feature.

---

# 3. Authentication & Security

Authentication method:

Email and password login.

Passwords must be securely hashed.

Authentication tokens use JWT stored in httpOnly cookies.

Security rules:

HTTPS only  
Secure headers enabled  
All protected APIs require valid JWT  
API rate limiting applied

Session rules:

Maximum two concurrent logins.

If a third login occurs, the oldest session is automatically invalidated.

Only one user account exists per company.

---

# 4. Account Creation

User creates an account by entering:

Company Name  
GSTIN (required)  
Email  
Password  
Company Logo

The email used during signup becomes the main login email.

GSTIN and Email cannot be changed later.

After account creation:

Account status = INACTIVE.

User must activate the account using a coupon code.

---

# 5. Account Activation (Coupon System)

There is no payment gateway in Version 1.

Access is activated using admin-generated coupon codes.

Admin creates coupon codes from the admin panel.

Coupon creation requires:

Client Email  
Access Duration (in days)

The system generates a random coupon code.

Coupon is linked to the client email.

Activation process:

User logs in  
↓  
System shows "Account Not Active" screen  
↓  
User enters coupon code  
↓  
Backend validates code and email match  
↓  
If valid, account becomes ACTIVE

Access duration is calculated as:

Start Date = Today  
End Date = Today + Duration Days

After expiry the account becomes inactive again.

---

# 6. Application Navigation

The system contains only a few tabs.

Main sidebar navigation:

Dashboard  
Customers  
GR  
Printing  
Settings

The interface must remain simple and uncluttered.

---

# 7. Dashboard

Dashboard shows only one thing:

Recent GR records created by the user.

Displayed fields:

GR Number  
Booking Date  
Customer  
Route (From → To)  
Status

No analytics, charts, or statistics.

---

# 8. Customer Management

Users can manage customers.

Customer fields:

Name  
Mobile Number  
GSTIN  
Address  
Default Rate

Default Rate is used to auto-fill GR rate when creating a booking.

Customer actions:

Create customer  
Edit customer  
Delete customer  
Search customers

Customers are scoped per company.

---

# 9. GR (Goods Receipt) Management

GR creation is the core functionality.

GR Number format:

GR-0001  
GR-0002  
GR-0003

Numbers increment automatically per company.

---

## GR Fields

GR Number (auto generated)

Booking Date

From City (free text)

To City (free text)

Consignor

Consignee

Product Description

HSN Code

Weight

Pricing Type (dropdown)

Price by Weight  
Price by Box

Rate

Freight Amount (auto calculated)

Vehicle Number

Driver Name

Driver Mobile

Payment Status

---

## Freight Calculation

If pricing type is "Price by Weight":

Freight = Weight × Rate

If pricing type is "Price by Box":

Freight = Box Count × Rate

---

## Manual Entry

Users can manually enter any data.

Dropdowns should never block manual entry.

Transport offices often work with new vehicles and drivers daily.

---

# 10. GR Status

Available statuses:

Booked  
In Transit  
Delivered

Status can be changed anytime.

Status must appear with color indicators:

Booked → Grey  
In Transit → Yellow  
Delivered → Green

---

# 11. GR Editing

Users can edit GR records at any time.

Editable fields include all GR fields.

The GR number itself cannot be changed.

---

# 12. GR Duplicate Feature

Users can duplicate an existing GR.

Process:

User opens GR  
Clicks Duplicate  
System creates a new GR with copied data  
User edits required fields  
New GR is saved

This helps speed up repetitive bookings.

---

# 13. Search

Search must be available across the system.

Users should be able to search GR records by:

GR Number  
Customer Name  
Vehicle Number

Search must be fast and accessible from the main GR table.

---

# 14. Printing System

Documents supported:

GR Copy  
Loading Slip  
Manifest

Printing format:

A4 paper.

All documents must include:

Company Logo  
Company Name  
Company Address  
Customer Information  
Vehicle Information  
Driver Information  
Product Details  
Freight Details

---

## Printing Behavior

Printing must be instant.

Use browser print dialog.

No server-side PDF generation.

---

## Custom Print Template

Each company automatically receives a print template with their:

Logo  
Company Name  
Company Address

The layout remains the same for all companies.

Only branding changes.

---

# 15. Bulk Editing

Users can perform bulk editing of GR records.

UI must behave similar to spreadsheet editing.

User workflow:

Filter GR list  
Select multiple GR rows  
Edit fields like:

Vehicle Number  
Driver Name  
Status

Changes apply to all selected records.

---

# 16. Bulk Printing

Users can print multiple GR records at once.

User workflow:

Filter GR list  
Select multiple rows  
Click Print

All selected GR documents open in a single print view.

---

# 17. Settings

Settings includes only basic system actions.

---

## Profile

User can update:

Company Name  
Phone Number  
Address  
Logo

User cannot change:

GSTIN  
Email

---

## Download Data

User can download all company data in Excel format.

Export includes:

GR records  
Customer records

---

## Account Deletion Request

User submits deletion request.

Admin reviews request.

If approved:

All company data is permanently deleted.

Account is deactivated.

---

## Logout

Logs out the current session.

---

# 18. Admin Panel

Internal system used by Expendifii.

Admin can:

View all companies

Create coupon codes

Approve or reject account deletion requests

Admin cannot view company GR data.

---

# 19. Future Features (Not Included in V1)

E-way bill integration

Multi-user accounts per company

Payment gateway integration

Vehicle management module

Driver management module

Advanced reporting

SMS or WhatsApp notifications

---

# 20. Summary

The V1 system focuses only on the most essential transport office workflow:

Create GR  
Edit GR  
Duplicate GR  
Print GR  
Manage customers

The system prioritizes simplicity, speed, and usability for daily transport operations.