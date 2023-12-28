# playwright-test-demo
UI automation testing framework designed with playwrite/test 

##Projects description
- _project-organic-shop-site-tests - e2e tests foo Organic shop test site "https://agular-test-shop-cb70d.firebaseapp.com/"
- _project-rest-api-tests - just sample for Rest API requests
- _project-test-automation-site-tests - Specific component practice tests project based on "https://qa-automation-test-site.firebaseapp.com/"
- _project-herokuapp-components-tests - Very complex component practice tests project based on "https://the-internet.herokuapp.com/"

##Prerequisite

1) Node should be installed: https://nodejs.org/en/download
2) Open root folder in CMD and type command "npm install" or "npm i"


##How to run tests
1. Navigate project you tests you want to run e.g "cd _project-test-automation-site-tests"
2 a) Run all tests - "npx playwright test"
  b) Run specific test - "npx playwright test -g "<test_name>"
  c) Open UI mode and run from it - "npx playwright test --ui"

Note: Powershell script inside of each project runs specific test

##Useful playwright commands

1) Get version - "npx @playwright/test --version"
2) Update to latest version - "npm install @playwright/test@latest"
3) Download new browsers - "npx playwright install"
4) Update to specific version - "npm install @playwright/test@1.26"
5) Run plauwright UI mode - "npx playwright test --ui"

Note: A lot of the scripts available in package.json. Just run command "npm run <script_name>"

