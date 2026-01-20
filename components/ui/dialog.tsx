"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
	// Close on Escape key
	React.useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (open) {
			document.addEventListener("keydown", handleEscape);
			// Prevent body scroll when dialog is open
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center">
					{/* Backdrop */}
					<motion.div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Dialog content */}
					<motion.div
						className={cn(
							"relative z-10 mx-4 max-h-[85vh] w-full max-w-lg overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl",
							className
						)}
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.2 }}
						role="dialog"
						aria-modal="true"
					>
						{/* Close button */}
						<button
							onClick={onClose}
							className="absolute right-4 top-4 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
							aria-label="Close dialog"
						>
							<X className="h-5 w-5" />
						</button>

						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}

interface DialogHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<div className={cn("mb-4 pr-8", className)}>
			{children}
		</div>
	);
}

interface DialogTitleProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
	return (
		<h2 className={cn("text-lg font-semibold text-zinc-50", className)}>
			{children}
		</h2>
	);
}

interface DialogDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
	return (
		<p className={cn("mt-1 text-sm text-zinc-400", className)}>
			{children}
		</p>
	);
}

interface DialogContentProps {
	children: React.ReactNode;
	className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
	return (
		<div className={cn("text-sm text-zinc-300", className)}>
			{children}
		</div>
	);
}
