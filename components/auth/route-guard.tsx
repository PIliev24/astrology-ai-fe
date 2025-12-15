"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/constants";
import { Loader2 } from "lucide-react";

const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isAuthenticated = !!user;

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, [setMounted]);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (isAuthenticated && isPublicRoute) {
      router.push(ROUTES.HOME);
      return;
    }
  }, [user, isLoading, pathname, router, isAuthenticated, isPublicRoute, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

