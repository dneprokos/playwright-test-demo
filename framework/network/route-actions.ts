import { BrowserContext, Page, Route, test } from "@playwright/test";

/**
 * GoF Command — a network interception action packaged as an object.
 *
 * The test (client) creates a command, `intercept()` hands it to Playwright's
 * router (invoker), and the router calls `execute()` later, once per matching
 * request. Because each command is an object it can be named, reused across
 * tests, and asked afterwards how many requests it handled.
 */
export abstract class RouteAction {
    private handled = 0;

    /** Human-readable name used in report steps. */
    abstract readonly description: string;

    /** Number of requests this command has handled. Assert on it to prove the route actually matched. */
    get handledCount(): number {
        return this.handled;
    }

    async execute(route: Route): Promise<void> {
        this.handled++;
        await this.handle(route);
    }

    protected abstract handle(route: Route): Promise<void>;
}

/** Fail the request, as if the network were down. */
export class AbortRequest extends RouteAction {
    readonly description = 'abort';

    protected async handle(route: Route): Promise<void> {
        await route.abort();
    }
}

/** Let the request through unchanged, logging the JSON response body. Acts as a Spy. */
export class LogAndContinue extends RouteAction {
    readonly description = 'log and continue';

    protected async handle(route: Route): Promise<void> {
        const response = await route.fetch();
        console.log(route.request().url(), JSON.stringify(await response.json(), null, 2));
        await route.continue();
    }
}

/** Answer with a fixed JSON body instead of calling the server. Acts as a Stub. */
export class FulfillJson extends RouteAction {
    readonly description: string;

    constructor(private readonly body: unknown, private readonly status = 200) {
        super();
        this.description = `fulfill ${status} JSON`;
    }

    protected async handle(route: Route): Promise<void> {
        await route.fulfill({ status: this.status, json: this.body });
    }
}

/** Invoker helper: registers a command for every request matching `url`. Returns the command for later assertions. */
export async function intercept<T extends RouteAction>(target: Page | BrowserContext, url: string | RegExp, action: T): Promise<T> {
    await test.step(`Intercept ${url}: ${action.description}`, async () => {
        await target.route(url, route => action.execute(route));
    });
    return action;
}
