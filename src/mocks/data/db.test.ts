import { describe, it, expect, beforeEach } from 'vitest';
import { db } from './db';

describe('In-Memory Database Tests (db.ts)', () => {
  beforeEach(() => {
    // Initialise ou réinitialise les données si nécessaire, mais db.ts le fait de lui-même
  });

  it('should fetch clients with default parameters', () => {
    const result = db.getCustomers({
      page: 1,
      limit: 10,
      search: '',
      status: 'all',
      region: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
    });

    expect(result.data).toBeDefined();
    expect(result.data.length).toBeLessThanOrEqual(10);
    expect(result.total).toBeGreaterThan(0);
    expect(result.totalPages).toBeGreaterThan(0);
  });

  it('should correctly filter clients by status', () => {
    const activeResult = db.getCustomers({
      page: 1,
      limit: 10,
      search: '',
      status: 'active',
      region: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
    });

    activeResult.data.forEach((customer) => {
      expect(customer.status).toBe('active');
    });
  });

  it('should correctly filter clients by region', () => {
    const targetRegion = 'Europe';
    const europeResult = db.getCustomers({
      page: 1,
      limit: 10,
      search: '',
      status: 'all',
      region: targetRegion,
      sortBy: 'name',
      sortOrder: 'asc',
    });

    europeResult.data.forEach((customer) => {
      expect(customer.metadata.region).toBe(targetRegion);
    });
  });

  it('should update customer status and log the action', () => {
    // 1. Récupérer un client existant
    const customers = db.getCustomers({
      page: 1,
      limit: 1,
      search: '',
      status: 'active',
      region: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
    });
    
    if (customers.data.length > 0) {
      const customer = customers.data[0];
      const customerId = customer.id;

      // 2. Suspendre le client
      const updated = db.updateCustomerStatus(customerId, 'suspend', 'Agent Test', 'Unpaid invoices');
      expect(updated).toBeDefined();
      expect(updated?.status).toBe('suspended');

      // 3. Vérifier que l'activité a été logguée dans sa timeline
      const activities = db.getCustomerActivities(customerId);
      const lastActivity = activities[0];
      expect(lastActivity).toBeDefined();
      expect(lastActivity.type).toBe('status_change');
      expect(lastActivity.description).toContain('suspended');
      expect(lastActivity.performedBy).toBe('Agent Test');
      expect(lastActivity.metadata?.reason).toBe('Unpaid invoices');
    }
  });
});
