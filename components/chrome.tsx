"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync initial value from a browser-only API
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        'a, button, input, textarea, select, [role="button"], .cursor-hover',
      );
      setHovering(!!el);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)] backdrop-blur-[1px] transition-[width,height,opacity] duration-300 ease-out mix-blend-difference ${
        hovering ? "h-12 w-12" : "h-4 w-4"
      } ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ willChange: "transform" }}
    />
  );
}

const PROGRESS_SECTION_IDS = ["sdgs", "about", "schedule", "projects", "sponsors", "faq", "contact"];

/** Thin segmented bar at the very top — one segment per home-page section, fills as you scroll through it. */
export function ScrollProgress() {
  const [progress, setProgress] = useState<number[]>(() => PROGRESS_SECTION_IDS.map(() => 0));

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      setProgress(
        PROGRESS_SECTION_IDS.map((id) => {
          const el = document.getElementById(id);
          if (!el) return 0;
          const rect = el.getBoundingClientRect();
          if (rect.height <= 0) return 0;
          const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), rect.height);
          return scrolled / rect.height;
        }),
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] flex h-[3px] gap-1 px-1 pt-1"
    >
      {progress.map((p, i) => (
        <div key={PROGRESS_SECTION_IDS[i]} className="h-full flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${p * 100}%`, transition: "width 150ms linear" }}
          />
        </div>
      ))}
    </div>
  );
}
