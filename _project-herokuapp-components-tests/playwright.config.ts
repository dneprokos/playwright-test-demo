import { type PlaywrightTestConfig } from '@playwright/test';
import { Config } from './config';

const config: PlaywrightTestConfig = {
    //Will be a filter for tests
    testMatch: ['tests/**/*.ts'],
    //Maximum time for a test to run
    timeout: Config.MAX_TEST_RUNTIME, 
    //Maximum retries for a failed test
    retries: Config.RETRY_FAILED, 
    //Maximum number of workers. Parallel execution
    workers: Config.WORKERS?? 10,
    //Reporters for the test results
    reporter: [
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['allure-playwright', {
            details: true,
            outputFolder: './allure-results',
            suiteTitle: false,
            environmentInfo: {
                FRAMEWORK: 'Playwright',
                HEADLESS: Config.HEADLESS_BROWSER,
                E2E_NODE_VERSION: process.version,
                E2E_OS: process.platform
            },
        }],
        ['list']
    ],
    globalSetup: require.resolve('./global-setup'),
    globalTimeout: 300000,
    // globalTeardown: require.resolve('./global-teardown'),
    //Global options for all tests
    use: {
        //Base URL for the tests
        baseURL: Config.BASE_URL,
        //Headless browser
        headless: Config.HEADLESS_BROWSER,
        //Browser viewport
        viewport: { width: 2045, height: 960 },
        //Color scheme for the browser
        colorScheme: 'dark',
        //Screenshot only on failure
        screenshot: 'only-on-failure',
        //Video recording
        video: 'on-first-retry',
        launchOptions: {
            slowMo: 100,
            logger: {
                isEnabled: (name, severity) => name === 'browser',
                log: (name, severity, message, args) => {
                    const severityThreshold = 'info'; // Example threshold
                    const severityLevels = ['verbose', 'info', 'warning', 'error'];
                    if (severityLevels.indexOf(severity) >= severityLevels.indexOf(severityThreshold)) {
                        console.log(`[${name}] ${message}`);
                    }
                },
            },
        }
    },
    //Project options
    projects: [
        {
            name: 'Local Chrome tests',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                permissions: ['geolocation', 'notifications' ]
            },
        },
        {
            name: 'Local Chrome in New York tests',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                locale: 'en-US',
                timezoneId: 'America/New_York',
                geolocation: { longitude: -74.006, latitude: 40.7128 },
                permissions: ['geolocation', 'notifications'],
            },
        },
        {
            name: 'Chromium build-in tests',
            use: {
                browserName: 'chromium',
                permissions: ['geolocation', 'notifications']
            },
         },
    ]
};


export default config;
