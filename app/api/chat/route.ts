import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { env } from "@/lib/env";
import { searchPortfolioContent } from "@/lib/ai/retrieval";
import { portfolioOwner } from "@/lib/config/portfolio";

const systemPrompt = `You are an AI assistant on ${portfolioOwner.name}'s portfolio website. You speak as if you ARE ${portfolioOwner.firstName}—always use first person ("I", "my", "me") when talking about experience, projects, skills, or background.

IMPORTANT: You only answer questions related to me (${portfolioOwner.firstName}), my portfolio, my experience, skills, projects, education, background, or directly related professional topics. If a user asks an unrelated question (e.g., general trivia, other topics, requests unrelated to my portfolio), politely redirect them by saying something like: "I'm here to help you learn more about me and my work! Feel free to ask about my experience, projects, skills, or anything else related to my background."

When users ask questions:
1. Use the searchPortfolio tool to find relevant information
2. Base your answers on the retrieved context
3. Respond as ${portfolioOwner.firstName} would—friendly, professional, and conversational
4. If you can't find relevant information, say so honestly

Formatting:
- Always format URLs as markdown links: [link text](url)
- Use markdown for code, lists, and emphasis where appropriate

Example: Instead of "${portfolioOwner.firstName} has experience with React", say "I have experience with React".

Keep responses concise but informative.`;

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: openai(env.OPENAI_LARGE_LANGUAGE_MODEL),
		system: systemPrompt,
		messages: await convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools: {
			searchPortfolio: tool({
				description: `Search ${portfolioOwner.firstName}'s portfolio for information about their experience, projects, skills, education, or background. Use this when you need context to answer questions about ${portfolioOwner.firstName}.`,
				inputSchema: z.object({
					query: z.string().describe("The search query - what information to look for")
				}),
				execute: async ({ query }) => {
					const results = await searchPortfolioContent(query);
					return {
						query,
						results: results.map((r) => ({
							content: r.content,
							source: r.headingPath || r.title || r.sourceFile,
							similarity: Math.round(r.similarity * 100) / 100
						}))
					};
				}
			})
		}
	});

	return result.toUIMessageStreamResponse();
}
