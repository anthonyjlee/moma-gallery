import galleryData from "@/data/gallery.json";

// Exhibition metadata
export const exhibitionTitle = galleryData.exhibition.title;
export const exhibitionSubtitle = galleryData.exhibition.subtitle;

// Methodology stats
export const methodology = {
  total_images: 152,
  human_subjects: 102,
  asian_photographers: 51,
  western_photographers: 51,
  analysis_passes: ["technical", "lighting", "subject", "representation", "composition", "curatorial", "wall_text"],
  platform: "Lydia AI",
  framework: "Multi-pass VLM Analysis"
};

// Helper function to get image path - now just returns the path directly
export function getImagePath(imagePath: string): string {
  return imagePath;
}

// Mantlepiece pairing (hero section) - from gallery.json
export const mantlepiece = {
  asian: {
    object_id: galleryData.mantlepiece.asian.object_id,
    title: galleryData.mantlepiece.asian.title,
    photographer: galleryData.mantlepiece.asian.photographer,
    humanization: galleryData.mantlepiece.asian.humanization,
    othering: galleryData.mantlepiece.asian.othering,
    image_path: galleryData.mantlepiece.asian.image_path
  },
  western: {
    object_id: galleryData.mantlepiece.western.object_id,
    title: galleryData.mantlepiece.western.title,
    photographer: galleryData.mantlepiece.western.photographer,
    humanization: galleryData.mantlepiece.western.humanization,
    othering: galleryData.mantlepiece.western.othering,
    image_path: galleryData.mantlepiece.western.image_path
  },
  gap: galleryData.mantlepiece.asian.humanization - galleryData.mantlepiece.western.humanization,
  curatorial_note: "Tomatsu's portrait names its subject—Senji Yamaguchi, a hibakusha (atomic bomb survivor). Arbus's title reduces its subject to a costume: 'Man in an Indian headdress.' Both are head-and-shoulders portraits from the same decade."
};

// Section type definitions matching new gallery.json structure
export interface Artwork {
  object_id: number;
  title: string;
  photographer: string;
  humanization: number;
  othering: number;
  image_path: string;
}

export interface Pair {
  id: string;
  wall_text: string;
  left: Artwork;
  right: Artwork;
}

export interface Section {
  id: string;
  title: string;
  thesis: string;
  intro_text: string;
  pairs: Pair[];
}

// Export all sections directly from JSON
export const sections: Section[] = galleryData.sections.map(s => ({
  id: s.id,
  title: s.title,
  thesis: s.thesis,
  intro_text: s.intro_text,
  pairs: s.pairs.map(p => ({
    id: p.id,
    wall_text: p.wall_text,
    left: p.left,
    right: p.right
  }))
}));

// Get a specific section by ID
export function getSection(sectionId: string): Section | undefined {
  return sections.find(s => s.id === sectionId);
}

// Get all pairs across all sections
export function getAllPairs(): Pair[] {
  return sections.flatMap(s => s.pairs);
}

// Calculate humanization gap for a pair
export function calculateGap(pair: Pair): number {
  const humanGap = pair.left.humanization - pair.right.humanization;
  const otherGap = pair.right.othering - pair.left.othering;
  return humanGap + otherGap;
}
