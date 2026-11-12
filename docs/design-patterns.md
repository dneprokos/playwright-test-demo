# Design Patterns in playwright-test-demo

This document lists the design patterns used in the repository, where each one lives, **what kind of pattern it is and where it originally comes from**, and notes on how consistently it is applied. The standalone `world/` Vite app is excluded.

## Repository layout (context)

| Layer | Location | Role |
|---|---|---|
| Shared framework | `framework/` | Base page/fragment, config helpers, decorators, data generators, wait helpers |
| API service layer | `services-rest-api/` | Request classes, facades, DTO models |
| SQL service layer | `services-sql/` | Base SQL request wrapper |
| Test projects | `_project-*/` | One Playwright project per system under test (own config, fixtures, pages, tests) |

---

## Pattern categories (origin legend)

Not every "pattern" comes from the same source. Each pattern below is tagged with one of these categories:

| Tag | Source / origin | What it covers |
|---|---|---|
| **GoF** | *Design Patterns: Elements of Reusable Object-Oriented Software* — Gamma, Helm, Johnson, Vlissides ("Gang of Four"), 1994 | 23 classic OO patterns, split into **Creational** (object creation), **Structural** (object composition), **Behavioral** (object interaction) |
| **PoEAA** | *Patterns of Enterprise Application Architecture* — Martin Fowler, 2002 | Layering and data patterns for business apps: Layer Supertype, DTO, Value Object, Registry, Gateway, Service Layer |
| **DDD** | *Domain-Driven Design* — Eric Evans, 2003 | Domain modelling: Value Object, Entity, Aggregate |
| **xUnit** | *xUnit Test Patterns* — Gerard Meszaros, 2007 | Patterns for test code: Fixture setup/teardown, Test Double (Stub/Mock/Fake), Generated Value |
| **Test Automation** | Selenium/WebDriver community (Simon Stewart, ~2009), later popularised by Martin Fowler's bliki *PageObject* (2013) and frameworks like Serenity | Patterns specific to UI/API automation: Page Object, Page Component, API Object, Step Library |
| **Playwright** | Built-in mechanism of `@playwright/test` | Framework feature that implements a pattern for you (fixtures, `test.step`, `route`) |
| **Idiom / Principle** | General engineering practice, not a formal catalog entry | Fluent Interface, Fail Fast, Arrange-Act-Assert, Twelve-Factor config |

### Summary table

| # | Pattern | Category | Original source |
|---|---|---|---|
| 1 | Page Object Model | Test Automation | Selenium WebDriver wiki; Fowler, *PageObject* (2013) |
| 2 | Page Fragment / Component Object | Test Automation (+ GoF composition principle) | Selenium community "Page Components" / HtmlElements |
| 3 | Layer Supertype (base classes) | PoEAA | Fowler, PoEAA (2002) |
| 4 | Dependency Injection via fixtures | Principle + xUnit + Playwright | Fowler, *IoC Containers and the DI pattern* (2004); Meszaros *Fixture* |
| 5 | Facade | GoF — Structural | GoF (1994) |
| 6 | API Object / Service Object | Test Automation (≈ PoEAA Gateway) | POM idea applied to APIs; Fowler *Gateway* |
| 7 | Data Transfer Object / Model | PoEAA | Fowler, PoEAA (2002) |
| 8 | Fluent Interface / Method Chaining | Idiom | Fowler & Evans, *FluentInterface* (2005) |
| 9 | Navigation returns next Page Object | Test Automation | Selenium Page Object guidelines |
| 10 | Value Object + Registry | DDD + PoEAA | Evans (2003); Fowler PoEAA *Registry* |
| 11 | Configuration (Constants, Fail Fast, Singleton, Env config) | Idiom + GoF Creational (Singleton) | Jim Shore *Fail Fast* (2004); Twelve-Factor App (2011); GoF |
| 12 | Decorator (`@step`) | GoF — Structural (language-level form) | GoF (1994); TC39 / TypeScript 5 decorators |
| 13 | Step Objects / Step Library | Test Automation | Serenity BDD "step libraries", BDD step definitions |
| 14 | Test structure (AAA, hooks, soft asserts, suite setup) | xUnit + Idiom | Bill Wake *Arrange-Act-Assert* (2001); Meszaros (2007) |
| 15 | Test Double via request interception | xUnit + Playwright | Meszaros *Test Double* (2007) |
| 16 | Generated test data | xUnit | Meszaros *Generated Value* (2007) |
| 17 | Wrapper around external library | GoF — Structural (Adapter-like) / PoEAA Gateway | GoF (1994); Fowler PoEAA |
| 18 | Test Data Builder | GoF — Creational (Builder) + xUnit / Test Automation | GoF (1994); Nat Pryce, *Test Data Builders* (2007) |
| 19 | Factory Method | GoF — Creational | GoF (1994) |
| 20 | Abstract Factory | GoF — Creational | GoF (1994) |
| 21 | Singleton (per process) / Multiton | GoF — Creational | GoF (1994); Multiton is a keyed variant |

