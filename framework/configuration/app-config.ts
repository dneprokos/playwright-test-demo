import * as dotenv from "dotenv";
import Joi from "joi";
import * as path from "path";

/** Schema keys every test project shares (runner settings). Spread into a project schema. */
export const runnerSettingsSchema = {
    HEADLESS_BROWSER: Joi.boolean().required(),
    WORKERS: Joi.number().integer().min(1).required(),
    RETRY_FAILED: Joi.number().integer().min(0).required(),
    MAX_TEST_RUNTIME: Joi.number().integer().min(1000).required(),
};

export interface RunnerSettings {
    HEADLESS_BROWSER: boolean;
    WORKERS: number;
    RETRY_FAILED: number;
    MAX_TEST_RUNTIME: number;
}

const instances = new Map<string, Readonly<object>>();

/**
 * Singleton configuration loader (GoF Singleton, keyed per `.env` file — i.e. a small Multiton).
 *
 * The first call for a given `.env` file loads it into `process.env`, validates it with the Joi
 * schema (fail fast, all errors at once), converts types and returns a frozen object with only
 * the schema keys. Every later call for the same file returns that same instance.
 *
 * Scope: one instance per Node process. Playwright runs each worker in its own process, so
 * every worker validates once and gets its own (identical, read-only) copy — which is why the
 * object is immutable: there is no shared mutable state to drift between processes.
 *
 * Already-set environment variables win over `.env` values (dotenv default), so CI can override.
 */
export function loadConfig<T extends object>(envFile: string, schema: Record<keyof T, Joi.Schema>): Readonly<T> {
    const key = path.resolve(envFile);
    const existing = instances.get(key);
    if (existing) return existing as Readonly<T>;

    dotenv.config({ path: key, quiet: true });

    const { value, error } = Joi.object(schema)
        .unknown(true)
        .validate(process.env, { abortEarly: false, convert: true });

    if (error) {
        throw new Error(`Invalid configuration (${key}): ${error.message}`);
    }

    const config = Object.freeze(
        Object.fromEntries(Object.keys(schema).map((name) => [name, value[name]])),
    ) as Readonly<T>;

    instances.set(key, config);
    return config;
}
