"use client";

import { useParams, useRouter } from "next/navigation";
import { ChartDetails } from "@/components/chart/chart-details";
import { useBirthChart } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { House, AstrologicalPoint } from "@/types";

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
          <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const chartData = chart.chart_data?.chart_data?.subject;
  const activePoints = chart.chart_data?.chart_data?.active_points || [];
  const housesList = chart.chart_data?.chart_data?.subject?.houses_names_list || [];
  const chartSvg = chart.chart_data?.chart;

  // Get all houses
  const houses: House[] = [];
  if (chartData) {
    housesList.forEach(houseName => {
      const houseKey = houseName.toLowerCase();
      const house = chartData[houseKey as keyof typeof chartData];
      if (house && typeof house === "object" && "point_type" in house && house.point_type === "House") {
        houses.push(house as House);
      }
    });
  }

  // Get all active points
  const points: AstrologicalPoint[] = [];
  if (chartData) {
    activePoints.forEach(pointName => {
      // Convert "True_North_Lunar_Node" to "true_north_lunar_node", "Sun" to "sun", etc.
      const pointKey = pointName.toLowerCase().replace(/\s+/g, "_");
      const point = chartData[pointKey as keyof typeof chartData];
      if (point && typeof point === "object" && "point_type" in point && point.point_type === "AstrologicalPoint") {
        points.push(point as AstrologicalPoint);
      }
    });
  }

  // Helper function to format degrees
  const formatDegrees = (position: number) => {
    const degrees = Math.floor(position);
    const minutes = Math.floor((position - degrees) * 60);
    const seconds = Math.floor(((position - degrees) * 60 - minutes) * 60);
    return `${degrees}°${minutes}'${seconds}"`;
  };

  // Helper function to format snake_case to sentence case
  const formatPointName = (name: string) => {
    return name
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 flex-1">
      <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 hover:bg-accent">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{chart.name}</h1>
        <p className="text-muted-foreground">Birth Chart Details</p>
      </div>

      {/* Chart SVG */}
      {chartSvg && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Chart Visualization</h2>
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

      {/* Active Points */}
      {points.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Active Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {points.map(point => (
              <Card key={point.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{point.emoji}</span>
                    <span>{formatPointName(point.name)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-medium">
                      {point.sign}
                    </Badge>
                    <Badge variant="secondary">{formatDegrees(point.position)}</Badge>
                  </div>
                  <div className="text-sm space-y-2 pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium text-muted-foreground">House:</span>
                      <span className="text-foreground">{formatPointName(point.house || "")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-muted-foreground">Element:</span>
                      <span className="text-foreground">{point.element}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-muted-foreground">Quality:</span>
                      <span className="text-foreground">{point.quality}</span>
                    </div>
                    {point.speed !== null && (
                      <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground">Speed:</span>
                        <span className="text-foreground">{point.speed.toFixed(4)}°/day</span>
                      </div>
                    )}
                    {point.retrograde !== null && point.retrograde && (
                      <div className="pt-1">
                        <Badge variant="destructive" className="w-full justify-center">
                          Retrograde
                        </Badge>
                      </div>
                    )}
                    {point.declination !== null && (
                      <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground">Declination:</span>
                        <span className="text-foreground">{point.declination.toFixed(2)}°</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Houses */}
      {houses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Houses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {houses.map(house => (
              <Card key={house.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{house.emoji}</span>
                    <span>{house.name.replace(/_/g, " ")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="font-medium">
                      {house.sign}
                    </Badge>
                    <Badge variant="secondary">{formatDegrees(house.position)}</Badge>
                  </div>
                  <div className="text-sm space-y-2 pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium text-muted-foreground">Element:</span>
                      <span className="text-foreground">{house.element}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-muted-foreground">Quality:</span>
                      <span className="text-foreground">{house.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-muted-foreground">Absolute Position:</span>
                      <span className="text-foreground">{house.abs_pos.toFixed(2)}°</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
