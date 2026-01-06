"use client";

/**
 * Factory for creating SWR-based query hooks
 * Reduces boilerplate for data fetching hooks
 */

import useSWR, { SWRConfiguration, KeyedMutator } from "swr";

export interface QueryHookOptions<TResponse> extends SWRConfiguration<TResponse> {
  enabled?: boolean;
}

export interface QueryHookResult<TResponse> {
  data: TResponse | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: KeyedMutator<TResponse>;
}

/**
 * Create a query hook with standard SWR configuration
 *
 * @example
 * ```ts
 * const useBirthCharts = createQueryHook(
 *   () => "/astrology/birth-chart",
 *   () => apiClient.get("/astrology/birth-chart")
 * );
 *
 * // Usage
 * const { data, isLoading, error } = useBirthCharts();
 * ```
 */
export function createQueryHook<TResponse, TParams = void>(
  keyFactory: (params: TParams) => string | null,
  fetcher: (params: TParams) => Promise<TResponse>,
  defaultOptions?: QueryHookOptions<TResponse>
) {
  return function useQuery(
    params: TParams,
    options?: QueryHookOptions<TResponse>
  ): QueryHookResult<TResponse> {
    const mergedOptions = { ...defaultOptions, ...options };
    const enabled = mergedOptions.enabled !== false;
    const key = enabled ? keyFactory(params) : null;

    const { data, error, isLoading, isValidating, mutate } = useSWR<TResponse>(
      key,
      () => fetcher(params),
      {
        revalidateOnFocus: false,
        ...mergedOptions,
      }
    );

    return {
      data,
      error,
      isLoading,
      isValidating,
      mutate,
    };
  };
}

/**
 * Create a query hook that doesn't require parameters
 */
export function createSimpleQueryHook<TResponse>(
  key: string,
  fetcher: () => Promise<TResponse>,
  defaultOptions?: QueryHookOptions<TResponse>
) {
  return function useQuery(
    options?: QueryHookOptions<TResponse>
  ): QueryHookResult<TResponse> {
    const mergedOptions = { ...defaultOptions, ...options };
    const enabled = mergedOptions.enabled !== false;

    const { data, error, isLoading, isValidating, mutate } = useSWR<TResponse>(
      enabled ? key : null,
      fetcher,
      {
        revalidateOnFocus: false,
        ...mergedOptions,
      }
    );

    return {
      data,
      error,
      isLoading,
      isValidating,
      mutate,
    };
  };
}

/**
 * Create a query hook with dynamic key based on ID
 */
export function createQueryByIdHook<TResponse>(
  keyFactory: (id: string) => string,
  fetcher: (id: string) => Promise<TResponse>,
  defaultOptions?: QueryHookOptions<TResponse>
) {
  return function useQueryById(
    id: string | undefined | null,
    options?: QueryHookOptions<TResponse>
  ): QueryHookResult<TResponse> {
    const mergedOptions = { ...defaultOptions, ...options };
    const enabled = mergedOptions.enabled !== false && !!id;

    const { data, error, isLoading, isValidating, mutate } = useSWR<TResponse>(
      enabled && id ? keyFactory(id) : null,
      () => fetcher(id!),
      {
        revalidateOnFocus: false,
        ...mergedOptions,
      }
    );

    return {
      data,
      error,
      isLoading,
      isValidating,
      mutate,
    };
  };
}
