export type CustomerStatus = 'active' | 'suspended' | 'archived' | 'pending';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  activeItems: number; // Nombre d'éléments actifs associés
  plan: string; // Ex: "Premium", "Starter", "Enterprise"
  metadata: {
    region: string;
    industry: string;
  };
}

export interface RelatedSubscription {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
}

export interface RelatedTicket {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface CustomerDetailsData extends Customer {
  subscriptions: RelatedSubscription[];
  tickets: RelatedTicket[];
}
