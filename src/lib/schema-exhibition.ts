/**
 * Exhibition & Artwork schema markup for AEO
 * Includes: VisualArtwork, ImageObject, Person (Photographer), ItemList (Pairings)
 */

import { SITE_CONFIG, SECTION_THEMES } from './constants';
import type { Section, Pair, Artwork } from './gallery-data';

/**
 * Generate schema for a single artwork/photograph
 */
export function generateArtworkSchema(artwork: Artwork, side: 'eastern' | 'western') {
  const photographerSlug = artwork.photographer.toLowerCase().replace(/\s+/g, '-');
  
  return {
    '@type': 'VisualArtwork',
    '@id': `${SITE_CONFIG.url}/artwork/${artwork.object_id}#artwork`,
    name: artwork.title,
    
    // Artwork details
    artform: 'Photograph',
    artMedium: 'Photography',
    
    // Creator
    creator: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/photographer/${photographerSlug}#person`,
      name: artwork.photographer,
    },
    
    // Image
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_CONFIG.url}/artwork/${artwork.object_id}#image`,
      url: `${SITE_CONFIG.url}${artwork.image_path}`,
      contentUrl: `${SITE_CONFIG.url}${artwork.image_path}`,
      caption: artwork.title,
      creator: {
        '@type': 'Person',
        name: artwork.photographer,
      },
    },
    
    // Part of exhibition
    isPartOf: {
      '@id': `${SITE_CONFIG.url}/#exhibition`,
    },
    
    // Location (MoMA collection)
    locationCreated: {
      '@type': 'Place',
      name: 'Museum of Modern Art Collection',
    },
    
    // Additional properties for AI analysis
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'humanization_score',
        value: artwork.humanization,
        description: 'VLM-computed score for subject humanization (0-5)',
      },
      {
        '@type': 'PropertyValue',
        name: 'othering_score',
        value: artwork.othering,
        description: 'VLM-computed score for subject othering (0-5)',
      },
    ],
    
    // Keywords
    keywords: [
      artwork.photographer,
      side === 'eastern' ? 'Asian photography' : 'Western photography',
      'MoMA collection',
      'photography',
    ].join(', '),
    
    // Language
    inLanguage: SITE_CONFIG.language,
  };
}

/**
 * Generate schema for a photograph pairing
 */
export function generatePairingSchema(pair: Pair, sectionId: string) {
  const humanizationGap = pair.left.humanization - pair.right.humanization;
  
  return {
    '@type': 'CreativeWork',
    '@id': `${SITE_CONFIG.url}/gallery/${sectionId}/${pair.id}#pairing`,
    name: `Pairing: ${pair.left.photographer} vs ${pair.right.photographer}`,
    description: pair.wall_text || `A visual comparison exploring differences in photographic representation between Eastern and Western traditions.`,
    
    // The two artworks being compared
    hasPart: [
      generateArtworkSchema(pair.left, 'eastern'),
      generateArtworkSchema(pair.right, 'western'),
    ],
    
    // Comparison metadata
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'humanization_gap',
        value: humanizationGap.toFixed(1),
        description: 'Difference in humanization scores (Eastern - Western)',
      },
    ],
    
    // Part of section
    isPartOf: {
      '@id': `${SITE_CONFIG.url}/gallery/${sectionId}`,
    },
    
    // About
    about: {
      '@type': 'Thing',
      name: 'Photographic Representation',
      description: 'Cultural differences in how photographers represent their subjects',
    },
    
    // Analysis questions
    learningResourceType: 'visual comparison',
    educationalUse: 'art analysis',
  };
}

/**
 * Generate schema for a gallery section
 */
