"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, AlertCircle, Sparkles, Zap } from "lucide-react";
import { ChartSelector } from "./chart-selector";
import { BirthChartResponse, PlanType } from "@/types";
import { cn } from "@/lib/utils";
import { useSubscription, useUsage } from "@/hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createCheckoutSessionAction } from "@/actions";
import { UpgradePlanDialog } from "@/components/subscription/upgrade-plan-dialog";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  charts: BirthChartResponse[];
  selectedChartIds: string[];
  onToggleChart: (chartId: string) => void;
  isConnected: boolean;
  isLoading?: boolean;
}

const MAX_LENGTH = 2000;

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
  const [input, setInput] = useState("");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { subscription, isLoading: isLoadingSubscription } = useSubscription();
  const { usage, isLoading: isLoadingUsage } = useUsage();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const plan = subscription?.plan || PlanType.FREE;
  const limit = usage?.message_limit ?? PLAN_LIMITS[plan];
  const remaining = usage?.messages_remaining ?? (limit === null || limit === Infinity ? null : limit);
  const messageCount = usage?.message_count ?? 0;
  const isLimitReached = limit !== null && limit !== Infinity && (remaining === null || remaining <= 0);
  const isWarning =
    limit !== null && limit !== Infinity && remaining !== null && remaining > 0 && remaining <= Math.ceil(limit * 0.25);
  const canSendMessage = limit === null || limit === Infinity || (remaining !== null && remaining > 0);

  const hoursUntilReset = usage?.reset_at ? Math.ceil((new Date(usage.reset_at).getTime() - Date.now()) / 3600000) : 0;

  const handleUpgrade = () => {
    setShowUpgradeDialog(true);
  };

  const handlePlanSelected = async (selectedPlan: PlanType) => {
    setIsUpgrading(true);
    try {
      const result = await createCheckoutSessionAction(selectedPlan);
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

  if (isLoadingSubscription || isLoadingUsage) {
    return (
      <div className="space-y-3">
        <div className="h-[60px] bg-muted/50 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Chart selector */}
      {charts.length > 0 && (
        <ChartSelector charts={charts} selectedChartIds={selectedChartIds} onToggleChart={onToggleChart} />
      )}

      {/* Limit reached alert */}
      {isLimitReached && (
        <Alert className="border-destructive/30 bg-destructive/5">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span className="text-destructive">
              Daily limit reached ({messageCount}/{limit}). Resets in {hoursUntilReset} hour
              {hoursUntilReset !== 1 ? "s" : ""}.
            </span>
            <Button
              size="sm"
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="shrink-0 gradient-gold text-primary-foreground"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="h-3 w-3 mr-2" />
                  Upgrade
                </>
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Warning alert (low remaining) */}
      {isWarning && !isLimitReached && (
        <Alert className="border-[var(--celestial-gold)]/30 bg-[var(--celestial-gold)]/5">
          <Sparkles className="h-4 w-4 text-(--celestial-gold)" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span className="text-(--celestial-gold)">
              {remaining} message{remaining !== 1 ? "s" : ""} remaining today.
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="shrink-0 border-[var(--celestial-gold)]/30 text-(--celestial-gold) hover:bg-[var(--celestial-gold)]/10"
            >
              {isUpgrading ? "Processing..." : "Upgrade"}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Usage indicator */}
      {limit !== null && limit !== Infinity && !isLimitReached && remaining !== null && (
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-muted-foreground">
            {remaining} of {limit} message{remaining !== 1 ? "s" : ""} remaining
          </span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isWarning ? "bg-[var(--celestial-gold)]" : "gradient-gold"
                )}
                style={{ width: `${Math.max(0, Math.min(100, (remaining / limit) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
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
              ? "Connecting to the cosmos..."
              : isLimitReached
                ? "Daily limit reached. Upgrade to continue..."
                : "Ask the stars for guidance..."
          }
          disabled={!isConnected || isLoading || isLimitReached}
          className={cn(
            "min-h-[60px] w-full resize-none rounded-xl px-4 py-3.5 pr-14",
            "bg-card/50 backdrop-blur-soft border-2 border-border/50",
            "focus-visible:ring-2 focus-visible:ring-[var(--celestial-gold)]/30 focus-visible:ring-offset-0",
            "focus-visible:border-[var(--celestial-gold)]/50",
            "placeholder:text-muted-foreground/60",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isLimitReached && "border-destructive/30",
            "transition-all duration-200"
          )}
          rows={1}
        />

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={!canSend}
          size="icon"
          className={cn(
            "absolute bottom-2.5 right-2.5 h-9 w-9 rounded-lg",
            canSend ? "gradient-gold text-primary-foreground hover-glow" : "bg-muted text-muted-foreground",
            "transition-all duration-200",
            canSend && "hover:scale-105 active:scale-95"
          )}
          aria-label="Send message"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>

        {/* Input glow effect when focused */}
        <div className="absolute inset-0 rounded-xl bg-[var(--celestial-gold)]/5 opacity-0 pointer-events-none peer-focus:opacity-100 transition-opacity" />
      </div>

      {/* Helper text */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Enter</kbd>
          <span>to send</span>
          <span className="text-border">|</span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Shift+Enter</kbd>
          <span>for new line</span>
        </span>
        <span className={cn(input.length > MAX_LENGTH * 0.9 && "text-(--celestial-gold)")}>
          {input.length} / {MAX_LENGTH}
        </span>
      </div>

      {/* Upgrade Plan Dialog */}
      <UpgradePlanDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        currentPlan={plan}
        onSelectPlan={handlePlanSelected}
        isLoading={isUpgrading}
      />
    </div>
  );
}
