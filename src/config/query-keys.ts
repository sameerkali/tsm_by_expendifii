export const GR_KEYS = {
  all: ['gr'] as const,
  lists: () => [...GR_KEYS.all, 'list'] as const,
  list: (search?: string) => [...GR_KEYS.lists(), { search }] as const,
  details: () => [...GR_KEYS.all, 'detail'] as const,
  detail: (grNumber: string) => [...GR_KEYS.details(), grNumber] as const,
};

export const CUSTOMER_KEYS = {
  all: ['customer'] as const,
  lists: () => [...CUSTOMER_KEYS.all, 'list'] as const,
  list: (search?: string) => [...CUSTOMER_KEYS.lists(), { search }] as const,
  details: () => [...CUSTOMER_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CUSTOMER_KEYS.details(), id] as const,
};

export const COMPANY_KEYS = {
  all: ['company'] as const,
  profile: () => [...COMPANY_KEYS.all, 'profile'] as const,
};
