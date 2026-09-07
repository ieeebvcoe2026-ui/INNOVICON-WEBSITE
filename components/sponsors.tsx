type SponsorSlot = { name: string; filled: boolean; logo?: string };

type SponsorTier = {
  label: string;
  weight: "title" | "platinum" | "community";
  slots: SponsorSlot[];
};

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    label: "Title Sponsor",
    weight: "title",
    slots: [{ name: "OpenAI", filled: true, logo: "/openai-mark.svg" }],
  },
  {
    label: "Partners",
    weight: "platinum",
    slots: [
      { name: "Partner slot 01", filled: false },
      { name: "Partner slot 02", filled: false },
    ],
  },
];

export const COMMUNITY_PARTNERS = ["IEEE", "BVCOE"];

const TIER_STYLE: Record<SponsorTier["weight"], { text: string; sub: string; minH: string; logo: string }> = {
  title: { text: "text-5xl sm:text-6xl", sub: "text-sdg-7", minH: "min-h-56", logo: "h-20 w-20 sm:h-24 sm:w-24" },
  platinum: { text: "text-3xl sm:text-4xl", sub: "text-white/50", minH: "min-h-44", logo: "h-16 w-16" },
  community: { text: "text-xl", sub: "text-white/40", minH: "min-h-28", logo: "h-12 w-12" },
};

function SponsorCard({ name, filled, weight, logo }: SponsorSlot & { weight: SponsorTier["weight"] }) {
  const style = TIER_STYLE[weight];
  return (
    <div
      className={`group flex ${style.minH} flex-col items-center justify-center gap-3 bg-background p-8 text-center transition-colors hover:bg-secondary/60`}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" className={`${style.logo} mb-1`} draggable={false} />
      )}
      <p
        className={`font-bold uppercase tracking-tight transition-colors ${style.text} ${
          filled ? "text-white" : "text-white/25 group-hover:text-white/40"
        }`}
      >
        {name}
      </p>
      <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${filled ? style.sub : "text-muted-foreground"}`}>
        {filled ? "Confirmed" : "Reserved for you"}
      </p>
    </div>
  );
}

export function SponsorTiers() {
  return (
    <div className="mt-16 space-y-px bg-rule">
      {SPONSOR_TIERS.map((tier) => (
        <div key={tier.label} className="bg-background pt-10">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {tier.label}
          </p>
          <div
            className={`mt-5 grid grid-cols-1 gap-px bg-rule ${
              tier.weight === "title" ? "sm:grid-cols-1" : "sm:grid-cols-2"
            }`}
          >
            {tier.slots.map((slot) => (
              <SponsorCard key={slot.name} {...slot} weight={tier.weight} />
            ))}
          </div>
        </div>
      ))}

      <div className="bg-background pt-10 pb-2">
        <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Organised with
        </p>
        <div className="mt-5 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
          {COMMUNITY_PARTNERS.map((name) => (
            <SponsorCard key={name} name={name} filled weight="community" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BecomeASponsor() {
  return (
    <div className="mt-20 flex flex-col items-start gap-6 border border-rule bg-panel/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-sdg-6">Partner with Innovicon</p>
        <p className="mt-3 max-w-lg font-bold text-2xl uppercase leading-snug tracking-tight sm:text-3xl">
          Put your brand in front of Delhi&apos;s builders, across two days.
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          From swag-wall visibility to shaping a track around your product, sponsorship tiers are
          flexible. Reach out and we&apos;ll send the full prospectus.
        </p>
      </div>
      <a
        href="mailto:ieee@bvcoend.ac.in?subject=Innovicon%204.0%20Sponsorship"
        className="inline-flex flex-shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
      >
        Become a sponsor →
      </a>
    </div>
  );
}
