import { defineConfig } from "drizzle-kit";
import { dbEnv } from "./lib/db/env";

export default defineConfig({
	out: "./drizzle",
	schema: "./lib/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: dbEnv.DATABASE_URL
	}
});
