"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { methodology, mantlepiece, getImagePath } from "@/lib/gallery-data";

const curatorAgents = [
  {
    id: "technical",
    name: "Technical Agent",
    role: "Examines camera mechanics",
    analyzes: "Camera angle, crop type, depth of field, background treatment",
    color: "bg-neutral-500",
    question: "Where does the photographer physically position themselves relative to the subject?"
  },
  {
    id: "lighting",
    name: "Lighting Agent",
    role: "Reads visual mood",
    analyzes: "Key direction, quality, contrast, shadow depth",
    color: "bg-amber-500",
    question: "How does light sculpt the subject's presence—or absence—in the frame?"
  },
  {
    id: "subject",
    name: "Subject Agent",
    role: "Interprets presentation",
    analyzes: "Dress, environment, posture, apparent awareness",
    color: "bg-emerald-500",
    question: "How is the subject positioned within their world—as participant or specimen?"
  },
  {
    id: "representation",
    name: "Representation Agent",
    role: "Decodes identity markers",
    analyzes: "Title type, naming conventions, gaze direction, consent signals",
    color: "bg-blue-500",
    question: "Is this person named, typed, or made anonymous by the photograph's metadata?"
  },
  {
    id: "composition",
    name: "Composition Agent",
    role: "Maps power structures",
    analyzes: "Framing, hierarchy, spatial relationships, visual dominance",
    color: "bg-purple-500",
    question: "What visual grammar encodes authority, equality, or subjugation?"
  },
  {
    id: "synthesis",
    name: "Synthesis Agent",
    role: "Integrates all findings",
    analyzes: "Cross-agent patterns, humanization score, othering score",
    color: "bg-rose-500",
    question: "How do these elements combine into measurable patterns of representation?"
  }
];

