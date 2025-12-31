"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { getCurrentUser } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { isAuthenticated } from "@/services/auth.service";

async function fetchCurrentUser() {
  if (!isAuthenticated()) {
    return null;
  }
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

export function useAuth() {
  // Track if component is mounted to avoid hydration mismatches
  // This is a standard Next.js pattern to ensure server and client render match
  // The lint warning is a false positive - this is intentional for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(mounted && isAuthenticated() ? HOOK_KEYS.CURRENT_USER : null, fetchCurrentUser, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    user,
    isLoading: !mounted || isLoading,
    isAuthenticated: !!user && !error,
    error,
    mutate,
  };
}