export function generateSectionSchema(section: Section) {
  const sectionTheme = Object.values(SECTION_THEMES).find(t => t.id === section.id);
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Section as CreativeWork
      {
        '@type': 'CreativeWork',
        '@id': `${SITE_CONFIG.url}/gallery/${section.id}#section`,
        name: section.title,
        headline: section.title,
        description: section.thesis,
        
        // Part of exhibition
        isPartOf: {
          '@id': `${SITE_CONFIG.url}/#exhibition`,
        },
        
        // Contains pairings
        hasPart: section.pairs.map(pair => ({
          '@id': `${SITE_CONFIG.url}/gallery/${section.id}/${pair.id}#pairing`,
        })),
        
        // Keywords
        keywords: sectionTheme?.keywords.join(', ') || section.title,
        
        // About
        about: {
          '@type': 'Thing',
          name: section.title,
          description: section.thesis,
        },
        
        // Educational
        learningResourceType: 'exhibition section',
        educationalUse: 'art history education',
        
        // Language
        inLanguage: SITE_CONFIG.language,
      },

      // ItemList of pairings
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/gallery/${section.id}#pairings`,
        name: `${section.title} - Photograph Pairings`,
        description: `${section.pairs.length} photograph pairings exploring: ${section.thesis}`,
        numberOfItems: section.pairs.length,
        itemListElement: section.pairs.map((pair, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: generatePairingSchema(pair, section.id),
        })),
      },

      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_CONFIG.url}/gallery/${section.id}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gallery',
            item: `${SITE_CONFIG.url}/gallery`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: section.title,
            item: `${SITE_CONFIG.url}/gallery/${section.id}`,
          },
        ],
      },
    ],
  };
}

/**
 * Generate schema for photographer profile
 */
export function generatePhotographerSchema(params: {
  name: string;
  artworks: Artwork[];
  side: 'eastern' | 'western';
}) {
  const { name, artworks, side } = params;
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Person schema
      {
        '@type': 'Person',
        '@id': `${SITE_CONFIG.url}/photographer/${slug}#person`,
        name: name,
        jobTitle: 'Photographer',
        description: `Photographer featured in MoMA's "The Machine's Eye" exhibition with ${artworks.length} works.`,
        
        // Works
        workExample: artworks.map(artwork => ({
          '@type': 'VisualArtwork',
          '@id': `${SITE_CONFIG.url}/artwork/${artwork.object_id}#artwork`,
          name: artwork.title,
        })),
        
        // Part of exhibition
        subjectOf: {
          '@id': `${SITE_CONFIG.url}/#exhibition`,
        },
        
        // Keywords
        keywords: [
          name,
          'photographer',
          side === 'eastern' ? 'Asian photography' : 'Western photography',
          'MoMA',
        ].join(', '),
      },

      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_CONFIG.url}/photographer/${slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Photographers',
            item: `${SITE_CONFIG.url}/photographers`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: name,
            item: `${SITE_CONFIG.url}/photographer/${slug}`,
          },
        ],
      },
    ],
  };
}

/**
 * Generate schema for methodology/about page
 */
export function generateMethodologySchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Article about methodology
      {
        '@type': 'TechArticle',
        '@id': `${SITE_CONFIG.url}/methodology#article`,
        headline: 'How the Machine Looks: VLM Curation Methodology',
        description: `Technical methodology behind MoMA's "The Machine's Eye" exhibition, using ${SITE_CONFIG.platform} with ${SITE_CONFIG.framework} to analyze ${SITE_CONFIG.totalImages} photographs.`,
        
        // Author (the platform)
        author: {
          '@type': 'Organization',
          name: SITE_CONFIG.platform,
        },
        
        // Publisher
        publisher: {
          '@id': `${SITE_CONFIG.url}/#organization`,
        },
        
        // About
        about: [
          {
            '@type': 'Thing',
            name: 'Vision-Language Models',
            description: 'AI systems that analyze and describe visual content',
          },
          {
            '@type': 'Thing',
            name: 'Computational Art History',
            description: 'Using computational methods to analyze art',
          },
          {
            '@type': 'SoftwareApplication',
            name: SITE_CONFIG.platform,
            applicationCategory: 'AI Analysis Platform',
          },
        ],
        
        // Technical details
        proficiencyLevel: 'Expert',
        
        // Keywords
        keywords: [
          'VLM',
          'vision-language model',
          'AI curation',
          'computational art history',
          'photography analysis',
          SITE_CONFIG.platform,
          SITE_CONFIG.framework,
        ].join(', '),
        
        // Language
        inLanguage: SITE_CONFIG.language,
      },

      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_CONFIG.url}/methodology#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Methodology',
            item: `${SITE_CONFIG.url}/methodology`,
          },
        ],
      },
    ],
  };
}
