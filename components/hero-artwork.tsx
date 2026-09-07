"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ALL_HOTSPOTS, byN, pad, type Sdg } from "@/lib/site-data";

export function Letter({ c, children }: { c: string; children: ReactNode }) {
  return <span style={{ color: c, transition: "color 400ms ease" }}>{children}</span>;
}

export function ConstellationBackground({ activeColor = "#4c9f38" }: { activeColor?: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full select-none overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1920 1080"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="greenCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={activeColor} stopOpacity="0.25" />
          <stop offset="50%" stopColor={activeColor} stopOpacity="0.08" />
          <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M -100 140 C 200 60, 520 250, 960 190 S 1420 330, 1980 210" fill="none" stroke="rgba(255, 255, 255, 0.10)" strokeWidth="1.2" />
      <path d="M -60 520 C 260 380, 510 560, 880 430 S 1380 280, 1920 400" fill="none" stroke="rgba(255, 255, 255, 0.10)" strokeWidth="1.2" />
      <path d="M 80 -40 C 380 320, 740 120, 1120 300 S 1680 130, 2040 170" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.2" />
      <path d="M -80 780 C 360 700, 720 840, 1180 660 S 1640 800, 2120 700" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="1.2" />
      <path d="M 680 90 C 1120 30, 1580 260, 1420 700 S 860 900, 680 640" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1.2" />

      <g>
        <circle cx="280" cy="190" r="7" fill="url(#nodeGlow)" />
        <circle cx="280" cy="190" r="2.5" fill="#ffffff" opacity="0.9" />
        <circle cx="480" cy="390" r="6" fill="url(#nodeGlow)" />
        <circle cx="480" cy="390" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="600" cy="610" r="7" fill="url(#nodeGlow)" />
        <circle cx="600" cy="610" r="2.5" fill="#ffffff" opacity="0.9" />
        <circle cx="860" cy="320" r="8" fill="url(#nodeGlow)" />
        <circle cx="860" cy="320" r="3" fill="#ffffff" opacity="0.95" />
        <circle cx="1080" cy="170" r="6" fill="url(#nodeGlow)" />
        <circle cx="1080" cy="170" r="2.5" fill="#ffffff" opacity="0.8" />
        <circle cx="740" cy="690" r="8" fill="url(#nodeGlow)" />
        <circle cx="740" cy="690" r="2.5" fill="#ffffff" opacity="0.75" />
        <circle cx="1540" cy="290" r="6" fill="url(#nodeGlow)" />
        <circle cx="1540" cy="290" r="2.5" fill="#ffffff" opacity="0.8" />
        <circle cx="1400" cy="760" r="7" fill="url(#nodeGlow)" />
        <circle cx="1400" cy="760" r="2.5" fill="#ffffff" opacity="0.85" />
      </g>
    </svg>
  );
}

