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

export function getStripePublishableKey(): string {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set");
    return "";
  }

  return publishableKey;
}

export function getWeb3FormsKey(): string {
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!web3FormsKey) {
    console.warn("NEXT_PUBLIC_WEB3FORMS_KEY environment variable is not set");
    return "";
  }

  return web3FormsKey;
}
