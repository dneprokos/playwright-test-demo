require('dotenv').config();

function getEnv(name: string): string {
    const envValue = process.env[name];
    if (envValue == null)
        throw new Error(`${name} environment variable is not defined.`);
    return envValue;
}

function getEnvParseNumber(name: string): number {
    const envValue = process.env[name];
    if (envValue == null)
        throw new Error(`${name} environment variable is not defined.`);
    return Number.parseInt(envValue);
}

export { getEnv, getEnvParseNumber };
