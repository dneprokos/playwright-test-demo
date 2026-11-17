import { test } from '@playwright/test';

export type StepOptions = {
  /** Report failures at the call site of the decorated method instead of inside it. */
  box?: boolean;
};

type AsyncMethod<This, Args extends unknown[], Return> = (this: This, ...args: Args) => Promise<Return>;

/**
 * GoF Decorator (TC39 / TypeScript 5 method decorator form).
 *
 * Wraps an async method in `test.step()` so it shows up as a named step in the
 * Playwright / Allure report, without changing the method body.
 *
 * Step name:
 * - `@step()` uses `ClassName.methodName`. Arguments are NOT printed, so
 *   credentials passed to a method never leak into the report.
 * - `@step('Login as {0}')` uses the given title; `{n}` is replaced with the
 *   n-th argument. Only reference arguments that are safe to print.
 *
 * @example
 * ```ts
 * class LoginPage extends BasePage {
 *   @step('Login to application', { box: true })
 *   async performLoginActions(username: string, password: string) { ... }
 *
 *   @step('Navigate to {0}')
 *   async clickNavigationMenuButton(menuName: string) { ... }
 * }
 * ```
 */
export function step(title?: string, options: StepOptions = {}) {
  return function <This, Args extends unknown[], Return>(
    target: AsyncMethod<This, Args, Return>,
    context: ClassMethodDecoratorContext<This, AsyncMethod<This, Args, Return>>,
  ): AsyncMethod<This, Args, Return> {
    return async function (this: This, ...args: Args): Promise<Return> {
      const className = (this as object).constructor.name;
      const name = title
        ? title.replace(/\{(\d+)\}/g, (match, index) => (index < args.length ? String(args[Number(index)]) : match))
        : `${className}.${String(context.name)}`;

      return test.step(name, async () => target.call(this, ...args), { box: options.box });
    };
  };
}
