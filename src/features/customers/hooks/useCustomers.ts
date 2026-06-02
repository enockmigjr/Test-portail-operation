import { useQuery } from '@tanstack/react-query';
import { customersService } from '@/services/customers.service';
import type { CustomerFilters } from '@/types/api';

export function useCustomers(filters: CustomerFilters) {
  return useQuery({
    queryKey: ['customers', 'list', filters],
    queryFn: () => customersService.getCustomers(filters),
    placeholderData: (previousData) => previousData, // Garde les anciennes données à l'écran pendant le chargement des filtres (évite les sauts d'interface)
  });
}
