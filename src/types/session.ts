export type AccountStatus = 'ACTIVE' | 'INACTIVE';

export interface CompanyAddress {
  fullAddress: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

export interface Company {
  companyName: string;
  gstin: string;
  pan: string;
  phone: string;
  email: string;
  contactPerson: string;
  logoUrl?: string;
  grCounter: number;
  address: CompanyAddress;
}

export interface Coupon {
  _id: string;
  code: string;
  durationDays: number;
  startDate: string;
  expiresAt: string;
  isActive: boolean;
  isUsed: boolean;
  isExpired: boolean;
  usedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  isActive: boolean;
  accountStatus: AccountStatus;
  isDeleted: boolean;
  createdAt: string;
  company: Company;
  coupons: Coupon[];
  _count?: {
    coupons: number;
    customers: number;
    gRs: number;
  };
}

export interface AuthResponse {
  user: User;
  accountStatus: AccountStatus;
}

/** Profile data is the flat user object containing company and coupons arrays */
export type ProfileData = User;

export interface SessionPayload {
  companyId: string;
  userId: string;
  status: AccountStatus;
  exp: number;
}
