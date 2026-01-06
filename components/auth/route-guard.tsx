"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { ROUTES, PUBLIC_ROUTES } from "@/constants";
import { Loader2 } from "lucide-react";

// Auth-only routes that redirect to dashboard if authenticated
const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Check if current path is a public route (including nested paths like /zodiac/aries)
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if current path is an auth-only route (login/signup)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const isAuthenticated = !!user;

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, [setMounted]);

  useEffect(() => {
    if (!mounted || isLoading) return;

    // Redirect unauthenticated users from protected routes to login
    if (!isAuthenticated && !isPublicRoute) {
      router.push(ROUTES.LOGIN);
      return;
    }

    // Redirect authenticated users from login/signup to home
    // But allow them to access other public routes like zodiac, houses, etc.
    if (isAuthenticated && isAuthRoute) {
      router.push(ROUTES.HOME);
      return;
    }
  }, [user, isLoading, pathname, router, isAuthenticated, isPublicRoute, isAuthRoute, mounted]);

  // Show loading spinner while checking auth for protected routes only
  if (!mounted || (isLoading && !isPublicRoute)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
