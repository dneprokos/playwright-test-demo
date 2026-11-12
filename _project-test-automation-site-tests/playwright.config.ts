import type { PlaywrightTestConfig } from '@playwright/test';
import { Config } from './config';

const config: PlaywrightTestConfig = {
    testMatch: 'tests/*tests.ts',
    timeout: Config.MAX_TEST_RUNTIME,
    retries: Config.RETRY_FAILED,
    workers: Config.WORKERS,
    globalSetup: require.resolve('./global-setup'),
    reporter: [
        ['allure-playwright'],
        ['list']
    ],
    use: {
        baseURL: Config.BASE_URL,
        headless: Config.HEADLESS_BROWSER,
        viewport: { width: 2045, height: 960 },
        colorScheme: 'dark',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'Chrome Browser',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                actionTimeout: 20000
            },
        },
        {
            name: 'Firefox Browser',
            use: {
                browserName: 'firefox',
                actionTimeout: 20000
            },
        }
    ]
};

export default config;