import Joi from "joi";
import * as path from "path";
import { loadConfig, RunnerSettings, runnerSettingsSchema } from "@framework/configuration/app-config";

export interface HerokuappConfig extends RunnerSettings {
  BASE_URL: string;
  MOVIES_API_BASE_URL: string;
  MOVIES_API_ADMIN_USERNAME: string;
  MOVIES_API_ADMIN_PASSWORD: string;
  MOVIES_API_REGULAR_USERNAME: string;
  MOVIES_API_REGULAR_PASSWORD: string;
}

/** Validated, read-only project configuration (singleton per process). */
export const Config = loadConfig<HerokuappConfig>(path.resolve(__dirname, ".env"), {
  ...runnerSettingsSchema,
  BASE_URL: Joi.string().uri().required(),
  MOVIES_API_BASE_URL: Joi.string().uri().required(),
  MOVIES_API_ADMIN_USERNAME: Joi.string().required(),
  MOVIES_API_ADMIN_PASSWORD: Joi.string().required(),
  MOVIES_API_REGULAR_USERNAME: Joi.string().required(),
  MOVIES_API_REGULAR_PASSWORD: Joi.string().required(),
});
