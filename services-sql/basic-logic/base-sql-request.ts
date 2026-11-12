import * as sql from "mssql";
import { SqlConnectionPool } from "./sql-connection-pool";

export class SqlBaseRequest {
    config: string | sql.config;

    constructor(sqlConfig: string | sql.config) {
        this.config = sqlConfig;
    }

    /** Runs the query on the shared per-worker pool (the pool stays open; it is closed at worker teardown). */
    async sendRequest(query: string): Promise<sql.IResult<unknown>> {
        try {
            const pool = await SqlConnectionPool.get(this.config);
            return await pool.request().query(query);
        }
        catch (err: unknown) {
            console.log(err);
            throw new Error("SQL query exception", { cause: err });
        }
    }
}
