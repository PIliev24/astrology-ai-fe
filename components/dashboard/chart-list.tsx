"use client";

import { BirthChartResponse } from "@/types";
import { ChartCard } from "./chart-card";
import { Loader2 } from "lucide-react";

interface ChartListProps {
  charts: BirthChartResponse[];
  isLoading?: boolean;
}

export function ChartList({ charts, isLoading }: ChartListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (charts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium mb-2">No birth charts yet</p>
        <p className="text-sm">Create your first birth chart to get started</p>
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

