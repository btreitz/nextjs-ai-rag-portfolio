import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { dbEnv } from "./env";

const sql = neon(dbEnv.DATABASE_URL);
export const db = drizzle({ client: sql });
