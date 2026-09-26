import { Reveal } from "@/components/Reveal";

const CASES = [
  {
    image:
      "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxvaWwlMjBnYXMlMjByZWZpbmVyeSUyMGluZHVzdHJpYWwlMjBwbGFudCUyMGR1c2t8ZW58MHx8fHwxNzkwNDIzODAzfDA&ixlib=rb-4.1.0&q=85",
    sector: "Diplomatic / Institutional",
    title: "Diplomatic Mission Support",
    scope: ["Multi-category procurement & supply", "Facility maintenance works", "Safety & security equipment"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1678532685208-54acdd41187d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxvaWwlMjBnYXMlMjByZWZpbmVyeSUyMGluZHVzdHJpYWwlMjBwbGFudCUyMGR1c2t8ZW58MHx8fHwxNzkwNDIzODAzfDA&ixlib=rb-4.1.0&q=85",
    sector: "Energy / Oil & Gas",
    title: "Upstream Operator Support",
    scope: ["Industrial equipment sourcing", "Technical services coordination", "Project-specific supply"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1614595737476-42487331b8a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBmYWNhZGUlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzkwNDIzODAzfDA&ixlib=rb-4.1.0&q=85",
    sector: "Banking / Corporate",
    title: "Corporate Branch Requirements",
    scope: ["Interior works & renovations", "Printing & corporate supply", "Facility services"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1721937127582-ed331de95a04?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjBpbmR1c3RyaWFsJTIwc3VwcGx5JTIwc2hlbHZlc3xlbnwwfHx8fDE3OTA0MjM4MTJ8MA&ixlib=rb-4.1.0&q=85",
    sector: "Healthcare",
    title: "Hospital Facility Support",
    scope: ["Maintenance & technical services", "Institutional supply", "Specialized sourcing"],
  },
];

export function CaseStudies() {
  return (
    <section
      data-testid="case-studies-section"
      className="border-b border-[#1E293B] bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
            Case Snapshots
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
            Representative scopes of work.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-[#94A3B8]">
            A selection of the requirement categories we handle across
            diplomatic, energy, corporate and healthcare environments. Detailed
            references are available on request.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <article
                data-testid={`case-card-${i}`}
                className="group flex h-full flex-col border border-[#1E293B] bg-[#111827] transition-colors duration-300 hover:border-[#334155]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0F17]/85 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-[#FF6B00] backdrop-blur-sm">
                    {c.sector.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-[#F8FAFC]">
                    {c.title}
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    {c.scope.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.06em] text-[#94A3B8] uppercase"
                      >
                        <span className="size-1 bg-[#FF6B00]" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
