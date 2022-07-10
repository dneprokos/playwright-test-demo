import { EnvironmentParameters } from '@framework/configuration/environment-constants';
import { getEnv } from '@framework/configuration/environment-helper';
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login-page/login-page';

type Pages = {
    LoginPage: LoginPage;
}

type EnvironmentVariables = {
    baseUrl: string
    restApiBaseUrl: string
}

export const test = base.extend<Pages & EnvironmentVariables>({
    //Environment variables
    baseURL: getEnv(EnvironmentParameters.baseUrl),

    //Pages. Pages intialization for quick access
    LoginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    }
})

export default test;
export const expect = test.expect;