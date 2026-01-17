import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type UserBubbleProps = ComponentProps<"div">;

export function UserBubble({ className, children, ...props }: UserBubbleProps) {
	return (
		<div
			className={cn(
				"max-w-[80%] rounded-lg px-4 py-3 border transition-[border-color,box-shadow] duration-200 ease-in-out",
				"bg-zinc-800 border-zinc-700 text-zinc-50",
				"hover:border-zinc-600 hover:shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
				"[&_.prose]:text-zinc-50",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
