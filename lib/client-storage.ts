import type { AuthTokens } from "@/types/auth";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  EXPIRES_AT: "expiresAt",
} as const;

export function getAuthTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;

  try {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const expiresAt = localStorage.getItem(STORAGE_KEYS.EXPIRES_AT);

    if (!accessToken || !refreshToken || !expiresAt) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresAt: parseInt(expiresAt, 10),
    };
  } catch (error) {
    console.error("Error reading auth tokens:", error);
    return null;
  }
}

export function setAuthTokens(tokens: AuthTokens): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    
    // Handle expiresAt - if undefined, calculate default (1 hour from now)
    const expiresAt = tokens.expiresAt ?? Math.floor(Date.now() / 1000) + 3600;
    localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString());
  } catch (error) {
    console.error("Error saving auth tokens:", error);
  }
}

export function clearAuthTokens(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);
  } catch (error) {
    console.error("Error clearing auth tokens:", error);
  }
}

export function isTokenExpired(expiresAt: number): boolean {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const bufferTime = 5 * 60; // 5 minutes buffer
  return expiresAt - nowInSeconds < bufferTime;
}

