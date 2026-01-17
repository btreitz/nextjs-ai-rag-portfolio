"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CodeBlockProps {
	language?: string;
	children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative group my-4">
			<div className="absolute right-2 top-2 z-10">
				<button
					onClick={handleCopy}
					className="p-2 rounded-md bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-300 hover:text-zinc-100 transition-colors opacity-0 group-hover:opacity-100"
					aria-label={copied ? "Copied" : "Copy code"}
				>
					{copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
				</button>
			</div>
			{language && (
				<div className="absolute left-4 top-2 text-xs text-zinc-500 font-mono">
					{language}
				</div>
			)}
			<SyntaxHighlighter
				language={language || "text"}
				style={oneDark}
				customStyle={{
					margin: 0,
					borderRadius: "0.5rem",
					padding: "2.5rem 1rem 1rem 1rem",
					fontSize: "0.875rem",
				}}
				codeTagProps={{
					style: {
						fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
					},
				}}
			>
				{children}
			</SyntaxHighlighter>
		</div>
	);
}

interface InlineCodeProps {
	children: React.ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
	return (
		<code className="px-1.5 py-0.5 rounded bg-zinc-800 text-sm font-mono">
			{children}
		</code>
	);
}
