import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type UserBubbleProps = ComponentProps<"div">;

export function UserBubble({ className, children, ...props }: UserBubbleProps) {
	return (
		<div
			className={cn(
				"max-w-[80%] rounded-lg px-4 py-3 border transition-[border-color,transform] duration-200 ease-in-out",
				// Light mode
				"bg-white border-zinc-200 text-zinc-900",
				"hover:border-zinc-300 hover:-translate-x-0.5",
				// Dark mode
				"dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50",
				"dark:hover:border-zinc-600",
				// Prose colors
				"[&_.prose]:text-zinc-900 [&_.prose]:prose-zinc",
				"dark:[&_.prose]:text-zinc-50",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
