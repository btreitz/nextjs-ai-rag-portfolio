import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Chat | Bastian Treitz",
	description:
		"Software developer based in Berlin. Specializing in React, TypeScript, and building AI-powered applications.",
	keywords: ["software developer", "Berlin", "React", "TypeScript", "AI", "full-stack developer"],
	authors: [{ name: "Bastian Treitz" }],
	creator: "Bastian Treitz",
	openGraph: {
		type: "website",
		locale: "en_US",
		title: "Chat | Bastian Treitz",
		description:
			"Software developer based in Berlin. Specializing in React, TypeScript, and building AI-powered applications.",
		siteName: "Bastian Treitz"
	},
	twitter: {
		card: "summary_large_image",
		title: "Chat | Bastian Treitz",
		description:
			"Software developer based in Berlin. Specializing in React, TypeScript, and building AI-powered applications."
	},
	robots: {
		index: true,
		follow: true
	},
	icons: {
		icon: "/trtz.webp"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
