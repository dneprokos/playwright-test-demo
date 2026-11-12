import { test as base } from "@playwright/test";
import MainPage from "./pages/_main-page/main-page";
import ABTestingPage from "./pages/ab-testing-page/ab-testing-page";
import AddRemoveElementPage from "./pages/add-remove-element-page/add-remove-element-page";
import BasicAuthPage from "./pages/basic-auth-page/basic-auth-page";
import DataTablesPage from "./pages/data-tables-page/data-tables-page";
import DragAndDropPage from "./pages/drag-and-drop-page/drag-and-drop-page";
import JavaScriptAlertsPage from "./pages/javascript-alerts-page/javascript-alerts-page";
import FramesPage from "./pages/frames-page/frames-page";
import UploadFilePage from "./pages/upload-file-page/upload-file-page";
import DownloadFilePage from "./pages/download-file-page/download-file-page";
import ShadowDomPage from "./pages/shadow-dom-page/shadow-dom-page";
import LoginPage from "./pages/login-page/login-page";
import KeyPressesPage from "./pages/key-presses-page/key-presses-page";
import WindowsPage from "./pages/windows-page/windows-page";
import HorizontalSliderPage from "./pages/horizontal-slider-page/horizontal-slider-page";
import DropDownPage from "./pages/drop-down-page/drop-down-page";
import CheckboxesPage from "./pages/checkboxes-page/checkboxes-page";
import GeolocationPage from "./pages/geolocation-page/geolocation-page";
import { MoviesApiClient } from "@api/clients/movies-api/movies-api-client";
import {
  createMoviesApiFactory,
  MoviesApiFactory,
  MoviesBackend,
} from "@api/clients/movies-api/movies-api-factory";

type ApiClients = {
  anonymousMoviesApi: MoviesApiClient;
  regularUserMoviesApi: MoviesApiClient;
  adminMoviesApi: MoviesApiClient;
};

type ApiWorkerFixtures = {
  /** Project option: which backend the Movies API clients talk to. */
  moviesBackend: MoviesBackend;
  /** Abstract Factory for the role clients — one per worker, chosen by `moviesBackend`. */
  moviesApiFactory: MoviesApiFactory;
};

/** Asks the worker's factory for one role client and releases its request context after the test. */
const moviesApiClient =
  (create: (factory: MoviesApiFactory) => MoviesApiClient) =>
  async (
    { moviesApiFactory }: { moviesApiFactory: MoviesApiFactory },
    use: (client: MoviesApiClient) => Promise<void>,
  ) => {
    const client = create(moviesApiFactory);
    await use(client);
    await client.dispose();
  };

type Pages = {
  mainPage: MainPage;
  abTestPage: ABTestingPage;
  addRemoveElementPage: AddRemoveElementPage;
  basicAuthPage: BasicAuthPage;
  dataTablesPage: DataTablesPage;
  dragAndDropPage: DragAndDropPage;
  javaScriptAlertsPage: JavaScriptAlertsPage;
  framesPage: FramesPage;
  uploadFilePage: UploadFilePage;
  downloadFilePage: DownloadFilePage;
  shadowDomPage: ShadowDomPage;
  loginPage: LoginPage;
  keyPressesPage: KeyPressesPage;
  windowPage: WindowsPage;
  horizontalSliderPage: HorizontalSliderPage;
  dropDownPage: DropDownPage;
  checkboxePage: CheckboxesPage;
  geolocationPage: GeolocationPage;
};

export const test = base.extend<Pages & ApiClients, ApiWorkerFixtures>({
  moviesBackend: ["real", { option: true, scope: "worker" }],
  moviesApiFactory: [
    async ({ moviesBackend }, use) => {
      const factory = await createMoviesApiFactory(moviesBackend);
      await use(factory);
      await factory.dispose();
    },
    { scope: "worker" },
  ],
  anonymousMoviesApi: moviesApiClient((f) => f.createAnonymousClient()),
  regularUserMoviesApi: moviesApiClient((f) => f.createRegularUserClient()),
  adminMoviesApi: moviesApiClient((f) => f.createAdminClient()),

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  abTestPage: async ({ page }, use) => {
    await use(new ABTestingPage(page));
  },
  addRemoveElementPage: async ({ page }, use) => {
    await use(new AddRemoveElementPage(page));
  },
  basicAuthPage: async ({ page }, use) => {
    await use(new BasicAuthPage(page));
  },
  dataTablesPage: async ({ page }, use) => {
    await use(new DataTablesPage(page));
  },
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },
  javaScriptAlertsPage: async ({ page }, use) => {
    await use(new JavaScriptAlertsPage(page));
  },
  framesPage: async ({ page }, use) => {
    await use(new FramesPage(page));
  },
  uploadFilePage: async ({ page }, use) => {
    await use(new UploadFilePage(page));
  },
  downloadFilePage: async ({ page }, use) => {
    await use(new DownloadFilePage(page));
  },
  shadowDomPage: async ({ page }, use) => {
    await use(new ShadowDomPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  keyPressesPage: async ({ page }, use) => {
    await use(new KeyPressesPage(page));
  },
  windowPage: async ({ page }, use) => {
    await use(new WindowsPage(page));
  },
  horizontalSliderPage: async ({ page }, use) => {
    await use(new HorizontalSliderPage(page));
  },
  dropDownPage: async ({ page }, use) => {
    await use(new DropDownPage(page));
  },
  checkboxePage: async ({ page }, use) => {
    await use(new CheckboxesPage(page));
  },
  geolocationPage: async ({ page }, use) => {
    await use(new GeolocationPage(page));
  },
});

export { expect } from "@playwright/test";
