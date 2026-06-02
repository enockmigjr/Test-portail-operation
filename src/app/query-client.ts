import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30 secondes
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false, // Évite les requêtes inutiles au focus
      retry: (failureCount, error) => {
        // Ne pas réessayer si c'est une erreur 4xx (Client Error) via Axios
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 2; // Réessayer max 2 fois additionnelles
      },
    },
    mutations: {
      retry: false, // Pas de retry automatique sur les mutations
    },
  },
});
