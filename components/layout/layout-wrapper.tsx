"use client";

import { type ReactNode } from "react";
import { LayoutProvider } from "@/lib/context/layout-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { InteractiveGridBackground } from "@/components/ui/interactive-grid-background";

function LayoutContent({ children }: { children: ReactNode }) {

	return (
		<>
			{/* Interactive grid background pattern */}
			<InteractiveGridBackground className="bg-grid-fade" />

			{/* Header - always visible */}
			<Header />

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
