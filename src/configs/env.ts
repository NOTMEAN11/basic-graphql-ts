import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("4000"),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export function getEnv<T extends keyof Env>(key: T): Env[T] {
  return env[key];
}
