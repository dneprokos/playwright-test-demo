import { test as base } from '@playwright/test';
import { RestApiRequestsFacade } from '@root/services-rest-api/facade/rest-api-requests-facade';
import { Config } from './config';

type EnvironmentVariables = {
    restApiBaseUrl: string
}

type Services = {
    restApiRequests: RestApiRequestsFacade
}

export const test = base.extend<EnvironmentVariables & Services>({
    //Services
    restApiRequests: new RestApiRequestsFacade(Config.REST_BOOKING_BASE_URL)
})

export default test;
export const expect = test.expect;