"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { sections, getImagePath, type Section, type Pair } from "@/lib/gallery-data";
import { getVLMLensData } from "@/lib/vlm-intelligence";

function ScoreBar({ 
  label, 
  value, 
  maxValue = 5, 
  color, 
  animate 
}: { 
  label: string; 
  value: number; 
  maxValue?: number; 
  color: string;
  animate: boolean;
}) {
  return (
    <div>
      <span className="text-white/60 text-[10px] uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2 mt-0.5">
        <div className="w-16 h-1 bg-white/20 overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-1000 ease-out`}
            style={{ 
              width: animate ? `${(value / maxValue) * 100}%` : '0%',
              transitionDelay: '300ms'
            }}
          />
        </div>
        <span className="text-white text-xs font-medium">{value.toFixed(1)}</span>
      </div>
    </div>
  );
}

function VLMLensOverlay({ 
  objectId, 
  isActive, 
  side 
}: { 
  objectId: number; 
  isActive: boolean; 
  side: "eastern" | "western" 
}) {
  const [phase, setPhase] = useState(0);
  const data = getVLMLensData(objectId);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setPhase(1), 100));
    timers.push(setTimeout(() => setPhase(2), 600));
    timers.push(setTimeout(() => setPhase(3), 1200));
    timers.push(setTimeout(() => setPhase(4), 1800));

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  if (!isActive || !data) return null;

  const accentColor = side === "eastern" ? "amber" : "blue";
  const borderColor = side === "eastern" ? "border-amber-400" : "border-blue-400";

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scan line */}
      {phase >= 1 && phase < 3 && (
        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-scan-down" />
      )}

      {/* Corner brackets */}
      {phase >= 2 && (
        <>
          <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 ${borderColor} opacity-80 transition-all duration-300`} />
          <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 ${borderColor} opacity-80 transition-all duration-300`} />
          <div className={`absolute bottom-24 left-4 w-8 h-8 border-l-2 border-b-2 ${borderColor} opacity-80 transition-all duration-300`} />
          <div className={`absolute bottom-24 right-4 w-8 h-8 border-r-2 border-b-2 ${borderColor} opacity-80 transition-all duration-300`} />
        </>
      )}

      {/* Analysis panel - left side */}
      {phase >= 3 && (
        <div 
          className={`absolute top-14 left-4 right-4 transition-all duration-500 ${
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex gap-2">
            {/* Camera Angle Tag */}
            <div className="bg-black/90 backdrop-blur-sm px-3 py-2 flex-1">
              <div className="text-[9px] text-white/50 uppercase tracking-wider mb-1">Camera Angle</div>
              <div className={`text-sm font-medium ${data.cameraAngle.isHumanizing ? "text-emerald-400" : "text-rose-400"}`}>
                {data.cameraAngle.label}
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">
                {data.cameraAngle.meaning}
              </div>
            </div>

            {/* Title/Naming Tag */}
            <div className="bg-black/90 backdrop-blur-sm px-3 py-2 flex-1">
              <div className="text-[9px] text-white/50 uppercase tracking-wider mb-1">Subject Identity</div>
              <div className={`text-sm font-medium ${data.titleType.isHumanizing ? "text-emerald-400" : "text-rose-400"}`}>
                {data.titleType.label}
              </div>
              <div className="text-[10px] text-white/60 mt-0.5 truncate">
                {data.subjectName || data.titleType.detail}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Score indicator */}
      {phase >= 4 && (
        <div 
          className={`absolute bottom-28 left-4 right-4 transition-all duration-500 ${
            phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-black/90 backdrop-blur-sm px-3 py-2 flex items-center justify-between">
            <div>
              <div className="text-[9px] text-white/50 uppercase tracking-wider">Humanization</div>
              <div className="text-lg font-serif text-emerald-400">{data.humanizationScore.toFixed(1)}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-[9px] text-white/50 uppercase tracking-wider">Othering</div>
              <div className="text-lg font-serif text-rose-400">{data.otheringScore.toFixed(1)}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-right">
              <div className="text-[9px] text-white/50 uppercase tracking-wider">Thesis</div>
              <div className={`text-xs font-medium ${
                data.thesisSupport === "EXEMPLARY" ? "text-emerald-400" : 
                data.thesisSupport === "STRONG_SUPPORT" ? "text-emerald-300" : "text-white/60"
              }`}>
                {data.thesisSupport.replace(/_/g, " ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Center focus indicator */}
      {phase >= 2 && phase < 4 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div className={`absolute inset-0 rounded-full border ${borderColor} opacity-50 animate-ping`} />
            <div className={`absolute inset-3 rounded-full border ${borderColor} opacity-30`} />
          </div>
        </div>
      )}
    </div>
  );
}

function PairCard({ pair, pairIndex }: { pair: Pair; pairIndex: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [activeLens, setActiveLens] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get VLM data for both images
  const leftVLM = getVLMLensData(pair.left.object_id);
  const rightVLM = getVLMLensData(pair.right.object_id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowScores(true), 600);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const humanizationGap = pair.left.humanization - pair.right.humanization;
  const otheringGap = pair.right.othering - pair.left.othering;

  const toggleLens = (side: "left" | "right") => {
    setActiveLens(activeLens === side ? null : side);
  };

  return (
    <div
      ref={cardRef}
      className={`mb-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Wall text for the pair - shown above images */}
      {pair.wall_text && (
        <div 
          className={`mb-8 max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-serif text-lg md:text-xl leading-relaxed text-neutral-700 whitespace-pre-line">
            {pair.wall_text}
          </p>
        </div>
      )}

      {/* The paired images */}
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
        {/* Left photograph (Asian/Eastern) */}
        <div className="group">
          <div className="relative">
            <div 
              className="relative aspect-[4/5] overflow-hidden bg-neutral-900 cursor-pointer"
              onClick={() => toggleLens("left")}
            >
              <Image
                src={getImagePath(pair.left.image_path)}
                alt={pair.left.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* VLM Lens Overlay */}
              <VLMLensOverlay 
                objectId={pair.left.object_id} 
                isActive={activeLens === "left"} 
                side="eastern" 
              />
              
              <div className={`absolute top-4 left-4 bg-amber-500 text-white px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity ${activeLens === "left" ? "opacity-0" : "opacity-100"}`}>
                Eastern
              </div>

              {/* VLM Lens hint */}
              {!activeLens && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-white text-xs">VLM Lens</span>
                  </div>
                </div>
              )}
              
              <div 
                className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                  showScores && !activeLens ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <ScoreBar 
                      label="Humanization" 
                      value={pair.left.humanization} 
                      color="bg-emerald-400"
                      animate={showScores}
                    />
                    <ScoreBar 
                      label="Othering" 
                      value={pair.left.othering} 
                      color="bg-rose-400"
                      animate={showScores}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm text-neutral-500">{pair.left.photographer}</p>
            <h4 className="font-serif text-lg leading-snug line-clamp-2">{pair.left.title}</h4>
          </div>

          {/* VLM Observation for left */}
          {activeLens === "left" && leftVLM && (
            <div className="mt-4 space-y-3 animate-fade-in">
              {/* Camera Setup Panel */}
              {leftVLM.cameraSetup && (
                <div className="p-4 bg-neutral-900 text-white">
                  <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-3">Camera Setup</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-white/50 uppercase tracking-wider text-[9px] mb-1">Angle</div>
                      <div className={`font-medium ${leftVLM.cameraSetup.angle.isHumanizing ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {leftVLM.cameraSetup.angle.type}
                      </div>
                      <div className="text-white/60 mt-1 leading-snug">{leftVLM.cameraSetup.angle.meaning}</div>
                    </div>
                    <div>
                      <div className="text-white/50 uppercase tracking-wider text-[9px] mb-1">Lighting</div>
                      <div className="font-medium text-white">{leftVLM.cameraSetup.lighting.type}</div>
                      <div className="text-white/60 mt-1 leading-snug">{leftVLM.cameraSetup.lighting.meaning}</div>
                    </div>
                    <div>
                      <div className="text-white/50 uppercase tracking-wider text-[9px] mb-1">Framing</div>
                      <div className="font-medium text-white">{leftVLM.cameraSetup.crop.type}</div>
                      <div className="text-white/60 mt-1 leading-snug">{leftVLM.cameraSetup.crop.distance}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-white/70 italic">
                    {leftVLM.cameraSetup.angle.effect}
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-amber-50 border-l-2 border-amber-500">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  <span className="font-semibold text-amber-700">Notice:</span> {leftVLM.observation}
                </p>
                <p className="text-sm italic text-neutral-600 mt-3 border-t border-amber-200 pt-3">
                  {leftVLM.question}
                </p>
              </div>
              {leftVLM.keyContrastPoints && leftVLM.keyContrastPoints.length > 0 && (
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Key Insight</div>
                  <p className="text-neutral-600 leading-relaxed">
                    {leftVLM.keyContrastPoints[0]?.replace(/\*\*/g, '')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right photograph (Western) */}
        <div className="group">
          <div className="relative">
            <div 
              className="relative aspect-[4/5] overflow-hidden bg-neutral-900 cursor-pointer"
              onClick={() => toggleLens("right")}
            >
              <Image
                src={getImagePath(pair.right.image_path)}
                alt={pair.right.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* VLM Lens Overlay */}
              <VLMLensOverlay 
                objectId={pair.right.object_id} 
                isActive={activeLens === "right"} 
                side="western" 
              />
              
              <div className={`absolute top-4 left-4 bg-blue-500 text-white px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity ${activeLens === "right" ? "opacity-0" : "opacity-100"}`}>
                Western
              </div>

              {/* VLM Lens hint */}
              {!activeLens && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-white text-xs">VLM Lens</span>
                  </div>
                </div>
              )}
              
              <div 
                className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                  showScores && !activeLens ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <ScoreBar 
                      label="Humanization" 
                      value={pair.right.humanization} 
                      color="bg-emerald-400"
                      animate={showScores}
                    />
                    <ScoreBar 
                      label="Othering" 
                      value={pair.right.othering} 
                      color="bg-rose-400"
                      animate={showScores}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-sm text-neutral-500">{pair.right.photographer}</p>
            <h4 className="font-serif text-lg leading-snug line-clamp-2">{pair.right.title}</h4>
          </div>

          {/* VLM Observation for right */}
          {activeLens === "right" && rightVLM && (
            <div className="mt-4 space-y-3 animate-fade-in">
              {/* Camera Setup Panel */}
              {rightVLM.cameraSetup && (
                <div className="p-4 bg-neutral-900 text-white">
                  <div className="text-[10px] text-blue-400 uppercase tracking-wider mb-3">Camera Setup</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-white/50 uppercase tracking-wider text-[9px] mb-1">Angle</div>
                      <div className={`font-medium ${rightVLM.cameraSetup.angle.isHumanizing ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {rightVLM.cameraSetup.angle.type}
                      </div>
                      <div className="text-white/60 mt-1 leading-snug">{rightVLM.cameraSetup.angle.meaning}</div>
                    </div>
                    <div>
                      <div className="text-white/50 uppercase tracking-wider text-[9px] mb-1">Lighting</div>
                      <div className="font-medium text-white">{rightVLM.cameraSetup.lighting.type}</div>
                      <div className="text-white/60 mt-1 leading-snug">{rightVLM.cameraSetup.lighting.meaning}</div>
                    </div>
                    <div>
                      <div className="text-white/50 uppercase tracking-wider text-[9px] mb-1">Framing</div>
                      <div className="font-medium text-white">{rightVLM.cameraSetup.crop.type}</div>
                      <div className="text-white/60 mt-1 leading-snug">{rightVLM.cameraSetup.crop.distance}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-white/70 italic">
                    {rightVLM.cameraSetup.angle.effect}
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 border-l-2 border-blue-500">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  <span className="font-semibold text-blue-700">Notice:</span> {rightVLM.observation}
                </p>
                <p className="text-sm italic text-neutral-600 mt-3 border-t border-blue-200 pt-3">
                  {rightVLM.question}
                </p>
              </div>
              {rightVLM.keyContrastPoints && rightVLM.keyContrastPoints.length > 0 && (
                <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Key Insight</div>
                  <p className="text-neutral-600 leading-relaxed">
                    {rightVLM.keyContrastPoints[0]?.replace(/\*\*/g, '')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gap visualization */}
      <div 
        className={`mt-6 p-5 bg-black text-white transition-all duration-700 ${
          showScores ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <div className="text-2xl font-serif font-light text-emerald-400">
              +{humanizationGap.toFixed(1)}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
              Humanization Gap
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-serif font-light text-rose-400">
              +{otheringGap.toFixed(1)}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
              Othering Gap
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-serif font-light text-white">
              {(humanizationGap + otheringGap).toFixed(1)}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
              Contrast Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionComponent({ section, sectionIndex }: { section: Section; sectionIndex: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="mb-32"
      id={section.id}
    >
      {/* Section header */}
      <div 
        className={`mb-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-400">
            Section {String(sectionIndex + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        
        <h3 className="font-serif text-3xl md:text-4xl font-light mb-6">
          {section.title}
        </h3>

        {/* Section thesis */}
        {section.thesis && (
          <div className="my-8 py-6 px-8 bg-black text-white">
            <p className="text-lg md:text-xl font-serif italic text-center leading-relaxed">
              {section.thesis}
            </p>
          </div>
        )}
      </div>

      {/* Pairs in this section - show only first 2 for brevity */}
      {section.pairs.slice(0, 2).map((pair, pairIndex) => (
        <PairCard 
          key={pair.id} 
          pair={pair} 
          pairIndex={pairIndex}
        />
      ))}

      {/* Show more toggle if there are more pairs */}
      {section.pairs.length > 2 && (
        <ExpandablePairs pairs={section.pairs.slice(2)} sectionId={section.id} />
      )}
    </div>
  );
}

function ExpandablePairs({ pairs, sectionId }: { pairs: Pair[]; sectionId: string }) {
  const [expanded, setExpanded] = useState(false);

  if (pairs.length === 0) return null;

  return (
    <div>
      {expanded && pairs.map((pair, pairIndex) => (
        <PairCard 
          key={pair.id} 
          pair={pair} 
          pairIndex={pairIndex + 2}
        />
      ))}
      
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-4 border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
      >
        {expanded ? (
          <>
            <span>Show Less</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            <span>Show {pairs.length} More Pairings</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

export default function PairedGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={galleryRef} id="gallery" className="py-24 lg:py-32 bg-[#faf9f7]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Gallery header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500">
            The Pairings
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light">
            Side by Side
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 leading-relaxed">
            Same techniques, different effects. Each pairing reveals how the photographer's 
            position—cultural, historical, physical—shapes what the camera sees.
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Click any image to read the wall text
          </p>
        </div>

        {/* Section navigation */}
        <div 
          className={`mb-16 flex flex-wrap justify-center gap-2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-4 py-2 text-sm border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-colors"
            >
              {section.title}
            </a>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <SectionComponent 
            key={section.id} 
            section={section} 
            sectionIndex={sectionIndex}
          />
        ))}
      </div>
    </section>
  );
}
