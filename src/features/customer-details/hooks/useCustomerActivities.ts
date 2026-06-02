import { useQuery } from '@tanstack/react-query';
import { activitiesService } from '@/services/activities.service';

export function useCustomerActivities(customerId: string) {
  return useQuery({
    queryKey: ['customers', 'activities', customerId],
    queryFn: () => activitiesService.getCustomerActivities(customerId),
    enabled: !!customerId,
  });
}
export default useCustomerActivities;
