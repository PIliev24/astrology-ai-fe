"use client";

import { useTranslations } from "next-intl";
import { BirthChartResponse } from "@/types";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ChartViewerProps {
  chart: BirthChartResponse;
}

export function ChartViewer({ chart }: ChartViewerProps) {
  const t = useTranslations("chart.viewer");
  
  // Try new chart path first, then fallback to legacy paths
  const svgContent = chart.chart_data?.chart || chart.chart_data?.chart_wheel;

  if (!svgContent) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">{t("notAvailable")}</p>
            <p className="text-sm text-muted-foreground">
              {t("notAvailableDescription")}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 overflow-auto bg-gradient-to-br from-card to-muted/30 border-2">
      <div
        className="w-full flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Card>
  );
}

