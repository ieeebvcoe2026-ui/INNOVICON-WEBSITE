type SponsorSlot = {
  name: string;
  filled: boolean;
  logo?: string;
  logoInvert?: boolean;
  hideName?: boolean;
  subtitle?: string;
};

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
];

export const ORGANIZERS: SponsorSlot[] = [
  {
    name: "IEEE",
    filled: true,
    logo: "/ieee-mark.png",
    logoInvert: true,
    hideName: true,
    subtitle: "IEEE Student Branch · BVCOE",
  },
  {
    name: "BVCOE",
    filled: true,
    subtitle: "Bharati Vidyapeeth's College of Engineering, New Delhi",
  },
];

const TIER_STYLE: Record<SponsorTier["weight"], { text: string; minH: string; logo: string }> = {
  title: { text: "text-5xl sm:text-6xl", minH: "min-h-44", logo: "h-16 sm:h-20" },
  platinum: { text: "text-3xl sm:text-4xl", minH: "min-h-36", logo: "h-12" },
  community: { text: "text-3xl sm:text-4xl lg:text-5xl", minH: "min-h-40 sm:min-h-44", logo: "h-14 sm:h-16" },
};

function SponsorCard({
  name,
  filled,
  weight,
  logo,
  logoInvert,
  hideName,
  subtitle,
}: SponsorSlot & { weight: SponsorTier["weight"] }) {
  const style = TIER_STYLE[weight];
  return (
    <div
      className={`group flex ${style.minH} flex-col items-center justify-center gap-3 bg-background p-6 sm:p-8 text-center transition-colors hover:bg-secondary/60`}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name}
          className={`${style.logo} w-auto max-w-full ${logoInvert ? "invert" : ""}`}
          draggable={false}
        />
      )}
      {!hideName && (
        <p
          className={`font-black uppercase tracking-tight transition-colors ${style.text} ${
            filled ? "text-white" : "text-white/25 group-hover:text-white/40"
          }`}
        >
          {name}
        </p>
      )}
      {subtitle && (
        <p className="max-w-xs text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
          {subtitle}
        </p>
      )}
      {!filled && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Not filled</p>
      )}
    </div>
  );
}

export function SponsorTiers() {
  return (
    <div className="mt-12 space-y-px bg-rule">
      {SPONSOR_TIERS.map((tier) => (
        <div key={tier.label} className="bg-background pt-8">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {tier.label}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-px bg-rule">
            {tier.slots.map((slot) => (
              <SponsorCard key={slot.name} {...slot} weight={tier.weight} />
            ))}
          </div>
        </div>
      ))}

      <div className="bg-background pt-8 pb-2">
        <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Organized by
        </p>
        <div className="mt-4 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
          {ORGANIZERS.map((partner) => (
            <SponsorCard key={partner.name} {...partner} weight="community" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BecomeASponsor() {
  return (
    <div className="mt-14 flex flex-col items-start gap-6 border border-rule bg-panel/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
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