---

## 1. Page Object Model (POM)

**Category:** Test Automation. **Origin:** Selenium WebDriver project (~2009, Simon Stewart); described by Martin Fowler in *PageObject* (2013). Not a GoF pattern. It applies the general encapsulation principle to UI screens.

The core UI pattern. Each screen is a class that hides locators and exposes intention-revealing methods.

- Base class: `framework/page-base/base-page.ts` (`BasePage`: holds `page`, provides `navigateUrl()` and `waitForPageLoad()`).
- Implementations:
  - `_project-herokuapp-components-tests/pages/**` (e.g. `login-page/login-page.ts`, `_main-page/main-page.ts`, `windows-page/windows-page.ts`)
  - `_project-test-automation-site-tests/pages/**`
  - `_project-organic-shop-site-tests/pages/main-page/main-page.ts`

Locators are defined in two styles: `readonly Locator` fields set in the constructor (`main-page.ts`, `login-page.ts`) and private selector strings (`frames-page.ts`, `example-one-table-fragment.ts`).

## 2. Page Fragment / Component Object (Composition)

**Category:** Test Automation. **Origin:** Selenium community "Page Components" (also Yandex HtmlElements, Serenity). It relies on the GoF principle *"favor object composition over class inheritance"*. It is close to a GoF **Composite**, but fragments are not treated uniformly with pages, so it is not a strict Composite.

Reusable parts of a page (header, footer, table, form, paging) are modelled as fragments and **composed** into pages.

- Base class: `framework/page-base/base-fragment.ts` (`BaseFragment`)
- Examples:
  - `_project-test-automation-site-tests/pages/_common-pages/fragments/header-fragment.ts`, `footer-fragment.ts`
  - `_project-test-automation-site-tests/pages/table-page/table-page.ts` composes `TableDataFragment`, `FilterTableDataFragment`, `TablePagingFragment`
  - `_project-test-automation-site-tests/pages/login-page/login-page.ts` composes `LoginFormFragment`
  - `_project-organic-shop-site-tests/pages/main-page/main-page.ts` composes `CategoriesFragment`, `FilteredProductsFragment`, `HeaderFragment`
  - `_project-herokuapp-components-tests/pages/data-tables-page/data-tables-page.ts` composes `ExampleOneTable`, `ExampleTwoTable`

## 3. Layer Supertype (Base-class inheritance)

**Category:** PoEAA. **Origin:** Martin Fowler, *Patterns of Enterprise Application Architecture* (2002): "a type that acts as the supertype for all types in its layer". This is **not** GoF Template Method: the base classes share state and helpers but do not define an algorithm skeleton with overridable steps.

A shared base type supplies common state and behaviour. Intermediate layers add shared layout.

- `BasePage` → `PageWithHeaderAndFooter` (`_project-test-automation-site-tests/pages/_common-pages/page-with-header-and-footer.ts`) → `HomePage`, `TablePage`, `TogglePage`, etc.
- `BaseFragment` → every fragment class.

## 4. Dependency Injection via Playwright Fixtures

**Category:** Principle (Inversion of Control) + xUnit (*Fixture*) + Playwright. **Origin:** DI was named by Martin Fowler in *Inversion of Control Containers and the Dependency Injection pattern* (2004). Test fixtures come from Meszaros, *xUnit Test Patterns* (2007). Playwright's `test.extend()` is the framework's own DI container. Each fixture function also acts as a **Simple Factory** (an idiom, not the GoF Factory Method).

Page objects and services are created by the test runner and injected into tests by name. Tests never call `new SomePage(page)`.

