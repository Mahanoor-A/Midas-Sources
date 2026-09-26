import { Reveal } from "@/components/Reveal";

const FRAMES = [
  {
    src: "https://images.unsplash.com/photo-1592085198739-ffcad7f36b54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBzdXBwbHklMjBjaGFpbiUyMGZyZWlnaHR8ZW58MHx8fDE3OTA0MjM3NzJ8MA&ixlib=rb-4.1.0&q=85",
    tag: "PROCUREMENT & SUPPLY",
    caption: "Vetted supply chains for institutional requirements",
  },
  {
    src: "https://images.unsplash.com/photo-1602056820935-316884c035f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxpbmR1c3RyaWFsJTIwb2lsJTIwZ2FzJTIwcmVmaW5lcnklMjBlbmdpbmVlcmluZ3xlbnwwfHx8fDE3OTA0MjM3NzJ8MA&ixlib=rb-4.1.0&q=85",
    tag: "ENERGY SECTOR",
    caption: "Technical support in oil & gas environments",
  },
  {
    src: "https://images.unsplash.com/photo-1574848296471-28f79a036f79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fDE3OTA0MjM3NzJ8MA&ixlib=rb-4.1.0&q=85",
    tag: "FACILITY & CONSTRUCTION",
    caption: "Execution across commercial and corporate facilities",
  },
];

export function ProjectShowcase() {
  return (
    <section
      data-testid="project-showcase"
      className="bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
            Operating Environments
          </p>
          <h2 className="font-heading mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
            Where our work happens.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FRAMES.map((f, i) => (
            <Reveal key={f.tag} delay={i * 0.1}>
              <figure
                data-testid={`showcase-frame-${i}`}
                className="group border border-[#1E293B] bg-[#111827] p-3"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={f.src}
                    alt={f.caption}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0F17]/85 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#FF6B00] backdrop-blur-sm">
                    {f.tag}
                  </span>
                </div>
                <figcaption className="px-2 py-4 text-sm text-[#94A3B8]">
                  {f.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
