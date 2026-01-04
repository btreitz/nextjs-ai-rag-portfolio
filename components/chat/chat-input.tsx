"use client";

import { forwardRef, useState, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { suggestions } from "@/lib/config/portfolio";

interface ChatInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
	hasStarted: boolean;
}

/**
 * Animated chat input with rainbow gradient border.
 * Supports "/" command to show suggestion dropdown.
 */
const placeholders = ["Ask me anything...", "Type / for suggestions"];

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
	({ value, onChange, onSubmit, hasStarted }, ref) => {
		const [selectedIndex, setSelectedIndex] = useState(0);
		const [placeholderIndex, setPlaceholderIndex] = useState(0);

		// Cycle placeholder text every 15 seconds
		useEffect(() => {
			const interval = setInterval(() => {
				setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
			}, 15000);
			return () => clearInterval(interval);
		}, []);

		// Derive showSuggestions from value - no effect needed
		const showSuggestions = value === "/";

		const selectSuggestion = (question: string) => {
			onChange(question);
			setSelectedIndex(0);
		};

		const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
			if (!showSuggestions) return;

			switch (e.key) {
				case "Tab":
					e.preventDefault();
					if (e.shiftKey) {
						setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
					} else {
						setSelectedIndex((prev) => (prev + 1) % suggestions.length);
					}
					break;
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((prev) => (prev + 1) % suggestions.length);
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
					break;
				case "Enter":
					e.preventDefault();
					selectSuggestion(suggestions[selectedIndex].question);
					break;
				case "Escape":
					e.preventDefault();
					onChange("");
					break;
			}
		};

		const handleSubmit = (e: FormEvent) => {
			if (showSuggestions) {
				e.preventDefault();
				selectSuggestion(suggestions[selectedIndex].question);
				return;
			}
			onSubmit(e);
		};

		return (
			<motion.div
				className="absolute left-0 right-0 px-4 z-10"
				animate={{
					bottom: hasStarted ? 0 : "50%",
					y: hasStarted ? 0 : "50%"
				}}
				transition={{
					duration: 0.6,
					ease: [0.32, 0.72, 0, 1]
				}}
			>
				<div className={`${hasStarted ? "pt-4 pb-14" : "py-4"}`}>
					<form onSubmit={handleSubmit}>
						<motion.div
							className="relative p-0.5 rounded-full bg-[linear-gradient(90deg,#8b5cf6,#06b6d4,#ec4899,#f97316,#8b5cf6)] bg-[length:300%_100%] animate-gradient-rotate max-w-xl mx-auto"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{
								opacity: 1,
								scale: 1,
								maxWidth: hasStarted ? "100%" : "36rem"
							}}
							transition={{
								opacity: { duration: 0.5, delay: 0.2 },
								scale: { duration: 0.5, delay: 0.2 },
								maxWidth: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
							}}
						>
							{/* Suggestions Dropdown */}
							<AnimatePresence>
								{showSuggestions && (
									<motion.div
										className="absolute bottom-full left-0 right-0 mb-2 bg-background border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden"
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										transition={{ duration: 0.15 }}
									>
										<div className="p-2">
											<p className="px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-500">
												Quick prompts — Tab to navigate, Enter to select
											</p>
											{suggestions.map(({ label, question }, i) => (
												<button
													key={label}
													type="button"
													className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
														i === selectedIndex
															? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
															: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
													}`}
													onClick={() => selectSuggestion(question)}
													onMouseEnter={() => setSelectedIndex(i)}
												>
													<span className="font-medium">{label}</span>
													<span className="ml-2 text-sm text-zinc-400 dark:text-zinc-500">{question}</span>
												</button>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							<div className="flex items-center gap-2 bg-background rounded-full relative">
								{/* Animated placeholder overlay */}
								{!value && (
									<div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none">
										<AnimatePresence mode="wait">
											<motion.span
												key={placeholderIndex}
												className="text-zinc-400"
												initial={{ opacity: 0, y: 5 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -5 }}
												transition={{ duration: 0.2 }}
											>
												{placeholders[placeholderIndex]}
											</motion.span>
										</AnimatePresence>
									</div>
								)}
								<input
									ref={ref}
									className="w-full py-4 pl-8 pr-4 rounded-full bg-background text-foreground border-none outline-none flex-1"
									value={value}
									onChange={(e) => onChange(e.currentTarget.value)}
									onKeyDown={handleKeyDown}
								/>
								<motion.button
									type="submit"
									className="p-3 mr-1 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:cursor-pointer transition-colors"
									aria-label="Send message"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<ArrowRightIcon className="size-5" />
								</motion.button>
							</div>
						</motion.div>
					</form>
				</div>
			</motion.div>
		);
	}
);

ChatInput.displayName = "ChatInput";
