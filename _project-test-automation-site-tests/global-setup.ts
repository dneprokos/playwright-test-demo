import { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
    //Some code
    console.log("Global setup");
    console.log(config);
}
  
export default globalSetup;