export type AccountStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string;
  email: string;
  name: string;
  companyName: string;
  role: 'CUSTOMER';
}

export interface AuthResponse {
  user: User;
  accountStatus: AccountStatus;
}

/** Shape of the /auth/profile response data field */
export interface ProfileUser extends User {
  phone?: string;
  isActive: boolean;
  accountStatus: AccountStatus;
  createdAt: string;
}

export interface Coupon {
  code: string;
  endDate: string;
  durationDays: number;
}

export interface ProfileData {
  user: ProfileUser;
  coupon: Coupon | null;
}

export interface SessionPayload {
  companyId: string;
  userId: string;
  status: AccountStatus;
  exp: number;
}
