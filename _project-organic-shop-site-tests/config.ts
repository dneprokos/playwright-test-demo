import Joi from "joi";
import * as path from "path";
import { loadConfig, RunnerSettings, runnerSettingsSchema } from "@framework/configuration/app-config";

export interface OrganicShopConfig extends RunnerSettings {
    BASE_URL: string;
    REST_BOOKING_BASE_URL: string;
}

/** Validated, read-only project configuration (singleton per process). */
export const Config = loadConfig<OrganicShopConfig>(path.resolve(__dirname, ".env"), {
    ...runnerSettingsSchema,
    BASE_URL: Joi.string().uri().required(),
    REST_BOOKING_BASE_URL: Joi.string().uri().required(),
});
