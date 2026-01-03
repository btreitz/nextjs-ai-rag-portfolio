interface ToolOutputProps {
	name: string;
	data: unknown;
}

/**
 * Collapsible component for displaying tool call results.
 * Shows a summary with the tool name and expands to show full JSON data.
 */
export function ToolOutput({ name, data }: ToolOutputProps) {
	return (
		<details className="my-2">
			<summary className="cursor-pointer text-sm text-zinc-500 hover:text-zinc-400 transition-colors">{name}</summary>
			<pre className="mt-2 p-2 bg-zinc-900 dark:bg-zinc-800 rounded text-xs overflow-auto border border-zinc-700">
				{JSON.stringify(data, null, 2)}
			</pre>
		</details>
	);
}
