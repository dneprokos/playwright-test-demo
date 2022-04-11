import { EnvironmentParameters } from '@framework/configuration/environment-constants';
import { getEnv } from '@framework/configuration/environment-helper';
import { MainPage } from '@framework/pages/main-page/main-page';
import { test as base } from '@playwright/test';
import { RestApiRequestsFacade } from '@root/services-rest-api/facade/rest-api-requests-facade';

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

export const test = base.extend<Pages & EnvironmentVariables & Services>({
    //Environment variables
    baseURL: getEnv(EnvironmentParameters.baseUrl),

    //Pages. Pages intialization for quick access
    Main_Page: async ({page}, use) => {
        await use(new MainPage(page));
    },

    //Services
    restApiRequests: new RestApiRequestsFacade(getEnv(EnvironmentParameters.restBookingBaseUrl))
})

export default test;
export const expect = test.expect;