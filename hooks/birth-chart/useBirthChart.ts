"use client";

import useSWR from "swr";
import { getBirthChartById } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { BirthChartResponse } from "@/types";

export function useBirthChart(id: string | null, theme?: string) {
  const {
    data: chart,
    error,
    isLoading,
    mutate,
  } = useSWR(
    id && theme ? [HOOK_KEYS.BIRTH_CHART, id, theme] : null,
    ([, chartId, t]: [string, string, string | undefined]) => getBirthChartById(chartId, t),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    chart,
    isLoading,
    error,
    mutate,
  };
}
