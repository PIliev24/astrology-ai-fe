export function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL or NEXT_PUBLIC_API_URL environment variable is not set");
  }

  return apiUrl;
}

export function apiUrl(endpoint: string): string {
  const baseUrl = getApiUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

export function getWebSocketUrl(endpoint: string): string {
  const baseUrl = getApiUrl();
  // Convert http to ws or https to wss
  const wsBaseUrl = baseUrl.replace(/^http/, "ws");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${wsBaseUrl}${cleanEndpoint}`;
}
