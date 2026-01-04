"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { portfolioOwner, suggestions } from "@/lib/config/portfolio";

interface HeroSectionProps {
	onSuggestionClick: (suggestion: string) => void;
}

/**
 * Hero section displayed before the chat starts.
 * Shows title, intro text with typewriter effect, and suggestion pills.
 */
export function HeroSection({ onSuggestionClick }: HeroSectionProps) {
	return (
		<motion.div
			className="absolute inset-0 flex flex-col items-center px-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.4 }}
		>
			{/* Title Section - Top half */}
			<motion.div
				className="flex-1 flex flex-col items-center justify-end pb-4"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -40, transition: { duration: 0.3 } }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<motion.h1
					className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.15 }}
				>
					Hi, I&apos;m {portfolioOwner.firstName}{" "}
					<motion.span
						className="inline-block origin-[70%_70%]"
						whileHover={{
							rotate: [0, 14, -8, 14, -4, 10, 0],
							transition: { duration: 0.6 }
						}}
					>
						👋
					</motion.span>
				</motion.h1>
				<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 max-w-md text-center leading-relaxed">
					<TypewriterText text={portfolioOwner.introText} delay={0.5} />
				</p>
			</motion.div>

			{/* Spacer for input */}
			<div className="h-20" />

			{/* Suggestion Pills - Bottom half */}
			<motion.div
				className="flex-1 flex items-start justify-center pt-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
				transition={{ duration: 0.5, delay: 0.35 }}
			>
				<div className="flex flex-wrap justify-center gap-2 max-w-md">
					{suggestions.map(({ label, question }, i) => (
						<motion.button
							key={label}
							onClick={() => onSuggestionClick(question)}
							className="px-4 py-2 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.45 + i * 0.08 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{label}
						</motion.button>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
