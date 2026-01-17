import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AiBubbleProps = ComponentProps<"div">;

export function AiBubble({ className, children, ...props }: AiBubbleProps) {
	return (
		<div
			className={cn(
				"max-w-[80%] rounded-lg px-4 py-3 border transition-[border-color,box-shadow] duration-200 ease-in-out",
				"bg-zinc-900 border-zinc-800 text-zinc-50",
				"hover:border-zinc-700 hover:shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
