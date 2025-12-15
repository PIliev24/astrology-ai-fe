"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { ChartSelector } from "./chart-selector";
import { BirthChartResponse } from "@/types";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  charts: BirthChartResponse[];
  selectedChartIds: string[];
  onToggleChart: (chartId: string) => void;
  isConnected: boolean;
  isLoading?: boolean;
}

export function ChatInput({
  onSendMessage,
  charts,
  selectedChartIds,
  onToggleChart,
  isConnected,
  isLoading = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || !isConnected || isLoading) return;

    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-3">
      <ChartSelector
        charts={charts}
        selectedChartIds={selectedChartIds}
        onToggleChart={onToggleChart}
      />
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? "Type your message..." : "Connecting..."}
          disabled={!isConnected || isLoading}
          className="min-h-[80px] resize-none"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || !isConnected || isLoading}
          size="icon"
          className="h-auto"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

