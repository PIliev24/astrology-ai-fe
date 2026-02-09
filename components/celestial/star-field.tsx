/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
  animated?: boolean;
  interactive?: boolean;
  colors?: string[];
}

const DARK_COLORS = [
  "rgba(255, 248, 230, 1)", // Warm white
  "rgba(255, 223, 150, 1)", // Gold
  "rgba(200, 180, 255, 1)", // Soft violet
  "rgba(180, 220, 255, 1)", // Soft blue
  "rgba(255, 200, 200, 1)", // Soft rose
];

const LIGHT_COLORS = [
  "rgba(180, 155, 100, 1)", // Warm gold
  "rgba(120, 170, 160, 1)", // Muted teal
  "rgba(160, 140, 100, 1)", // Parchment gold
  "rgba(140, 160, 180, 1)", // Muted blue
  "rgba(170, 130, 130, 1)", // Muted rose
];

export function StarField({ starCount = 80, className, animated = true, interactive = false, colors }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reduce star count on mobile for better performance
  const effectiveStarCount = isMobile ? Math.min(starCount, 50) : starCount;
  // Disable animation on mobile for better scroll performance
  const effectiveAnimated = isMobile ? false : animated;

  // Use theme-aware colors
  const effectiveColors = colors ?? (resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS);

  const stars = useMemo(() => {
    const result: Star[] = [];
    for (let i = 0; i < effectiveStarCount; i++) {
      result.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.2,
        twinkleSpeed: Math.random() * 2 + 1,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: effectiveColors[Math.floor(Math.random() * effectiveColors.length)],
      });
    }
    return result;
  }, [effectiveStarCount, effectiveColors]);

  useEffect(() => {
    starsRef.current = stars;
  }, [stars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const startTime = performance.now();

    const draw = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const rect = canvas.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      starsRef.current.forEach(star => {
        const x = star.x * rect.width;
        const y = star.y * rect.height;

        // Calculate distance from mouse for interactive effect
        let interactiveBoost = 0;
        if (interactive) {
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            interactiveBoost = (1 - distance / 100) * 0.5;
          }
        }

        // Calculate twinkle effect
        let opacity = star.opacity;
        if (effectiveAnimated) {
          opacity = star.opacity * (0.6 + 0.3 * Math.sin(elapsed * star.twinkleSpeed + star.twinkleOffset));
        }
        opacity = Math.min(1, opacity + interactiveBoost);

        // Draw star glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * (1.5 + interactiveBoost * 3));
        gradient.addColorStop(0, star.color.replace("1)", `${opacity})`));
        gradient.addColorStop(0.5, star.color.replace("1)", `${opacity * 0.3})`));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, star.size * (1.5 + interactiveBoost * 3), 0, Math.PI * 2);
        ctx.fill();

        // Draw star core
        ctx.beginPath();
        ctx.fillStyle = star.color.replace("1)", `${opacity})`);
        ctx.arc(x, y, star.size * (0.5 + interactiveBoost * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [effectiveAnimated, interactive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className, {
        "pointer-events-auto": interactive,
      })}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
