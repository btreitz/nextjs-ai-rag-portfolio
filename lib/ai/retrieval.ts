import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { cosineDistance, desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { embeddingsTable } from "@/lib/db/schema";
import { env } from "@/lib/env";

export interface RetrievedChunk {
	content: string;
	sourceFile: string;
	title: string | null;
	headingPath: string | null;
	similarity: number;
}

/**
 * Search portfolio content using vector similarity.
 * Generates an embedding for the query and finds the most similar chunks.
 */
export async function searchPortfolioContent(query: string, limit = 10): Promise<RetrievedChunk[]> {
	// Generate embedding for user's question
	const { embedding } = await embed({
		model: openai.embedding(env.OPENAI_EMBEDDING_MODEL),
		value: query
	});

	// Query pgvector for similar chunks using cosine distance
	const similarity = sql<number>`1 - (${cosineDistance(embeddingsTable.embedding, embedding)})`;

	const results = await db
		.select({
			content: embeddingsTable.content,
			sourceFile: embeddingsTable.sourceFile,
			title: embeddingsTable.title,
			headingPath: embeddingsTable.headingPath,
			similarity
		})
		.from(embeddingsTable)
		.orderBy(desc(similarity))
		.limit(limit);

	return results;
}
