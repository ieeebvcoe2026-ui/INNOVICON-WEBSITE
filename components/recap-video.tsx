"use client";

import { useEffect, useRef, useState } from "react";

export function RecapVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<number | null>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.max(0, Math.min(pos * v.duration, v.duration));
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) window.clearTimeout(controlsTimeout.current);
    if (isPlaying) {
      controlsTimeout.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout.current) window.clearTimeout(controlsTimeout.current);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-r from-sdg-6/20 via-sdg-7/15 to-sdg-1/20 blur-2xl opacity-60 transition-opacity duration-500"
      />

      <div
        className="group relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl border border-rule bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer select-none"
        onClick={togglePlay}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src="/video-43627.mp4"
          playsInline
          muted={isMuted}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="h-full w-full object-cover"
        />

        {/* Poster / Idle Overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-6 text-center backdrop-blur-[2px] transition-opacity duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label="Play recap video"
              className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              <span className="ml-1 inline-block h-0 w-0 border-y-[10px] sm:border-y-[12px] border-l-[16px] sm:border-l-[20px] border-y-transparent border-l-white" />
            </button>

            <p className="mt-4 sm:mt-6 font-extrabold text-2xl uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl text-white">
              Innovicon <span className="text-sdg-1">1.0</span> → <span className="text-sdg-7">2.0</span> →{" "}
              <span className="text-sdg-6">3.0</span> Recap
            </p>
            <p className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Watch highlights from previous editions
            </p>
          </div>
        )}

        {/* Video Bottom Controls Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-5 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Timeline track */}
          <div
            className="group/track relative h-2 w-full cursor-pointer py-1"
            onClick={handleSeek}
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/20 transition-all group-hover/track:h-1.5">
              <div
                className="h-full bg-gradient-to-r from-sdg-6 to-sdg-7 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-white/90 hover:text-white cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-white/90 hover:text-white cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
                    <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" />
                  </svg>
                )}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
            </div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Innovicon Recap Film
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        <p>Three editions. One film.</p>
        <p>Innovicon 4.0 — 06 &amp; 07 October 2026</p>
      </div>
    </div>
  );
}
