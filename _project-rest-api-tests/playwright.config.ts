import type { PlaywrightTestConfig } from '@playwright/test';
import { getEnv, getEnvParseNumber } from '@framework/configuration/environment-helper';
import { EnvironmentParameters } from '@framework/configuration/environment-constants';

const config: PlaywrightTestConfig = {
    timeout: getEnvParseNumber(EnvironmentParameters.maxTestRunTime),
    testMatch: 'tests/*tests.ts',
    retries: getEnvParseNumber(EnvironmentParameters.retryFailed)?? 1,
    workers: getEnvParseNumber(EnvironmentParameters.workers)?? 4,
    reporter: [
        ['allure-playwright'],
        ['list']
    ],
    use: {
        headless: getEnv(EnvironmentParameters.headelessBrowser) === 'true',
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