import { Page } from '@playwright/test';
import { getBaseUrl } from '../config/InputProvider';

export class HomePage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto(getBaseUrl());
        await this.page.waitForURL(getBaseUrl() + '/');
    }

    async collectTitle() {
        const title = await this.page.locator('h1').innerText();
        console.log('Home title:', title);
    }

    async goToMoreInfo() {
        await this.page.getByRole('link', { name: 'More information...' }).click();
        await this.page.waitForURL(/iana\.org\/domains\/example/);
    }
}
