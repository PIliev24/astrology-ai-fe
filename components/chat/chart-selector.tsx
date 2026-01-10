"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BirthChartResponse } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ChartSelectorProps {
  charts: BirthChartResponse[];
  selectedChartIds: string[];
  onToggleChart: (chartId: string) => void;
}

export function ChartSelector({ charts, selectedChartIds, onToggleChart }: ChartSelectorProps) {
  if (charts.length === 0) {
    return null;
  }

  const selectedCount = selectedChartIds.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Select charts to include in context
          {selectedCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedCount} selected
            </Badge>
          )}
        </Label>
      </div>
      <ScrollArea className="max-h-32 overflow-y-auto">
        <div className="space-y-2">
          {charts.map(chart => {
            const isSelected = selectedChartIds.includes(chart.id);
            const birthDate = `${chart.birth_data.day}/${chart.birth_data.month}/${chart.birth_data.year}`;

            return (
              <div
                key={chart.id}
                onClick={() => onToggleChart(chart.id)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all",
                  "hover:bg-accent/20 border",
                  isSelected ? "bg-primary/5 border-primary/20" : "bg-background border-border"
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded border-2 transition-all",
                    isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium truncate", isSelected && "text-primary")}>{chart.name}</p>
                  <p className="text-xs text-muted-foreground">{birthDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
