"use client";

import * as React from "react";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

export interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "small";
	demo?: boolean;
	onAcceptCallback?: () => void;
	onDeclineCallback?: () => void;
	onLearnMoreClick?: () => void;
	description?: string;
}

const CookieConsent = React.forwardRef<HTMLDivElement, CookieConsentProps>(
	(
		{
			variant = "default",
			demo = false,
			onAcceptCallback = () => {},
			onDeclineCallback = () => {},
			onLearnMoreClick,
			className,
			description = "We use cookies to analyze site traffic and improve your experience. Your chat messages are processed by AI services for quality monitoring.",
			...props
		},
		ref
	) => {
		const [isOpen, setIsOpen] = React.useState(false);
		const [hide, setHide] = React.useState(false);

		const handleAccept = React.useCallback(() => {
			setIsOpen(false);
			document.cookie =
				"cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
			setTimeout(() => setHide(true), 700);
			// Dispatch custom event for AnalyticsProvider
			window.dispatchEvent(new CustomEvent("cookieConsentChange", { detail: { accepted: true } }));
			onAcceptCallback();
		}, [onAcceptCallback]);

		const handleDecline = React.useCallback(() => {
			setIsOpen(false);
			setTimeout(() => setHide(true), 700);
			onDeclineCallback();
		}, [onDeclineCallback]);

		React.useEffect(() => {
			try {
				setIsOpen(true);
				if (document.cookie.includes("cookieConsent=true") && !demo) {
					setIsOpen(false);
					setTimeout(() => setHide(true), 700);
				}
			} catch {
				// Cookie access may fail in some contexts
			}
		}, [demo]);

		if (hide) {
			return null;
		}

		const containerClasses = cn(
			"fixed z-50 transition-all duration-700",
			!isOpen
				? "translate-y-8 opacity-0"
				: "translate-y-0 opacity-100",
			className
		);

		if (variant === "small") {
			return (
				<div
					ref={ref}
					className={cn(containerClasses, "bottom-4 left-4 right-4 sm:right-auto sm:max-w-md")}
					{...props}
				>
					<Card className="border-zinc-700 bg-zinc-900/95 backdrop-blur-sm">
						<CardContent className="p-4">
							<div className="flex items-start gap-3">
								<Cookie className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400" />
								<div className="space-y-3">
									<p className="text-sm text-zinc-300">{description}</p>
									<div className="flex flex-wrap gap-2">
										<Button size="sm" className="min-w-20" onClick={handleAccept}>
											Accept
										</Button>
										<Button size="sm" className="min-w-20" variant="outline" onClick={handleDecline}>
											Decline
										</Button>
										{onLearnMoreClick && (
											<Button
												size="sm"
												variant="ghost"
												onClick={onLearnMoreClick}
												className="text-zinc-400 hover:text-zinc-100"
											>
												Learn more
											</Button>
										)}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			);
		}

		return (
			<div
				ref={ref}
				className={cn(containerClasses, "bottom-0 left-0 right-0 p-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md")}
				{...props}
			>
				<Card className="border-zinc-700 bg-zinc-900/95 backdrop-blur-sm">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Cookie className="h-5 w-5" />
							Cookie Settings
						</CardTitle>
						<CardDescription className="text-zinc-400">
							{description}
						</CardDescription>
					</CardHeader>
					<CardFooter className="flex flex-col gap-2 sm:flex-row">
						<Button className="w-full sm:w-auto" onClick={handleAccept}>
							Accept All
						</Button>
						<Button
							className="w-full sm:w-auto"
							variant="outline"
							onClick={handleDecline}
						>
							Decline
						</Button>
						{onLearnMoreClick && (
							<Button
								className="w-full text-zinc-400 hover:text-zinc-100 sm:w-auto"
								variant="ghost"
								onClick={onLearnMoreClick}
							>
								Learn more
							</Button>
						)}
					</CardFooter>
				</Card>
			</div>
		);
	}
);

CookieConsent.displayName = "CookieConsent";

export { CookieConsent };
