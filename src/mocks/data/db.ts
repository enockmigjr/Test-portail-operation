import { generateMockData } from './generator';
import type { Customer, CustomerStatus } from '@/types/customer';
import type { Activity } from '@/types/activity';

// Initialisation de la base de données en mémoire
const { customers: initialCustomers, customerDetailsMap: initialDetails, activities: initialActivities } = generateMockData(200);

export const db = {
  customers: [...initialCustomers],
  details: { ...initialDetails },
  activities: [...initialActivities],

  // Récupérer la liste des clients filtrée, triée et paginée
  getCustomers({
    search = '',
    status = 'all',
    region = 'all',
    page = 1,
    limit = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  }: {
    search?: string;
    status?: string;
    region?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    let filtered = [...this.customers];

    // Recherche sur le nom, l'email et l'entreprise
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
      );
    }

    // Filtrage par statut
    if (status && status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }

    // Filtrage par région
    if (region && region !== 'all') {
      filtered = filtered.filter(c => c.metadata.region === region);
    }

    // Tri
    filtered.sort((a, b) => {
      let valA: unknown;
      let valB: unknown;

      if (sortBy.includes('.')) {
        const parts = sortBy.split('.');
        valA = parts.reduce<unknown>((acc, part) => {
          if (acc && typeof acc === 'object' && part in acc) {
            return (acc as Record<string, unknown>)[part];
          }
          return undefined;
        }, a);
        valB = parts.reduce<unknown>((acc, part) => {
          if (acc && typeof acc === 'object' && part in acc) {
            return (acc as Record<string, unknown>)[part];
          }
          return undefined;
        }, b);
      } else {
        valA = a[sortBy as keyof Customer];
        valB = b[sortBy as keyof Customer];
      }

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedData = filtered.slice(offset, offset + limit);

    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  },

  // Récupérer un client par son ID avec ses données détaillées
  getCustomerById(id: string) {
    const customer = this.customers.find(c => c.id === id);
    if (!customer) return null;

    const details = this.details[id] || { subscriptions: [], tickets: [] };
    return {
      ...customer,
      ...details,
    };
  },

  // Exécuter une action opérationnelle sur un compte client
  updateCustomerStatus(id: string, action: 'activate' | 'suspend' | 'reopen' | 'archive', agentName: string, reason?: string) {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) return null;

    const customer = this.customers[index];
    const previousStatus = customer.status;
    let newStatus: CustomerStatus = previousStatus;

    switch (action) {
      case 'activate':
        newStatus = 'active';
        break;
      case 'suspend':
        newStatus = 'suspended';
        break;
      case 'reopen':
        newStatus = 'active';
        break;
      case 'archive':
        newStatus = 'archived';
        break;
    }

    if (previousStatus === newStatus) return customer;

    // Mettre à jour l'entité client
    const updatedCustomer = {
      ...customer,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    
    this.customers[index] = updatedCustomer;

    const actionPastTense = {
      activate: 'activated',
      suspend: 'suspended',
      reopen: 'reopened',
      archive: 'archived',
    }[action];

    // Ajouter l'événement à la timeline d'activités
    const newActivity: Activity = {
      id: `act_${Math.random().toString(36).substr(2, 9)}`,
      customerId: id,
      type: 'status_change',
      description: `Account ${actionPastTense} successfully.`,
      timestamp: new Date().toISOString(),
      performedBy: agentName,
      metadata: {
        previousStatus,
        newStatus,
        reason: reason || 'Operational adjustment via Portal',
      },
    };

    this.activities.unshift(newActivity); // Ajouter en haut de la timeline globale

    // Mettre à jour également les abonnements selon le nouveau statut (simulation cohérente)
    if (newStatus === 'archived') {
      const details = this.details[id];
      if (details) {
        details.subscriptions = details.subscriptions.map(s => ({
          ...s,
          status: 'canceled',
        }));
      }
    } else if (newStatus === 'active' && previousStatus === 'suspended') {
      const details = this.details[id];
      if (details) {
        details.subscriptions = details.subscriptions.map(s => ({
          ...s,
          status: 'active',
        }));
      }
    }

    return updatedCustomer;
  },

  // Obtenir les activités pour un client spécifique
  getCustomerActivities(customerId: string) {
    return this.activities.filter(a => a.customerId === customerId);
  },

  // Obtenir les statistiques du dashboard
  getDashboardStats() {
    const totalCustomers = this.customers.length;
    const activeCustomers = this.customers.filter(c => c.status === 'active').length;
    const suspendedCustomers = this.customers.filter(c => c.status === 'suspended').length;
    const archivedCustomers = this.customers.filter(c => c.status === 'archived').length;
    const pendingCustomers = this.customers.filter(c => c.status === 'pending').length;

    // Activités récentes (les 10 dernières)
    const recentActivities = this.activities.slice(0, 10);

    // Distribution des statuts pour graphiques Recharts
    const statusDistribution = [
      { status: 'active', count: activeCustomers },
      { status: 'suspended', count: suspendedCustomers },
      { status: 'pending', count: pendingCustomers },
      { status: 'archived', count: archivedCustomers },
    ];

    // Évolution des créations de comptes par mois sur les 12 derniers mois
    const monthlyDataMap: Record<string, number> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialiser les 6 derniers mois par exemple
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${months[d.getMonth()]} ${d.getFullYear().toString().substr(2)}`;
      monthlyDataMap[key] = 0;
    }

    this.customers.forEach(c => {
      const date = new Date(c.createdAt);
      const key = `${months[date.getMonth()]} ${date.getFullYear().toString().substr(2)}`;
      if (key in monthlyDataMap) {
        monthlyDataMap[key]++;
      }
    });

    const customersByMonth = Object.entries(monthlyDataMap).map(([month, count]) => ({
      month,
      count,
    }));

    return {
      totalCustomers,
      activeCustomers,
      suspendedCustomers,
      archivedCustomers,
      pendingCustomers,
      recentActivities,
      statusDistribution,
      customersByMonth,
    };
  },
};
