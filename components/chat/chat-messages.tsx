"use client";

import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ui/conversation";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { CodeBlock, InlineCode } from "@/components/ui/code-block";
import { ToolOutput } from "@/components/ui/tool-output";
import type { UIMessage } from "ai";

interface ChatMessagesProps {
	messages: UIMessage[];
}

/**
 * Displays the chat conversation with animated message bubbles.
 * Handles rendering of text, code blocks, and tool outputs.
 */
export function ChatMessages({ messages }: ChatMessagesProps) {
	return (
		<motion.div
			className="flex-1 overflow-hidden pt-14 pb-36"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.4 }}
		>
			<Conversation className="h-full">
				<ConversationContent>
					{messages.map((message) => (
						<motion.div
							key={message.id}
							className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<ChatBubble variant={message.role === "user" ? "user" : "ai"}>
								{message.parts.map((part, i) => {
									const key = `${message.id}-${i}`;
									switch (part.type) {
										case "text":
											return (
												<div key={key} className="prose prose-base dark:prose-invert max-w-none">
													<Markdown
														components={{
															pre({ children }) {
																return <>{children}</>;
															},
															code({ className, children, ...props }) {
																const match = /language-(\w+)/.exec(className || "");
																const isInline = !match && !className;
																if (isInline) {
																	return <InlineCode {...props}>{children}</InlineCode>;
																}
																return (
																	<CodeBlock language={match?.[1]}>{String(children).replace(/\n$/, "")}</CodeBlock>
																);
															},
															a({ href, children }) {
																return (
																	<a href={href} target="_blank" rel="noopener noreferrer">
																		{children}
																	</a>
																);
															}
														}}
													>
														{part.text}
													</Markdown>
												</div>
											);
										case "tool-searchPortfolio":
											return <ToolOutput key={key} name="searchPortfolio" data={part} />;
										default:
											return null;
									}
								})}
							</ChatBubble>
						</motion.div>
					))}
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>
		</motion.div>
	);
}
