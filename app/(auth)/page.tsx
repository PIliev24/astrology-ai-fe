"use client";

import { ChatPanel } from "@/components/dashboard/chat-panel";
import { useBirthCharts } from "@/hooks";

export default function DashboardPage() {
  const { charts } = useBirthCharts();

  return (
    <div className="flex flex-col h-screen">
      <ChatPanel charts={charts} />
    </div>
  );
}

