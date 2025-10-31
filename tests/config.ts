import { defineConfig } from '@playwright/test';

export const config = {
    baseURL: process.env.BASE_URL || 'https://www.google.com/',
};

export default defineConfig({
    use: {
        baseURL: config.baseURL,
        headless: true,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],
    testDir: './tests',
    timeout: 30000,
});
