export enum GRStatus {
  BOOKED = 'BOOKED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

export enum PricingType {
  KM = 'KM',
  BOX = 'BOX',
  KG = 'KG',
  QUINTEL = 'QUINTEL',
  TON = 'TON',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export interface GR {
  id: string;
  userId: string;
  grNumber: string;
  bookingDate: string;
  fromCity: string;
  toCity: string;
  consignor: string;
  consignee: string;
  productDescription?: string;
  hsnCode?: string;
  weight?: number;
  boxCount?: number;
  pricingType: PricingType | string;
  rate: number;
  freightAmount: number;
  vehicleNumber: string;
  driverName?: string;
  driverMobile?: string;
  paymentStatus: PaymentStatus | string;
  status: GRStatus | string;
  remarks?: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: {
    id: string;
    name: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

export interface CreateGRInput {
  customerId?: string;
  bookingDate: string;
  fromCity: string;
  toCity: string;
  consignor: string;
  consignee: string;
  productDescription?: string;
  hsnCode?: string;
  weight?: number;
  boxCount?: number;
  pricingType: PricingType | string;
  rate: number;
  freightAmount: number;
  vehicleNumber: string;
  driverName?: string;
  driverMobile?: string;
  paymentStatus: PaymentStatus | string;
  status: GRStatus | string;
  remarks?: string;
}

export type UpdateGRInput = Partial<CreateGRInput>;

export interface BulkEditGRInput {
  status: GRStatus;
}
