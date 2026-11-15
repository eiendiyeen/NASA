import React, { useEffect, useMemo, useState } from 'react';
import { Expand, RefreshCw, Search, Sparkles, X } from 'lucide-react';
import { GalleryCategory, GalleryItem } from '../types/space';
import { GALLERY_ITEMS } from '../data/nasaData';
import { ResilientNasaImage } from './NasaInsignia';

interface GalleryScreenProps {
  activeCategory: GalleryCategory;
  onSelectCategory: (cat: GalleryCategory) => void;
  highlightedNasaId?: string | null;
  onClearHighlightedNasaId?: () => void;
}

const CATEGORIES: GalleryCategory[] = [
  'All',
  'SPHEREx Mission',
  'Galaxies',
  'Outer Solar System',
  'Nebulae & Ices',
];

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  activeCategory,
  onSelectCategory,
  highlightedNasaId,
  onClearHighlightedNasaId,
}) => {
  const [liveQuery, setLiveQuery] = useState('');
  const [liveItems, setLiveItems] = useState<GalleryItem[] | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<GalleryItem | null>(null);
  const [irFilterMode, setIrFilterMode] = useState<'natural' | 'infrared'>('natural');

  useEffect(() => {
    if (highlightedNasaId) {
      const match = GALLERY_ITEMS.find(
        (g) => g.nasaId === highlightedNasaId || g.id === highlightedNasaId
      );
      if (match) {
        setSelectedModalItem(match);
      }
      if (onClearHighlightedNasaId) {
        onClearHighlightedNasaId();
      }
    }
  }, [highlightedNasaId, onClearHighlightedNasaId]);

  const displayedCurated = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleLiveNasaSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = liveQuery.trim();
    if (!q) {
      setLiveItems(null);
      setLiveError(null);
      return;
    }

    setIsLoadingLive(true);
    setLiveError(null);
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image&page_size=12`
      );
      if (!response.ok) {
        throw new Error(`NASA Archive returned HTTP ${response.status}`);
      }
      const data = await response.json();
      const rawItems = data?.collection?.items || [];
      const mapped: GalleryItem[] = rawItems
        .map((entry: {
          data?: Array<{
            nasa_id?: string;
            title?: string;
            date_created?: string;
            center?: string;
            description?: string;
          }>;
          links?: Array<{ rel?: string; href?: string }>;
        }) => {
          const meta = entry.data?.[0];
          const preview = entry.links?.find((l) => l.rel === 'preview')?.href;
          if (!meta?.nasa_id || !preview) return null;
          const httpsUrl = preview.replace(/^http:\/\//i, 'https://');
          return {
            id: `live-${meta.nasa_id}`,
            nasaId: meta.nasa_id,
            title: meta.title || 'NASA Archive Observation',
            category: 'Galaxies',
            dateCreated: (meta.date_created || '').slice(0, 10) || 'Archive',
            credit: `NASA / ${meta.center || 'JPL'}`,
            wavelengthInfo: 'NASA Official Public Archive',
            imageUrl: httpsUrl,
            description:
              (meta.description || 'Official NASA observation asset.').slice(0, 340),
          } as GalleryItem;
        })
        .filter((x: GalleryItem | null): x is GalleryItem => x !== null);

      setLiveItems(mapped);
    } catch (err) {
      setLiveError(
        err instanceof Error
          ? err.message
          : 'Unable to reach NASA Image Archive right now.'
      );
    } finally {
      setIsLoadingLive(false);
    }
  };

  const activeList = liveItems !== null ? liveItems : displayedCurated;

  return (
    <section className="flex-1 flex flex-col px-4 sm:px-8 lg:px-10 pt-3 pb-10 gap-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#2E96F5]/25 pb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#FFFFFF]">
            SPHEREx & Deep Space Observation Gallery
          </h1>
          <p className="mt-1 text-sm text-[#FFFFFF]/80 max-w-2xl">
            Inspect verified NASA JPL spacecraft captures, infrared galactic mosaics, and search
            the live NASA Image Library directly.
          </p>
        </div>

        {/* Live NASA API Search Form */}
        <form onSubmit={handleLiveNasaSearch} className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFFFFF]/65" />
            <input
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              placeholder="Query live NASA archive (e.g. Nebula, Kuiper)..."
              className="w-64 sm:w-72 rounded-lg bg-[#07173F]/85 border border-[#2E96F5]/45 pl-9 pr-3 py-2 text-xs sm:text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/60 focus:outline-none focus:border-[#2E96F5]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoadingLive}
            className="px-4 py-2 rounded-lg bg-[#0960E1]/75 hover:bg-[#0960E1] border border-[#2E96F5] text-xs sm:text-sm font-medium text-[#FFFFFF] whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoadingLive ? 'Searching...' : 'Query NASA'}
          </button>
          {liveItems !== null && (
            <button
              type="button"
              onClick={() => {
                setLiveItems(null);
                setLiveQuery('');
                setLiveError(null);
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#2E96F5]/40 text-xs text-[#FFFFFF]/80 hover:text-[#FFFFFF] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Curated</span>
            </button>
          )}
        </form>
      </div>

      {/* Category Filter Buttons */}
      {liveItems === null && (
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#07173F]/85 border border-[#2E96F5]/35 w-fit">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0960E1]/75 text-[#FFFFFF] border border-[#2E96F5]'
                  : 'text-[#FFFFFF]/75 hover:text-[#FFFFFF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Error or Empty States */}
      {liveError && (
        <div className="rounded-xl border border-[#E43700] bg-[#8E1100]/45 px-4 py-3 text-sm text-[#FFFFFF]">
          ✖ Live NASA API Error: {liveError}. Showing local mission controls remains available.
        </div>
      )}

      {activeList.length === 0 ? (
        <div className="rounded-xl border border-[#2E96F5]/30 bg-[#07173F]/75 p-10 text-center text-[#FFFFFF]/80">
          No NASA observations matched &ldquo;{liveQuery}&rdquo;. Try searching &ldquo;SPHEREx&rdquo;,
          &ldquo;Andromeda&rdquo;, or &ldquo;Neptune&rdquo;.
        </div>
      ) : (
        /* Gallery Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeList.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                setSelectedModalItem(item);
                setIrFilterMode('natural');
              }}
              className="group flex flex-col rounded-xl border border-[#2E96F5]/35 bg-[#07173F]/85 hover:border-[#2E96F5] overflow-hidden transition-colors cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#07173F]">
                <ResilientNasaImage
                  src={item.imageUrl}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07173F] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-[#07173F]/90 border border-[#2E96F5]/55 text-[#2E96F5] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between p-4 gap-3">
                <div>
                  <div className="text-xs font-mono text-[#FFFFFF]/65">
                    {item.nasaId} · {item.dateCreated}
                  </div>
                  <h2 className="mt-1 text-base font-semibold text-[#FFFFFF] leading-snug line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-xs text-[#FFFFFF]/80 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#2E96F5]/20 text-[11px] font-mono text-[#2E96F5] truncate">
                  {item.wavelengthInfo}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* High-Detail Observation Lightbox Modal */}
      {selectedModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedModalItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07173F]/85 p-4 sm:p-6"
          onClick={() => setSelectedModalItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-2xl border border-[#2E96F5]/65 bg-[#07173F] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#2E96F5]/25">
              <div className="min-w-0">
                <div className="text-xs font-mono text-[#2E96F5]">
                  NASA ID: {selectedModalItem.nasaId} · {selectedModalItem.credit}
                </div>
                <h3 className="text-lg font-bold text-[#FFFFFF] truncate">
                  {selectedModalItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setIrFilterMode((m) => (m === 'natural' ? 'infrared' : 'natural'))
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                    irFilterMode === 'infrared'
                      ? 'bg-[#8E1100]/65 border-[#E43700] text-[#EAFE07]'
                      : 'bg-[#0960E1]/35 border-[#2E96F5]/55 text-[#FFFFFF]/90 hover:text-[#FFFFFF]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {irFilterMode === 'infrared'
                      ? 'False-Color IR Active'
                      : 'Simulate False-Color IR'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedModalItem(null)}
                  aria-label="Close observation viewer"
                  className="p-1.5 rounded-lg border border-[#2E96F5]/35 text-[#FFFFFF]/80 hover:text-[#FFFFFF] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 bg-[#07173F] flex items-center justify-center max-h-[520px] overflow-hidden">
                <ResilientNasaImage
                  src={selectedModalItem.imageUrl}
                  alt={selectedModalItem.title}
                  className={`w-full h-full max-h-[520px] object-contain transition-all duration-200 ${
                    irFilterMode === 'infrared'
                      ? 'hue-rotate-180 saturate-150 contrast-125'
                      : ''
                  }`}
                />
              </div>

              <div className="lg:col-span-4 p-5 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[#2E96F5]/25">
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFFFFF]/65">
                      Spectral Passband
                    </div>
                    <div className="text-sm font-mono text-[#2E96F5] mt-0.5">
                      {selectedModalItem.wavelengthInfo}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFFFFF]/65">
                      Observation Date
                    </div>
                    <div className="text-sm font-mono tabular-nums text-[#FFFFFF] mt-0.5">
                      {selectedModalItem.dateCreated}
                    </div>
                  </div>

                  <p className="text-sm text-[#FFFFFF]/80 leading-relaxed pt-2 border-t border-[#2E96F5]/20">
                    {selectedModalItem.description}
                  </p>
                </div>

                <a
                  href={selectedModalItem.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#0960E1]/75 hover:bg-[#0960E1] border border-[#2E96F5] text-xs font-semibold text-[#FFFFFF] whitespace-nowrap transition-colors"
                >
                  Open Original NASA Asset
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
