import {
  CelestialObject,
  CosmicPhenomenon,
  DetectorBand,
  ExploreMode,
  GalleryItem,
  ScreenTab,
  SearchResultItem,
  SpacecraftSubsystem,
  SpectralTarget,
} from '../types/space';

export const VERIFIED_NASA_ASSETS = {
  spherexOrbitHero: 'https://images-assets.nasa.gov/image/PIA26531/PIA26531~large.jpg',
  spherexPerspective: 'https://images-assets.nasa.gov/image/PIA26532/PIA26532~large.jpg',
  spherexAllSkyMap: 'https://images-assets.nasa.gov/image/PIA26533/PIA26533~large.jpg',
  spherexShield: 'https://images-assets.nasa.gov/image/PIA25784/PIA25784~medium.jpg',
  spherexCompletion: 'https://images-assets.nasa.gov/image/PIA26537/PIA26537~medium.jpg',
  spherexAssembly: 'https://images-assets.nasa.gov/image/PIA26543/PIA26543~medium.jpg',
  andromedaIr: 'https://images-assets.nasa.gov/image/PIA26276/PIA26276~medium.jpg',
  carinaCliffs: 'https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg',
  hubbleSpiral: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000158/GSFC_20171208_Archive_e000158~large.jpg',
  neptuneRings: 'https://images-assets.nasa.gov/image/PIA01493/PIA01493~orig.jpg',
  neptuneDisk: 'https://images-assets.nasa.gov/image/PIA02210/PIA02210~orig.jpg',
  earthLimbBlue: 'https://images-assets.nasa.gov/image/art001e000095 FD1 Earth1/art001e000095 FD1 Earth1~orig.jpg',
};

