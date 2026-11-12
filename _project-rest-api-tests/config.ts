import Joi from "joi";
import * as path from "path";
import { loadConfig, RunnerSettings, runnerSettingsSchema } from "@framework/configuration/app-config";

export interface RestApiConfig extends RunnerSettings {
    REST_BOOKING_BASE_URL: string;
}

/** Validated, read-only project configuration (singleton per process). */
export const Config = loadConfig<RestApiConfig>(path.resolve(__dirname, ".env"), {
    ...runnerSettingsSchema,
    REST_BOOKING_BASE_URL: Joi.string().uri().required(),
});
