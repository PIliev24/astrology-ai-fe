"use client";

import { useState } from "react";
import { useSubscription, useUsage, usePlans, useAuth } from "@/hooks";
import { SubscriptionCard } from "@/components/subscription/subscription-card";
import { UsageIndicator } from "@/components/subscription/usage-indicator";
import { CancelSubscriptionDialog } from "@/components/subscription/cancel-subscription-dialog";
import { createCheckoutSessionAction, cancelSubscriptionAction, reactivateSubscriptionAction } from "@/actions";
import { PlanType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Settings, AlertCircle, Sparkles, Crown, Zap, Star, User, Shield, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { subscription, isLoading: isLoadingSubscription, mutate: mutateSubscription } = useSubscription();
  const { usage, isLoading: isLoadingUsage, mutate: mutateUsage } = useUsage();
  const { plans, isLoading: isLoadingPlans } = usePlans();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const currentPlanDetails = plans.find((plan) => plan.type === subscription?.plan);

  const getPlanIcon = (planType: PlanType) => {
    switch (planType) {
      case PlanType.PRO:
        return Crown;
      case PlanType.BASIC:
        return Zap;
      default:
        return Sparkles;
    }
  };

  const getPlanGradient = (planType: PlanType) => {
    switch (planType) {
      case PlanType.PRO:
        return "from-[var(--celestial-gold)] to-[var(--celestial-copper)]";
      case PlanType.BASIC:
        return "from-[var(--celestial-violet)] to-[var(--celestial-teal)]";
      default:
        return "from-[var(--celestial-indigo)] to-[var(--celestial-violet)]";
    }
  };

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

  const handleReactivate = async () => {
    if (!subscription) {
      setError("No subscription found");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      if (subscription.currentPeriodEnd) {
        const periodEnd = new Date(subscription.currentPeriodEnd);
        const now = new Date();

        if (periodEnd < now) {
          const result = await createCheckoutSessionAction(subscription.plan);

          if (result.success && result.data) {
            window.location.href = result.data.checkoutUrl;
            return;
          } else {
            setError(result.error || "Failed to create checkout session");
            setIsProcessing(false);
            return;
          }
        }
      }

      const result = await reactivateSubscriptionAction();

      if (result.success) {
        await mutateSubscription();
        await mutateUsage();
      } else {
        if (result.error?.includes("period has ended") || result.error?.includes("create a new subscription")) {
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
      <div className="min-h-full bg-background relative">
        <div className="absolute inset-0 star-field-subtle opacity-20 pointer-events-none" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center zodiac-glow animate-pulse">
              <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground/70">Loading your celestial settings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription || !usage || !currentPlanDetails) {
    return (
      <div className="min-h-full bg-background relative">
        <div className="absolute inset-0 star-field-subtle opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Alert variant="destructive" className="celestial-card border-destructive/30">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-display">Connection Lost</AlertTitle>
            <AlertDescription>
              Failed to load subscription information. The stars are momentarily obscured. Please try refreshing the
              page.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background relative">
      <div className="absolute inset-0 star-field-subtle opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[var(--celestial-violet)]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center zodiac-glow">
              <Settings className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-gradient-gold">Settings</h1>
              <p className="text-foreground/70">Manage your subscription and account preferences</p>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="celestial-card border-destructive/30 animate-fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-display">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--celestial-gold)]" />
                <h2 className="font-display text-xl font-semibold text-gradient-gold">Current Subscription</h2>
              </div>
              <SubscriptionCard
                subscription={subscription}
                planDetails={currentPlanDetails}
                onUpgrade={handleUpgrade}
                onCancel={() => setShowCancelDialog(true)}
                onReactivate={handleReactivate}
                isLoading={isProcessing}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--celestial-gold)]" />
                <h2 className="font-display text-xl font-semibold text-gradient-gold">Usage Statistics</h2>
              </div>
              <UsageIndicator
                usage={usage}
                plan={subscription.plan}
                onUpgradeClick={() => {
                  const currentIndex = plans.findIndex((p) => p.type === subscription.plan);
                  const nextPlan = plans[currentIndex + 1];
                  if (nextPlan) {
                    handleUpgrade(nextPlan.type);
                  }
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--celestial-gold)]" />
                <h2 className="font-display text-xl font-semibold text-gradient-gold">Account</h2>
              </div>
              <Card className="celestial-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg">Profile Information</CardTitle>
                      <CardDescription>Your account details</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Name</label>
                      <p className="text-foreground font-medium">{user?.name || "Not set"}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Email</label>
                      <p className="text-foreground font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Shield className="h-5 w-5 text-[var(--celestial-violet)]" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Security</p>
                      <p className="text-xs text-foreground/60">Password managed via authentication provider</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-[var(--celestial-gold)]" />
              <h2 className="font-display text-xl font-semibold text-gradient-gold">Available Plans</h2>
            </div>
            <div className="space-y-4">
              {plans.map((plan) => {
                const isCurrentPlan = plan.type === subscription.plan;
                const isUpgrade =
                  (subscription.plan === PlanType.FREE && plan.type === PlanType.BASIC) ||
                  (subscription.plan === PlanType.BASIC && plan.type === PlanType.PRO);
                const isDowngrade =
                  (subscription.plan === PlanType.PRO && plan.type === PlanType.BASIC) ||
                  (subscription.plan === PlanType.BASIC && plan.type === PlanType.FREE);
                const Icon = getPlanIcon(plan.type);

                return (
                  <Card
                    key={plan.type}
                    className={cn(
                      "celestial-card transition-all duration-300 hover-lift overflow-hidden",
                      isCurrentPlan && "zodiac-border-glow"
                    )}
                  >
                    {plan.type === PlanType.PRO && (
                      <div className="absolute top-3 right-3">
                        <Badge className="gradient-gold text-primary-foreground text-xs border-0">Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                            getPlanGradient(plan.type)
                          )}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-display text-lg">{plan.name}</CardTitle>
                            {isCurrentPlan && (
                              <Badge variant="outline" className="text-xs zodiac-border">
                                Current
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">{plan.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gradient-gold">
                          {plan.price === 0 ? "Free" : `€${(plan.price / 100).toFixed(2)}`}
                        </span>
                        {plan.price > 0 && <span className="text-sm text-muted-foreground">/{plan.interval}</span>}
                      </div>

                      <ul className="space-y-2">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-[var(--celestial-gold)] shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature.name}</span>
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className="text-xs text-muted-foreground/70 pl-6">
                            +{plan.features.length - 3} more features
                          </li>
                        )}
                      </ul>

                      {!isCurrentPlan && (
                        <Button
                          className={cn(
                            "w-full",
                            isUpgrade ? "gradient-gold text-primary-foreground hover-glow" : "zodiac-border"
                          )}
                          variant={isUpgrade ? "default" : "outline"}
                          onClick={() => {
                            if (plan.type === PlanType.FREE) {
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
                            <>
                              <Zap className="mr-2 h-4 w-4" />
                              Upgrade
                            </>
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
    </div>
  );
}
