import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ActivateSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type ActivateInput = z.infer<typeof ActivateSchema>;