export const CELESTIAL_OBJECTS: CelestialObject[] = [
  {
    id: 'planet-x-candidate',
    name: 'Planet X (Hypothetical Planet Nine)',
    designation: 'P9 / TNO-Candidate Sector Orion-Taurus',
    category: 'Trans-Neptunian',
    ra: '04h 32m 18s',
    dec: '+14° 48′ 10″',
    skyX: 245,
    skyY: 295,
    orbitRadiusAu: 460,
    orbitEccentricity: 0.42,
    orbitAngleDeg: 218,
    distanceLabel: '~460.0 AU',
    redshiftOrVelocity: 'v_orb = 1.38 km/s',
    peakBandMicrons: 4.45,
    apparentMagAb: 21.4,
    temperatureK: 42,
    summary:
      'Hypothesized 5–8 Earth-mass super-Earth / mini-Neptune inferred from perihelion clustering of extreme trans-Neptunian objects (eTNOs).',
    spherexInsight:
      'Repeated 6-month all-sky epochs in SPHEREx near-IR channels detect slow parallax drift (~7–12 arcmin/yr) and CH4/H2O surface reflectance.',
    imageUrl: VERIFIED_NASA_ASSETS.neptuneRings,
    nasaId: 'PIA01493',
    spectralTargetId: 'planet-x-methane',
  },
  {
    id: 'sedna-90377',
    name: '90377 Sedna',
    designation: 'MPC 90377 · Detached Inner Oort Object',
    category: 'Trans-Neptunian',
    ra: '03h 56m 41s',
    dec: '+08° 12′ 54″',
    skyX: 318,
    skyY: 325,
    orbitRadiusAu: 506,
    orbitEccentricity: 0.85,
    orbitAngleDeg: 162,
    distanceLabel: '83.7 AU (current)',
    redshiftOrVelocity: 'P = 11,400 yr',
    peakBandMicrons: 3.35,
    apparentMagAb: 20.6,
    temperatureK: 33,
    summary:
      'Extreme detached Kuiper Belt planetoid whose 76 AU perihelion helped motivate dynamical gravitational models for an unseen outer perturber.',
    spherexInsight:
      'Linear Variable Filter spectroscopy isolates tholin organic hydrocarbons at 3.3–3.5 μm and frozen nitrogen-methane ice mixtures.',
    imageUrl: VERIFIED_NASA_ASSETS.neptuneDisk,
    nasaId: 'PIA02210',
    spectralTargetId: 'planet-x-methane',
  },
  {
    id: 'andromeda-m31',
    name: 'Andromeda Galaxy (M31)',
    designation: 'NGC 224 · Local Group Spiral',
    category: 'Galaxy',
    ra: '00h 42m 44s',
    dec: '+41° 16′ 09″',
    skyX: 168,
    skyY: 148,
    distanceLabel: '2.537 Mly',
    redshiftOrVelocity: 'z = -0.001001',
    peakBandMicrons: 1.65,
    apparentMagAb: 3.44,
    temperatureK: 4100,
    summary:
      'Nearest grand-design spiral galaxy to the Milky Way, revealing cool stellar populations and polycyclic aromatic hydrocarbon (PAH) dust lanes in infrared.',
    spherexInsight:
      'Maps stellar mass distribution at 1.6 μm and 3.3 μm aromatic dust emission across the entire disk without atmospheric airglow gaps.',
    imageUrl: VERIFIED_NASA_ASSETS.andromedaIr,
    nasaId: 'PIA26276',
    spectralTargetId: 'galaxy-pah-emission',
  },
  {
    id: 'carina-ices',
    name: 'Carina Star-Forming Cloud',
    designation: 'NGC 3324 · Southern Galactic Plane',
    category: 'Molecular Cloud',
    ra: '10h 37m 19s',
    dec: '-58° 38′ 30″',
    skyX: 615,
    skyY: 392,
    distanceLabel: '7,600 ly',
    redshiftOrVelocity: 'v_rad = -18.4 km/s',
    peakBandMicrons: 3.05,
    apparentMagAb: 6.72,
    temperatureK: 22,
    summary:
      'Dense molecular nursery sculpted by ultraviolet radiation, harboring pristine mantles of water, carbon dioxide, and methanol ice on dust grains.',
    spherexInsight:
      'Measures biogenic ice absorption troughs (H2O at 3.05 μm, CO2 at 4.27 μm, CO at 4.67 μm) toward over 9 million background stars.',
    imageUrl: VERIFIED_NASA_ASSETS.carinaCliffs,
    nasaId: 'carina_nebula',
    spectralTargetId: 'interstellar-ices',
  },
  {
    id: 'ngc-spiral-deep',
    name: 'Spiral Starburst NGC 2903',
    designation: 'Leo Barred Spiral · Survey Calibrator',
    category: 'Galaxy',
    ra: '09h 32m 10s',
    dec: '+21° 30′ 03″',
    skyX: 525,
    skyY: 196,
    distanceLabel: '30.1 Mly',
    redshiftOrVelocity: 'z = 0.00183',
    peakBandMicrons: 2.22,
    apparentMagAb: 8.95,
    temperatureK: 3850,
    summary:
      'Isolated barred spiral exhibiting intense circumnuclear star formation and prominent infrared continuum flux across SPHEREx Bands 2–5.',
    spherexInsight:
      'Provides benchmark spectrophotometric calibration linking local galaxy templates to distant high-redshift galaxy populations.',
    imageUrl: VERIFIED_NASA_ASSETS.hubbleSpiral,
    nasaId: 'GSFC_20171208_Archive_e000158',
    spectralTargetId: 'galaxy-pah-emission',
  },
  {
    id: 'cosmic-web-protocluster',
    name: 'North Ecliptic Deep Field Web',
    designation: 'SPHEREx Deep Pole · High-z Filament',
    category: 'Cosmological Web',
    ra: '18h 00m 00s',
    dec: '+66° 33′ 39″',
    skyX: 812,
    skyY: 118,
    distanceLabel: '10.8 Gly',
    redshiftOrVelocity: 'z = 2.150',
    peakBandMicrons: 4.82,
    apparentMagAb: 22.1,
    temperatureK: 2730,
    summary:
      'SPHEREx Deep Field at the North Ecliptic Pole visited on every 98-minute orbit, tracing primordial 3D galaxy clustering from Cosmic Inflation.',
    spherexInsight:
      'Tests primordial non-Gaussianity (f_NL) with 10x higher precision than cosmic microwave background maps alone across 450M+ galaxies.',
    imageUrl: VERIFIED_NASA_ASSETS.spherexAllSkyMap,
    nasaId: 'PIA26533',
    spectralTargetId: 'high-z-inflation',
  },
];

