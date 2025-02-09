# playwright-test-demo

![Playwright Image](/images/playwright.png)

## Summary

- UI automation testing framework designed with playwrite/test. Contains multiple projects cover different scenarios

## Projects description

- \_project-organic-shop-site-tests - e2e tests foo Organic shop test site "https://agular-test-shop-cb70d.firebaseapp.com/"
- \_project-rest-api-tests - just sample for Rest API requests
- \_project-test-automation-site-tests - Specific component practice tests project based on "https://qa-automation-test-site.firebaseapp.com/"
- \_project-herokuapp-components-tests - Very complex component practice tests project based on "https://the-internet.herokuapp.com/"

## Prerequisite

1. Node should be installed: https://nodejs.org/en/download
2. Open root folder in CMD and type command "npm install" or "npm i"

## How to update packages

1. npm install -D @playwright/test@latest

## Global packages to install

1. npm install -g agentql-cli

## How to run tests

1. Navigate project you tests you want to run e.g "cd \_project-test-automation-site-tests"
2. There are several ways how you can run the tests

- Run all tests from CMD/Terminal - "npx playwright test"
- Run specific test from CMD/Terminal - "npx playwright test -g "<test_name>"
- Open UI mode to run the tests from CMD/Terminal - "npx playwright test --ui"
- Install "Playwright Test for VSCode" extension and select the tests you want to run

![VS CODE Test Run Image](/images/run_from_vs_extention.png)

Note: Powershell script inside of each project runs specific test

## Useful playwright commands

1. Get version - "npx @playwright/test --version"
2. Update to latest version - "npm install @playwright/test@latest"
3. Download new browsers - "npx playwright install"
4. Update to specific version - "npm install @playwright/test@1.26"
5. Run plauwright UI mode - "npx playwright test --ui"

Note: A lot of the scripts available in package.json. Just run command "npm run <script_name>"

## Run tests in docker container

### Herokuapp project

- Docker and docker-compose should be installed on the machine
- Dockerfile and docker compose located in the root of the repo
- On Windows, it is easier run PowerShell script "run-herokua-tests-docker.ps1"
