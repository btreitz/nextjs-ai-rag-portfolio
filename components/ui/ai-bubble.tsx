import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AiBubbleProps = ComponentProps<"div">;

export function AiBubble({ className, children, ...props }: AiBubbleProps) {
	return (
		<div
			className={cn(
				"max-w-[80%] rounded-lg px-4 py-3 border transition-[border-color,transform] duration-200 ease-in-out",
				// Light mode
				"bg-zinc-100 border-zinc-200 text-zinc-900",
				"hover:border-zinc-300 hover:translate-x-0.5",
				// Dark mode
				"dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50",
				"dark:hover:border-zinc-700",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
