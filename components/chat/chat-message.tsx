"use client";

import { useTranslations } from "next-intl";
import { ChatMessage as ChatMessageType } from "@/hooks/chat/useWebSocketChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot, Copy, Bookmark, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const t = useTranslations("chat.message");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success(t("copied"));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex gap-4 group animate-fade-in", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 border-2 border-primary/20 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col gap-2 max-w-[80%] md:max-w-[70%] group/message", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted border border-border"
          )}
        >
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p
              className={cn(
                "text-sm leading-relaxed whitespace-pre-wrap",
                isUser ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {message.content}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {!isUser && (
          <div className="flex items-center gap-1 px-1 opacity-0 group-hover/message:opacity-100 transition-opacity duration-200">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        )}

        {isUser && (
          <Avatar className="h-8 w-8 border-2 border-primary/20 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
