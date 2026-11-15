import React, { useState } from "react";
import {
  ChartBarIcon,
  PlanetIcon,
  SparkleIcon,
  SpiralIcon,
} from "@phosphor-icons/react";
export function NasaMeatballLogo({
  className = "w-12 h-12",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="NASA Insignia"
    >
      <defs>
        <radialGradient id="nasaBlueSphere" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#0960E1" />
          <stop offset="55%" stopColor="#0042A6" />
          <stop offset="100%" stopColor="#07173F" />
        </radialGradient>
      </defs>

      {/* Blue Sphere */}
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="url(#nasaBlueSphere)"
        stroke="#2c6bed"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />

      {/* Tiny Stars */}
      <circle cx="36" cy="31" r="1.3" fill="#FFFFFF" />
      <circle cx="46" cy="24" r="1.0" fill="#FFFFFF" opacity="0.85" />
      <circle cx="77" cy="28" r="1.4" fill="#FFFFFF" />
      <circle cx="86" cy="39" r="1.0" fill="#FFFFFF" opacity="0.8" />
      <circle cx="29" cy="79" r="1.2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="44" cy="91" r="1.5" fill="#FFFFFF" />
      <circle cx="76" cy="88" r="1.2" fill="#FFFFFF" />
      <circle cx="89" cy="75" r="1.0" fill="#FFFFFF" opacity="0.8" />
      {/* 4-point star sparkle */}
      <path
        d="M40 36 L41 39 L44 40 L41 41 L40 44 L39 41 L36 40 L39 39 Z"
        fill="#ffffff"
      />
      <path
        d="M68 83 L68.8 85.2 L71 86 L68.8 86.8 L68 89 L67.2 86.8 L65 86 L67.2 85.2 Z"
        fill="#ffffff"
      />

      {/* White Orbital Sweep (Back Arc) */}
      <path
        d="M 24 76 C 14 66, 38 35, 76 28 C 98 24, 96 48, 66 72"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.92"
      />

      {/* Rocket Red Vector Chevron (Lower Wing) */}
      <path
        d="M 12 78 C 36 60, 68 46, 110 20 C 78 46, 52 64, 30 85 C 49 71, 76 62, 104 61 C 74 67, 46 78, 22 93 Z"
        fill="#E43700"
      />

      {/* NASA Typography */}
      <text
        x="60"
        y="67"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="1.5"
      >
        NASA
      </text>

      {/* White Orbital Foreground Crossing */}
      <path
        d="M 66 72 C 47 87, 29 85, 24 76"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RingedPlanetCardIcon() {
  return (
    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/25">
      <PlanetIcon
        size={30}
        weight="duotone"
        className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]"
        aria-hidden="true"
      />
    </div>
  );
}

export function GalaxySpiralCardIcon() {
  return (
    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/25">
      <SpiralIcon
        size={30}
        weight="duotone"
        className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]"
        aria-hidden="true"
      />
    </div>
  );
}

export function CosmicStarburstCardIcon() {
  return (
    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/25">
      <SparkleIcon
        size={30}
        weight="duotone"
        className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]"
        aria-hidden="true"
      />
    </div>
  );
}

export function NasaDataBarsCardIcon() {
  return (
    <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/25">
      <ChartBarIcon
        size={30}
        weight="duotone"
        className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]"
        aria-hidden="true"
      />
    </div>
  );
}

interface ResilientNasaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientNasaImage: React.FC<ResilientNasaImageProps> = ({
  src,
  alt,
  className = "w-full h-full object-cover",
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0042A6] to-[#07173F] text-[#FFFFFF] p-4 text-center ${className}`}
      >
        <RingedPlanetCardIcon />
        <span className="mt-2 text-xs font-mono text-[#FFFFFF]/85">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
