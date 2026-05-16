---
name: field-validation
description: >
  Generates a complete, production-grade centralized field sanitization and
  validation system for React / React Native / Node.js projects. Use this skill
  whenever the user asks for a validation hook, sanitization utility, form
  validation, input security, field schema, or mentions wanting to reuse
  validation logic across components. Also triggers for phrases like "validate
  input", "sanitize form fields", "centralized validation", "useField hook",
  "input rules", "string/number/boolean validation", or "secure form handling".
  Always use this skill — even if the user only mentions one of these concepts —
  because the architecture it produces (schema → pure functions → React hook) is
  always better than ad-hoc per-component solutions.
---

# Field Validation Skill

Generates a centralized, type-safe, reusable field sanitization + validation
system. The output is always a set of real files the user can drop into their
project — not pseudocode.

---

## Architecture (always follow this layering)

```
Schema config  →  Pure functions  →  React hook  →  Component
(fieldSchema)     (sanitize/validate)  (useField)    (any UI)
```

**Why this separation matters:**
- Pure functions are testable without React, reusable in Express/Node middleware
- Schema is a plain object — shareable between frontend and backend (monorepo `shared/`)
- Hook is a thin React adapter only — no business logic lives there
- Components stay dumb — they only bind to hook outputs

---

## Output file structure

Always generate these files under `src/lib/validation/`:

```
src/lib/validation/
├── fieldSchema.ts     ← type definitions only
├── sanitize.ts        ← pure sanitization functions
├── validate.ts        ← pure validation functions
├── useField.ts        ← React hook (thin layer)
└── schemas.ts         ← app-level schema definitions
```

---

## File 1 — `fieldSchema.ts`

Defines all types. Never put logic here.

```typescript
export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'email'
  | 'phone'
  | 'url'

export interface FieldSchema {
  type: FieldType
  required?: boolean
  label?: string

  // string / email / phone / url
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  allowedChars?: RegExp       // whitelist — value must fully match
  sanitize?: SanitizeRule[]

  // number
  min?: number
  max?: number
  integer?: boolean
  precision?: number          // max decimal places

  // boolean
  mustBeTrue?: boolean        // e.g. "I accept terms" checkboxes

  // escape hatch
  custom?: (value: unknown) => string | null
}

export type SanitizeRule =
  | 'trim'
  | 'lowercase'
  | 'uppercase'
  | 'stripHtml'
  | 'stripSpecialChars'
  | 'numeric'                 // keep digits only
  | 'alphanumeric'
```

---

## File 2 — `sanitize.ts`

Pure function. No React imports. Runs before validation.

```typescript
import type { FieldSchema, SanitizeRule } from './fieldSchema'

const sanitizeMap: Record<SanitizeRule, (v: string) => string> = {
  trim:              (v) => v.trim(),
  lowercase:         (v) => v.toLowerCase(),
  uppercase:         (v) => v.toUpperCase(),
  stripHtml:         (v) => v.replace(/<[^>]*>/g, ''),
  stripSpecialChars: (v) => v.replace(/[^a-zA-Z0-9\s\-_.@]/g, ''),
  numeric:           (v) => v.replace(/\D/g, ''),
  alphanumeric:      (v) => v.replace(/[^a-zA-Z0-9]/g, ''),
}

export function sanitizeValue(value: unknown, schema: FieldSchema): unknown {
  if (typeof value !== 'string') return value

  // Always strip null bytes regardless of declared rules
  let result = value.replace(/\0/g, '')

  for (const rule of schema.sanitize ?? []) {
    result = sanitizeMap[rule](result)
  }

  // Type coercion after sanitization
  if (schema.type === 'number') {
    const parsed = Number(result)
    return isNaN(parsed) ? value : parsed
  }
  if (schema.type === 'boolean') {
    return result === 'true' || result === '1'
  }

  return result
}
```

---

## File 3 — `validate.ts`

Pure function. No React imports. Returns `null` (valid) or an error string.

```typescript
import type { FieldSchema } from './fieldSchema'

export function validateValue(
  value: unknown,
  schema: FieldSchema
): string | null {
  const label = schema.label ?? 'This field'

  const isEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    (typeof value === 'string' && value.trim() === '')

  if (schema.required && isEmpty) return `${label} is required`
  if (isEmpty) return null

  // --- string / email / phone / url ---
  if (['string', 'email', 'phone', 'url'].includes(schema.type)) {
    if (typeof value !== 'string') return `${label} must be text`

    if (schema.minLength !== undefined && value.length < schema.minLength)
      return `${label} must be at least ${schema.minLength} characters`

    if (schema.maxLength !== undefined && value.length > schema.maxLength)
      return `${label} cannot exceed ${schema.maxLength} characters`

    if (schema.allowedChars && !schema.allowedChars.test(value))
      return `${label} contains invalid characters`

    if (schema.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return `${label} must be a valid email`

    if (schema.type === 'phone' && !/^\+?[\d\s\-().]{7,15}$/.test(value))
      return `${label} must be a valid phone number`

    if (schema.type === 'url') {
      try { new URL(value) }
      catch { return `${label} must be a valid URL` }
    }

    if (schema.pattern && !schema.pattern.test(value))
      return `${label} format is invalid`
  }

  // --- number ---
  if (schema.type === 'number') {
    const num = typeof value === 'number' ? value : Number(value)
    if (isNaN(num)) return `${label} must be a number`
    if (schema.integer && !Number.isInteger(num))
      return `${label} must be a whole number`
    if (schema.min !== undefined && num < schema.min)
      return `${label} must be at least ${schema.min}`
    if (schema.max !== undefined && num > schema.max)
      return `${label} cannot exceed ${schema.max}`
    if (schema.precision !== undefined) {
      const decimals = (num.toString().split('.')[1] ?? '').length
      if (decimals > schema.precision)
        return `${label} can have at most ${schema.precision} decimal places`
    }
  }

  // --- boolean ---
  if (schema.type === 'boolean') {
    if (schema.mustBeTrue && value !== true)
      return `${label} must be accepted`
  }

  // custom validator runs last
  return schema.custom ? schema.custom(value) : null
}
```

