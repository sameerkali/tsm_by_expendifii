export type PricingType = 'KM' | 'BOX' | 'KG' | 'QUINTEL' | 'TON';

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email?: string;
  phone: string;
  gstin?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pricingType: PricingType | null;
  defaultRate?: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerListResponse {
  success: boolean;
  data: Customer[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
  };
}

export interface CustomerResponse {
  success: boolean;
  data: Customer;
}

export interface CustomerDeleteResponse {
  success: boolean;
  message: string;
}

export interface CreateCustomerInput {
  name: string;
  phone: string;
  email?: string;
  gstin?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pricingType?: PricingType;
  defaultRate?: number;
}

export type UpdateCustomerInput = Partial<CreateCustomerInput>;
