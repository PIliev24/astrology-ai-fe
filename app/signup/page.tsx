"use client";

import SignupForm from "@/components/auth/signup-form";
import { useAuth } from "@/hooks";

export default function SignupPage() {
  const { user, isLoading } = useAuth();

  if (isLoading || user) {
    return null;
  }

  return <SignupForm />;
}