---

## File 4 — `useField.ts`

React hook. Thin adapter only — no validation logic here.

```typescript
import { useState, useCallback } from 'react'
import type { FieldSchema } from './fieldSchema'
import { sanitizeValue } from './sanitize'
import { validateValue } from './validate'

interface FieldState {
  value: unknown
  error: string | null
  touched: boolean
}

export interface UseFieldReturn {
  value: unknown
  error: string | null
  touched: boolean
  isValid: boolean
  onChange: (raw: unknown) => void
  onBlur: () => void
  reset: () => void
  validate: () => boolean      // call on form submit to force-show errors
}

export function useField(
  schema: FieldSchema,
  initialValue: unknown = ''
): UseFieldReturn {
  const [state, setState] = useState<FieldState>({
    value: initialValue,
    error: null,
    touched: false,
  })

  const onChange = useCallback(
    (raw: unknown) => {
      const cleaned = sanitizeValue(raw, schema)
      // Only show inline errors after the field has been touched once
      const error = state.touched ? validateValue(cleaned, schema) : null
      setState((prev) => ({ ...prev, value: cleaned, error }))
    },
    [schema, state.touched]
  )

  const onBlur = useCallback(() => {
    const error = validateValue(state.value, schema)
    setState((prev) => ({ ...prev, error, touched: true }))
  }, [schema, state.value])

  const validate = useCallback((): boolean => {
    const error = validateValue(state.value, schema)
    setState((prev) => ({ ...prev, error, touched: true }))
    return error === null
  }, [schema, state.value])

  const reset = useCallback(() => {
    setState({ value: initialValue, error: null, touched: false })
  }, [initialValue])

  return {
    value: state.value,
    error: state.error,
    touched: state.touched,
    isValid: state.error === null,
    onChange,
    onBlur,
    reset,
    validate,
  }
}
```

---

## File 5 — `schemas.ts`

App-level schema definitions. Add new schemas here as the project grows.
Never define schemas inline inside components.

```typescript
import type { FieldSchema } from './fieldSchema'

export const emailSchema: FieldSchema = {
  type: 'email',
  label: 'Email',
  required: true,
  maxLength: 254,
  sanitize: ['trim', 'lowercase'],
}

export const passwordSchema: FieldSchema = {
  type: 'string',
  label: 'Password',
  required: true,
  minLength: 8,
  maxLength: 128,
}

export const nameSchema: FieldSchema = {
  type: 'string',
  label: 'Full name',
  required: true,
  minLength: 2,
  maxLength: 60,
  allowedChars: /^[a-zA-Z\s\-']+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const phoneSchema: FieldSchema = {
  type: 'phone',
  label: 'Phone',
  required: false,
  sanitize: ['trim'],
}

export const ageSchema: FieldSchema = {
  type: 'number',
  label: 'Age',
  required: true,
  min: 1,
  max: 120,
  integer: true,
}

export const priceSchema: FieldSchema = {
  type: 'number',
  label: 'Price',
  required: true,
  min: 0,
  precision: 2,
}

export const otpSchema: FieldSchema = {
  type: 'string',
  label: 'OTP',
  required: true,
  minLength: 6,
  maxLength: 6,
  pattern: /^\d{6}$/,
  sanitize: ['trim', 'numeric'],
}

export const urlSchema: FieldSchema = {
  type: 'url',
  label: 'Website URL',
  required: false,
  sanitize: ['trim', 'lowercase'],
}

export const termsSchema: FieldSchema = {
  type: 'boolean',
  label: 'Terms and conditions',
  required: true,
  mustBeTrue: true,
}

export const usernameSchema: FieldSchema = {
  type: 'string',
  label: 'Username',
  required: true,
  minLength: 3,
  maxLength: 30,
  allowedChars: /^[a-zA-Z0-9_]+$/,
  sanitize: ['trim', 'lowercase'],
}
```

---

## Usage examples

### Single field

