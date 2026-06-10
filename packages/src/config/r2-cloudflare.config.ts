import { z } from "zod";

const conf = z.object({
  R2_CLOUDE_FLARE_ACCESS_KEY: z
    .string({
      message: "R2_CLOUDE_FLARE_ACCESS_KEY must be a string",
    })
    .min(1, {
      message: "R2_CLOUDE_FLARE_ACCESS_KEY is required",
    }),

  R2_CLOUDE_FLARE_SEVER_KEY: z
    .string({
      message: "R2_CLOUDE_FLARE_SEVER_KEY must be a string",
    })
    .min(1, {
      message: "R2_CLOUDE_FLARE_SEVER_KEY is required",
    }),

  R2_CLOUDE_FLARE_ENDPOINT: z
    .string({
      message: "R2_CLOUDE_FLARE_ENDPOINT must be a string",
    }),

  R2_CLOUDE_FLARE_BUCKET: z
    .string({
      message: "R2_CLOUDE_FLARE_BUCKET must be a string",
    })
    .min(1, {
      message: "R2_CLOUDE_FLARE_BUCKET is required",
    }),
});

const result = await conf.safeParseAsync(Bun.env);
if (!result.success) {
    console.log(`[Parameter Service Config] Validation failed:\n${result.error.message}`);
    process.exit(1);
}

export const r2CloudflareConf = result.data;