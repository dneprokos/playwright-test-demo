require('dotenv').config();

const getEnv = (name: string) => {
    const envValue = process.env[name];
    if (envValue == null) 
        throw new Error(`${name} environment variable is not defined.`);
    return envValue;
};

const getEnvParseNumber = (name: string) => {
    const envValue = process.env[name];
    if (envValue == null)
        throw new Error(`${name} environment variable is not defined.`);
    return Number.parseInt(envValue);
};

export { getEnv, getEnvParseNumber };