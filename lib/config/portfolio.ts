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
	locale: "en_US"
} as const;

/** Derived values - computed from the base config */
export const siteConfig = {
	title: `Chat | ${portfolioOwner.name}`,
	siteName: portfolioOwner.name
} as const;

export type PortfolioOwner = typeof portfolioOwner;
export type SiteConfig = typeof siteConfig;
