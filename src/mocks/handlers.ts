import { http, HttpResponse, delay } from 'msw';
import { db } from './data/db';

export const handlers = [
  // 1. GET /api/customers - Liste paginée, triée et filtrée
  http.get('/api/customers', async ({ request }) => {
    // Simuler un délai réseau réaliste (200-500ms)
    await delay(300);

    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || 'all';
    const region = url.searchParams.get('region') || 'all';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const sortBy = url.searchParams.get('sortBy') || 'name';
    const sortOrder = (url.searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

    try {
      const result = db.getCustomers({
        search,
        status,
        region,
        page,
        limit,
        sortBy,
        sortOrder,
      });

      return HttpResponse.json(result);
    } catch {
      return new HttpResponse(
        JSON.stringify({ message: 'Erreur lors de la récupération des clients.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }),

  // 2. GET /api/customers/:id - Détails d'un client spécifique
  http.get('/api/customers/:id', async ({ params }) => {
    await delay(250);

    const id = params.id as string;
    const customer = db.getCustomerById(id);

    if (!customer) {
      return new HttpResponse(
        JSON.stringify({ message: 'Client non trouvé.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return HttpResponse.json(customer);
  }),

  // 3. PATCH /api/customers/:id/action - Actions opérationnelles (Activate, Suspend, etc.)
  http.patch('/api/customers/:id/action', async ({ params, request }) => {
    await delay(500); // Délai un peu plus long pour les mutations pour bien voir le loading/optimistic update

    const id = params.id as string;
    
    try {
      const body = (await request.json()) as {
        action: 'activate' | 'suspend' | 'reopen' | 'archive';
        reason?: string;
        agentName?: string;
      };

      if (!body.action) {
        return new HttpResponse(
          JSON.stringify({ message: 'L\'action est requise.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Parfois, simuler une erreur d'API aléatoire pour tester la retry strategy et le rollback
      // Décommentez pour tester la robustesse aux erreurs :
      // if (Math.random() < 0.1) {
      //   return new HttpResponse(
      //     JSON.stringify({ message: 'Erreur de base de données temporaire. Veuillez réessayer.' }),
      //     { status: 503, headers: { 'Content-Type': 'application/json' } }
      //   );
      // }

      const updatedCustomer = db.updateCustomerStatus(
        id,
        body.action,
        body.agentName || 'Agent Support #1',
        body.reason
      );

      if (!updatedCustomer) {
        return new HttpResponse(
          JSON.stringify({ message: 'Client non trouvé.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return HttpResponse.json(updatedCustomer);
    } catch {
      return new HttpResponse(
        JSON.stringify({ message: 'Requête invalide.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }),

  // 4. GET /api/customers/:id/activities - Activités d'un client spécifique
  http.get('/api/customers/:id/activities', async ({ params }) => {
    await delay(200);

    const id = params.id as string;
    const activities = db.getCustomerActivities(id);

    return HttpResponse.json(activities);
  }),

  // 5. GET /api/dashboard/stats - Statistiques pour le dashboard
  http.get('/api/dashboard/stats', async () => {
    await delay(400);

    try {
      const stats = db.getDashboardStats();
      return HttpResponse.json(stats);
    } catch {
      return new HttpResponse(
        JSON.stringify({ message: 'Erreur lors du calcul des statistiques.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }),
];
