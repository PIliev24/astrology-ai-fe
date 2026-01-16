import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  showText?: boolean;
}

const sizeMap: Record<LogoSize, { icon: number; text: string }> = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 48, text: "text-xl" },
  xl: { icon: 64, text: "text-2xl" },
};

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/logo.svg" alt="Aistrology" width={icon} height={icon} priority />
      {showText && (
        <span className={cn("font-display font-semibold text-gradient-gold", text)}>
          Aistrology
        </span>
      )}
    </div>
  );
}
