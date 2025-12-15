export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  BIRTH_CHART: {
    BASE: "/astrology/birth-chart",
    BY_ID: (id: string) => `/astrology/birth-chart/${id}`,
  },
  WEBSOCKET: {
    CHAT: "/ws/chat",
  },
} as const;

