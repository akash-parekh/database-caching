import { z } from "zod";
import type { Context, Next } from "hono";

export const validateBody = (schema: z.ZodSchema<any>) => {
    return async (c: Context, next: Next) => {
        const body = await c.req.json().catch(() => {});
        const result = schema.safeParse(body);
        if (!result.success) {
            return c.json(
                { error: "Invalid request body", details: result.error.issues },
                400,
            );
        }
        c.set("validatedBody", result.data);
        await next();
    };
};
