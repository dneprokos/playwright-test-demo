import Joi from "joi";
import * as path from "path";
import { loadConfig, RunnerSettings, runnerSettingsSchema } from "@framework/configuration/app-config";

export interface TestAutomationSiteConfig extends RunnerSettings {
    BASE_URL: string;
    APP_USER: string;
    PASSWORD: string;
}

/** Validated, read-only project configuration (singleton per process). */
export const Config = loadConfig<TestAutomationSiteConfig>(path.resolve(__dirname, ".env"), {
    ...runnerSettingsSchema,
    BASE_URL: Joi.string().uri().required(),
    APP_USER: Joi.string().required(),
    PASSWORD: Joi.string().required(),
});
