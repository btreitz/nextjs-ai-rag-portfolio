"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioOwner } from "@/lib/config/portfolio";
import { useLayout } from "@/lib/context/layout-context";

/**
 * Glass-like curved header with logo, resume link, and social links.
 */
export function Header() {
	const { onLogoClick } = useLayout();

	const handleLogoClick = () => {
		if (onLogoClick) {
			onLogoClick();
		}
	};

	return (
		<motion.header
			className="fixed top-0 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.3 }}
		>
			<div className="flex items-center justify-between px-5 py-2.5 rounded-b-2xl bg-zinc-100/70 dark:bg-zinc-900/70 backdrop-blur-md border border-t-0 border-zinc-200/50 dark:border-zinc-800/50">
				{/* Logo */}
				<button onClick={handleLogoClick} className="flex items-center cursor-pointer">
					<Image
						src="/logo.webp"
						alt="logo"
						width={32}
						height={32}
						className="rounded-lg transition-all hover:scale-105"
					/>
				</button>

				{/* Resume and Social links */}
				<div className="flex items-center gap-5">
					<a
						href={portfolioOwner.links.resume}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
					>
						<FileTextIcon className="size-4" />
						<span>Resume</span>
					</a>

					<a
						href={portfolioOwner.links.projects}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
					>
						<ExternalLinkIcon className="size-4" />
						<span>Projects</span>
					</a>

					<div className="flex items-center gap-4">
						<a
							href={portfolioOwner.links.github}
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
							aria-label="GitHub"
						>
							<GitHubIcon className="size-5" />
						</a>
						<a
							href={portfolioOwner.links.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
							aria-label="LinkedIn"
						>
							<LinkedInIcon className="size-5" />
						</a>
					</div>
				</div>
			</div>
		</motion.header>
	);
}

function FileTextIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
			<polyline points="14 2 14 8 20 8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
			<line x1="10" y1="9" x2="8" y2="9" />
		</svg>
	);
}

function ExternalLinkIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	);
}

function GitHubIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
	);
}

function LinkedInIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="currentColor">
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}
