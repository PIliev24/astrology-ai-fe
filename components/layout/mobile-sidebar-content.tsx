"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBirthCharts, useAuth, useConversationsByChart, useDeleteConversation, useDeleteBirthChart } from "@/hooks";
import { logoutAction } from "@/actions";
import { CreateChartDialog } from "@/components/dashboard/create-chart-dialog";
import {
  MessageSquare,
  Plus,
  Loader2,
  LogOut,
  ChevronDown,
  Trash2,
  Settings,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BirthChartResponse } from "@/types";

interface MobileSidebarContentProps {
  onClose: () => void;
}

interface MobileChartItemProps {
  chart: BirthChartResponse;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function MobileChartItem({ chart, isExpanded, onToggle, onClose }: MobileChartItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { conversations, isLoading: isLoadingConversations } = useConversationsByChart(chart.id);
  const { deleteConversation, isDeleting } = useDeleteConversation();
  const { deleteChart, isDeleting: isDeletingChart } = useDeleteBirthChart();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);
  const [chartDeleteDialogOpen, setChartDeleteDialogOpen] = useState(false);

  const birthDate = `${chart.birth_data.day}/${chart.birth_data.month}/${chart.birth_data.year}`;

  const handleDeleteClick = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    setConversationToDelete(conversationId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (conversationToDelete) {
      await deleteConversation(conversationToDelete);
      setDeleteDialogOpen(false);

      if (pathname === `/conversations/${conversationToDelete}`) {
        router.push("/dashboard");
      }

      setConversationToDelete(null);
    }
  };

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
    onClose();
  };

  const handleChartDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChartDeleteDialogOpen(true);
  };

  const handleChartDeleteConfirm = async () => {
    await deleteChart(chart.id);
    setChartDeleteDialogOpen(false);

    if (pathname === `/chart/${chart.id}`) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="space-y-1">
        <div className="group relative">
          <Button
            variant="ghost"
            className="w-full hover:bg-celestial-gold/15 transition-colors justify-start text-left h-auto py-2.5 px-3 rounded-lg"
            onClick={onToggle}
            aria-label={`Toggle ${chart.name} conversations`}
          >
            <div className="flex items-center gap-3 w-full min-w-0">
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div
                className="flex-1 min-w-0"
                onClick={e => {
                  e.stopPropagation();
                  router.push(`/chart/${chart.id}`);
                  onClose();
                }}
              >
                <p className="text-sm font-medium truncate text-sidebar-foreground">{chart.name}</p>
                <p className="text-xs text-muted-foreground truncate">{birthDate}</p>
              </div>
            </div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:bg-destructive/10"
            onClick={handleChartDeleteClick}
            aria-label={`Delete chart ${chart.name}`}
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
        </div>
        {isExpanded && (
          <div className="ml-8 space-y-0.5 border-l border-celestial-gold/20 pl-3">
            {isLoadingConversations ? (
              <div className="flex items-center justify-center py-3">
                <Loader2 className="h-4 w-4 animate-spin text-celestial-gold" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="py-2 px-2 text-xs text-muted-foreground italic">No conversations yet</div>
            ) : (
              conversations.map(conversation => {
                const relativeTime = formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true });
                return (
                  <div
                    key={conversation.id}
                    className="group/conv flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-celestial-gold/15 transition-colors cursor-pointer"
                  >
                    <button
                      className="flex-1 min-w-0 text-left"
                      onClick={() => handleConversationClick(conversation.id)}
                    >
                      <p className="text-xs font-medium truncate text-sidebar-foreground">
                        {conversation.title || "Untitled Reading"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">{relativeTime}</p>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover/conv:opacity-100 transition-opacity shrink-0 hover:bg-destructive/10"
                      onClick={e => handleDeleteClick(e, conversation.id)}
                      aria-label={`Delete conversation ${conversation.title || "Untitled"}`}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Delete conversation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="oracle-glass">
          <DialogHeader>
            <DialogTitle className="font-display text-gradient-gold">Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="zodiac-border">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete chart dialog */}
      <Dialog open={chartDeleteDialogOpen} onOpenChange={setChartDeleteDialogOpen}>
        <DialogContent className="oracle-glass">
          <DialogHeader>
            <DialogTitle className="font-display text-gradient-gold">Delete Chart</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chart? This will also delete all conversations associated with this
              chart. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChartDeleteDialogOpen(false)} className="zodiac-border">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleChartDeleteConfirm} disabled={isDeletingChart}>
              {isDeletingChart ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function MobileSidebarContent({ onClose }: MobileSidebarContentProps) {
  const router = useRouter();
  const { charts, isLoading } = useBirthCharts();
  const { user } = useAuth();
  const [expandedCharts, setExpandedCharts] = useState<Set<string>>(new Set());

  const toggleChartExpansion = (chartId: string) => {
    setExpandedCharts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chartId)) {
        newSet.delete(chartId);
      } else {
        newSet.add(chartId);
      }
      return newSet;
    });
  };

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  const handleNewChat = () => {
    router.push("/dashboard");
    router.refresh();
    onClose();
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <div className="flex h-full flex-col">
      {/* Profile Section */}
      <div className="pt-6 pb-4 px-4 border-b border-border/70">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-20 w-20 border-2 border-celestial-gold/30 zodiac-glow">
            <AvatarFallback className="gradient-gold text-primary-foreground font-semibold text-lg">
              {getInitials(user?.name, user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="font-display text-sm text-gradient-gold">{user?.name || "Star Seeker"}</p>
            <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* New Natal Chart Button */}
      <div className="border-b border-border/70 p-4">
        <CreateChartDialog>
          <Button
            className="w-full gradient-gold text-primary-foreground"
            size="sm"
            aria-label="Create new birth chart"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Natal Chart
          </Button>
        </CreateChartDialog>
      </div>

      {/* New Reading Button */}
      <div className="border-b border-border/70 p-4">
        <Button
          className="w-full zodiac-border"
          variant="outline"
          size="sm"
          aria-label="New chat"
          onClick={handleNewChat}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          New Reading
        </Button>
      </div>

      {/* Chart History */}
      <div className="flex flex-1 flex-col min-h-0">
        <div className="px-4 py-3 border-b border-border/70">
          <h3 className="text-xs font-medium text-celestial-gold uppercase tracking-wider">Your Charts</h3>
          <span className="text-xs text-muted-foreground">(Previous chats)</span>
        </div>
        <ScrollArea className="flex-1 scrollbar-cosmic">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-celestial-gold" />
            </div>
          ) : charts.length === 0 ? (
            <div className="py-8 text-center px-3">
              <Sparkles className="h-8 w-8 mx-auto text-celestial-gold/40 mb-2" />
              <p className="text-sm text-muted-foreground">No charts yet</p>
              <p className="text-xs text-muted-foreground mt-1">Create your first natal chart</p>
            </div>
          ) : (
            <div className="space-y-1 py-3 px-3">
              {charts.map(chart => (
                <MobileChartItem
                  key={chart.id}
                  chart={chart}
                  isExpanded={expandedCharts.has(chart.id)}
                  onToggle={() => toggleChartExpansion(chart.id)}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Settings and Sign Out */}
      <div className="border-t border-border/70 p-4 space-y-2">
        <div className="flex items-center gap-2 px-1 pb-2">
          <ThemeToggle />
          <span className="text-sm text-muted-foreground">Theme</span>
        </div>
        <Button
          variant="outline"
          className="w-full h-12 rounded-lg zodiac-border hover:bg-celestial-gold/15"
          onClick={() => {
            router.push("/settings");
            onClose();
          }}
        >
          <Settings className="h-4 w-4 mr-2" />
          <span className="text-base font-medium">Settings</span>
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 rounded-lg border-destructive/30 hover:bg-destructive/10 text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="text-base font-medium">Sign out</span>
        </Button>
      </div>
    </div>
  );
}
