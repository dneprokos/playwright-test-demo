import { allure } from "allure-playwright";

async function globalSetup() {
    await allure.suite('Global setup');
}
  
export default globalSetup;