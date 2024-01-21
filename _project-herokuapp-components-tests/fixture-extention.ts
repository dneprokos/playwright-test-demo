import { test as base } from '@playwright/test';
import MainPage from "./pages/_main-page/main-page";
import ABTestingPage from './pages/ab-testing-page/ab-testing-page';
import AddRemoveElementPage from './pages/add-remove-element-page/add-remove-element-page';
import BasicAuthPage from './pages/basic-auth-page/basic-auth-page';
import DataTablesPage from './pages/data-tables-page/data-tables-page';
import DragAndDropPage from './pages/drag-and-drop-page/drag-and-drop-page';


type Pages = {
    mainPage: MainPage;
    abTestPage: ABTestingPage;
    addRemoveElementPage: AddRemoveElementPage;
    basicAuthPage: BasicAuthPage;
    dataTablesPage: DataTablesPage;
    dragAndDropPage: DragAndDropPage;
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
    }
});

export { expect } from '@playwright/test';
