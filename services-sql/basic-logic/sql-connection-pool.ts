import * as sql from "mssql";

/**
 * GoF Singleton per connection configuration (a Multiton): one connected `mssql` pool per
 * config per process, shared by every SqlBaseRequest. Opening a pool is expensive; the pool
 * itself is safe for concurrent queries.
 *
 * Scope: Playwright workers are separate processes, so each worker gets its own pool.
 * Call `closeAll()` when the worker finishes (see the worker-scoped `sqlConnectionPools`
 * auto fixture in `_project-organic-shop-site-tests/playwright-fixture-extention.ts`).
 */
export class SqlConnectionPool {
    private static readonly pools = new Map<string, Promise<sql.ConnectionPool>>();

    private constructor() {
        // static access only
    }

    static get(config: string | sql.config): Promise<sql.ConnectionPool> {
        const key = typeof config === "string" ? config : JSON.stringify(config);
        const existing = SqlConnectionPool.pools.get(key);
        if (existing) return existing;

        // mssql writes defaults into the config object it receives, which would change the
        // caller's object (and its cache key) — so it gets a copy
        const pool = (typeof config === "string"
            ? new sql.ConnectionPool(config)
            : new sql.ConnectionPool({ ...config, options: { ...config.options } })
        ).connect();
        SqlConnectionPool.pools.set(key, pool);
        // a failed connection is not cached, so the next call retries
        pool.catch(() => SqlConnectionPool.pools.delete(key));
        return pool;
    }

    static async closeAll(): Promise<void> {
        const pools = [...SqlConnectionPool.pools.values()];
        SqlConnectionPool.pools.clear();
        await Promise.allSettled(pools.map((pool) => pool.then((connected) => connected.close())));
    }
}
