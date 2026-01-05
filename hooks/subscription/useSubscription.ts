"use client";

import useSWR from "swr";
import { getSubscription } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { SubscriptionResponse, Subscription } from "@/types";

async function fetchSubscription(): Promise<SubscriptionResponse> {
  return await getSubscription();
}

// Transform API response (snake_case) to internal format (camelCase)
function transformSubscription(response: SubscriptionResponse): Subscription {
  return {
    id: response.id,
    userId: undefined, // Not provided in API response
    plan: response.plan,
    isActive: response.is_active ?? false,
    stripeCustomerId: response.stripe_customer_id,
    stripeSubscriptionId: response.stripe_subscription_id ?? null,
    stripePriceId: null, // Not provided in API response
    currentPeriodEnd: response.current_period_end ?? null,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
  };
}

export function useSubscription() {
  const {
    data: subscriptionResponse,
    error,
    isLoading,
    mutate,
  } = useSWR(HOOK_KEYS.SUBSCRIPTION, fetchSubscription, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const subscription = subscriptionResponse ? transformSubscription(subscriptionResponse) : undefined;

  return {
    subscription,
    isLoading,
    error,
    mutate,
  };
}
