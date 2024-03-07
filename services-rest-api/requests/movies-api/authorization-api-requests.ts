import { APIResponse, request } from "@playwright/test";
import { AuthorizationApiModel } from "@root/services-rest-api/models/movie-models/authorization-api-model";

export class AuthorizationApiRequests {
    private baseUrl: string;
    private resourceUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.resourceUrl = `${this.baseUrl}/authorization`;
    }

    async generateAuthToken(username: string, password: string): Promise<AuthorizationApiModel> {
        // Create a new HTTP context
        const context = await request.newContext();
        
        // Construct the URL with query parameters
        const urlWithParams = `${this.resourceUrl}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        // Perform the POST request
        const response: APIResponse = await context.post(urlWithParams, {
            headers: {
                'accept': 'application/json'
            }
        });

        // Assuming the API returns a JSON response, parse the response body
        const responseBody: AuthorizationApiModel = await response.json();

        return responseBody;
    } 

}