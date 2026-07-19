import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/login/);
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('donor registration page loads', async ({ page }) => {
    await page.goto('/register/donor');
    await expect(page).toHaveURL(/register\/donor/);
    await expect(page.getByText('Donor Registration')).toBeVisible();
  });

  test('NGO registration page loads', async ({ page }) => {
    await page.goto('/register/ngo');
    await expect(page).toHaveURL(/register\/ngo/);
  });

  test('role selection page loads', async ({ page }) => {
    await page.goto('/register/role_selection');
    await expect(page).toHaveURL(/register\/role_selection/);
  });

  test('navigation from landing to role selection', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Start Giving' }).click();
    await expect(page).toHaveURL(/register\/role_selection/);
  });
});
