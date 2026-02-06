import { test, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { StepRunner } from './utils/StepRunner';

import { HomePage } from '../pages/HomePage';
import { InfoPage } from '../pages/InfoPage';
import { DataPage } from '../pages/DataPage';

/* ───────────── Globals ───────────── */

let browser: Browser;
let context: BrowserContext;
let page: Page;

/* ───────────── Setup / Teardown ───────────── */

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    context = await browser.newContext({ viewport: null });

    context.setDefaultTimeout(5000);
    context.setDefaultNavigationTimeout(5000);

    page = await context.newPage();
});

test.afterAll(async () => {
    if (browser) await browser.close();
});

/* ───────────── Test ───────────── */

test('custom step-based data collection system', async () => {
    const steps = new StepRunner(page);

    const home = new HomePage(page);
    const info = new InfoPage(page);
    const data = new DataPage(page);

    await steps.run('Home: Open site & collect title', async () => {
        await home.open();
        await home.collectTitle();
    });

    await steps.run('Home: Navigate to info page', async () => {
        await home.goToMoreInfo();
    });

    await steps.run('Info: Collect heading & paragraph', async () => {
        await info.collectHeading();
        await info.collectParagraph();
    });

    await steps.run('Data: Collect primary data (expected to fail)', async () => {
        await data.collectPrimaryData();
    });

    await steps.run('Data: Collect secondary data', async () => {
        await data.collectSecondaryData();
    });

    console.log('Failures:', steps.getFailures());
});
