"use client";

import useSWR from "swr";
import { getBirthCharts } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { BirthChartResponse } from "@/types";

async function fetchBirthCharts(): Promise<BirthChartResponse[]> {
  return await getBirthCharts();
}

export function useBirthCharts() {
  const {
    data: charts,
    error,
    isLoading,
    mutate,
  } = useSWR(HOOK_KEYS.BIRTH_CHARTS, fetchBirthCharts, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    charts: charts || [],
    isLoading,
    error,
    mutate,
  };
}
