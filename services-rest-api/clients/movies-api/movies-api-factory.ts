import { EnvironmentParameters } from "@framework/configuration/environment-constants";
import { getEnv } from "@framework/configuration/environment-helper";
import { MoviesApiStubServer, startMoviesApiStub } from "@api/stubs/movies-api-stub-server";
import { AuthTokenCache } from "./auth-token-cache";
import { MoviesApiClient } from "./movies-api-client";
import { AdminMoviesApiClient, AnonymousMoviesApiClient, RegularUserMoviesApiClient } from "./movies-api-clients";

export type MoviesBackend = "real" | "stub";

/**
 * GoF Abstract Factory.
 *
 * Creates the whole *family* of role clients (anonymous / regular user / admin) bound to ONE
 * backend, so a test can never mix e.g. a real admin with a stubbed regular user.
 * Tests and fixtures depend only on this interface; the Playwright project option
 * `moviesBackend` picks the concrete factory.
 *
 * Each `create…Client()` returns a Factory Method subclass of MoviesApiClient
 * (GoF: "Abstract Factories are often implemented with Factory Methods").
 */
export interface MoviesApiFactory {
    readonly backend: MoviesBackend;
    /** Whether tests can run against this backend (real service may be down; stub is always up). */
    isAvailable(): Promise<boolean>;
    createAnonymousClient(): MoviesApiClient;
    createRegularUserClient(): MoviesApiClient;
    createAdminClient(): MoviesApiClient;
    dispose(): Promise<void>;
}

/** Concrete factory: family bound to the real service at MOVIES_API_BASE_URL. */
export class RealMoviesApiFactory implements MoviesApiFactory {
    readonly backend = "real";
    private readonly baseUrl: string;
    /** One login per user per worker (factory is a worker-scoped fixture). */
    private readonly tokenCache = new AuthTokenCache();
    private availability?: Promise<boolean>;

    constructor(baseUrl: string = getEnv(EnvironmentParameters.moviesApiBaseUrl)) {
        this.baseUrl = baseUrl;
    }

    isAvailable(): Promise<boolean> {
        this.availability ??= MoviesApiClient.isServiceAvailable(this.baseUrl);
        return this.availability;
    }

    createAnonymousClient(): MoviesApiClient {
        return new AnonymousMoviesApiClient(this.baseUrl);
    }

    createRegularUserClient(): MoviesApiClient {
        return new RegularUserMoviesApiClient(this.baseUrl, this.tokenCache);
    }

    createAdminClient(): MoviesApiClient {
        return new AdminMoviesApiClient(this.baseUrl, this.tokenCache);
    }

    async dispose(): Promise<void> {
        this.tokenCache.clear();
    }
}

/**
 * Concrete factory: family bound to an in-process stub server that this factory owns.
 * The stub accepts the same regular/admin credentials as the real service (from env),
 * so the full login → Bearer token flow is exercised.
 */
export class StubMoviesApiFactory implements MoviesApiFactory {
    readonly backend = "stub";
    private readonly server: MoviesApiStubServer;
    private readonly tokenCache = new AuthTokenCache();

    private constructor(server: MoviesApiStubServer) {
        this.server = server;
    }

    static async start(): Promise<StubMoviesApiFactory> {
        const server = await startMoviesApiStub([
            {
                username: getEnv(EnvironmentParameters.moviesApiRegularUsername),
                password: getEnv(EnvironmentParameters.moviesApiRegularPassword),
            },
            {
                username: getEnv(EnvironmentParameters.moviesApiAdminUsername),
                password: getEnv(EnvironmentParameters.moviesApiAdminPassword),
            },
        ]);
        return new StubMoviesApiFactory(server);
    }

    async isAvailable(): Promise<boolean> {
        return true;
    }

    createAnonymousClient(): MoviesApiClient {
        return new AnonymousMoviesApiClient(this.server.baseUrl);
    }

    createRegularUserClient(): MoviesApiClient {
        return new RegularUserMoviesApiClient(this.server.baseUrl, this.tokenCache);
    }

    createAdminClient(): MoviesApiClient {
        return new AdminMoviesApiClient(this.server.baseUrl, this.tokenCache);
    }

    async dispose(): Promise<void> {
        this.tokenCache.clear();
        await this.server.close();
    }
}

export async function createMoviesApiFactory(backend: MoviesBackend): Promise<MoviesApiFactory> {
    return backend === "stub" ? await StubMoviesApiFactory.start() : new RealMoviesApiFactory();
}
