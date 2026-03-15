# Design System
## TMS by Expendifii
Last Updated: March 2026

---

# 1. Purpose

This document defines the **design system guidelines** used across the TMS application.

The goal is to maintain:

- UI consistency
- predictable styling
- fast development
- maintainable components

All frontend development must follow this system.

The UI stack used:

Next.js  
Tailwind CSS  
shadcn/ui  
Lucide Icons  

---

# 2. Design Principles

The design philosophy of TMS focuses on:

Clarity  
Speed  
Consistency  
Readability  

The system is designed primarily for **office usage on desktop screens**, where users perform repetitive tasks such as creating bookings and printing documents.

The UI should avoid unnecessary decoration and prioritize **data visibility and usability**.

---

# 3. Typography System

Font Family used across the application:


Inter


Fallback fonts:


system-ui
sans-serif


Tailwind configuration:


fontFamily: {
sans: ['Inter', 'system-ui', 'sans-serif']
}


---

# 4. Font Size Scale

The following font scale must be used across the application.

| Usage | Tailwind Class | Size |
|------|------|------|
Page Heading | text-2xl | 24px |
Section Heading | text-xl | 20px |
Sub Heading | text-lg | 18px |
Body Text | text-base | 16px |
Small Text | text-sm | 14px |
Helper Text | text-xs | 12px |

Rules:

Page titles should always use **text-2xl**.

Table content should use **text-sm or text-base**.

Helper descriptions should use **text-xs**.

---

# 5. Font Weight System

| Usage | Tailwind Class |
|------|------|
Primary Heading | font-semibold |
Section Heading | font-semibold |
Body Text | font-normal |
Labels | font-medium |
Small text | font-normal |

Avoid excessive bold text.

Only headings and labels should use heavier font weight.

---

# 6. Color System

The color palette is intentionally minimal to maintain clarity.

Primary colors:

| Name | Hex |
|------|------|
Primary | #2563EB |
Primary Hover | #1D4ED8 |
Success | #16A34A |
Warning | #F59E0B |
Danger | #DC2626 |

Neutral colors:

| Name | Hex |
|------|------|
Background | #F9FAFB |
Card Background | #FFFFFF |
Border | #E5E7EB |
Text Primary | #111827 |
Text Secondary | #6B7280 |

---

# 7. Tailwind Color Mapping

Example Tailwind usage:

Primary Button


bg-blue-600 text-white hover:bg-blue-700


Success State


bg-green-100 text-green-700


Danger State


bg-red-100 text-red-700


Border


border-gray-200


---

# 8. Layout System

Standard layout spacing rules.

Page padding:


px-6 py-6


Card padding:


p-6


Small card padding:


p-4


Component spacing:


gap-4
gap-6


Section spacing:


space-y-6


---

# 9. Container Width

Application container:


max-w-7xl
mx-auto


Dashboard layout should use full width but maintain consistent padding.

---

# 10. Border Radius System

Border radius rules:

| Usage | Tailwind |
|------|------|
Cards | rounded-lg |
Buttons | rounded-md |
Inputs | rounded-md |
Modals | rounded-lg |

Avoid large border radius styles.

---

# 11. Button Design System

Primary Button


bg-blue-600 text-white hover:bg-blue-700


Secondary Button


bg-gray-100 text-gray-900 hover:bg-gray-200


Danger Button


bg-red-600 text-white hover:bg-red-700


Button height:


h-10


Button padding:


px-4


---

# 12. Input Field Design

Standard input styling:


h-10
px-3
border
border-gray-300
rounded-md


Focus state:


focus:ring-2 focus:ring-blue-500


Labels must always appear above inputs.

---

# 13. Table Design System

Tables are heavily used in transport software.

Table header:


text-sm
font-medium
bg-gray-50


Table rows:


border-b
hover:bg-gray-50


Cell padding:


px-4 py-2


---

# 14. Card Component

Cards should follow this structure.

Card container:


bg-white
border
border-gray-200
rounded-lg
shadow-sm


Card padding:


p-6


---

# 15. Icons

Icon library used:


lucide-react


Standard icon sizes:

| Usage | Size |
|------|------|
Navigation | 20px |
Buttons | 18px |
Tables | 16px |

Example:


size={20}


---

# 16. Notification System

Notifications are handled using **Sonner**.

Types of notifications:

Success  
Error  
Warning  
Info  

Example:

Success


toast.success("Booking created successfully")


Error


toast.error("Failed to create booking")


---

# 17. Modal Design

Modal container:


rounded-lg
p-6
max-w-lg


Modal spacing:


space-y-4


Buttons should always appear in the bottom-right corner.

---

# 18. Form Layout Guidelines

Forms should follow consistent structure.

Form spacing:


space-y-4


Two-column form layout:


grid grid-cols-2 gap-4


Single column layout:


flex flex-col gap-4


---

# 19. Responsive Rules

Although the application is desktop-focused, responsive behavior must still exist.

Breakpoints:

| Breakpoint | Width |
|------|------|
sm | 640px |
md | 768px |
lg | 1024px |
xl | 1280px |

Primary development focus:


lg and xl screens


---

# 20. Print Design Rules

Transport documents must print cleanly.

Print layout rules:

A4 page format  
Black text only  
No background colors  
High contrast borders  

Tailwind print utilities should be used.

Example:


print:bg-white
print:text-black


---

# 21. Component Reusability Rules

Reusable components must be placed in:


components/ui


Feature-specific components must be placed in:


features/*


Avoid duplicating UI logic.

---

# 22. Naming Conventions

Component names:


PascalCase


Examples:


BookingTable
CustomerForm
VehicleSelector


CSS classes should rely on Tailwind utilities instead of custom CSS.

---

# 23. Accessibility Guidelines

All components must follow basic accessibility practices.

Requirements:

Label every input  
Ensure sufficient color contrast  
Use semantic HTML  
Support keyboard navigation  

---

# 24. Design Consistency Rules

Developers must avoid:

Using random colors  
Creating new font sizes  
Adding inconsistent spacing  
Creating duplicate components  

All UI must follow this design system.

---

# 25. Summary

The TMS design system ensures the UI remains:

Consistent  
Readable  
Professional  
Easy to maintain  

By enforcing these design rules, the system stays scalable as new features are added.