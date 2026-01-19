"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks";

export default function CheckoutCancelPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <XCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Checkout Cancelled</CardTitle>
          <CardDescription>Your payment was not processed. No charges were made.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-foreground/70 text-center">
              You can return to settings to try again or explore our plans.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => router.push("/settings")}>
              Return to Settings
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
