import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  gstin: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  defaultRate: z.number().optional(),
});

export const UpdateCustomerSchema = CreateCustomerSchema.partial();
