interface GlobalHeroKuaConfig {
    moviesApiUrl: string;
    regularUsername: string;
    regularPassword: string;
    adminUsername: string;
    adminPassword: string;
}

const globalConfig: GlobalHeroKuaConfig = {
    moviesApiUrl: '',
    regularUsername: '',
    regularPassword: '',
    adminUsername: '',
    adminPassword: ''
};

function setGlobalConfig(config: Partial<GlobalHeroKuaConfig>) {
    Object.assign(globalConfig, config);
}

function getGlobalConfig(): GlobalHeroKuaConfig {
    return globalConfig;
}

export { setGlobalConfig, getGlobalConfig };