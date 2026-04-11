export enum GRStatus {
  PENDING = 'PENDING',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PricingType {
  PRICE_BY_WEIGHT = 'PRICE_BY_WEIGHT',
  PRICE_BY_BOX = 'PRICE_BY_BOX',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
}

export interface GR {
  grNumber: string;
  bookingDate: string;
  consignorName: string;
  consigneeName: string;
  fromLocation: string;
  toLocation: string;
  vehicleNumber: string;
  driverName?: string;
  driverMobile?: string;
  pricingType: PricingType;
  rate: number;
  weight?: number;
  boxCount?: number;
  freightAmount: number;
  status: GRStatus;
  paymentStatus: PaymentStatus;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateGRInput = Omit<GR, 'grNumber' | 'companyId' | 'createdAt' | 'updatedAt'>;

export type UpdateGRInput = Partial<CreateGRInput>;

export interface BulkEditGRInput {
  vehicleNumber?: string;
  driverName?: string;
  status?: GRStatus;
}
