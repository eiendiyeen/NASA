import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { ExploreMode, ScreenTab, SearchResultItem } from '../types/space';
import { getGlobalSearchIndex } from '../data/nasaData';
import { NasaMeatballLogo } from './NasaInsignia';

interface NavbarProps {
  activeTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  onNavigateSearchResult: (item: SearchResultItem) => void;
  onQuickExploreMode?: (mode: ExploreMode) => void;
}

const NAV_TABS: ScreenTab[] = [
  ScreenTab.Home,
  ScreenTab.Explore,
  ScreenTab.Gallery,
  ScreenTab.Data,
  ScreenTab.About,
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onNavigateSearchResult,
}) => {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchIndex = useMemo(() => getGlobalSearchIndex(), []);

  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return searchIndex.slice(0, 6);
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.subtitle.toLowerCase().includes(trimmed) ||
          item.kind.toLowerCase().includes(trimmed)
      )
      .slice(0, 8);
  }, [query, searchIndex]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleSelectItem = (item: SearchResultItem) => {
    onNavigateSearchResult(item);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <header className="relative z-40 px-4 sm:px-7 lg:px-10 pt-3.5 pb-3">
      {/* Angled Aerospace Header Bezel Line */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 84"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        <path
          d="M 0 80 L 348 80 L 392 14 L 1440 14"
          fill="none"
          stroke="#0960E1"
          strokeOpacity="0.55"
          strokeWidth="1.3"
        />
        <path
          d="M 366 76 L 1440 76"
          fill="none"
          stroke="#2E96F5"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <line
          x1="418"
          y1="14"
          x2="585"
          y2="14"
          stroke="#2E96F5"
          strokeOpacity="0.85"
          strokeWidth="2"
        />
      </svg>

      <div className="relative flex flex-wrap items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Lockup */}
        <button
          type="button"
          onClick={() => onSelectTab(ScreenTab.Home)}
          className="group flex items-center gap-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5] rounded-lg shrink-0 cursor-pointer"
        >
          <NasaMeatballLogo className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-200 group-hover:scale-105" />
          <span aria-hidden="true" className="h-9 w-px bg-[#FFFFFF]/25" />
          <span className="font-sans text-base sm:text-lg font-semibold leading-snug tracking-tight text-[#FFFFFF]">
            Planet X
            <br />
            and SPHEREx
          </span>
        </button>

        {/* Zone 2: Primary Navigation Tabs */}
        <nav
          aria-label="Primary Navigation"
          className="order-3 lg:order-2 w-full lg:w-auto flex items-center justify-center gap-1.5 sm:gap-4 lg:gap-6 pt-1 lg:pt-2 overflow-x-auto"
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSelectTab(tab)}
                className={`px-4 sm:px-5 py-1.5 text-sm sm:text-[15px] font-medium whitespace-nowrap shrink-0 rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E96F5] ${
                  isActive
                    ? 'bg-gradient-to-b from-[#2E96F5]/45 via-[#0960E1]/45 to-[#0042A6]/75 text-[#FFFFFF] border border-[#2E96F5] shadow-[0_0_22px_rgba(46,150,245,0.55),inset_0_1px_8px_rgba(255,255,255,0.25)]'
                    : 'text-[#FFFFFF]/80 hover:text-[#FFFFFF] border border-transparent hover:border-[#2E96F5]/40 hover:bg-[#07173F]/50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Search Control */}
        <div
          ref={searchContainerRef}
          className="order-2 lg:order-3 relative w-48 sm:w-60 lg:w-64 shrink-0 lg:pt-2"
        >
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 w-4 h-4 text-[#FFFFFF]/65" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Search.."
              aria-label="Search celestial objects, NASA gallery, and spectral datasets"
              className="w-full rounded-full bg-[#07173F]/85 border border-[#2E96F5]/45 pl-9 pr-8 py-1.5 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/60 focus:outline-none focus:border-[#2E96F5] focus:shadow-[0_0_16px_rgba(46,150,245,0.4)] transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-2.5 text-[#FFFFFF]/65 hover:text-[#FFFFFF] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isSearchOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[#2E96F5]/50 bg-[#07173F] shadow-[0_18px_48px_rgba(7,23,63,0.92)] overflow-hidden z-50">
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#2E96F5]/25 text-xs text-[#FFFFFF]/70">
                <span>
                  {query.trim()
                    ? `Matches (${filteredResults.length})`
                    : 'Suggested Mission Targets'}
                </span>
                <span className="font-mono text-[11px] text-[#FFFFFF]/55">ESC to close</span>
              </div>

              {filteredResults.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-[#FFFFFF]/75">
                  No targets matching &ldquo;{query}&rdquo;. Try &ldquo;Planet X&rdquo;,
                  &ldquo;Andromeda&rdquo;, or &ldquo;Ice&rdquo;.
                </div>
              ) : (
                <ul className="max-h-72 overflow-y-auto divide-y divide-[#2E96F5]/15">
                  {filteredResults.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left hover:bg-[#0042A6]/60 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-[#FFFFFF] truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-[#FFFFFF]/70 truncate">
                            {item.kind} · {item.subtitle}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#2E96F5] shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