```tsx
import { useField } from '@/lib/validation/useField'
import { emailSchema } from '@/lib/validation/schemas'

function EmailInput() {
  const email = useField(emailSchema)

  return (
    <div>
      <input
        value={email.value as string}
        onChange={(e) => email.onChange(e.target.value)}
        onBlur={email.onBlur}
      />
      {email.touched && email.error && (
        <span className="error">{email.error}</span>
      )}
    </div>
  )
}
```

### Full form with submit validation

```tsx
import { useField } from '@/lib/validation/useField'
import { nameSchema, emailSchema, ageSchema } from '@/lib/validation/schemas'

function SignupForm() {
  const name  = useField(nameSchema)
  const email = useField(emailSchema)
  const age   = useField(ageSchema)

  const handleSubmit = () => {
    const fields = [name, email, age]
    const allValid = fields.every((f) => f.validate())
    if (!allValid) return

    // All values are already sanitized — safe to send
    submitToAPI({
      name:  name.value,
      email: email.value,
      age:   age.value,
    })
  }

  return (
    <>
      <input
        value={name.value as string}
        onChange={(e) => name.onChange(e.target.value)}
        onBlur={name.onBlur}
      />
      {name.touched && name.error && <span>{name.error}</span>}

      <input
        value={email.value as string}
        onChange={(e) => email.onChange(e.target.value)}
        onBlur={email.onBlur}
      />
      {email.touched && email.error && <span>{email.error}</span>}

      <input
        type="number"
        value={age.value as number}
        onChange={(e) => age.onChange(e.target.value)}
        onBlur={age.onBlur}
      />
      {age.touched && age.error && <span>{age.error}</span>}

      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
```

### React Native (same hook, different JSX)

```tsx
import { TextInput } from 'react-native'
import { useField } from '@/lib/validation/useField'
import { phoneSchema } from '@/lib/validation/schemas'

function PhoneInput() {
  const phone = useField(phoneSchema)

  return (
    <TextInput
      value={phone.value as string}
      onChangeText={(text) => phone.onChange(text)}
      onBlur={phone.onBlur}
      keyboardType="phone-pad"
    />
  )
}
```

### Custom validator (escape hatch)

```typescript
// inline custom rule on a schema
const discountSchema: FieldSchema = {
  type: 'number',
  label: 'Discount',
  min: 0,
  max: 100,
  custom: (v) => {
    if (Number(v) % 5 !== 0) return 'Discount must be a multiple of 5'
    return null
  },
}
```

### Reuse in Express middleware (no React needed)

```typescript
import { sanitizeValue } from '@/lib/validation/sanitize'
import { validateValue } from '@/lib/validation/validate'
import { emailSchema }   from '@/lib/validation/schemas'

function validateBody(req, res, next) {
  const cleaned = sanitizeValue(req.body.email, emailSchema)
  const error   = validateValue(cleaned, emailSchema)
  if (error) return res.status(400).json({ error })
  req.body.email = cleaned
  next()
}
```

---

## Key behaviors to always follow

1. **Sanitize runs before validate** — always call `sanitizeValue` first, then `validateValue` on the cleaned value.
2. **Errors only show after `onBlur` or submit** — never show errors on the first keystroke. The `touched` flag gates inline errors; `validate()` forces all errors visible on submit.
3. **Never put logic inside `useField`** — if you need a new rule, it belongs in `validate.ts` or as a `custom` fn on the schema. The hook only manages React state.
4. **One source of truth per field type** — add new schemas to `schemas.ts`, not inline in components. If two components need the same field, they import the same schema.
5. **`validate()` returns a boolean** — use `fields.every(f => f.validate())` on form submit to trigger all field validations in one pass.
6. **Values are already sanitized coming out of the hook** — never sanitize again at the API call site; it's redundant and can break data.

---

## Extending the system

### Adding a new sanitize rule
Add an entry to `sanitizeMap` in `sanitize.ts` and add the key to the
`SanitizeRule` union in `fieldSchema.ts`. No other files need to change.

### Adding a new field type
Add the type to the `FieldType` union in `fieldSchema.ts`, then add a
corresponding `if` block in `validate.ts`. Existing schemas are unaffected.

### Adding a new schema
Add it to `schemas.ts`. Import it wherever needed. Components never define
their own schema inline.

### Form-level validation (cross-field rules)
Keep cross-field rules outside `useField` — they belong in the submit handler:

```typescript
const handleSubmit = () => {
  const allValid = [password, confirm].every((f) => f.validate())
  if (!allValid) return
  if (password.value !== confirm.value) {
    // set error manually or use a separate state
    return
  }
  submit()
}
```

---

## Security notes

- `stripHtml` removes tags but is not a full XSS sanitizer. For rich-text
  fields, use `dompurify` as an additional `custom` validator.
- Null bytes are always stripped regardless of declared sanitize rules.
- `allowedChars` uses a whitelist approach — always prefer whitelist over
  blacklist for security-sensitive fields.
- Backend validation is still required. This system secures the UI layer;
  the Express middleware example shows how to reuse the same pure functions
  server-side to avoid duplicating rules.