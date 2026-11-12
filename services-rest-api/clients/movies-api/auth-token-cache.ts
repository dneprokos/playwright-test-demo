/**
 * Caches bearer tokens so each user logs in once per cache owner instead of once per test.
 *
 * Owned by a MoviesApiFactory, which is a worker-scoped fixture — so the cache lives exactly
 * as long as the worker, is separate for real and stub backends, and is never shared across
 * processes. Failed logins are not cached; tokens are refreshed after `ttlMs`.
 */
export class AuthTokenCache {
    private readonly entries = new Map<string, { token: Promise<string>; expiresAt: number }>();
    private readonly ttlMs: number;

    constructor(ttlMs = 15 * 60 * 1000) {
        this.ttlMs = ttlMs;
    }

    get(key: string, login: () => Promise<string>): Promise<string> {
        const cached = this.entries.get(key);
        if (cached && cached.expiresAt > Date.now()) return cached.token;

        const token = login();
        this.entries.set(key, { token, expiresAt: Date.now() + this.ttlMs });
        // do not keep a failed login around; the caller still receives the rejection
        token.catch(() => this.entries.delete(key));
        return token;
    }

    clear(): void {
        this.entries.clear();
    }
}