- `_project-herokuapp-components-tests/fixture-extention.ts`: `base.extend<Pages>` registers 18 page objects (`mainPage`, `loginPage`, ...)
- `_project-test-automation-site-tests/playwright-fixture-extention.ts`: pages + overridden `baseURL`
- `_project-organic-shop-site-tests/playwright-fixture-extention.ts`: pages + `restApiRequests` service
- `_project-rest-api-tests/playwright-fixture-extention.ts`: `restApiRequests` service only

Usage: `test('...', async ({ dataTablesPage }) => { ... })` in `tests/data-tables-page.tests.ts`.

Fixture factories (`async ({ page }, use) => use(new X(page))`) also give a per-test lifecycle: setup runs before `use`, teardown after.

## 5. Facade

**Category:** GoF — Structural. **Origin:** *Design Patterns* (1994): "provide a unified interface to a set of interfaces in a subsystem".

A single entry point hides the construction of several request classes and shared config (base URL, request context).

- `services-rest-api/facade/rest-api-requests-facade.ts`: `RestApiRequestsFacade.bookingRequests(ctx)` returns `BookingsApiRequests`
- `services-rest-api/clients/movies-api/movies-api-client.ts`: `MoviesApiClient.genres()`, `.authorization()`. This class is also the Creator in the Factory Method (section 19). It replaces the former `MoviesApiService`.

Used in `_project-rest-api-tests/tests/rest-api-example.tests.ts` and `_project-herokuapp-components-tests/tests/api_examples/genres-api-tests.ts`.

## 6. API Object / Service Object (Request classes)

**Category:** Test Automation (structurally a PoEAA **Gateway**). **Origin:** the Page Object idea transferred to HTTP APIs by the automation community. Fowler's *Gateway* (PoEAA, 2002) describes the same idea: "an object that encapsulates access to an external system or resource".

The API counterpart of POM: one class per REST resource, wrapping endpoints, headers and status assertions. The Movies API request classes take an injected `APIRequestContext` and offer two variants of each call: a raw `...Response()` method for negative tests and a typed happy-path method that asserts 200.

- `services-rest-api/requests/bookings-requests.ts` (`/booking`)
- `services-rest-api/requests/movies-api/authorization-api-requests.ts` (`/authorization`)
- `services-rest-api/requests/movies-api/genres-api-requests.ts` (`/genres`)
- `services-rest-api/requests/movies-api/movies-api-requests.ts`: empty placeholder

## 7. Data Transfer Objects / Models

**Category:** PoEAA. **Origin:** Fowler, PoEAA (2002), *Data Transfer Object*. In TypeScript these are plain `interface`s describing payload shape, with no behaviour.

Typed shapes for API payloads and UI table rows, used for deep-equality assertions.

- API: `services-rest-api/models/booking-model/*`, `services-rest-api/models/movie-models/*`
- UI: `_project-herokuapp-components-tests/pages/data-tables-page/models/example-one-table-model.ts`, `_project-test-automation-site-tests/pages/table-page/fragments-and-models/table-model.ts`

Example: `ExampleOneTable.getTableData()` maps DOM rows to `ExampleOneTableModel[]`, then the test compares them with `toEqual`.

## 8. Fluent Interface / Method Chaining

**Category:** Idiom. **Origin:** the term was coined by Martin Fowler and Eric Evans in *FluentInterface* (2005). It is not in GoF, though GoF **Builder** often uses it.

Methods return `this` or the next object so calls can be chained.

- `ExampleOneTable.sortTableByField()` returns `this` → `(await table.sortTableByField(...)).getTableData()` (`example-one-table-fragment.ts`)
- `RestApiRequestsFacade.bookingRequests(request).getBookingIds()` and `MoviesApiService().genresRequests().getGenreById(...)`

## 9. Navigation returns next Page Object (Page Transition)

**Category:** Test Automation. **Origin:** Selenium Page Object guidelines: "methods on a PageObject should return other PageObjects" to model the user journey.

- `_project-herokuapp-components-tests/pages/frames-page/frames-page.ts`: `navigateToIFramePage(): Promise<IFramePage>`, `navigateToNestedFramesPage(): Promise<NestedFramesPage>`
- `windows-page.ts`: `clickClickHereLink(): Promise<Page>` returns the new tab

## 10. Value Object / Registry of page metadata

