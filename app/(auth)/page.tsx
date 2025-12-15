"use client";

import { ChartList } from "@/components/dashboard/chart-list";
import { CreateChartDialog } from "@/components/dashboard/create-chart-dialog";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { useBirthCharts } from "@/hooks";

export default function DashboardPage() {
  const { charts, isLoading } = useBirthCharts();

  return (
    <div className="container mx-auto px-4 py-8 flex-1">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your birth charts and chat with AI</p>
        </div>
        <CreateChartDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Your Birth Charts</h2>
            <ChartList charts={charts} isLoading={isLoading} />
          </div>
        </div>

        <ChatPanel charts={charts} />
      </div>
    </div>
  );
}

