export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CHART: (id: string) => `/chart/${id}`,
} as const;
