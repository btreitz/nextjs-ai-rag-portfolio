import { z } from "zod";

const envSchema = z.object({
	OPENAI_API_KEY: z.string().min(1),
	OPENAI_LARGE_LANGUAGE_MODEL: z.string().min(1),
	OPENAI_EMBEDDING_MODEL: z.string().min(1),
	DATABASE_URL: z.string().min(1),

	// LangFuse observability (optional)
	LANGFUSE_ENABLED: z
		.enum(["true", "false", "1", "0"])
		.default("false")
		.transform((val) => val === "true" || val === "1"),
	LANGFUSE_SECRET_KEY: z.string().optional(),
	LANGFUSE_PUBLIC_KEY: z.string().optional(),
	LANGFUSE_BASE_URL: z.string().optional()
});

export const env = envSchema.parse(process.env);
