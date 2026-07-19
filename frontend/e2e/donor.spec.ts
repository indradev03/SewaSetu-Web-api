import { test, expect } from '@playwright/test';

test.describe('Donor Dashboard', () => {
  test('donor dashboard redirects when not authenticated', async ({ page }) => {
    await page.goto('/donor');
    // Should redirect to login when not authenticated
    await expect(page).toHaveURL(/login/);
  });

  test('create donation page redirects when not authenticated', async ({ page }) => {
    await page.goto('/donor/create-donation');
    await expect(page).toHaveURL(/login/);
  });

  test('donation history page redirects when not authenticated', async ({ page }) => {
    await page.goto('/donor/history');
    await expect(page).toHaveURL(/login/);
  });

  test('rewards page redirects when not authenticated', async ({ page }) => {
    await page.goto('/donor/rewards');
    await expect(page).toHaveURL(/login/);
  });
});
