"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface LayoutContextType {
	showHeader: boolean;
	setShowHeader: (show: boolean) => void;
	onLogoClick: (() => void) | null;
	setOnLogoClick: (handler: (() => void) | null) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
	const [showHeader, setShowHeader] = useState(false);
	const [onLogoClick, setOnLogoClickState] = useState<(() => void) | null>(null);

	const setOnLogoClick = useCallback((handler: (() => void) | null) => {
		setOnLogoClickState(() => handler);
	}, []);

	return (
		<LayoutContext.Provider value={{ showHeader, setShowHeader, onLogoClick, setOnLogoClick }}>
			{children}
		</LayoutContext.Provider>
	);
}

export function useLayout() {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error("useLayout must be used within a LayoutProvider");
	}
	return context;
}
