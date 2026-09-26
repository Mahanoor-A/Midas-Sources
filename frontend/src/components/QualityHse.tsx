import { Reveal } from "@/components/Reveal";
import { ClipboardCheck, HardHat, Recycle } from "lucide-react";

const PILLARS = [
  {
    icon: ClipboardCheck,
    title: "Quality Assurance",
    desc: "We take responsibility for customer satisfaction through trained personnel, proven procedures and a commitment to agreed requirements — with dependable, defect-free delivery against agreed timelines.",
  },
  {
    icon: HardHat,
    title: "Health & Safety",
    desc: "Work is planned and executed with attention to safe site practices, particularly in sensitive diplomatic, energy and institutional environments.",
  },
  {
    icon: Recycle,
    title: "Continuous Improvement",
    desc: "Every engagement is reviewed so procedures, sourcing and execution improve with each project we deliver.",
  },
];

export function QualityHse() {
  return (
    <section
      id="quality"
      data-testid="quality-section"
      className="border-y border-[#1E293B] bg-[#0F172A]/60 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
          <Reveal className="lg:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
              Quality & HSE
            </p>
            <h2 className="font-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
              Accountable delivery, every engagement.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#94A3B8]">
              Our mission is to provide reliable, thoughtful and practical
              solutions tailored to each customer's operational requirements —
              while maintaining responsive service, accountable execution and
              continuous improvement.
            </p>
          </Reveal>

          <div className="grid gap-px border border-[#1E293B] bg-[#1E293B] lg:col-span-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div
                  data-testid={`quality-pillar-${i}`}
                  className="group flex gap-6 bg-[#0B0F17] p-7 transition-colors duration-300 hover:bg-[#111827] lg:p-9"
                >
                  <p.icon
                    className="mt-1 size-6 shrink-0 text-[#FF6B00]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-[#F8FAFC]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
