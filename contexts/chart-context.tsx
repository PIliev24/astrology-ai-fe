"use client";

import { createContext, useContext, ReactNode } from "react";
import { useBirthCharts } from "@/hooks";

interface ChartContextType {
  hasNoCharts: boolean;
  isNoChartsDialogOpen: boolean;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export function ChartProvider({ children }: { children: ReactNode }) {
  const { charts, isLoading } = useBirthCharts();

  const hasNoCharts = !isLoading && charts.length === 0;

  // Dialog should always be open when user has no charts
  // This is a derived state, not managed separately
  const isNoChartsDialogOpen = hasNoCharts;

  return (
    <ChartContext.Provider
      value={{
        hasNoCharts,
        isNoChartsDialogOpen,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export function useChartContext() {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error("useChartContext must be used within a ChartProvider");
  }
  return context;
}
