import type { FieldSchema } from './fieldSchema';

const str = (label: string, req = false, max = 60, opts: Partial<FieldSchema> = {}): FieldSchema => ({
  type: 'string', label, required: req, maxLength: max, sanitize: ['trim', 'stripHtml'], ...opts,
});
const num = (label: string, req = true, opts: Partial<FieldSchema> = {}): FieldSchema => ({
  type: 'number', label, required: req, min: 0, max: 9999999, precision: 2, ...opts,
});

// Auth / User
export const emailSchema: FieldSchema = { type: 'email', label: 'Email', required: true, maxLength: 254, sanitize: ['trim', 'lowercase'] };
export const passwordSchema: FieldSchema = str('Password', true, 128, { minLength: 8, sanitize: [] });
export const fullNameSchema: FieldSchema = str('Full Name', true, 60, { minLength: 2 });
export const phoneSchema: FieldSchema = { type: 'phone', label: 'Phone', required: false, minLength: 10, maxLength: 15, sanitize: ['trim'] };
export const phoneRequiredSchema: FieldSchema = { ...phoneSchema, required: true };

// Company / Profile
export const companyNameSchema = str('Company Name');
export const gstinSchema: FieldSchema = str('GSTIN', false, 15, { minLength: 15, pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, sanitize: ['trim', 'uppercase'] });
export const panSchema: FieldSchema = str('PAN', false, 10, { minLength: 10, pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, sanitize: ['trim', 'uppercase'] });
export const contactPersonSchema = str('Contact Person');
export const logoUrlSchema: FieldSchema = { type: 'url', label: 'Logo URL', required: false, sanitize: ['trim'] };

// Address
export const fullAddressSchema = str('Full Address', false, 200);
export const citySchema = str('City', false, 50);
export const districtSchema = str('District', false, 50);
export const stateSchema = str('State', false, 50);
export const pincodeSchema: FieldSchema = str('Pincode', false, 6, { minLength: 6, pattern: /^\d{6}$/, sanitize: ['trim', 'numeric'] });

// Bank Details
export const bankNameSchema = str('Bank Name', false, 80);
export const accountHolderSchema = str('Account Holder', false, 80);
export const accountNumberSchema: FieldSchema = str('Account Number', false, 18, { minLength: 9, pattern: /^\d{9,18}$/, sanitize: ['trim', 'numeric'] });
export const ifscSchema: FieldSchema = str('IFSC Code', false, 11, { minLength: 11, pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, sanitize: ['trim', 'uppercase'] });

// GR (Goods Receipt)
const grStr = (label: string, req = false, max = 60, chars = /^[a-zA-Z0-9\s.\-'&]+$/) => str(label, req, max, { allowedChars: chars });
export const grConsignorSchema = grStr('Consignor', true);
export const grConsigneeSchema = grStr('Consignee');
export const grCitySchema = grStr('City', true, 60, /^[a-zA-Z0-9\s.\-']+$/);
export const vehicleNumberSchema = str('Vehicle Number', false, 15, { sanitize: ['trim', 'uppercase', 'stripSpecialChars'] });
export const grDescriptionSchema = grStr('Description', false, 300, /^[a-zA-Z0-9\s,.\-/#()&]+$/);
export const grRemarksSchema = grStr('Remarks', false, 300, /^[a-zA-Z0-9\s,.\-/#()&]+$/);
export const driverNameSchema = grStr('Driver Name', false, 60, /^[a-zA-Z\s.\-']+$/);
export const grWeightSchema = num('Weight');
export const grQuantitySchema = num('Quantity', true, { integer: true, precision: undefined });
export const grRateSchema = num('Rate');
export const grInvoiceNumberSchema = grStr('Invoice Number', false, 60, /^[a-zA-Z0-9\s\-/]+$/);
export const grInsuranceAmountSchema = num('Insurance Amount', false);
export const grFreightSchema = num('Freight Amount', false, { max: 99999999 });

// Customer
export const customerNameSchema = str('Customer Name', true, 60, { minLength: 2 });
export const customerPhoneSchema: FieldSchema = str('Phone', true, 10, { minLength: 10, pattern: /^\d{10}$/, sanitize: ['trim', 'numeric'] });
export const customerEmailSchema: FieldSchema = { type: 'email', label: 'Email', required: false, maxLength: 254, sanitize: ['trim', 'lowercase'] };
export const customerGstinSchema = gstinSchema;
export const customerAddressSchema = grStr('Address', false, 300, /^[a-zA-Z0-9\s,.\-/#()]+$/);
export const customerCitySchema = citySchema;
export const customerPincodeSchema = pincodeSchema;
export const defaultRateSchema = num('Default Rate', false);

// Coupon
export const couponCodeSchema: FieldSchema = str('Coupon Code', true, 20, { minLength: 4, sanitize: ['trim', 'uppercase', 'alphanumeric'] });
export const couponDaysSchema: FieldSchema = num('Duration (days)', true, { min: 1, max: 3650, integer: true, precision: undefined });
