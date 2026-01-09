import useSWR from "swr";
import { getPlans } from "@/services";
import { PlansListResponse, PlanDetails } from "@/types";
import { HOOK_KEYS } from "@/constants";

export function usePlans() {
  const { data, error, isLoading, mutate } = useSWR<PlansListResponse>(
    HOOK_KEYS.PLANS,
    getPlans,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    plans: data?.plans || [],
    isLoading,
    error,
    mutate,
  };
}

export function usePlanById(planId: string | null): PlanDetails | undefined {
  const { plans } = usePlans();
  return plans.find((plan) => plan.type === planId);
}