export const COSMIC_PHENOMENA: CosmicPhenomenon[] = [
  {
    id: 'inflation-fnl',
    title: 'Primordial Cosmic Inflation Signatures',
    epochOrScale: 't < 10⁻³² s after Big Bang',
    wavelengthRange: '0.75 – 3.82 μm (Bands 1–4)',
    statusLabel: 'Active Survey',
    skyRegion: 'Full-Sky 3D Redshift Tomography (4π sr)',
    keyMetric: '450.4M',
    metricUnit: 'Galaxies Mapped',
    description:
      'Measures three-dimensional spatial clustering of hundreds of millions of galaxies to constrain local primordial non-Gaussianity (f_NL) and distinguish single-field from multi-field inflation.',
    scientificMethod:
      'Low-resolution spectrophotometric redshifts fitted across 102 contiguous near-infrared channels.',
    linkedSpectralId: 'high-z-inflation',
  },
  {
    id: 'biogenic-ices',
    title: 'Galactic Biogenic Water & Organic Ice Reservoirs',
    epochOrScale: 'Milky Way Molecular Clouds (10 – 50 K)',
    wavelengthRange: '2.42 – 5.00 μm (Bands 4–6)',
    statusLabel: 'Calibrated Baseline',
    skyRegion: 'Galactic Plane & Gould Belt Nurseries',
    keyMetric: '9.2M',
    metricUnit: 'Ice Sightlines',
    description:
      'Quantifies how H2O, CO2, CO, NH3, and CH3OH ices evolve from diffuse interstellar clouds into protoplanetary disks that seed terrestrial oceans.',
    scientificMethod:
      'R = 130 resolving power in Bands 5–6 cleanly separates solid-state ice absorption profiles.',
    linkedSpectralId: 'interstellar-ices',
  },
  {
    id: 'planet-x-parallax',
    title: 'Outer Kuiper Belt & Planet X Astrometric Drift',
    epochOrScale: 'Heliocentric 250 – 800 AU',
    wavelengthRange: '0.75 – 5.00 μm (4 All-Sky Epochs)',
    statusLabel: 'Candidate Signal',
    skyRegion: 'Ecliptic & Off-Ecliptic Inclined Corridor',
    keyMetric: '4x',
    metricUnit: 'All-Sky Cadence',
    description:
      'Searches multi-epoch all-sky infrared catalogs for solar-reflex parallax motion of ultra-distant planetary bodies and cold brown dwarfs missed by optical surveys.',
    scientificMethod:
      'Six-month baseline cross-matching eliminates stationary background galaxies and isolates sub-arcminute annual motion.',
    linkedSpectralId: 'planet-x-methane',
  },
  {
    id: 'ebl-reionization',
    title: 'Extragalactic Background Light & Epoch of Reionization',
    epochOrScale: 'z = 6 – 12 (First Stars & Galaxies)',
    wavelengthRange: '0.75 – 5.00 μm Intensity Mapping',
    statusLabel: 'Active Survey',
    skyRegion: 'North & South Ecliptic Deep Fields (200 deg²)',
    keyMetric: '0.14',
    metricUnit: 'nW/m²/sr RMS',
    description:
      'Integrates total cumulative photons emitted by all galaxies over cosmic history, capturing faint dwarf galaxies too dim to resolve individually.',
    scientificMethod:
      'Spatial fluctuation power spectra in ultra-deep ecliptic pole mosaics after foreground zodiacal subtraction.',
    linkedSpectralId: 'high-z-inflation',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-spherex-orbit',
    nasaId: 'PIA26531',
    title: 'SPHEREx Observatory in Low-Earth Sun-Synchronous Orbit',
    category: 'SPHEREx Mission',
    dateCreated: '2025-02-14',
    credit: 'NASA / JPL-Caltech',
    wavelengthInfo: '0.75 – 5.00 μm All-Sky Survey Concept',
    imageUrl: VERIFIED_NASA_ASSETS.spherexOrbitHero,
    description:
      'NASA’s SPHEREx spacecraft orbits along Earth’s day-night terminator at 650 km altitude, keeping its nested conical photon shields angled away from solar and terrestrial heat.',
  },
  {
    id: 'gal-spherex-sky-map',
    nasaId: 'PIA26533',
    title: 'Building the 102-Color All-Sky Map With SPHEREx',
    category: 'SPHEREx Mission',
    dateCreated: '2025-02-14',
    credit: 'NASA / JPL-Caltech',
    wavelengthInfo: '102 Spectral Channels · 6-Month Full Sweep',
    imageUrl: VERIFIED_NASA_ASSETS.spherexAllSkyMap,
    description:
      'Stepping across strips of the celestial sphere using Linear Variable Filters, SPHEREx constructs a complete 3D spectroscopic atlas of the cosmos every six months.',
  },
  {
    id: 'gal-andromeda-ir',
    nasaId: 'PIA26276',
    title: 'The Infrared Face of the Andromeda Galaxy (M31)',
    category: 'Galaxies',
    dateCreated: '2024-06-18',
    credit: 'NASA / JPL-Caltech',
    wavelengthInfo: 'Near & Mid-Infrared Dust + Stellar Continuum',
    imageUrl: VERIFIED_NASA_ASSETS.andromedaIr,
    description:
      'Infrared wavelengths pierce obscuring dust lanes in M31 to expose concentric star-forming rings and ancient stellar populations.',
  },
  {
    id: 'gal-carina-cliffs',
    nasaId: 'carina_nebula',
    title: 'Cosmic Cliffs in the Carina Nebula (NGC 3324)',
    category: 'Nebulae & Ices',
    dateCreated: '2022-07-12',
    credit: 'NASA / ESA / CSA / STScI',
    wavelengthInfo: '0.9 – 4.7 μm Near-Infrared',
    imageUrl: VERIFIED_NASA_ASSETS.carinaCliffs,
    description:
      'Cavernous walls of molecular gas and dust where young massive stars sculpt dense cores rich in frozen water and carbon dioxide ices.',
  },
  {
    id: 'gal-spherex-shield',
    nasaId: 'PIA25784',
    title: 'SPHEREx Outer Conical Photon Shield Integration',
    category: 'SPHEREx Mission',
    dateCreated: '2023-05-11',
    credit: 'NASA / JPL-Caltech / BAE Systems',
    wavelengthInfo: 'Passive Cryogenic Thermal Architecture (< 80 K)',
    imageUrl: VERIFIED_NASA_ASSETS.spherexShield,
    description:
      'Cleanroom inspection of the outer aluminum honeycomb photon shield that blocks stray thermal photons without requiring consumable liquid helium cryogens.',
  },
  {
    id: 'gal-hubble-spiral',
    nasaId: 'GSFC_20171208_Archive_e000158',
    title: 'Luminous Spiral Arms & Starburst Core',
    category: 'Galaxies',
    dateCreated: '2017-12-08',
    credit: 'NASA / ESA / Hubble',
    wavelengthInfo: 'Optical + Near-Infrared Composite',
    imageUrl: VERIFIED_NASA_ASSETS.hubbleSpiral,
    description:
      'High-detail view of spiral structure, ionized H II star-forming knots, and golden core bulges used as local templates for galaxy evolution studies.',
  },
  {
    id: 'gal-neptune-rings',
    nasaId: 'PIA01493',
    title: 'Outer Ice Giant Ring Arcs & Trans-Neptunian Frontier',
    category: 'Outer Solar System',
    dateCreated: '1989-08-26',
    credit: 'NASA / JPL / Voyager 2',
    wavelengthInfo: 'Forward-Scattered Outer Solar System Imaging',
    imageUrl: VERIFIED_NASA_ASSETS.neptuneRings,
    description:
      'Beyond Neptune’s 30 AU orbit lies the detached Kuiper Belt where extreme trans-Neptunian orbits point toward dynamical perturbations from a distant Planet X.',
  },
  {
    id: 'gal-spherex-assembly',
    nasaId: 'PIA26543',
    title: 'Final Flight Assembly of the SPHEREx Observatory',
    category: 'SPHEREx Mission',
    dateCreated: '2025-01-22',
    credit: 'NASA / JPL-Caltech',
    wavelengthInfo: 'Flight Configuration · Launch Ready',
    imageUrl: VERIFIED_NASA_ASSETS.spherexAssembly,
    description:
      'Completed spacecraft bus, deployed solar array wings, and three-stage V-groove photon shields prior to encapsulation at Vandenberg Space Force Base.',
  },
];

