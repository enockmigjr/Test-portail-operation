import apiClient from './api-client';
import type { Customer, CustomerDetailsData } from '@/types/customer';
import type { PaginatedResponse, CustomerFilters } from '@/types/api';

export const customersService = {
  // Récupérer la liste paginée et filtrée des clients
  async getCustomers(filters: CustomerFilters): Promise<PaginatedResponse<Customer>> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.region && filters.region !== 'all') params.append('region', filters.region);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await apiClient.get<PaginatedResponse<Customer>>(`/customers?${params.toString()}`);
    return response.data;
  },

  // Récupérer les détails d'un client par son ID
  async getCustomerById(id: string): Promise<CustomerDetailsData> {
    const response = await apiClient.get<CustomerDetailsData>(`/customers/${id}`);
    return response.data;
  },

  // Exécuter une action opérationnelle (activate, suspend, reopen, archive)
  async performAction(
    id: string,
    action: 'activate' | 'suspend' | 'reopen' | 'archive',
    reason?: string,
    agentName = 'Agent Support #1'
  ): Promise<Customer> {
    const response = await apiClient.patch<Customer>(`/customers/${id}/action`, {
      action,
      reason,
      agentName,
    });
    return response.data;
  },
};

export default customersService;
