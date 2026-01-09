"use client";

import { cn } from "@/lib/utils";
import { StarField } from "./star-field";

interface CosmicBackgroundProps {
  variant?: "default" | "hero" | "subtle" | "intense";
  className?: string;
  children?: React.ReactNode;
  showStars?: boolean;
  showNebula?: boolean;
  showAurora?: boolean;
  interactive?: boolean;
}

export function CosmicBackground({
  variant = "default",
  className,
  children,
  showStars = true,
  showNebula = true,
  showAurora = false,
  interactive = false,
}: CosmicBackgroundProps) {
  const starCounts = {
    default: 100,
    hero: 200,
    subtle: 50,
    intense: 300,
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Base gradient layer */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          variant === "hero" && "gradient-cosmic-radial",
          variant === "default" && "gradient-cosmic",
          variant === "intense" && "gradient-mystical",
          variant === "subtle" && "bg-background"
        )}
      />

      {/* Nebula layer */}
      {/* {showNebula && (
        <>
          <div
            className={cn(
              "absolute inset-0 opacity-20 animate-nebula-drift",
              "bg-[radial-gradient(ellipse_80%_50%_at_20%_30%,var(--nebula-purple),transparent)]"
            )}
            style={{ animationDelay: "0s" }}
          />
          <div
            className={cn(
              "absolute inset-0 opacity-15 animate-nebula-drift",
              "bg-[radial-gradient(ellipse_60%_40%_at_80%_70%,var(--nebula-pink),transparent)]"
            )}
            style={{ animationDelay: "-7s" }}
          />
          <div
            className={cn(
              "absolute inset-0 opacity-10 animate-nebula-drift",
              "bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,var(--nebula-blue),transparent)]"
            )}
            style={{ animationDelay: "-14s" }}
          />
        </>
      )} */}

      {/* Aurora layer */}
      {showAurora && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute -inset-x-1/2 top-0 h-1/2 opacity-30 animate-aurora",
              "bg-linear-to-b from-(--celestial-teal) via-(--celestial-violet) to-transparent",
              "blur-3xl"
            )}
          />
        </div>
      )}

      {/* Star field layer */}
      {showStars && (
        <StarField
          starCount={starCounts[variant]}
          animated={true}
          interactive={interactive}
          className="z-10"
        />
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-20" />

      {/* Content */}
      {children && <div className="relative z-30">{children}</div>}
    </div>
  );
}
