import { index, pgTable, text, timestamp, varchar, vector } from "drizzle-orm/pg-core";

export const embeddingsTable = pgTable(
	"embeddings",
	{
		id: varchar("id", { length: 191 }).primaryKey(),
		content: text("content").notNull(),
		embedding: vector("embedding", { dimensions: 1536 }).notNull(),
		sourceFile: varchar("source_file", { length: 255 }).notNull(),
		title: varchar("title", { length: 500 }),
		headingPath: text("heading_path"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull()
	},
	(table) => [index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops"))]
);
