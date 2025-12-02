"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { mantlepiece, getImagePath } from "@/lib/gallery-data";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setShowQuestion(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative z-10 pt-24 pb-8 text-center text-white px-6">
        <div 
          className={`transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/50">
            MoMA Virtual Exhibition
          </span>
        </div>

        <h1 
          className={`mt-6 font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          The Machine's Eye
        </h1>

        {/* Key observation */}
        <p 
          className={`mt-8 text-lg md:text-xl text-white/70 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Both Shomei Tomatsu and Diane Arbus use an eye-level camera.
        </p>
      </div>

      {/* Split image view */}
      <div className="relative flex-1 flex min-h-[50vh]">
        {/* Left - Tomatsu */}
        <div className="w-1/2 relative overflow-hidden">
          <div 
            className={`absolute inset-0 transition-all duration-[1500ms] ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <Image
              src={getImagePath(mantlepiece.asian.image_path)}
              alt={mantlepiece.asian.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          {/* Title callout */}
          <div 
            className={`absolute bottom-0 left-0 right-0 p-6 lg:p-10 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">
              Tomatsu's title names a person
            </p>
            <h3 className="font-serif text-white text-xl lg:text-2xl leading-snug italic">
              "{mantlepiece.asian.title}"
            </h3>
            <p className="text-amber-400/80 text-sm mt-3">
              {mantlepiece.asian.photographer}
            </p>
          </div>
        </div>

        {/* Center divider */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-10 flex items-center">
          <div 
            className={`flex flex-col items-center transition-all duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-white/40" />
            <div className="w-px h-20 bg-gradient-to-t from-transparent to-white/40" />
          </div>
        </div>

        {/* Right - Arbus */}
        <div className="w-1/2 relative overflow-hidden">
          <div 
            className={`absolute inset-0 transition-all duration-[1500ms] ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <Image
              src={getImagePath(mantlepiece.western.image_path)}
              alt={mantlepiece.western.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          {/* Title callout */}
          <div 
            className={`absolute bottom-0 left-0 right-0 p-6 lg:p-10 text-right transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1200ms" }}
          >
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">
              Arbus's title describes a costume
            </p>
            <h3 className="font-serif text-white text-xl lg:text-2xl leading-snug italic">
              "{mantlepiece.western.title}"
            </h3>
            <p className="text-blue-400/80 text-sm mt-3">
              {mantlepiece.western.photographer}
            </p>
          </div>
        </div>
      </div>

      {/* The question */}
      <div 
        className={`relative z-10 py-12 bg-black transition-all duration-1000 ${
          showQuestion ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white font-light italic leading-relaxed">
            How does a title change who we see?
          </h2>
        </div>
      </div>

      {/* CTA */}
      <div 
        className={`relative z-10 py-8 bg-[#0a0a0a] border-t border-white/10 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "1400ms" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
          <a 
            href="#methodology" 
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            <span>See How the Machine Looks</span>
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-y-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a 
            href="#gallery" 
            className="flex items-center gap-2 px-8 py-4 text-sm tracking-wide border border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            <span>Explore the Pairings</span>
          </a>
        </div>
      </div>
    </section>
  );
}
