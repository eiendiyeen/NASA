import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Download, RotateCcw } from 'lucide-react';
import { DETECTOR_BANDS, SPECTRAL_TARGETS } from '../data/nasaData';
import { SpectralTarget } from '../types/space';

interface DataScreenProps {
  selectedSpectralId: string;
  onSelectSpectralId: (id: string) => void;
}

export const DataScreen: React.FC<DataScreenProps> = ({
  selectedSpectralId,
  onSelectSpectralId,
}) => {
  const activeTarget: SpectralTarget = useMemo(
    () =>
      SPECTRAL_TARGETS.find((t) => t.id === selectedSpectralId) || SPECTRAL_TARGETS[0],
    [selectedSpectralId]
  );

  const [redshiftOffset, setRedshiftOffset] = useState<number>(0);
  const [hoveredChannelIdx, setHoveredChannelIdx] = useState<number>(54);
  const [sortColumn, setSortColumn] = useState<'bandNumber' | 'resolvingPower' | 'sensitivityAbMag'>('bandNumber');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const effectiveRedshift = Number(
    Math.max(0, activeTarget.defaultRedshift + redshiftOffset).toFixed(2)
  );

  // Compute redshifted spectrum across 0.75 - 5.00 um
  const shiftedSpectrum = useMemo(() => {
    const scaleFactor = (1 + effectiveRedshift) / (1 + activeTarget.defaultRedshift);
    return activeTarget.baseFluxPoints.map((pt, idx) => {
      const restEquivalentW = pt.wavelength / scaleFactor;
      let nearest = activeTarget.baseFluxPoints[0];
      let bestDist = Math.abs(nearest.wavelength - restEquivalentW);
      for (const candidate of activeTarget.baseFluxPoints) {
        const d = Math.abs(candidate.wavelength - restEquivalentW);
        if (d < bestDist) {
          bestDist = d;
          nearest = candidate;
        }
      }
      return {
        channel: idx + 1,
        wavelength: pt.wavelength,
        flux: nearest.flux,
        modelFlux: nearest.modelFlux,
      };
    });
  }, [activeTarget, effectiveRedshift]);

  const maxFlux = useMemo(
    () => Math.max(100, ...shiftedSpectrum.map((p) => Math.max(p.flux, p.modelFlux))) * 1.12,
    [shiftedSpectrum]
  );

  const chartLeft = 64;
  const chartRight = 890;
  const chartTop = 28;
  const chartBottom = 272;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;

  const toSvgX = (w: number) => chartLeft + ((w - 0.75) / (5.0 - 0.75)) * chartWidth;
  const toSvgY = (flux: number) => chartBottom - (flux / maxFlux) * chartHeight;

  const modelPathD = useMemo(
    () =>
      shiftedSpectrum
        .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(pt.wavelength).toFixed(1)} ${toSvgY(pt.modelFlux).toFixed(1)}`)
        .join(' '),
    [shiftedSpectrum, maxFlux]
  );

  const obsPathD = useMemo(
    () =>
      shiftedSpectrum
        .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(pt.wavelength).toFixed(1)} ${toSvgY(pt.flux).toFixed(1)}`)
        .join(' '),
    [shiftedSpectrum, maxFlux]
  );

  const areaPathD = `${obsPathD} L ${chartRight} ${chartBottom} L ${chartLeft} ${chartBottom} Z`;

  const probedPoint = shiftedSpectrum[hoveredChannelIdx] || shiftedSpectrum[0];

  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 920;
    const clampedRatio = Math.max(0, Math.min(1, (svgX - chartLeft) / chartWidth));
    const idx = Math.round(clampedRatio * (shiftedSpectrum.length - 1));
    setHoveredChannelIdx(idx);
  };

  const handleDownloadCsv = () => {
    const header = 'channel,wavelength_um,observed_flux,theoretical_model_flux,unit\n';
    const rows = shiftedSpectrum
      .map(
        (r) =>
          `${r.channel},${r.wavelength.toFixed(3)},${r.flux.toFixed(3)},${r.modelFlux.toFixed(3)},${activeTarget.fluxUnit}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spherex_spectrum_${activeTarget.id}_z${effectiveRedshift}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sortedBands = useMemo(() => {
    return [...DETECTOR_BANDS].sort((a, b) => {
      const diff = a[sortColumn] - b[sortColumn];
      return sortAsc ? diff : -diff;
    });
  }, [sortColumn, sortAsc]);

  const toggleSort = (col: 'bandNumber' | 'resolvingPower' | 'sensitivityAbMag') => {
    if (sortColumn === col) {
      setSortAsc((prev) => !prev);
    } else {
      setSortColumn(col);
      setSortAsc(true);
    }
  };

  // Radar Calibration Polygon Points (6 vertices)
  const radarCenter = 140;
  const radarRadius = 92;
  const radarPolygon = useMemo(() => {
    return DETECTOR_BANDS.map((b, idx) => {
      const angle = (Math.PI * 2 * idx) / 6 - Math.PI / 2;
      const normalized = 0.45 + (b.resolvingPower / 140) * 0.52;
      const x = radarCenter + Math.cos(angle) * radarRadius * normalized;
      const y = radarCenter + Math.sin(angle) * radarRadius * normalized;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }, []);

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-8 lg:px-10 pt-3 pb-10 gap-6">
      {/* Top Calibration & Export Bar */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#2E96F5]/25 pb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#FFFFFF]">
            SPHEREx 102-Channel Near-Infrared Data Lab
          </h1>
          <p className="mt-1 text-sm text-[#FFFFFF]/80 max-w-2xl">
            Inspect contiguous 0.75 – 5.00 μm Linear Variable Filter spectrophotometry, redshift
            line displacement, and molecular ice absorption profiles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadCsv}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0960E1]/75 hover:bg-[#0960E1] border border-[#2E96F5] text-xs sm:text-sm font-medium text-[#FFFFFF] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#FFFFFF]" />
          <span>Download CSV</span>
        </button>
      </div>

      {/* Target Selector Buttons + Redshift Simulator */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#07173F]/85 border border-[#2E96F5]/35">
          {SPECTRAL_TARGETS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                onSelectSpectralId(t.id);
                setRedshiftOffset(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                t.id === activeTarget.id
                  ? 'bg-[#0960E1]/75 text-[#FFFFFF] border border-[#2E96F5]'
                  : 'text-[#FFFFFF]/75 hover:text-[#FFFFFF]'
              }`}
            >
              {t.name.split(' (')[0]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#07173F]/85 border border-[#2E96F5]/35 px-3.5 py-2 text-xs">
          <label htmlFor="redshiftRange" className="font-mono text-[#FFFFFF]/85 whitespace-nowrap">
            REDSHIFT (z):{' '}
            <strong className="text-[#EAFE07] tabular-nums">{effectiveRedshift.toFixed(2)}</strong>
          </label>
          <input
            id="redshiftRange"
            type="range"
            min={-0.2}
            max={1.8}
            step={0.05}
            value={redshiftOffset}
            onChange={(e) => setRedshiftOffset(Number(e.target.value))}
            className="w-32 accent-[#2E96F5] cursor-pointer"
          />
          <button
            type="button"
            onClick={() => setRedshiftOffset(0)}
            className="inline-flex items-center gap-1 text-[#FFFFFF]/70 hover:text-[#FFFFFF] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Curve Spectrophotometer Card */}
      <div className="rounded-xl border border-[#2E96F5]/35 bg-[#07173F]/85 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#FFFFFF]">{activeTarget.name}</h2>
            <p className="text-xs text-[#FFFFFF]/70">{activeTarget.subtitle}</p>
          </div>

          {/* Live Probed Channel Readout */}
          <div className="flex items-center gap-5 rounded-lg bg-[#07173F] border border-[#2E96F5]/40 px-4 py-2 font-mono tabular-nums">
            <div>
              <div className="text-[10px] uppercase text-[#FFFFFF]/65">Channel</div>
              <div className="text-sm font-bold text-[#FFFFFF]">#{probedPoint.channel} / 102</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-[#FFFFFF]/65">Wavelength</div>
              <div className="text-sm font-bold text-[#2E96F5]">
                {probedPoint.wavelength.toFixed(3)} <span className="text-[11px] text-[#FFFFFF]/65">μm</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-[#FFFFFF]/65">Observed Flux</div>
              <div className="text-sm font-bold text-[#EAFE07]">
                {probedPoint.flux.toFixed(2)}{' '}
                <span className="text-[11px] text-[#FFFFFF]/65">{activeTarget.fluxUnit}</span>
              </div>
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 920 315"
          onMouseMove={handleChartMouseMove}
          className="w-full h-auto cursor-crosshair select-none"
          role="img"
          aria-label="SPHEREx 102-Channel Near-Infrared Spectrophotometric Curve"
        >
          <defs>
            <linearGradient id="specAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E96F5" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#0042A6" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Horizontal Flux Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const y = chartBottom - frac * chartHeight;
            const val = (frac * maxFlux).toFixed(0);
            return (
              <g key={frac}>
                <line
                  x1={chartLeft}
                  y1={y}
                  x2={chartRight}
                  y2={y}
                  stroke="#0960E1"
                  strokeOpacity="0.45"
                  strokeDasharray={frac === 0 ? undefined : '4 4'}
                />
                <text
                  x={chartLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#FFFFFF"
                  fillOpacity="0.7"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* LVF Detector Band Boundaries */}
          {DETECTOR_BANDS.map((b) => {
            const bx = toSvgX(b.minUm);
            return (
              <g key={b.bandNumber}>
                <line
                  x1={bx}
                  y1={chartTop}
                  x2={bx}
                  y2={chartBottom}
                  stroke="#2E96F5"
                  strokeOpacity="0.28"
                />
                <text
                  x={bx + 6}
                  y={chartTop + 12}
                  fill="#FFFFFF"
                  fillOpacity="0.55"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  B{b.bandNumber}
                </text>
              </g>
            );
          })}

          {/* Shifted Molecular Feature Lines */}
          {activeTarget.features.map((feat) => {
            const scaleFactor = (1 + effectiveRedshift) / (1 + activeTarget.defaultRedshift);
            const shiftedW = feat.wavelengthUm * scaleFactor;
            if (shiftedW < 0.75 || shiftedW > 5.0) return null;
            const fx = toSvgX(shiftedW);
            const lineHex = feat.type === 'absorption' ? '#EAFE07' : '#E43700';
            const textHex = feat.type === 'absorption' ? '#EAFE07' : '#FFFFFF';
            return (
              <g key={feat.molecule + feat.wavelengthUm}>
                <line
                  x1={fx}
                  y1={chartTop + 20}
                  x2={fx}
                  y2={chartBottom}
                  stroke={lineHex}
                  strokeOpacity="0.8"
                  strokeDasharray="3 3"
                />
                <text
                  x={fx}
                  y={chartTop + 16}
                  textAnchor="middle"
                  fill={textHex}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {feat.molecule}
                </text>
              </g>
            );
          })}

          {/* Area & Curves */}
          <path d={areaPathD} fill="url(#specAreaGrad)" />
          <path
            d={modelPathD}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <path d={obsPathD} fill="none" stroke="#2E96F5" strokeWidth="2.3" />

          {/* Interactive Crosshair Probe */}
          <line
            x1={toSvgX(probedPoint.wavelength)}
            y1={chartTop}
            x2={toSvgX(probedPoint.wavelength)}
            y2={chartBottom}
            stroke="#FFFFFF"
            strokeOpacity="0.8"
            strokeWidth="1.2"
          />
          <circle
            cx={toSvgX(probedPoint.wavelength)}
            cy={toSvgY(probedPoint.flux)}
            r="5"
            fill="#EAFE07"
            stroke="#FFFFFF"
            strokeWidth="1.8"
          />

          {/* X-Axis Wavelength Ticks */}
          {[0.75, 1.5, 2.25, 3.0, 3.75, 4.5, 5.0].map((w) => (
            <text
              key={w}
              x={toSvgX(w)}
              y={chartBottom + 22}
              textAnchor="middle"
              fill="#FFFFFF"
              fillOpacity="0.85"
              fontSize="11"
              fontFamily="monospace"
            >
              {w.toFixed(2)} μm
            </text>
          ))}
        </svg>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#FFFFFF]/70">
          <span>{activeTarget.notes}</span>
          <div className="flex items-center gap-4 font-mono shrink-0">
            <span className="text-[#2E96F5]">— Empirical 102-Ch Trial</span>
            <span className="text-[#FFFFFF]/75">-- Theoretical Template</span>
          </div>
        </div>
      </div>

      {/* Bottom Split: Resolving Power Radar + Sortable 6-Band Detector Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Radar Calibration Chart */}
        <div className="lg:col-span-4 rounded-xl border border-[#2E96F5]/35 bg-[#07173F]/85 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#FFFFFF]">
              Spectral Resolving Power Radar (R = λ/Δλ)
            </h3>
            <p className="mt-1 text-xs text-[#FFFFFF]/70">
              Bands 5–6 boost resolving power to R = 110–130 to resolve narrow interstellar CO₂ and
              CO ice bands.
            </p>
          </div>

          <svg viewBox="0 0 280 280" className="w-full max-w-[260px] mx-auto my-2">
            {[0.33, 0.66, 1].map((ring) => {
              const pts = Array.from({ length: 6 }, (_, idx) => {
                const a = (Math.PI * 2 * idx) / 6 - Math.PI / 2;
                return `${(radarCenter + Math.cos(a) * radarRadius * ring).toFixed(1)},${(
                  radarCenter +
                  Math.sin(a) * radarRadius * ring
                ).toFixed(1)}`;
              }).join(' ');
              return (
                <polygon
                  key={ring}
                  points={pts}
                  fill="none"
                  stroke="#0960E1"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                />
              );
            })}

            {DETECTOR_BANDS.map((b, idx) => {
              const a = (Math.PI * 2 * idx) / 6 - Math.PI / 2;
              const x2 = radarCenter + Math.cos(a) * radarRadius;
              const y2 = radarCenter + Math.sin(a) * radarRadius;
              const lx = radarCenter + Math.cos(a) * (radarRadius + 24);
              const ly = radarCenter + Math.sin(a) * (radarRadius + 18);
              return (
                <g key={b.bandNumber}>
                  <line
                    x1={radarCenter}
                    y1={radarCenter}
                    x2={x2}
                    y2={y2}
                    stroke="#0960E1"
                    strokeOpacity="0.55"
                    strokeWidth="1"
                  />
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fillOpacity="0.9"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    B{b.bandNumber} (R={b.resolvingPower})
                  </text>
                </g>
              );
            })}

            <polygon
              points={radarPolygon}
              fill="#2E96F5"
              fillOpacity="0.28"
              stroke="#EAFE07"
              strokeWidth="2"
            />
          </svg>

          <div className="text-xs font-mono tabular-nums text-[#FFFFFF]/70 border-t border-[#2E96F5]/20 pt-3 flex items-center justify-between">
            <span>TOTAL CHANNELS: 102</span>
            <span className="text-[#2E96F5]">ALL-SKY DEPTH: ~19.4 AB</span>
          </div>
        </div>

        {/* Sortable 6-Band LVF Specification Table */}
        <div className="lg:col-span-8 rounded-xl border border-[#2E96F5]/35 bg-[#07173F]/85 p-5 overflow-x-auto">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-base font-semibold text-[#FFFFFF]">
              Linear Variable Filter (LVF) Focal Plane Calibration Matrix
            </h3>
            <span className="text-xs font-mono text-[#FFFFFF]/65">Click column headers to sort</span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2E96F5]/30 text-xs font-mono uppercase text-[#FFFFFF]/70">
                <th className="py-2.5 pr-3">
                  <button
                    type="button"
                    onClick={() => toggleSort('bandNumber')}
                    className="inline-flex items-center gap-1 hover:text-[#FFFFFF] cursor-pointer"
                  >
                    <span>Band</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3">Passband (μm)</th>
                <th className="py-2.5 px-3">
                  <button
                    type="button"
                    onClick={() => toggleSort('resolvingPower')}
                    className="inline-flex items-center gap-1 hover:text-[#FFFFFF] cursor-pointer"
                  >
                    <span>R (λ/Δλ)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3">
                  <button
                    type="button"
                    onClick={() => toggleSort('sensitivityAbMag')}
                    className="inline-flex items-center gap-1 hover:text-[#FFFFFF] cursor-pointer"
                  >
                    <span>5σ Depth (AB)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 pl-3">Primary Scientific Investigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E96F5]/15 text-sm">
              {sortedBands.map((band) => (
                <tr key={band.bandNumber} className="hover:bg-[#0042A6]/45 transition-colors">
                  <td className="py-3 pr-3 font-medium text-[#FFFFFF] whitespace-nowrap">
                    {band.name}
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums text-[#2E96F5] whitespace-nowrap">
                    {band.minUm.toFixed(2)} – {band.maxUm.toFixed(2)} μm
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums text-[#FFFFFF]/90 whitespace-nowrap">
                    {band.resolvingPower}
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums text-[#EAFE07] whitespace-nowrap">
                    {band.sensitivityAbMag.toFixed(1)} mag
                  </td>
                  <td className="py-3 pl-3 text-xs text-[#FFFFFF]/80">{band.primaryScience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
