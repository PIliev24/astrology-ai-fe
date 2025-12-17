"use client";

import { useTranslations } from "next-intl";
import { BirthChartResponse } from "@/types";
import { ChartCard } from "./chart-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateChartDialog } from "./create-chart-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface ChartListProps {
  charts: BirthChartResponse[];
  isLoading?: boolean;
}

export function ChartList({ charts, isLoading }: ChartListProps) {
  const t = useTranslations("dashboard.charts");
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl border p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (charts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{t("noCharts")}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {t("noChartsDescription")}
        </p>
        <CreateChartDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("createFirst")}
          </Button>
        </CreateChartDialog>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {charts.map((chart) => (
        <ChartCard key={chart.id} chart={chart} />
      ))}
    </div>
  );
}

