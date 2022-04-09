import { EnvironmentParameters } from '@framework/configuration/environment-constants';
import { getEnv } from '@framework/configuration/environment-helper';
import { MainPage } from '@framework/pages/main-page/main-page';
import { test as base } from '@playwright/test';

type Pages = {
    Main_Page: MainPage
}

type EnvironmentVariables = {
    baseUrl: string
}

type Services = {

}

export const test = base.extend<Pages & EnvironmentVariables & Services>({
    //Environment variables
    baseURL: getEnv(EnvironmentParameters.baseUrl),

    //Pages. Pages intialization for quick access
    Main_Page: async ({page}, use) => {
        await use(new MainPage(page));
    },
})

export default test;
export const expect = test.expect;