function AgentCard({ 
  agent, 
  isActive, 
  isComplete,
  onClick 
}: { 
  agent: typeof curatorAgents[0]; 
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left transition-all duration-500 ${
        isActive 
          ? "bg-black text-white" 
          : isComplete 
            ? "bg-neutral-50 text-neutral-900" 
            : "bg-white text-neutral-400 hover:bg-neutral-50"
      }`}
    >
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
            isActive ? "animate-pulse" : ""
          } ${isActive || isComplete ? agent.color : "bg-neutral-200"}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{agent.name}</span>
              {isComplete && !isActive && (
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className={`text-xs mt-0.5 transition-colors ${
              isActive ? "text-white/60" : "text-neutral-400"
            }`}>
              {agent.role}
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded detail when active */}
      <div className={`overflow-hidden transition-all duration-500 ${
        isActive ? "max-h-40" : "max-h-0"
      }`}>
        <div className="p-4 pt-0">
          <p className="text-sm text-white/80">{agent.analyzes}</p>
        </div>
      </div>
    </button>
  );
}

export default function MethodologySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setIsAutoPlaying(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveAgentIndex(prev => {
        if (prev >= curatorAgents.length - 1) {
          setIsAutoPlaying(false);
          setTimeout(() => setShowScores(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeAgent = activeAgentIndex >= 0 ? curatorAgents[activeAgentIndex] : null;

  return (
    <section 
      ref={sectionRef} 
      id="methodology" 
      className="py-24 lg:py-32 bg-white border-b border-neutral-100"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500">
            Agentic Curation
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light">
            Six Agents, One Vision
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 leading-relaxed">
            A team of specialized AI agents examines each photograph, 
            each trained to detect different dimensions of visual representation.
            Together, they surface patterns that take art historians decades to articulate.
          </p>
        </div>

        {/* Main visualization */}
        <div 
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Left: Example image with overlay */}
          <div className="relative">
            <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
              <Image
                src={getImagePath(mantlepiece.asian.image_path)}
                alt={mantlepiece.asian.title}
                fill
                className="object-cover"
              />
              
              {/* Agent-specific visual overlays */}
              {activeAgent && !showScores && (
                <div key={activeAgent.id} className="animate-fade-in">
                  {/* Technical Agent - Camera angle lines */}
                  {activeAgent.id === "technical" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="50" y1="0" x2="0" y2="100" stroke="#737373" strokeWidth="0.3" strokeDasharray="2,2" className="animate-pulse" />
                      <line x1="50" y1="0" x2="100" y2="100" stroke="#737373" strokeWidth="0.3" strokeDasharray="2,2" className="animate-pulse" />
                      <line x1="50" y1="0" x2="50" y2="100" stroke="#737373" strokeWidth="0.3" strokeDasharray="2,2" />
                      <line x1="0" y1="45" x2="100" y2="45" stroke="#10b981" strokeWidth="0.5" className="animate-pulse" />
                      <text x="5" y="43" fill="#10b981" fontSize="3" fontFamily="system-ui">EYE LEVEL</text>
                      <rect x="70" y="8" width="25" height="8" fill="#737373" fillOpacity="0.3" stroke="#737373" strokeWidth="0.3" />
                      <text x="72" y="14" fill="#fff" fontSize="2.5" fontFamily="system-ui">HEAD_SHOULDERS</text>
                    </svg>
                  )}

                  {/* Lighting Agent - Light direction */}
                  {activeAgent.id === "lighting" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="40" height="100" fill="url(#lightGrad)" className="animate-pulse" />
                      <line x1="5" y1="30" x2="40" y2="50" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,1" />
                      <line x1="5" y1="40" x2="45" y2="55" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,1" />
                      <line x1="5" y1="50" x2="50" y2="60" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,1" />
                      <rect x="5" y="85" width="30" height="10" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="0.3" />
                      <text x="7" y="91" fill="#f59e0b" fontSize="2.5" fontFamily="system-ui">SPLIT LIGHT</text>
                      <text x="5" y="25" fill="#f59e0b" fontSize="2.5" fontFamily="system-ui">HARD QUALITY</text>
                    </svg>
                  )}

                  {/* Subject Agent - Body and dress analysis */}
                  {activeAgent.id === "subject" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <ellipse cx="50" cy="55" rx="25" ry="35" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="2,2" className="animate-pulse" />
                      <rect x="5" y="5" width="35" height="10" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.3" />
                      <text x="7" y="11" fill="#10b981" fontSize="2.5" fontFamily="system-ui">POSED_AWARE</text>
                      <rect x="60" y="75" width="35" height="10" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.3" />
                      <text x="62" y="81" fill="#10b981" fontSize="2.5" fontFamily="system-ui">STUDIO CONTEXT</text>
                    </svg>
                  )}

                  {/* Representation Agent - Gaze and naming */}
                  {activeAgent.id === "representation" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <circle cx="50" cy="30" r="12" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1,1" className="animate-pulse" />
                      <rect x="5" y="85" width="60" height="10" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="0.3" />
                      <text x="7" y="91" fill="#3b82f6" fontSize="2.5" fontFamily="system-ui">NAMED: Senji Yamaguchi</text>
                      <text x="60" y="28" fill="#3b82f6" fontSize="2" fontFamily="system-ui">GAZE: averted</text>
                      <line x1="50" y1="30" x2="75" y2="20" stroke="#3b82f6" strokeWidth="0.3" strokeDasharray="1,1" />
                    </svg>
                  )}

                  {/* Composition Agent - Power structure lines */}
                  {activeAgent.id === "composition" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="33" y1="0" x2="33" y2="100" stroke="#a855f7" strokeWidth="0.3" strokeDasharray="3,2" />
                      <line x1="66" y1="0" x2="66" y2="100" stroke="#a855f7" strokeWidth="0.3" strokeDasharray="3,2" />
                      <line x1="0" y1="33" x2="100" y2="33" stroke="#a855f7" strokeWidth="0.3" strokeDasharray="3,2" />
                      <line x1="0" y1="66" x2="100" y2="66" stroke="#a855f7" strokeWidth="0.3" strokeDasharray="3,2" />
                      <circle cx="50" cy="40" r="3" fill="#a855f7" fillOpacity="0.5" className="animate-pulse" />
                      <text x="55" y="42" fill="#a855f7" fontSize="2" fontFamily="system-ui">FOCAL POINT</text>
                      <rect x="5" y="85" width="40" height="10" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="0.3" />
                      <text x="7" y="91" fill="#a855f7" fontSize="2.5" fontFamily="system-ui">SUBJECT CENTERED</text>
                    </svg>
                  )}

                  {/* Synthesis Agent - Final integration */}
                  {activeAgent.id === "synthesis" && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <rect x="5" y="5" width="90" height="90" fill="none" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="2,2" className="animate-pulse" />
                      <line x1="5" y1="5" x2="50" y2="50" stroke="#f43f5e" strokeWidth="0.3" strokeDasharray="1,1" />
                      <line x1="95" y1="5" x2="50" y2="50" stroke="#f43f5e" strokeWidth="0.3" strokeDasharray="1,1" />
                      <line x1="5" y1="95" x2="50" y2="50" stroke="#f43f5e" strokeWidth="0.3" strokeDasharray="1,1" />
                      <line x1="95" y1="95" x2="50" y2="50" stroke="#f43f5e" strokeWidth="0.3" strokeDasharray="1,1" />
                      <circle cx="50" cy="50" r="8" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="0.5" className="animate-pulse" />
                      <text x="45" y="52" fill="#f43f5e" fontSize="3" fontFamily="system-ui">∑</text>
                      <rect x="30" y="85" width="40" height="10" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="0.3" />
                      <text x="32" y="91" fill="#f43f5e" fontSize="2.5" fontFamily="system-ui">INTEGRATING...</text>
                    </svg>
                  )}

                  {/* Bottom text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${activeAgent.color} animate-pulse`} />
                      <span className="text-white/60 text-xs uppercase tracking-wider">
                        {activeAgent.name} analyzing...
                      </span>
                    </div>
                    <p className="text-white font-serif text-lg italic leading-relaxed">
                      &ldquo;{activeAgent.question}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Final scores overlay */}
              {showScores && (
                <div className="absolute inset-0 bg-black/85 flex items-center justify-center transition-opacity duration-700">
                  <div className="text-center">
                    <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-6">
                      Synthesis Complete
                    </p>
                    <div className="flex items-center justify-center gap-12">
                      <div>
                        <div className="text-5xl font-serif font-light text-emerald-400">
                          {mantlepiece.asian.humanization.toFixed(1)}
                        </div>
                        <div className="text-xs tracking-[0.15em] uppercase text-white/50 mt-2">
                          Humanization
                        </div>
                      </div>
                      <div className="w-px h-16 bg-white/20" />
                      <div>
                        <div className="text-5xl font-serif font-light text-rose-400">
                          {mantlepiece.asian.othering.toFixed(1)}
                        </div>
                        <div className="text-xs tracking-[0.15em] uppercase text-white/50 mt-2">
                          Othering
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="mt-4">
              <p className="text-sm text-neutral-500">{mantlepiece.asian.photographer}</p>
              <p className="font-serif text-lg">{mantlepiece.asian.title}</p>
            </div>
          </div>

          {/* Right: Agent list */}
          <div className="flex flex-col">
            <div className="border border-neutral-100 divide-y divide-neutral-100 flex-1">
              {curatorAgents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isActive={activeAgentIndex === index}
                  isComplete={activeAgentIndex > index || showScores}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveAgentIndex(index);
                    setShowScores(false);
                  }}
                />
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="text-center p-4 bg-neutral-50">
                <div className="text-2xl font-serif font-light">{methodology.total_images}</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Images</div>
              </div>
              <div className="text-center p-4 bg-neutral-50">
                <div className="text-2xl font-serif font-light">{curatorAgents.length}</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Agents</div>
              </div>
              <div className="text-center p-4 bg-neutral-50">
                <div className="text-2xl font-serif font-light">2</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Scores</div>
              </div>
            </div>

            {/* Reset button */}
            {showScores && (
              <button
                onClick={() => {
                  setActiveAgentIndex(-1);
                  setShowScores(false);
                  setTimeout(() => setIsAutoPlaying(true), 500);
                }}
                className="mt-4 w-full py-3 border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Watch Agents Again
              </button>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div 
          className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-neutral-50 border-l-2 border-black">
              <h3 className="font-medium mb-3">How the Agents Work</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Each agent is a specialized vision-language model trained to detect specific 
                patterns in photographs. They don&apos;t judge individual images as &ldquo;good&rdquo; or &ldquo;bad&rdquo;—they 
                identify structural patterns that emerge when hundreds of photographs are analyzed 
                together. The synthesis agent integrates all findings into two composite scores.
              </p>
            </div>
            <div className="p-6 bg-neutral-50 border-l-2 border-emerald-500">
              <h3 className="font-medium mb-3">The Key Finding</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Asian photographers documenting Asian subjects consistently score higher on 
                humanization metrics and lower on othering metrics than Western photographers 
                documenting the same populations. The gap is measurable, reproducible, and 
                historically patterned.
              </p>
            </div>
          </div>

          {/* Collection Source */}
          <div className="mt-8 p-6 bg-black text-white">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">Collection Source: MoMA Photography Archive</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  All photographs are drawn from The Museum of Modern Art&apos;s public collection database. 
                  We queried for portrait photographs where the subject appeared to be of Asian descent, 
                  yielding two study groups:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white/5 border border-white/10">
                    <div className="text-amber-400 font-medium mb-1">Asian on Asian</div>
                    <div className="text-white/60 text-xs">
                      51 works by photographers of Asian heritage documenting Asian subjects
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10">
                    <div className="text-blue-400 font-medium mb-1">Western on Asian</div>
                    <div className="text-white/60 text-xs">
                      51 works by Western photographers documenting Asian subjects
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-4">
                  Selection criteria: photographs with identifiable human subjects, spanning 1860s–present, 
                  with sufficient resolution for VLM analysis. No works were excluded based on content—only 
                  on technical analyzability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div 
          className={`mt-16 max-w-3xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-lg text-neutral-600 leading-relaxed">
            The agent team functions as a <em>computational curatorial assistant</em>—not replacing 
            human judgment, but making visible patterns that often remain intuitive or unspoken: 
            where a title erases a name, where a vantage point enforces dominance, where a subject 
            appears as a type rather than a person.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-500">
            <span>Powered by {methodology.platform}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span>{methodology.framework}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

