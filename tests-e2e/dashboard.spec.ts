import { test, expect } from '@playwright/test';

test.describe('Dashboard Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Naviguer vers la page d'accueil (qui redirige vers /dashboard)
    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display the dashboard title and description', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Dashboard');
    await expect(page.locator('p').first()).toContainText('Real-time metrics, status distribution, and operational operations logging.');
  });

  test('should display all four KPI cards with dynamic values', async ({ page }) => {
    // Cibler les cartes KPI par filtre de texte insensible à la casse
    const totalCustomersCard = page.locator('div[data-slot="card"]').filter({ hasText: /total customers/i });
    const activeAccountsCard = page.locator('div[data-slot="card"]').filter({ hasText: /active accounts/i });
    const suspendedAccountsCard = page.locator('div[data-slot="card"]').filter({ hasText: /suspended accounts/i });
    const pendingAccountsCard = page.locator('div[data-slot="card"]').filter({ hasText: /pending onboarding/i });

    await expect(totalCustomersCard.first()).toBeVisible();
    await expect(activeAccountsCard.first()).toBeVisible();
    await expect(suspendedAccountsCard.first()).toBeVisible();
    await expect(pendingAccountsCard.first()).toBeVisible();

    // Vérifier que la valeur du KPI total est un nombre supérieur à 0
    const totalValue = await totalCustomersCard.first().locator('h3').textContent();
    expect(totalValue?.trim()).not.toBe('');
    expect(Number(totalValue)).toBeGreaterThan(0);
  });

  test('should render charts container and responsive elements', async ({ page }) => {
    // S'assurer que le graphique d'évolution de base client est présent (CardTitle utilise div avec data-slot="card-title")
    await expect(page.locator('div[data-slot="card-title"]', { hasText: 'Customer Database Growth' })).toBeVisible();
    // S'assurer que le graphique de répartition des statuts est présent
    await expect(page.locator('div[data-slot="card-title"]', { hasText: 'Account Statuses' })).toBeVisible();
  });

  test('should load the recent activities logging feed', async ({ page }) => {
    // Vérifier que le journal des opérations récentes est présent
    await expect(page.locator('div[data-slot="card-title"]', { hasText: 'Recent Operations Log' })).toBeVisible();
    
    // Attendre que la liste des logs d'activités récentes soit chargée
    const activityItems = page.locator('div.relative.pl-6 > div.relative');
    await expect(activityItems.first()).toBeVisible();
    
    // Vérifier qu'au moins 1 événement d'audit est listé
    const count = await activityItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
