"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBirthCharts, useAuth } from "@/hooks";
import { logoutAction } from "@/actions";
import { CreateChartDialog } from "@/components/dashboard/create-chart-dialog";
import { ChevronLeft, MessageSquare, Plus, Sparkles, Loader2, LogOut, Moon, Sun, X } from "lucide-react";
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

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const router = useRouter();
  const { charts, isLoading } = useBirthCharts();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
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
                New Reading
              </Button>
            </CreateChartDialog>
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
                  <p className="text-sm text-muted-foreground mb-2">No charts yet</p>
                  <CreateChartDialog>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Chart
                    </Button>
                  </CreateChartDialog>
                </div>
              ) : (
                <div className="space-y-1 py-2 px-3">
                  {charts.map(chart => {
                    const birthDate = `${chart.birth_data.day}/${chart.birth_data.month}/${chart.birth_data.year}`;
                    return (
                      <Button
                        key={chart.id}
                        variant="ghost"
                        className="w-full hover:bg-sidebar-accent transition-colors justify-start text-left h-auto py-2 px-3"
                        onClick={() => {
                          router.push(`/chart/${chart.id}`);
                          onToggleCollapse(); // Close sidebar on mobile after navigation
                        }}
                        aria-label={`View chart for ${chart.name}`}
                      >
                        <div className="flex items-center gap-3 w-full min-w-0">
                          <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-sidebar-foreground">{chart.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{birthDate}</p>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
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
                New Reading
              </Button>
            </CreateChartDialog>
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
                {!isCollapsed && (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">No charts yet</p>
                    <CreateChartDialog>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Chart
                      </Button>
                    </CreateChartDialog>
                  </>
                )}
              </div>
            ) : (
              <div className={cn("space-y-1 py-2", isCollapsed ? "px-2" : "px-3")}>
                {charts.map(chart => {
                  const birthDate = `${chart.birth_data.day}/${chart.birth_data.month}/${chart.birth_data.year}`;
                  return (
                    <Button
                      key={chart.id}
                      variant="ghost"
                      className={cn(
                        "w-full hover:bg-sidebar-accent transition-colors",
                        isCollapsed ? "justify-center h-10 px-2" : "justify-start text-left h-auto py-2 px-3"
                      )}
                      onClick={() => router.push(`/chart/${chart.id}`)}
                      aria-label={isCollapsed ? `View ${chart.name}` : `View chart for ${chart.name}`}
                      title={isCollapsed ? `${chart.name} - ${birthDate}` : undefined}
                    >
                      {isCollapsed ? (
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <div className="flex items-center gap-3 w-full min-w-0">
                          <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-sidebar-foreground">{chart.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{birthDate}</p>
                          </div>
                        </div>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Mobile: Sign Out Button */}
        {!isCollapsed && (
          <div className="lg:hidden border-t border-sidebar-border p-4">
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
