"use client";

import { useRef, useEffect } from "react";
import { useWebSocketChat, ChatMessage } from "@/hooks/chat/useWebSocketChat";
import { ChatMessage as ChatMessageComponent } from "./chat-message";
import { ChatInput } from "./chat-input";
import { BirthChartResponse } from "@/types";
import { Loader2, Stars } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface ChatContainerProps {
  charts: BirthChartResponse[];
  initialMessages?: ChatMessage[];
  conversationId?: string | null;
}

const SUGGESTED_PROMPTS = [
  { text: "Tell me my daily horoscope", icon: "☀️" },
  { text: "Analyze my birth chart", icon: "🌟" },
  { text: "What does my Moon sign mean?", icon: "🌙" },
  { text: "Explain my rising sign", icon: "⬆️" },
  { text: "What are my dominant elements?", icon: "🔥" },
  { text: "Describe my planetary aspects", icon: "✨" },
  { text: "Tell me about my Sun sign", icon: "☉" },
  { text: "What does my Venus placement mean?", icon: "♀" },
  { text: "How does Mars influence my chart?", icon: "♂" },
  { text: "Explain my house placements", icon: "🏠" },
  { text: "Tell me about my life path", icon: "🛤️" },
  { text: "What are my strongest aspects?", icon: "💫" },
];

export function ChatContainer({ charts, initialMessages, conversationId }: ChatContainerProps) {
  const router = useRouter();

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

  const loadedConversationIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (conversationId !== undefined) {
      setConversationId(conversationId);
    }
  }, [conversationId, setConversationId]);

  useEffect(() => {
    const conversationChanged = loadedConversationIdRef.current !== conversationId;
    if (conversationChanged && initialMessages) {
      loadedConversationIdRef.current = conversationId;
      loadMessages(initialMessages);
    }
  }, [conversationId, initialMessages, loadMessages]);

  const isConnected = status === "connected";

  return (
    <div className="flex flex-col h-full min-h-0 bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-(--celestial-violet)/5 to-transparent pointer-events-none" />

      <ScrollArea className="flex-1 scrollbar-cosmic">
        <div className="container max-w-4xl mx-auto px-4 py-4 md:py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-start md:justify-center min-h-[50vh] md:min-h-[60vh] text-center">
              <div className="relative mb-8 cursor-pointer" onClick={() => router.push("/")}>
                <Logo size="xl" showText />
              </div>

              {/* Welcome text */}
              <div className="space-y-3 mb-10 animate-fade-in">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">Welcome, Star Seeker</h3>
                <p className="text-lg text-muted-foreground max-w-md">
                  Ask questions about your birth charts or explore the mysteries of astrology. Select a chart to receive
                  personalized cosmic guidance.
                </p>
              </div>

              {/* Suggested prompts */}
              <div className="w-full max-w-2xl animate-slide-in-bottom">
                <p className="text-sm text-muted-foreground mb-4 font-medium">✦ Try asking ✦</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SUGGESTED_PROMPTS.slice(0, 6).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(prompt.text)}
                      disabled={!isConnected || isLoading}
                      className={cn(
                        "group relative px-4 py-3 rounded-xl text-sm text-left",
                        "celestial-card hover-lift",
                        "transition-all duration-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--celestial-gold)]"
                      )}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <span className="text-lg mr-2">{prompt.icon}</span>
                      <span className="text-foreground/90">{prompt.text}</span>
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-[var(--celestial-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                {/* More prompts toggle */}
                <details className="mt-4">
                  <summary className="text-sm text-(--celestial-gold) cursor-pointer hover:text-(--celestial-gold)/80 transition-colors">
                    Show more suggestions
                  </summary>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {SUGGESTED_PROMPTS.slice(6).map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt.text)}
                        disabled={!isConnected || isLoading}
                        className={cn(
                          "group relative px-4 py-3 rounded-xl text-sm text-left",
                          "celestial-card hover-lift",
                          "transition-all duration-300",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        <span className="text-lg mr-2">{prompt.icon}</span>
                        <span className="text-foreground/90">{prompt.text}</span>
                      </button>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${Math.min(idx * 0.05, 0.3)}s` }}
                >
                  <ChatMessageComponent message={message} />
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-4 justify-start animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shrink-0 zodiac-glow">
                      <Stars className="h-5 w-5 text-primary-foreground animate-pulse" />
                    </div>
                    <div className="oracle-glass rounded-2xl px-5 py-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 text-(--celestial-gold) animate-spin" />
                        <span className="text-sm text-muted-foreground italic">Consulting the cosmos...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reconnecting indicator */}
              {!isConnected && (
                <div className="text-center py-4 animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--celestial-violet)]/10 border border-[var(--celestial-violet)]/20">
                    <Loader2 className="h-4 w-4 animate-spin text-[var(--celestial-violet)]" />
                    <span className="text-sm text-[var(--celestial-violet)]">
                      Reconnecting to the celestial realm...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="relative shrink-0 border-t border-border/70 bg-background/90 backdrop-blur-nav pb-[env(safe-area-inset-bottom)]">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="container max-w-4xl mx-auto px-4 py-4 relative z-10">
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
