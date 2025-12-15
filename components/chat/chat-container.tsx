"use client";

import { useRef, useEffect } from "react";
import { useWebSocketChat, ChatMessage } from "@/hooks/chat/useWebSocketChat";
import { ChatMessage as ChatMessageComponent } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BirthChartResponse } from "@/types";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatContainerProps {
  charts: BirthChartResponse[];
}

export function ChatContainer({ charts }: ChatContainerProps) {
  const { messages, status, selectedCharts, sendMessage, toggleChartSelection } = useWebSocketChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  return (
    <Card className="flex flex-col h-[600px] py-0">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">AI Astrology Assistant</h3>
        <div className="flex items-center gap-2">
          {isConnecting && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {isConnected ? (
            <Badge variant="default" className="gap-1">
              <Wifi className="h-3 w-3" />
              Connected
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <WifiOff className="h-3 w-3" />
              {isConnecting ? "Connecting..." : "Disconnected"}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            <div>
              <p className="text-lg font-medium mb-2">Start a conversation</p>
              <p className="text-sm">Ask questions about your birth charts or astrology in general.</p>
              <p className="text-sm mt-2">Select charts above to include them in the context.</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}
            {!isConnected && (
              <div className="text-center text-sm text-muted-foreground">
                Reconnecting...
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 border-t">
        <ChatInput
          onSendMessage={sendMessage}
          charts={charts}
          selectedChartIds={selectedCharts}
          onToggleChart={toggleChartSelection}
          isConnected={isConnected}
          isLoading={isConnecting}
        />
      </div>
    </Card>
  );
}

