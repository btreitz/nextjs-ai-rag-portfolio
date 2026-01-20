"use client";

import { useState } from "react";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal";

export function CookieConsentWrapper() {
	const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

	return (
		<>
			<CookieConsent onLearnMoreClick={() => setIsPrivacyModalOpen(true)} variant="small" />
			<PrivacyPolicyModal open={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
		</>
	);
}
