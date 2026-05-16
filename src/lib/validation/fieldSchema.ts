export type FieldType = 'string' | 'number' | 'boolean' | 'email' | 'phone' | 'url'

export type SanitizeRule =
  | 'trim'
  | 'lowercase'
  | 'uppercase'
  | 'stripHtml'
  | 'stripSpecialChars'
  | 'numeric'
  | 'alphanumeric'

export interface FieldSchema {
  type: FieldType
  required?: boolean
  label?: string

  // string / email / phone / url
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  allowedChars?: RegExp
  sanitize?: SanitizeRule[]

  // number
  min?: number
  max?: number
  integer?: boolean
  precision?: number

  // boolean
  mustBeTrue?: boolean

  // escape hatch
  custom?: (value: unknown) => string | null
}
