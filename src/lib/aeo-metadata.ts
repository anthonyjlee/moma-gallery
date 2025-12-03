/**
 * AEO (Answer Engine Optimization) Metadata Generation
 * 
 * Generates meta tags optimized for search engines and AI answer engines
 * to extract and cite information from MoMA Virtual Gallery pages.
 */

import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

export interface AEOMetadataParams {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

/**
 * Generate complete metadata for AEO optimization
 */
export function generateAEOMetadata(params: AEOMetadataParams): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
  } = params;

  const fullTitle = `${title} | ${SITE_CONFIG.siteName}`;
  const siteImage = image || SITE_CONFIG.ogImage;

  return {
    // Basic metadata
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    
    // Authors
    ...(author && {
      authors: [{ name: author }],
    }),

    // Open Graph (Facebook, LinkedIn, AI scrapers)
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      type,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    } as Metadata['openGraph'],

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [siteImage],
      creator: SITE_CONFIG.twitterHandle,
    },

    // Canonical URL (prevent duplicate content)
    alternates: {
      canonical,
    },

    // Robots configuration (tell AI crawlers what to do)
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Metadata preset for homepage
 */
export function homepageMetadata(): Metadata {
  return generateAEOMetadata({
    title: 'The Machine\'s Eye - VLM-Curated Photography',
    description: `${SITE_CONFIG.description} Featuring ${SITE_CONFIG.totalImages} photographs by ${SITE_CONFIG.asianPhotographers} Asian and ${SITE_CONFIG.westernPhotographers} Western photographers.`,
    keywords: [
      ...SITE_CONFIG.keywords,
      'homepage',
      'virtual exhibition',
      'art curation',
    ],
    canonical: SITE_CONFIG.url,
  });
}

/**
 * Metadata generator for gallery section pages
 */
export function gallerySectionMetadata(params: {
  sectionTitle: string;
  thesis: string;
  sectionId: string;
  pairCount: number;
}): Metadata {
  const { sectionTitle, thesis, sectionId, pairCount } = params;

  return generateAEOMetadata({
    title: `${sectionTitle} - The Machine's Eye`,
    description: `${thesis} Explore ${pairCount} photograph pairings comparing Eastern and Western photographic traditions in this section of MoMA's virtual exhibition.`,
    keywords: [
      sectionTitle,
      'photography comparison',
      'Eastern photography',
      'Western photography',
      'visual culture',
      'photographic gaze',
      ...SITE_CONFIG.keywords.slice(0, 5),
    ],
    canonical: `${SITE_CONFIG.url}/gallery/${sectionId}`,
    type: 'article',
    section: sectionTitle,
  });
}

/**
 * Metadata generator for individual artwork pages
 */
export function artworkMetadata(params: {
  title: string;
  photographer: string;
  nationality: string[];
  description: string;
  objectId: number;
}): Metadata {
  const { title, photographer, nationality, description, objectId } = params;

  return generateAEOMetadata({
    title: `${title} by ${photographer}`,
    description: `${description} Part of MoMA's "The Machine's Eye" virtual exhibition exploring photographic representation across cultures.`,
    keywords: [
      title,
      photographer,
      ...nationality,
      'photography',
      'MoMA collection',
      'virtual exhibition',
    ],
    canonical: `${SITE_CONFIG.url}/artwork/${objectId}`,
    type: 'article',
    author: photographer,
  });
}

/**
 * Metadata generator for photographer profile pages
 */
export function photographerMetadata(params: {
  name: string;
  nationality: string;
  period: string;
  bio?: string;
  workCount: number;
}): Metadata {
  const { name, nationality, period, bio, workCount } = params;

  const description = bio || 
    `${name} (${period}) - ${nationality} photographer featured in MoMA's "The Machine's Eye" exhibition with ${workCount} works on display.`;

  return generateAEOMetadata({
    title: `${name} - Photographer`,
    description,
    keywords: [
      name,
      nationality,
      'photographer',
      'photography',
      period,
      'MoMA artist',
    ],
    canonical: `${SITE_CONFIG.url}/photographer/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`,
    type: 'profile',
  });
}

/**
 * Metadata for methodology/about page
 */
export function methodologyMetadata(): Metadata {
  return generateAEOMetadata({
    title: 'Methodology - How the Machine Looks',
    description: `Learn how ${SITE_CONFIG.platform} uses ${SITE_CONFIG.framework} to analyze ${SITE_CONFIG.totalImages} photographs across Eastern and Western traditions. A new approach to computational art history.`,
    keywords: [
      'methodology',
      'VLM analysis',
      'vision language model',
      'AI art curation',
      'computational art history',
      'digital humanities',
      SITE_CONFIG.platform,
    ],
    canonical: `${SITE_CONFIG.url}/methodology`,
    type: 'article',
  });
}

/**
 * Generate keywords from artwork data
 */
export function generateKeywords(params: {
  primary: string[];
  photographer?: string;
  nationality?: string[];
  themes?: string[];
}): string[] {
  const { primary, photographer, nationality = [], themes = [] } = params;

  const baseKeywords = [
    ...primary,
    'MoMA',
    'virtual gallery',
    'photography exhibition',
  ];

  if (photographer) {
    baseKeywords.push(photographer);
  }

  return [...new Set([...baseKeywords, ...nationality, ...themes])];
}



