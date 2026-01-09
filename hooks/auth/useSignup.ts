"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useSWRMutation from "swr/mutation";
import { signupAction } from "@/actions";
import { HOOK_KEYS } from "@/constants";
import { useRouter } from "next/navigation";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

async function signupMutation(_key: string, { arg }: { arg: { email: string; password: string; name?: string } }) {
  const result = await signupAction(arg.email, arg.password, arg.name);

  if (!result.success) {
    throw new Error(result.error || "Signup failed. Please try again.");
  }

  return result;
}

export function useSignup() {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { trigger, isMutating, error, reset } = useSWRMutation(HOOK_KEYS.SIGNUP, signupMutation, {
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (err: Error) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      console.error(errorMessage);
    },
  });

  async function handleSignup(data: SignupFormValues) {
    reset();

    try {
      await trigger({ email: data.email, password: data.password, name: data.name });
    } catch (err) {
      console.error(err);
    }
  }

  const clearError = () => reset();

  return {
    form,
    error: error?.message || "",
    isSubmitting: isMutating || form.formState.isSubmitting,
    handleSignup,
    clearError,
  };
}
