import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { ExploreMode, ScreenTab } from '../types/space';
import { SPACECRAFT_SUBSYSTEMS, VERIFIED_NASA_ASSETS } from '../data/nasaData';
import { ResilientNasaImage } from './NasaInsignia';

interface AboutScreenProps {
  selectedSubsystemId: string;
  onSelectSubsystemId: (id: string) => void;
  onNavigateExploreMode: (mode: ExploreMode) => void;
  onNavigateTab: (tab: ScreenTab) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  selectedSubsystemId,
  onSelectSubsystemId,
  onNavigateExploreMode,
  onNavigateTab,
}) => {
  const activeSubsystem = useMemo(
    () =>
      SPACECRAFT_SUBSYSTEMS.find((s) => s.id === selectedSubsystemId) ||
      SPACECRAFT_SUBSYSTEMS[0],
    [selectedSubsystemId]
  );

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-8 lg:px-10 pt-3 pb-10 gap-8">
      {/* Header Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch border-b border-[#2E96F5]/25 pb-7">
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          <div>
            <div className="text-xs font-mono text-[#2E96F5]">
              NASA Medium-Class Explorer (MIDEX) · JPL-Caltech
            </div>
            <h1 className="mt-1.5 font-display text-2xl sm:text-4xl font-black text-[#FFFFFF] leading-tight">
              Mapping the Entire Sky in 102 Infrared Colors—From Cosmic Inflation to the Outer
              Solar System
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#FFFFFF]/80 leading-relaxed max-w-2xl">
              NASA’s <strong>SPHEREx</strong> (Spectro-Photometer for the History of the Universe,
              Epoch of Reionization and Ices Explorer) surveys the complete celestial sphere every
              six months. Unlike narrow-field flagships that study single targets in isolation,
              SPHEREx captures spectra for over 450 million galaxies, 100 million Milky Way stars,
              and moving outer solar system worlds—providing an unprecedented multi-epoch infrared
              dragnet for distant trans-Neptunian candidates including hypothetical{' '}
              <strong>Planet X</strong>.
            </p>
          </div>

          {/* Quantitative Mission Proof Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#2E96F5]/20">
            <div>
              <div className="text-2xl font-mono font-bold tabular-nums text-[#FFFFFF]">102</div>
              <div className="text-xs text-[#FFFFFF]/70 mt-0.5">Near-IR Color Channels</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold tabular-nums text-[#2E96F5]">4×</div>
              <div className="text-xs text-[#FFFFFF]/70 mt-0.5">Complete All-Sky Maps</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold tabular-nums text-[#FFFFFF]">450M+</div>
              <div className="text-xs text-[#FFFFFF]/70 mt-0.5">3D Galaxy Redshifts</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold tabular-nums text-[#EAFE07]">
                &lt; 80 K
              </div>
              <div className="text-xs text-[#FFFFFF]/70 mt-0.5">Passive Cryo Optics</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-xl overflow-hidden border border-[#2E96F5]/40 bg-[#07173F] relative min-h-[250px]">
          <ResilientNasaImage
            src={VERIFIED_NASA_ASSETS.spherexPerspective}
            alt="NASA SPHEREx All-Sky Orbital Concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07173F] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-[#FFFFFF]">
            NASA / JPL-Caltech · PIA26532 Orbital Survey Geometry
          </div>
        </div>
      </div>

      {/* Interactive Spacecraft Subsystem Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 rounded-xl border border-[#2E96F5]/35 bg-[#07173F]/85 p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#FFFFFF]">
              Interactive Observatory Anatomy
            </h2>
            <p className="mt-1 text-xs text-[#FFFFFF]/70">
              Select a node on the diagram or subsystem list to inspect flight hardware parameters.
            </p>
          </div>

          <svg
            viewBox="0 0 500 370"
            className="w-full h-auto my-3 select-none"
            role="img"
            aria-label="SPHEREx Spacecraft Cross-Section Schematic"
          >
            {/* Outer, Middle, Inner Conical Shields */}
            <polygon
              points="85,82 415,82 325,248 175,248"
              fill="#0042A6"
              fillOpacity="0.65"
              stroke="#2E96F5"
              strokeWidth="1.5"
            />
            <polygon
              points="122,95 378,95 308,236 192,236"
              fill="#07173F"
              stroke="#FFFFFF"
              strokeOpacity="0.6"
              strokeDasharray="4 3"
              strokeWidth="1.2"
            />
            <polygon
              points="160,108 340,108 292,226 208,226"
              fill="#07173F"
              stroke="#EAFE07"
              strokeOpacity="0.8"
              strokeWidth="1.3"
            />

            {/* Central All-Aluminum Telescope & Focal Plane */}
            <rect
              x="222"
              y="148"
              width="56"
              height="94"
              rx="6"
              fill="#0960E1"
              fillOpacity="0.55"
              stroke="#2E96F5"
              strokeWidth="1.6"
            />
            <line x1="228" y1="212" x2="272" y2="232" stroke="#EAFE07" strokeWidth="2" />

            {/* Lower Bus & Solar Wings */}
            <rect
              x="192"
              y="252"
              width="116"
              height="68"
              rx="6"
              fill="#8E1100"
              fillOpacity="0.8"
              stroke="#E43700"
              strokeWidth="1.5"
            />
            <rect
              x="44"
              y="252"
              width="136"
              height="32"
              rx="3"
              fill="#0042A6"
              stroke="#2E96F5"
              strokeWidth="1.4"
            />
            <rect
              x="320"
              y="252"
              width="136"
              height="32"
              rx="3"
              fill="#0042A6"
              stroke="#2E96F5"
              strokeWidth="1.4"
            />

            {/* Interactive Subsystem Nodes */}
            {SPACECRAFT_SUBSYSTEMS.map((sub) => {
              const isSelected = sub.id === activeSubsystem.id;
              return (
                <g
                  key={sub.id}
                  onClick={() => onSelectSubsystemId(sub.id)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={sub.svgX}
                      cy={sub.svgY}
                      r="16"
                      fill="#EAFE07"
                      fillOpacity="0.22"
                      stroke="#EAFE07"
                      strokeWidth="1.5"
                    />
                  )}
                  <circle
                    cx={sub.svgX}
                    cy={sub.svgY}
                    r="7.5"
                    fill={isSelected ? '#EAFE07' : '#0960E1'}
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                  />
                </g>
              );
            })}
          </svg>

          <div className="flex flex-wrap gap-1.5">
            {SPACECRAFT_SUBSYSTEMS.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectSubsystemId(sub.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  sub.id === activeSubsystem.id
                    ? 'bg-[#0960E1]/75 text-[#FFFFFF] border border-[#2E96F5]'
                    : 'bg-[#0042A6]/45 text-[#FFFFFF]/80 hover:text-[#FFFFFF] border border-[#2E96F5]/25'
                }`}
              >
                {sub.code}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Subsystem Detail + Four Core Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="rounded-xl border border-[#2E96F5]/40 bg-[#07173F]/85 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#2E96F5]">
              <span>SUBSYSTEM {activeSubsystem.code}</span>
              <span>OPERATING REGIME: {activeSubsystem.operatingTemp}</span>
            </div>
            <h3 className="mt-1.5 text-xl font-bold text-[#FFFFFF]">{activeSubsystem.name}</h3>
            <div className="mt-1 text-xs font-mono text-[#FFFFFF]/65">
              {activeSubsystem.massOrSpec}
            </div>
            <p className="mt-3 text-sm text-[#FFFFFF]/90 leading-relaxed">
              {activeSubsystem.summary}
            </p>
            <p className="mt-2 text-sm text-[#FFFFFF]/75 leading-relaxed">
              {activeSubsystem.engineeringDetail}
            </p>
          </div>

          {/* Editorial Numbered Science Chapters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#2E96F5]/30 bg-[#07173F]/80 p-5">
              <h4 className="text-sm font-semibold text-[#FFFFFF]">01. Cosmic Inflation Physics</h4>
              <p className="mt-1.5 text-xs text-[#FFFFFF]/80 leading-relaxed">
                Maps 3D positions of 450M+ galaxies to test quantum fluctuations during the first
                billionth of a trillionth of a trillionth of a second after the Big Bang.
              </p>
            </div>
            <div className="rounded-xl border border-[#2E96F5]/30 bg-[#07173F]/80 p-5">
              <h4 className="text-sm font-semibold text-[#FFFFFF]">02. Interstellar Water & Ices</h4>
              <p className="mt-1.5 text-xs text-[#FFFFFF]/80 leading-relaxed">
                Surveys over 9 million stellar sightlines in the Milky Way for frozen water, CO₂,
                CO, and methanol—the raw chemical ingredients of habitable planets.
              </p>
            </div>
            <div className="rounded-xl border border-[#2E96F5]/30 bg-[#07173F]/80 p-5">
              <h4 className="text-sm font-semibold text-[#FFFFFF]">
                03. Planet X & Outer Kuiper Survey
              </h4>
              <p className="mt-1.5 text-xs text-[#FFFFFF]/80 leading-relaxed">
                Four full-sky infrared epochs separated by six-month parallax baselines reveal slow
                astrometric motion and methane features of ultra-distant solar system worlds.
              </p>
            </div>
            <div className="rounded-xl border border-[#2E96F5]/30 bg-[#07173F]/80 p-5 flex flex-col justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-[#FFFFFF]">
                  04. First Stars & Reionization
                </h4>
                <p className="mt-1.5 text-xs text-[#FFFFFF]/80 leading-relaxed">
                  Deep ecliptic pole mosaics measure the cumulative glow of every galaxy formed
                  since cosmic dawn.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigateExploreMode(ExploreMode.PlanetXOrbit)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E96F5] hover:text-[#FFFFFF] cursor-pointer"
                >
                  <span>Launch Planet X Orbit Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span aria-hidden="true" className="text-[#FFFFFF]/40">·</span>
                <button
                  type="button"
                  onClick={() => onNavigateTab(ScreenTab.Data)}
                  className="text-xs font-semibold text-[#2E96F5] hover:text-[#FFFFFF] cursor-pointer"
                >
                  Open Spectral Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
