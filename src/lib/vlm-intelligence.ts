import vlmCorpus from "@/data/vlm_corpus.json";

// Technical rhetoric interpretations
const ANGLE_RHETORIC: Record<string, { meaning: string; cultural: string; effect: string }> = {
  "EYE_LEVEL": {
    meaning: "Equality, mutual recognition",
    cultural: "The 'democratic' angle—peer relationship",
    effect: "Humanizing: grants equal status"
  },
  "HIGH_DOMINANT": {
    meaning: "Power over subject, surveillance",
    cultural: "Diminishes, creates hierarchy",
    effect: "Can objectify OR show vulnerability with empathy"
  },
  "LOW_HEROIC": {
    meaning: "Elevation, monumentalization",
    cultural: "Grants stature and dignity",
    effect: "Humanizing: elevates subject"
  },
  "SLIGHTLY_ABOVE": {
    meaning: "Subtle dominance",
    cultural: "Common in casual portraits",
    effect: "Mild power differential"
  }
};

const LIGHTING_RHETORIC: Record<string, { meaning: string; style: string; effect: string }> = {
  "FRONT": {
    meaning: "Direct, revealing",
    style: "Flat, minimal shadows",
    effect: "Clinical or honest—nothing hidden"
  },
  "LOOP": {
    meaning: "Classic portrait lighting",
    style: "Small shadow under nose",
    effect: "Flattering, conventional dignity"
  },
  "REMBRANDT": {
    meaning: "Chiaroscuro mastery",
    style: "Triangle of light on cheek",
    effect: "Artistic, grants gravitas"
  },
  "SPLIT": {
    meaning: "Dramatic contrast",
    style: "Half face in shadow",
    effect: "Reveals duality, internal conflict"
  },
  "BUTTERFLY": {
    meaning: "Glamour, beauty",
    style: "Shadow under nose like butterfly",
    effect: "Idealizing, Hollywood portrait"
  },
  "RIM": {
    meaning: "Separation, drama",
    style: "Light from behind edges subject",
    effect: "Creates presence, sculptural"
  }
};

const CROP_RHETORIC: Record<string, { meaning: string; distance: string; effect: string }> = {
  "EXTREME_CLOSEUP": {
    meaning: "Intimacy, confrontation",
    distance: "Intimate zone—inside personal space",
    effect: "Psychological access OR intrusion"
  },
  "HEAD_SHOULDERS": {
    meaning: "Traditional portrait",
    distance: "Personal zone—conversational",
    effect: "Balanced, recognizes personhood"
  },
  "THREE_QUARTER": {
    meaning: "Body language visible",
    distance: "Social zone—observational",
    effect: "Context without losing face"
  },
  "FULL_BODY": {
    meaning: "Subject in space",
    distance: "Public zone—documentary",
    effect: "Shows how they carry themselves"
  },
  "ENVIRONMENTAL": {
    meaning: "Person in their world",
    distance: "Public zone—contextual",
    effect: "Can humanize (belonging) OR diminish (lost in scene)"
  }
};

export interface VLMWork {
  object_id: number;
  title: string;
  photographer: string;
  nationality: string[];
  study_group: string;
  has_human_subject: boolean;
  scores: {
    humanization: number;
    othering: number;
    net_score: number;
  };
  subject: {
    title_categorization: string;
    name_if_present: string | null;
    dress_type: string | null;
    environmental_context: string;
    gaze_direction: string | null;
    apparent_awareness: string | null;
  };
  composition: {
    crop_type: string;
    camera_angle: string;
    background_type: string;
  };
  lighting: {
    key_direction: string;
    key_quality: string;
  };
  vlm_wall_text: {
    observation: string;
    question: string;
    avoid_terms: string[];
  };
  vlm_comparative: {
    pairing_candidates: string[];
    key_contrast_points: string[];
    thesis_support: string;
  };
}

// Type the corpus
const corpus = vlmCorpus as { works: VLMWork[] };

// Create a map for quick lookup
const worksMap = new Map<number, VLMWork>();
corpus.works.forEach((work) => {
  worksMap.set(work.object_id, work);
});

/**
 * Get VLM intelligence for a specific artwork by object_id
 */
export function getVLMIntelligence(objectId: number): VLMWork | undefined {
  return worksMap.get(objectId);
}

/**
 * Format camera angle for display
 */
function formatCameraAngle(angle: string): { label: string; meaning: string; isHumanizing: boolean } {
  const angles: Record<string, { label: string; meaning: string; isHumanizing: boolean }> = {
    "EYE_LEVEL": { label: "Eye Level", meaning: "Equals the subject", isHumanizing: true },
    "LOW_HEROIC": { label: "Low Angle", meaning: "Elevates the subject", isHumanizing: true },
    "HIGH_DOMINANT": { label: "High Angle", meaning: "Looks down on subject", isHumanizing: false },
    "SLIGHTLY_ABOVE": { label: "Slightly Above", meaning: "Subtle dominance", isHumanizing: false },
  };
  return angles[angle] || { label: angle.replace(/_/g, " ").toLowerCase(), meaning: "", isHumanizing: false };
}

/**
 * Format title categorization for display
 */
function formatTitleType(type: string, name: string | null): { label: string; detail: string; isHumanizing: boolean } {
  if (type === "INDIVIDUAL_NAME" && name) {
    return { label: "Named", detail: name, isHumanizing: true };
  }
  
  const types: Record<string, { label: string; detail: string; isHumanizing: boolean }> = {
    "INDIVIDUAL_NAME": { label: "Named", detail: "Individual identified", isHumanizing: true },
    "LOCATION": { label: "Location", detail: "Place-based title", isHumanizing: false },
    "GENERIC_TYPE": { label: "Type", detail: "Anonymous category", isHumanizing: false },
    "OCCUPATION": { label: "Role", detail: "Occupation-based", isHumanizing: false },
    "ETHNICITY": { label: "Ethnicity", detail: "Ethnic category", isHumanizing: false },
    "UNTITLED": { label: "Untitled", detail: "No identification", isHumanizing: false },
  };
  return types[type] || { label: type.replace(/_/g, " ").toLowerCase(), detail: "", isHumanizing: false };
}

