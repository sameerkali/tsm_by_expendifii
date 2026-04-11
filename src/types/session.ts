export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface SessionPayload {
  companyId: string;
  userId: string;
  status: AccountStatus;
  exp: number;
}
