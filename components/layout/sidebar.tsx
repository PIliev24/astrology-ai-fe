"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBirthCharts, useAuth, useConversationsByChart, useDeleteConversation, useDeleteBirthChart } from "@/hooks";
import { logoutAction } from "@/actions";
import { CreateChartDialog } from "@/components/dashboard/create-chart-dialog";
import {
  ChevronLeft,
  MessageSquare,
  Plus,
  Loader2,
  LogOut,
  ChevronDown,
  Trash2,
  Settings,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface ChartItemProps {
  chart: BirthChartResponse;
  isExpanded: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
}

function ChartItem({ chart, isExpanded, onToggle, isCollapsed }: ChartItemProps) {
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

  if (isCollapsed) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-center h-10 px-2 hover:bg-celestial-gold/15"
        onClick={() => router.push(`/chart/${chart.id}`)}
        aria-label={`View ${chart.name}`}
        title={`${chart.name} - ${birthDate}`}
      >
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </Button>
    );
  }

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
          <>
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
          </>
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

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
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
    <aside
      className={cn(
        "hidden lg:block fixed inset-y-0 left-0 z-40 border-r border-celestial-gold/10 bg-sidebar/95 backdrop-blur-cosmic transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsed ? "w-16" : "w-72"
      )}
      aria-label="Sidebar navigation"
    >
      {/* Subtle star background */}
      <div className="absolute inset-0 star-field-subtle opacity-10 pointer-events-none" />

      <div className="flex h-full flex-col relative z-10">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/70">
          {!isCollapsed && (
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="lg" />
            </Link>
          )}
          {!isCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8 shrink-0 hover:bg-celestial-gold/10"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8 shrink-0 mx-auto hover:bg-celestial-gold/10"
              aria-label="Expand sidebar"
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          )}
        </div>

        {/* New Reading Button */}
        <div className={cn("border-b border-border/70", isCollapsed ? "p-2" : "p-3 lg:p-4")}>
          {isCollapsed ? (
            <CreateChartDialog>
              <Button
                className="w-full gradient-gold text-primary-foreground"
                size="icon"
                aria-label="Create new birth chart"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </CreateChartDialog>
          ) : (
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
          )}
        </div>

        {/* New Chat Button */}
        <div className={cn("border-b border-border/70", isCollapsed ? "p-2" : "p-3 lg:p-4")}>
          {isCollapsed ? (
            <Button
              className="w-full zodiac-border"
              variant="outline"
              size="icon"
              aria-label="New chat"
              onClick={handleNewChat}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          ) : (
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
          )}
        </div>

        {/* Chart History */}
        <div className="flex flex-1 flex-col min-h-0">
          {!isCollapsed && (
            <div className="px-4 lg:px-5 py-3 border-b border-border/70">
              <h3 className="text-xs font-medium text-celestial-gold uppercase tracking-wider">Your Charts</h3>
              <span className="text-xs text-muted-foreground">(Previous chats)</span>
            </div>
          )}
          <ScrollArea className="flex-1 scrollbar-cosmic">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-celestial-gold" />
              </div>
            ) : charts.length === 0 ? (
              <div className={cn("py-8 text-center", isCollapsed ? "px-2" : "px-3")}>
                {!isCollapsed && (
                  <>
                    <Sparkles className="h-8 w-8 mx-auto text-celestial-gold/40 mb-2" />
                    <p className="text-sm text-muted-foreground">No charts yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Create your first natal chart</p>
                  </>
                )}
              </div>
            ) : (
              <div className={cn("space-y-1 py-3", isCollapsed ? "px-2" : "px-3")}>
                {charts.map(chart => (
                  <ChartItem
                    key={chart.id}
                    chart={chart}
                    isExpanded={expandedCharts.has(chart.id)}
                    onToggle={() => toggleChartExpansion(chart.id)}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* User Menu */}
        <div className="border-t border-border/70 p-3 space-y-3">
          {/* Theme Toggle */}
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-2 px-1")}>
            <ThemeToggle />
            {!isCollapsed && <span className="text-xs text-muted-foreground">Theme</span>}
          </div>
          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto py-2.5 hover:bg-celestial-gold/15",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <Avatar
                    className={cn("border-2 border-celestial-gold/30 shrink-0", isCollapsed ? "h-8 w-8" : "h-10 w-10")}
                  >
                    <AvatarFallback className="gradient-gold text-primary-foreground font-medium">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 ml-3 text-left">
                      <p className="text-sm font-medium truncate text-sidebar-foreground">
                        {user.name || "Star Seeker"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 oracle-glass" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none font-display text-gradient-gold">
                      {user.name || "Star Seeker"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer hover:bg-celestial-gold/15"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-destructive/10 text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </aside>
  );
}
