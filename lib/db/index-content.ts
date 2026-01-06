import fs from "fs";
import path from "path";
import { glob } from "glob";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { Document, MarkdownNodeParser } from "llamaindex";
import { db } from "./index";
import { embeddingsTable } from "./schema";
import { dbEnv } from "./env";

const CONTENT_DIR = "data/content";

function generateId(): string {
	return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
}

function extractTitle(content: string): string | null {
	const match = content.match(/^#\s+(.+)$/m);
	return match ? match[1].trim() : null;
}

async function indexContent() {
	console.log("Starting content indexing...");
	console.log(`Using embedding model: ${dbEnv.OPENAI_EMBEDDING_MODEL}\n`);

	// 1. Clear existing embeddings (full rebuild)
	console.log("Clearing existing embeddings...");
	await db.delete(embeddingsTable);

	// 2. Find all markdown files
	const files = glob.sync(`${CONTENT_DIR}/**/*.md`);

	if (files.length === 0) {
		console.log(`No markdown files found in ${CONTENT_DIR}/`);
		console.log("Add .md files to data/content/ and run again.");
		return;
	}

	console.log(`Found ${files.length} markdown file(s)\n`);

	// 3. Create markdown parser (splits by headers)
	const parser = new MarkdownNodeParser();

	let totalChunks = 0;

	// 4. Process each file
	for (const file of files) {
		const relativePath = path.relative(process.cwd(), file);
		console.log(`Processing: ${relativePath}`);

		const content = fs.readFileSync(file, "utf-8");
		const title = extractTitle(content);

		// Create a LlamaIndex Document
		const doc = new Document({ text: content, metadata: { sourceFile: relativePath } });

		// Split by markdown headers
		const nodes = parser.getNodesFromDocuments([doc]);

		if (nodes.length === 0) continue;

		// Extract text content from each node and filter out title-only chunks
		const nodesWithContent = nodes.filter((node) => {
			const content = node.getContent(undefined).trim();
			return content.includes("\n") || content.length > 100;
		});

		console.log(
			`  → ${nodesWithContent.length} sections (${nodes.length - nodesWithContent.length} title-only skipped)`
		);

		if (nodesWithContent.length === 0) continue;

		const chunks = nodesWithContent.map((node) => node.getContent(undefined));

		// Generate embeddings in batch
		const { embeddings } = await embedMany({
			model: openai.embedding(dbEnv.OPENAI_EMBEDDING_MODEL),
			values: chunks
		});

		// Prepare records with metadata from LlamaIndex nodes
		const records = nodesWithContent.map((node, i) => {
			// Get header hierarchy from node metadata
			const metadata = node.metadata || {};
			const headerKeys = Object.keys(metadata).filter((key) => key.startsWith("Header"));
			const headingPath = headerKeys
				.sort()
				.map((key) => metadata[key])
				.filter(Boolean)
				.join(" > ");

			return {
				id: generateId(),
				content: chunks[i],
				embedding: embeddings[i],
				sourceFile: relativePath,
				title,
				headingPath: headingPath || null
			};
		});

		// Insert into database
		await db.insert(embeddingsTable).values(records);
		totalChunks += nodesWithContent.length;
	}

	console.log(`\nIndexing complete!`);
	console.log(`  Files processed: ${files.length}`);
	console.log(`  Total chunks: ${totalChunks}`);
}

indexContent().catch((error) => {
	console.error("Indexing failed:", error);
	process.exit(1);
});