**Category:** DDD (Value Object) + PoEAA (Registry). **Origin:** Value Object comes from Eric Evans, *Domain-Driven Design* (2003), and Fowler's PoEAA: a small immutable object compared by value. Registry comes from Fowler's PoEAA: a well-known object where others look up shared objects.

- `framework/page-base/page-data.ts`: `PageData` (immutable URL + name, private fields, getters only)
- `_project-herokuapp-components-tests/pages/pages-constants.ts`: `PageDataConstants` builds a registry of ~45 `PageData` entries from a base URL
- `_project-test-automation-site-tests/utils/constants/page-uri-constants.ts`: static `PageUrls`

## 11. Configuration patterns

**Category:** mix of Idiom/Principle and GoF Creational. **Origins:**
- *Constants class*: a common idiom with no formal catalog entry.
- *Fail Fast*: Jim Shore, IEEE Software (2004). Stop immediately on invalid state.
- *Config in environment*: The Twelve-Factor App, factor III (Heroku, 2011).
- *Singleton*: GoF Creational (1994). In TS/Node, module caching makes any exported object a de-facto singleton.

| Pattern | Category | Location | Notes |
|---|---|---|---|
| Constants class (key registry) | Idiom | `framework/configuration/environment-constants.ts` | Env var names as static fields |
| Fail-fast accessor | Principle | `framework/configuration/environment-helper.ts` | `getEnv()` throws when a variable is missing; still used by the shared service layer (`services-rest-api`) so it stays independent of any one project |
| Validated config Singleton | Principle + GoF Creational | `framework/configuration/app-config.ts` + `_project-*/config.ts` | Every project validates its `.env` with Joi once per process and reads typed, frozen values from `Config`. See section 21 |

## 12. Decorator

**Category:** GoF — Structural, in its language-level form. **Origin:** GoF Decorator (1994) wraps an object to add behaviour without changing it. TypeScript 5 / TC39 stage-3 decorators apply the same idea at method level. It also overlaps with aspect-oriented programming (a cross-cutting reporting concern).

- `framework/decorators/step_decorator.ts.ts`: method decorator `@step` that wraps a method in `test.step()` for reporting.
- Status: defined but not applied anywhere yet. The same wrapping is done by hand in `login-page.ts` and `utils/common-steps/*.ts` (`test.step(..., { box: true })`).

## 13. Step Objects / Step Library

**Category:** Test Automation. **Origin:** Serenity BDD "step libraries" and Cucumber/BDD step definitions. Business-level actions sit in a layer above page objects. The Screenplay pattern (Antony Marcano, ~2007; Serenity) is a more formal evolution of this idea and is **not** used here.

Higher-level business steps grouped outside pages.

- `_project-test-automation-site-tests/utils/common-steps/basic-steps.ts`: `openBasePageAndLoginWithSessionStorage()`
- `_project-test-automation-site-tests/utils/common-steps/browser-application-utils.ts`: `setSessionStorage()`
- In-page steps: `LoginPage.performLoginActions()` and `verifyThatUserWasLoggedIn()` in the herokuapp project

## 14. Test structure patterns

**Category:** xUnit + Idiom + Playwright. **Origins:**
- *Arrange-Act-Assert*: Bill Wake (2001). Idiom.
- *Implicit Setup / Fresh Fixture* (`beforeEach`), *Shared Fixture* (`beforeAll`), *Suite Fixture Setup* (global setup/teardown): Meszaros, *xUnit Test Patterns* (2007).
- *Soft assertions*: test automation idiom (TestNG `SoftAssert`, AssertJ `SoftAssertions`), built into Playwright as `expect.soft`.
- *Projects as configuration variants*: Playwright feature (parameterised runs).

Where they are used:
- **Arrange-Act-Assert:** explicit `//Arrange //Act //Assert` comments in nearly every test.
- **Shared setup hooks:** `beforeEach` navigates to the page under test (all herokuapp tests). A `beforeAll` + `test.skip` guard skips tests when a service is unavailable (`genres-api-tests.ts`).
- **Soft assertions:** `expect.soft` in `request_intercept/*.tests.ts`.
- **Global setup/teardown:** `global-setup.ts`, `global-teardown.ts` (stops the Docker container).
- **Projects:** `playwright.config.ts` defines Chrome, Chrome in New York (locale/timezone/geolocation) and bundled Chromium.

