import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import { PageSection, ProcessSteps, SectionHead } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/footer";
import { BecomeASponsor, SponsorTiers } from "@/components/sponsors";
import { pad } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "INNOVICON 4.0 — Hardware × Software Expo | BVCOE New Delhi",
  description:
    "INNOVICON 4.0 by IEEE BVCOE New Delhi — a two-day Hardware × Software Expo built on the 17 UN Sustainable Development Goals. 06 & 07 October 2026.",
  openGraph: {
    title: "INNOVICON 4.0 — Hardware × Software Expo",
    description: "17 goals. Countless ideas. One impact. 06 & 07 October 2026, BVCOE New Delhi.",
  },
};

const SCHEDULE_DAYS = [
  {
    day: "Day 01",
    name: "Hardware Expo",
    date: "06 October 2026",
    color: "#fd9d24",
    items: [
      "Exhibit projects in a dynamic setup",
      "Pitch ideas to judges and the audience",
      "Answer cross-questions, showcasing expertise",
      "2:00 PM – 5:00 PM · Ground Floor Corridor",
    ],
  },
  {
    day: "Day 02",
    name: "Software Expo",
    date: "07 October 2026",
    color: "#26bde2",
    items: [
      "Exhibit projects in a dynamic setup",
      "Pitch ideas to judges and the audience",
      "Answer cross-questions, showcasing expertise",
      "2:00 PM – 5:00 PM · Ground Floor Corridor",
    ],
  },
];

const JUDGING_CRITERIA = ["Creativity & Innovation", "Problem-Solving", "Feasibility & Execution", "Impact", "Presentation"];

const RULES = [
  "Originality is key — no plagiarism.",
  "Shortlisted teams must be present at the expo.",
  "Ethical use of tech is mandatory.",
  "Judges' decisions are final.",
];

const FAQS = [
  {
    q: "What's the team size?",
    a: "Teams of 1–4 members. Solo builders are just as welcome as full squads.",
  },
  {
    q: "How does the two-round process work?",
    a: "Round 1 is an online screening — submit an abstract and a demo video of your project. It's judged on innovation, feasibility, impact, and presentation, and top entries advance to the offline expo. Round 2 is the in-person expo across two days, where you exhibit, pitch, and field cross-questions from judges and the audience.",
  },
  {
    q: "What are the important dates and venue?",
    a: "Round 1 online screening closes 03 October 2026. Round 2 runs 06 October (Hardware Expo) and 07 October 2026 (Software Expo), 2:00 PM – 5:00 PM at the Ground Floor Corridor, BVCOE, A-4 Paschim Vihar, New Delhi.",
  },
  {
    q: "How are projects judged?",
    a: "On Creativity & Innovation, Problem-Solving, Feasibility & Execution, Impact, and Presentation — the judges' decisions are final.",
  },
  {
    q: "We got shortlisted — what now?",
    a: "Shortlisted teams must be present in person at the offline expo to exhibit and pitch. Keep it original (no plagiarism) and keep your use of tech ethical.",
  },
];

