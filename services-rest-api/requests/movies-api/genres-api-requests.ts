import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import GenreApiModel from "@api/models/movie-models/genre-api-model";

export class GenresApiRequests {
    private readonly context: APIRequestContext;
    private readonly resourceUrl: string;

    /**
     * @param context Request context created by a MoviesApiClient (already carries auth headers, if any)
     */
    constructor(context: APIRequestContext, baseUrl: string) {
        this.context = context;
        this.resourceUrl = `${baseUrl}/genres`;
    }

    /** Raw response — use for negative / authorization scenarios. */
    async getGenreByIdResponse(id: number): Promise<APIResponse> {
        return await this.context.get(`${this.resourceUrl}/${id}`);
    }

    /** Happy path — asserts 200 and returns the typed body. */
    async getGenreById(id: number): Promise<GenreApiModel> {
        const response = await this.getGenreByIdResponse(id);
        expect(response.status()).toBe(200);
        return (await response.json()) as GenreApiModel;
    }
}
