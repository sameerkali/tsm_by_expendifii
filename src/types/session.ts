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

export interface SessionPayload {
  companyId: string;
  userId: string;
  status: AccountStatus;
  exp: number;
}
