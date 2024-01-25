import { test as base } from '@playwright/test';
import MainPage from "./pages/_main-page/main-page";
import ABTestingPage from './pages/ab-testing-page/ab-testing-page';
import AddRemoveElementPage from './pages/add-remove-element-page/add-remove-element-page';
import BasicAuthPage from './pages/basic-auth-page/basic-auth-page';
import DataTablesPage from './pages/data-tables-page/data-tables-page';
import DragAndDropPage from './pages/drag-and-drop-page/drag-and-drop-page';
import JavaScriptAlertsPage from './pages/javascript-alerts-page/javascript-alerts-page';
import FramesPage from './pages/frames-page/frames-page';
import UploadFilePage from './pages/upload-file-page/upload-file-page';
import DownloadFilePage from './pages/download-file-page/download-file-page';
import ShadowDomPage from './pages/shadow-dom-page/shadow-dom-page';
import FormAuthenticationPage from './pages/form-authentication-page/form-authentication-page';


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
    formAuthenticationPage: FormAuthenticationPage;
}

export const test = base.extend<Pages>({
    mainPage: async ({page}, use) => {
        await use(new MainPage(page));
    },
    abTestPage: async ({page}, use) => {
        await use(new ABTestingPage(page));
    },
    addRemoveElementPage: async ({page}, use) => {
        await use(new AddRemoveElementPage(page));
    },
    basicAuthPage: async ({page}, use) => {
        await use(new BasicAuthPage(page));
    },
    dataTablesPage: async ({page}, use) => {
        await use(new DataTablesPage(page));
    },
    dragAndDropPage: async ({page}, use) => {
        await use(new DragAndDropPage(page));
    },
    javaScriptAlertsPage: async ({page}, use) => {
        await use(new JavaScriptAlertsPage(page));
    },
    framesPage: async ({page}, use) => {
        await use(new FramesPage(page));
    },
    uploadFilePage: async ({page}, use) => {
        await use(new UploadFilePage(page));
    },
    downloadFilePage: async ({page}, use) => {
        await use(new DownloadFilePage(page));
    },
    shadowDomPage: async ({page}, use) => {
        await use(new ShadowDomPage(page));
    },
    formAuthenticationPage: async ({page}, use) => {
        await use(new FormAuthenticationPage(page));
    }
});

export { expect } from '@playwright/test';
