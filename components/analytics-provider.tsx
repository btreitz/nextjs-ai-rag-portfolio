"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/next";

function getConsentSnapshot(): boolean {
	return document.cookie.includes("cookieConsent=true");
}

function getServerSnapshot(): boolean {
	return false;
}

function subscribeToConsent(callback: () => void): () => void {
	const handleConsentChange = () => callback();
	window.addEventListener("cookieConsentChange", handleConsentChange);
	return () => window.removeEventListener("cookieConsentChange", handleConsentChange);
}

export function AnalyticsProvider() {
	const hasConsent = useSyncExternalStore(
		subscribeToConsent,
		getConsentSnapshot,
		getServerSnapshot
	);

	// Force re-check on mount to catch consent from previous sessions
	useEffect(() => {
		// Trigger a synthetic event to re-evaluate consent state
		window.dispatchEvent(new CustomEvent("cookieConsentChange"));
	}, []);

	if (!hasConsent) {
		return null;
	}

	return <Analytics />;
}
