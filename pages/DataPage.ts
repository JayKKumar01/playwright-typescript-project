import { Page } from '@playwright/test';
import { getShortTimeout } from '../config/InputProvider';

export class DataPage {
    constructor(private page: Page) {}

    async collectPrimaryData() {
        const locator = this.page.getByTestId('non-existent-data');
        await locator.waitFor({ state: 'visible', timeout: getShortTimeout() });
        const value = await locator.innerText();
        console.log('Primary data:', value);
    }

    async collectSecondaryData() {
        const domain = await this.page.locator('a').first().innerText();
        console.log('Secondary data:', domain);
    }
}
