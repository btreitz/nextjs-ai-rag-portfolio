import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { env } from "@/lib/env";

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	const result = streamText({
		model: openai(env.OPENAI_LARGE_LANGUAGE_MODEL),
		messages: await convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools: {
			weather: tool({
				description: "Get the weather in a location (Celsius)",
				inputSchema: z.object({
					location: z.string().describe("The location to get the weather for")
				}),
				execute: async ({ location }) => {
					const temperature = Math.round(Math.random() * (10 - 5) + 5);
					return {
						location,
						temperature
					};
				}
			}),
			celsiusToFahrenheit: tool({
				description: "Convert a temperature from Celsius to Fahrenheit",
				inputSchema: z.object({
					celsius: z.number().describe("The temperature in Celsius to convert")
				}),
				execute: async ({ celsius }) => {
					return (celsius * 9) / 5 + 32;
				}
			})
		}
	});

	return result.toUIMessageStreamResponse();
}
