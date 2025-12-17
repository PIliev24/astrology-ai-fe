// Type definitions and constants for i18n
// Note: We're using client-side locale management, so no server-side config is needed

export const locales = ["en", "bg"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
