import * as dotenv from 'dotenv';
import * as path from 'path';
import Joi from 'joi';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') })

// Define Joi schema for configuration validation
const envSchema = Joi.object({
  HEADLESS_BROWSER: Joi.boolean().required(),
  WORKERS: Joi.number().integer().min(1).required(),
  RETRY_FAILED: Joi.number().integer().min(0).required(),
  MAX_TEST_RUNTIME: Joi.number().integer().min(1000).required(),
  BASE_URL: Joi.string().uri().required(),
  MOVIES_API_BASE_URL: Joi.string().uri().required(),
  MOVIES_API_ADMIN_USERNAME: Joi.string().required(),
  MOVIES_API_ADMIN_PASSWORD: Joi.string().required(),
  MOVIES_API_REGULAR_USERNAME: Joi.string().required(),
  MOVIES_API_REGULAR_PASSWORD: Joi.string().required(),
}).unknown(true);

const envVars = envSchema.validate(process.env, { allowUnknown: true, abortEarly: false });

if (envVars.error) {
  throw new Error(`Invalid configuration: ${envVars.error.message}`);
}

export class Config {
  static readonly HEADLESS_BROWSER: boolean = envVars.value.HEADLESS_BROWSER;
  static readonly WORKERS: number = envVars.value.WORKERS;
  static readonly RETRY_FAILED: number = envVars.value.RETRY_FAILED;
  static readonly MAX_TEST_RUNTIME: number = envVars.value.MAX_TEST_RUNTIME;
  static readonly BASE_URL: string = envVars.value.BASE_URL;
  static readonly MOVIES_API_BASE_URL: string = envVars.value.MOVIES_API_BASE_URL;
  static readonly MOVIES_API_ADMIN_USERNAME: string = envVars.value.MOVIES_API_ADMIN_USERNAME;
  static readonly MOVIES_API_ADMIN_PASSWORD: string = envVars.value.MOVIES_API_ADMIN_PASSWORD;
  static readonly MOVIES_API_REGULAR_USERNAME: string = envVars.value.MOVIES_API_REGULAR_USERNAME;
  static readonly MOVIES_API_REGULAR_PASSWORD: string = envVars.value.MOVIES_API_REGULAR_PASSWORD;
}
