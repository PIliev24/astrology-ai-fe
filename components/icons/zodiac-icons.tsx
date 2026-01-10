import { SVGProps } from "react";

export interface ZodiacIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function AriesIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 21V6" />
      <path d="M12 6c0-2.5-1.5-4-3.5-4S5 3.5 5 6c0 2 1 3.5 2.5 4.5" />
      <path d="M12 6c0-2.5 1.5-4 3.5-4S19 3.5 19 6c0 2-1 3.5-2.5 4.5" />
    </svg>
  );
}

export function TaurusIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="15" r="6" />
      <path d="M4 5c0 2.5 2 4 4 4h8c2 0 4-1.5 4-4" />
    </svg>
  );
}

export function GeminiIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 3h14" />
      <path d="M5 21h14" />
      <path d="M8 3v18" />
      <path d="M16 3v18" />
      <path d="M5 3c0 4 3 6 7 6s7-2 7-6" />
      <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
    </svg>
  );
}

export function CancerIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="7" cy="10" r="3" />
      <circle cx="17" cy="14" r="3" />
      <path d="M7 7c7 0 12 2 13 7" />
      <path d="M17 17c-7 0-12-2-13-7" />
    </svg>
  );
}

export function LeoIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="8" r="4" />
      <path d="M13 8c0 6 3 10 5 12" />
      <path d="M18 20c1.5-1 2-2.5 2-4 0-2-1.5-3.5-3.5-3.5S13 14 13 16" />
    </svg>
  );
}

export function VirgoIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4v12c0 2 1 4 3 4" />
      <path d="M4 10c0-3 1.5-6 3-6s3 3 3 6v6c0 2 1 4 3 4" />
      <path d="M10 10c0-3 1.5-6 3-6s3 3 3 6v4" />
      <path d="M16 10c0-3 1.5-6 3-6" />
      <path d="M16 14c0 3 1 5 4 6" />
      <path d="M18 17l2 3" />
    </svg>
  );
}

export function LibraIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20h16" />
      <path d="M12 20V10" />
      <path d="M4 14c0-3 3.5-5 8-5s8 2 8 5" />
      <path d="M8 6a4 4 0 1 0 8 0" />
    </svg>
  );
}

export function ScorpioIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4v12c0 2 1 4 3 4" />
      <path d="M4 10c0-3 1.5-6 3-6s3 3 3 6v6c0 2 1 4 3 4" />
      <path d="M10 10c0-3 1.5-6 3-6s3 3 3 6v6c0 2 1.5 4 4 4" />
      <path d="M20 20l2-2" />
      <path d="M20 16l2 2" />
    </svg>
  );
}

export function SagittariusIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20L20 4" />
      <path d="M13 4h7v7" />
      <path d="M8 12l4 4" />
      <path d="M12 8l4 4" />
    </svg>
  );
}

export function CapricornIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 8c0-2 1.5-4 3.5-4S11 6 11 8v8c0 2.5 1.5 4 4 4" />
      <circle cx="18" cy="17" r="3" />
      <path d="M11 12c2 0 4 1.5 4 4" />
    </svg>
  );
}

export function AquariusIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9l3 2 3-2 3 2 3-2 3 2 3-2" />
      <path d="M3 15l3 2 3-2 3 2 3-2 3 2 3-2" />
    </svg>
  );
}

export function PiscesIcon({ size = 24, ...props }: ZodiacIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12h18" />
      <path d="M6 4c-2 3-2 5-2 8s0 5 2 8" />
      <path d="M18 4c2 3 2 5 2 8s0 5-2 8" />
    </svg>
  );
}

export const zodiacIcons = {
  aries: AriesIcon,
  taurus: TaurusIcon,
  gemini: GeminiIcon,
  cancer: CancerIcon,
  leo: LeoIcon,
  virgo: VirgoIcon,
  libra: LibraIcon,
  scorpio: ScorpioIcon,
  sagittarius: SagittariusIcon,
  capricorn: CapricornIcon,
  aquarius: AquariusIcon,
  pisces: PiscesIcon,
} as const;

export type ZodiacSignKey = keyof typeof zodiacIcons;

export function ZodiacIcon({ sign, ...props }: { sign: ZodiacSignKey } & ZodiacIconProps) {
  const Icon = zodiacIcons[sign];
  return <Icon {...props} />;
}
