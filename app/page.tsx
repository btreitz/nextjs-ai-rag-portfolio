"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/chat/hero-section";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";

export default function Chat() {
	const [input, setInput] = useState("");
	const [hasStarted, setHasStarted] = useState(false);
	const { messages, sendMessage } = useChat();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!input.trim()) {
			return;
		}

		if (!hasStarted) {
			setHasStarted(true);
		}

		sendMessage({ text: input });
		setInput("");
	};

	const handleSuggestionClick = (suggestion: string) => {
		setInput(suggestion);
		inputRef.current?.focus();
	};

	return (
		<div className="relative flex flex-col h-screen w-full max-w-2xl mx-auto overflow-hidden">
			{/* Hero Content - Title and Suggestions */}
			<AnimatePresence mode="wait">
				{!hasStarted && <HeroSection onSuggestionClick={handleSuggestionClick} />}
			</AnimatePresence>

			{/* Chat Messages - only show when started */}
			<AnimatePresence>{hasStarted && <ChatMessages messages={messages} />}</AnimatePresence>

			{/* Input - single input that animates position */}
			<ChatInput ref={inputRef} value={input} onChange={setInput} onSubmit={handleSubmit} hasStarted={hasStarted} />
		</div>
	);
}
