import { SVGProps } from "react";

export interface PlanetIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function SunIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function MercuryIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <circle cx="12" cy="10" r="5" />
      <path d="M12 15v6" />
      <path d="M9 18h6" />
      <path d="M8 3c0 1.5 1.5 3 4 3s4-1.5 4-3" />
    </svg>
  );
}

export function VenusIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <circle cx="12" cy="8" r="5" />
      <path d="M12 13v8" />
      <path d="M9 18h6" />
    </svg>
  );
}

export function MarsIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <circle cx="10" cy="14" r="6" />
      <path d="M14.5 9.5L21 3" />
      <path d="M16 3h5v5" />
    </svg>
  );
}

export function JupiterIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <path d="M7 4c4 0 7 2 7 5s-3 5-7 5" />
      <path d="M3 14h12" />
      <path d="M14 4v16" />
    </svg>
  );
}

export function SaturnIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <path d="M6 3h6" />
      <path d="M9 3v7" />
      <path d="M9 10c0 4 2 7 5 7" />
      <path d="M9 10c-3 0-5 3-5 7" />
      <circle cx="6" cy="19" r="2" />
    </svg>
  );
}

export function UranusIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <circle cx="12" cy="18" r="3" />
      <path d="M12 15V8" />
      <circle cx="12" cy="5" r="2" />
      <path d="M8 8h8" />
    </svg>
  );
}

export function NeptuneIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <path d="M12 3v18" />
      <path d="M8 21h8" />
      <path d="M5 7l7 5 7-5" />
      <path d="M8 6h8" />
    </svg>
  );
}

export function PlutoIcon({ size = 24, ...props }: PlanetIconProps) {
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
      <path d="M12 21V9" />
      <path d="M8 17h8" />
      <circle cx="12" cy="6" r="3" />
      <path d="M6 3c0 3 2.5 6 6 6s6-3 6-6" />
    </svg>
  );
}

export const planetIcons = {
  sun: SunIcon,
  moon: MoonIcon,
  mercury: MercuryIcon,
  venus: VenusIcon,
  mars: MarsIcon,
  jupiter: JupiterIcon,
  saturn: SaturnIcon,
  uranus: UranusIcon,
  neptune: NeptuneIcon,
  pluto: PlutoIcon,
} as const;

export type PlanetKey = keyof typeof planetIcons;

export function PlanetIcon({ planet, ...props }: { planet: PlanetKey } & PlanetIconProps) {
  const Icon = planetIcons[planet];
  return <Icon {...props} />;
}
