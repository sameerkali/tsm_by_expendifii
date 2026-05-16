import type { FieldSchema } from './fieldSchema'

// ─── Auth / User ───────────────────────────────────────────

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

export const fullNameSchema: FieldSchema = {
  type: 'string',
  label: 'Full Name',
  required: true,
  minLength: 2,
  maxLength: 60,
  sanitize: ['trim', 'stripHtml'],
}

export const phoneSchema: FieldSchema = {
  type: 'phone',
  label: 'Phone',
  required: false,
  minLength: 10,
  maxLength: 15,
  sanitize: ['trim'],
}

export const phoneRequiredSchema: FieldSchema = {
  ...phoneSchema,
  required: true,
}

// ─── Company / Profile ─────────────────────────────────────

export const companyNameSchema: FieldSchema = {
  type: 'string',
  label: 'Company Name',
  required: false,
  maxLength: 60,
  sanitize: ['trim', 'stripHtml'],
}

export const gstinSchema: FieldSchema = {
  type: 'string',
  label: 'GSTIN',
  required: false,
  minLength: 15,
  maxLength: 15,
  pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  sanitize: ['trim', 'uppercase'],
}

export const panSchema: FieldSchema = {
  type: 'string',
  label: 'PAN',
  required: false,
  minLength: 10,
  maxLength: 10,
  pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  sanitize: ['trim', 'uppercase'],
}

export const contactPersonSchema: FieldSchema = {
  type: 'string',
  label: 'Contact Person',
  required: false,
  maxLength: 60,
  sanitize: ['trim', 'stripHtml'],
}

export const logoUrlSchema: FieldSchema = {
  type: 'url',
  label: 'Logo URL',
  required: false,
  sanitize: ['trim'],
}

// ─── Address ────────────────────────────────────────────────

export const fullAddressSchema: FieldSchema = {
  type: 'string',
  label: 'Full Address',
  required: false,
  maxLength: 200,
  sanitize: ['trim', 'stripHtml'],
}

export const citySchema: FieldSchema = {
  type: 'string',
  label: 'City',
  required: false,
  maxLength: 50,
  sanitize: ['trim', 'stripHtml'],
}

export const districtSchema: FieldSchema = {
  type: 'string',
  label: 'District',
  required: false,
  maxLength: 50,
  sanitize: ['trim', 'stripHtml'],
}

export const stateSchema: FieldSchema = {
  type: 'string',
  label: 'State',
  required: false,
  maxLength: 50,
  sanitize: ['trim', 'stripHtml'],
}

export const pincodeSchema: FieldSchema = {
  type: 'string',
  label: 'Pincode',
  required: false,
  minLength: 6,
  maxLength: 6,
  pattern: /^\d{6}$/,
  sanitize: ['trim', 'numeric'],
}

// ─── Bank Details ───────────────────────────────────────────

export const bankNameSchema: FieldSchema = {
  type: 'string',
  label: 'Bank Name',
  required: false,
  maxLength: 80,
  sanitize: ['trim', 'stripHtml'],
}

export const accountHolderSchema: FieldSchema = {
  type: 'string',
  label: 'Account Holder',
  required: false,
  maxLength: 80,
  sanitize: ['trim', 'stripHtml'],
}

export const accountNumberSchema: FieldSchema = {
  type: 'string',
  label: 'Account Number',
  required: false,
  minLength: 9,
  maxLength: 18,
  pattern: /^\d{9,18}$/,
  sanitize: ['trim', 'numeric'],
}

export const ifscSchema: FieldSchema = {
  type: 'string',
  label: 'IFSC Code',
  required: false,
  minLength: 11,
  maxLength: 11,
  pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  sanitize: ['trim', 'uppercase'],
}

// ─── GR (Goods Receipt) ────────────────────────────────────

