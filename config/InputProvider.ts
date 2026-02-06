// config/InputProvider.ts
import fs from 'fs';
import path from 'path';

type InputConfig = {
    baseUrl: string;
    timeouts: {
        short: number;
        default: number;
    };
};

let cachedConfig: InputConfig | undefined;

function loadConfig(): InputConfig {
    if (cachedConfig) return cachedConfig;

    const filePath = path.resolve(__dirname, 'input.json');
    const raw = fs.readFileSync(filePath, 'utf-8');

    const parsed: InputConfig = JSON.parse(raw);
    cachedConfig = parsed;

    return parsed;
}

/* ---- Minimal getters ---- */

export function getBaseUrl(): string {
    return loadConfig().baseUrl;
}

export function getDefaultTimeout(): number {
    return loadConfig().timeouts.default;
}

export function getShortTimeout(): number {
    return loadConfig().timeouts.short;
}
