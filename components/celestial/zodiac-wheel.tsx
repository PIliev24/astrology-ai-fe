"use client";

import { cn } from "@/lib/utils";

interface ZodiacWheelProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showSymbols?: boolean;
  highlightSign?: string;
}

const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", element: "fire", degrees: 0 },
  { name: "Taurus", symbol: "♉", element: "earth", degrees: 30 },
  { name: "Gemini", symbol: "♊", element: "air", degrees: 60 },
  { name: "Cancer", symbol: "♋", element: "water", degrees: 90 },
  { name: "Leo", symbol: "♌", element: "fire", degrees: 120 },
  { name: "Virgo", symbol: "♍", element: "earth", degrees: 150 },
  { name: "Libra", symbol: "♎", element: "air", degrees: 180 },
  { name: "Scorpio", symbol: "♏", element: "water", degrees: 210 },
  { name: "Sagittarius", symbol: "♐", element: "fire", degrees: 240 },
  { name: "Capricorn", symbol: "♑", element: "earth", degrees: 270 },
  { name: "Aquarius", symbol: "♒", element: "air", degrees: 300 },
  { name: "Pisces", symbol: "♓", element: "water", degrees: 330 },
];

const ELEMENT_COLORS = {
  fire: "from-orange-500 to-red-600",
  earth: "from-emerald-600 to-amber-700",
  air: "from-sky-400 to-indigo-500",
  water: "from-blue-500 to-purple-600",
};

const sizeClasses = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
  xl: "w-[28rem] h-[28rem]",
};

const symbolSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export function ZodiacWheel({
  className,
  size = "md",
  animated = true,
  showSymbols = true,
  highlightSign,
}: ZodiacWheelProps) {
  return (
    <div
      className={cn(
        "relative rounded-full",
        sizeClasses[size],
        animated && "animate-rotate-slow",
        className
      )}
    >
      {/* Outer glow ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r from-[var(--celestial-gold)] via-[var(--celestial-violet)] to-[var(--celestial-gold)]",
          "opacity-30 blur-xl"
        )}
      />

      {/* Main wheel */}
      <div
        className={cn(
          "absolute inset-2 rounded-full overflow-hidden",
          "shadow-[0_0_60px_rgba(var(--celestial-gold),0.3),inset_0_0_60px_rgba(0,0,0,0.5)]"
        )}
      >
        {/* Conic gradient for zodiac sections */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(
              from 0deg,
              #ef4444 0deg 30deg,
              #10b981 30deg 60deg,
              #06b6d4 60deg 90deg,
              #3b82f6 90deg 120deg,
              #f97316 120deg 150deg,
              #84cc16 150deg 180deg,
              #f472b6 180deg 210deg,
              #8b5cf6 210deg 240deg,
              #dc2626 240deg 270deg,
              #a3a3a3 270deg 300deg,
              #0ea5e9 300deg 330deg,
              #6366f1 330deg 360deg
            )`,
          }}
        />

        {/* Inner dark circle */}
        <div
          className={cn(
            "absolute rounded-full bg-background",
            "shadow-[inset_0_0_30px_rgba(var(--celestial-gold),0.2)]",
            size === "sm" && "inset-[25%]",
            size === "md" && "inset-[22%]",
            size === "lg" && "inset-[20%]",
            size === "xl" && "inset-[18%]"
          )}
        >
          {/* Center decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "rounded-full bg-gradient-to-br from-[var(--celestial-gold)] to-[var(--celestial-copper)]",
                "shadow-[0_0_20px_var(--celestial-gold)]",
                size === "sm" && "w-6 h-6",
                size === "md" && "w-8 h-8",
                size === "lg" && "w-10 h-10",
                size === "xl" && "w-12 h-12"
              )}
            />
          </div>
        </div>

        {/* Divider lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 h-[1px] origin-left bg-gradient-to-r from-transparent via-[var(--celestial-gold)] to-transparent opacity-40"
            style={{
              width: "50%",
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Zodiac symbols */}
      {showSymbols &&
        ZODIAC_SIGNS.map((sign, i) => {
          const angle = (sign.degrees - 90 + 15) * (Math.PI / 180);
          const radius = size === "sm" ? 38 : size === "md" ? 56 : size === "lg" ? 75 : 88;

          const x = 50 + radius * Math.cos(angle) * (100 / (radius * 2 + 20));
          const y = 50 + radius * Math.sin(angle) * (100 / (radius * 2 + 20));

          const isHighlighted = highlightSign?.toLowerCase() === sign.name.toLowerCase();

          return (
            <div
              key={sign.name}
              className={cn(
                "absolute font-display transition-all duration-300",
                symbolSizes[size],
                isHighlighted
                  ? "text-(--celestial-gold) scale-125 drop-shadow-[0_0_8px_var(--celestial-gold)]"
                  : "text-foreground/80 hover:text-(--celestial-gold) hover:scale-110",
                animated && "animate-none" // Counter-rotate to keep symbols upright
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: animated
                  ? `translate(-50%, -50%) rotate(calc(-1 * var(--rotation, 0deg)))`
                  : "translate(-50%, -50%)",
              }}
              title={sign.name}
            >
              {sign.symbol}
            </div>
          );
        })}

      {/* Outer ring decoration */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border border-[var(--celestial-gold)]/20",
          "shadow-[0_0_20px_var(--celestial-gold)/10]"
        )}
      />
    </div>
  );
}