## 15. Test Double: Request Interception (Stub / Mock)

**Category:** xUnit + Playwright. **Origin:** Meszaros, *xUnit Test Patterns* (2007), which defines Test Double and its kinds: Dummy, Stub, Spy, Mock, Fake. `route.fulfill()` with fake data is a **Stub**. `route.abort()` simulates failure. `route.fetch()` + log + `continue()` is a **Spy**. Playwright's `route` is the mechanism.

Network responses are aborted, logged, or replaced with fake data via `context.route()`.

- `_project-herokuapp-components-tests/tests/request_intercept/ninja-pizza-intercept.tests.ts`
- `_project-herokuapp-components-tests/tests/request_intercept/karabas-intercept.tests.ts`
- `_project-test-automation-site-tests/tests/request-interception.tests.ts`

## 16. Generated Test Data

**Category:** xUnit. **Origin:** Meszaros, *Generated Value* (2007): produce test values at run time instead of hard-coding them. These helpers produce single values. Building whole payload objects is handled by the Test Data Builders in section 18.

- `framework/helpers/data-generatos/*`: random string, number, boolean
- `framework/helpers/random-helpers.ts`: `RandomHelper`
- `framework/helpers/test-data-helper.ts`: Faker wrappers (uses `module.exports`, unlike the rest of the code)

## 17. Wrapper around external libraries

**Category:** GoF — Structural (Adapter-like) / PoEAA Gateway. **Origin:** a GoF Adapter converts one interface into another that clients expect. `SqlBaseRequest` mostly simplifies `mssql` behind one method rather than matching a target interface, so it is closer to Fowler's **Gateway**. `wait-helpers.ts` is a plain utility function (polling idiom), not a catalog pattern.

- `services-sql/basic-logic/base-sql-request.ts`: `SqlBaseRequest` wraps `mssql` queries and converts errors. It runs queries on the shared per-worker pool from section 21. No tests use it yet (`sql-example.tests.ts` is empty).
- `framework/helpers/wait-helpers.ts`: custom polling wait around `Locator.count()`.

## 18. Test Data Builder (API request payloads)

**Category:** GoF — Creational (Builder), in its test-oriented form (xUnit / Test Automation). **Origin:** GoF Builder (1994) separates how a complex object is constructed from its representation. Nat Pryce's *Test Data Builders* (2007) adapts it for tests: every field gets a valid default, and a test overrides only the fields that matter to its scenario. The `withX()` methods return `this`, so the builder is also a **Fluent Interface** (section 8).

- Base class: `framework/builders/base-builder.ts`, `BaseBuilder<T>`:
  - `defaults()`: abstract; each subclass supplies a valid object.
  - `with(key, value)`: typed generic override.
  - `withOverrides(partial)`: merge several overrides at once.
  - `build()`: returns a deep copy (`structuredClone`), so one builder can produce independent objects.
- Concrete builders. Their defaults come from Faker, so every run gets unique data:
  - `services-rest-api/builders/petstore-user-builder.ts`: `PetstoreUserBuilder` for Petstore `POST /user` (model: `services-rest-api/models/petstore-models/petstore-user-model.ts`)
  - `services-rest-api/builders/booking-builder.ts`: `BookingBuilder` for Restful Booker `POST/PUT /booking`. It generates consistent dates (check-in within 30 days, stay of 1-14 nights) and provides `withoutAdditionalNeeds()` for optional-field cases.
  - Both have a static `buildMany(n)` for bulk data.
- Usage: `_project-herokuapp-components-tests/tests/api_examples/create-user-in-petstore-api.tests.ts`

```ts
// all defaults
const payload = new PetstoreUserBuilder().build();

// override only what the test asserts on
const payload = new PetstoreUserBuilder()
    .withUsername(`pw_user_${Date.now()}`)
    .withName('John', 'Doe')
    .build();

const booking = new BookingBuilder().withGuest('Jim', 'Brown').withDepositPaid().build();
```

Why use it: it replaces hard-coded literals like `"email": "string"`, avoids collisions on unique fields (such as username) when tests run in parallel, and makes each test show only the data it cares about.

## 19. Factory Method

