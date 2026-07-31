# TSM by Expendifii — Transport Management System

> **Modern Transport OS built for Indian Logistics & Transporters — No Paper, No Spreadsheets.**

TSM (Transport Management System) by **Expendifii** is a comprehensive, cloud-native platform designed to digitize, automate, and streamline end-to-end transport business operations.

---

## 🎯 What Problem We Solve

Traditional Indian transport and logistics businesses rely heavily on physical paper registers, carbon-copy Goods Receipts (GR / Lorry Receipts - LR), manual billing, and disconnected customer records. This causes:

- ❌ **Lost & Damaged Paperwork**: Paper receipts misplaced during transit or storage.
- ❌ **Delayed Invoicing & Payments**: Manual calculation of freight, demurrage, and extra charges leads to delayed billing cycles.
- ❌ **Lack of Operational Visibility**: No central hub to audit active shipments, customer transaction history, or unpaid balances.
- ❌ **Human Error**: Miscalculations on rates, tax/GST entries, and recipient details.

### 💡 The Solution

**TSM replaces legacy paper workflows with a digital-first Transport OS**:
- Create and issue digital Lorry Receipts (GR / LR) in seconds.
- Maintain a single source of truth for customers, routes, and freight histories.
- Print professional, compliant receipts and invoices directly from the dashboard.
- Access real-time analytics on shipments, revenue, and business health.

---

## ✨ Key Features

- **📄 Goods Receipt (GR / LR) Management**: Create, edit, print, and track digital Lorry Receipts with automated serial numbering, rate calculations, and status tracking.
- **👥 Customer Directory & Billing**: Centralized customer database for quick lookup, custom freight terms, and historical shipping logs.
- **🖨️ Smart Printing & Export**: One-click printing optimized for thermal & standard printers, plus Excel (`.xlsx`) export for reporting.
- **📊 Real-time Dashboard & Analytics**: Live monitoring of daily bookings, pending receipts, active customers, and performance metrics.
- **🔐 Secure Auth & Plan Management**: Subscription status tracking, plan enforcement, and secure token-based user authentication.
- **⚡ Mobile-Optimized Interface**: High-performance, responsive UI designed for office desktops and field mobile access.

---

## 🛠️ Tech Stack

| Domain | Technology |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) + TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/) |
| **State & Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) + [Axios](https://axios-http.com/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Analytics & Telemetry** | PostHog + Vercel Analytics & Speed Insights |
| **Smooth Scroll & UX** | Lenis Scroll + Sonner Toast Notifications |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sameerkali/tsm_by_expendifii.git
   cd tsm_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Configure your backend API URL and analytics keys in `.env.local`.

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
src/
├── app/                  # Next.js App Router (pages & API routes)
│   ├── (auth)/           # Authentication flows (login, register)
│   ├── (dashboard)/      # Protected transport management dashboard
│   │   ├── customers/    # Customer management
│   │   ├── dashboard/    # Analytics & summary overview
│   │   ├── gr/           # Goods Receipt / LR management
│   │   ├── printing/     # Print layout engine
│   │   └── settings/     # User profile & organization settings
│   └── page.tsx          # Marketing landing page
├── components/           # Reusable UI & domain components
│   ├── auth/             # Modal & form auth components
│   ├── layout/           # Navbar, Sidebar, Footer components
│   └── ui/               # Radix & Tailwind design primitives
├── hooks/                # Custom React hooks (auth, query, state)
├── lib/                  # Utility functions, API clients & schemas
└── types/                # TypeScript interfaces & type definitions
```

---

## 📜 License

Private & Confidential — **Expendifii** © All rights reserved.
