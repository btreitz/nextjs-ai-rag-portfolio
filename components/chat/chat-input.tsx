"use client";

import { forwardRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

interface ChatInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
	hasStarted: boolean;
}

/**
 * Animated chat input with rainbow gradient border.
 * Animates from center to bottom when chat starts.
 */
export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
	({ value, onChange, onSubmit, hasStarted }, ref) => {
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
				<div className="py-4">
					<form onSubmit={onSubmit}>
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
							<div className="flex items-center gap-2 bg-background rounded-full">
								<input
									ref={ref}
									className="w-full py-4 pl-8 pr-4 rounded-full bg-background text-foreground border-none outline-none placeholder:text-zinc-400 flex-1"
									value={value}
									placeholder={"Ask me anything..."}
									onChange={(e) => onChange(e.currentTarget.value)}
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
