import type { ComponentProps } from "react";
import { AiBubble } from "./ai-bubble";
import { UserBubble } from "./user-bubble";

export interface ChatBubbleProps extends ComponentProps<"div"> {
	variant: "user" | "ai";
}

/**
 * Chat bubble component that renders either AiBubble or UserBubble based on variant.
 */
export function ChatBubble({ variant, ...props }: ChatBubbleProps) {
	if (variant === "ai") {
		return <AiBubble {...props} />;
	}
	return <UserBubble {...props} />;
}
