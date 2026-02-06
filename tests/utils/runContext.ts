// tests/utils/runContext.ts
import fs from 'fs';
import path from 'path';

let cachedRunDir: string | null = null;

export function getOrCreateRunFolder(): string {
    if (cachedRunDir) return cachedRunDir;

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .slice(0, 19);

    cachedRunDir = path.join('tests', 'runs', `run-${timestamp}`);
    fs.mkdirSync(cachedRunDir, { recursive: true });

    return cachedRunDir;
}
