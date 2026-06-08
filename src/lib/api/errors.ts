import type { ApiError } from '@/types/api';

type ErrorContext = 'auth' | 'gr' | 'customer' | 'print' | 'general';

const FIELD_LABELS: Record<string, string> = {
  accountStatus: 'Account status',
  address: 'Address',
  bookingDate: 'Booking date',
  boxCount: 'Box count',
  city: 'City',
  companyName: 'Company name',
  consignee: 'Consignee',
  consignor: 'Consignor',
  customerId: 'Customer',
  defaultRate: 'Default rate',
  driverMobile: 'Driver mobile',
  driverName: 'Driver name',
  email: 'Email',
  field: 'Field',
  freightAmount: 'Freight amount',
  from: 'From date',
  fromCity: 'From city',
  grNumber: 'GR number',
  gstin: 'GSTIN',
  hsnCode: 'HSN code',
  limit: 'Rows per page',
  name: 'Name',
  page: 'Page',
  pan: 'PAN',
  password: 'Password',
  phone: 'Phone number',
  pincode: 'Pincode',
  pricingType: 'Pricing type',
  productDescription: 'Product description',
  rate: 'Rate',
  state: 'State',
  status: 'Status',
  to: 'To date',
  toCity: 'To city',
  vehicleNumber: 'Vehicle number',
  weight: 'Weight',
};

const GENERIC_MESSAGES: Record<number, string> = {
  400: 'Please check the highlighted information and try again.',
  401: 'Your session has expired. Please log in again.',
  403: 'You do not have permission to perform this action.',
  404: 'We could not find the requested record.',
  409: 'This record already exists. Please check the details and try again.',
  413: 'The request is too large. Please reduce the file or data size and try again.',
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Something went wrong on our side. Please try again shortly.',
  503: 'The service is temporarily unavailable. Please try again shortly.',
};

const CONTEXT_FALLBACKS: Record<ErrorContext, string> = {
  auth: 'Authentication failed. Please check your details and try again.',
  gr: 'Could not complete the GR action. Please try again.',
  customer: 'Could not complete the customer action. Please try again.',
  print: 'Could not prepare the print document. Please try again.',
  general: 'Something went wrong. Please try again.',
};

function isApiError(error: unknown): error is ApiError {
  return !!error && typeof error === 'object' && 'success' in error;
}

export function getFieldLabel(field?: string): string {
  if (!field) return 'Field';
  return FIELD_LABELS[field] ?? FIELD_LABELS[field.split('.').pop() ?? ''] ?? field;
}

function cleanDetailMessage(message: string): string {
  if (!message) return 'is invalid';
  if (message.includes('Too small')) return 'must be greater than 0';
  if (message.includes('Invalid format')) return 'has an invalid format';
  if (message.toLowerCase().includes('required')) return 'is required';
  return message;
}

function formatDetails(details: ApiError['details']): string | null {
  if (!Array.isArray(details) || details.length === 0) return null;

  return details
    .slice(0, 3)
    .map((detail) => `${getFieldLabel(detail.field)} ${cleanDetailMessage(detail.message)}`)
    .join(' • ');
}

function makeDuplicateMessage(error: ApiError): string | null {
  if (error.status !== 409) return null;
  const label = getFieldLabel(error.field);
  return `${label} already exists. Please use a different ${label.toLowerCase()}.`;
}

function makeAuthMessage(message: string, status?: number): string | null {
  const lower = message.toLowerCase();

  if (lower.includes('authentication required') || lower.includes('please login')) {
    return 'please login and active after that';
  }
  if (lower.includes('invalid or already used coupon')) {
    return 'wrong coupon';
  }
  if (lower.includes('expired')) return 'Your session has expired. Please log in again.';
  if (lower.includes('invalid token')) return 'Your login session is invalid. Please log in again.';
  if (lower.includes('coupon')) return message;
  if (status === 401) return 'Invalid email or password. Please try again.';
  if (status === 409) return message;

  return null;
}

export function getApiErrorMessage(
  error: unknown,
  fallback?: string,
  context: ErrorContext = 'general',
): string {
  if (!isApiError(error)) {
    return fallback ?? CONTEXT_FALLBACKS[context];
  }

  const detailMessage = formatDetails(error.details);
  if (detailMessage) return detailMessage;

  const duplicateMessage = makeDuplicateMessage(error);
  if (duplicateMessage) return duplicateMessage;

  const message = error.message || error.error || '';

  if (context === 'auth') {
    const authMessage = makeAuthMessage(message, error.status);
    if (authMessage) return authMessage;
  }

  if (message && message !== 'Internal server error') return message;
  if (error.status) {
    const statusMessage = GENERIC_MESSAGES[error.status];
    if (statusMessage) return statusMessage;
  }

  return fallback ?? CONTEXT_FALLBACKS[context];
}

export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (!isApiError(error)) return {};

  const mapped: Record<string, string> = {};

  if (error.field) {
    mapped[error.field] = getApiErrorMessage(error);
  }

  if (Array.isArray(error.details)) {
    error.details.forEach((detail) => {
      mapped[detail.field] = cleanDetailMessage(detail.message);
    });
  }

  if (Array.isArray(error.errors)) {
    error.errors.forEach((detail) => {
      mapped[detail.field] = cleanDetailMessage(detail.message);
    });
  } else if (error.errors && typeof error.errors === 'object') {
    Object.entries(error.errors).forEach(([field, messages]) => {
      mapped[field] = Array.isArray(messages) ? messages.join(', ') : String(messages);
    });
  }

  return mapped;
}
