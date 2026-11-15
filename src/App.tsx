/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ExploreMode,
  GalleryCategory,
  ScreenTab,
  SearchResultItem,
} from './types/space';
import { AerospaceHudFrame, StarfieldBackdrop } from './components/StarfieldBackdrop';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { DataScreen } from './components/DataScreen';
import { AboutScreen } from './components/AboutScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>(ScreenTab.Home);
  const [exploreMode, setExploreMode] = useState<ExploreMode>(ExploreMode.SkySurvey);
  const [selectedObjectId, setSelectedObjectId] = useState<string>('planet-x-candidate');
  const [galleryCategory, setGalleryCategory] = useState<GalleryCategory>('All');
  const [highlightedNasaId, setHighlightedNasaId] = useState<string | null>(null);
  const [selectedSpectralId, setSelectedSpectralId] = useState<string>('interstellar-ices');
  const [selectedSubsystemId, setSelectedSubsystemId] = useState<string>('photon-shields');

  const handleNavigateSearchResult = (item: SearchResultItem) => {
    setActiveTab(item.targetTab);
    if (item.targetTab === ScreenTab.Explore) {
      if (item.exploreMode) setExploreMode(item.exploreMode);
      if (item.targetSubId) setSelectedObjectId(item.targetSubId);
    } else if (item.targetTab === ScreenTab.Gallery && item.targetSubId) {
      setGalleryCategory('All');
      setHighlightedNasaId(item.targetSubId);
    } else if (item.targetTab === ScreenTab.Data && item.targetSubId) {
      setSelectedSpectralId(item.targetSubId);
    } else if (item.targetTab === ScreenTab.About && item.targetSubId) {
      setSelectedSubsystemId(item.targetSubId);
    }
  };

  const handleNavigateExploreMode = (mode: ExploreMode, objectId?: string) => {
    setExploreMode(mode);
    if (objectId) setSelectedObjectId(objectId);
    setActiveTab(ScreenTab.Explore);
  };

  const handleNavigateGalleryCategory = (cat: GalleryCategory) => {
    setGalleryCategory(cat);
    setActiveTab(ScreenTab.Gallery);
  };

  const handleOpenSpectrumFromExplore = (spectralTargetId: string) => {
    setSelectedSpectralId(spectralTargetId);
    setActiveTab(ScreenTab.Data);
  };

  const handleOpenGalleryFromExplore = (nasaId: string) => {
    setGalleryCategory('All');
    setHighlightedNasaId(nasaId);
    setActiveTab(ScreenTab.Gallery);
  };

  return (
    <div className="relative min-h-screen w-full bg-[linear-gradient(135deg,#0042A6_0%,#07173F_100%)] text-[#FFFFFF]">
      <StarfieldBackdrop />

      <AerospaceHudFrame>
        <Navbar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onNavigateSearchResult={handleNavigateSearchResult}
        />

        <main className="flex-1 flex flex-col">
          {activeTab === ScreenTab.Home && (
            <HomeScreen
              onStartExploring={() => {
                setExploreMode(ExploreMode.SkySurvey);
                setActiveTab(ScreenTab.Explore);
              }}
              onNavigateExploreMode={handleNavigateExploreMode}
              onNavigateGalleryCategory={handleNavigateGalleryCategory}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === ScreenTab.Explore && (
            <ExploreScreen
              mode={exploreMode}
              onChangeMode={setExploreMode}
              selectedObjectId={selectedObjectId}
              onSelectObjectId={setSelectedObjectId}
              onOpenSpectrum={handleOpenSpectrumFromExplore}
              onOpenGalleryItem={handleOpenGalleryFromExplore}
            />
          )}

          {activeTab === ScreenTab.Gallery && (
            <GalleryScreen
              activeCategory={galleryCategory}
              onSelectCategory={setGalleryCategory}
              highlightedNasaId={highlightedNasaId}
              onClearHighlightedNasaId={() => setHighlightedNasaId(null)}
            />
          )}

          {activeTab === ScreenTab.Data && (
            <DataScreen
              selectedSpectralId={selectedSpectralId}
              onSelectSpectralId={setSelectedSpectralId}
            />
          )}

          {activeTab === ScreenTab.About && (
            <AboutScreen
              selectedSubsystemId={selectedSubsystemId}
              onSelectSubsystemId={setSelectedSubsystemId}
              onNavigateExploreMode={handleNavigateExploreMode}
              onNavigateTab={setActiveTab}
            />
          )}
        </main>
      </AerospaceHudFrame>
    </div>
  );
}
