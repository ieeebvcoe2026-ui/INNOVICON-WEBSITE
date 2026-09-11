"use client";

import { useState } from "react";
import { ConstellationBackground, Letter, SdgArtwork } from "@/components/hero-artwork";
import { Countdown } from "@/components/countdown";
import type { Sdg } from "@/lib/site-data";

export function HomeHero() {
  const [active, setActive] = useState<Sdg | null>(null);

  return (
    <section
      id="sdgs"
      className="relative min-h-screen w-full overflow-hidden bg-[#202020] pt-16 sm:pt-20 lg:pt-0 lg:flex lg:flex-col lg:justify-between scroll-mt-20"
    >
      <ConstellationBackground activeColor={active?.color} />

      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[71.5%] -translate-x-1/2 z-20 hidden items-center justify-center lg:flex overflow-visible">
        <div className="pointer-events-auto relative flex items-center justify-center">
          <SdgArtwork active={active} setActive={setActive} fill />
        </div>
      </div>

      <div className="pointer-events-none relative z-20 mx-auto flex min-h-screen w-full max-w-[1700px] flex-col justify-between px-6 pb-6 pt-20 sm:px-10 sm:pb-8 sm:pt-24 lg:px-16">
        <div className="pointer-events-auto max-w-[560px] xl:max-w-[620px] lg:my-auto py-4">
          <p className="load-in load-in-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50">
            IEEE Student Branch · BVCOE New Delhi · 4th Edition
          </p>

          <h1 className="load-in load-in-2 cursor-hover mt-3 font-extrabold uppercase leading-[0.85] tracking-tight text-white select-none">
            <span className="block text-[13vw] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[5.75rem] xl:text-[6.5rem] 2xl:text-[7.25rem]">
              <Letter c={active?.color ?? "#ffffff"}>I</Letter>N
              <Letter c={active?.color ?? "#ffffff"}>N</Letter>OV
              <Letter c={active?.color ?? "#ffffff"}>I</Letter>CO
              <Letter c={active?.color ?? "#ffffff"}>N</Letter>
            </span>
            <span className="block text-[13vw] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[5.75rem] xl:text-[6.5rem] 2xl:text-[7.25rem]">
              4.0
            </span>
          </h1>

          <p className="load-in load-in-3 mt-3 sm:mt-4 font-sans font-semibold text-base sm:text-xl md:text-2xl uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white">
            HARDWARE <span className="text-white/50 mx-1 font-light">×</span> SOFTWARE EXPO
          </p>

          <h2 className="load-in load-in-3 mt-2 sm:mt-4 font-bold text-sm sm:text-xl lg:text-2xl uppercase tracking-wide text-white">
            BUILD. INNOVATE. IMPACT.
          </h2>

          <div className="load-in load-in-4 mt-6 sm:mt-7">
            <Countdown compact />
          </div>
        </div>

        <div className="relative mt-8 mb-4 w-full max-w-[420px] mx-auto lg:hidden">
          <SdgArtwork active={active} setActive={setActive} />
        </div>

      </div>
    </section>
  );
}
