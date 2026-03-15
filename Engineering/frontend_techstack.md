# Frontend Tech Stack
**TMS by Expendifii**
*Last Updated: March 2026*

---

## Overview

The frontend of TMS is built using **Next.js** and **Tailwind CSS** with a modern React ecosystem focused on:

- Fast UI development
- Scalable architecture
- Predictable state management
- Good developer experience

The frontend communicates with the backend through **REST APIs** and is optimized primarily for **desktop usage**, since transport companies typically operate from office computers.

---

## Core Framework

### Next.js (App Router)

Next.js is used as the core production-grade React framework.

**Reasons:**
- Production-grade React framework
- Server-side rendering support
- Built-in routing
- Performance optimization
- Scalable architecture
- Good developer ecosystem

**Features used:**
- App Router
- Server Components
- Client Components
- Middleware
- API communication using `fetch`
- Environment variables support

**Project structure:**

```
src/
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── store/
├── types/
└── utils/
```

---

## Styling System

### Tailwind CSS

Tailwind CSS is used for all UI styling.

**Benefits:**
- Utility-first CSS
- Rapid UI development
- Minimal CSS conflicts
- Easy responsive layouts
- Small bundle size

**Libraries used with Tailwind:**
- `tailwindcss`
- `tailwind-merge`
- `clsx`

**Example usage:**

```jsx
<div className="flex items-center gap-3 rounded-lg border p-4">
  {/* UI Component */}
</div>
```

---

## UI Component System

### shadcn/ui

The application uses **shadcn/ui** as the primary component system.

**Benefits:**
- Built on Radix UI
- Accessible components
- Customizable
- Lightweight
- Integrates perfectly with Tailwind

**Common components used:**
- Button
- Input
- Dialog
- Dropdown
- Table
- Tabs
- Sheet
- Card
- Tooltip

---

## Icons

### Lucide Icons (`lucide-react`)

**Reasons:**
- Lightweight
- Modern icon design
- Tree-shakeable
- Works well with React

**Example:**

```jsx
import { Truck } from "lucide-react"
```

---

## State Management

### Zustand

Zustand is used for lightweight global state management.

**Reasons:**
- Minimal boilerplate
- Fast
- Simple API
- No complex reducers

**Used for:**
- Authentication state
- UI state
- Dashboard data
- User session state

**Store structure:**

```
store/
├── authStore.ts
└── uiStore.ts
```

---

## API Data Management

### TanStack Query (React Query)

Used for server state management.

**Benefits:**
- Caching
- Background refetch
- Automatic retries
- Loading states
- Mutation management

**Example usage:**

```js
useQuery({
  queryKey: ["bookings"],
  queryFn: fetchBookings
})
```

---

## Form Handling

### React Hook Form

Used for managing forms across the application.

**Benefits:**
- High performance
- Minimal re-renders
- Easy validation integration

### Zod Validation

Zod is used for schema validation.

**Benefits:**
- Type-safe validation
- Shared schema with backend
- Cleaner form validation

**Example:**

```js
const schema = z.object({
  customerName: z.string(),
  weight: z.number()
})
```

---

## Tables

### TanStack Table

Used for displaying large datasets such as GR records, customer lists, reports, and vehicle data.

**Features:**
- Sorting
- Filtering
- Pagination
- Column control

---

## Charts

### Recharts

Used for visual analytics.

**Examples:**
- Daily bookings
- Dispatch statistics
- Business reports

**Benefits:**
- React-friendly
- Customizable
- Lightweight

---

## Date Handling

**Library:** `date-fns`

**Reasons:**
- Modern
- Lightweight
- Modular

**Used for:**
- Booking dates
- Report filters
- Dashboard summaries

---

## Printing System

Transport offices require document printing.

**Approach:**
- Browser-based printing
- HTML document templates
- A4 format

**Library:** `react-to-print`

**Documents printed:**
- GR (Goods Receipt)
- Loading Slip
- Manifest / Challan

---

## Notifications

**Library:** `sonner`

**Used for:**
- Success notifications
- Error alerts
- System messages

---

## Image Handling

Images are stored using **Cloudinary**.

**Used for:**
- Company logos

**Upload flow:**

```
Frontend
  ↓
Upload to Cloudinary
  ↓
Store image URL in database
```

---

## Authentication

Authentication uses **JWT tokens** issued by the backend.

**Best practices used:**
- `httpOnly` cookies
- Protected routes
- Middleware checks

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

---

## Deployment

**Hosting platform:** [Vercel](https://vercel.com)

**Reasons:**
- Optimized for Next.js
- Automatic deployments
- Edge caching
- Fast CDN

**Deployment flow:**

```
GitHub push
  ↓
Vercel build
  ↓
Automatic deployment
```

---

## Performance Optimizations

- Component lazy loading
- Server components where possible
- Caching API responses
- Optimized images
- Minimized bundle size

---

## Stack Summary

| Category | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Global State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Validation | Zod |
| Tables | TanStack Table |
| Charts | Recharts |
| Dates | date-fns |
| Icons | Lucide Icons |
| Notifications | Sonner |
| Images | Cloudinary |
| Hosting | Vercel |

This stack ensures **fast development**, **scalable architecture**, a **maintainable codebase**, and **strong performance**.