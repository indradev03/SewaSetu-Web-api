import { test, expect } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  
  // Check if page loads successfully
  await expect(page).toHaveURL('/');
  
  // Check for main heading
  await expect(page.getByText('Connecting Hearts')).toBeVisible();
});

test('navigation to about page works', async ({ page }) => {
  await page.goto('/');
  
  // Click the Learn More link (which goes to about page)
  await page.getByRole('link', { name: 'Learn More' }).click();
  await expect(page).toHaveURL(/about/);
});
