"use client";

import useSWRMutation from "swr/mutation";
import { createBirthChartAction } from "@/actions";
import { BirthChartCreateRequest, BirthChartResponse } from "@/types";
import { toast } from "sonner";

async function createChartMutation(
  _key: string,
  { arg }: { arg: BirthChartCreateRequest }
): Promise<BirthChartResponse> {
  const result = await createBirthChartAction(arg);

  if (!result.success) {
    throw new Error(result.error || "Failed to create birth chart");
  }

  return result.data!.chart;
}

export function useCreateBirthChart() {
  const { trigger, isMutating, error, reset } = useSWRMutation(
    "create-birth-chart",
    createChartMutation,
    {
      onSuccess: () => {
        toast.success("Birth chart created successfully");
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to create birth chart");
      },
    }
  );

  return {
    createChart: trigger,
    isCreating: isMutating,
    error: error?.message,
    reset,
  };
}