function buildSpectrum(
  profile: (w: number) => { obs: number; model: number }
): { wavelength: number; flux: number; modelFlux: number }[] {
  const points: { wavelength: number; flux: number; modelFlux: number }[] = [];
  const totalSteps = 102;
  const minW = 0.75;
  const maxW = 5.0;
  for (let i = 0; i < totalSteps; i++) {
    const w = Number((minW + ((maxW - minW) * i) / (totalSteps - 1)).toFixed(3));
    const { obs, model } = profile(w);
    points.push({
      wavelength: w,
      flux: Number(obs.toFixed(3)),
      modelFlux: Number(model.toFixed(3)),
    });
  }
  return points;
}

const gauss = (x: number, mu: number, sigma: number, amp: number) =>
  amp * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));

export const SPECTRAL_TARGETS: SpectralTarget[] = [
  {
    id: 'interstellar-ices',
    name: 'Dense Molecular Cloud Ice Sightline (NGC 3324-IR4)',
    subtitle: 'SPHEREx Biogenic Ice Survey · 102-Channel Absorption',
    defaultRedshift: 0.0,
    fluxUnit: 'MJy/sr',
    baseFluxPoints: buildSpectrum((w) => {
      const continuum = 82 * Math.exp(-0.18 * (w - 0.75)) + 16;
      const h2o = gauss(w, 3.05, 0.16, -48);
      const ch3oh = gauss(w, 3.53, 0.07, -14);
      const co2 = gauss(w, 4.27, 0.055, -42);
      const co = gauss(w, 4.67, 0.045, -29);
      const model = Math.max(4, continuum + h2o + ch3oh + co2 + co);
      const ripple = Math.sin(w * 19.3) * 1.35 + Math.cos(w * 41.0) * 0.7;
      return { obs: Math.max(3.5, model + ripple), model };
    }),
    features: [
      { wavelengthUm: 3.05, molecule: 'H₂O Ice', label: 'O–H Stretch', type: 'absorption' },
      { wavelengthUm: 3.53, molecule: 'CH₃OH', label: 'Methanol Ice', type: 'absorption' },
      { wavelengthUm: 4.27, molecule: 'CO₂ Ice', label: 'Carbon Dioxide', type: 'absorption' },
      { wavelengthUm: 4.67, molecule: 'CO Ice', label: 'Carbon Monoxide', type: 'absorption' },
    ],
    notes:
      'Deep solid-state absorption bands in Bands 4–6 reveal unprocessed water and volatile carbon ices coating sub-micron silicate grains.',
  },
  {
    id: 'planet-x-methane',
    name: 'Trans-Neptunian / Planet X Reflectance + Thermal Model',
    subtitle: 'Outer Solar System Albedo & CH₄ / N₂ Surface Signature',
    defaultRedshift: 0.0,
    fluxUnit: 'μJy (Scaled)',
    baseFluxPoints: buildSpectrum((w) => {
      const solarReflected = 74 * Math.exp(-0.58 * (w - 0.75));
      const ch4Band1 = gauss(w, 1.72, 0.08, -16);
      const ch4Band2 = gauss(w, 2.32, 0.11, -21);
      const tholinSlope = gauss(w, 1.25, 0.25, 14);
      const ch4Deep = gauss(w, 3.32, 0.14, -15);
      const internalHeat = w > 3.9 ? Math.pow(w - 3.9, 2.1) * 18.5 : 0;
      const model = Math.max(3, solarReflected + tholinSlope + ch4Band1 + ch4Band2 + ch4Deep + internalHeat);
      const noise = Math.sin(w * 27.1) * 1.6;
      return { obs: Math.max(2.5, model + noise), model };
    }),
    features: [
      { wavelengthUm: 1.72, molecule: 'CH₄', label: 'Methane Overtones', type: 'absorption' },
      { wavelengthUm: 2.32, molecule: 'CH₄ / N₂', label: 'Volatile Frost', type: 'absorption' },
      { wavelengthUm: 3.32, molecule: 'Hydrocarbons', label: 'C–H Band', type: 'absorption' },
      { wavelengthUm: 4.65, molecule: '4.6 μm Window', label: 'Internal Heat Excess', type: 'emission' },
    ],
    notes:
      'Combines attenuated solar reflectance below 3.5 μm with a 4.5–5.0 μm atmospheric opacity window diagnostic of residual core heat in sub-Neptune worlds.',
  },
  {
    id: 'galaxy-pah-emission',
    name: 'Star-Forming Spiral Template (M31 / NGC 2903 Disk)',
    subtitle: 'Stellar 1.6 μm Bump & 3.3 μm PAH Emission Feature',
    defaultRedshift: 0.08,
    fluxUnit: 'MJy/sr',
    baseFluxPoints: buildSpectrum((w) => {
      const stellarBump = 34 + gauss(w, 1.62, 0.48, 44);
      const hAlphaPaschen = gauss(w, 1.28, 0.04, 15) + gauss(w, 1.87, 0.045, 19);
      const pah33 = gauss(w, 3.29, 0.075, 39);
      const aliphatic34 = gauss(w, 3.42, 0.055, 14);
      const warmDust = w > 3.5 ? (w - 3.5) * 11 : 0;
      const model = stellarBump + hAlphaPaschen + pah33 + aliphatic34 + warmDust;
      const jitter = Math.cos(w * 23.4) * 1.2;
      return { obs: model + jitter, model };
    }),
    features: [
      { wavelengthUm: 1.28, molecule: 'Paβ', label: 'Paschen-Beta', type: 'emission' },
      { wavelengthUm: 1.62, molecule: 'H⁻ Opacity', label: '1.6 μm Stellar Peak', type: 'emission' },
      { wavelengthUm: 1.87, molecule: 'Paα', label: 'Paschen-Alpha', type: 'emission' },
      { wavelengthUm: 3.29, molecule: 'PAH', label: 'Aromatic Dust', type: 'emission' },
    ],
    notes:
      'The prominent 1.6 μm H⁻ opacity minimum acts as a universal "standard ruler" enabling SPHEREx to lock onto photometric redshifts across cosmic time.',
  },
  {
    id: 'high-z-inflation',
    name: 'High-Redshift Protocluster Galaxy (NEP-Deep-z1.4)',
    subtitle: 'Cosmological Redshift Calibration · Cosmic Inflation Survey',
    defaultRedshift: 1.4,
    fluxUnit: 'μJy',
    baseFluxPoints: buildSpectrum((w) => {
      const continuum = 28 + gauss(w, 1.6, 0.42, 36);
      const oiiiHbeta = gauss(w, 0.5, 0.03, 28);
      const hAlpha = gauss(w, 0.656, 0.035, 34);
      const sIii = gauss(w, 0.953, 0.04, 16);
      const model = continuum + oiiiHbeta + hAlpha + sIii;
      const jitter = Math.sin(w * 31.8) * 1.45;
      return { obs: model + jitter, model };
    }),
    features: [
      { wavelengthUm: 0.656, molecule: 'Hα', label: 'Rest-Frame H-Alpha', type: 'emission' },
      { wavelengthUm: 0.953, molecule: '[S III]', label: 'Sulfur III', type: 'emission' },
      { wavelengthUm: 1.6, molecule: 'Stellar Peak', label: '1.6 μm Rest Bump', type: 'emission' },
    ],
    notes:
      'Adjust the Redshift (z) control to observe rest-frame optical H-Alpha (0.656 μm) and the 1.6 μm stellar bump shift cleanly across SPHEREx near-IR channels.',
  },
];