**Category:** GoF — Creational. **Origin:** *Design Patterns* (1994): "define an interface for creating an object, but let subclasses decide which class to instantiate". A **Creator** class calls an abstract `create…()` method instead of `new`, and each **Concrete Creator** subclass overrides it to produce its own **Product**. This differs from a *Simple Factory* or creation method (such as `bookingRequests()` in section 5 or `navigateToIFramePage()` in section 9), where no subclass varies what gets created.

### 19.1 Movies API clients per user role

The Product is a Playwright `APIRequestContext`, configured with the right authentication.

| Role | Class | `createContext()` produces |
|---|---|---|
| Creator | `MoviesApiClient` (`services-rest-api/clients/movies-api/movies-api-client.ts`) | abstract; base class builds `genres()` / `authorization()` request objects on top of it, creates it lazily, and releases it in `dispose()` |
| Concrete Creator | `AnonymousMoviesApiClient` (`movies-api-clients.ts`) | context with no `Authorization` header |
| Intermediate Creator | `AuthenticatedMoviesApiClient` | logs in, then returns a context with `Authorization: Bearer <token>`; subclasses only provide `credentials()` |
| Concrete Creator | `RegularUserMoviesApiClient` | credentials from `MOVIES_API_REGULAR_*` |
| Concrete Creator | `AdminMoviesApiClient` | credentials from `MOVIES_API_ADMIN_*` |

Wiring and usage:
- Fixtures in `_project-herokuapp-components-tests/fixture-extention.ts` (`anonymousMoviesApi`, `regularUserMoviesApi`, `adminMoviesApi`) create a client per test and call `dispose()` afterwards.
- `tests/api_examples/genres-api-tests.ts` contains no token-handling code:

```ts
test('regular user', async ({ regularUserMoviesApi }) => {
    const genre = await (await regularUserMoviesApi.genres()).getGenreById(1);
});

test('anonymous user - 401', async ({ anonymousMoviesApi }) => {
    const response = await (await anonymousMoviesApi.genres()).getGenreByIdResponse(1);
    expect(response.status()).toBe(401);
});
```

Benefits:
- Adding a role means one subclass with `credentials()`.
- Role-based tests (401/403/200) take one line each.
- Request contexts are disposed instead of leaking.

### 19.2 `BaseBuilder.defaults()`

`framework/builders/base-builder.ts` has the same shape. The base class calls the abstract `defaults()` from its constructor, and each subclass (`PetstoreUserBuilder`, `BookingBuilder`) decides which object is produced. Here Factory Method is the creation hook inside the Builder from section 18.

## 20. Abstract Factory

**Category:** GoF — Creational. **Origin:** *Design Patterns* (1994): "provide an interface for creating families of related or dependent objects without specifying their concrete classes". The client gets one factory object and asks it for every member of a family, so the members always match each other. Swapping the factory swaps the whole family. Factory Method (section 19) creates **one** product and is varied by subclassing the creator. Abstract Factory creates a **family** of products and is varied by passing a different factory object.

### Movies API backend: real vs stub

**Family:** the three role clients (anonymous, regular user, admin). They must all target the same backend. Mixing a real admin with a stubbed regular user would make results meaningless.

| Role | Class (`services-rest-api/clients/movies-api/movies-api-factory.ts`) | Family bound to |
|---|---|---|
| Abstract Factory | `MoviesApiFactory` interface: `createAnonymousClient()`, `createRegularUserClient()`, `createAdminClient()`, `isAvailable()`, `dispose()` | — |
| Concrete Factory | `RealMoviesApiFactory` | real service at `MOVIES_API_BASE_URL`; `isAvailable()` health-checks it once per worker |
| Concrete Factory | `StubMoviesApiFactory` | an in-process stub server it starts and owns (`services-rest-api/stubs/movies-api-stub-server.ts`); always available |
| Products | `AnonymousMoviesApiClient`, `RegularUserMoviesApiClient`, `AdminMoviesApiClient` | the Factory Method subclasses from section 19 |

Both factories create the same client classes; what differs is the backend the family is bound to and the resources the factory owns. GoF notes that Abstract Factories are often implemented with Factory Methods, and that is the case here.

Choosing the factory: Playwright fixtures and projects.
- `_project-herokuapp-components-tests/fixture-extention.ts`:
  - `moviesBackend`: a worker-scoped **option**, default `'real'`.
  - `moviesApiFactory`: a worker-scoped fixture that creates the concrete factory for that option and disposes it (which stops the stub server).
  - `anonymousMoviesApi` / `regularUserMoviesApi` / `adminMoviesApi`: ask the factory for a client and dispose it after the test.
