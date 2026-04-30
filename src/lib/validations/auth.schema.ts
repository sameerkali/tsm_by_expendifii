import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.object({
    companyName: z.string().min(1, 'Company name is required'),
    gstin: z.string().min(1, 'GSTIN is required'),
    pan: z.string().min(1, 'PAN is required'),
    phone: z.string().min(10, 'Company phone is required'),
    email: z.string().email('Company email is required'),
    contactPerson: z.string().min(1, 'Contact person is required'),
    address: z.object({
      fullAddress: z.string().min(1, 'Full address is required'),
      city: z.string().min(1, 'City is required'),
      district: z.string().min(1, 'District is required'),
      state: z.string().min(1, 'State is required'),
      pincode: z.string().min(1, 'Pincode is required'),
    })
  })
});

export const ActivateSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ActivateInput = z.infer<typeof ActivateSchema>;

