import type { FieldSchema, SanitizeRule } from './fieldSchema'

const sanitizeMap: Record<SanitizeRule, (v: string) => string> = {
  trim:              (v) => v.replace(/^\s+/, '').replace(/\s{2,}/g, ' '),
  lowercase:         (v) => v.toLowerCase(),
  uppercase:         (v) => v.toUpperCase(),
  stripHtml:         (v) => v.replace(/<[^>]*>/g, ''),
  stripSpecialChars: (v) => v.replace(/[^a-zA-Z0-9\s\-_.@]/g, ''),
  numeric:           (v) => v.replace(/\D/g, ''),
  alphanumeric:      (v) => v.replace(/[^a-zA-Z0-9]/g, ''),
}

export function sanitizeValue(value: unknown, schema: FieldSchema): unknown {
  if (typeof value !== 'string') return value

  // Always strip null bytes — security baseline
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
