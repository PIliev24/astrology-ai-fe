"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlanType } from "@/types";
import { usePlans } from "@/hooks";
import { Check, Sparkles, Zap, Crown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
  isLoading?: boolean;
}

const planIcons = {
  [PlanType.FREE]: <Sparkles className="h-5 w-5" />,
  [PlanType.BASIC]: <Zap className="h-5 w-5" />,
  [PlanType.PRO]: <Crown className="h-5 w-5" />,
};

const planColors = {
  [PlanType.FREE]: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    hover: "hover:border-blue-500/50 hover:bg-blue-500/5",
  },
  [PlanType.BASIC]: {
    bg: "bg-celestial-gold/10",
    border: "border-celestial-gold/30",
    text: "text-celestial-gold",
    hover: "hover:border-celestial-gold/50 hover:bg-celestial-gold/5",
  },
  [PlanType.PRO]: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    hover: "hover:border-purple-500/50 hover:bg-purple-500/5",
  },
};

export function UpgradePlanDialog({
  open,
  onOpenChange,
  currentPlan,
  onSelectPlan,
  isLoading = false,
}: UpgradePlanDialogProps) {
  const { plans, isLoading: isLoadingPlans } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  // Filter out FREE plan and current plan to show only upgradable plans
  const upgradablePlans = plans.filter(plan => {
    if (plan.type === PlanType.FREE) return false;
    if (currentPlan === PlanType.BASIC && plan.type === PlanType.BASIC) return false;
    return true;
  });

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    onSelectPlan(plan);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="oracle-glass sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-celestial-gold" />
            <DialogTitle className="font-display text-gradient-gold">Choose Your Plan</DialogTitle>
          </div>
          <DialogDescription>Unlock more cosmic insights with an upgraded plan</DialogDescription>
        </DialogHeader>

        {isLoadingPlans ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-celestial-gold" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            {upgradablePlans.map(plan => {
              const colors = planColors[plan.type];
              const isSelected = selectedPlan === plan.type;
              const isPro = plan.type === PlanType.PRO;

              return (
                <div
                  key={plan.type}
                  className={cn(
                    "relative rounded-xl border-2 p-4 transition-all cursor-pointer",
                    colors.border,
                    colors.hover,
                    isSelected && "ring-2 ring-celestial-gold/50"
                  )}
                  onClick={() => !isLoading && handleSelectPlan(plan.type)}
                >
                  {isPro && (
                    <Badge className="absolute -top-2 right-4 bg-purple-500 text-white border-0">Popular</Badge>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-lg", colors.bg)}>
                        <div className={colors.text}>{planIcons[plan.type]}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold text-foreground">{formatPrice(plan.price, plan.currency)}</p>
                      <p className="text-xs text-muted-foreground">/{plan.interval}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className={cn("h-4 w-4 shrink-0", colors.text)} />
                        <span className="text-foreground/80">{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={cn(
                      "w-full mt-4 transition-all",
                      isPro ? "bg-purple-500 hover:bg-purple-600 text-white" : "gradient-gold text-primary-foreground"
                    )}
                    disabled={isLoading && selectedPlan === plan.type}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectPlan(plan.type);
                    }}
                  >
                    {isLoading && selectedPlan === plan.type ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