export default function Home() {
  return (
    <main id="top" className="w-full bg-[#202020] text-foreground">
      <HomeHero />

      {/* About */}
      <div id="about" className="scroll-mt-20">
        <PageSection>
          <SectionHead
            index="01 — About Innovicon"
            title={
              <>
                About
                <br />
                Innovicon
              </>
            }
            kicker="The flagship Hardware × Software Expo of the IEEE Student Branch at BVCOE, New Delhi."
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
              <p>
                Innovation isn&apos;t just about thinking big — it&apos;s about creating real
                impact. Innovicon 4.0 is your chance to present groundbreaking hardware and
                software solutions. Join us for a thrilling two-day celebration of student
                innovation where creativity, problem-solving, and tech innovation take center
                stage through project showcases.
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white">What awaits you</p>
                <p className="mt-3">
                  A platform to spark your passion for innovation, solve real-world problems, and
                  showcase your projects.
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Connect with fellow innovators and elevate your ideas.",
                    "Showcase your project by presenting your innovative solutions to a live audience.",
                    "Gain confidence as you pitch your ideas and defend them before a panel of expert judges.",
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sdg-6" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-panel/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                Team size
                <span className="text-sdg-6">1–4 members</span>
              </div>
            </div>

            <ProcessSteps />
          </div>
        </PageSection>
      </div>

      {/* Schedule */}
      <div id="schedule" className="scroll-mt-20">
        <PageSection>
          <SectionHead
            index="02 — Two rounds, two days"
            title={
              <>
                The two-day
                <br />
                journey
              </>
            }
            kicker="06 & 07 October 2026 — BVCOE, New Delhi."
          />

          <div className="mt-16 border border-rule bg-panel/40 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-sdg-6">Round 01 — Online Screening</p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="font-bold text-3xl uppercase tracking-tight sm:text-4xl">Submit &amp; get shortlisted</p>
              <p className="font-bold text-lg text-sdg-6">03 October 2026</p>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              <li>Kick off your journey by submitting an abstract and a demo video of your project.</li>
              <li>Entries are judged on innovation, feasibility, impact, and presentation.</li>
              <li>Top entries advance to the offline expo.</li>
            </ul>
          </div>

          <p className="mt-14 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Round 02 — Offline Expo
          </p>

          <div className="mt-5 space-y-px bg-rule">
            {SCHEDULE_DAYS.map((d) => (
              <div key={d.day} className="grid gap-8 bg-background py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: d.color }}>
                    {d.day}
                  </p>
                  <p className="mt-3 font-bold text-6xl uppercase leading-none lg:text-7xl">{d.name}</p>
                  <p className="mt-4 font-bold text-2xl" style={{ color: d.color }}>
                    {d.date}
                  </p>
                </div>
                <ul className="divide-y divide-rule border-t border-rule">
                  {d.items.map((it, i) => (
                    <li key={it} className="flex items-baseline gap-6 py-4">
                      <span className="text-[10px] font-semibold tracking-[0.28em] text-muted-foreground">{pad(i + 1)}</span>
                      <span className="text-sm uppercase tracking-[0.12em]">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-14 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white">Judging criteria</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {JUDGING_CRITERIA.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sdg-7" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white">Rules &amp; guidelines</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {RULES.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sdg-1" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageSection>
      </div>

      {/* Journey / Projects */}
      <div id="projects" className="scroll-mt-20">
        <PageSection>
          <SectionHead
            index="03 — The journey"
            title="The journey"
            kicker="One recap film spanning every edition of Innovicon so far."
          />

          <div className="mt-16">
            <div className="group relative aspect-video w-full overflow-hidden border border-rule bg-panel">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-foreground">
                  <span className="ml-1 inline-block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-foreground" />
                </span>
                <p className="font-bold text-3xl uppercase leading-tight tracking-tight lg:text-5xl">
                  Innovicon <span className="text-sdg-1">1.0</span> → <span className="text-sdg-7">2.0</span> →{" "}
                  <span className="text-sdg-6">3.0</span> recap
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Combined recap video — dropping soon
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              <p>Three editions. One film.</p>
              <p>Innovicon 4.0 — 06 &amp; 07 October 2026</p>
            </div>
          </div>
        </PageSection>
      </div>

      {/* Sponsors */}
      <div id="sponsors" className="scroll-mt-20">
        <PageSection>
          <SectionHead
            index="04 — Sponsors"
            title={
              <>
                Backed by
                <br />
                the best
              </>
            }
            kicker="Partners powering two days of building at Innovicon 4.0."
          />

          <SponsorTiers />
          <BecomeASponsor />
        </PageSection>
      </div>

      {/* FAQ */}
      <div id="faq" className="scroll-mt-20">
        <PageSection>
          <SectionHead
            index="05 — FAQ"
            title={
              <>
                Questions,
                <br />
                answered
              </>
            }
            kicker="Everything you need to know before you submit."
          />

          <div className="mt-16 divide-y divide-rule border-t border-rule">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="font-bold text-lg uppercase tracking-tight sm:text-xl">{f.q}</span>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-rule text-white/60 transition-transform duration-300 group-open:rotate-45 group-open:border-sdg-6 group-open:text-sdg-6">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </PageSection>
      </div>

      {/* Contact */}
      <div id="contact" className="scroll-mt-20">
        <PageSection>
          <SectionHead
            index="06 — Contact"
            title="Let's connect."
            kicker="Questions, sponsorship, or just want in on the build — we reply fast."
          />

          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              {[
                { k: "Email", v: "ieee@bvcoend.ac.in", href: "mailto:ieee@bvcoend.ac.in" },
                { k: "Phone", v: "+91 81308 53875", href: "tel:+918130853875" },
                { k: "Location", v: "BVCOE, A-4 Paschim Vihar, New Delhi", href: undefined },
              ].map((c) => (
                <div key={c.k}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.k}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-2 block font-bold text-2xl uppercase transition-colors hover:text-sdg-6 lg:text-3xl">
                      {c.v}
                    </a>
                  ) : (
                    <p className="mt-2 font-bold text-2xl uppercase lg:text-3xl">{c.v}</p>
                  )}
                </div>
              ))}
              <div className="flex gap-6 pt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {["Instagram", "LinkedIn", "X"].map((s) => (
                  <span key={s} className="border-b border-rule pb-1">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </PageSection>
      </div>

      <SiteFooter />
    </main>
  );
}
