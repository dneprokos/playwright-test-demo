import { test as base } from '@playwright/test';
import CheckBoxesPage from './pages/check-box-page/check-boxes-page';
import DatePickerPage from './pages/date-picker-page/date-picker-page';
import DropDownPage from './pages/drop-down-page/drop-down-page';
import EndToEndPage from './pages/end-to-end-page/end-to-end-page';
import HomePage from './pages/home-page/home-page';
import InputFieldsPage from './pages/input-fields-page/input-fields-page';
import { LoginPage } from './pages/login-page/login-page';
import RadioButtonPage from './pages/radio-button-page/radio-button-page';
import TablePage from './pages/table-page/table-page';
import TogglePage from './pages/toggle-page/toggle-page';
import { Config } from './config';
import { createLoginStrategy, LoginMethod, LoginStrategy } from './utils/login-strategies/login-strategy';

type Pages = {
    LoginPage: LoginPage;
    HomePage: HomePage,
    CheckBoxesPage: CheckBoxesPage,
    InputFieldsPage: InputFieldsPage,
    DropDownPage: DropDownPage,
    RadioButtonPage: RadioButtonPage,
    TablePage: TablePage,
    DatePickerPage: DatePickerPage,
    TogglesPage: TogglePage,
    EndToEndPage: EndToEndPage
}

type EnvironmentVariables = {
    baseUrl: string
    restApiBaseUrl: string
}

type Authentication = {
    /** Option: which LoginStrategy to use. Override per project or with `test.use({ loginMethod: 'ui-form' })`. */
    loginMethod: LoginMethod
    loginStrategy: LoginStrategy
}

export const test = base.extend<Pages & EnvironmentVariables & Authentication>({
    //Environment variables
    baseURL: Config.BASE_URL,

    //Authentication (Strategy chosen by option)
    loginMethod: ['session-storage', { option: true }],
    loginStrategy: async ({ loginMethod }, use) => {
        await use(createLoginStrategy(loginMethod));
    },

    //Pages. Pages intialization for quick access
    LoginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    HomePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    CheckBoxesPage: async ({page}, use) => {
        await use(new CheckBoxesPage(page));
    },
    InputFieldsPage: async ({page}, use) => {
        await use(new InputFieldsPage(page));
    },
    DropDownPage: async ({page}, use) => {
        await use(new DropDownPage(page));
    },
    RadioButtonPage: async ({page}, use) => {
        await use(new RadioButtonPage(page));
    },
    TablePage: async ({page}, use) => {
        await use(new TablePage(page));
    },
    DatePickerPage: async ({page}, use) => {
        await use(new DatePickerPage(page));
    },
    TogglesPage: async ({page}, use) => {
        await use(new TogglePage(page));
    },
    EndToEndPage: async ({page}, use) => {
        await use(new EndToEndPage(page));
    }
})

export default test;
export const expect = test.expect;