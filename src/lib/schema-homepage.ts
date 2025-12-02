/**
 * Homepage-specific schema markup for AEO
 * Includes: WebSite, Organization, ExhibitionEvent, FAQPage, ItemList
 */

import { SITE_CONFIG, SECTION_THEMES, FEATURED_PHOTOGRAPHERS } from './constants';

export function generateHomepageSchemas() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Organization (MoMA Virtual Gallery)
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.siteName,
        alternateName: SITE_CONFIG.siteNameFull,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        inLanguage: SITE_CONFIG.language,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.url}/favicon.ico`,
          width: 32,
          height: 32,
        },
        image: SITE_CONFIG.ogImage,
        
        // Parent organization
        parentOrganization: {
          '@type': 'Museum',
          name: 'Museum of Modern Art',
          alternateName: 'MoMA',
          url: 'https://www.moma.org',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '11 West 53 Street',
            addressLocality: 'New York',
            addressRegion: 'NY',
            postalCode: '10019',
            addressCountry: 'US',
          },
        },
        
        // Contact
        contactPoint: {
          '@type': 'ContactPoint',
          email: SITE_CONFIG.contactEmail,
          contactType: 'virtual exhibition inquiry',
          availableLanguage: ['en'],
        },
        
        // Social media
        sameAs: [
          'https://www.instagram.com/themuseumofmodernart',
          'https://twitter.com/MuseumModernArt',
          'https://www.facebook.com/MuseumofModernArt',
        ],
        
        // Keywords for discovery
        keywords: SITE_CONFIG.keywords.join(', '),
      },

      // 2. WebSite schema (critical for AI)
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.siteName,
        description: SITE_CONFIG.description,
        inLanguage: SITE_CONFIG.language,
        
        publisher: {
          '@id': `${SITE_CONFIG.url}/#organization`,
        },
        
        // Search functionality
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },

      // 3. ExhibitionEvent schema (the virtual exhibition)
      {
        '@type': 'ExhibitionEvent',
        '@id': `${SITE_CONFIG.url}/#exhibition`,
        name: SITE_CONFIG.exhibitionTitle,
        alternateName: SITE_CONFIG.exhibitionSubtitle,
        description: `${SITE_CONFIG.description} Featuring ${SITE_CONFIG.totalImages} photographs comparing Eastern and Western photographic traditions through AI-powered visual analysis.`,
        
        // Virtual event details
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        
        // Location (virtual)
        location: {
          '@type': 'VirtualLocation',
          url: SITE_CONFIG.url,
          name: 'MoMA Virtual Gallery',
        },
        
        // Organizer
        organizer: {
          '@id': `${SITE_CONFIG.url}/#organization`,
        },
        
        // Free admission
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE_CONFIG.url,
        },
        
        // About - themes
        about: [
          {
            '@type': 'Thing',
            name: 'Photography History',
            description: 'Comparative analysis of Eastern and Western photographic traditions',
          },
          {
            '@type': 'Thing',
            name: 'Computational Art History',
            description: 'AI-powered visual analysis using vision-language models',
          },
          {
            '@type': 'Thing',
            name: 'Cultural Representation',
            description: 'How photographers from different cultures represent their subjects',
          },
        ],
        
        // Contributors (featured photographers)
        contributor: [
          ...FEATURED_PHOTOGRAPHERS.eastern.map(p => ({
            '@type': 'Person',
            name: p.name,
            nationality: p.nationality,
            description: `${p.nationality} photographer (${p.period})`,
          })),
          ...FEATURED_PHOTOGRAPHERS.western.map(p => ({
            '@type': 'Person',
            name: p.name,
            nationality: p.nationality,
            description: `${p.nationality} photographer (${p.period})`,
          })),
        ],
        
        // Image
        image: SITE_CONFIG.ogImage,
        
        // Keywords
        keywords: SITE_CONFIG.keywords.join(', '),
      },

      // 4. FAQPage schema - Quick answers for AI engines
      {
        '@type': 'FAQPage',
        '@id': `${SITE_CONFIG.url}/#faq`,
        inLanguage: SITE_CONFIG.language,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is "The Machine\'s Eye" exhibition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `"The Machine's Eye" is a virtual gallery exhibition that uses AI vision-language models to analyze and compare ${SITE_CONFIG.totalImages} photographs from Eastern and Western photographic traditions. The exhibition explores how cultural background shapes the way photographers represent their subjects, revealing patterns in naming, camera angles, and visual treatment that differ between Asian and Western photographers.`,
            },
          },
          {
            '@type': 'Question',
            name: 'How does the AI curation work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The exhibition uses ${SITE_CONFIG.platform} with ${SITE_CONFIG.framework}. A vision-language model analyzes each photograph for technical elements, subject treatment, camera angle, and representation scores. The system then pairs photographs from Eastern and Western traditions that share similar compositional elements but differ in how they represent their subjects, revealing cultural patterns in the photographic gaze.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What photographers are featured in the exhibition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The exhibition features ${SITE_CONFIG.asianPhotographers} Asian photographers including Shomei Tomatsu, Sheba Chhachhi, Ken Domon, and Daidō Moriyama, alongside ${SITE_CONFIG.westernPhotographers} Western photographers including Diane Arbus, Dorothea Lange, and Felice Beato. The works span from the 19th century to contemporary photography.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What are the main themes of the exhibition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The exhibition is organized into four thematic sections: (1) "The Politics of Names" examines how photographers name or type their subjects; (2) "Traditional Dress, Different Meanings" explores how cultural attire is portrayed by insiders vs outsiders; (3) "Same Decade, Different Distance" compares contemporary works across cultures; (4) "Who Looks Down?" analyzes how camera angle encodes power relationships.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the exhibition free to view?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, "The Machine\'s Eye" virtual exhibition is completely free to access online. The exhibition is available 24/7 at the MoMA Virtual Gallery website, requiring no registration or tickets.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the main thesis of the exhibition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The exhibition\'s central thesis is that Asian photographers, when photographing Asian subjects, consistently humanize their subjects—naming them, meeting them at eye level, treating them as individuals with interiority. Western photographers, when photographing the same populations, tend to type their subjects—reducing them to costumes, locations, or ethnic categories. The AI analysis provides quantitative evidence for these patterns.',
            },
          },
        ],
      },

      // 5. ItemList - Exhibition Sections
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/#sections`,
        name: 'Exhibition Sections',
        description: 'Thematic sections of The Machine\'s Eye exhibition',
        numberOfItems: Object.keys(SECTION_THEMES).length,
        itemListElement: Object.values(SECTION_THEMES).map((section, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            '@id': `${SITE_CONFIG.url}/gallery/${section.id}`,
            name: section.title,
            description: section.thesis,
            keywords: section.keywords.join(', '),
            isPartOf: {
              '@id': `${SITE_CONFIG.url}/#exhibition`,
            },
          },
        })),
      },

      // 6. BreadcrumbList for homepage
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_CONFIG.url}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.url,
          },
        ],
      },
    ],
  };
}

