"use client";

import LoginForm from "@/components/auth/login-form";
import { useAuth } from "@/hooks";

export default function LoginPage() {
  const { user, isLoading } = useAuth();

  if (isLoading || user) {
    return null;
  }

  return <LoginForm />;
}
