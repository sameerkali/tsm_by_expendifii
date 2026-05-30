export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  status?: number;
  field?: string;
  code?: string | number;
  errors?: Record<string, string[]> | Array<{ field: string; message: string; code?: string; kind?: string }>;
  details?: Array<{ field: string; message: string; code?: string; kind?: string }>;
  debug?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
