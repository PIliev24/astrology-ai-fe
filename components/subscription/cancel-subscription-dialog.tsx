"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Subscription } from "@/types";

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: Subscription;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  subscription,
  onConfirm,
  isLoading = false,
}: CancelSubscriptionDialogProps) {
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setError(null);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel subscription");
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const periodEndDate = formatDate(subscription.currentPeriodEnd);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Cancel Subscription
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to cancel your subscription? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">What happens when you cancel:</p>
            <ul className="mt-2 space-y-1 text-sm text-amber-800 dark:text-amber-200">
              <li>
                • You&apos;ll keep access to all features until {periodEndDate || "the end of your billing period"}
              </li>
              <li>• After that, you&apos;ll be downgraded to the free plan</li>
              <li>• You&apos;ll lose access to premium features</li>
              <li>• Your chat history will be preserved</li>
            </ul>
          </div>

          {subscription.currentPeriodEnd && (
            <p className="text-sm text-muted-foreground">
              Your subscription will remain active until <span className="font-medium">{periodEndDate}</span>. After
              that date, you&apos;ll be moved to the free plan.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Keep Subscription
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Canceling...
              </>
            ) : (
              "Cancel Subscription"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
