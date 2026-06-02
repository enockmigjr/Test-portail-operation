import { useQuery } from '@tanstack/react-query';
import { customersService } from '@/services/customers.service';

export function useCustomerDetails(customerId: string) {
  return useQuery({
    queryKey: ['customers', 'detail', customerId],
    queryFn: () => customersService.getCustomerById(customerId),
    enabled: !!customerId, // Ne s'exécute que si l'ID est fourni
  });
}
export default useCustomerDetails;
