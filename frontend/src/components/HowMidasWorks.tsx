import { Reveal } from "@/components/Reveal";

const STEPS = [
  { n: "01", title: "Requirement Intake", desc: "You share an RFQ, BOQ, specification, scope or product list." },
  { n: "02", title: "Technical Evaluation", desc: "We review the requirement, quantities and site conditions." },
  { n: "03", title: "Sourcing & Planning", desc: "We source locally and internationally and plan the solution." },
  { n: "04", title: "Commercial Proposal", desc: "You receive a clear, considered quotation or proposal." },
  { n: "05", title: "Supply & Execution", desc: "We supply, install or execute the agreed scope of work." },
  { n: "06", title: "Ongoing Support", desc: "We support the delivery according to project requirements." },
];

export function HowMidasWorks() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
            How Midas Works
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
            From requirement to delivered scope.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div data-testid={`process-step-${s.n}`} className="group relative">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-[#FF6B00]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-[#1E293B] transition-colors duration-300 group-hover:bg-[#FF6B00]/50" />
                </div>
                <h3 className="font-heading mt-5 text-base font-semibold tracking-tight text-[#F8FAFC]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
