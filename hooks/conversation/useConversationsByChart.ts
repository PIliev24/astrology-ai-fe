"use client";

import useSWR from "swr";
import { getConversationsByChart } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { ChartWithConversations } from "@/types";

async function fetchConversationsByChart(chartId: string, conversationLimit?: number): Promise<ChartWithConversations> {
  return await getConversationsByChart(chartId, conversationLimit);
}

export function useConversationsByChart(chartId: string | null, conversationLimit?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    chartId ? `${HOOK_KEYS.CONVERSATIONS_BY_CHART}-${chartId}-${conversationLimit}` : null,
    () => fetchConversationsByChart(chartId!, conversationLimit),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    chart: data?.chart,
    conversations: data?.conversations || [],
    isLoading,
    error,
    mutate,
  };
}
