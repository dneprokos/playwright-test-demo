import { APIRequestContext, request } from "@playwright/test";
import { EnvironmentParameters } from "@framework/configuration/environment-constants";
import { getEnv } from "@framework/configuration/environment-helper";
import { AuthorizationApiRequests } from "@api/requests/movies-api/authorization-api-requests";
import { AuthTokenCache } from "./auth-token-cache";
import { JSON_HEADERS, MoviesApiClient } from "./movies-api-client";

/** Concrete creator: no Authorization header. Use for 401 / public-endpoint scenarios. */
export class AnonymousMoviesApiClient extends MoviesApiClient {
    protected async createContext(): Promise<APIRequestContext> {
        return await request.newContext({ extraHTTPHeaders: JSON_HEADERS });
    }
}

/**
 * Shared creator for authenticated roles: logs in, then produces a context that sends
 * `Authorization: Bearer <token>` on every request. Subclasses only supply credentials.
 */
export abstract class AuthenticatedMoviesApiClient extends MoviesApiClient {
    private readonly tokenCache?: AuthTokenCache;

    /**
     * @param tokenCache Optional shared cache (passed by the factory) — without it every client logs in again.
     */
    constructor(baseUrl?: string, tokenCache?: AuthTokenCache) {
        super(baseUrl);
        this.tokenCache = tokenCache;
    }

    protected abstract credentials(): { username: string; password: string };

    protected async createContext(): Promise<APIRequestContext> {
        const { username, password } = this.credentials();
        const accessToken = this.tokenCache
            ? await this.tokenCache.get(`${this.baseUrl}|${username}`, () => this.login(username, password))
            : await this.login(username, password);

        return await request.newContext({
            extraHTTPHeaders: { ...JSON_HEADERS, authorization: `Bearer ${accessToken}` },
        });
    }

    private async login(username: string, password: string): Promise<string> {
        const loginContext = await request.newContext({ extraHTTPHeaders: JSON_HEADERS });
        try {
            const { accessToken } = await new AuthorizationApiRequests(loginContext, this.baseUrl)
                .generateAuthToken(username, password);
            return accessToken;
        } finally {
            await loginContext.dispose();
        }
    }
}

/** Concrete creator: authenticated as the regular user from MOVIES_API_REGULAR_* env vars. */
export class RegularUserMoviesApiClient extends AuthenticatedMoviesApiClient {
    protected credentials() {
        return {
            username: getEnv(EnvironmentParameters.moviesApiRegularUsername),
            password: getEnv(EnvironmentParameters.moviesApiRegularPassword),
        };
    }
}

/** Concrete creator: authenticated as the admin user from MOVIES_API_ADMIN_* env vars. */
export class AdminMoviesApiClient extends AuthenticatedMoviesApiClient {
    protected credentials() {
        return {
            username: getEnv(EnvironmentParameters.moviesApiAdminUsername),
            password: getEnv(EnvironmentParameters.moviesApiAdminPassword),
        };
    }
}
