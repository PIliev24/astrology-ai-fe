"use client";

import useSWRMutation from "swr/mutation";
import { deleteBirthChartAction } from "@/actions";
import { toast } from "sonner";
import { mutate } from "swr";
import { HOOK_KEYS } from "@/constants";

async function deleteChartMutation(_key: string, { arg }: { arg: string }): Promise<void> {
  const result = await deleteBirthChartAction(arg);

  if (!result.success) {
    throw new Error(result.error || "Failed to delete birth chart");
  }
}

export function useDeleteBirthChart() {
  const { trigger, isMutating, error, reset } = useSWRMutation("delete-birth-chart", deleteChartMutation, {
    onSuccess: () => {
      toast.success("Birth chart deleted successfully");
      mutate(HOOK_KEYS.BIRTH_CHARTS);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete birth chart");
    },
  });

  return {
    deleteChart: trigger,
    isDeleting: isMutating,
    error: error?.message,
    reset,
  };
}
