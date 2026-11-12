import { PlaywrightTestConfig } from '@playwright/test';
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
        headless: Config.HEADLESS_BROWSER,
        viewport: { width: 2045, height: 960 },
        colorScheme: 'dark',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Chrome Browser',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
            },
        }
    ]
};

export default config;