// tests/utils/StepRunner.ts
import { test, Page } from '@playwright/test';
import path from 'path';
import { getOrCreateRunFolder } from './runContext';

export class StepRunner {
    private failures: string[] = [];

    constructor(private page: Page) {}

    async run(stepName: string, action: () => Promise<void>) {
        try {
            await test.step(stepName, async () => {});
            await action();
        } catch (e: any) {
            if (!this.page.isClosed()) {
                const runDir = getOrCreateRunFolder();
                const fileName = stepName.replace(/[^a-zA-Z0-9]/g, '_') + '.png';

                await this.page.screenshot({
                    path: path.join(runDir, fileName),
                    fullPage: true
                });
            }

            this.failures.push(`${stepName}: ${e.message}`);
        }
    }

    getFailures() {
        return this.failures;
    }
}
