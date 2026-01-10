import { api } from "./api-client";
import { SubscriptionResponse, UsageResponse, CheckoutRequest, CheckoutResponse, PlansListResponse } from "@/types";
import { ENDPOINTS } from "@/constants";

export async function getSubscription(): Promise<SubscriptionResponse> {
  return api.get<SubscriptionResponse>(ENDPOINTS.SUBSCRIPTIONS.ME);
}

export async function getUsage(): Promise<UsageResponse> {
  return api.get<UsageResponse>(ENDPOINTS.SUBSCRIPTIONS.USAGE);
}

export async function createCheckoutSession(request: CheckoutRequest): Promise<CheckoutResponse> {
  return api.post<CheckoutResponse>(ENDPOINTS.SUBSCRIPTIONS.CHECKOUT, request);
}

export async function cancelSubscription(): Promise<SubscriptionResponse> {
  return api.post<SubscriptionResponse>(ENDPOINTS.SUBSCRIPTIONS.CANCEL, {});
}

export async function reactivateSubscription(): Promise<SubscriptionResponse> {
  return api.post<SubscriptionResponse>(ENDPOINTS.SUBSCRIPTIONS.REACTIVATE, {});
}

export async function getPlans(): Promise<PlansListResponse> {
  return api.get<PlansListResponse>(ENDPOINTS.SUBSCRIPTIONS.PLANS);
}
