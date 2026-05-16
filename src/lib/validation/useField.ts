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
  validate: () => boolean
}

export function useField(schema: FieldSchema, initialValue: unknown = ''): UseFieldReturn {
  const [state, setState] = useState<FieldState>({
    value: initialValue,
    error: null,
    touched: false,
  })

  const onChange = useCallback(
    (raw: unknown) => {
      const cleaned = sanitizeValue(raw, schema)
      setState((prev) => ({
        ...prev,
        value: cleaned,
        error: prev.touched ? validateValue(cleaned, schema) : null,
      }))
    },
    [schema]
  )

  const onBlur = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: validateValue(prev.value, schema),
      touched: true,
    }))
  }, [schema])

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
