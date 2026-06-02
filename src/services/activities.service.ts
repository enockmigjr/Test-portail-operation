import apiClient from './api-client';
import type { Activity } from '@/types/activity';

export const activitiesService = {
  // Récupérer l'historique des activités pour un client spécifique
  async getCustomerActivities(customerId: string): Promise<Activity[]> {
    const response = await apiClient.get<Activity[]>(`/customers/${customerId}/activities`);
    return response.data;
  },
};

export default activitiesService;
