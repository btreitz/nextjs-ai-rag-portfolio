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
	title: `Chat | ${portfolioOwner.name}`,
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

export type PortfolioOwner = typeof portfolioOwner;
export type SiteConfig = typeof siteConfig;
export type Suggestion = (typeof suggestions)[number];
