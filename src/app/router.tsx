import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { z } from 'zod';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/features/dashboard/components/DashboardPage';
import { CustomersPage } from '@/features/customers/components/CustomersPage';
import { CustomerDetailPage } from '@/features/customer-details/components/CustomerDetailPage';
import { ErrorFallback } from '@/components/feedback/ErrorFallback';

const customersSearchSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(10),
  search: z.string().catch(''),
  status: z.enum(['all', 'active', 'suspended', 'archived', 'pending']).catch('all'),
  region: z.string().catch('all'),
  sortBy: z.string().catch('name'),
  sortOrder: z.enum(['asc', 'desc']).catch('asc'),
});

export type CustomersSearch = z.infer<typeof customersSearchSchema>;

// Route racine avec le layout global AppShell
export const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  errorComponent: ErrorFallback,
});

// Route d'index qui redirige vers le dashboard
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    throw redirect({ to: '/dashboard', replace: true });
  },
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  errorComponent: ErrorFallback,
});

export const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customers',
  validateSearch: (search): CustomersSearch => customersSearchSchema.parse(search),
  component: CustomersPage,
  errorComponent: ErrorFallback,
});

export const customerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customers/$customerId',
  component: CustomerDetailPage,
  errorComponent: ErrorFallback,
});

// Construction de l'arbre des routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  customersRoute,
  customerDetailRoute,
]);

// Création du routeur
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Enregistrement des types pour l'autocomplétion des routes de TanStack Router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
