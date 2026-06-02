import { faker } from '@faker-js/faker';
import type { Customer, CustomerStatus, RelatedSubscription, RelatedTicket } from '@/types/customer';
import type { Activity, ActivityType } from '@/types/activity';

// Fixer la graine de faker pour avoir des données reproductibles lors du développement
faker.seed(123);

const REGIONS = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa'];
const INDUSTRIES = ['SaaS', 'Fintech', 'E-commerce', 'Healthcare', 'Edtech', 'Logistics', 'Cybersecurity'];
const PLANS = ['Starter', 'Professional', 'Enterprise', 'Ultimate'];

export function generateMockData(customerCount = 200) {
  const customers: Customer[] = [];
  const customerDetailsMap: Record<string, { subscriptions: RelatedSubscription[]; tickets: RelatedTicket[] }> = {};
  const activities: Activity[] = [];

  for (let i = 0; i < customerCount; i++) {
    const id = `cust_${faker.string.alphanumeric(8)}`;
    const createdAt = faker.date.past({ years: 2 }).toISOString();
    
    // Détermination cohérente du statut
    const rand = faker.number.float();
    let status: CustomerStatus = 'active';
    if (rand < 0.15) status = 'pending';
    else if (rand < 0.30) status = 'suspended';
    else if (rand < 0.40) status = 'archived';

    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] }).toLowerCase();
    
    // Génération des abonnements associés
    const subscriptions: RelatedSubscription[] = [];
    const subCount = status === 'pending' ? 0 : faker.number.int({ min: 1, max: 3 });
    
    for (let j = 0; j < subCount; j++) {
      let subStatus: RelatedSubscription['status'] = 'active';
      if (status === 'suspended') subStatus = 'past_due';
      else if (status === 'archived') subStatus = 'canceled';
      else if (faker.number.float() < 0.15) subStatus = 'canceled';

      subscriptions.push({
        id: `sub_${faker.string.alphanumeric(8)}`,
        name: faker.helpers.arrayElement(PLANS) + ' Subscription',
        price: faker.helpers.arrayElement([29, 79, 199, 499]),
        billingCycle: faker.helpers.arrayElement(['monthly', 'yearly']),
        status: subStatus,
        currentPeriodEnd: faker.date.future().toISOString(),
      });
    }

    // Calcul du nombre de "items actifs" (abonnements actifs + tickets en cours)
    const activeSubCount = subscriptions.filter(s => s.status === 'active').length;

    // Génération des tickets associés
    const tickets: RelatedTicket[] = [];
    const ticketCount = status === 'pending' ? 0 : faker.number.int({ min: 0, max: 5 });
    
    for (let j = 0; j < ticketCount; j++) {
      let ticketStatus: RelatedTicket['status'] = faker.helpers.arrayElement(['open', 'in_progress', 'resolved', 'closed']);
      if (status === 'archived') ticketStatus = 'closed';

      tickets.push({
        id: `tkt_${faker.string.alphanumeric(8)}`,
        title: faker.helpers.arrayElement([
          'Billing inquiry regarding last invoice',
          'API integration connection timeout error',
          'SSO SAML configuration assistance required',
          'Request for custom SLA terms',
          'Exporting customer data failing',
          'Upgrade path question from Starter plan',
          'Unexpected service degradation reported',
        ]),
        priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
        status: ticketStatus,
        createdAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
      });
    }

    const activeTicketCount = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
    const activeItems = activeSubCount + activeTicketCount;

    // Création du client de base
    const customer: Customer = {
      id,
      name,
      email,
      phone: faker.phone.number(),
      company: faker.company.name(),
      status,
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
      activeItems,
      plan: subscriptions.length > 0 ? subscriptions[0].name.split(' ')[0] : 'None',
      metadata: {
        region: faker.helpers.arrayElement(REGIONS),
        industry: faker.helpers.arrayElement(INDUSTRIES),
      },
    };

    customers.push(customer);
    customerDetailsMap[id] = { subscriptions, tickets };

    // Génération d'activités chronologiquement cohérentes pour la timeline du client
    // 1. Toujours une activité de création de compte
    activities.push({
      id: `act_${faker.string.alphanumeric(8)}`,
      customerId: id,
      type: 'account_created',
      description: 'Account successfully registered and created in the system',
      timestamp: createdAt,
      performedBy: 'System',
    });

    // 2. Activités liées au statut actuel
    if (status === 'active' && faker.number.float() < 0.7) {
      activities.push({
        id: `act_${faker.string.alphanumeric(8)}`,
        customerId: id,
        type: 'status_change',
        description: 'Account activated by support agent',
        timestamp: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
        performedBy: faker.person.fullName(),
        metadata: {
          previousStatus: 'pending',
          newStatus: 'active',
        },
      });
    } else if (status === 'suspended') {
      const suspensionDate = faker.date.between({ from: createdAt, to: new Date() }).toISOString();
      activities.push({
        id: `act_${faker.string.alphanumeric(8)}`,
        customerId: id,
        type: 'status_change',
        description: 'Account suspended due to unpaid invoices',
        timestamp: suspensionDate,
        performedBy: 'System Billing',
        metadata: {
          previousStatus: 'active',
          newStatus: 'suspended',
          reason: 'Non-payment of subscription fees',
        },
      });
    } else if (status === 'archived') {
      const archiveDate = faker.date.between({ from: createdAt, to: new Date() }).toISOString();
      activities.push({
        id: `act_${faker.string.alphanumeric(8)}`,
        customerId: id,
        type: 'status_change',
        description: 'Account archived by operations request',
        timestamp: archiveDate,
        performedBy: faker.person.fullName(),
        metadata: {
          previousStatus: 'suspended',
          newStatus: 'archived',
          reason: 'Customer requested data deletion/inactivity',
        },
      });
    }

    // 3. Activités système ou notes
    const noteCount = faker.number.int({ min: 0, max: 3 });
    for (let k = 0; k < noteCount; k++) {
      activities.push({
        id: `act_${faker.string.alphanumeric(8)}`,
        customerId: id,
        type: faker.helpers.arrayElement(['admin_action', 'system_event', 'note_added'] as ActivityType[]),
        description: faker.helpers.arrayElement([
          'Security settings (MFA) reset requested',
          'Internal operational note: VIP client requiring high priority assistance',
          'API access key rotated successfully',
          'Contact details updated by Account Manager',
          'Data export job completed successfully',
        ]),
        timestamp: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
        performedBy: faker.helpers.arrayElement(['System', faker.person.fullName()]),
      });
    }
  }

  // Trier les activités par timestamp décroissant (timeline classique)
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return { customers, customerDetailsMap, activities };
}
