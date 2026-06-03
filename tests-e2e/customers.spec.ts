import { test, expect } from '@playwright/test';

test.describe('Customers Page & Operations E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur le répertoire client
    await page.goto('/customers');
    await expect(page).toHaveURL(/\/customers/);
  });

  test('should load the customer directory table', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Customer Directory');
    const rows = page.locator('table tbody tr');
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should filter customers by search input query', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search by name, email"]');
    await expect(searchInput).toBeVisible();

    // Récupérer le nom d'un client dans la première ligne
    const firstCustomerLink = page.locator('table tbody tr').first().locator('a').first();
    const customerName = await firstCustomerLink.textContent();
    expect(customerName).not.toBeNull();

    // Taper le nom dans la barre de recherche
    await searchInput.fill(customerName!);
    // Attendre le debouncing de 300ms + fetch de MSW
    await page.waitForTimeout(600);

    // Vérifier que la table ne contient plus que des clients correspondants
    const filteredRows = page.locator('table tbody tr');
    const filteredCount = await filteredRows.count();
    expect(filteredCount).toBeGreaterThanOrEqual(1);

    const nameInTable = await filteredRows.first().locator('a').first().textContent();
    expect(nameInTable?.toLowerCase()).toContain(customerName!.toLowerCase());
  });

  test('should filter customers by status badge selection', async ({ page }) => {
    // Ouvrir le sélecteur de statut
    const statusSelect = page.locator('button:has-text("All Statuses")');
    await statusSelect.click();

    // Sélectionner l'option "Active"
    const activeOption = page.locator('div[role="option"]:has-text("Active")');
    await activeOption.click();

    // Attendre le chargement
    await page.waitForTimeout(400);

    // S'assurer que tous les badges affichés sont "Active"
    const badges = page.locator('table tbody tr span:has-text("Active")');
    const rowsCount = await page.locator('table tbody tr').count();
    expect(await badges.count()).toBe(rowsCount);
  });

  test('should clear all filters on reset click', async ({ page }) => {
    // Modifier les filtres
    const searchInput = page.locator('input[placeholder*="Search by name, email"]');
    await searchInput.fill('NonExistentCustomerNameHere123');
    await page.waitForTimeout(600);

    // Vérifier que l'état vide est affiché
    await expect(page.locator('text=No customers found')).toBeVisible();

    // Cliquer sur le bouton Reset
    const resetButton = page.locator('button:has-text("Reset")');
    await resetButton.click();

    // Attendre le re-chargement
    await page.waitForTimeout(600);

    // Vérifier que des clients sont à nouveau affichés
    const rows = page.locator('table tbody tr');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('should navigate to details and perform suspension action with optimistic update', async ({ page }) => {
    // Cliquer sur le bouton Inspect de la première ligne
    const inspectButton = page.locator('table tbody tr').first().locator('a:has-text("Inspect")');
    await inspectButton.click();

    // Valider la navigation vers la page de détails
    await expect(page).toHaveURL(/\/customers\/\w+/);
    await expect(page.locator('h1')).toBeVisible();

    // S'assurer que le bouton d'action de suspension est présent et cliquer dessus
    const suspendButton = page.locator('button:has-text("Suspend Account")');
    await suspendButton.click();

    // Vérifier que la boîte de dialogue de confirmation s'ouvre
    const dialogTitle = page.locator('[role="dialog"] h2');
    await expect(dialogTitle).toHaveText('Suspend Account');

    // Taper une justification valide (< 10 caractères devrait échouer)
    const reasonInput = page.locator('[role="dialog"] input#reason');
    await reasonInput.fill('Short');
    await page.locator('[role="dialog"] button[type="submit"]').click();
    
    // Vérifier qu'une erreur de validation s'affiche
    await expect(page.locator('[role="dialog"] p.text-red-500')).toContainText('at least 10 characters');

    // Taper une justification valide (> 10 caractères)
    await reasonInput.fill('Operational suspension due to payment audit.');
    await page.locator('[role="dialog"] button[type="submit"]').click();

    // Vérifier la présence du toast de succès
    await expect(page.locator('li[data-sonner-toast]')).toBeVisible();

    // S'assurer que le statut a changé sur l'interface (Optimistic Update)
    const statusBadge = page.locator('div.flex.items-center.gap-3 [data-slot="badge"]');
    await expect(statusBadge).toContainText(/suspended/i);

    // Vérifier que la timeline contient le nouvel événement de modification
    const timelineEvents = page.locator('div.relative.pl-6 > div.relative');
    await expect(timelineEvents.first()).toContainText(/suspended/i);
    await expect(timelineEvents.first()).toContainText('Operational suspension due to payment audit.');
  });
});
