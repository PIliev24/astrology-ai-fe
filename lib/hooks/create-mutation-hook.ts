"use client";

/**
 * Factory for creating SWR mutation hooks
 * Reduces boilerplate for data mutation hooks with toast notifications
 */

import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { useSWRConfig } from "swr";
import { toast } from "sonner";

export interface MutationHookOptions<TResponse, TParams> {
  successMessage?: string | ((data: TResponse) => string);
  errorMessage?: string | ((error: Error) => string);
  invalidateKeys?: string[];
  onSuccess?: (data: TResponse, params: TParams) => void;
  onError?: (error: Error, params: TParams) => void;
  throwOnError?: boolean;
}

export interface MutationHookResult<TResponse, TParams> {
  trigger: (params: TParams) => Promise<TResponse | undefined>;
  data: TResponse | undefined;
  error: Error | undefined;
  isMutating: boolean;
  reset: () => void;
}

/**
 * Create a mutation hook with toast notifications and cache invalidation
 *
 * @example
 * ```ts
 * const useDeleteBirthChart = createMutationHook(
 *   "delete-birth-chart",
 *   (id: string) => apiClient.delete(`/birth-chart/${id}`),
 *   {
 *     successMessage: "Birth chart deleted successfully",
 *     invalidateKeys: ["/astrology/birth-chart"],
 *   }
 * );
 *
 * // Usage
 * const { trigger, isMutating } = useDeleteBirthChart();
 * await trigger(chartId);
 * ```
 */
export function createMutationHook<TResponse, TParams = void>(
  key: string,
  mutationFn: (params: TParams) => Promise<TResponse>,
  options?: MutationHookOptions<TResponse, TParams>
) {
  return function useMutation(
    hookOptions?: MutationHookOptions<TResponse, TParams>
  ): MutationHookResult<TResponse, TParams> {
    const { mutate: globalMutate } = useSWRConfig();
    const mergedOptions = { ...options, ...hookOptions };

    const swrOptions: SWRMutationConfiguration<TResponse, Error, string, TParams> = {
      throwOnError: mergedOptions.throwOnError ?? false,
      onSuccess: (data: TResponse, _key: string, config: { arg: TParams }) => {
        // Show success toast
        if (mergedOptions.successMessage) {
          const message =
            typeof mergedOptions.successMessage === "function"
              ? mergedOptions.successMessage(data)
              : mergedOptions.successMessage;
          toast.success(message);
        }

        // Invalidate cache keys
        if (mergedOptions.invalidateKeys) {
          mergedOptions.invalidateKeys.forEach((cacheKey) => {
            globalMutate(cacheKey);
          });
        }

        // Call custom onSuccess
        mergedOptions.onSuccess?.(data, config.arg);
      },
      onError: (error: Error, _key: string, config: { arg: TParams }) => {
        // Show error toast
        const message =
          typeof mergedOptions.errorMessage === "function"
            ? mergedOptions.errorMessage(error)
            : mergedOptions.errorMessage || error.message || "An error occurred";
        toast.error(message);

        // Call custom onError
        mergedOptions.onError?.(error, config.arg);
      },
    };

    const { trigger, data, error, isMutating, reset } = useSWRMutation<
      TResponse,
      Error,
      string,
      TParams
    >(key, (_key, { arg }) => mutationFn(arg), swrOptions);

    return {
      trigger: async (params: TParams) => {
        try {
          return await trigger(params);
        } catch (err) {
          if (mergedOptions.throwOnError) {
            throw err;
          }
          return undefined;
        }
      },
      data,
      error,
      isMutating,
      reset,
    };
  };
}

/**
 * Create a simple mutation hook without parameters
 */
export function createSimpleMutationHook<TResponse>(
  key: string,
  mutationFn: () => Promise<TResponse>,
  options?: Omit<MutationHookOptions<TResponse, void>, "onSuccess" | "onError"> & {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: Error) => void;
  }
) {
  return function useMutation(
    hookOptions?: typeof options
  ): Omit<MutationHookResult<TResponse, void>, "trigger"> & {
    trigger: () => Promise<TResponse | undefined>;
  } {
    const { mutate: globalMutate } = useSWRConfig();
    const mergedOptions = { ...options, ...hookOptions };

    const swrOptions: SWRMutationConfiguration<TResponse, Error, string, void> = {
      throwOnError: mergedOptions?.throwOnError ?? false,
      onSuccess: (data: TResponse) => {
        if (mergedOptions?.successMessage) {
          const message =
            typeof mergedOptions.successMessage === "function"
              ? mergedOptions.successMessage(data)
              : mergedOptions.successMessage;
          toast.success(message);
        }

        if (mergedOptions?.invalidateKeys) {
          mergedOptions.invalidateKeys.forEach((cacheKey) => {
            globalMutate(cacheKey);
          });
        }

        mergedOptions?.onSuccess?.(data);
      },
      onError: (error: Error) => {
        const message =
          typeof mergedOptions?.errorMessage === "function"
            ? mergedOptions.errorMessage(error)
            : mergedOptions?.errorMessage || error.message || "An error occurred";
        toast.error(message);

        mergedOptions?.onError?.(error);
      },
    };

    const { trigger, data, error, isMutating, reset } = useSWRMutation<
      TResponse,
      Error,
      string,
      void
    >(key, () => mutationFn(), swrOptions);

    return {
      trigger: async () => {
        try {
          return await trigger();
        } catch (err) {
          if (mergedOptions?.throwOnError) {
            throw err;
          }
          return undefined;
        }
      },
      data,
      error,
      isMutating,
      reset,
    };
  };
}
