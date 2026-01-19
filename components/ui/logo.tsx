import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  showText?: boolean;
}

const sizeMap: Record<LogoSize, { icon: number; text: string }> = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 52, text: "text-2xl" },
  xl: { icon: 64, text: "text-3xl" },
};

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/logo.svg" alt="Aistrology" width={icon} height={icon} priority />
      {showText && <span className={cn("font-display font-semibold text-gradient-gold", text)}>Aistrology</span>}
    </div>
  );
}
