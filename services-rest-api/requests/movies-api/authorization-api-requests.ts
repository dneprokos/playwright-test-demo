import { APIRequestContext } from "@playwright/test";
import { AuthorizationApiModel } from "@root/services-rest-api/models/movie-models/authorization-api-model";

export class AuthorizationApiRequests {
    private request: APIRequestContext;
    private baseUrl: string;
    private resourceUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.resourceUrl = `${this.baseUrl}/authorization`;
    }

    // async postAuthorization(username: string, password: string): Promise<AuthorizationApiModel> {
        
    // } 

}