- `_project-herokuapp-components-tests/playwright.config.ts`: the project `Movies API - stub backend` sets `use: { moviesBackend: 'stub' }` and runs only `genres-api-tests.ts`. All other projects use the real backend.
- `.github/workflows/herokuaapp-build_and_test.yml`: CI runs the stub project too.

The tests themselves never mention a backend:

```ts
test.beforeEach(async ({ moviesApiFactory }) => {
    test.skip(!(await moviesApiFactory.isAvailable()), 'Service is not available ...');
});

test('admin user', async ({ adminMoviesApi }) => { /* same test for real and stub */ });
```

| Run | Result |
|---|---|
| `--project="Movies API - stub backend"` | runs everywhere, including CI; checks the framework: login flow, Bearer headers, context cleanup |
| browser projects + real service running | API integration check |
| browser projects + service down | skipped (health check) |

Limit: the stub checks the **test framework**, not the backend. Results from the stub project should not be read as API correctness.

## 21. Singleton (per process) and its Playwright-friendly alternative

**Category:** GoF — Creational. **Origin:** *Design Patterns* (1994): "ensure a class only has one instance, and provide a global point of access to it". A **Multiton** is a keyed variant with one instance per key.

**Important in Playwright:** each worker is a separate Node process, and global setup runs in yet another process. A Singleton is therefore "one per process", never one for the whole test run. This repo follows three rules because of that:
1. Singletons are **immutable** (config) or **stateless and expensive** (connection pools). There is no shared mutable state that one test could change for another.
2. Anything with a **lifecycle** (servers, caches, tokens) is a worker-scoped fixture, so Playwright creates and disposes it.
3. The former `global-hero-config.ts` (a mutable module object with `setGlobalConfig()`) was **removed**. A value set in global setup would never have reached the worker processes. `global--env-variables.ts` was removed too, since `Config` replaces it.

### 21.1 Validated configuration: Singleton per `.env` file

- `framework/configuration/app-config.ts`: `loadConfig<T>(envFile, schema)`
  - On the first call for a file: loads the `.env`, validates it with Joi (fail fast, all errors reported at once), converts types, and returns a **frozen** object with only the schema keys.
  - Later calls for the same file return the same instance.
  - Existing environment variables override `.env` values, so CI can change settings.
- `runnerSettingsSchema` / `RunnerSettings`: the keys every project shares (`HEADLESS_BROWSER`, `WORKERS`, `RETRY_FAILED`, `MAX_TEST_RUNTIME`).
- Each project declares its own keys and exports `Config`:
  - `_project-herokuapp-components-tests/config.ts`: `BASE_URL`, `MOVIES_API_*`
  - `_project-organic-shop-site-tests/config.ts`: `BASE_URL`, `REST_BOOKING_BASE_URL`
  - `_project-rest-api-tests/config.ts`: `REST_BOOKING_BASE_URL`
  - `_project-test-automation-site-tests/config.ts`: `BASE_URL`, `APP_USER`, `PASSWORD`
- Readers: all four `playwright.config.ts` files, the fixture files, and `LoginFormFragment`.

Example of the fail-fast behaviour: `WORKERS=abc` → `Invalid configuration (...\.env): "WORKERS" must be a number`, before any test starts.

### 21.2 SQL connection pool: Singleton per connection config

- `services-sql/basic-logic/sql-connection-pool.ts`: `SqlConnectionPool.get(config)` returns one connected `mssql` pool per config per worker.
  - The constructor is private; access is static only.
  - Failed connections are not cached, so the next call retries.
  - The caller's config object is copied before it reaches `mssql`, which writes defaults into the config it receives and would otherwise change the cache key.
- `SqlBaseRequest.sendRequest()` uses the shared pool instead of opening and closing a pool for every query.
- Shutdown: the worker-scoped auto fixture `sqlConnectionPools` in `_project-organic-shop-site-tests/playwright-fixture-extention.ts` calls `SqlConnectionPool.closeAll()` when the worker ends.

### 21.3 Auth token cache: worker-scoped, *not* a Singleton

