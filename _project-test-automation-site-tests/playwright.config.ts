import type { PlaywrightTestConfig } from '@playwright/test';
import { getEnv, getEnvParseNumber } from '@framework/configuration/environment-helper';
import { EnvironmentParameters } from '@framework/configuration/environment-constants';

const config: PlaywrightTestConfig = {
    testMatch: 'tests/*tests.ts',
    timeout: getEnvParseNumber(EnvironmentParameters.maxTestRunTime),
    retries: getEnvParseNumber(EnvironmentParameters.retryFailed)?? 1,
    workers: getEnvParseNumber(EnvironmentParameters.workers)?? 4,
    globalSetup: require.resolve('./global-setup'),
    reporter: [
        ['allure-playwright'],
        ['list']
    ],
    use: {
        baseURL: getEnv(EnvironmentParameters.baseUrl),
        headless: getEnv(EnvironmentParameters.headelessBrowser) === 'true',
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