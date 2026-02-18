/**
 * Fallback only when NEXT_PUBLIC_SITE_URL is not set (e.g. local `bun run dev`).
 * In production set NEXT_PUBLIC_SITE_URL in env so this is never used.
 */
export const DEFAULT_DEV_ORIGIN = "http://127.0.0.1:3000";
export const DEFAULT_DEV_REDIRECT_URI = `${DEFAULT_DEV_ORIGIN}/api/callback`;
