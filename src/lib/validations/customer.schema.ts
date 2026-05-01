import { z } from 'zod';

export const PRICING_TYPE_OPTIONS = [
  { value: 'KM', label: 'Per KM' },
  { value: 'BOX', label: 'Per Box' },
  { value: 'KG', label: 'Per KG' },
  { value: 'QUINTEL', label: 'Per Quintal' },
  { value: 'TON', label: 'Per Ton' },
] as const;

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
] as const;

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  gstin: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  pincode: z.string().optional().or(z.literal('')),
  pricingType: z.enum(['KM', 'BOX', 'KG', 'QUINTEL', 'TON']).optional(),
  defaultRate: z.number().min(0, 'Rate must be positive').optional(),
});

export type CreateCustomerFormValues = z.infer<typeof CreateCustomerSchema>;

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

export type UpdateCustomerFormValues = z.infer<typeof UpdateCustomerSchema>;
