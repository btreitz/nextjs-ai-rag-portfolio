import { config } from "dotenv";
import { z } from "zod";

// Load .env.local for drizzle-kit (Next.js loads this automatically for the app)
config({ path: ".env.local" });

const dbEnvSchema = z.object({
	DATABASE_URL: z.string().min(1)
});

export const dbEnv = dbEnvSchema.parse(process.env);
