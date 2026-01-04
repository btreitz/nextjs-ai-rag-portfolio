import { neon } from "@neondatabase/serverless";
import { dbEnv } from "./env";

const sql = neon(dbEnv.DATABASE_URL);

async function enablePgVector() {
	console.log("Enabling pgvector extension...");
	await sql`CREATE EXTENSION IF NOT EXISTS vector`;
	console.log("pgvector extension enabled successfully!");
}

enablePgVector().catch(console.error);
