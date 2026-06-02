import type { CustomerStatus } from './customer';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus | 'all';
  region?: string | 'all';
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
