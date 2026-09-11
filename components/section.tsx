"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SectionHead({
  index,
  title,
  kicker,
}: {
  index: string;
  title: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {index}
        </p>
        <h1 className="cursor-hover mt-3 font-bold text-3xl sm:text-5xl lg:text-7xl uppercase leading-[0.92] tracking-tight">
          {title}
        </h1>
      </div>
      {kicker && (
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
          {kicker}
        </p>
      )}
    </div>
  );
}

export function PageSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip the reveal animation entirely when reduced motion is preferred
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-t border-rule">
      <div
        ref={ref}
        className={`mx-auto max-w-[1500px] px-6 pb-24 pt-32 lg:px-10 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Ideate", c: "#26bde2", d: "Pick a goal. Frame the problem. Sketch the system." },
  { n: "02", t: "Build", c: "#fcc30b", d: "Two days, one bench, working hardware and software." },
  { n: "03", t: "Impact", c: "#56c02b", d: "Demo it, defend it, and measure it against the goal." },
];

/**
 * Ideate → Build → Impact. Pins in place (lg+) while the neighbouring copy scrolls past, and the
 * connecting line fills continuously with scroll progress rather than firing once on entry.
 */
export function ProcessSteps() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    if (reducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- show the fully-drawn line immediately when reduced motion is preferred
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const refY = window.innerHeight * 0.55;
      const raw = rect.height > 0 ? (refY - rect.top) / rect.height : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
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

  const segments = STEPS.length - 1;

  return (
    <div ref={outerRef} className="lg:pb-16">
      <div className="lg:sticky lg:top-28">
        {STEPS.map((s, i, arr) => {
          const dotT = i / segments;
          const dotProgress = Math.min(1, Math.max(0, (progress - dotT + 0.12) / 0.12));
          const segProgress =
            i < arr.length - 1 ? Math.min(1, Math.max(0, (progress - dotT) * segments)) : 0;

          return (
            <div key={s.n} className="relative pl-10">
              {i < arr.length - 1 && (
                <span
                  className="absolute left-[3px] top-6 w-px overflow-hidden bg-rule"
                  style={{ height: "calc(100% - 1.5rem)" }}
                >
                  <span
                    className="block w-full"
                    style={{
                      height: `${segProgress * 100}%`,
                      backgroundColor: s.c,
                      transition: "height 120ms linear",
                    }}
                  />
                </span>
              )}
              <span
                className="absolute left-0 top-2 h-[7px] w-[7px] rounded-full"
                style={{
                  backgroundColor: s.c,
                  transform: `scale(${dotProgress})`,
                  boxShadow: dotProgress > 0.6 ? `0 0 12px 2px ${s.c}66` : "none",
                  transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease-out",
                }}
              />
              <div className="pb-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.n}</p>
                <p className="mt-1 font-bold text-3xl uppercase transition-opacity duration-300" style={{ color: s.c, opacity: 0.55 + dotProgress * 0.45 }}>
                  {s.t}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
