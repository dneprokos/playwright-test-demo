import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import AuthorizationApiModel from "@api/models/movie-models/authorization-api-model";

export class AuthorizationApiRequests {
    private readonly context: APIRequestContext;
    private readonly resourceUrl: string;

    constructor(context: APIRequestContext, baseUrl: string) {
        this.context = context;
        this.resourceUrl = `${baseUrl}/authorization`;
    }

    /** Raw response — use for negative scenarios (wrong credentials, etc.). */
    async generateAuthTokenResponse(username: string, password: string): Promise<APIResponse> {
        return await this.context.post(this.resourceUrl, { params: { username, password } });
    }

    /** Happy path — asserts 200 and returns the token body. */
    async generateAuthToken(username: string, password: string): Promise<AuthorizationApiModel> {
        const response = await this.generateAuthTokenResponse(username, password);
        expect(response.status()).toBe(200);
        return (await response.json()) as AuthorizationApiModel;
    }
}
