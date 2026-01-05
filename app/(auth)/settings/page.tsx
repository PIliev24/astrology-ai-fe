"use client";

import { useState } from "react";
import { useSubscription, useUsage, usePlans } from "@/hooks";
import { SubscriptionCard } from "@/components/subscription/subscription-card";
import { UsageIndicator } from "@/components/subscription/usage-indicator";
import { CancelSubscriptionDialog } from "@/components/subscription/cancel-subscription-dialog";
import { createCheckoutSessionAction, cancelSubscriptionAction, reactivateSubscriptionAction } from "@/actions";
import { PlanType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Settings, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { subscription, isLoading: isLoadingSubscription, mutate: mutateSubscription } = useSubscription();
  const { usage, isLoading: isLoadingUsage, mutate: mutateUsage } = useUsage();
  const { plans, isLoading: isLoadingPlans } = usePlans();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Get current plan details
  const currentPlanDetails = plans.find(plan => plan.type === subscription?.plan);

  // Handle upgrade/downgrade
  const handleUpgrade = async (plan: PlanType) => {
    if (plan === PlanType.FREE) {
      setError("Cannot upgrade to free tier. Please cancel your subscription instead.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await createCheckoutSessionAction(plan);

      if (result.success && result.data) {
        // Redirect to Stripe checkout
        window.location.href = result.data.checkoutUrl;
      } else {
        setError(result.error || "Failed to create checkout session");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle cancel subscription
  const handleCancel = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await cancelSubscriptionAction();

      if (result.success) {
        await mutateSubscription();
        await mutateUsage();
        setShowCancelDialog(false);
      } else {
        setError(result.error || "Failed to cancel subscription");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle reactivate/restore subscription
  const handleReactivate = async () => {
    if (!subscription) {
      setError("No subscription found");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Check if subscription period has ended
      if (subscription.currentPeriodEnd) {
        const periodEnd = new Date(subscription.currentPeriodEnd);
        const now = new Date();
        
        if (periodEnd < now) {
          // Period has ended - redirect to checkout for new subscription
          const result = await createCheckoutSessionAction(subscription.plan);
          
          if (result.success && result.data) {
            // Redirect to Stripe checkout
            window.location.href = result.data.checkoutUrl;
            return;
          } else {
            setError(result.error || "Failed to create checkout session");
            setIsProcessing(false);
            return;
          }
        }
      }

      // Period hasn't ended or no period end - restore/reactivate normally
      // This will clear current_period_end and keep isActive = true
      const result = await reactivateSubscriptionAction();

      if (result.success) {
        await mutateSubscription();
        await mutateUsage();
      } else {
        // Check if error indicates payment is required
        if (result.error?.includes("period has ended") || result.error?.includes("create a new subscription")) {
          // Redirect to checkout
          const checkoutResult = await createCheckoutSessionAction(subscription.plan);
          
          if (checkoutResult.success && checkoutResult.data) {
            window.location.href = checkoutResult.data.checkoutUrl;
            return;
          } else {
            setError(checkoutResult.error || "Failed to create checkout session");
          }
        } else {
          setError(result.error || "Failed to restore subscription");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoadingSubscription || isLoadingUsage || isLoadingPlans) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading subscription settings...</p>
        </div>
      </div>
    );
  }

  if (!subscription || !usage || !currentPlanDetails) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load subscription information. Please try refreshing the page.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground">Manage your subscription and account preferences</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Current Subscription & Usage */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Subscription */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Current Subscription</h2>
            <SubscriptionCard
              subscription={subscription}
              planDetails={currentPlanDetails}
              onUpgrade={handleUpgrade}
              onCancel={() => setShowCancelDialog(true)}
              onReactivate={handleReactivate}
              isLoading={isProcessing}
            />
          </div>

          {/* Usage Statistics */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Usage Statistics</h2>
            <UsageIndicator
              usage={usage}
              plan={subscription.plan}
              onUpgradeClick={() => {
                // Find next tier to upgrade to
                const currentIndex = plans.findIndex(p => p.type === subscription.plan);
                const nextPlan = plans[currentIndex + 1];
                if (nextPlan) {
                  handleUpgrade(nextPlan.type);
                }
              }}
            />
          </div>
        </div>

        {/* Right Column: All Plans Comparison */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Plans</h2>
          <div className="space-y-4">
            {plans.map(plan => {
              const isCurrentPlan = plan.type === subscription.plan;
              const isUpgrade =
                (subscription.plan === PlanType.FREE && plan.type === PlanType.BASIC) ||
                (subscription.plan === PlanType.BASIC && plan.type === PlanType.PRO);
              const isDowngrade =
                (subscription.plan === PlanType.PRO && plan.type === PlanType.BASIC) ||
                (subscription.plan === PlanType.BASIC && plan.type === PlanType.FREE);

              return (
                <Card
                  key={plan.type}
                  className={cn("transition-all duration-300", isCurrentPlan && "ring-2 ring-primary")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {isCurrentPlan && (
                        <Button variant="outline" size="sm" disabled>
                          Current Plan
                        </Button>
                      )}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        {plan.price === 0 ? "Free" : `€${(plan.price / 100).toFixed(2)}`}
                      </span>
                      {plan.price > 0 && <span className="text-sm text-muted-foreground">/{plan.interval}</span>}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{feature.name}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    {!isCurrentPlan && (
                      <Button
                        className="w-full"
                        variant={isUpgrade ? "default" : "outline"}
                        onClick={() => {
                          if (plan.type === PlanType.FREE) {
                            // For downgrade to free, show cancel dialog
                            setShowCancelDialog(true);
                          } else {
                            handleUpgrade(plan.type);
                          }
                        }}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : isUpgrade ? (
                          "Upgrade"
                        ) : isDowngrade ? (
                          "Downgrade"
                        ) : (
                          "Select Plan"
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cancel Subscription Dialog */}
      {subscription && (
        <CancelSubscriptionDialog
          open={showCancelDialog}
          onOpenChange={setShowCancelDialog}
          subscription={subscription}
          onConfirm={handleCancel}
          isLoading={isProcessing}
        />
      )}
    </div>
  );
}
