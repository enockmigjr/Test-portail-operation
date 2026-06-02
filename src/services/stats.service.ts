import apiClient from './api-client';
import type { DashboardStats } from '@/types/stats';

export const statsService = {
  // Récupérer les statistiques globales du dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
};

export default statsService;
