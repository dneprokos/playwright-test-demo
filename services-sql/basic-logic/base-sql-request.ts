import * as sql from "mssql";

export class SqlBaseRequest {
    config: string | sql.config;

    constructor(sqlConfig: string | sql.config) {
        this.config = sqlConfig;
    }

    async sendRequest(query: string): Promise<sql.IResult<unknown>> {
        const pool = await sql.connect(this.config);

        try {
            const result= await pool.query(query);
            return result;
        }
        catch(err: unknown) {
            console.log(err);
            throw new Error("SQL query exception")
        }
        finally {
            void pool.close();
        }
    }
}