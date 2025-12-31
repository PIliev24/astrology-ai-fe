"use client";

import useSWR from "swr";
import { getBirthChartById } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { BirthChartResponse } from "@/types";

async function fetchBirthChart(_key: string, id: string): Promise<BirthChartResponse> {
  return await getBirthChartById(id);
}

export function useBirthChart(id: string | null) {
  const {
    data: chart,
    error,
    isLoading,
    mutate,
  } = useSWR(
    id ? [HOOK_KEYS.BIRTH_CHART, id] : null,
    ([, chartId]: [string, string]) => fetchBirthChart(HOOK_KEYS.BIRTH_CHART, chartId),
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
