import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'A/B Testing' }).click();

  await expect(page.getByRole('heading')).toContainText('A/B Test Variation 1');
});
