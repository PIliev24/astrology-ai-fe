"use client";

import useSWR from "swr";
import { getConversationById } from "@/services";
import { HOOK_KEYS } from "@/constants";
import { ConversationWithMessages } from "@/types";

async function fetchConversation(id: string, messageLimit?: number): Promise<ConversationWithMessages> {
  return await getConversationById(id, messageLimit);
}

export function useConversation(id: string | null, messageLimit?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${HOOK_KEYS.CONVERSATION}-${id}-${messageLimit}` : null,
    () => fetchConversation(id!, messageLimit),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    conversation: data?.conversation,
    messages: data?.messages || [],
    isLoading,
    error,
    mutate,
  };
}

