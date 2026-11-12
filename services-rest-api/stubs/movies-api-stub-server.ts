import http from "http";
import { randomUUID } from "crypto";
import { AddressInfo } from "net";

export interface StubUser {
    username: string;
    password: string;
}

export interface MoviesApiStubServer {
    /** Base URL in the same shape as MOVIES_API_BASE_URL, e.g. http://127.0.0.1:53211/api */
    baseUrl: string;
    close(): Promise<void>;
}

const GENRES = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Drama" },
];

/**
 * Minimal in-process fake of the node-rest-services Movies API
 * (https://github.com/dneprokos/node-rest-services), covering the endpoints the framework uses:
 *
 * - `POST /api/authorization?username=&password=` → 200 `{ accessToken }` for known users, otherwise 401
 * - `GET  /api/genres/:id` → 401 without a valid Bearer token, 404 for unknown id, otherwise 200 `{ id, name }`
 *
 * It verifies the *test framework* (auth flow, headers, context lifecycle) — not the real backend.
 */
export async function startMoviesApiStub(users: StubUser[]): Promise<MoviesApiStubServer> {
    const issuedTokens = new Set<string>();

    const server = http.createServer((req, res) => {
        const url = new URL(req.url ?? "/", "http://stub");
        const send = (status: number, body: unknown) => {
            res.writeHead(status, { "content-type": "application/json" });
            res.end(JSON.stringify(body));
        };

        if (req.method === "POST" && url.pathname === "/api/authorization") {
            const username = url.searchParams.get("username");
            const password = url.searchParams.get("password");
            const known = users.some((u) => u.username === username && u.password === password);
            if (!known) return send(401, { message: "Invalid username or password" });

            const token = randomUUID();
            issuedTokens.add(token);
            return send(200, { accessToken: token });
        }

        const genreMatch = /^\/api\/genres\/(\d+)$/.exec(url.pathname);
        if (req.method === "GET" && genreMatch) {
            const token = req.headers.authorization?.replace(/^Bearer /, "");
            if (!token || !issuedTokens.has(token)) return send(401, { message: "Unauthorized" });

            const genre = GENRES.find((g) => g.id === Number(genreMatch[1]));
            return genre ? send(200, genre) : send(404, { message: "Genre not found" });
        }

        send(404, { message: "Route not found" });
    });

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address() as AddressInfo;

    return {
        baseUrl: `http://127.0.0.1:${port}/api`,
        close: () =>
            new Promise<void>((resolve, reject) => {
                server.closeAllConnections();
                server.close((err) => (err ? reject(err) : resolve()));
            }),
    };
}
