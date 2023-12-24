import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://localhost:5173');
  await expect(page).toHaveScreenshot();
});
