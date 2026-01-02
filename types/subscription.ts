// Plan Types
export enum PlanType {
  FREE = "free",
  BASIC = "basic",
  PRO = "pro",
}

// Subscription Status (Stripe billing statuses)
export enum BillingStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  PAST_DUE = "past_due",
  INCOMPLETE = "incomplete",
  INCOMPLETE_EXPIRED = "incomplete_expired",
}

// API Response format (snake_case) - from backend
export interface SubscriptionResponse {
  id: string;
  user_id: string;
  plan: PlanType;
  stripe_customer_id: string;
  stripe_subscription_id?: string | null;
  stripe_price_id?: string | null;
  current_period_start?: string | null;
  current_period_end?: string | null;
  cancel_at?: string | null;
  created_at: string;
  updated_at: string;
}

// Internal format (camelCase) for application usage
export interface Subscription {
  id: string;
  userId: string;
  plan: PlanType;
  stripeCustomerId: string;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  cancelAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Usage Statistics (matches backend API response)
export interface UsageResponse {
  user_id: string;
  message_count: number;
  limit: number | null; // null for unlimited
  remaining: number | null; // null for unlimited
  percent_used: number;
  should_reset: boolean;
  time_until_reset: number; // in seconds
  last_reset_at: string;
}

// Internal format (camelCase) for usage
export interface Usage {
  id: string;
  userId: string;
  messageCount: number;
  messagesRemaining: number;
  messagesUntilReset: number;
  resetAt: string;
  createdAt: string;
  updatedAt: string;
}

// Checkout Request
export interface CheckoutRequest {
  plan: PlanType;
  success_url?: string;
  cancel_url?: string;
}

// Checkout Response
export interface CheckoutResponse {
  checkout_url: string;
  session_id: string;
}

// Internal format (camelCase)
export interface CheckoutSession {
  checkoutUrl: string;
  sessionId: string;
}

// Plan Feature
export interface PlanFeature {
  name: string;
  description?: string;
}

// Plan Details (for UI display) - fetched from backend via Stripe API
export interface PlanDetails {
  type: PlanType;
  name: string;
  description: string;
  price: number; // In cents (e.g., 200 = €2.00)
  currency: string;
  interval: "month" | "year";
  messages_per_day: number | null; // null = unlimited
  features: PlanFeature[];
  stripe_price_id: string | null;
  stripe_product_id: string | null;
}


// Plans List Response from backend
export interface PlansListResponse {
  plans: PlanDetails[];
}


// Error Response for subscription operations
export interface SubscriptionErrorResponse {
  error: string;
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
}

// Message Limit Exceeded Error
export interface MessageLimitExceededError extends SubscriptionErrorResponse {
  messagesRemaining: number;
  messagesUntilReset: number;
  resetAt: string;
  requiredPlan: PlanType;
}

