/**
 * Generic Test Data Builder (Nat Pryce, 2007 — a test-oriented variant of the GoF Builder).
 *
 * Subclasses provide sensible defaults via `defaults()`; tests override only the fields
 * relevant to the scenario. `build()` returns a deep copy, so one builder can safely
 * produce several independent objects.
 *
 * @example
 * ```
 * const user = new PetstoreUserBuilder().withUsername('admin').build();
 * const users = PetstoreUserBuilder.buildMany(3);
 * ```
 */
export abstract class BaseBuilder<T extends object> {
    protected data: T;

    constructor() {
        this.data = this.defaults();
    }

    /** Default (valid) object. Called once per builder instance. */
    protected abstract defaults(): T;

    /** Generic override for any field. Prefer the typed `withX()` helpers in subclasses. */
    with<K extends keyof T>(key: K, value: T[K]): this {
        this.data[key] = value;
        return this;
    }

    /** Merge several overrides at once. */
    withOverrides(overrides: Partial<T>): this {
        this.data = { ...this.data, ...overrides };
        return this;
    }

    build(): T {
        return structuredClone(this.data);
    }
}
