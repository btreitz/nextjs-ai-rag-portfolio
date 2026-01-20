"use client";

import {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogContent
} from "@/components/ui/dialog";
import { privacyPolicy } from "@/lib/config/portfolio";

interface PrivacyPolicyModalProps {
	open: boolean;
	onClose: () => void;
}

export function PrivacyPolicyModal({ open, onClose }: PrivacyPolicyModalProps) {
	return (
		<Dialog open={open} onClose={onClose} className="max-w-2xl">
			<DialogHeader>
				<DialogTitle>{privacyPolicy.title}</DialogTitle>
				<DialogDescription>
					Last updated: {privacyPolicy.lastUpdated}
				</DialogDescription>
			</DialogHeader>

			<DialogContent className="space-y-6">
				{privacyPolicy.sections.map((section, index) => (
					<div key={index}>
						<h3 className="mb-2 font-medium text-zinc-100">{section.title}</h3>
						{"content" in section && (
							<p className="text-zinc-400">{section.content}</p>
						)}
						{"items" in section && (
							<ul className="list-inside list-disc space-y-1 text-zinc-400">
								{section.items.map((item, itemIndex) => (
									<li key={itemIndex}>{item}</li>
								))}
							</ul>
						)}
					</div>
				))}
			</DialogContent>
		</Dialog>
	);
}
