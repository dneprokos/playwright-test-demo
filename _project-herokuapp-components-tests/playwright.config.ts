import type { PlaywrightTestConfig } from '@playwright/test';
import { getEnv, getEnvParseNumber } from '@framework/configuration/environment-helper';
import { EnvironmentParameters } from '@framework/configuration/environment-constants';

const config: PlaywrightTestConfig = {
    //Will be a filter for tests
    testMatch: 'tests/*tests.ts',
    //Maximum time for a test to run
    timeout: getEnvParseNumber(EnvironmentParameters.maxTestRunTime),
    //Maximum retries for a failed test
    retries: getEnvParseNumber(EnvironmentParameters.retryFailed)?? 1,
    //Maximum number of workers. Parallel execution
    workers: getEnvParseNumber(EnvironmentParameters.workers)?? 4,
    //Reporters for the test results
    reporter: [
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['allure-playwright'],
        ['list']
    ],
    // globalSetup: require.resolve('./global-setup'),
    // globalTeardown: require.resolve('./global-teardown'),
    //Global options for all tests
    use: {
        //Base URL for the tests
        baseURL: getEnv(EnvironmentParameters.baseUrl),
        //Headless browser
        headless: getEnv(EnvironmentParameters.headelessBrowser) === 'true',
        //Browser viewport
        viewport: { width: 2045, height: 960 },
        //Color scheme for the browser
        colorScheme: 'dark',
        //Screenshot only on failure
        screenshot: 'only-on-failure',
        //Video recording
        video: 'on-first-retry',  
    },
    //Project options
    projects: [
        {
            name: 'Local Chrome',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                actionTimeout: 20000
            },
        }
    ]
};

export default config;