export const grConsignorSchema: FieldSchema = {
  type: 'string',
  label: 'Consignor',
  required: true,
  maxLength: 60,
  allowedChars: /^[a-zA-Z0-9\s.\-'&]+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const grConsigneeSchema: FieldSchema = {
  type: 'string',
  label: 'Consignee',
  required: false,
  maxLength: 60,
  allowedChars: /^[a-zA-Z0-9\s.\-'&]+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const grCitySchema: FieldSchema = {
  type: 'string',
  label: 'City',
  required: true,
  maxLength: 60,
  allowedChars: /^[a-zA-Z0-9\s.\-']+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const vehicleNumberSchema: FieldSchema = {
  type: 'string',
  label: 'Vehicle Number',
  required: false,
  maxLength: 15,
  sanitize: ['trim', 'uppercase', 'stripSpecialChars'],
}

export const grDescriptionSchema: FieldSchema = {
  type: 'string',
  label: 'Description',
  required: false,
  maxLength: 300,
  allowedChars: /^[a-zA-Z0-9\s,.\-/#()&]+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const grRemarksSchema: FieldSchema = {
  type: 'string',
  label: 'Remarks',
  required: false,
  maxLength: 300,
  allowedChars: /^[a-zA-Z0-9\s,.\-/#()&]+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const driverNameSchema: FieldSchema = {
  type: 'string',
  label: 'Driver Name',
  required: false,
  maxLength: 60,
  allowedChars: /^[a-zA-Z\s.\-']+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const grWeightSchema: FieldSchema = {
  type: 'number',
  label: 'Weight',
  required: false,
  min: 0,
  max: 9999999,
  precision: 2,
}

export const grQuantitySchema: FieldSchema = {
  type: 'number',
  label: 'Quantity',
  required: false,
  min: 0,
  max: 9999999,
  integer: true,
}

export const grRateSchema: FieldSchema = {
  type: 'number',
  label: 'Rate',
  required: false,
  min: 0,
  max: 9999999,
  precision: 2,
}

export const grInvoiceNumberSchema: FieldSchema = {
  type: 'string',
  label: 'Invoice Number',
  required: false,
  maxLength: 60,
  allowedChars: /^[a-zA-Z0-9\s\-/]+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const grInsuranceAmountSchema: FieldSchema = {
  type: 'number',
  label: 'Insurance Amount',
  required: false,
  min: 0,
  max: 9999999,
  precision: 2,
}

export const grFreightSchema: FieldSchema = {
  type: 'number',
  label: 'Freight Amount',
  required: false,
  min: 0,
  max: 99999999,
  precision: 2,
}

// ─── Customer ───────────────────────────────────────────────

export const customerNameSchema: FieldSchema = {
  type: 'string',
  label: 'Customer Name',
  required: true,
  minLength: 2,
  maxLength: 60,
  sanitize: ['trim', 'stripHtml'],
}

export const customerPhoneSchema: FieldSchema = {
  type: 'string',
  label: 'Phone',
  required: true,
  minLength: 10,
  maxLength: 10,
  pattern: /^\d{10}$/,
  sanitize: ['trim', 'numeric'],
}

export const customerEmailSchema: FieldSchema = {
  type: 'email',
  label: 'Email',
  required: false,
  maxLength: 254,
  sanitize: ['trim', 'lowercase'],
}

export const customerGstinSchema: FieldSchema = {
  type: 'string',
  label: 'GSTIN',
  required: false,
  minLength: 15,
  maxLength: 15,
  pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  sanitize: ['trim', 'uppercase'],
}

export const customerAddressSchema: FieldSchema = {
  type: 'string',
  label: 'Address',
  required: false,
  maxLength: 300,
  allowedChars: /^[a-zA-Z0-9\s,.\-/#()]+$/,
  sanitize: ['trim', 'stripHtml'],
}

export const customerCitySchema: FieldSchema = {
  type: 'string',
  label: 'City',
  required: false,
  maxLength: 50,
  sanitize: ['trim', 'stripHtml'],
}

export const customerPincodeSchema: FieldSchema = {
  type: 'string',
  label: 'Pincode',
  required: false,
  minLength: 6,
  maxLength: 6,
  pattern: /^\d{6}$/,
  sanitize: ['trim', 'numeric'],
}

export const defaultRateSchema: FieldSchema = {
  type: 'number',
  label: 'Default Rate',
  required: false,
  min: 0,
  max: 9999999,
  precision: 2,
}

// ─── Coupon ─────────────────────────────────────────────────

export const couponCodeSchema: FieldSchema = {
  type: 'string',
  label: 'Coupon Code',
  required: true,
  minLength: 4,
  maxLength: 20,
  sanitize: ['trim', 'uppercase', 'alphanumeric'],
}

export const couponDaysSchema: FieldSchema = {
  type: 'number',
  label: 'Duration (days)',
  required: true,
  min: 1,
  max: 3650,
  integer: true,
}
