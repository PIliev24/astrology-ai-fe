"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye } from "lucide-react";
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

  const birthDate = `${chart.birth_data.day}/${chart.birth_data.month}/${chart.birth_data.year} ${chart.birth_data.hour}:${chart.birth_data.minute.toString().padStart(2, "0")}`;

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">{chart.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <p>Born: {birthDate}</p>
              <p>
                {chart.birth_data.city}, {chart.birth_data.country}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handleView} className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
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

