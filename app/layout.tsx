import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { portfolioOwner, siteConfig } from "@/lib/config/portfolio";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: portfolioOwner.description,
	keywords: portfolioOwner.keywords as unknown as string[],
	authors: [{ name: portfolioOwner.name }],
	creator: portfolioOwner.name,
	openGraph: {
		type: "website",
		locale: portfolioOwner.locale,
		title: siteConfig.title,
		description: portfolioOwner.description,
		siteName: siteConfig.siteName,
		images: ["/chat-og-share.webp"]
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: portfolioOwner.description,
		images: ["/chat-og-share.webp"]
	},
	robots: {
		index: true,
		follow: true
	},
	icons: {
		icon: "/favicon.ico"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<LayoutWrapper>{children}</LayoutWrapper>
				<Analytics />
			</body>
		</html>
	);
}
