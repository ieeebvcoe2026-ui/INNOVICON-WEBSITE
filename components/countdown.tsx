"use client";

import { useEffect, useMemo, useState } from "react";
import { pad, TARGET } from "@/lib/site-data";

/** Quiet, single-line "N days to go" indicator — no rapid re-render. */
export function DaysToGo() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const diff = TARGET - Date.now();
      setDays(Math.max(0, Math.ceil(diff / 86_400_000)));
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  const digits = (days === null ? "--" : String(Math.min(days, 999))).split("");

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="flex items-end gap-[3px]">
        {digits.map((ch, i) => (
          <div
            key={i}
            className="flex h-9 w-6 flex-shrink-0 flex-col overflow-hidden rounded-[5px] border border-white/15 bg-[#1c1c1c] shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <div className="h-[3px] w-full flex-shrink-0 bg-[#26bde2]" />
            <div className="flex flex-1 items-center justify-center border-t border-white/5">
              <span className="text-xs font-bold leading-none tabular-nums text-white">{ch}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs sm:text-sm font-medium tracking-wide text-white/55">
        {days === null ? "Loading countdown" : days === 0 ? "Doors open today" : "days to go"}
      </p>
    </div>
  );
}

function DigitTile({ ch, accent }: { ch: string; accent: string }) {
  return (
    <div className="flex h-10 w-7 flex-shrink-0 flex-col overflow-hidden rounded-[6px] border border-white/15 bg-[#1a1a1a] shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:h-14 sm:w-10">
      <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: accent }} />
      <div className="flex flex-1 items-center justify-center border-t border-white/5">
        <span className="text-base font-extrabold leading-none tabular-nums text-white sm:text-2xl">{ch}</span>
      </div>
    </div>
  );
}

/** Live ticking Days : Hours : Minutes : Seconds — built to build hype, not just inform. */
export function Countdown({ compact }: { compact?: boolean } = {}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR renders "--", then sync the real clock after mount
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = useMemo(() => {
    const diff = Math.max(0, TARGET - (now ?? TARGET));
    const s = Math.floor(diff / 1000);
    return [
      { k: "Days", v: Math.floor(s / 86400), color: "#26bde2" },
      { k: "Hours", v: Math.floor(s / 3600) % 24, color: "#fcc30b" },
      { k: "Minutes", v: Math.floor(s / 60) % 60, color: "#fd9d24" },
      { k: "Seconds", v: s % 60, color: "#56c02b" },
    ];
  }, [now]);

  return (
    <div className="select-none">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#26bde2] sm:text-[11px]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#26bde2] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#26bde2]" />
        </span>
        Countdown to Innovicon 4.0
      </p>

      <div className={`countdown-glow mt-3 flex items-end ${compact ? "gap-2" : "gap-2 sm:gap-3"}`}>
        {parts.map((p, i) => {
          const str = now === null ? "--" : pad(p.v);
          return (
            <div key={p.k} className="flex items-end gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex gap-[3px]">
                  <DigitTile ch={str.charAt(0)} accent={p.color} />
                  <DigitTile ch={str.charAt(1)} accent={p.color} />
                </div>
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] sm:text-[9px]" style={{ color: p.color }}>
                  {p.k}
                </p>
              </div>
              {i < parts.length - 1 && (
                <span aria-hidden className="mb-4 text-base font-bold text-white/20 sm:text-xl">
                  :
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
