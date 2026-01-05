"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubscription, useUsage } from "@/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, isLoading: isLoadingAuth } = useAuth();
  const { subscription, mutate: mutateSubscription, isLoading: isLoadingSubscription } = useSubscription();
  const { mutate: mutateUsage } = useUsage();
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedPollingRef = useRef(false);

  // Check if subscription has been activated (webhook processed)
  useEffect(() => {
    if (subscription?.stripeSubscriptionId && isVerifying) {
      setIsVerifying(false);
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
      }
    }
  }, [subscription?.stripeSubscriptionId, isVerifying]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoadingAuth && !user) {
      router.push("/login");
      return;
    }

    // If no session_id, show error
    if (!sessionId) {
      setError("No checkout session found. Please try again.");
      setIsVerifying(false);
      return;
    }

    // Poll subscription to wait for webhook processing
    if (user && sessionId && !isLoadingSubscription && !hasStartedPollingRef.current) {
      hasStartedPollingRef.current = true;
      
      // Refresh subscription data immediately
      mutateSubscription();
      mutateUsage();

      // Poll for up to 8 seconds
      let attempts = 0;
      const maxAttempts = 8;

      const pollSubscription = async () => {
        attempts++;
        await mutateSubscription();
        await mutateUsage();

        // Stop polling after max attempts (webhook might be delayed)
        if (attempts >= maxAttempts) {
          setIsVerifying(false);
          return;
        }

        // Continue polling if still verifying
        if (isVerifying) {
          pollingRef.current = setTimeout(pollSubscription, 1000);
        }
      };

      // Start polling after 1 second delay
      pollingRef.current = setTimeout(pollSubscription, 1000);
    }

    return () => {
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
      }
    };
  }, [user, isLoadingAuth, sessionId, isLoadingSubscription, mutateSubscription, mutateUsage, router, isVerifying]);

  // Countdown timer for redirect
  useEffect(() => {
    if (!isVerifying && !error) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/settings");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVerifying, error, router]);

  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isVerifying ? (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <CardTitle className="text-2xl">Processing Payment</CardTitle>
              <CardDescription>Please wait while we confirm your subscription...</CardDescription>
            </>
          ) : error ? (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Payment Error</CardTitle>
              <CardDescription>{error}</CardDescription>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>Your subscription has been activated successfully.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button className="w-full" onClick={() => router.push("/settings")}>
                Go to Settings
              </Button>
            </>
          ) : !isVerifying ? (
            <>
              <div className="rounded-lg bg-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Redirecting to settings in {redirectCountdown} seconds...
                </p>
              </div>
              <Button className="w-full" onClick={() => router.push("/settings")}>
                Go to Settings Now
              </Button>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

