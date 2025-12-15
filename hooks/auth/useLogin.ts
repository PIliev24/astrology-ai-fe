"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useSWRMutation from "swr/mutation";
import { loginAction } from "@/actions";
import { HOOK_KEYS } from "@/constants";
import { useRouter } from "next/navigation";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

async function loginMutation(_key: string, { arg }: { arg: { email: string; password: string } }) {
  const result = await loginAction(arg.email, arg.password);

  if (!result.success) {
    throw new Error(result.error || "Login failed. Please try again.");
  }

  return result;
}

export function useLogin() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { trigger, isMutating, error, reset } = useSWRMutation(HOOK_KEYS.LOGIN, loginMutation, {
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
    onError: (err: Error) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      console.error(errorMessage);
    },
  });

  async function handleLogin(data: LoginFormValues) {
    reset();

    try {
      await trigger({ email: data.email, password: data.password });
    } catch (err) {
      console.error(err);
    }
  }

  const clearError = () => reset();

  return {
    form,
    error: error?.message || "",
    isSubmitting: isMutating || form.formState.isSubmitting,
    handleLogin,
    clearError,
  };
}

