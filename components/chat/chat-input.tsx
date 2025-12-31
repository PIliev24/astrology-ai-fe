"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { ChartSelector } from "./chart-selector";
import { BirthChartResponse } from "@/types";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  charts: BirthChartResponse[];
  selectedChartIds: string[];
  onToggleChart: (chartId: string) => void;
  isConnected: boolean;
  isLoading?: boolean;
}

const MAX_LENGTH = 2000;

export function ChatInput({
  onSendMessage,
  charts,
  selectedChartIds,
  onToggleChart,
  isConnected,
  isLoading = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || !isConnected || isLoading) return;

    onSendMessage(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && isConnected && !isLoading;

  return (
    <div className="space-y-3">
      {charts.length > 0 && (
        <ChartSelector charts={charts} selectedChartIds={selectedChartIds} onToggleChart={onToggleChart} />
      )}

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={e => {
            if (e.target.value.length <= MAX_LENGTH) {
              setInput(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? "Ask about your astrological insights..." : "Connecting..."}
          disabled={!isConnected || isLoading}
          className={cn(
            "min-h-[60px] w-full resize-none rounded-xl border-2 px-4 py-3 pr-16",
            "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all"
          )}
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!canSend}
          size="icon"
          className={cn(
            "absolute bottom-3 right-3 h-8 w-8",
            "transition-all",
            canSend && "hover:scale-105 active:scale-95",
            "focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-label="Send message"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className={cn(input.length > MAX_LENGTH * 0.9 && "text-destructive")}>
          {input.length} / {MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
