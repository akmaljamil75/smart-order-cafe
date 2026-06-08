import { z } from "zod";

const conf = z.object({
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    DATABASE_APPLICATION_NAME: z.string().default("coffe"),
    DATABASE_CONNECTION_MIN: z.coerce.number({message : "DATABASE_CONNECTION_MIN is required"}),
    DATABASE_CONNECTION_MAX: z.coerce.number({message : "DATABASE_CONNECTION_MAX is required"}),
    DATABASE_CONNECTION_TIMEOUT_MILLIS: z.coerce.number({message : "DATABASE_CONNECTION_TIMEOUT_MILLIS is required"}),
    DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS: z.coerce.number({message : "DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS is required"}),
    DATABASE_CONNECTION_MAX_LIFETIME_SECONDS: z.coerce.number({message : "DATABASE_CONNECTION_MAX_LIFETIME_SECONDS is required"}),
    DATABASE_TIMEOUT_TRANSACTION_IN_MS: z.coerce.number({message : "DATABASE_TIMEOUT_TRANSACTION_IN_MS is required"}),
});

const result = await conf.safeParseAsync(Bun.env);
if (!result.success) {
    console.log(`[Parameter Service Config] Validation failed:\n${result.error.message}`);
    process.exit(1);
}

export const databaseConf = result.data;