import { apiUrl } from "@/lib/env";
import { getAuthTokens, setAuthTokens, isTokenExpired } from "@/lib/client-storage";
import { AuthResponse, ApiError } from "@/types";
import { getTokenExpiration } from "@/lib/jwt";
import { ENDPOINTS } from "@/constants";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
  skipRefresh?: boolean;
}

async function refreshAccessToken(refreshToken: string): Promise<AuthResponse | null> {
  try {
    const url = apiUrl(ENDPOINTS.AUTH.REFRESH);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const data: AuthResponse = await response.json();

    // Extract expiration from JWT token, or default to 1 hour from now
    const expiresAt = getTokenExpiration(data.access_token) ?? Math.floor(Date.now() / 1000) + 3600;

    setAuthTokens({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt,
    });

    return data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (response.status === 204 || !contentType) {
    return undefined as T;
  }

  if (contentType.includes("application/json")) {
    const text = await response.text();
    if (!text || text.trim() === "") {
      return undefined as T;
    }

    try {
      return JSON.parse(text);
    } catch {
      return text as T;
    }
  }

  const text = await response.text();
  return text as T;
}

export async function apiFetch<T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requiresAuth = true, skipRefresh = false, headers = {}, body, ...fetchOptions } = options;

  const url = apiUrl(endpoint);
  const isFormData = body instanceof FormData;

  let requestHeaders: HeadersInit = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...headers,
  };

  if (requiresAuth) {
    const tokens = getAuthTokens();

    if (!tokens) {
      throw new ApiError(401, "No authentication tokens found");
    }

    if (!skipRefresh && isTokenExpired(tokens.expiresAt)) {
      const refreshedTokens = await refreshAccessToken(tokens.refreshToken);

      if (!refreshedTokens) {
        throw new ApiError(401, "Failed to refresh authentication token");
      }

      // Get the newly stored tokens (already converted to camelCase in setAuthTokens)
      const newTokens = getAuthTokens();
      if (!newTokens) {
        throw new ApiError(401, "Failed to retrieve refreshed tokens");
      }

      requestHeaders = {
        ...requestHeaders,
        Authorization: `Bearer ${newTokens.accessToken}`,
      };
    } else {
      requestHeaders = {
        ...requestHeaders,
        Authorization: `Bearer ${tokens.accessToken}`,
      };
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: requestHeaders,
    body,
  });

  if (!response.ok) {
    console.error({ response });

    let errorMessage = "An error occurred";
    let errorData: unknown;

    try {
      errorData = await response.json();
      errorMessage =
        (errorData as { message?: string; reason?: string }).message ||
        (errorData as { message?: string; reason?: string }).reason ||
        response.statusText ||
        errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    console.error({ errorMessage });

    throw new ApiError(response.status, `${response.status}: ${errorMessage}`, errorData);
  }

  return parseResponse<T>(response);
}

export const api = {
  async get<T = unknown>(endpoint: string, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "GET",
    });
  },

  async post<T = unknown>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },

  async put<T = unknown>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },

  async patch<T = unknown>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },

  async delete<T = unknown>(endpoint: string, options?: FetchOptions): Promise<T> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "DELETE",
    });
  },
};
