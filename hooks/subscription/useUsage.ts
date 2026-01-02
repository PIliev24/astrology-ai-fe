"use client";

import useSWR from "swr";
import { getUsage } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { UsageResponse } from "@/types";

async function fetchUsage(): Promise<UsageResponse> {
  return await getUsage();
}

export function useUsage() {
  const {
    data: usage,
    error,
    isLoading,
    mutate,
  } = useSWR(HOOK_KEYS.USAGE, fetchUsage, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    usage,
    isLoading,
    error,
    mutate,
  };
}

