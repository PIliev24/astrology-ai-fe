"use client";

import useSWR from "swr";
import { getConversations } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { ChatConversation } from "@/types";

async function fetchConversations(includeCharts?: boolean, limit?: number): Promise<ChatConversation[]> {
  return await getConversations(includeCharts, limit);
}

export function useConversations(includeCharts?: boolean, limit?: number) {
  const key = `${HOOK_KEYS.CONVERSATIONS}-${includeCharts}-${limit}`;
  const {
    data: conversations,
    error,
    isLoading,
    mutate,
  } = useSWR(key, () => fetchConversations(includeCharts, limit), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    conversations: conversations || [],
    isLoading,
    error,
    mutate,
  };
}