export const DETECTOR_BANDS: DetectorBand[] = [
  {
    bandNumber: 1,
    name: 'LVF Band 1 · Short-Wave NIR',
    minUm: 0.75,
    maxUm: 1.11,
    resolvingPower: 41,
    detectorMaterial: 'HgCdTe 2.5 μm Cutoff',
    primaryScience: 'Low-z Galaxy Redshifts & Optical/NIR Bridge',
    sensitivityAbMag: 19.6,
    surveyCompletenessPct: 99.4,
  },
  {
    bandNumber: 2,
    name: 'LVF Band 2 · J-Band Continuum',
    minUm: 1.11,
    maxUm: 1.64,
    resolvingPower: 41,
    detectorMaterial: 'HgCdTe 2.5 μm Cutoff',
    primaryScience: '1.6 μm Stellar Bump & Paschen Emission Lines',
    sensitivityAbMag: 19.5,
    surveyCompletenessPct: 99.2,
  },
  {
    bandNumber: 3,
    name: 'LVF Band 3 · H/K Transition',
    minUm: 1.64,
    maxUm: 2.42,
    resolvingPower: 41,
    detectorMaterial: 'HgCdTe 2.5 μm Cutoff',
    primaryScience: 'High-z Cosmic Inflation Clustering & CH₄ TNOs',
    sensitivityAbMag: 19.4,
    surveyCompletenessPct: 98.9,
  },
  {
    bandNumber: 4,
    name: 'LVF Band 4 · Water Ice & PAH',
    minUm: 2.42,
    maxUm: 3.82,
    resolvingPower: 35,
    detectorMaterial: 'HgCdTe 5.3 μm Cutoff',
    primaryScience: '3.05 μm H₂O Ice & 3.3 μm Aromatic Hydrocarbons',
    sensitivityAbMag: 18.9,
    surveyCompletenessPct: 98.6,
  },
  {
    bandNumber: 5,
    name: 'LVF Band 5 · High-Res CO₂ Ice',
    minUm: 3.82,
    maxUm: 4.42,
    resolvingPower: 110,
    detectorMaterial: 'HgCdTe 5.3 μm Cutoff',
    primaryScience: '4.27 μm Solid CO₂ & XCN Interstellar Ices',
    sensitivityAbMag: 18.3,
    surveyCompletenessPct: 98.1,
  },
  {
    bandNumber: 6,
    name: 'LVF Band 6 · High-Res CO & Thermal',
    minUm: 4.42,
    maxUm: 5.0,
    resolvingPower: 130,
    detectorMaterial: 'HgCdTe 5.3 μm Cutoff',
    primaryScience: '4.67 μm CO Ice & Cold Substellar Thermal Window',
    sensitivityAbMag: 18.0,
    surveyCompletenessPct: 97.8,
  },
];

