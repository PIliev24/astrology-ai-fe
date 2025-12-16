"use client";

import { BirthChartResponse } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Globe, Clock } from "lucide-react";

interface ChartDetailsProps {
  chart: BirthChartResponse;
}

export function ChartDetails({ chart }: ChartDetailsProps) {
  const birthData = chart.birth_data;
  const birthDate = `${birthData.day}/${birthData.month}/${birthData.year}`;
  const birthTime = `${birthData.hour}:${birthData.minute.toString().padStart(2, "0")}`;

  return (
    <Card className="bg-gradient-to-br from-card to-muted/30">
      <CardHeader>
        <CardTitle className="text-xl">Birth Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Date & Time</p>
              <p className="text-base font-semibold">{birthDate}</p>
              <p className="text-sm text-muted-foreground">{birthTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
              <p className="text-base font-semibold">
                {birthData.city}, {birthData.country}
              </p>
              <p className="text-xs text-muted-foreground">
                {birthData.latitude.toFixed(4)}, {birthData.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Timezone</p>
              <p className="text-base font-semibold">{birthData.timezone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

