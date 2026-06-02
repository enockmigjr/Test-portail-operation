import type { Activity } from './activity';
import type { CustomerStatus } from './customer';

export interface StatusDistribution {
  status: CustomerStatus;
  count: number;
}

export interface MonthlyCreation {
  month: string;
  count: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  suspendedCustomers: number;
  archivedCustomers: number;
  pendingCustomers: number;
  recentActivities: Activity[];
  statusDistribution: StatusDistribution[];
  customersByMonth: MonthlyCreation[];
}
