"use client";

import { useParams, useRouter } from "next/navigation";
import { useConversation, useBirthCharts } from "@/hooks";
import { ChatContainer } from "@/components/chat/chat-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ChatMessage } from "@/hooks/chat/useWebSocketChat";
import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;
  const { conversation, messages: conversationMessages, isLoading, error } = useConversation(conversationId);
  const { charts } = useBirthCharts();

  // Convert ConversationMessage[] to ChatMessage[]
  const initialMessages: ChatMessage[] = useMemo(() => {
    return conversationMessages.map(msg => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.created_at),
      tool_calls: msg.metadata?.tool_calls as ChatMessage["tool_calls"],
      chart_references: msg.metadata?.chart_references as string[] | undefined,
    }));
  }, [conversationMessages]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !conversation) {
    return (
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="text-center">
          <p className="text-destructive">Failed to load conversation</p>
          <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const createdDate = formatDistanceToNow(new Date(conversation.created_at), { addSuffix: true });
  const updatedDate = formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true });

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold truncate">{conversation.title || "Untitled Conversation"}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">Created {createdDate}</p>
                {conversation.updated_at !== conversation.created_at && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">Updated {updatedDate}</p>
                  </>
                )}
              </div>
            </div>
            {conversation.birth_chart_ids && conversation.birth_chart_ids.length > 0 && (
              <div className="flex gap-2">
                {conversation.birth_chart_ids.map(chartId => {
                  const chart = charts.find(c => c.id === chartId);
                  return chart ? (
                    <Badge key={chartId} variant="secondary">
                      {chart.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 min-h-0">
        <ChatContainer
          charts={charts}
          initialMessages={initialMessages}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
}

