"use client";

/**
 * Factory for creating form + mutation hooks
 * Combines react-hook-form, Zod validation, and SWR mutations
 */

import { useForm, UseFormReturn, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { z } from "zod";

export interface FormMutationOptions<TSchema extends z.ZodType, TResponse> {
  /** Zod schema for form validation */
  schema: TSchema;
  /** Default values for the form */
  defaultValues: DefaultValues<z.infer<TSchema>>;
  /** Unique key for SWR mutation cache */
  mutationKey: string;
  /** Function that performs the mutation */
  mutationFn: (data: z.infer<TSchema>) => Promise<TResponse>;
  /** Callback on successful mutation */
  onSuccess?: (data: TResponse, formData: z.infer<TSchema>) => void;
  /** Callback on mutation error */
  onError?: (error: Error, formData: z.infer<TSchema>) => void;
  /** Toast message to show on success */
  successMessage?: string | ((data: TResponse) => string);
  /** Toast message to show on error */
  errorMessage?: string | ((error: Error) => string);
  /** Cache keys to invalidate on success */
  invalidateKeys?: string[];
  /** Whether to reset form on success (default: false) */
  resetOnSuccess?: boolean;
}

export interface FormMutationResult<TSchema extends z.ZodType, TResponse> {
  /** React Hook Form instance */
  form: UseFormReturn<z.infer<TSchema>>;
  /** Submit handler to use with form onSubmit */
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  /** Whether mutation is in progress */
  isSubmitting: boolean;
  /** Whether form is currently validating */
  isValidating: boolean;
  /** Last response data from successful mutation */
  data: TResponse | undefined;
  /** Error from last mutation attempt */
  error: Error | undefined;
  /** Error message string (from error.message or custom) */
  errorMessage: string;
  /** Reset the mutation state */
  reset: () => void;
  /** Clear both form and mutation state */
  clearAll: () => void;
}

/**
 * Create a form + mutation hook that combines react-hook-form, Zod, and SWR
 *
 * @example
 * ```ts
 * const loginSchema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(1),
 * });
 *
 * const useLoginForm = createFormMutation({
 *   schema: loginSchema,
 *   defaultValues: { email: "", password: "" },
 *   mutationKey: "login",
 *   mutationFn: (data) => authService.login(data),
 *   successMessage: "Successfully logged in",
 *   onSuccess: () => router.push("/dashboard"),
 * });
 *
 * // Usage in component
 * const { form, handleSubmit, isSubmitting, errorMessage } = useLoginForm();
 *
 * <form onSubmit={handleSubmit}>
 *   <Input {...form.register("email")} />
 *   <Input {...form.register("password")} />
 *   {errorMessage && <p>{errorMessage}</p>}
 *   <Button type="submit" disabled={isSubmitting}>Login</Button>
 * </form>
 * ```
 */
export function createFormMutation<TSchema extends z.ZodType, TResponse>(
  options: FormMutationOptions<TSchema, TResponse>
) {
  type TFormData = z.infer<TSchema>;

  return function useFormMutation(
    hookOptions?: Partial<Omit<FormMutationOptions<TSchema, TResponse>, "schema" | "defaultValues" | "mutationKey" | "mutationFn">>
  ): FormMutationResult<TSchema, TResponse> {
    const { mutate: globalMutate } = useSWRConfig();
    const mergedOptions = { ...options, ...hookOptions };

    // Initialize form with Zod resolver
    const form = useForm<TFormData>({
      resolver: zodResolver(options.schema),
      defaultValues: options.defaultValues,
    });

    // Setup mutation
    const { trigger, data, error, isMutating, reset } = useSWRMutation<
      TResponse,
      Error,
      string,
      TFormData
    >(
      options.mutationKey,
      (_key, { arg }) => options.mutationFn(arg),
      {
        throwOnError: false,
        onSuccess: (responseData: TResponse, _key: string, config: { arg: TFormData }) => {
          // Show success toast
          if (mergedOptions.successMessage) {
            const message =
              typeof mergedOptions.successMessage === "function"
                ? mergedOptions.successMessage(responseData)
                : mergedOptions.successMessage;
            toast.success(message);
          }

          // Invalidate cache keys
          if (mergedOptions.invalidateKeys) {
            mergedOptions.invalidateKeys.forEach((cacheKey) => {
              globalMutate(cacheKey);
            });
          }

          // Reset form if configured
          if (mergedOptions.resetOnSuccess) {
            form.reset();
          }

          // Call custom onSuccess
          mergedOptions.onSuccess?.(responseData, config.arg);
        },
        onError: (err: Error, _key: string, config: { arg: TFormData }) => {
          // Show error toast
          const message =
            typeof mergedOptions.errorMessage === "function"
              ? mergedOptions.errorMessage(err)
              : mergedOptions.errorMessage || err.message || "An error occurred";
          toast.error(message);

          // Call custom onError
          mergedOptions.onError?.(err, config.arg);
        },
      }
    );

    // Handle form submission
    const handleSubmit = form.handleSubmit(async (formData: TFormData) => {
      reset(); // Clear previous errors
      try {
        await trigger(formData);
      } catch {
        // Error is handled by onError callback
      }
    });

    // Clear all state
    const clearAll = () => {
      form.reset();
      reset();
    };

    return {
      form,
      handleSubmit,
      isSubmitting: isMutating || form.formState.isSubmitting,
      isValidating: form.formState.isValidating,
      data,
      error,
      errorMessage: error?.message || "",
      reset,
      clearAll,
    };
  };
}

/**
 * Options for creating an inline form mutation (without pre-configuration)
 */
export interface InlineFormMutationOptions<TSchema extends z.ZodType, TResponse>
  extends FormMutationOptions<TSchema, TResponse> {}

/**
 * Hook for using form + mutation inline without creating a factory
 * Useful for one-off forms that don't need to be reused
 *
 * @example
 * ```ts
 * const { form, handleSubmit, isSubmitting } = useFormMutation({
 *   schema: mySchema,
 *   defaultValues: { name: "" },
 *   mutationKey: "create-item",
 *   mutationFn: async (data) => api.createItem(data),
 *   successMessage: "Item created!",
 * });
 * ```
 */
export function useFormMutation<TSchema extends z.ZodType, TResponse>(
  options: InlineFormMutationOptions<TSchema, TResponse>
): FormMutationResult<TSchema, TResponse> {
  const hook = createFormMutation(options);
  return hook();
}
