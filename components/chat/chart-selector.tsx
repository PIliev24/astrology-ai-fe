"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BirthChartResponse } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChartSelectorProps {
  charts: BirthChartResponse[];
  selectedChartIds: string[];
  onToggleChart: (chartId: string) => void;
}

export function ChartSelector({ charts, selectedChartIds, onToggleChart }: ChartSelectorProps) {
  if (charts.length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-2">
        No charts available. Create a chart first.
      </div>
    );
  }

  return (
    <Card className="p-4">
      <Label className="text-sm font-medium mb-3 block">Select charts to include in context:</Label>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {charts.map((chart) => (
          <div key={chart.id} className="flex items-center space-x-2">
            <Checkbox
              id={`chart-${chart.id}`}
              checked={selectedChartIds.includes(chart.id)}
              onCheckedChange={() => onToggleChart(chart.id)}
            />
            <Label
              htmlFor={`chart-${chart.id}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {chart.name} ({chart.birth_data.day}/{chart.birth_data.month}/{chart.birth_data.year})
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}

