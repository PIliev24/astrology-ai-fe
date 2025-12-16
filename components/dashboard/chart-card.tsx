"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Calendar, MapPin } from "lucide-react";
import { BirthChartResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useDeleteBirthChart } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  chart: BirthChartResponse;
}

export function ChartCard({ chart }: ChartCardProps) {
  const router = useRouter();
  const { deleteChart, isDeleting } = useDeleteBirthChart();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    await deleteChart(chart.id);
    setShowDeleteDialog(false);
  };

  const handleView = () => {
    router.push(`/chart/${chart.id}`);
  };

  const birthDate = `${chart.birth_data.day}/${chart.birth_data.month}/${chart.birth_data.year}`;
  const birthTime = `${chart.birth_data.hour}:${chart.birth_data.minute.toString().padStart(2, "0")}`;

  return (
    <>
      <Card className={cn(
        "group hover:shadow-lg transition-all duration-300 animate-fade-in",
        "hover:border-primary/20 hover:-translate-y-1",
        "cursor-pointer"
      )}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {chart.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-foreground">{birthDate}</p>
                <p className="text-xs">{birthTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <p>
                {chart.birth_data.city}, {chart.birth_data.country}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleView} 
              className="flex-1 group-hover:border-primary/50 group-hover:text-primary transition-colors"
              aria-label={`View chart for ${chart.name}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
              aria-label={`Delete chart ${chart.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chart</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{chart.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

