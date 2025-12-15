"use client";

import { ChatContainer } from "@/components/chat/chat-container";
import { BirthChartResponse } from "@/types";

interface ChatPanelProps {
  charts: BirthChartResponse[];
}

export function ChatPanel({ charts }: ChatPanelProps) {
  return <ChatContainer charts={charts} />;
}

