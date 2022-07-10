import { EnvironmentParameters } from '@framework/configuration/environment-constants';
import { getEnv } from '@framework/configuration/environment-helper';
import { test as base } from '@playwright/test';
import { RestApiRequestsFacade } from '@root/services-rest-api/facade/rest-api-requests-facade';

type EnvironmentVariables = {
    restApiBaseUrl: string
}

type Services = {
    restApiRequests: RestApiRequestsFacade
}

export const test = base.extend<EnvironmentVariables & Services>({
    //Services
    restApiRequests: new RestApiRequestsFacade(getEnv(EnvironmentParameters.restBookingBaseUrl))
})

export default test;
export const expect = test.expect;