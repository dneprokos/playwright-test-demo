import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "@test_automation-project/pages/login-page/login-page";

async function globalSetup(config: FullConfig) {
    //Some code 
}
  
export default globalSetup;