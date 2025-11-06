import { Hono } from "hono";
import { z } from "zod";

import { pgPool } from "@/config/db.js";
import { redisClient } from "@/config/redis.js";

export const healthRouter = new Hono();

const HealthCheckSchema = z.object({
    checkDatabase: z.boolean().optional().default(true),
    checkCache: z.boolean().optional().default(true),
});

healthRouter.get("/", async (c) => {
    const { rows } = await pgPool.query("SELECT 1");
    const redisPing = await redisClient.ping();

    return c.json({
        status: "ok",
        database: rows.length === 1 ? "ok" : "error",
        cache: redisPing === "PONG" ? "ok" : "error",
    });
});
