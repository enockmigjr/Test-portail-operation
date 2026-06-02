import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/stats.service';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: statsService.getDashboardStats,
  });
}

export default useDashboardStats;
