import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { Config } from './config';

const config: PlaywrightTestConfig = {
    timeout: Config.MAX_TEST_RUNTIME,
    testMatch: 'tests/*tests.ts',
    retries: Config.RETRY_FAILED,
    workers: Config.WORKERS,
    reporter: [
        ['allure-playwright'],
        ['list']
    ],
    use: {
        baseURL: Config.BASE_URL,
        headless: Config.HEADLESS_BROWSER,
        viewport: { width: 2045, height: 960 },
        colorScheme: 'dark',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use: {...devices['Desktop Chrome'] }, // Chromium buiild 
        },
        {
            name: 'Google Chrome - Local Desktop',
            use: {  ...devices['Desktop Chrome'], channel: 'chrome' } // Local Chrome browser
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        }
    ]
};

export default config;