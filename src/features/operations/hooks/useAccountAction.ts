import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customersService } from '@/services/customers.service';
import { toast } from 'sonner';
import type { CustomerDetailsData, CustomerStatus } from '@/types/customer';

interface MutationParams {
  customerId: string;
  action: 'activate' | 'suspend' | 'reopen' | 'archive';
  reason?: string;
}

export function useAccountAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, action, reason }: MutationParams) =>
      customersService.performAction(customerId, action, reason),
    
    // Mises à jour optimistes
    onMutate: async ({ customerId, action }) => {
      // 1. Annuler les requêtes en cours pour ne pas écraser notre mise à jour optimiste
      await queryClient.cancelQueries({ queryKey: ['customers', 'detail', customerId] });
      await queryClient.cancelQueries({ queryKey: ['customers', 'activities', customerId] });

      // 2. Sauvegarder l'ancienne valeur du cache pour le rollback
      const previousCustomerDetails = queryClient.getQueryData<CustomerDetailsData>(['customers', 'detail', customerId]);

      // Déterminer le nouveau statut
      let newStatus: CustomerStatus = 'active';
      if (action === 'suspend') newStatus = 'suspended';
      else if (action === 'archive') newStatus = 'archived';

      // 3. Mettre à jour optimistement le cache du détail du client
      if (previousCustomerDetails) {
        queryClient.setQueryData<CustomerDetailsData>(['customers', 'detail', customerId], {
          ...previousCustomerDetails,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }

      // Retourner le contexte avec l'ancienne valeur pour le rollback en cas d'échec
      return { previousCustomerDetails };
    },

    // En cas d'erreur, restaurer l'état précédent
    onError: (error, { customerId }, context) => {
      if (context?.previousCustomerDetails) {
        queryClient.setQueryData(['customers', 'detail', customerId], context.previousCustomerDetails);
      }
      toast.error(`Operation failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
    },

    // En cas de succès ou d'échec, invalider les caches pour forcer la synchronisation avec la DB
    onSettled: (_data, _error, { customerId }) => {
      queryClient.invalidateQueries({ queryKey: ['customers', 'detail', customerId] });
      queryClient.invalidateQueries({ queryKey: ['customers', 'activities', customerId] });
      queryClient.invalidateQueries({ queryKey: ['customers', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
    },
  });
}

export default useAccountAction;
