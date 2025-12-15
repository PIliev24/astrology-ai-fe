"use client";

import { ChatMessage as ChatMessageType } from "@/hooks/chat/useWebSocketChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex gap-3 max-w-[80%] md:max-w-[70%]", isUser && "flex-row-reverse")}>
        <div className="flex-shrink-0">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </div>
        </div>
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            {message.chart_references && message.chart_references.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.chart_references.map((chartId) => (
                  <Badge key={chartId} variant="secondary" className="text-xs">
                    Chart: {chartId.slice(0, 8)}...
                  </Badge>
                ))}
              </div>
            )}
            {message.tool_calls && message.tool_calls.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.tool_calls.map((tool, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tool.tool_name}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

