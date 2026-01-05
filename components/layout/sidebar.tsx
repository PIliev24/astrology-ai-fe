"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBirthCharts, useAuth, useConversationsByChart, useDeleteConversation, useDeleteBirthChart } from "@/hooks";
import { logoutAction } from "@/actions";
import { CreateChartDialog } from "@/components/dashboard/create-chart-dialog";
import {
  ChevronLeft,
  MessageSquare,
  Plus,
  Sparkles,
  Loader2,
  LogOut,
  Moon,
  Sun,
  X,
  ChevronDown,
  Trash2,
  Settings,
} from "lucide-react";
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
import { useTheme } from "next-themes";
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
  onCloseSidebar?: () => void;
}

function ChartItem({ chart, isExpanded, onToggle, isCollapsed, onCloseSidebar }: ChartItemProps) {
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
        router.push("/");
      }

      setConversationToDelete(null);
    }
  };

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
    onCloseSidebar?.();
  };

  const handleChartDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChartDeleteDialogOpen(true);
  };

  const handleChartDeleteConfirm = async () => {
    await deleteChart(chart.id);
    setChartDeleteDialogOpen(false);

    if (pathname === `/chart/${chart.id}`) {
      router.push("/");
    }
  };

  if (isCollapsed) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-center h-10 px-2"
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
            className="w-full hover:bg-sidebar-accent transition-colors justify-start text-left h-auto py-2 px-3"
            onClick={onToggle}
            aria-label={`Toggle ${chart.name} conversations`}
          >
            <div className="flex items-center gap-3 w-full min-w-0">
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
              <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
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
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            onClick={handleChartDeleteClick}
            aria-label={`Delete chart ${chart.name}`}
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        </div>
        {isExpanded && (
          <div className="ml-7 space-y-1">
            {isLoadingConversations ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="py-2 px-3 text-xs text-muted-foreground">No conversations yet</div>
            ) : (
              conversations.map(conversation => {
                const relativeTime = formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true });
                return (
                  <div
                    key={conversation.id}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
                  >
                    <button
                      className="flex-1 min-w-0 text-left"
                      onClick={() => handleConversationClick(conversation.id)}
                    >
                      <p className="text-xs font-medium truncate text-sidebar-foreground">
                        {conversation.title || "Untitled"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{relativeTime}</p>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={chartDeleteDialogOpen} onOpenChange={setChartDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chart</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chart? This will also delete all conversations associated with this
              chart. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChartDeleteDialogOpen(false)}>
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
  const { theme, setTheme } = useTheme();
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
    router.push("/");
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
        "fixed inset-y-0 left-0 z-40 border-r bg-sidebar transition-all duration-300 ease-in-out",
        "shadow-lg lg:shadow-none",
        // Mobile: full width when open, 0 width when collapsed (completely hidden)
        // Desktop: w-16 when collapsed, w-72 when expanded
        isCollapsed ? "w-0 lg:w-16" : "w-full lg:w-72",
        // Mobile: translate-x controls visibility (hidden when collapsed, shown when expanded)
        // Desktop: always visible (translate-x-0), width controls collapsed/expanded state
        isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0",
        // Ensure sidebar doesn't block pointer events when hidden on mobile
        isCollapsed && "lg:pointer-events-auto pointer-events-none"
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex h-full flex-col">
        {/* Mobile: Profile Section at Top */}
        {!isCollapsed && (
          <div className="lg:hidden pt-6 pb-4 px-4 border-b border-sidebar-border relative">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                  {getInitials(user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              </div>
            </div>
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="absolute top-4 right-4 h-8 w-8"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="h-5 w-5 text-primary shrink-0" />
              <h2 className="text-lg font-semibold text-sidebar-foreground truncate">Astrology AI</h2>
            </div>
          )}
          {/* Desktop: collapse button when expanded, expand button when collapsed */}
          {!isCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8 shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8 shrink-0 mx-auto"
              aria-label="Expand sidebar"
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          )}
        </div>

        {/* Mobile: New Reading Button */}
        {!isCollapsed && (
          <div className="lg:hidden border-b border-sidebar-border p-4">
            <CreateChartDialog>
              <Button className="w-full" size="sm" aria-label="Create new birth chart">
                <Plus className="h-4 w-4 mr-2" />
                New Natal Chart
              </Button>
            </CreateChartDialog>
          </div>
        )}

        {/* Mobile: New Chat Button */}
        {!isCollapsed && (
          <div className="lg:hidden border-b border-sidebar-border p-4">
            <Button
              className="w-full"
              size="sm"
              aria-label="New chat"
              onClick={() => {
                handleNewChat();
                onToggleCollapse();
              }}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        )}

        {/* Mobile: Chart History */}
        {!isCollapsed && (
          <div className="lg:hidden flex flex-1 flex-col min-h-0">
            <div className="px-4 py-3 border-b border-sidebar-border">
              <h3 className="text-sm font-medium text-sidebar-foreground">Your Charts</h3>
            </div>
            <ScrollArea className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : charts.length === 0 ? (
                <div className="py-8 text-center px-3">
                  <p className="text-sm text-muted-foreground">No charts yet</p>
                </div>
              ) : (
                <div className="space-y-1 py-2 px-3">
                  {charts.map(chart => (
                    <ChartItem
                      key={chart.id}
                      chart={chart}
                      isExpanded={expandedCharts.has(chart.id)}
                      onToggle={() => toggleChartExpansion(chart.id)}
                      isCollapsed={false}
                      onCloseSidebar={onToggleCollapse}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        )}

        {/* Desktop: New Reading Button */}
        <div className={cn("hidden lg:block border-b border-sidebar-border", isCollapsed ? "p-2" : "p-3 lg:p-4")}>
          {isCollapsed ? (
            <CreateChartDialog>
              <Button className="w-full" size="icon" aria-label="Create new birth chart">
                <Plus className="h-4 w-4" />
              </Button>
            </CreateChartDialog>
          ) : (
            <CreateChartDialog>
              <Button className="w-full" size="sm" aria-label="Create new birth chart">
                <Plus className="h-4 w-4 mr-2" />
                New Natal Chart
              </Button>
            </CreateChartDialog>
          )}
        </div>

        {/* Desktop: New Chat Button */}
        <div className={cn("hidden lg:block border-b border-sidebar-border", isCollapsed ? "p-2" : "p-3 lg:p-4")}>
          {isCollapsed ? (
            <Button className="w-full" size="icon" aria-label="New chat" onClick={handleNewChat}>
              <MessageSquare className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full" size="sm" aria-label="New chat" onClick={handleNewChat}>
              <MessageSquare className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          )}
        </div>

        {/* Desktop: Chart History */}
        <div className="hidden lg:flex flex-1 flex-col min-h-0">
          {!isCollapsed && (
            <div className="px-4 lg:px-6 py-3 border-b border-sidebar-border">
              <h3 className="text-sm font-medium text-sidebar-foreground">Your Charts</h3>
            </div>
          )}
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : charts.length === 0 ? (
              <div className={cn("py-8 text-center", isCollapsed ? "px-2" : "px-3")}>
                {!isCollapsed && <p className="text-sm text-muted-foreground">No charts yet</p>}
              </div>
            ) : (
              <div className={cn("space-y-1 py-2", isCollapsed ? "px-2" : "px-3")}>
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

        {/* Mobile: Settings and Sign Out Buttons */}
        {!isCollapsed && (
          <div className="lg:hidden border-t border-sidebar-border p-4 space-y-2">
            <Button
              variant="outline"
              className="w-full h-12 rounded-lg bg-muted/50 hover:bg-muted"
              onClick={() => {
                router.push("/settings");
                onToggleCollapse();
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-base font-medium">Settings</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 rounded-lg bg-muted/50 hover:bg-muted"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="text-base font-medium">Sign out</span>
            </Button>
          </div>
        )}

        {/* Desktop: User Menu and Theme Toggle */}
        <div className="hidden lg:block border-t border-sidebar-border p-3 space-y-2">
          {/* Theme Toggle */}
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
            {!isCollapsed && <span className="text-sm text-sidebar-foreground">Theme</span>}
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "sm"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(isCollapsed && "w-full")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {!isCollapsed && <span className="ml-2">{theme === "dark" ? "Light" : "Dark"}</span>}
            </Button>
          </div>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start h-auto py-2", isCollapsed && "justify-center px-2")}
                >
                  <Avatar className={cn("border-2 border-primary/20 shrink-0", isCollapsed ? "h-8 w-8" : "h-9 w-9")}>
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 ml-3 text-left">
                      <p className="text-sm font-medium truncate text-sidebar-foreground">{user.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/settings");
                    onToggleCollapse();
                  }}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </aside>
  );
}
