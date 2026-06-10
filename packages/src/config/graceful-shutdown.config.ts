import z from 'zod';

const schema = z.object({
    GRACEFUL_SHUTDOWN_PERIOD_MS: z.coerce.number().default(5000),
});

const result = schema.safeParse(Bun.env);

if (!result.success) {
    throw new Error(`[Gracefulshutdown Config] Validation failed:\n${result.error.message}`);
}

export const gracefulshutdownConfig = result.data;
