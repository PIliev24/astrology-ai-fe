"use client";

import { ChatContainer } from "@/components/chat/chat-container";
import { BirthChartResponse } from "@/types";

interface ChatPanelProps {
  charts: BirthChartResponse[];
}

export function ChatPanel({ charts }: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full min-h-0 w-full">
      <ChatContainer charts={charts} />
    </div>
  );
}
