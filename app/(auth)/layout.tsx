"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  // On mobile: true = hidden, false = shown
  // On desktop: true = collapsed to icon-only, false = full width
  // Start with true so mobile is hidden by default (floating button shows)
  // On desktop, it will be visible but collapsed (16px width)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  if (isLoading || !user) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay - only show when sidebar is open on mobile */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 lg:hidden",
            sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

        {/* Floating menu button for mobile - only show when sidebar is hidden on mobile */}
        {sidebarCollapsed && (
          <Button
            variant="default"
            size="icon"
            className={cn(
              "fixed top-4 left-4 z-50 h-9 w-9 rounded-full shadow-lg",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              // Hide on desktop
              "lg:hidden"
            )}
            onClick={e => {
              e.stopPropagation();
              toggleSidebar();
            }}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out w-full min-h-0",
            "lg:transition-[margin]",
            // Desktop: adjust margin based on collapsed state
            // Mobile: full width
            sidebarCollapsed ? "lg:ml-16" : "lg:ml-72"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
