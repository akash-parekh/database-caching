import "dotenv/config";

import { Hono } from "hono";

import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { errorHandler } from "@/middleware/errorHandler.js";
import { healthRouter } from "@/routes/health.js";

const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.onError(errorHandler);

app.route("/health", healthRouter);

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

const port = Number(process.env.PORT) || 3000;

serve(
    {
        fetch: app.fetch,
        port,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    },
);
