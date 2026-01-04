"use client";

import { type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { LayoutProvider, useLayout } from "@/lib/context/layout-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

function LayoutContent({ children }: { children: ReactNode }) {
	const { showHeader } = useLayout();

	return (
		<>
			{/* Grid background pattern */}
			<div className="fixed inset-0 bg-grid-pattern bg-grid-fade pointer-events-none" aria-hidden="true" />

			{/* Header - conditionally shown */}
			<AnimatePresence>{showHeader && <Header />}</AnimatePresence>

			{/* Page content */}
			{children}

			{/* Footer - always visible */}
			<Footer />
		</>
	);
}

export function LayoutWrapper({ children }: { children: ReactNode }) {
	return (
		<LayoutProvider>
			<LayoutContent>{children}</LayoutContent>
		</LayoutProvider>
	);
}
