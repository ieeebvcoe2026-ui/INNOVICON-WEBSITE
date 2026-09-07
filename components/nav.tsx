"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/site-data";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#202020]/70 backdrop-blur-md border-white/[0.04] shadow-[0_1px_0_rgba(0,0,0,0.2)]"
          : "bg-transparent backdrop-blur-0 border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-6 lg:gap-8">
          <a
            href="#top"
            className="text-xl uppercase tracking-wider text-white font-extrabold transition-opacity hover:opacity-90"
          >
            INNOVICON 4.0
          </a>

          <span className="hidden h-5 w-px bg-white/25 sm:block" />

          <nav className="hidden items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)] backdrop-blur-sm"
          >
            Register Now
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white sm:hidden"
            aria-label="Toggle navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-white/10 bg-black/95 px-6 py-6 sm:hidden backdrop-blur-xl">
          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="hover:text-white">
                {item.label.toUpperCase()}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center rounded-full border border-white/30 bg-white/10 py-2.5 text-xs text-white"
            >
              Register Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