export const SPACECRAFT_SUBSYSTEMS: SpacecraftSubsystem[] = [
  {
    id: 'photon-shields',
    name: 'Triple Nested Conical Photon Shields',
    code: 'TPS-V3',
    operatingTemp: 'Outer 260 K → Inner < 95 K',
    massOrSpec: '3.2 m Diameter Aluminum-Kapton Frustum',
    svgX: 295,
    svgY: 118,
    summary:
      'Three concentric V-groove sunshields deflect direct solar radiation and Earth infrared glow into deep space.',
    engineeringDetail:
      'Enables completely passive cryogenic cooling without liquid helium tanks, maximizing mission lifetime and survey uptime.',
  },
  {
    id: 'telescope-ota',
    name: '20 cm All-Aluminum Wide-Field Telescope',
    code: 'OTA-200',
    operatingTemp: '< 80 K Passive Cryo',
    massOrSpec: '3.5° × 11.3° Instantaneous Field of View',
    svgX: 272,
    svgY: 188,
    summary:
      'Compact freeform three-mirror anastigmat machined from monolithic aluminum so mirrors and housing contract uniformly when cooled.',
    engineeringDetail:
      'Provides an enormous 3.5° × 11.3° field of view—hundreds of times wider than flagship pointed space telescopes.',
  },
  {
    id: 'lvf-focal-plane',
    name: 'Linear Variable Filters & Dichroic Splitters',
    code: 'FPA-102',
    operatingTemp: '55 K – 80 K Dual Stage',
    massOrSpec: '6 HgCdTe H2RG Arrays · 102 Spectral Channels',
    svgX: 252,
    svgY: 235,
    summary:
      'A dichroic beam splitter separates incoming starlight into short-wave (0.75–2.42 μm) and long-wave (2.42–5.00 μm) focal planes.',
    engineeringDetail:
      'Filter coating thickness varies smoothly across the detector, capturing a different wavelength on each spacecraft step with zero moving parts.',
  },
  {
    id: 'spacecraft-bus',
    name: '3-Axis Precision Attitude Bus & Ka-Band Downlink',
    code: 'BUS-BAES',
    operatingTemp: '285 K Regulated Avionics',
    massOrSpec: '~500 kg Wet Launch Mass · 650 km Polar Orbit',
    svgX: 236,
    svgY: 288,
    summary:
      'High-agility reaction wheels slew and settle SPHEREx between sky exposures in seconds while maintaining sub-arcsecond pointing stability.',
    engineeringDetail:
      'Downlinks ~150 gigabits per week of uncompressed spectral frames to NASA’s Near Space Network polar ground stations.',
  },
  {
    id: 'solar-arrays',
    name: 'Twin Rigid Photovoltaic Solar Wings',
    code: 'EPS-SA2',
    operatingTemp: 'Sun-Terminator Continuous Illumination',
    massOrSpec: '780 W End-of-Life Power Generation',
    svgX: 138,
    svgY: 266,
    summary:
      'Fixed dual-wing solar panels ride continuously along Earth’s dawn-dusk terminator line for uninterrupted solar power.',
    engineeringDetail:
      'Rigid zero-articulation geometry prevents micro-vibrations during sensitive 112-second infrared sky exposures.',
  },
];

