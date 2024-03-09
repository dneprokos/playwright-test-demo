import { devices, type PlaywrightTestConfig } from '@playwright/test';
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
        baseURL: getEnv(EnvironmentParameters.baseUrl),
        headless: getEnv(EnvironmentParameters.headelessBrowser) === 'true',
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