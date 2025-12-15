"use client";

import { BirthChartResponse } from "@/types";
import { Card } from "@/components/ui/card";

interface ChartViewerProps {
  chart: BirthChartResponse;
}

export function ChartViewer({ chart }: ChartViewerProps) {
  // Try new chart path first, then fallback to legacy paths
  const svgContent = chart.chart_data?.chart || chart.chart_data?.chart_wheel;

  if (!svgContent) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        <p>Chart SVG not available</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Card>
  );
}

