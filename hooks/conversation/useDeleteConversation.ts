"use client";

import useSWRMutation from "swr/mutation";
import { deleteConversation } from "@/services";
import { toast } from "sonner";
import { mutate } from "swr";
import { HOOK_KEYS } from "@/constants";

async function deleteConversationMutation(_key: string, { arg }: { arg: string }): Promise<void> {
  await deleteConversation(arg);
}

export function useDeleteConversation() {
  const { trigger, isMutating, error, reset } = useSWRMutation("delete-conversation", deleteConversationMutation, {
    onSuccess: () => {
      toast.success("Conversation deleted successfully");
      // Invalidate all conversation-related caches
      mutate(
        key =>
          typeof key === "string" &&
          (key.startsWith(HOOK_KEYS.CONVERSATIONS) ||
            key.startsWith(HOOK_KEYS.CONVERSATION) ||
            key.startsWith(HOOK_KEYS.CONVERSATIONS_BY_CHART))
      );
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete conversation");
    },
  });

  return {
    deleteConversation: trigger,
    isDeleting: isMutating,
    error: error?.message,
    reset,
  };
}
