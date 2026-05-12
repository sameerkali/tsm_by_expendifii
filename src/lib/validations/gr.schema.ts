import { z } from 'zod';
import { BillingType, GRStatus, PricingType, PaymentStatus } from '@/types/gr';

const insuranceSchema = z.object({
  company: z.string().optional(),
  policyNo: z.string().optional(),
  date: z.string().optional(),
  amount: z.number().positive('Insurance amount must be positive').optional(),
  risk: z.string().optional(),
}).optional().nullable();

export const CreateGRSchema = z.object({
  customerId: z.string().optional(),
  bookingDate: z.string().min(1, 'Booking date is required'),
  fromCity: z.string().min(1, 'From city is required'),
  toCity: z.string().min(1, 'To city is required'),
  consignor: z.string().min(1, 'Consignor is required'),
  consignorGST: z.string().optional(),
  consignee: z.string().min(1, 'Consignee is required'),
  consigneeGST: z.string().optional(),
  productDescription: z.string().optional(),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  driverName: z.string().optional(),
  driverDocumentId: z.string().optional(),
  driverMobile: z.string().optional(),
  billingType: z.nativeEnum(BillingType).default(BillingType.TO_PAID),
  pricingType: z.nativeEnum(PricingType),
  rate: z.number().min(0, 'Rate must be positive'),
  weight: z.number().optional(),
  boxCount: z.number().optional(),
  freightAmount: z.number().min(0, 'Freight amount must be positive'),
  status: z.nativeEnum(GRStatus).default(GRStatus.BOOKED),
  paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.PENDING),
  invoiceNumber: z.string().optional().nullable(),
  ewayBillNumber: z.string().optional().nullable(),
  insurance: insuranceSchema,
  remarks: z.string().optional(),
}).refine((data) => {
  if (data.pricingType === PricingType.KG) {
    return data.weight !== undefined && data.weight > 0;
  }
  return true;
}, {
  message: 'Weight is required when pricing by KG',
  path: ['weight'],
}).refine((data) => {
  if (data.pricingType === PricingType.BOX) {
    return data.boxCount !== undefined && data.boxCount > 0;
  }
  return true;
}, {
  message: 'Box count is required when pricing by box',
  path: ['boxCount'],
});

export const UpdateGRSchema = CreateGRSchema.partial();

export const BulkEditGRSchema = z.object({
  status: z.nativeEnum(GRStatus).optional(),
});