/** Interactive 3D ribbon of the 17 UN SDGs — the Innovicon circular mark, hover/tap any goal to explore. */
export function SdgArtwork({
  setActive,
  fill,
}: {
  active: Sdg | null;
  setActive: (s: Sdg | null) => void;
  fill?: boolean;
}) {
  const [pinnedSpotId, setPinnedSpotId] = useState<string | null>(null);
  const [pinnedSdg, setPinnedSdg] = useState<Sdg | null>(null);
  const [hoveredSpot, setHoveredSpot] = useState<(typeof ALL_HOTSPOTS)[number] | null>(null);

  const currentSdg = hoveredSpot ? byN(hoveredSpot.n) : pinnedSdg;

  useEffect(() => {
    setActive(currentSdg);
  }, [currentSdg, setActive]);

  const handleEnter = (spot: (typeof ALL_HOTSPOTS)[number], sdg: Sdg) => {
    setHoveredSpot(spot);
    setActive(sdg);
  };

  const handleLeave = () => {
    setHoveredSpot(null);
    setActive(pinnedSdg);
  };

  const handleClick = (spot: (typeof ALL_HOTSPOTS)[number], sdg: Sdg) => {
    if (pinnedSpotId === spot.id) {
      setPinnedSpotId(null);
      setPinnedSdg(null);
      setActive(null);
    } else {
      setPinnedSpotId(spot.id);
      setPinnedSdg(sdg);
      setActive(sdg);
    }
  };

  return (
    <div
      className={
        fill
          ? "relative w-[min(94vh,56vw)] h-[min(94vh,56vw)] aspect-square select-none"
          : "relative w-full max-w-[480px] aspect-square mx-auto select-none"
      }
    >
      <div className="absolute inset-0 h-full w-full select-none pointer-events-none flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sdg-circle.svg"
          alt="Complete 3D circular ribbon of the 17 UN Sustainable Development Goals — the Innovicon 4.0 mark"
          className="h-full w-full object-contain select-none drop-shadow-2xl"
          draggable={false}
        />
      </div>

      {ALL_HOTSPOTS.map((spot) => {
        const sdg = byN(spot.n);
        const isThisSpotActive = hoveredSpot ? hoveredSpot.id === spot.id : pinnedSpotId === spot.id;

        return (
          <button
            key={spot.id}
            type="button"
            aria-label={`SDG ${spot.n}: ${sdg.name}`}
            onMouseEnter={() => handleEnter(spot, sdg)}
            onMouseLeave={handleLeave}
            onFocus={() => handleEnter(spot, sdg)}
            onBlur={handleLeave}
            onClick={() => handleClick(spot, sdg)}
            className="group absolute z-30 h-[8.5%] w-[8.5%] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus-visible:outline-none pointer-events-auto"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              transform: isThisSpotActive ? "scale(1.1)" : "scale(1)",
              transition: "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: isThisSpotActive ? 35 : 30,
            }}
          />
        );
      })}

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
        {currentSdg ? (
          <div
            key={currentSdg.n}
            className="sdg-card-in pointer-events-auto relative flex w-[300px] sm:w-[360px] flex-col justify-between rounded-3xl p-6 sm:p-7 text-left backdrop-blur-2xl select-none"
            style={{
              background: `linear-gradient(180deg, ${currentSdg.color}14, #10111299 60%)`,
              boxShadow: `0 0 0 1px ${currentSdg.color}55, 0 0 70px 14px ${currentSdg.color}33, 0 24px 48px -12px rgba(0,0,0,0.85)`,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span
                  className="cursor-hover font-extrabold uppercase leading-[0.85] tracking-tight text-5xl sm:text-6xl"
                  style={{ color: currentSdg.color }}
                >
                  {pad(currentSdg.n)}
                </span>
                <span className="mt-2 text-sm sm:text-base font-bold uppercase leading-tight tracking-wide text-white">
                  {currentSdg.name}
                </span>
              </div>
              {pinnedSpotId && (
                <span
                  className="flex-shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: currentSdg.color }}
                >
                  Pinned
                </span>
              )}
            </div>

            {currentSdg.n === 3 ? (
              <div className="mt-4 flex items-center justify-between">
                <svg className="h-5 w-24 stroke-[#4c9f38] fill-none stroke-[2]" viewBox="0 0 48 16">
                  <path d="M 0 8 H 7 L 11 1 L 15 15 L 19 5 L 22 10 L 25 8 H 30" strokeLinecap="round" />
                  <path d="M 37 5.5 C 35 3.5, 32 4.5, 33.5 7.5 L 37 11.5 L 40.5 7.5 C 42 4.5, 39 3.5, 37 5.5 Z" fill="#4c9f38" stroke="none" />
                </svg>
                <span className="h-2 w-2 rounded-full bg-[#4c9f38] animate-ping opacity-85" />
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2">
                <div className="h-0.5 w-16 rounded-full" style={{ backgroundColor: currentSdg.color }} />
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: currentSdg.color }} />
              </div>
            )}

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/85 font-normal">{currentSdg.blurb}</p>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] uppercase tracking-wider text-white/45 font-medium">
              <span>UN Goal #{pad(currentSdg.n)}</span>
              <button
                type="button"
                onClick={() => {
                  if (pinnedSpotId) {
                    setPinnedSpotId(null);
                    setPinnedSdg(null);
                    setActive(null);
                  } else if (hoveredSpot) {
                    setPinnedSpotId(hoveredSpot.id);
                    setPinnedSdg(currentSdg);
                  }
                }}
                className="rounded-full px-2 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                {pinnedSpotId ? "Click to unpin" : "Click to pin"}
              </button>
            </div>
          </div>
        ) : (
          <div className="pointer-events-none flex flex-col items-center justify-center text-center p-3 select-none max-w-[210px]">
            <div className="text-sm sm:text-base font-bold uppercase tracking-wider text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <span className="lg:hidden">
                TAP TO EXPLORE
                <br />
                THE 17 SDGs
              </span>
              <span className="hidden lg:inline">
                HOVER TO EXPLORE
                <br />
                THE 17 SDGs
              </span>
            </div>

            <svg width="40" height="26" viewBox="0 0 50 30" fill="none" className="text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mt-1 animate-bounce">
              <path d="M 25 4 C 18 10, 10 18, 6 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 14 18 L 6 24 L 16 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <p className="mt-1 text-[10px] sm:text-[10.5px] font-sans leading-snug text-white/65 font-normal">
              <span className="lg:hidden">Tap any goal along the circular ribbon to explore</span>
              <span className="hidden lg:inline">Hover over any goal along the circular ribbon to explore</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
