export enum GRStatus {
  BOOKED = 'BOOKED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

export enum PricingType {
  KM = 'KM',
  BOX = 'BOX',
  KG = 'KG',
  QUINTAL = 'QUINTAL',
  TON = 'TON',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export enum BillingType {
  TO_BE_BILLED = 'TO_BE_BILLED',
  PAID = 'PAID',
  TO_PAID = 'TO_PAID',
}

export interface GRInsurance {
  company?: string;
  policyNo?: string;
  date?: string;
  amount?: number;
  risk?: string;
}

export interface GR {
  id: string;
  userId: string;
  grNumber: string;
  bookingDate: string;
  fromCity: string;
  toCity: string;
  consignor: string;
  consignorGST?: string;
  consignee: string;
  consigneeGST?: string;
  productDescription?: string;
  weight?: number;
  boxCount?: number;
  billingType: BillingType | string;
  pricingType: PricingType | string;
  rate?: number;
  freightAmount: number;
  vehicleNumber?: string;
  driverName?: string;
  driverDocumentId?: string;
  driverMobile?: string;
  paymentStatus: PaymentStatus | string;
  status: GRStatus | string;
  invoiceNumber?: string | null;
  ewayBillNumber?: string | null;
  insurance?: GRInsurance | null;
  remarks?: string;
  value?: string;
  gstPaidBy?: string;
  shipTo?: string;
  doorDelivery?: boolean;
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
  bookingDate?: string;
  fromCity?: string;
  toCity?: string;
  consignor?: string;
  consignorGST?: string;
  consignee?: string;
  consigneeGST?: string;
  productDescription?: string;
  weight?: number;
  boxCount?: number;
  billingType?: BillingType | string;
  pricingType?: PricingType | string;
  rate?: number;
  freightAmount?: number;
  vehicleNumber?: string;
  driverName?: string;
  driverDocumentId?: string;
  driverMobile?: string;
  paymentStatus?: PaymentStatus | string;
  status?: GRStatus | string;
  invoiceNumber?: string | null;
  ewayBillNumber?: string | null;
  insurance?: GRInsurance | null;
  remarks?: string;
  value?: string;
  gstPaidBy?: string;
  shipTo?: string;
  doorDelivery?: boolean;
}

export type UpdateGRInput = Partial<CreateGRInput>;

export interface BulkEditGRInput {
  status: GRStatus;
}
