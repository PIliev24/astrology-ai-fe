import { ApiError, ActionResponse } from "@/types";
import { Subscription, Usage, PlanType, PlanDetails } from "@/types";
import {
  getSubscription,
  getUsage,
  createCheckoutSession,
  cancelSubscription,
  reactivateSubscription,
  getPlans,
} from "@/services";

/**
 * Get current user's subscription
 */
export async function getSubscriptionAction(): Promise<
  ActionResponse<{ subscription: Subscription }>
> {
  try {
    const response = await getSubscription();
    const subscription: Subscription = {
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

    return {
      success: true,
      data: { subscription },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to fetch subscription",
    };
  }
}

/**
 * Get current user's message usage statistics
 */
export async function getUsageAction(): Promise<ActionResponse<{ usage: Usage }>> {
  try {
    const response = await getUsage();
    const usage: Usage = {
      id: "", // Not provided in API response
      userId: "", // Not provided in API response
      messageCount: response.message_count,
      messagesRemaining: response.messages_remaining ?? 0,
      messagesUntilReset: 0, // Not provided in API response
      resetAt: response.reset_at,
      createdAt: response.last_reset_at, // Use last_reset_at as fallback
      updatedAt: response.reset_at, // Use reset_at as fallback
    };

    return {
      success: true,
      data: { usage },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to fetch usage statistics",
    };
  }
}

/**
 * Create a checkout session for upgrading to a paid plan
 */
export async function createCheckoutSessionAction(
  plan: PlanType
): Promise<ActionResponse<{ checkoutUrl: string; sessionId: string }>> {
  if (plan === PlanType.FREE) {
    return {
      success: false,
      error: "Cannot create checkout session for free plan",
    };
  }

  try {
    const request = {
      plan,
      success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/checkout/cancel`,
    };

    const response = await createCheckoutSession(request);

    return {
      success: true,
      data: {
        checkoutUrl: response.checkout_url,
        sessionId: response.session_id,
      },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to create checkout session",
    };
  }
}

/**
 * Cancel current subscription
 * User will be downgraded to free plan at the end of current billing period
 */
export async function cancelSubscriptionAction(): Promise<
  ActionResponse<{ subscription: Subscription }>
> {
  try {
    const response = await cancelSubscription();
    const subscription: Subscription = {
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

    return {
      success: true,
      data: { subscription },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to cancel subscription",
    };
  }
}

/**
 * Reactivate a cancelled subscription
 */
export async function reactivateSubscriptionAction(): Promise<
  ActionResponse<{ subscription: Subscription }>
> {
  try {
    const response = await reactivateSubscription();
    const subscription: Subscription = {
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

    return {
      success: true,
      data: { subscription },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to reactivate subscription",
    };
  }
}

/**
 * Get all available subscription plans
 */
export async function getPlansAction(): Promise<ActionResponse<{ plans: PlanDetails[] }>> {
  try {
    const response = await getPlans();

    return {
      success: true,
      data: { plans: response.plans },
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: "Failed to fetch subscription plans",
    };
  }
}

