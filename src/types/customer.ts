export interface Customer {
  id: string;
  name: string;
  mobile: string;
  gstin?: string;
  address: string;
  defaultRate?: number;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateCustomerInput = Omit<Customer, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>;

export type UpdateCustomerInput = Partial<CreateCustomerInput>;
