import { api } from "./api-client";
import { ChatConversation, ConversationWithMessages, ChartWithConversations } from "@/types";
import { ENDPOINTS } from "@/constants";

export async function getConversations(includeCharts?: boolean, limit?: number): Promise<ChatConversation[]> {
  const params = new URLSearchParams();
  if (includeCharts !== undefined) {
    params.append("include_charts", includeCharts.toString());
  }
  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }
  const queryString = params.toString();
  const endpoint = queryString ? `${ENDPOINTS.CONVERSATIONS.BASE}?${queryString}` : ENDPOINTS.CONVERSATIONS.BASE;
  return api.get<ChatConversation[]>(endpoint);
}

export async function getConversationById(id: string, messageLimit?: number): Promise<ConversationWithMessages> {
  const params = new URLSearchParams();
  if (messageLimit !== undefined) {
    params.append("message_limit", messageLimit.toString());
  }
  const queryString = params.toString();
  const endpoint = queryString ? `${ENDPOINTS.CONVERSATIONS.BY_ID(id)}?${queryString}` : ENDPOINTS.CONVERSATIONS.BY_ID(id);
  return api.get<ConversationWithMessages>(endpoint);
}

export async function getConversationsByChart(chartId: string, conversationLimit?: number): Promise<ChartWithConversations> {
  const params = new URLSearchParams();
  if (conversationLimit !== undefined) {
    params.append("conversation_limit", conversationLimit.toString());
  }
  const queryString = params.toString();
  const endpoint = queryString ? `${ENDPOINTS.CONVERSATIONS.BY_CHART(chartId)}?${queryString}` : ENDPOINTS.CONVERSATIONS.BY_CHART(chartId);
  return api.get<ChartWithConversations>(endpoint);
}

export async function deleteConversation(id: string): Promise<void> {
  return api.delete<void>(ENDPOINTS.CONVERSATIONS.BY_ID(id));
}

