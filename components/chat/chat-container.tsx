"use client";

import { useRef, useEffect } from "react";
import { useWebSocketChat, ChatMessage } from "@/hooks/chat/useWebSocketChat";
import { ChatMessage as ChatMessageComponent } from "./chat-message";
import { ChatInput } from "./chat-input";
import { BirthChartResponse } from "@/types";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatContainerProps {
  charts: BirthChartResponse[];
  initialMessages?: ChatMessage[];
  conversationId?: string | null;
}

const SUGGESTED_PROMPTS = [
  "Tell me my daily horoscope",
  "Tell me my weekly horoscope",
  "Tell me my monthly horoscope",
  "Tell me my yearly horoscope",
  "Tell me my life path number",
  "Tell me my destiny number",
  "Tell me my soulmate number",
  "Tell me my lucky number",
  "Tell me my lucky color",
  "Tell me about my Sun sign",
  "What does my Moon sign mean?",
  "Analyze my birth chart",
  "Explain my rising sign",
  "What are my dominant elements?",
  "Describe my planetary aspects",
  "What does my Venus placement mean?",
  "How does Mars influence my chart?",
  "Explain my house placements",
  "What are my strongest planetary aspects?",
  "Tell me about my chart's element balance",
  "What does my Mercury sign reveal?",
];

export function ChatContainer({ charts, initialMessages, conversationId }: ChatContainerProps) {
  const {
    messages,
    status,
    selectedCharts,
    isLoading,
    sendMessage,
    toggleChartSelection,
    loadMessages,
    setConversationId,
  } = useWebSocketChat({
    initialMessages,
    initialConversationId: conversationId,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Update messages and conversationId when props change
  useEffect(() => {
    if (initialMessages) {
      loadMessages(initialMessages);
    }
    if (conversationId !== undefined) {
      setConversationId(conversationId);
    }
  }, [initialMessages, conversationId, loadMessages, setConversationId]);

  const isConnected = status === "connected";

  return (
    <div className="flex flex-col h-full min-h-0 bg-background">
      <ScrollArea className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="rounded-full bg-primary/10 p-6 mb-6 animate-fade-in">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 animate-slide-in-bottom">Welcome to Astrology AI</h3>
              <p className="text-muted-foreground mb-8 max-w-md animate-slide-in-bottom">
                Ask questions about your birth charts or astrology in general. Select charts to include them in the
                context.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg animate-slide-in-bottom">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    disabled={!isConnected || isLoading}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm border bg-card hover:bg-accent",
                      "transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                      "text-left hover:scale-105 active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                    aria-label={`Use suggested prompt: ${prompt}`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, idx) => (
                <div key={message.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <ChatMessageComponent message={message} />
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start animate-fade-in">
                  <div className="flex flex-col gap-2 max-w-[80%] md:max-w-[70%]">
                    <div className="rounded-2xl px-4 py-3 bg-muted border border-border">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!isConnected && <div className="text-center text-sm text-muted-foreground py-4">Reconnecting...</div>}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <ChatInput
            onSendMessage={sendMessage}
            charts={charts}
            selectedChartIds={selectedCharts}
            onToggleChart={toggleChartSelection}
            isConnected={isConnected}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
