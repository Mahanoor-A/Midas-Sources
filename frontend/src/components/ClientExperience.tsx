import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";

interface Client {
  wordmark: string;
  sub?: string;
  sector: string;
  color: string;
}

const FEATURED: Client[] = [
  { wordmark: "U.S. EMBASSY", sector: "Diplomatic / Institutional", color: "#6FA8DC" },
  { wordmark: "MOL", sub: "PAKISTAN", sector: "Oil & Gas", color: "#7BC143" },
  { wordmark: "MARI", sub: "ENERGIES", sector: "Energy / Oil & Gas", color: "#F0665E" },
  { wordmark: "PGNiG", sub: "POLISH OIL & GAS", sector: "Oil & Gas", color: "#5B9BD5" },
  { wordmark: "HBL", sector: "Banking / Corporate", color: "#35C48D" },
];

const ADDITIONAL: Client[] = [
  { wordmark: "AL RAZI", sub: "HOSPITAL", sector: "Healthcare", color: "#56C0E8" },
  { wordmark: "PRIVATE SCHOOL", sub: "SYSTEMS", sector: "Education", color: "#E8C468" },
  { wordmark: "PRIVATE-SECTOR", sub: "ORGANIZATIONS", sector: "Commercial", color: "#D97706" },
];

function ClientTile({ client, large, index }: { client: Client; large: boolean; index: number }) {
  return (
    <Reveal delay={(index % 5) * 0.07} className="h-full">
      <div
        data-testid={`client-tile-${client.wordmark.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        style={{ "--brand": client.color } as CSSProperties}
        className={`group flex h-full flex-col justify-between border border-[#1E293B] bg-[#0B0F17] transition-all duration-500 hover:border-[#334155] hover:bg-[#111827] ${
          large ? "p-8 lg:p-10" : "p-6 lg:p-8"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="size-1.5 bg-[#334155] transition-colors duration-500 group-hover:bg-[var(--brand)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#475569] uppercase">
            Served
          </span>
        </div>
        <div className={large ? "my-10" : "my-8"}>
          <p
            className={`font-heading font-semibold tracking-tight text-[#64748B] transition-colors duration-500 group-hover:text-[var(--brand)] ${
              large ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
            }`}
          >
            {client.wordmark}
          </p>
          {client.sub && (
            <p className="font-heading mt-1 text-sm font-medium tracking-[0.3em] text-[#475569] transition-colors duration-500 group-hover:text-[var(--brand)]">
              {client.sub}
            </p>
          )}
        </div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-[#64748B] uppercase">
          {client.sector}
        </p>
      </div>
    </Reveal>
  );
}

export function ClientExperience() {
  return (
    <section
      id="clients"
      data-testid="clients-section"
      className="border-t border-[#1E293B] bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p
            className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase"
            data-testid="clients-eyebrow"
          >
            Trusted Experience
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
            Supporting leading organizations across demanding sectors.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-[#94A3B8]">
            Since 2007, Midas Sources International has provided services and
            solutions to diplomatic, energy, corporate, healthcare, education
            and private-sector organizations.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURED.map((c, i) => (
            <ClientTile key={c.wordmark} client={c} large index={i} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {ADDITIONAL.map((c, i) => (
            <ClientTile key={c.wordmark} client={c} large={false} index={i} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <p
            className="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-[#475569]"
            data-testid="clients-disclaimer"
          >
            Selected client experience. Names denote organizations Midas Sources
            International has served; references reflect project experience and
            do not imply endorsement, exclusivity or an official partnership
            designation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
