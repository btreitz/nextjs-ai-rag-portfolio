"use client";

import { motion } from "framer-motion";

interface TypewriterTextProps {
	text: string;
	/** Delay in seconds before the animation starts */
	delay?: number;
	/** Time in seconds between each character appearing */
	staggerInterval?: number;
}

/**
 * Animated text component that reveals characters one by one,
 * creating a typewriter effect using Framer Motion.
 */
export function TypewriterText({ text, delay = 0, staggerInterval = 0.015 }: TypewriterTextProps) {
	return (
		<motion.span
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: {
					transition: {
						delayChildren: delay,
						staggerChildren: staggerInterval
					}
				}
			}}
		>
			{text.split("").map((char, i) => (
				<motion.span
					key={i}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 }
					}}
				>
					{char}
				</motion.span>
			))}
		</motion.span>
	);
}
