import { Page } from '@playwright/test';

export class InfoPage {
    constructor(private page: Page) {}

    async collectHeading() {
        const heading = await this.page.locator('h1').innerText();
        console.log('Info heading:', heading);
    }

    async collectParagraph() {
        const text = await this.page.locator('p').first().innerText();
        console.log('Info paragraph:', text.slice(0, 80));
    }
}
