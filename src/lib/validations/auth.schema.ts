import { z } from 'zod';

/** Block <script> tags and event-handler injections in any string field */
const noScript = (val: string) => {
  const lower = val.toLowerCase();
  if (/<script[\s>]/i.test(val)) return false;
  if (/on\w+\s*=/i.test(lower)) return false;
  if (/javascript:/i.test(lower)) return false;
  return true;
};

const safeString = (label: string, max: number) =>
  z
    .string()
    .max(max, `${label} cannot exceed ${max} characters`)
    .refine(noScript, { message: `${label} contains disallowed content` });

const safeStringRequired = (label: string, max: number) =>
  z
    .string()
    .min(1, `${label} is required`)
    .max(max, `${label} cannot exceed ${max} characters`)
    .refine(noScript, { message: `${label} contains disallowed content` });

const safeStringOptional = (label: string, max: number) =>
  z
    .string()
    .max(max, `${label} cannot exceed ${max} characters`)
    .refine(noScript, { message: `${label} contains disallowed content` })
    .optional()
    .or(z.literal(''));

/** Exactly 10-digit phone */
const phone10 = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .regex(/^\d{10}$/, `${label} must be exactly 10 digits`);

const phone10Optional = (label: string) =>
  z
    .string()
    .regex(/^\d{10}$/, `${label} must be exactly 10 digits`)
    .optional()
    .or(z.literal(''));

/** PAN: ABCDE1234F */
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

/** GSTIN: 22AAAAA0000A1Z5 */
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// ─── Login ──────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(254, 'Email is too long')
    .refine(noScript, { message: 'Email contains disallowed content' }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password cannot exceed 30 characters'),
});

// ─── Register ───────────────────────────────────────────────

export const RegisterSchema = z.object({
  name: safeStringRequired('Full Name', 60),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(254, 'Email is too long')
    .refine(noScript, { message: 'Email contains disallowed content' }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password cannot exceed 30 characters'),
  phone: phone10('Phone'),
  referral: z
    .string()
    .max(10, 'Referral code cannot exceed 10 characters')
    .optional()
    .or(z.literal('')),
  company: z.object({
    companyName: safeStringRequired('Company Name', 60),
    gstin: z
      .string()
      .transform((v) => v.toUpperCase().trim())
      .pipe(
        z
          .string()
          .regex(gstinRegex, 'GSTIN format is invalid (e.g. 22AAAAA0000A1Z5)')
          .or(z.literal(''))
      )
      .optional()
      .or(z.literal('')),
    pan: z
      .string()
      .transform((v) => v.toUpperCase().trim())
      .pipe(
        z
          .string()
          .regex(panRegex, 'PAN format is invalid (e.g. ABCDE1234F)')
          .or(z.literal(''))
      )
      .optional()
      .or(z.literal('')),
    phone: phone10Optional('Company Phone'),
    email: z
      .string()
      .email('Company email must be valid')
      .max(254, 'Email is too long')
      .refine(noScript, { message: 'Email contains disallowed content' })
      .optional()
      .or(z.literal('')),
    contactPerson: safeStringOptional('Contact Person', 60),
    address: z.object({
      fullAddress: safeStringOptional('Full Address', 200),
      city: safeStringOptional('City', 60),
      district: safeStringOptional('District', 60),
      state: safeStringOptional('State', 60),
      pincode: z
        .string()
        .regex(/^\d{6}$/, 'Pincode must be exactly 6 digits')
        .optional()
        .or(z.literal('')),
    }).optional(),
    bankDetails: z
      .object({
        bankName: safeStringOptional('Bank Name', 80),
        accountHolder: z
          .string()
          .max(80, 'Account Holder cannot exceed 80 characters')
          .optional()
          .or(z.literal('')),
        accountNumber: z
          .string()
          .regex(/^\d{9,18}$/, 'Account number must be 9-18 digits')
          .optional()
          .or(z.literal('')),
        ifscCode: z
          .string()
          .transform((v) => v.toUpperCase().trim())
          .pipe(
            z
              .string()
              .regex(
                /^[A-Z]{4}0[A-Z0-9]{6}$/,
                'IFSC format is invalid (e.g. SBIN0001234)'
              )
              .or(z.literal(''))
          )
          .optional()
          .or(z.literal('')),
      })
      .optional(),
  }),
});

export const ActivateSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ActivateInput = z.infer<typeof ActivateSchema>;
