import React, { useState } from 'react';
import { VERIFIED_NASA_ASSETS } from '../data/nasaData';

export function NasaMeatballLogo({ className = 'w-12 h-12' }: { className?: string }) {
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
      <circle cx="60" cy="60" r="50" fill="url(#nasaBlueSphere)" stroke="#2E96F5" strokeWidth="1.2" strokeOpacity="0.6" />

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
      <path d="M40 36 L41 39 L44 40 L41 41 L40 44 L39 41 L36 40 L39 39 Z" fill="#FFFFFF" />
      <path d="M68 83 L68.8 85.2 L71 86 L68.8 86.8 L68 89 L67.2 86.8 L65 86 L67.2 85.2 Z" fill="#FFFFFF" />

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
    <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="planetBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E96F5" />
          <stop offset="55%" stopColor="#0960E1" />
          <stop offset="100%" stopColor="#0042A6" />
        </linearGradient>
        <linearGradient id="planetRingGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#2E96F5" />
          <stop offset="100%" stopColor="#0960E1" />
        </linearGradient>
      </defs>
      {/* Back Ring */}
      <ellipse
        cx="32"
        cy="33"
        rx="26"
        ry="8.5"
        transform="rotate(-24 32 33)"
        fill="none"
        stroke="url(#planetRingGrad)"
        strokeWidth="3.2"
        opacity="0.7"
      />
      {/* Planet Sphere */}
      <circle cx="32" cy="32" r="14.5" fill="url(#planetBodyGrad)" />
      {/* Front Ring Arc */}
      <path
        d="M 9 43 C 18 50, 46 37, 55 23"
        fill="none"
        stroke="#2E96F5"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="27" cy="26" r="3" fill="#FFFFFF" opacity="0.55" />
    </svg>
  );
}

export function GalaxySpiralCardIcon() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-14 h-12 shrink-0 flex items-center justify-center rounded-lg overflow-hidden">
      {!failed ? (
        <img
          src={VERIFIED_NASA_ASSETS.hubbleSpiral}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-14 h-12 object-cover rounded-full scale-125 brightness-110 contrast-125"
        />
      ) : (
        <svg viewBox="0 0 64 52" className="w-14 h-12" aria-hidden="true">
          <defs>
            <radialGradient id="galCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#2E96F5" />
              <stop offset="75%" stopColor="#0960E1" />
              <stop offset="100%" stopColor="#07173F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="32" cy="26" rx="28" ry="15" transform="rotate(-18 32 26)" fill="url(#galCore)" />
          <path
            d="M32 26 C38 20, 48 21, 52 28 C46 35, 26 38, 14 30 C16 20, 28 15, 42 17"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-[#2E96F5]/30 bg-radial from-transparent via-transparent to-[#07173F]" />
    </div>
  );
}

export function CosmicStarburstCardIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#2E96F5" />
          <stop offset="100%" stopColor="#0960E1" />
        </linearGradient>
      </defs>
      {/* Main Star */}
      <path
        d="M30 10 L35.5 23.5 L50 25 L39 34.5 L42.2 48.5 L30 41 L17.8 48.5 L21 34.5 L10 25 L24.5 23.5 Z"
        fill="url(#starGrad)"
      />
      {/* Secondary Fragments */}
      <polygon points="48,44 53,46 50,51 46,48" fill="#2E96F5" />
      <polygon points="15,49 20,51 17,55 13,52" fill="#0960E1" />
      <circle cx="49" cy="17" r="2" fill="#FFFFFF" />
    </svg>
  );
}

export function NasaDataBarsCardIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2E96F5" />
          <stop offset="100%" stopColor="#0960E1" />
        </linearGradient>
      </defs>
      <rect x="13" y="37" width="9" height="15" rx="2" fill="url(#barGrad)" opacity="0.82" />
      <rect x="27" y="26" width="9" height="26" rx="2" fill="url(#barGrad)" opacity="0.92" />
      <rect x="41" y="14" width="9" height="38" rx="2" fill="url(#barGrad)" />
    </svg>
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
  className = 'w-full h-full object-cover',
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
