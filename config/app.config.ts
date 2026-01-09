/**
 * Centralized application configuration
 * All timing constants, API settings, and feature flags in one place
 */

export const APP_CONFIG = {
  // Application info
  app: {
    name: "Aistrology",
    tagline: "AI-Powered Astrology",
    description: "Discover your cosmic destiny with AI-powered astrology readings",
    domain: "aistrology.eu",
  },

  // Timing constants (in milliseconds)
  timing: {
    tokenRefreshBuffer: 5 * 60 * 1000, // 5 minutes before expiration
    tokenCheckInterval: 60 * 1000, // Check token every minute
    websocketReconnectDelay: 3000, // 3 seconds
    websocketMaxReconnectAttempts: 5,
    toastDuration: 4000, // 4 seconds
    debounceDelay: 300, // 300ms
    apiTimeout: 30000, // 30 seconds
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Authentication
  auth: {
    accessTokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    tokenType: "Bearer",
  },

  // Storage keys
  storage: {
    theme: "theme",
    user: "user",
    birthCharts: "birthCharts",
    lastConversation: "lastConversation",
  },

  // Feature flags
  features: {
    enableSubscriptions: true,
    enableWebSocket: true,
    enableDarkMode: true,
    enableMultipleCharts: true,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // Validation
  validation: {
    minPasswordLength: 8,
    maxNameLength: 100,
    maxLocationLength: 200,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
