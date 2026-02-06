import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 0,
    timeout: 120_000,
    reporter: [
        ['html', { open: 'always' }]
    ]
});