export function getGlobalSearchIndex(): SearchResultItem[] {
  const results: SearchResultItem[] = [];

  for (const obj of CELESTIAL_OBJECTS) {
    results.push({
      id: `obj-${obj.id}`,
      title: obj.name,
      subtitle: `${obj.category} · ${obj.distanceLabel}`,
      kind: 'Object',
      targetTab: ScreenTab.Explore,
      targetSubId: obj.id,
      exploreMode:
        obj.category === 'Trans-Neptunian'
          ? ExploreMode.PlanetXOrbit
          : ExploreMode.SkySurvey,
    });
  }

  for (const gal of GALLERY_ITEMS) {
    results.push({
      id: `gal-${gal.id}`,
      title: gal.title,
      subtitle: `NASA ${gal.nasaId} · ${gal.category}`,
      kind: 'Gallery',
      targetTab: ScreenTab.Gallery,
      targetSubId: gal.id,
    });
  }

  for (const spec of SPECTRAL_TARGETS) {
    results.push({
      id: `spec-${spec.id}`,
      title: spec.name,
      subtitle: spec.subtitle,
      kind: 'Spectrum',
      targetTab: ScreenTab.Data,
      targetSubId: spec.id,
    });
  }

  for (const sub of SPACECRAFT_SUBSYSTEMS) {
    results.push({
      id: `sub-${sub.id}`,
      title: sub.name,
      subtitle: `${sub.code} · ${sub.operatingTemp}`,
      kind: 'Spacecraft',
      targetTab: ScreenTab.About,
      targetSubId: sub.id,
    });
  }

  return results;
}
