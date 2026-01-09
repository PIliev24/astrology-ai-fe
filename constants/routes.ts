export const ROUTES = {
  // Public routes
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ZODIAC: "/zodiac",
  HOUSES: "/houses",
  PLANETS: "/planets",
  GUIDE: "/guide",

  // Auth routes
  HOME: "/",
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
] as const;
