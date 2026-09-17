"use client";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

/**
 * Bespoke Architectural Geometric Monogram for Mahir ('M' + Delta Apex).
 * Designed according to Brandkit specifications with hairline precision facets,
 * metallic gradient stroke, and subtle edge luminescence.
 */
export default function BrandLogo({ size = 32, className = "" }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
      aria-label="Mahir Brand Mark"
    >
      <defs>
        {/* Metallic Platinum & Champagne Gradient */}
        <linearGradient id="logo-stroke-grad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#3DFCCA" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>

        {/* Ambient Emerald/Teal Glow */}
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Triangular Apex / Crest */}
      <path
        d="M24 6L6 38H14L24 20L34 38H42L24 6Z"
        stroke="url(#logo-stroke-grad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logo-glow)"
      />

      {/* Inner Architectural Diamond Facet */}
      <path
        d="M24 13L18 25L24 37L30 25L24 13Z"
        stroke="url(#logo-stroke-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central 'M' Chevron Bridge */}
      <path
        d="M14 38L24 23L34 38"
        stroke="url(#logo-stroke-grad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Core Precision Dot */}
      <circle cx="24" cy="25" r="1.5" fill="#3DFCCA" />
    </svg>
  );
}
