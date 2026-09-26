import { Reveal } from "@/components/Reveal";
import {
  Landmark,
  Flame,
  Building2,
  Factory,
  HeartPulse,
  GraduationCap,
  Store,
  ShieldCheck,
} from "lucide-react";

const INDUSTRIES = [
  { icon: Landmark, title: "Diplomatic & Government", desc: "Embassies, missions and public institutions" },
  { icon: Flame, title: "Oil & Gas / Energy", desc: "Upstream operators and energy companies" },
  { icon: Building2, title: "Corporate & Multinational", desc: "International companies operating in Pakistan" },
  { icon: Factory, title: "Industrial", desc: "Manufacturing and processing facilities" },
  { icon: HeartPulse, title: "Healthcare", desc: "Hospitals and medical institutions" },
  { icon: GraduationCap, title: "Education", desc: "School systems and academic campuses" },
  { icon: Store, title: "Commercial Facilities", desc: "Offices, retail and mixed-use properties" },
  { icon: ShieldCheck, title: "Security & Infrastructure", desc: "Critical and protective infrastructure" },
];

export function IndustriesServed() {
  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="border-y border-[#1E293B] bg-[#0F172A]/60 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
            Industries Served
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
            Built for demanding institutional environments.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-[#1E293B] bg-[#1E293B] sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.title} delay={(i % 4) * 0.07}>
              <div
                data-testid={`industry-tile-${i}`}
                className="group h-full bg-[#0B0F17] p-7 transition-colors duration-300 hover:bg-[#111827]"
              >
                <ind.icon
                  className="size-6 text-[#475569] transition-colors duration-300 group-hover:text-[#FF6B00]"
                  aria-hidden="true"
                />
                <h3 className="font-heading mt-6 text-base font-semibold tracking-tight text-[#F8FAFC]">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm text-[#94A3B8]">{ind.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
