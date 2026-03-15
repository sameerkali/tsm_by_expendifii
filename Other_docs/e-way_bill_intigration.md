# E-Way Bill Integration Guide
**TMS by Expendifii**
*Using Masters India GSP — Simplest & Most Affordable Option*

---

## Overview

The E-Way Bill is a government-mandated document required when transporting goods worth more than ₹50,000. Instead of manually logging into [ewaybillgst.gov.in](https://ewaybillgst.gov.in) every time, TMS generates it automatically from existing booking data.

**Why Masters India?**
- Cheapest per-bill pricing (~₹0.20–₹0.30 per bill)
- Simplest onboarding for startups
- Good developer documentation
- Website: [mastersindia.co](https://www.mastersindia.co)

---

## How It Works

```
TMS Backend
  ↓
Masters India API (GSP)
  ↓
NIC Government Server
  ↓
E-Way Bill Number returned
```

You never talk to the government directly. Masters India handles that.

---

## 1. Getting API Access

### Documents You Need

- Company GSTIN
- PAN card
- Company registration certificate
- Authorized signatory details
- Address proof
- Email + mobile linked to GST

### Registration Steps

```
1. Sign up at mastersindia.co/contact
2. Submit KYC documents
3. Sign the API usage agreement
4. Receive credentials (3–5 business days)
```

### Credentials You'll Receive

```env
MASTERS_INDIA_CLIENT_ID=your_client_id
MASTERS_INDIA_CLIENT_SECRET=your_client_secret
MASTERS_INDIA_USERNAME=your_username
MASTERS_INDIA_PASSWORD=your_password
MASTERS_INDIA_GSTIN=your_company_gstin
```

Store these in your `.env` file. Never expose them on the frontend.

---

## 2. Pricing

| Plan | Cost |
|---|---|
| Per E-Way Bill | ~₹0.20 – ₹0.30 |
| Estimated 500 bills/month | ~₹100 – ₹150/month |
| Estimated 2000 bills/month | ~₹400 – ₹600/month |

This is cheap enough to absorb into your subscription pricing.

---

## 3. Backend Implementation

### Install Dependencies

```bash
npm install axios dotenv
```

### Environment Variables

```env
MASTERS_INDIA_CLIENT_ID=your_client_id
MASTERS_INDIA_CLIENT_SECRET=your_client_secret
MASTERS_INDIA_USERNAME=your_username
MASTERS_INDIA_PASSWORD=your_password
MASTERS_INDIA_BASE_URL=https://api.mastersindia.co/mastersindia/v2
```

---

### Step 1 — Authenticate with Masters India

Masters India uses OAuth2. Get a token first, then use it for all requests.

```js
// services/ewayBillAuth.js

import axios from "axios";

let cachedToken = null;
let tokenExpiry = null;

export async function getGSPToken() {
  // Return cached token if still valid
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(
    `${process.env.MASTERS_INDIA_BASE_URL}/oauth/token`,
    {
      username: process.env.MASTERS_INDIA_USERNAME,
      password: process.env.MASTERS_INDIA_PASSWORD,
      client_id: process.env.MASTERS_INDIA_CLIENT_ID,
      client_secret: process.env.MASTERS_INDIA_CLIENT_SECRET,
      grant_type: "password",
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000;

  return cachedToken;
}
```

---

### Step 2 — Build the E-Way Bill Payload

```js
// services/ewayBillService.js

export function buildEwayBillPayload(booking, company) {
  return {
    supplyType: "O",                          // O = Outward
    subSupplyType: "1",                       // 1 = Supply
    docType: "INV",                           // INV = Invoice
    docNo: booking.grNumber,
    docDate: formatDate(booking.bookingDate), // DD/MM/YYYY
    fromGstin: company.gstin,
    fromTrdName: company.name,
    fromAddr1: company.address,
    fromPlace: company.city,
    fromPincode: company.pincode,
    fromStateCode: company.stateCode,
    toGstin: booking.consigneeGstin || "URP", // URP if no GSTIN
    toTrdName: booking.consigneeName,
    toAddr1: booking.deliveryAddress,
    toPlace: booking.deliveryCity,
    toPincode: booking.deliveryPincode,
    toStateCode: booking.deliveryStateCode,
    transactionType: 1,
    transDistance: booking.distance.toString(),
    transporterName: company.name,
    transporterId: company.transporterId,
    transMode: "1",                           // 1 = Road
    vehicleNo: booking.vehicleNumber,
    vehicleType: "R",                         // R = Regular
    itemList: [
      {
        productName: booking.goodsDescription,
        hsnCode: booking.hsnCode || "999",
        quantity: booking.quantity,
        qtyUnit: booking.unit || "NOS",
        taxableAmount: booking.declaredValue,
        sgstRate: 0,
        cgstRate: 0,
        igstRate: 0,
        cessRate: 0,
      },
    ],
    totalValue: booking.declaredValue,
    cgstValue: 0,
    sgstValue: 0,
    igstValue: 0,
    cessValue: 0,
    totInvValue: booking.declaredValue,
  };
}

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
```

---

### Step 3 — Call the GSP API

```js
// services/ewayBillService.js (continued)

import axios from "axios";
import { getGSPToken } from "./ewayBillAuth.js";

export async function generateEwayBillFromGSP(payload) {
  const token = await getGSPToken();

  const response = await axios.post(
    `${process.env.MASTERS_INDIA_BASE_URL}/ewb/generate`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        gstin: process.env.MASTERS_INDIA_GSTIN,
      },
    }
  );

  return response.data;
}
```

---

### Step 4 — Controller

```js
// controllers/ewayBillController.js

import { prisma } from "../config/db.js";
import { buildEwayBillPayload, generateEwayBillFromGSP } from "../services/ewayBillService.js";

export async function generateEwayBill(req, res) {
  try {
    const { bookingId } = req.body;
    const companyId = req.user.companyId;

    // 1. Fetch booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { vehicle: true },
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // 2. Fetch company details
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    // 3. Build payload
    const payload = buildEwayBillPayload(booking, company);

    // 4. Call GSP API
    const gspResponse = await generateEwayBillFromGSP(payload);

    if (!gspResponse.ewbNo) {
      return res.status(400).json({
        success: false,
        message: gspResponse.error || "E-Way Bill generation failed",
      });
    }

    // 5. Save to database
    const ewayBill = await prisma.ewayBill.create({
      data: {
        bookingId: booking.id,
        ewayBillNumber: gspResponse.ewbNo,
        generationDate: new Date(),
        validUntil: new Date(gspResponse.validUpto),
        vehicleNumber: booking.vehicleNumber,
        status: "ACTIVE",
      },
    });

    // 6. Return response
    return res.status(200).json({
      success: true,
      data: {
        ewayBillNumber: ewayBill.ewayBillNumber,
        generationDate: ewayBill.generationDate,
        validUntil: ewayBill.validUntil,
      },
    });

  } catch (error) {
    console.error("E-Way Bill error:", error.message);
    return res.status(500).json({
      success: false,
      message: "E-Way Bill generation failed. Please try again later.",
    });
  }
}
```

---

### Step 5 — Route

```js
// routes/ewayBill.routes.js

import express from "express";
import { generateEwayBill } from "../controllers/ewayBillController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate", authenticate, generateEwayBill);

export default router;
```

---

## 4. Database Schema (Prisma)

```prisma
model EwayBill {
  id              String   @id @default(uuid())
  bookingId       String   @unique
  ewayBillNumber  String
  generationDate  DateTime
  validUntil      DateTime
  vehicleNumber   String
  status          String   @default("ACTIVE") // ACTIVE | CANCELLED | EXPIRED

  booking         Booking  @relation(fields: [bookingId], references: [id])
  createdAt       DateTime @default(now())
}
```

---

## 5. Frontend Flow

The UI should be dead simple — one button, one result.

```
Booking Details Page
  ↓
[ Generate E-Way Bill ] button
  ↓
Loading state shown
  ↓
E-Way Bill number displayed
  ↓
[ Print ] button shown
```

### React Example

```jsx
// features/bookings/EwayBillButton.jsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function EwayBillButton({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const [ewayBill, setEwayBill] = useState(null);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/eway-bill/generate", { bookingId });
      setEwayBill(res.data.data);
      toast.success("E-Way Bill generated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  if (ewayBill) {
    return (
      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-sm text-muted-foreground">E-Way Bill Number</p>
        <p className="text-xl font-bold">{ewayBill.ewayBillNumber}</p>
        <p className="text-sm">Valid until: {new Date(ewayBill.validUntil).toLocaleDateString()}</p>
        <Button variant="outline" onClick={() => window.print()}>Print</Button>
      </div>
    );
  }

  return (
    <Button onClick={handleGenerate} disabled={loading}>
      {loading ? "Generating..." : "Generate E-Way Bill"}
    </Button>
  );
}
```

---

## 6. Error Handling

```js
// Common GSP error codes and messages

const GSP_ERRORS = {
  "238": "Invalid GSTIN. Please verify supplier or recipient GSTIN.",
  "312": "Vehicle number not found in VAHAN database.",
  "604": "Duplicate document number. E-Way Bill already exists for this GR.",
  "default": "E-Way Bill generation failed. Please try again later.",
};

export function getReadableError(errorCode) {
  return GSP_ERRORS[errorCode] || GSP_ERRORS["default"];
}
```

---

## 7. Testing

Masters India provides a **sandbox environment** for testing.

```env
# Use sandbox URL during development
MASTERS_INDIA_BASE_URL=https://api.mastersindia.co/mastersindia/v2/sandbox
```

Switch to the production URL before going live:

```env
MASTERS_INDIA_BASE_URL=https://api.mastersindia.co/mastersindia/v2
```

**Test with these dummy GSTINs provided by Masters India:**
- Supplier GSTIN: `27AAPFU0939F1ZV`
- Recipient GSTIN: `27AAPFU0939F1ZV`

---

## 8. Implementation Checklist

```
[ ] Register on mastersindia.co
[ ] Submit KYC documents
[ ] Receive API credentials
[ ] Add credentials to .env
[ ] Add EwayBill model to Prisma schema
[ ] Run prisma migrate
[ ] Implement ewayBillAuth.js (token management)
[ ] Implement ewayBillService.js (payload + API call)
[ ] Implement ewayBillController.js
[ ] Add route to app
[ ] Test in sandbox
[ ] Add EwayBillButton to booking details page
[ ] Test end-to-end
[ ] Switch to production URL
```

---

## 9. Future Improvements

Once the basic flow works, these can be added later:

- E-Way Bill cancellation (`DELETE /api/v1/eway-bill/:id`)
- Auto-generate on booking creation
- Bulk generation for multiple bookings
- Vehicle number update on existing bills
- E-Way Bill validity extension
- E-Way Bill register with date filters

---

## Summary

| What | How |
|---|---|
| GSP Provider | Masters India |
| Cost | ~₹0.20–₹0.30 per bill |
| Auth | OAuth2 token |
| Key endpoint | `POST /ewb/generate` |
| Data source | Existing booking data |
| Storage | `eway_bills` table in PostgreSQL |
| Frontend | Single button → displays number |

The full integration takes roughly **2–3 weeks** including onboarding and testing. Once live, users generate an E-Way Bill in under 5 seconds without touching the government portal.