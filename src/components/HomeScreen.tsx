import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { ExploreMode, GalleryCategory, ScreenTab } from '../types/space';
import { VERIFIED_NASA_ASSETS } from '../data/nasaData';
import {
  CosmicStarburstCardIcon,
  GalaxySpiralCardIcon,
  NasaDataBarsCardIcon,
  RingedPlanetCardIcon,
} from './NasaInsignia';

interface HomeScreenProps {
  onStartExploring: () => void;
  onNavigateExploreMode: (mode: ExploreMode, objectId?: string) => void;
  onNavigateGalleryCategory: (cat: GalleryCategory) => void;
  onNavigateTab: (tab: ScreenTab) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartExploring,
  onNavigateExploreMode,
  onNavigateGalleryCategory,
  onNavigateTab,
}) => {
  const [earthImgError, setEarthImgError] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<'shield' | 'bus' | 'solar' | null>(null);

  return (
    <section className="relative flex-1 flex flex-col justify-between px-5 sm:px-9 lg:px-14 pt-6 pb-8 overflow-hidden min-h-[680px] lg:min-h-[760px]">
      {/* Cosmic & Orbital Background Stage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Distant Shadowed Planet X Sphere in Upper Center Sky */}
        <div className="hidden sm:block absolute left-[49%] top-[13%] w-16 h-16 lg:w-20 lg:h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_18px_rgba(46,150,245,0.28)]">
            <defs>
              <radialGradient id="planetXShadow" cx="76%" cy="42%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#2E96F5" />
                <stop offset="65%" stopColor="#0042A6" />
                <stop offset="100%" stopColor="#07173F" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="url(#planetXShadow)" />
            {/* Subtle Crater Detail */}
            <ellipse cx="64" cy="36" rx="7" ry="5" fill="#0042A6" opacity="0.45" />
            <ellipse cx="72" cy="56" rx="9" ry="6" fill="#07173F" opacity="0.5" />
            <ellipse cx="55" cy="66" rx="6" ry="4" fill="#07173F" opacity="0.55" />
            <path
              d="M 50 6 A 44 44 0 0 1 50 94 A 38 44 0 0 0 50 6 Z"
              fill="#FFFFFF"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Sweeping Illuminated Earth Limb Horizon */}
        <div className="absolute -bottom-[420px] sm:-bottom-[520px] lg:-bottom-[610px] -right-[220px] sm:-right-[180px] lg:-right-[140px] w-[880px] sm:w-[1160px] lg:w-[1380px] h-[680px] sm:h-[820px] lg:h-[940px] rounded-[100%] border-t-2 border-[#FFFFFF]/80 shadow-[0_-24px_85px_rgba(46,150,245,0.5),0_-6px_26px_rgba(255,255,255,0.6),inset_0_24px_65px_rgba(46,150,245,0.65)] overflow-hidden bg-gradient-to-b from-[#2E96F5] via-[#0960E1] to-[#07173F]">
          {!earthImgError && (
            <img
              src={VERIFIED_NASA_ASSETS.earthLimbBlue}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setEarthImgError(true)}
              className="w-full h-full object-cover object-top opacity-85 scale-110 mix-blend-lighten"
            />
          )}
          {/* Atmospheric Scattering Gradient strictly using approved Blues */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#07173F] via-[#0042A6]/55 to-[#2E96F5]/30" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#07173F] via-[#07173F]/85 to-transparent" />
        </div>
      </div>

      {/* Main Hero Grid: Left Copy + Right SPHEREx Spacecraft */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto py-4 lg:py-6">
        {/* Left Hero Column */}
        <div className="lg:col-span-6 max-w-xl">
          <h1 className="font-display italic font-black text-4xl sm:text-6xl lg:text-[66px] leading-[1.05] tracking-tight text-[#FFFFFF] drop-shadow-[0_4px_24px_rgba(7,23,63,0.75)]">
            Planet X and
            <br />
            SPHEREx
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#FFFFFF]/90 max-w-lg drop-shadow-[0_2px_12px_rgba(7,23,63,0.75)]">
            Explore the mysteries of the universe through advanced space observation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartExploring}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#2E96F5] bg-gradient-to-r from-[#07173F]/95 via-[#0960E1]/85 to-[#0042A6]/95 text-[#FFFFFF] font-semibold text-base sm:text-[17px] whitespace-nowrap shrink-0 shadow-[0_0_28px_rgba(9,96,225,0.6),inset_0_0_18px_rgba(46,150,245,0.4)] hover:border-[#FFFFFF] hover:shadow-[0_0_38px_rgba(46,150,245,0.85),inset_0_0_24px_rgba(46,150,245,0.6)] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5]"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5 text-[#EAFE07] transition-transform duration-150 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab(ScreenTab.About)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#FFFFFF]/90 hover:text-[#FFFFFF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#2E96F5]" />
              <span>Mission Architecture</span>
            </button>
          </div>
        </div>

        {/* Right Hero Column: High-Detail SPHEREx Observatory Illustration */}
        <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[540px] aspect-[11/9] select-none">
            <svg
              viewBox="0 0 620 500"
              className="w-full h-full drop-shadow-[0_22px_45px_rgba(7,23,63,0.9)]"
              role="img"
              aria-label="NASA SPHEREx Space Observatory in Low-Earth Orbit"
            >
              <defs>
                {/* Metallic Blue-White Shield Facet Gradients */}
                <linearGradient id="shieldFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#2E96F5" />
                  <stop offset="100%" stopColor="#0042A6" />
                </linearGradient>
                <linearGradient id="shieldFacetMid" x1="0%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#2E96F5" />
                  <stop offset="50%" stopColor="#0960E1" />
                  <stop offset="100%" stopColor="#07173F" />
                </linearGradient>
                <linearGradient id="shieldFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0960E1" />
                  <stop offset="55%" stopColor="#0042A6" />
                  <stop offset="100%" stopColor="#07173F" />
                </linearGradient>
                <linearGradient id="shieldGoldRim" x1="0%" y1="20%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#EAFE07" />
                  <stop offset="50%" stopColor="#E43700" />
                  <stop offset="100%" stopColor="#8E1100" />
                </linearGradient>
                <linearGradient id="kaptonFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAFE07" />
                  <stop offset="50%" stopColor="#E43700" />
                  <stop offset="100%" stopColor="#8E1100" />
                </linearGradient>
                <linearGradient id="solarPanelCell" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0042A6" />
                  <stop offset="55%" stopColor="#07173F" />
                  <stop offset="100%" stopColor="#07173F" />
                </linearGradient>
                <radialGradient id="innerConeShadow" cx="46%" cy="55%" r="55%">
                  <stop offset="0%" stopColor="#07173F" />
                  <stop offset="68%" stopColor="#0042A6" />
                  <stop offset="92%" stopColor="#E43700" />
                  <stop offset="100%" stopColor="#EAFE07" />
                </radialGradient>
              </defs>

              {/* Tilted Observatory Assembly */}
              <g transform="translate(320, 265) rotate(22) translate(-310, -255)">
                {/* LEFT SOLAR ARRAY WING */}
                <g
                  onClick={() => setActiveHotspot(activeHotspot === 'solar' ? null : 'solar')}
                  className="cursor-pointer"
                >
                  <line x1="235" y1="305" x2="195" y2="305" stroke="#FFFFFF" strokeWidth="5" />
                  <polygon
                    points="42,262 202,268 198,354 38,348"
                    fill="url(#solarPanelCell)"
                    stroke="#2E96F5"
                    strokeWidth="2.2"
                  />
                  <line x1="74" y1="263" x2="70" y2="349" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="106" y1="264" x2="102" y2="350" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="138" y1="265" x2="134" y2="351" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="170" y1="267" x2="166" y2="353" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="40" y1="291" x2="201" y2="297" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
                  <line x1="39" y1="320" x2="200" y2="326" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
                </g>

                {/* RIGHT SOLAR ARRAY WING */}
                <g
                  onClick={() => setActiveHotspot(activeHotspot === 'solar' ? null : 'solar')}
                  className="cursor-pointer"
                >
                  <line x1="378" y1="305" x2="416" y2="305" stroke="#FFFFFF" strokeWidth="5" />
                  <polygon
                    points="412,268 574,262 578,348 416,354"
                    fill="url(#solarPanelCell)"
                    stroke="#2E96F5"
                    strokeWidth="2.2"
                  />
                  <line x1="444" y1="267" x2="448" y2="353" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="476" y1="265" x2="480" y2="351" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="508" y1="264" x2="512" y2="350" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="540" y1="263" x2="544" y2="349" stroke="#2E96F5" strokeOpacity="0.45" strokeWidth="1.1" />
                  <line x1="413" y1="297" x2="575" y2="291" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
                  <line x1="415" y1="326" x2="577" y2="320" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
                </g>

                {/* KAPTON MLI SPACECRAFT BUS & BIPOD STRUTS */}
                <g
                  onClick={() => setActiveHotspot(activeHotspot === 'bus' ? null : 'bus')}
                  className="cursor-pointer"
                >
                  <polygon
                    points="242,278 376,278 390,356 228,356"
                    fill="url(#kaptonFoil)"
                    stroke="#EAFE07"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="262,286 356,286 362,348 256,348"
                    fill="#07173F"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                  />
                  <polygon
                    points="274,294 316,294 312,338 270,338"
                    fill="url(#kaptonFoil)"
                    opacity="0.9"
                  />
                  <ellipse cx="309" cy="368" rx="36" ry="10" fill="#0042A6" stroke="#FFFFFF" strokeWidth="1.4" />
                  <rect x="266" y="366" width="12" height="16" rx="2" fill="#2E96F5" />
                  <rect x="340" y="366" width="12" height="16" rx="2" fill="#2E96F5" />
                  <circle cx="342" cy="316" r="9" fill="#07173F" stroke="#FFFFFF" strokeWidth="2" />
                </g>

                {/* ICONIC CONICAL NESTED PHOTON SHIELDS */}
                <g
                  onClick={() => setActiveHotspot(activeHotspot === 'shield' ? null : 'shield')}
                  className="cursor-pointer"
                >
                  <ellipse
                    cx="310"
                    cy="112"
                    rx="178"
                    ry="52"
                    fill="url(#innerConeShadow)"
                    stroke="url(#shieldGoldRim)"
                    strokeWidth="3.5"
                  />
                  <ellipse
                    cx="310"
                    cy="118"
                    rx="144"
                    ry="39"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeOpacity="0.65"
                    strokeWidth="1.8"
                  />
                  <ellipse
                    cx="310"
                    cy="124"
                    rx="108"
                    ry="27"
                    fill="#07173F"
                    stroke="#EAFE07"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                  />
                  <ellipse
                    cx="310"
                    cy="130"
                    rx="46"
                    ry="14"
                    fill="#07173F"
                    stroke="#2E96F5"
                    strokeOpacity="0.85"
                    strokeWidth="1.6"
                  />

                  <polygon
                    points="132,112 174,142 232,278 214,268"
                    fill="url(#shieldFacetLight)"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                  <polygon
                    points="174,142 238,158 266,282 232,278"
                    fill="url(#shieldFacetMid)"
                    stroke="#2E96F5"
                    strokeWidth="1"
                  />
                  <polygon
                    points="238,158 310,164 310,285 266,282"
                    fill="url(#shieldFacetLight)"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                  <polygon
                    points="310,164 382,158 354,282 310,285"
                    fill="url(#shieldFacetDark)"
                    stroke="#2E96F5"
                    strokeWidth="1"
                  />
                  <polygon
                    points="382,158 446,142 388,278 354,282"
                    fill="url(#shieldFacetMid)"
                    stroke="#2E96F5"
                    strokeWidth="1"
                  />
                  <polygon
                    points="446,142 488,112 406,268 388,278"
                    fill="url(#shieldGoldRim)"
                    stroke="#EAFE07"
                    strokeWidth="1.2"
                  />

                  <path
                    d="M 164 172 Q 310 214 456 172"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeOpacity="0.6"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M 194 226 Q 310 258 426 226"
                    fill="none"
                    stroke="#2E96F5"
                    strokeOpacity="0.7"
                    strokeWidth="1.3"
                  />
                </g>
              </g>
            </svg>

            {/* Interactive Subsystem Readout */}
            {activeHotspot && (
              <div className="absolute bottom-2 left-4 right-4 rounded-xl border border-[#2E96F5]/70 bg-[#07173F]/95 px-4 py-3 text-xs text-[#FFFFFF] shadow-xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[#EAFE07]">
                    {activeHotspot === 'shield' && 'Nested Conical Photon Shields (< 80 K Passive Cryo)'}
                    {activeHotspot === 'bus' && '3-Axis Attitude Spacecraft Bus & 102-Band Focal Plane'}
                    {activeHotspot === 'solar' && 'Sun-Terminator Rigid Photovoltaic Wings (780 W)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(null)}
                    className="text-[#FFFFFF]/70 hover:text-[#FFFFFF] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <p className="mt-1 text-[#FFFFFF]/85 leading-relaxed">
                  {activeHotspot === 'shield' &&
                    'Three nested aluminum cones block solar and terrestrial infrared heat so SPHEREx surveys 0.75–5.0 μm without liquid helium.'}
                  {activeHotspot === 'bus' &&
                    'Houses the 20 cm all-aluminum telescope, dichroic beam splitter, and 6 HgCdTe Linear Variable Filter arrays.'}
                  {activeHotspot === 'solar' &&
                    'Orbits continuously along Earth’s dawn-dusk terminator at 650 km altitude for uninterrupted power and thermal stability.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom 4 Interactive Feature Cards */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 pt-4">
        <button
          type="button"
          onClick={() => onNavigateExploreMode(ExploreMode.PlanetXOrbit, 'planet-x-candidate')}
          className="group flex items-center gap-4 rounded-2xl border border-[#2E96F5]/45 bg-[#07173F]/80 hover:bg-[#0042A6]/85 hover:border-[#2E96F5] px-5 py-4 sm:py-5 text-left shadow-[0_8px_30px_rgba(7,23,63,0.7),inset_0_1px_12px_rgba(46,150,245,0.2)] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5]"
        >
          <div className="transition-transform duration-150 group-hover:scale-105">
            <RingedPlanetCardIcon />
          </div>
          <span className="text-[15px] sm:text-base font-medium leading-snug text-[#FFFFFF]">
            Discover
            <br />
            Celestial Objects
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateGalleryCategory('Galaxies')}
          className="group flex items-center gap-4 rounded-2xl border border-[#2E96F5]/45 bg-[#07173F]/80 hover:bg-[#0042A6]/85 hover:border-[#2E96F5] px-5 py-4 sm:py-5 text-left shadow-[0_8px_30px_rgba(7,23,63,0.7),inset_0_1px_12px_rgba(46,150,245,0.2)] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5]"
        >
          <div className="transition-transform duration-150 group-hover:scale-105">
            <GalaxySpiralCardIcon />
          </div>
          <span className="text-[15px] sm:text-base font-medium leading-snug text-[#FFFFFF]">
            Explore Galaxy
            <br />
            in High Detail
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateExploreMode(ExploreMode.Phenomena)}
          className="group flex items-center gap-4 rounded-2xl border border-[#2E96F5]/45 bg-[#07173F]/80 hover:bg-[#0042A6]/85 hover:border-[#2E96F5] px-5 py-4 sm:py-5 text-left shadow-[0_8px_30px_rgba(7,23,63,0.7),inset_0_1px_12px_rgba(46,150,245,0.2)] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5]"
        >
          <div className="transition-transform duration-150 group-hover:scale-105">
            <CosmicStarburstCardIcon />
          </div>
          <span className="text-[15px] sm:text-base font-medium leading-snug text-[#FFFFFF]">
            Track Cosmic
            <br />
            Phenomena
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab(ScreenTab.Data)}
          className="group flex items-center gap-4 rounded-2xl border border-[#2E96F5]/45 bg-[#07173F]/80 hover:bg-[#0042A6]/85 hover:border-[#2E96F5] px-5 py-4 sm:py-5 text-left shadow-[0_8px_30px_rgba(7,23,63,0.7),inset_0_1px_12px_rgba(46,150,245,0.2)] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5]"
        >
          <div className="transition-transform duration-150 group-hover:scale-105">
            <NasaDataBarsCardIcon />
          </div>
          <span className="text-[15px] sm:text-base font-medium leading-snug text-[#FFFFFF]">
            Learn with
            <br />
            NASA Data
          </span>
        </button>
      </div>
    </section>
  );
};
