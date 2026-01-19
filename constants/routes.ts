export const ROUTES = {
  // Public routes
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ZODIAC: "/zodiac",
  HOUSES: "/houses",
  PLANETS: "/planets",
  GUIDE: "/guide",
  CONTACT_US: "/contact",
  TERMS: "/terms",
  PRIVACY: "/privacy",

  // Auth routes
  HOME: "/",
  DASHBOARD: "/dashboard",
  CHART: (id: string) => `/chart/${id}`,
} as const;

// Routes that don't require authentication
export const PUBLIC_ROUTES = [
  ROUTES.LANDING,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.ZODIAC,
  ROUTES.HOUSES,
  ROUTES.PLANETS,
  ROUTES.GUIDE,
  ROUTES.CONTACT_US,
  ROUTES.PRIVACY,
  ROUTES.TERMS,
] as const;