/**
 * Get the analysis data formatted for VLMLens component
 */
export function getVLMLensData(objectId: number) {
  const work = worksMap.get(objectId);
  if (!work) return null;

  const cameraAngle = formatCameraAngle(work.composition?.camera_angle || "UNKNOWN");
  const titleType = formatTitleType(
    work.subject?.title_categorization || "UNKNOWN",
    work.subject?.name_if_present || null
  );

  // Get rich rhetoric data
  const angleRaw = work.composition?.camera_angle || "UNKNOWN";
  const angleRhetoric = ANGLE_RHETORIC[angleRaw] || { meaning: "", cultural: "", effect: "" };
  
  const lightingRaw = work.lighting?.key_direction || "UNKNOWN";
  const lightingRhetoric = LIGHTING_RHETORIC[lightingRaw] || { meaning: "", style: "", effect: "" };
  
  const cropRaw = work.composition?.crop_type || "UNKNOWN";
  const cropRhetoric = CROP_RHETORIC[cropRaw] || { meaning: "", distance: "", effect: "" };

  return {
    // Core identification
    title: work.title,
    photographer: work.photographer,
    isInsider: work.study_group === "asian_on_asian",
    
    // Humanization analysis
    humanizationScore: work.scores?.humanization || 0,
    otheringScore: work.scores?.othering || 0,
    
    // Camera analysis
    cameraAngle: {
      raw: angleRaw,
      label: cameraAngle.label,
      meaning: cameraAngle.meaning,
      isHumanizing: cameraAngle.isHumanizing,
    },
    
    // Title/naming analysis
    titleType: {
      raw: work.subject?.title_categorization || "UNKNOWN",
      label: titleType.label,
      detail: titleType.detail,
      isHumanizing: titleType.isHumanizing,
    },
    
    // Subject presence
    hasHumanSubject: work.has_human_subject,
    subjectName: work.subject?.name_if_present || null,
    gaze: work.subject?.gaze_direction || null,
    awareness: work.subject?.apparent_awareness || null,
    
    // Lighting
    lighting: {
      direction: lightingRaw,
      quality: work.lighting?.key_quality || "UNKNOWN",
    },
    
    // Camera Setup (rich rhetoric)
    cameraSetup: {
      angle: {
        type: angleRaw.replace(/_/g, " ").toLowerCase(),
        meaning: angleRhetoric.meaning,
        cultural: angleRhetoric.cultural,
        effect: angleRhetoric.effect,
        isHumanizing: angleRaw === "EYE_LEVEL" || angleRaw === "LOW_HEROIC",
      },
      lighting: {
        type: lightingRaw.replace(/_/g, " ").toLowerCase(),
        meaning: lightingRhetoric.meaning,
        style: lightingRhetoric.style,
        effect: lightingRhetoric.effect,
      },
      crop: {
        type: cropRaw.replace(/_/g, " ").toLowerCase(),
        meaning: cropRhetoric.meaning,
        distance: cropRhetoric.distance,
        effect: cropRhetoric.effect,
      },
      quality: work.lighting?.key_quality?.toLowerCase() || "unknown",
    },
    
    // Curated insights
    observation: work.vlm_wall_text?.observation || "",
    question: work.vlm_wall_text?.question || "",
    
    // Comparative analysis
    keyContrastPoints: work.vlm_comparative?.key_contrast_points || [],
    thesisSupport: work.vlm_comparative?.thesis_support || "NEUTRAL",
  };
}

/**
 * Get key contrast points for a pair of artworks
 */
export function getContrastPoints(leftObjectId: number, rightObjectId: number): string[] {
  const leftWork = worksMap.get(leftObjectId);
  
  if (leftWork?.vlm_comparative?.key_contrast_points) {
    return leftWork.vlm_comparative.key_contrast_points.slice(0, 3);
  }
  
  return [];
}

/**
 * Generate a comparison summary between two works
 */
export function getComparisonSummary(leftObjectId: number, rightObjectId: number) {
  const left = getVLMLensData(leftObjectId);
  const right = getVLMLensData(rightObjectId);
  
  if (!left || !right) return null;
  
  const insights: string[] = [];
  
  // Naming contrast
  if (left.titleType.isHumanizing && !right.titleType.isHumanizing) {
    insights.push(`${left.photographer} names their subject${left.subjectName ? ` (${left.subjectName})` : ''}. ${right.photographer} uses a ${right.titleType.label.toLowerCase()} title.`);
  }
  
  // Camera angle contrast
  if (left.cameraAngle.isHumanizing && !right.cameraAngle.isHumanizing) {
    insights.push(`${left.photographer} shoots at ${left.cameraAngle.label.toLowerCase()}. ${right.photographer} ${right.cameraAngle.meaning.toLowerCase()}.`);
  }
  
  // Score gap
  const humanGap = left.humanizationScore - right.humanizationScore;
  if (humanGap > 2) {
    insights.push(`Humanization gap: +${humanGap.toFixed(1)} points.`);
  }
  
  return {
    left,
    right,
    insights,
    humanizationGap: humanGap,
    contrastPoints: getContrastPoints(leftObjectId, rightObjectId),
  };
}

/**
 * Get all works in the corpus
 */
export function getAllWorks(): VLMWork[] {
  return corpus.works;
}
