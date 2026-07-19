import { test, expect } from '@playwright/test';

test.describe('NGO Dashboard', () => {
  test('NGO dashboard redirects when not authenticated', async ({ page }) => {
    await page.goto('/ngo');
    // Should redirect to login when not authenticated
    await expect(page).toHaveURL(/login/);
  });

  test('NGO donations page redirects when not authenticated', async ({ page }) => {
    await page.goto('/ngo/donations');
    await expect(page).toHaveURL(/login/);
  });

  test('NGO claims page redirects when not authenticated', async ({ page }) => {
    await page.goto('/ngo/my-claims');
    await expect(page).toHaveURL(/login/);
  });
});
