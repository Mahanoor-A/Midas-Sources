import { Reveal } from "@/components/Reveal";
import { useRfq } from "@/components/RfqModal";
import { ArrowUpRight } from "lucide-react";

const CAPABILITIES = [
  {
    n: "01",
    title: "Procurement & General Supply",
    desc: "Our primary capability. RFQ-to-delivery sourcing of equipment, materials, consumables and project-specific requirements for institutional clients.",
    items: ["General procurement", "Specialized sourcing", "Equipment & materials", "Institutional supply"],
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    n: "02",
    title: "Construction & Renovation",
    desc: "Civil works, renovations, painting, demolition and interior execution.",
    items: ["Civil works", "Renovations", "Painting & whitewash"],
    span: "",
  },
  {
    n: "03",
    title: "Fire, Safety & Security",
    desc: "Fire-safety solutions, CCTV and protective security infrastructure.",
    items: ["Fire safety", "CCTV systems", "Protective solutions"],
    span: "",
  },
  {
    n: "04",
    title: "Facility & Technical Services",
    desc: "Electrical, plumbing, mechanical, air-conditioning and carpentry maintenance.",
    items: ["Electrical", "Plumbing & mechanical", "HVAC"],
    span: "",
  },
  {
    n: "05",
    title: "Fabrication & Infrastructure",
    desc: "Prefabricated rooms, guard cabins, steel and fiber sheds, custom fabrication.",
    items: ["Prefab rooms", "Guard cabins", "Steel structures"],
    span: "",
  },
  {
    n: "06",
    title: "Interiors",
    desc: "Kitchens, vanities, flooring, blinds, ceilings and interior products.",
    items: ["Flooring", "Blinds & ceilings", "Kitchens"],
    span: "",
  },
  {
    n: "07",
    title: "Printing & Corporate Supply",
    desc: "Offset and screen printing, souvenirs, shields, badges and large-format work.",
    items: ["Offset printing", "Souvenirs & shields", "Large-format"],
    span: "",
  },
  {
    n: "08",
    title: "Special Projects",
    desc: "Event lighting, playground equipment and unusual institutional requirements.",
    items: ["Event infrastructure", "Custom requirements"],
    span: "",
  },
];

export function CapabilityGroups() {
  const { openRfq } = useRfq();
  return (
    <section
      id="capabilities"
      data-testid="capabilities-section"
      className="bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
            Capability Matrix
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
            Eight divisions. One accountable partner.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-[#94A3B8]">
            Instead of coordinating many small vendors, organizations hand the
            requirement to Midas — we understand the scope, source the solution
            and coordinate delivery or execution.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-[#1E293B] bg-[#1E293B] md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={(i % 4) * 0.07} className={c.span}>
              <article
                data-testid={`capability-card-${c.n}`}
                className="group flex h-full flex-col justify-between bg-[#0B0F17] p-7 transition-colors duration-300 hover:bg-[#111827] lg:p-9"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-[#475569] transition-colors group-hover:text-[#FF6B00]">
                      {c.n}
                    </span>
                    <ArrowUpRight
                      className="size-4 text-[#334155] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF6B00]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    className={`font-heading mt-6 font-semibold tracking-tight text-[#F8FAFC] ${
                      c.span ? "text-2xl lg:text-3xl" : "text-xl"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                    {c.desc}
                  </p>
                  {c.span && (
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {c.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] text-[#CBD5E1] uppercase"
                        >
                          <span className="size-1 bg-[#FF6B00]" aria-hidden="true" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {!c.span && (
                  <p className="mt-6 font-mono text-[10px] tracking-[0.14em] text-[#475569] uppercase">
                    {c.items.join(" · ")}
                  </p>
                )}
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => openRfq("Special Project")}
              data-testid="capability-cta-tile"
              className="group flex h-full min-h-44 w-full cursor-pointer flex-col items-start justify-between bg-[#FF6B00] p-7 text-left transition-colors hover:bg-[#E05E00] lg:p-9"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-white/80 uppercase">
                Outside these categories?
              </span>
              <span className="font-heading flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
                Send the requirement
                <ArrowUpRight
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
