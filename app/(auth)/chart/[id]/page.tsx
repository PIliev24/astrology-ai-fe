"use client";

import { useParams, useRouter } from "next/navigation";
import { ChartDetails } from "@/components/chart/chart-details";
import { useBirthChart } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ChartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const chartId = params.id as string;
  const { chart, isLoading, error } = useBirthChart(chartId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !chart) {
    return (
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="text-center">
          <p className="text-destructive">Failed to load chart</p>
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chat
          </Button>
        </div>
      </div>
    );
  }

  const chartSvg = chart.chart_data?.chart;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 flex-1">
      <div className="absolute inset-0 star-field-subtle pointer-events-none" />
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6 hover:bg-accent">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Chat
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{chart.name}</h1>
      </div>

      {/* Chart SVG */}
      {chartSvg && (
        <div className="mb-8">
          <Card className="py-0 overflow-auto bg-linear-to-br from-card to-muted/30 border-2">
            <div
              className="w-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: chartSvg }}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Card>
        </div>
      )}

      {/* Birth Details */}
      <div className="mb-8">
        <ChartDetails chart={chart} />
      </div>
    </div>
  );
}
