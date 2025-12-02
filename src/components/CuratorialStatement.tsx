"use client";

import { useEffect, useRef, useState } from "react";
import { methodology } from "@/lib/gallery-data";

const curatorialStatement = [
  {
    text: "This exhibition begins with a simple shift in roles: what happens when we ask a machine, not a curator, to look first?",
    isLede: true
  },
  {
    text: `Consider two portraits. In Shomei Tomatsu's Hibakusha Senji Yamaguchi, Nagasaki, we meet a named individual with a specific history. In Diane Arbus's Man in an Indian headdress, N.Y.C., 1969, the subject is an anonymous type. This simple act of naming—or withholding a name—reveals a pattern that repeats across the exhibition's twenty photographic pairings.`
  },
  {
    text: `Time and again, Asian photographers like Ram Rahman and Mieko Shiomi identify their subjects as individuals. In contrast, their Western counterparts, from Felice Beato to Maxime Du Camp, often title their images with generic locations or roles: Temple of Confucius, Grand Temple d'Isis. The person becomes a feature of an exoticized landscape rather than an actor within it.`,
    isThesis: true
  },
  {
    text: `The contrast deepens in how bodies are presented. In Sheba Chhachhi's portraits, activists such as Sathyarani appear as collaborators; traditional dress is one strand of a complex identity. For early Western photographers like Pierre Trémaux, a Nubian sitter's attire becomes a marker of foreignness, an element in a picturesque scene. Technical choices echo this divide. Many Asian photographers in this collection work at eye level, fostering a sense of reciprocity. By comparison, Western photographers documenting other cultures—from Beato in nineteenth-century China to Dorothea Lange in mid-century Hong Kong—often adopt a slightly elevated, looking-down position that quietly reinforces visual and social hierarchy.`
  },
  {
    text: `The Machine's Eye uses a vision–language model—an AI system that turns images into words—to trace these habits of seeing. Working only from visual and textual patterns, it registered a consistent "humanization gap" on a ten-point scale between the two cohorts, with Asian photographers scoring several points higher on average. The number is not the point; it gives an empirical vocabulary to a long-held understanding: the camera is never neutral. It is an extension of a cultural viewpoint, guided by assumptions about who is granted a name and who is treated as an object to be framed.`
  },
  {
    text: "This exhibition invites us to see how we see, and to question whose humanity we prioritize.",
    isClosing: true
  }
];

export default function CuratorialStatement() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="thesis" className="py-24 lg:py-32 bg-[#faf9f7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neutral-500">
            Curatorial Statement
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light">
            The Machine's Eye
          </h2>
        </div>

        {/* Statement paragraphs */}
        <div className="space-y-8">
          {curatorialStatement.map((paragraph, index) => (
            paragraph.isThesis ? (
              <div
                key={index}
                className={`my-12 py-8 px-8 bg-black text-white transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-center">
                  {paragraph.text}
                </p>
              </div>
            ) : (
              <p
                key={index}
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  paragraph.isLede 
                    ? "text-2xl md:text-3xl font-serif font-light leading-relaxed text-neutral-800" 
                    : paragraph.isClosing
                      ? "text-xl md:text-2xl font-serif italic leading-relaxed text-neutral-700 pt-8 border-t border-neutral-200"
                      : "text-lg leading-relaxed text-neutral-700"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {paragraph.text}
              </p>
            )
          ))}
        </div>

        {/* Attribution */}
        <div 
          className={`mt-16 pt-8 border-t border-neutral-200 flex items-center justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Powered by {methodology.platform}</p>
              <p className="text-xs text-neutral-500">{methodology.framework}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-neutral-500">{methodology.total_images} photographs</p>
            <p className="text-xs text-neutral-400">{methodology.asian_photographers} Asian · {methodology.western_photographers} Western</p>
          </div>
        </div>
      </div>
    </section>
  );
}
