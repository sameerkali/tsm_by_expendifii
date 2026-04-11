import { z } from 'zod';
import { GRStatus, PricingType, PaymentStatus } from '@/types/gr';

export const CreateGRSchema = z.object({
  bookingDate: z.string().min(1, 'Booking date is required'),
  consignorName: z.string().min(1, 'Consignor name is required'),
  consigneeName: z.string().min(1, 'Consignee name is required'),
  fromLocation: z.string().min(1, 'From location is required'),
  toLocation: z.string().min(1, 'To location is required'),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  driverName: z.string().optional(),
  driverMobile: z.string().optional(),
  pricingType: z.nativeEnum(PricingType),
  rate: z.number().min(0, 'Rate must be positive'),
  weight: z.number().optional(),
  boxCount: z.number().optional(),
  status: z.nativeEnum(GRStatus).default(GRStatus.PENDING),
  paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.UNPAID),
}).refine((data) => {
  if (data.pricingType === PricingType.PRICE_BY_WEIGHT) {
    return data.weight !== undefined && data.weight > 0;
  }
  return true;
}, {
  message: 'Weight is required when pricing by weight',
  path: ['weight'],
}).refine((data) => {
  if (data.pricingType === PricingType.PRICE_BY_BOX) {
    return data.boxCount !== undefined && data.boxCount > 0;
  }
  return true;
}, {
  message: 'Box count is required when pricing by box',
  path: ['boxCount'],
});

export const UpdateGRSchema = CreateGRSchema.partial();

export const BulkEditGRSchema = z.object({
  vehicleNumber: z.string().optional(),
  driverName: z.string().optional(),
  status: z.nativeEnum(GRStatus).optional(),
});
