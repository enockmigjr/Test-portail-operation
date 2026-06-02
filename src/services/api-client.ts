import axios from 'axios';
import axiosRetry from 'axios-retry';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configuration du retry automatique en cas d'erreur réseau ou d'erreur serveur (503, 504, etc.)
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // Réessayer en cas de problème de réseau ou d'erreur 503/504
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status === 503 ||
      error.response?.status === 504
    );
  },
});
export default apiClient;
