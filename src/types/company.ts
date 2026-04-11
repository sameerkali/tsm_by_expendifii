export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  gstin: string;
  logoUrl?: string;
  status: CompanyStatus;
  createdAt: string;
  updatedAt: string;
}

export type UpdateCompanyInput = Partial<Omit<Company, 'id' | 'email' | 'gstin' | 'status' | 'createdAt' | 'updatedAt'>>;
