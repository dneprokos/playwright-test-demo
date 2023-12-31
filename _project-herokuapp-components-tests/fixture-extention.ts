import { test as base } from '@playwright/test';
import MainPage from "./pages/_main-page/main-page";
import ABTestingPage from './pages/ab-testing-page/ab-testing-page';
import AddRemoveElementPage from './pages/add-remove-element-page/add-remove-element-page';


type Pages = {
    mainPage: MainPage;
    abTestPage: ABTestingPage;
    addRemoveElementPage: AddRemoveElementPage;
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
    }
});

export { expect } from '@playwright/test';
