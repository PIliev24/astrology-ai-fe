"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { ChartSelector } from "./chart-selector";
import { BirthChartResponse, PlanType } from "@/types";
import { cn } from "@/lib/utils";
import { useSubscription, useUsage } from "@/hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { createCheckoutSessionAction } from "@/actions";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  charts: BirthChartResponse[];
  selectedChartIds: string[];
  onToggleChart: (chartId: string) => void;
  isConnected: boolean;
  isLoading?: boolean;
}

const MAX_LENGTH = 2000;

// Plan limits mapping
const PLAN_LIMITS: Record<PlanType, number> = {
  [PlanType.FREE]: 1,
  [PlanType.BASIC]: 3,
  [PlanType.PRO]: Infinity,
};

export function ChatInput({
  onSendMessage,
  charts,
  selectedChartIds,
  onToggleChart,
  isConnected,
  isLoading = false,
}: ChatInputProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { subscription, isLoading: isLoadingSubscription } = useSubscription();
  const { usage, isLoading: isLoadingUsage } = useUsage();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Calculate usage stats  
  const plan = subscription?.plan || PlanType.FREE;
  const limit = usage?.message_limit ?? PLAN_LIMITS[plan];
  const remaining = usage?.messages_remaining ?? (limit === null || limit === Infinity ? null : limit);
  const messageCount = usage?.message_count ?? 0;
  const isLimitReached = limit !== null && limit !== Infinity && (remaining === null || remaining <= 0);
  const isWarning = limit !== null && limit !== Infinity && remaining !== null && remaining > 0 && remaining <= Math.ceil(limit * 0.25);
  const canSendMessage = limit === null || limit === Infinity || (remaining !== null && remaining > 0);
  
  // Calculate hours until reset
  const hoursUntilReset = usage?.reset_at 
    ? Math.ceil((new Date(usage.reset_at).getTime() - Date.now()) / 3600000)
    : 0;

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      // Determine next tier
      const nextPlan = plan === PlanType.FREE ? PlanType.BASIC : PlanType.PRO;
      const result = await createCheckoutSessionAction(nextPlan);
      if (result.success && result.data) {
        window.location.href = result.data.checkoutUrl;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || !isConnected || isLoading || !canSendMessage) return;

    onSendMessage(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSendMessage) {
        handleSend();
      }
    }
  };

  const canSend = input.trim().length > 0 && isConnected && !isLoading && canSendMessage;

  // Show loading state while fetching subscription/usage
  if (isLoadingSubscription || isLoadingUsage) {
    return (
      <div className="space-y-3">
        <div className="h-[60px] bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {charts.length > 0 && (
        <ChartSelector charts={charts} selectedChartIds={selectedChartIds} onToggleChart={onToggleChart} />
      )}

      {/* Usage Limit Warning/Error */}
      {isLimitReached && (
        <Alert variant="destructive" className="border-destructive/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>
              Daily message limit reached ({messageCount}/{limit}). Reset in{" "}
              {hoursUntilReset} hour{hoursUntilReset !== 1 ? "s" : ""}.
            </span>
            <Button 
              size="sm"
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="shrink-0"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3 mr-2" />
                  Upgrade
                </>
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Usage Warning (low remaining) */}
      {isWarning && !isLimitReached && (
        <Alert variant="default" className="border-yellow-500/50 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span className="text-yellow-800 dark:text-yellow-200">
              {remaining} message{remaining !== 1 ? "s" : ""} remaining today. Consider upgrading for more.
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="shrink-0 border-yellow-500/50 hover:bg-yellow-500/20"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Upgrade"
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Usage Indicator (for non-unlimited plans) */}
      {limit !== null && limit !== Infinity && !isLimitReached && remaining !== null && (
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-muted-foreground">
            {remaining} of {limit} message{remaining !== 1 ? "s" : ""} remaining today
          </span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all",
                  isWarning ? "bg-yellow-500" : "bg-primary"
                )}
                style={{ width: `${Math.max(0, Math.min(100, (remaining / limit) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={e => {
            if (e.target.value.length <= MAX_LENGTH) {
              setInput(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            !isConnected
              ? "Connecting..."
              : isLimitReached
                ? "Daily limit reached. Upgrade to continue..."
                : "Ask about your astrological insights..."
          }
          disabled={!isConnected || isLoading || isLimitReached}
          className={cn(
            "min-h-[60px] w-full resize-none rounded-xl border-2 px-4 py-3 pr-16",
            "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isLimitReached && "border-destructive/50",
            "transition-all"
          )}
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!canSend}
          size="icon"
          className={cn(
            "absolute bottom-3 right-3 h-8 w-8",
            "transition-all",
            canSend && "hover:scale-105 active:scale-95",
            "focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-label="Send message"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className={cn(input.length > MAX_LENGTH * 0.9 && "text-destructive")}>
          {input.length} / {MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
