# MVP Testing Phase Infrastructure Cost (1–2 Months)

This document outlines the **cheapest possible infrastructure setup** for testing the TMS application with **2–3 users during the first 1–2 months**.

The goal is to **minimize cost while validating the product**.

---

# Backend Hosting

Platform: **Railway**

Railway provides **$5 free credits every month**.

For a small Node.js + Express backend with very low traffic, this credit is usually enough.

Estimated cost during testing:

**₹0 / month**

Worst case if credits exceed:

**~₹500 / month**

---

# Database

Platform: **Supabase**

Use the **Supabase Free Tier**.

Free plan includes:

- 500MB PostgreSQL database
- automatic backups
- sufficient performance for MVP
- enough storage for thousands of bookings

Estimated cost:

**₹0 / month**

---

# Image Storage

Platform: **Cloudinary**

Used for storing company logos.

Free tier includes:

- 25GB storage
- 25GB bandwidth

This is far more than needed for the MVP.

Estimated cost:

**₹0 / month**

---

# Email Service

Platform: **Resend**

Free tier includes:

- 3000 emails per month

Used for:

- password reset
- system notifications
- subscription reminders

Estimated cost:

**₹0 / month**

---

# Payment Gateway

Platform: **Razorpay**

There is **no monthly cost**.

Razorpay only charges **per successful payment transaction (~2%)**.

During testing there is usually **no cost**.

Estimated cost:

**₹0 / month**

---

# Domain

Option 1 (Cheapest)

Use a **subdomain**:
