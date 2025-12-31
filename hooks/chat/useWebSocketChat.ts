"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getWebSocketUrl } from "@/lib/env";
import { getAuthTokens } from "@/lib/client-storage";
import { ENDPOINTS } from "@/constants";
import { ChatMessageRequest, ChatMessageResponse, ConnectionResponse, ErrorResponse, ConversationMessage } from "@/types";
import { useAuth } from "@/hooks";
import { isAuthenticated } from "@/services/auth.service";
import { toast } from "sonner";

import { ToolCallMetadata } from "@/types";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  tool_calls?: ToolCallMetadata[];
  chart_references?: string[];
}

export type WebSocketStatus = "connecting" | "connected" | "disconnected" | "error";

interface UseWebSocketChatOptions {
  initialMessages?: ChatMessage[];
  initialConversationId?: string | null;
}

export function useWebSocketChat(options?: UseWebSocketChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>(options?.initialMessages || []);
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(options?.initialConversationId || null);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const { isAuthenticated: userAuthenticated } = useAuth();

  const maxReconnectAttempts = 5;
  const reconnectDelay = 1000;

  // Store connect function reference for reconnection
  const connectRef = useRef<(() => void) | null>(null);

  // Connection handler function - used for reconnection
  const handleConnect = useCallback(() => {
    // Don't connect if already connected or connecting
    const currentStatus = wsRef.current?.readyState;
    if (currentStatus === WebSocket.OPEN || currentStatus === WebSocket.CONNECTING) {
      return;
    }

    // Check authentication
    if (!userAuthenticated || !isAuthenticated()) {
      setStatus("disconnected");
      return;
    }

    const tokens = getAuthTokens();
    if (!tokens) {
      setStatus("error");
      return;
    }

    try {
      const wsUrl = getWebSocketUrl(ENDPOINTS.WEBSOCKET.CHAT);
      const url = new URL(wsUrl);
      url.searchParams.set("token", tokens.accessToken);

      const socket = new WebSocket(url.toString());
      setStatus("connecting");

      socket.onopen = () => {
        reconnectAttemptsRef.current = 0;
        setStatus("connected");
      };

      socket.onmessage = event => {
        try {
          const data = JSON.parse(event.data);

          // Handle connection response
          if (data.type === "connected") {
            const connectionResponse = data as ConnectionResponse;
            console.log("WebSocket connected:", connectionResponse.message);
          }
          // Handle conversation created
          else if (data.type === "conversation_created") {
            const response = data as ChatMessageResponse;
            if (response.conversation_id) {
              setConversationId(response.conversation_id);
            }
          }
          // Handle chat messages
          else if (data.type === "message") {
            const chatMessage = data as ChatMessageResponse;
            setMessages(prev => [
              ...prev,
              {
                id: `${Date.now()}-${Math.random()}`,
                role: chatMessage.role,
                content: chatMessage.content,
                timestamp: new Date(),
                tool_calls: chatMessage.tool_calls,
                chart_references: chatMessage.chart_references,
              },
            ]);

            // Stop loading when assistant responds
            if (chatMessage.role === "assistant") {
              setIsLoading(false);
            }

            // Update conversation ID if provided
            if (chatMessage.conversation_id) {
              setConversationId(chatMessage.conversation_id);
            }
          }
          // Handle errors
          else if (data.type === "error") {
            const errorResponse = data as ErrorResponse;
            console.error("WebSocket error:", errorResponse.error);
            toast.error(errorResponse.error || "An error occurred");
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
          toast.error("Failed to parse server response");
        }
      };

      socket.onclose = event => {
        setStatus("disconnected");
        wsRef.current = null;

        // Only attempt to reconnect if it wasn't a manual close
        // and we haven't exceeded max attempts
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          const delay = Math.min(reconnectDelay * Math.pow(2, reconnectAttemptsRef.current - 1), 30000); // Exponential backoff, max 30s

          reconnectTimeoutRef.current = setTimeout(() => {
            // Use ref to avoid circular dependency
            if (connectRef.current) {
              connectRef.current();
            }
          }, delay);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          console.error("Max reconnection attempts reached");
          setStatus("error");
        }
      };

      // Only log errors, don't set status to error immediately
      // The onclose handler will handle reconnection
      socket.onerror = error => {
        console.error("WebSocket connection error:", error);
        // Don't set status here - let onclose handle it
        // This prevents infinite loops when connection is actually working
      };

      wsRef.current = socket;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setStatus("error");
      toast.error("Failed to connect to chat service");
    }
  }, [userAuthenticated]);

  // Update ref when handleConnect changes
  useEffect(() => {
    connectRef.current = handleConnect;
  }, [handleConnect]);

  // Auto-connect when authenticated
  useEffect(() => {
    // Only proceed if authenticated
    if (!userAuthenticated || !isAuthenticated()) {
      // Clear any pending reconnection attempts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Close WebSocket connection
      if (wsRef.current) {
        wsRef.current.close(1000, "User disconnect");
        wsRef.current = null;
      }

      // Defer state update to avoid synchronous setState in effect
      setTimeout(() => setStatus("disconnected"), 0);
      return;
    }

    // Connect to WebSocket using the handleConnect function
    // Note: handleConnect calls setStatus internally, which is necessary for WebSocket lifecycle management
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleConnect();

    // Cleanup on unmount
    return () => {
      // Clear any pending reconnection attempts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Close WebSocket connection
      if (wsRef.current) {
        wsRef.current.close(1000, "User disconnect");
        wsRef.current = null;
      }

      // Defer state update to avoid synchronous setState in effect
      setTimeout(() => setStatus("disconnected"), 0);
    };
  }, [userAuthenticated, handleConnect]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;

      // Check if WebSocket is connected
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        toast.error("WebSocket is not connected. Please wait...");
        // Try to reconnect
        if (status !== "connecting" && connectRef.current) {
          connectRef.current();
        }
        return;
      }

      // Add user message immediately to UI
      setMessages(prev => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content,
          timestamp: new Date(),
          chart_references: selectedCharts.length > 0 ? selectedCharts : undefined,
        },
      ]);

      // Set loading state while waiting for AI response
      setIsLoading(true);

      // Send message via WebSocket
      const message: ChatMessageRequest = {
        type: "message",
        content,
        conversation_id: conversationId || null,
        chart_references: selectedCharts.length > 0 ? selectedCharts : undefined,
      };

      try {
        wsRef.current.send(JSON.stringify(message));
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message");
        setIsLoading(false);
      }
    },
    [selectedCharts, conversationId, status]
  );

  const toggleChartSelection = useCallback((chartId: string) => {
    setSelectedCharts(prev => {
      if (prev.includes(chartId)) {
        return prev.filter(id => id !== chartId);
      }
      return [...prev, chartId];
    });
  }, []);

  const clearSelectedCharts = useCallback(() => {
    setSelectedCharts([]);
  }, []);

  const cancelLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const loadMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessages(newMessages);
  }, []);

  const setConversationIdState = useCallback((id: string | null) => {
    setConversationId(id);
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setSelectedCharts([]);
    setIsLoading(false);
  }, []);

  // Update messages and conversationId when options change
  useEffect(() => {
    if (options?.initialMessages) {
      setMessages(options.initialMessages);
    }
    if (options?.initialConversationId !== undefined) {
      setConversationId(options.initialConversationId);
    }
  }, [options?.initialMessages, options?.initialConversationId]);

  return {
    messages,
    status,
    selectedCharts,
    conversationId,
    isLoading,
    sendMessage,
    toggleChartSelection,
    clearSelectedCharts,
    cancelLoading,
    loadMessages,
    setConversationId: setConversationIdState,
    reset,
  };
}
