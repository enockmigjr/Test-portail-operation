export type ActivityType =
  | 'account_created'
  | 'status_change'
  | 'admin_action'
  | 'system_event'
  | 'note_added';

export interface Activity {
  id: string;
  customerId: string;
  type: ActivityType;
  description: string;
  timestamp: string; // ISO Date String
  performedBy: string; // Nom de l'agent ou "System"
  metadata?: {
    previousStatus?: string;
    newStatus?: string;
    reason?: string;
    details?: string;
    [key: string]: unknown;
  };
}
