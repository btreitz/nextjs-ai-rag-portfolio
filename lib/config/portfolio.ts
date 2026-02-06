/**
 * Portfolio Owner Configuration
 *
 * Update these values to personalize your portfolio.
 * All references throughout the app will use these values.
 */

export const portfolioOwner = {
	/** Full name (e.g., "John Doe") */
	name: "Bastian Treitz",

	/** First name only (e.g., "John") */
	firstName: "Bastian",

	/** Brief description for SEO and social sharing */
	description:
		"Software developer based in Berlin. Specializing in React, TypeScript, and building AI-powered applications.",

	/** Intro text shown on the hero section with typewriter effect */
	introText:
		"Software developer based in Berlin. Ask me about my experience with React, TypeScript, my home lab, or personal projects.",

	/** SEO keywords */
	keywords: ["software developer", "Berlin", "React", "TypeScript", "AI", "full-stack developer"],

	/** OpenGraph locale (e.g., "en_US", "de_DE") */
	locale: "en_US",

	/** Social and external links */
	links: {
		github: "https://github.com/btreitz",
		linkedin: "https://www.linkedin.com/in/btreitz/",
		resume: "https://drive.google.com/file/d/1O4VQaYh5GpHBv2Jz4s4IMW2mB0sbP1nW/view?usp=drive_link",
		status: "https://stats.uptimerobot.com/4Z2O7HYX74",
		projects: "https://projects.trtz.dev/"
	}
} as const;

/** Derived values - computed from the base config */
export const siteConfig = {
	title: `Chat > TEST | ${portfolioOwner.name}`,
	siteName: portfolioOwner.name
} as const;

/** Chat suggestion prompts - shown in hero and available via "/" command */
export const suggestions = [
	{ label: "Professional experience", question: "What is your professional experience?" },
	{ label: "Personal projects", question: "What personal projects have you built?" },
	{ label: "Tech stack", question: "What technologies and tools do you work with?" },
	{ label: "Home lab", question: "What's running in your home lab?" },
	{ label: "Contact info", question: "How can I get in touch with you?" }
] as const;

/** Privacy policy content for GDPR compliance */
export const privacyPolicy = {
	title: "Privacy Policy",
	lastUpdated: "January 2026",
	sections: [
		{
			title: "Analytics (Requires Consent)",
			content:
				"We use Vercel Analytics to understand how visitors interact with this site. This service collects anonymized data about page views, device type, and general location. This data is only collected if you accept cookies."
		},
		{
			title: "Chat Processing (Legitimate Interest)",
			content:
				"When you use the chat feature, your messages are processed by OpenAI to generate responses. We also use LangFuse to monitor chat quality and prevent abuse. This processing is necessary for the service to function and to protect against misuse (Art. 6(1)(f) GDPR - Legitimate Interest)."
		},
		{
			title: "Data Storage",
			content:
				"Chat messages are not permanently stored on our servers. They are processed in real-time and may be temporarily logged for quality monitoring purposes."
		},
		{
			title: "Your Rights",
			content:
				"Under GDPR, you have the right to access, rectify, or delete your personal data. You can also object to processing based on legitimate interest. For any privacy-related requests, please contact me via LinkedIn."
		},
		{
			title: "Third-Party Services",
			items: [
				"OpenAI - Chat message processing (US-based, Standard Contractual Clauses)",
				"LangFuse - Quality monitoring (EU-based)",
				"Vercel Analytics - Site analytics (US-based, only with consent)"
			]
		}
	]
} as const;

export type PortfolioOwner = typeof portfolioOwner;
export type SiteConfig = typeof siteConfig;
export type Suggestion = (typeof suggestions)[number];
export type PrivacyPolicy = typeof privacyPolicy;
