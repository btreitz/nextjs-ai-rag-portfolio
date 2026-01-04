/**
 * Next.js Instrumentation for LangFuse Observability
 *
 * This file is automatically loaded by Next.js at server startup.
 * LangFuse integration is OPTIONAL - controlled by the LANGFUSE_ENABLED env var.
 *
 * Required env vars for LangFuse:
 *   - LANGFUSE_ENABLED=true
 *   - LANGFUSE_SECRET_KEY
 *   - LANGFUSE_PUBLIC_KEY
 *   - LANGFUSE_BASE_URL (optional, defaults to EU cloud)
 */

export async function register() {
	// Dynamic import to use validated env
	const { env } = await import("@/lib/env");

	if (!env.LANGFUSE_ENABLED) {
		return;
	}

	if (!env.LANGFUSE_SECRET_KEY || !env.LANGFUSE_PUBLIC_KEY) {
		console.warn("LangFuse: Enabled but missing LANGFUSE_SECRET_KEY or LANGFUSE_PUBLIC_KEY");
		return;
	}

	// Dynamic import to avoid loading OpenTelemetry when not needed
	const { NodeSDK } = await import("@opentelemetry/sdk-node");
	const { LangfuseSpanProcessor } = await import("@langfuse/otel");

	const sdk = new NodeSDK({
		spanProcessors: [new LangfuseSpanProcessor()]
	});

	sdk.start();

	console.log("LangFuse: Observability enabled");
}
