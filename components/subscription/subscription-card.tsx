"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subscription, PlanType, PlanDetails } from "@/types";
import { Check, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionCardProps {
  subscription: Subscription;
  planDetails: PlanDetails;
  onUpgrade?: (plan: PlanType) => void;
  onCancel?: () => void;
  onReactivate?: () => void;
  isLoading?: boolean;
}

const planColorMap = {
  [PlanType.FREE]: {
    icon: "✨",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-200 dark:border-blue-800",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  [PlanType.BASIC]: {
    icon: <Zap className="h-5 w-5" />,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-200 dark:border-amber-800",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  [PlanType.PRO]: {
    icon: <Crown className="h-5 w-5" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-200 dark:border-purple-800",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
};

export function SubscriptionCard({
  subscription,
  planDetails,
  onUpgrade,
  onCancel,
  onReactivate,
  isLoading = false,
}: SubscriptionCardProps) {
  const plan = subscription.plan;
  
  // Explicitly check isActive - default to true for free plan, false for paid plans if not set
  const isActive = subscription?.isActive ?? (plan === PlanType.FREE ? true : false);
  
  // Determine subscription state based on isActive and current_period_end
  const hasFuturePeriodEnd = subscription.currentPeriodEnd 
    ? new Date(subscription.currentPeriodEnd) > new Date()
    : false;
  
  // Case 1: isActive = true, current_period_end = future date (cancelled but still active)
  const isCancelledButActive = isActive && hasFuturePeriodEnd;
  
  // Case 2: isActive = true, current_period_end = null (fully active)
  const isFullyActive = isActive && !subscription.currentPeriodEnd;
  
  // Case 3: isActive = false (inactive - show as free tier)
  const isInactive = !isActive;
  
  // For inactive subscriptions, treat as FREE plan for UI purposes
  const displayPlan = isInactive ? PlanType.FREE : plan;
  const colorConfig = planColorMap[displayPlan];
  
  // Determine which buttons to show
  const canCancel = plan !== PlanType.FREE && isFullyActive; // Only show cancel when fully active
  const canRestore = plan !== PlanType.FREE && isCancelledButActive; // Show restore when cancelled but active
  const canUpgradeDowngrade = isActive; // Show upgrade/downgrade when active (both cases)

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg border-2",
        colorConfig.borderColor,
        "animate-fade-in"
      )}
    >
      {/* Background gradient accent */}
      <div className={cn("absolute inset-0 opacity-5 pointer-events-none", colorConfig.bgColor)} />

      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-lg", colorConfig.bgColor)}>
              {typeof colorConfig.icon === "string" ? (
                <span className="text-xl">{colorConfig.icon}</span>
              ) : (
                <div className={colorConfig.color}>{colorConfig.icon}</div>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">{planDetails.name}</CardTitle>
              <CardDescription className="text-sm">{planDetails.description}</CardDescription>
            </div>
          </div>
          {isCancelledButActive && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Cancelled
            </Badge>
          )}
          {isInactive && plan !== PlanType.FREE && (
            <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Inactive
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Plan Status Info */}
        {displayPlan !== PlanType.FREE && (
          <div className="space-y-3 pt-2 border-t border-muted">
            {subscription.currentPeriodEnd && (
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {isCancelledButActive ? "Active Until" : isInactive ? "Period Ended" : "Active Until"}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {isCancelledButActive && (
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subscription cancelled</span>
                    <span className="text-amber-600 dark:text-amber-400">
                      Expires on period end
                    </span>
                  </div>
                )}
                {isInactive && (
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subscription inactive</span>
                    <span className="text-red-600 dark:text-red-400">
                      {new Date(subscription.currentPeriodEnd) < new Date() ? "Expired" : "Expires on period end"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Features List */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Features
          </p>
          <ul className="space-y-2.5">
            {planDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                <Check className={cn("h-4 w-4 shrink-0", colorConfig.color)} />
                <span className="text-foreground">{feature.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t border-muted">
          {/* Case 3: isActive = false - Show free tier UI */}
          {displayPlan === PlanType.FREE && (
            <Button
              className={cn(
                "w-full font-semibold transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-0.5"
              )}
              onClick={() => onUpgrade?.(PlanType.BASIC)}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Upgrade to Basic"}
            </Button>
          )}

          {/* Case 1 & 2: isActive = true - Show upgrade/downgrade and restore/cancel buttons */}
          {displayPlan === PlanType.BASIC && (
            <>
              {canUpgradeDowngrade && (
                <Button
                  className={cn(
                    "w-full font-semibold transition-all duration-300",
                    "hover:shadow-lg hover:-translate-y-0.5"
                  )}
                  onClick={() => onUpgrade?.(PlanType.PRO)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Upgrade to Pro"}
                </Button>
              )}
              {canRestore && (
                <Button
                  className="w-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  onClick={onReactivate}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Restore Subscription"}
                </Button>
              )}
              {canCancel && (
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Cancel Subscription"}
                </Button>
              )}
            </>
          )}

          {displayPlan === PlanType.PRO && (
            <div className="space-y-2">
              {isFullyActive && (
                <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-linear-to-r from-purple-500/10 to-pink-500/10">
                  <Crown className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    Premium Active
                  </span>
                </div>
              )}
              {canUpgradeDowngrade && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onUpgrade?.(PlanType.BASIC)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Downgrade to Basic"}
                </Button>
              )}
              {canRestore && (
                <Button
                  className="w-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  onClick={onReactivate}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Restore Subscription"}
                </Button>
              )}
              {canCancel && (
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Cancel Subscription"}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

