import { EnvironmentParameters } from "@framework/configuration/environment-constants";
import { getEnv } from "@framework/configuration/environment-helper";

export default class GlobalHeroKuaConfig {
    static get moviesApiUrl() {
        return getEnv(EnvironmentParameters.moviesApiBaseUrl)
    }

    static get regularUsername() {
        return getEnv(EnvironmentParameters.moviesApiRegularUsername)
    }

    static get regularPassword() {
        return getEnv(EnvironmentParameters.moviesApiRegularPassword)
    }

    static get adminUsername() {
        return getEnv(EnvironmentParameters.moviesApiAdminUsername)
    }

    static get adminPassword() {
        return getEnv(EnvironmentParameters.moviesApiAdminPassword)
    }
}