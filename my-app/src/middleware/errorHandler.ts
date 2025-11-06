import type { Context } from "hono";

export const errorHandler = (err: Error, c: Context) => {
    console.error("Error occurred:", err);
    return c.json({ error: err.message }, 500);
};
