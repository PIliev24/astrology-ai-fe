"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { getWebSocketUrl } from "@/lib/env";
import { getAuthTokens } from "@/lib/client-storage";
import { ENDPOINTS } from "@/constants";
import { ChatMessageRequest, ChatMessageResponse, ConnectionResponse, ErrorResponse, PlanType } from "@/types";
import { useAuth, useSubscription, useUsage } from "@/hooks";
import { isAuthenticated } from "@/services/auth.service";
import { toast } from "sonner";
import { createCheckoutSessionAction } from "@/actions";

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

// Constants
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 1000;
const USAGE_REFRESH_DELAY = 500;

export function useWebSocketChat(options?: UseWebSocketChatOptions) {
  // State
  const [messages, setMessages] = useState<ChatMessage[]>(options?.initialMessages || []);
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(options?.initialConversationId || null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for stable references
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isManualCloseRef = useRef(false);
  const connectRef = useRef<(() => void) | null>(null);

  // Hooks
  const { isAuthenticated: userAuthenticated } = useAuth();
  const { subscription } = useSubscription();
  const { usage, mutate: mutateUsage } = useUsage();

  // Memoized values
  const canSendMessage = useMemo(() => {
    if (!usage || !subscription) return true;
    const limit = usage.message_limit;
    const remaining = usage.messages_remaining;
    return limit === null || limit === Infinity || (remaining !== null && remaining > 0);
  }, [usage, subscription]);

  // Handle upgrade action
  const handleUpgrade = useCallback(async () => {
    const plan = subscription?.plan || PlanType.FREE;
    const nextPlan = plan === PlanType.FREE ? PlanType.BASIC : PlanType.PRO;
    const result = await createCheckoutSessionAction(nextPlan);
    if (result.success && result.data) {
      window.location.href = result.data.checkoutUrl;
    } else {
      toast.error("Failed to create checkout session");
    }
  }, [subscription?.plan]);

  // Handle message limit exceeded error
  const handleLimitExceeded = useCallback(
    (errorResponse: ErrorResponse) => {
      // Remove the last user message from UI since it wasn't processed
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.role === "user") {
          return prev.slice(0, -1);
        }
        return prev;
      });

      // Refresh usage data
      mutateUsage();

      // Show error with upgrade option
      const errorMessage =
        (errorResponse as unknown as { message?: string }).message ||
        "Daily message limit reached. Upgrade to continue chatting.";
      toast.error(errorMessage, {
        duration: 5000,
        action: {
          label: "Upgrade",
          onClick: handleUpgrade,
        },
      });
    },
    [mutateUsage, handleUpgrade]
  );

  // Handle WebSocket messages
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        // Handle connection response
        if (data.type === "connected") {
          const connectionResponse = data as ConnectionResponse;
          console.log("WebSocket connected:", connectionResponse.message);
          return;
        }

        // Handle conversation created
        if (data.type === "conversation_created") {
          const response = data as ChatMessageResponse;
          if (response.conversation_id) {
            setConversationId(response.conversation_id);
          }
          return;
        }

        // Handle chat messages
        if (data.type === "message") {
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
          return;
        }

        // Handle errors
        if (data.type === "error") {
          const errorResponse = data as ErrorResponse;
          console.error("WebSocket error:", errorResponse.error);

          // Stop loading state
          setIsLoading(false);

          // Handle message limit exceeded error specifically
          if (errorResponse.error === "message_limit_exceeded") {
            handleLimitExceeded(errorResponse);
          } else {
            // Handle other errors generically
            const errorMessage =
              (errorResponse as unknown as { message?: string }).message || errorResponse.error || "An error occurred";
            toast.error(errorMessage);
          }
          return;
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
        toast.error("Failed to parse server response");
      }
    },
    [handleLimitExceeded]
  );

  // Handle WebSocket close
  const handleClose = useCallback(
    (event: CloseEvent) => {
      setStatus("disconnected");
      wsRef.current = null;

      // Don't reconnect if it was a manual close
      if (isManualCloseRef.current) {
        isManualCloseRef.current = false;
        return;
      }

      // Only attempt to reconnect if it wasn't a normal close
      // and we haven't exceeded max attempts
      if (event.code !== 1000 && reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttemptsRef.current++;
        const delay = Math.min(RECONNECT_DELAY * Math.pow(2, reconnectAttemptsRef.current - 1), 30000); // Exponential backoff, max 30s

        reconnectTimeoutRef.current = setTimeout(() => {
          if (wsRef.current === null && userAuthenticated && connectRef.current) {
            connectRef.current();
          }
        }, delay);
      } else if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
        console.error("Max reconnection attempts reached");
        setStatus("error");
      }
    },
    [userAuthenticated]
  );

  // Connection handler function
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

      socket.onmessage = handleMessage;
      socket.onclose = handleClose;

      wsRef.current = socket;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setStatus("error");
      toast.error("Failed to connect to chat service");
    }
  }, [userAuthenticated, handleMessage, handleClose]);

  // Update connect ref when handleConnect changes
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
        isManualCloseRef.current = true;
        wsRef.current.close(1000, "User disconnect");
        wsRef.current = null;
      }

      // Use setTimeout to defer state update (WebSocket cleanup is external system sync)
      setTimeout(() => setStatus("disconnected"), 0);
      return;
    }

    // Connect to WebSocket (this is synchronizing with external WebSocket system)
    // Defer slightly to avoid synchronous setState in effect body
    // This is a legitimate use case: synchronizing React state with external WebSocket API
    const timeoutId = setTimeout(() => {
      handleConnect();
    }, 0);

    // Cleanup on unmount or when dependencies change
    return () => {
      clearTimeout(timeoutId);

      // Clear any pending reconnection attempts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Close WebSocket connection
      if (wsRef.current) {
        isManualCloseRef.current = true;
        wsRef.current.close(1000, "User disconnect");
        wsRef.current = null;
      }

      // Use setTimeout to defer state update (WebSocket cleanup is external system sync)
      setTimeout(() => setStatus("disconnected"), 0);
    };
  }, [userAuthenticated, handleConnect]);

  // Send message function
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      // Check if WebSocket is connected
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        toast.error("WebSocket is not connected. Please wait...");
        // Try to reconnect
        if (status !== "connecting" && userAuthenticated) {
          handleConnect();
        }
        return;
      }

      // Check usage limits before sending (client-side pre-check)
      // This provides immediate feedback, but backend is the source of truth
      if (!canSendMessage) {
        toast.error("Daily message limit reached. Please upgrade to continue.", {
          duration: 5000,
          action: {
            label: "Upgrade",
            onClick: handleUpgrade,
          },
        });
        return;
      }

      // Add user message immediately to UI
      const userMessageId = `user-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        {
          id: userMessageId,
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
        // Refresh usage after sending (backend will increment it)
        // We do this optimistically, but backend is source of truth
        setTimeout(() => {
          mutateUsage();
        }, USAGE_REFRESH_DELAY);
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message");
        setIsLoading(false);
        // Remove user message from UI if send failed
        setMessages(prev => prev.filter(msg => msg.id !== userMessageId));
      }
    },
    [
      status,
      userAuthenticated,
      handleConnect,
      canSendMessage,
      handleUpgrade,
      selectedCharts,
      conversationId,
      mutateUsage,
    ]
  );

  // Chart selection handlers
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

  // Utility handlers
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

  // Initialize messages and conversationId from options
  // This should only run once when options are first provided
  const optionsRef = useRef(options);
  const hasInitializedRef = useRef(false);
  
  useEffect(() => {
    // Only initialize once on mount, not when options change
    // This prevents overwriting messages when user sends new messages
    if (!hasInitializedRef.current && options) {
      hasInitializedRef.current = true;
      optionsRef.current = options;
      
      if (options?.initialMessages) {
        // Use setTimeout to defer state update
        setTimeout(() => setMessages(options.initialMessages || []), 0);
      }
      if (options?.initialConversationId !== undefined) {
        // Use setTimeout to defer state update
        setTimeout(() => setConversationId(options.initialConversationId || null), 0);
      }
    }
  }, [options]);

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
