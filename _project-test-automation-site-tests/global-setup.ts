import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "@test_automation-project/pages/login-page/login-page";

async function globalSetup(config: FullConfig) {
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    // await page.goto('https://qa-automation-test-site.firebaseapp.com/');
    // await new LoginPage(page).loginForm.fillCredentialsAndClickLoginButton('test@test.com', 'test');

    // // Save signed-in state to 'storageState.json'.
    // await page.waitForTimeout(2000);
    // await page.context().storageState({ path: 'storageState.json' });
    // await browser.close();
}
  
export default globalSetup;