import { expect, request } from "@playwright/test";
import GenreApiModel from "@root/services-rest-api/models/movie-models/genre-api-model";

export class GenresApiRequests {
    private baseUrl: string;
    private resourceUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.resourceUrl = `${this.baseUrl}/genres`;
    }

    async getGenreById(id: number, bearerToken: string): Promise<GenreApiModel> {
        const context = await request.newContext();

        const urlWithParams = `${this.resourceUrl}/${id}`;

        const response = await context.get(urlWithParams, {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${bearerToken}`
            }
        });

        expect(response.status()).toBe(200);

        const responseBody: GenreApiModel = await response.json();

        return responseBody;
    }

}