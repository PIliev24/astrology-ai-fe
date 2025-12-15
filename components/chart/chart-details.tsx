"use client";

import { BirthChartResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChartDetailsProps {
  chart: BirthChartResponse;
}

export function ChartDetails({ chart }: ChartDetailsProps) {
  const birthData = chart.birth_data;
  const birthDate = `${birthData.day}/${birthData.month}/${birthData.year} ${birthData.hour}:${birthData.minute.toString().padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Birth Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="text-sm font-medium">Name:</span> <span className="text-sm">{chart.name}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Date & Time:</span> <span className="text-sm">{birthDate}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Location:</span>{" "}
            <span className="text-sm">
              {birthData.city}, {birthData.country}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium">Coordinates:</span>{" "}
            <span className="text-sm">
              {birthData.latitude.toFixed(4)}, {birthData.longitude.toFixed(4)}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium">Timezone:</span> <span className="text-sm">{birthData.timezone}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

