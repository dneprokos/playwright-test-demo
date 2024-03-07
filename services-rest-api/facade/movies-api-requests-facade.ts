import { APIResponse, request } from "@playwright/test";
import { AuthorizationApiRequests } from "../requests/movies-api/authorization-api-requests";
import { GenresApiRequests } from "../requests/movies-api/genres-api-requests";
import { getEnv } from "@framework/configuration/environment-helper";
import { EnvironmentParameters } from "@framework/configuration/environment-constants";

export class MoviesApiService {
    private baseUrl: string;

    constructor(baseUrl: string | undefined = undefined) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        } else {
            this.baseUrl = getEnv(EnvironmentParameters.moviesApiBaseUrl);
        }
    }

    async isServiceAvailable(): Promise<boolean> {
        try {
            const context = await request.newContext();
            const urlWithParams = `${this.baseUrl}?username=test&password=test`;
    
            // Perform the POST request
            const response: APIResponse = await context.post(urlWithParams, {
                headers: {
                    'accept': 'application/json',
                },
            });
    
            // Optionally, check the response status code if necessary
            // For example, consider the service available if the status code is 200 or 404
            if (response.status() === 200 || response.status() === 404 ) {
                return true;
            }
            // You can add more conditions based on status codes if needed
            return false; // Or handle differently based on the response
        } catch (error) {
            // If an error occurs (e.g., network error, connection refused, etc.), catch it and return false
            return false;
        }
    }

    authorizationRequests(): AuthorizationApiRequests {
        return new AuthorizationApiRequests(this.baseUrl);
    }

    genresRequests(): GenresApiRequests {
        return new GenresApiRequests(this.baseUrl);
    }
}