- `services-rest-api/clients/movies-api/auth-token-cache.ts`: `AuthTokenCache` is a plain class.
  - Each `MoviesApiFactory` owns one and passes it to the authenticated clients.
  - The factory is a worker-scoped fixture, so the cache lives exactly as long as the worker and is separate for the real and stub backends.
  - Failed logins are not cached; tokens expire after 15 minutes (TTL).
- Effect: each user logs in once per worker instead of once per test. In a check with 8 clients for 2 users there were 2 logins.
- This is why it isn't a static Singleton: a static cache would mix tokens from the real and stub backends and could not be disposed.

---

## Distribution by category

| Category | Patterns |
|---|---|
| GoF | Facade (Structural), Decorator (Structural), Builder (Creational), Factory Method (Creational), Abstract Factory (Creational), Singleton (Creational), Adapter-like wrapper (Structural) |
| PoEAA | Layer Supertype, DTO, Registry, Gateway (API objects, SQL wrapper), Value Object |
| DDD | Value Object |
| xUnit Test Patterns | Fixtures (fresh/shared/suite), Test Double, Generated Value, Test Data Builder |
| Test Automation | Page Object, Page Fragment, API Object, Page Transition, Step Library |
| Playwright built-ins | Fixtures DI (`test.extend`), worker-scoped fixtures and options, `test.step`, `context.route`, `expect.soft`, projects |
| Idioms / Principles | Dependency Injection, Fluent Interface, Fail Fast, Twelve-Factor config, Arrange-Act-Assert, Lazy getters |

**Takeaway:** the codebase is mainly built on **test-automation patterns** (POM + fragments) and **Playwright fixtures** for wiring. Classic **GoF** patterns are few: Facade, Builder (as Test Data Builders), Factory Method (role-based API clients) and Abstract Factory (real vs stub backend family) are used deliberately, and Decorator is present but unused. Behavioral GoF patterns (Strategy, Command, Observer, etc.) do not appear.

---

## Observations and suggestions

1. **Fixture boilerplate:** each project repeats `x: async ({ page }, use) => use(new X(page))`. A small helper (`pageFixture(X)`) would cut the repetition.
2. **Unused building blocks:** `@step` decorator, `SqlBaseRequest`, `RandomHelper` and `movies-api-requests.ts` exist without callers. Apply or remove them. (`setGlobalConfig` was removed.)
3. **Two config styles:** resolved. All four projects use the validated `Config` singleton (section 21.1).
4. **Request classes assert inside:** resolved for the Movies API, which now has raw `...Response()` methods next to the asserting ones. `BookingsApiRequests` still asserts 200 inside.
5. **Request context lifecycle:** resolved. The Movies API clients get their context from the factory method and dispose it via fixtures, and the old `MoviesApiService` was removed. Its `isServiceAvailable()` treated 404 as "available"; the new `MoviesApiClient.isServiceAvailable()` probes `/authorization` and treats 404 as unavailable.
6. **`waitForElementsCount` logic:** the loop condition `count !== expected || timeOut !== 0` always runs the full timeout. Prefer `expect(locator).toHaveCount(n)`.
7. **Duplicated intercept tests:** `ninja-pizza-intercept.tests.ts` and `request-interception.tests.ts` are near copies. Move the stub payload to a shared fixture file.
8. **Typos in file names:** `fixture-extention.ts`, `fragements/`, `data-generatos/`, `step_decorator.ts.ts`.
9. **Candidate patterns to add:** extend Test Data Builders to the request-interception stub payloads (a `ProductBuilder` would remove the duplicated pizza JSON), **Strategy** (GoF) for environment-specific auth, and **Screenplay** if step libraries grow.
10. **Possible credential swap in `.env`:** `MOVIES_API_ADMIN_USERNAME=test` and `MOVIES_API_REGULAR_USERNAME=testadmin` look reversed. Check them against the movies service users.
11. **`USER` name clash:** resolved. The test-automation project read `USER` from `.env`, but the shell already sets `USER` on Linux, macOS and Git Bash, and existing variables win over `.env`, so the OS user name was used without any warning. The setting is now called `APP_USER`.
12. **Tests that depend on live data:** `main-page.tests.ts` (herokuapp now lists more pages) and `rest-api-example.tests.ts` (the newest public booking is no longer "Jim Brown") fail because the live sites changed, not because of framework code.
