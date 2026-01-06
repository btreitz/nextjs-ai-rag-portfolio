"use client";

import { type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { LayoutProvider, useLayout } from "@/lib/context/layout-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { InteractiveGridBackground } from "@/components/ui/interactive-grid-background";

function LayoutContent({ children }: { children: ReactNode }) {
	const { showHeader } = useLayout();

	return (
		<>
			{/* Interactive grid background pattern */}
			<InteractiveGridBackground className="bg-grid-fade" />

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
