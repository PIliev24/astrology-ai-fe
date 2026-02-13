"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebarContent } from "@/components/layout/mobile-sidebar-content";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ChartProvider, useChartContext } from "@/contexts/chart-context";
import { CreateChartDialog } from "@/components/dashboard/create-chart-dialog";

function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const { isNoChartsDialogOpen, hasNoCharts } = useChartContext();
  const pathname = usePathname();
  const [desktopCollapsed, setDesktopCollapsed] = useState(true);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  // Auto-close mobile sheet on route change
  useEffect(() => {
    setTimeout(() => setMobileSheetOpen(false), 100)
  }, [pathname]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isCollapsed={desktopCollapsed} onToggleCollapse={() => setDesktopCollapsed(prev => !prev)} />

        {/* Mobile Sheet Sidebar */}
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent
            side="left"
            className="bg-sidebar/95 backdrop-blur-cosmic border-r border-celestial-gold/10 p-0 w-[85vw] max-w-sm lg:hidden [&>button:last-child]:hidden"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="absolute inset-0 star-field-subtle opacity-10 pointer-events-none" />
            <div className="relative z-10 h-full">
              <MobileSidebarContent onClose={() => setMobileSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Floating menu button for mobile */}
        {!mobileSheetOpen && (
          <Button
            variant="default"
            size="icon"
            className={cn(
              "fixed top-4 left-4 z-50 h-9 w-9 rounded-full shadow-lg",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "lg:hidden"
            )}
            onClick={() => setMobileSheetOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out w-full min-h-0",
            "lg:transition-[margin]",
            desktopCollapsed ? "lg:ml-16" : "lg:ml-72"
          )}
        >
          {children}
        </main>
      </div>

      {/* Global Create Chart Dialog - always visible when user has no charts */}
      {hasNoCharts && (
        <CreateChartDialog forceOpen={isNoChartsDialogOpen}>
          <div />
        </CreateChartDialog>
      )}
    </div>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChartProvider>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </ChartProvider>
  );
}
