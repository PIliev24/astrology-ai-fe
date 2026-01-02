"use client";

import useSWR from "swr";
import { getSubscription } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { SubscriptionResponse } from "@/types";

async function fetchSubscription(): Promise<SubscriptionResponse> {
  return await getSubscription();
}

export function useSubscription() {
  const {
    data: subscription,
    error,
    isLoading,
    mutate,
  } = useSWR(HOOK_KEYS.SUBSCRIPTION, fetchSubscription, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    subscription,
    isLoading,
    error,
    mutate,
  };
}

