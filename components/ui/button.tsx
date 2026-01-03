import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "ghost";
	size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "default", ...props }, ref) => {
		return (
			<button
				className={cn(
					"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50",
					{
						"bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200":
							variant === "default",
						"border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800":
							variant === "outline",
						"hover:bg-zinc-100 dark:hover:bg-zinc-800": variant === "ghost"
					},
					{
						"h-9 px-4 py-2": size === "default",
						"h-8 rounded-md px-3 text-xs": size === "sm",
						"h-10 rounded-md px-8": size === "lg",
						"h-9 w-9": size === "icon"
					},
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button };
