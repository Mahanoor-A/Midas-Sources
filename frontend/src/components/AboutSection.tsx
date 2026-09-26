import { Reveal } from "@/components/Reveal";

const FACTS = [
  { k: "Established", v: "June 10, 2007" },
  { k: "Head Office", v: "Rawalpindi, Pakistan" },
  { k: "Focus", v: "B2B & Institutional" },
  { k: "Coverage", v: "Across Pakistan" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="border-b border-[#1E293B] bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
              About Midas
            </p>
            <h2 className="font-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
              An experienced, capable local partner for organizations operating
              in Pakistan.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-[#94A3B8]">
              Midas Sources International is an established Pakistani B2B
              company working with diplomatic, multinational, oil &amp; gas,
              corporate and commercial organizations. Since 2007, we have
              helped institutions obtain, install, maintain and execute what
              they need to operate their facilities and projects — across
              procurement, sourcing, contracting, technical services,
              construction, maintenance, fire &amp; safety, security solutions,
              fabrication, printing and specialized project requirements.
            </p>
            <p className="mt-5 text-base leading-relaxed text-[#94A3B8]">
              Our mission is to provide reliable, thoughtful and practical
              solutions tailored to each customer's operational requirements —
              with responsive service, accountable execution and continuous
              improvement.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px border border-[#1E293B] bg-[#1E293B]">
              {FACTS.map((f) => (
                <div key={f.k} className="bg-[#111827] p-5">
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-[#64748B] uppercase">
                    {f.k}
                  </dt>
                  <dd className="font-heading mt-1.5 text-sm font-semibold text-[#F8FAFC]">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
