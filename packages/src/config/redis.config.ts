import { z } from "zod";

const conf = z.object({
    REDIS_URL: z.string({  message: "REDIS_URL must be a string"}).min(1, {message: "REDIS_URL is required"}),
    MAX_RETRIES: z.coerce.number({message : "MAX_RETRIES is required"}),
    AUTO_RECONNECT: z.boolean().default(true),
});

const result = await conf.safeParseAsync(Bun.env);
if (!result.success) {
    console.log(`[Parameter Service Config] Validation failed:\n${result.error.message}`);
    process.exit(1);
}

export const redisConf = result.data;