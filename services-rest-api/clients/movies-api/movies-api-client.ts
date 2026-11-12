import { APIRequestContext, request } from "@playwright/test";
import { EnvironmentParameters } from "@framework/configuration/environment-constants";
import { getEnv } from "@framework/configuration/environment-helper";
import { AuthorizationApiRequests } from "@api/requests/movies-api/authorization-api-requests";
import { GenresApiRequests } from "@api/requests/movies-api/genres-api-requests";

export const JSON_HEADERS = { accept: "application/json" } as const;

/**
 * Creator in the GoF Factory Method pattern.
 *
 * The client builds request objects (`genres()`, `authorization()`) the same way for every
 * caller, but defers *how the underlying APIRequestContext is created* to subclasses via
 * the `createContext()` factory method — anonymous, regular user, admin, ...
 *
 * The context is created lazily on first use, shared by all request objects of this client,
 * and released by `dispose()` (called automatically by the Playwright fixtures).
 */
export abstract class MoviesApiClient {
    protected readonly baseUrl: string;
    private contextPromise?: Promise<APIRequestContext>;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl ?? getEnv(EnvironmentParameters.moviesApiBaseUrl);
    }

    /** Factory method: subclasses decide which request context (auth) to produce. */
    protected abstract createContext(): Promise<APIRequestContext>;

    private getContext(): Promise<APIRequestContext> {
        this.contextPromise ??= this.createContext();
        return this.contextPromise;
    }

    async authorization(): Promise<AuthorizationApiRequests> {
        return new AuthorizationApiRequests(await this.getContext(), this.baseUrl);
    }

    async genres(): Promise<GenresApiRequests> {
        return new GenresApiRequests(await this.getContext(), this.baseUrl);
    }

    async dispose(): Promise<void> {
        const contextPromise = this.contextPromise;
        this.contextPromise = undefined;
        await contextPromise?.then(
            (context) => context.dispose(),
            () => undefined, // context was never created (e.g. login failed) — nothing to release
        );
    }

    /**
     * Health check: the service is considered available when the authorization endpoint exists
     * (any status except 404). Network errors mean "not available".
     */
    static async isServiceAvailable(baseUrl: string = getEnv(EnvironmentParameters.moviesApiBaseUrl)): Promise<boolean> {
        const context = await request.newContext({ extraHTTPHeaders: JSON_HEADERS });
        try {
            const response = await context.post(`${baseUrl}/authorization`, {
                params: { username: "health-check", password: "health-check" },
                timeout: 5000,
            });
            return response.status() !== 404;
        } catch {
            return false;
        } finally {
            await context.dispose();
        }
    }
}
