import { MainPage } from '@organic-shop/pages/main-page/main-page';
import { test as base } from '@playwright/test';
import { RestApiRequestsFacade } from '@root/services-rest-api/facade/rest-api-requests-facade';
import { SqlConnectionPool } from '@sql/basic-logic/sql-connection-pool';
import { Config } from './config';

type Pages = {
    Main_Page: MainPage
}

type EnvironmentVariables = {
    baseUrl: string
    restApiBaseUrl: string
}

type Services = {
    restApiRequests: RestApiRequestsFacade
}

type WorkerFixtures = {
    /** Closes the per-worker SQL connection pools (SqlConnectionPool singleton) when the worker ends. */
    sqlConnectionPools: void
}

export const test = base.extend<Pages & EnvironmentVariables & Services, WorkerFixtures>({
    //Environment variables
    baseURL: Config.BASE_URL,

    //Pages. Pages intialization for quick access
    Main_Page: async ({page}, use) => {
        await use(new MainPage(page));
    },

    //Services
    restApiRequests: new RestApiRequestsFacade(Config.REST_BOOKING_BASE_URL),

    //Worker teardown
    sqlConnectionPools: [
        // eslint-disable-next-line no-empty-pattern
        async ({}, use) => {
            await use();
            await SqlConnectionPool.closeAll();
        },
        { scope: 'worker', auto: true },
    ],
})

export default test;
export const expect = test.expect;