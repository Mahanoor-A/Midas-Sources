import { Reveal } from "@/components/Reveal";

const STATS = [
  { value: "2007", label: "Established — Rawalpindi, Pakistan" },
  { value: "19+", label: "Years of continuous B2B operations" },
  { value: "8", label: "Capability divisions under one roof" },
  { value: "6+", label: "Institutional sectors served" },
];

export function CredibilityStrip() {
  return (
    <section
      data-testid="credibility-strip"
      className="border-b border-[#1E293B] bg-[#0B0F17]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className={`border-[#1E293B] px-6 py-10 lg:px-10 ${
              i % 2 === 0 ? "border-r" : "lg:border-r"
            } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
              i === 3 ? "lg:border-r-0" : ""
            }`}
          >
            <p
              className="font-heading text-4xl font-semibold tracking-tight text-[#F8FAFC] lg:text-5xl"
              data-testid={`stat-value-${i}`}
            >
              {s.value}
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-[#94A3B8] uppercase">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
