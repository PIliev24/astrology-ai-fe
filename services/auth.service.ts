import { api, apiFetch } from "./api-client";
import { AuthResponse, LoginRequest, SignupRequest, User } from "@/types";
import { setAuthTokens, clearAuthTokens, getAuthTokens } from "@/lib/client-storage";
import { getTokenExpiration } from "@/lib/jwt";
import { ENDPOINTS } from "@/constants";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>(ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify(credentials),
    requiresAuth: false,
  });

  // Extract expiration from JWT token, or default to 1 hour from now
  const expiresAt = getTokenExpiration(response.access_token) ?? Math.floor(Date.now() / 1000) + 3600;

  setAuthTokens({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt,
  });

  return response;
}

export async function signup(credentials: SignupRequest): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>(ENDPOINTS.AUTH.SIGNUP, {
    method: "POST",
    body: JSON.stringify(credentials),
    requiresAuth: false,
  });

  // Extract expiration from JWT token, or default to 1 hour from now
  const expiresAt = getTokenExpiration(response.access_token) ?? Math.floor(Date.now() / 1000) + 3600;

  setAuthTokens({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt,
  });

  return response;
}

export async function logout(): Promise<void> {
  clearAuthTokens();
}

export async function getCurrentUser(): Promise<User> {
  return api.get<User>(ENDPOINTS.AUTH.ME);
}

export async function refreshTokens(): Promise<AuthResponse> {
  const tokens = getAuthTokens();

  if (!tokens) {
    throw new Error("No refresh token found");
  }

  const response = await apiFetch<AuthResponse>(ENDPOINTS.AUTH.REFRESH, {
    method: "POST",
    body: JSON.stringify({ refresh_token: tokens.refreshToken }),
    requiresAuth: false,
    skipRefresh: true,
  });

  // Extract expiration from JWT token, or default to 1 hour from now
  const expiresAt = getTokenExpiration(response.access_token) ?? Math.floor(Date.now() / 1000) + 3600;

  setAuthTokens({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt,
  });

  return response;
}

export function isAuthenticated(): boolean {
  const tokens = getAuthTokens();
  return tokens !== null;
}
