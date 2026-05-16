import type { FieldSchema } from './fieldSchema'

export function validateValue(value: unknown, schema: FieldSchema): string | null {
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

    if (schema.type === 'phone' && !/^\+?[\d\s\-()]{7,15}$/.test(value))
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
