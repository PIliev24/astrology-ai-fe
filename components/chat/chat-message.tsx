"use client";

import { ChatMessage as ChatMessageType } from "@/hooks/chat/useWebSocketChat";
import { Button } from "@/components/ui/button";
import { User, Stars, Copy, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex gap-3 md:gap-4 group animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          isUser
            ? "bg-[var(--celestial-violet)]/20 border border-[var(--celestial-violet)]/30"
            : "gradient-gold zodiac-glow"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-[var(--celestial-violet)]" />
        ) : (
          <Stars className="h-5 w-5 text-primary-foreground" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[85%] md:max-w-[75%]",
          isUser && "items-end"
        )}
      >
        {/* Message bubble */}
        <div
          className={cn(
            "relative rounded-2xl px-4 md:px-5 py-3 md:py-4",
            isUser
              ? "chat-bubble-user text-primary-foreground"
              : "chat-bubble-ai"
          )}
        >
          {/* AI message decoration */}
          {!isUser && (
            <div className="absolute -left-1 top-4 w-2 h-2 rounded-full bg-[var(--celestial-gold)] opacity-60" />
          )}

          {/* Message text */}
          <div
            className={cn(
              "prose max-w-none",
              isUser ? "prose-invert" : "prose-slate dark:prose-invert"
            )}
          >
            <p
              className={cn(
                "text-sm md:text-base leading-relaxed whitespace-pre-wrap m-0",
                isUser ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {message.content}
            </p>
          </div>

          {/* User message glow effect */}
          {isUser && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Action buttons for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-[var(--celestial-gold)]/10 rounded-lg"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                  <span className="text-green-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy
                </>
              )}
            </Button>

            {/* Optional: Add more actions */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
              <Sparkles className="h-3 w-3" />
              <span>AI Response</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
