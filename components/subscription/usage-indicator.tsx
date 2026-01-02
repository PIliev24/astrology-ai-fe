"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Usage, PlanType } from "@/types";
import { MessageCircle, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageIndicatorProps {
  usage: Usage;
  plan: PlanType;
  onUpgradeClick?: () => void;
}

const planLimits = {
  [PlanType.FREE]: 1,
  [PlanType.BASIC]: 3,
  [PlanType.PRO]: Infinity,
};

export function UsageIndicator({ usage, plan, onUpgradeClick }: UsageIndicatorProps) {
  const limit = planLimits[plan];
  const remaining = usage.messagesRemaining ?? 0;
  const resetAt = usage.resetAt ? new Date(usage.resetAt) : null;

  const isLimitReached = remaining <= 0 && limit !== Infinity;
  const isWarning = remaining > 0 && remaining <= Math.ceil(limit * 0.25) && limit !== Infinity;
  const usagePercentage = limit === Infinity ? 0 : Math.min((usage.messageCount / limit) * 100, 100);

  // Calculate time until reset
  const getTimeUntilReset = () => {
    if (!resetAt) return null;
    const now = new Date();
    const diff = resetAt.getTime() - now.getTime();

    if (diff <= 0) return "Reset soon";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-linear-to-br from-blue-500 to-cyan-500" />

      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-lg bg-blue-500/10">
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Message Usage</CardTitle>
              <CardDescription>Daily message allocation</CardDescription>
            </div>
          </div>
          {limit === Infinity ? (
            <Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white">
              Unlimited
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className={cn(
                "font-semibold transition-colors",
                isLimitReached
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : isWarning
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              )}
            >
              {remaining} left
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Progress bar - only show for non-unlimited plans */}
        {limit !== Infinity && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {usage.messageCount} / {limit} used
              </span>
              <span className="text-xs text-muted-foreground">{Math.round(usagePercentage)}%</span>
            </div>
            <Progress
              value={usagePercentage}
              className={cn(
                "h-2.5 rounded-full",
                isLimitReached && "bg-red-100 dark:bg-red-900/30",
                isWarning && "bg-yellow-100 dark:bg-yellow-900/30"
              )}
              indicatorClassName={cn(
                "transition-all duration-300 rounded-full",
                isLimitReached
                  ? "bg-linear-to-r from-red-500 to-red-600"
                  : isWarning
                    ? "bg-linear-to-r from-yellow-500 to-orange-500"
                    : "bg-linear-to-r from-blue-500 to-cyan-500"
              )}
            />
          </div>
        )}

        {/* Unlimited plan message */}
        {limit === Infinity && (
          <div className="flex items-center gap-3 py-4 px-3 rounded-lg bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800">
            <CheckCircle className="h-5 w-5 text-purple-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                Unlimited Messages
              </p>
              <p className="text-xs text-purple-600/70 dark:text-purple-400/70">
                No daily limits on your account
              </p>
            </div>
          </div>
        )}

        {/* Reset time and status info */}
        {limit !== Infinity && (
          <div className="space-y-3 pt-2 border-t border-muted">
            {/* Reset timer */}
            {resetAt && !isLimitReached && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Resets in</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{getTimeUntilReset()}</span>
              </div>
            )}

            {/* Limit reached warning */}
            {isLimitReached && (
              <div className="flex items-start gap-3 py-3 px-3 rounded-lg bg-red-500/10 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                    Daily limit reached
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                    You&apos;ve used all your messages for today. Come back {getTimeUntilReset()}.
                  </p>
                </div>
              </div>
            )}

            {/* Low usage warning */}
            {isWarning && !isLimitReached && (
              <div className="flex items-start gap-3 py-3 px-3 rounded-lg bg-yellow-500/10 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                    Running low on messages
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                    Only {remaining} message{remaining !== 1 ? "s" : ""} remaining today.
                  </p>
                </div>
              </div>
            )}

            {/* Upgrade suggestion for free/basic users */}
            {plan !== PlanType.PRO && limit !== Infinity && (
              <div className="pt-2 border-t border-muted">
                <button
                  onClick={onUpgradeClick}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "bg-blue-500/10 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
                    "hover:bg-blue-500/20 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800",
                    "hover:shadow-sm hover:-translate-y-0.5"
                  )}
                >
                  ✨ Upgrade to get more messages
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

