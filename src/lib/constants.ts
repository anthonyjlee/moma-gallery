/**
 * Site configuration for MoMA Virtual Gallery
 * Central constants for AEO metadata and schema generation
 */

export const SITE_CONFIG = {
  // Site Identity
  siteName: 'MoMA Virtual Gallery',
  siteNameFull: 'Museum of Modern Art Virtual Exhibition',
  url: 'https://moma-gallery.vercel.app',
  
  // Exhibition Details
  exhibitionTitle: 'The Machine\'s Eye',
  exhibitionSubtitle: 'VLM-Curated Photography',
  exhibitionThesis: 'How does computational vision reveal the cultural encoding of the photographic gaze?',
  
  // SEO
  description: 'A virtual gallery exhibition exploring 19th and 20th century photography across Eastern and Western traditions. Experience the dialogue between cultures through the lens of master photographers, curated by AI vision analysis.',
  keywords: [
    'MoMA',
    'virtual gallery',
    'photography exhibition',
    'Eastern photography',
    'Western photography',
    'Shomei Tomatsu',
    'Diane Arbus',
    'VLM curation',
    'AI art curation',
    'computational art history',
    'photography history',
    'museum exhibition',
    'digital humanities',
  ],
  
  // Locale & Language
  locale: 'en-US',
  language: 'en',
  
  // Social / Open Graph
  // Using the hero image as OG image
  ogImage: 'https://moma-gallery.vercel.app/gallery/eastern/56197_Shomei_Tomatsu.jpg',
  twitterHandle: '@MuseumModernArt',
  
  // Contact (virtual exhibition)
  contactEmail: 'virtual@moma.org',
  
  // Methodology
  platform: 'Lydia AI',
  framework: 'Multi-pass VLM Analysis',
  
  // Stats
  totalImages: 152,
  humanSubjects: 102,
  asianPhotographers: 51,
  westernPhotographers: 51,
} as const;

// Exhibition Sections Configuration
export const SECTION_THEMES = {
  politics_of_names: {
    id: 'section_1',
    title: 'The Politics of Names',
    thesis: 'Who gets named? Asian photographers grant their subjects full names; Western photographers often reduce them to types.',
    keywords: ['naming', 'identity', 'portraiture', 'representation'],
  },
  traditional_dress: {
    id: 'section_2',
    title: 'Traditional Dress, Different Meanings',
    thesis: 'The same costume signifies cultural authenticity when photographed by an insider, exoticism when photographed by an outsider.',
    keywords: ['costume', 'tradition', 'cultural gaze', 'insider perspective'],
  },
  same_decade: {
    id: 'section_3',
    title: 'Same Decade, Different Distance',
    thesis: 'Even in contemporary photography, cultural proximity shapes representation—but the gap is narrowing.',
    keywords: ['contemporary', 'distance', 'cultural proximity', 'evolution'],
  },
  camera_angle: {
    id: 'section_4',
    title: 'Who Looks Down?',
    thesis: 'Camera angle encodes power. Eye level grants equality; looking down asserts dominance.',
    keywords: ['power', 'camera angle', 'gaze', 'hierarchy'],
  },
} as const;

// Featured Photographers for AEO
export const FEATURED_PHOTOGRAPHERS = {
  eastern: [
    { name: 'Shomei Tomatsu', nationality: 'Japanese', period: '1930-2012' },
    { name: 'Sheba Chhachhi', nationality: 'Indian', period: 'b. 1958' },
    { name: 'Ram Rahman', nationality: 'Indian', period: 'b. 1955' },
    { name: 'Mieko Shiomi', nationality: 'Japanese', period: 'b. 1938' },
    { name: 'Ken Domon', nationality: 'Japanese', period: '1909-1990' },
    { name: 'Daidō Moriyama', nationality: 'Japanese', period: 'b. 1938' },
  ],
  western: [
    { name: 'Diane Arbus', nationality: 'American', period: '1923-1971' },
    { name: 'Dorothea Lange', nationality: 'American', period: '1895-1965' },
    { name: 'Felice Beato', nationality: 'Italian', period: '1832-1909' },
    { name: 'Maxime Du Camp', nationality: 'French', period: '1822-1894' },
    { name: 'Judith Joy Ross', nationality: 'American', period: 'b. 1946' },
  ],
} as const;

