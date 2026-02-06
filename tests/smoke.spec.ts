// tests/smoke.spec.ts
import { test, expect } from '@playwright/test';

test('playwright works', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});
