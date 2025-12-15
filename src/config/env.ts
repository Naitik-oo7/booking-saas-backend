import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.flatten());
  process.exit(1);
}

const config = {
  env: parsed.data.NODE_ENV,
  port: Number(parsed.data.PORT),
  database: {
    url: parsed.data.DATABASE_URL,
  },
};

export default config;
