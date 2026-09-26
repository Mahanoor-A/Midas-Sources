import { motion, useScroll, useTransform } from "motion/react";
import { useRfq } from "@/components/RfqModal";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1516937941344-00b4e0337589?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwb2lsJTIwZ2FzJTIwcmVmaW5lcnklMjBlbmdpbmVlcmluZ3xlbnwwfHx8fDE3OTA0MjM3NzJ8MA&ixlib=rb-4.1.0&q=85";

const LINES = ["PROCUREMENT.", "PROJECTS.", "TECHNICAL SOLUTIONS."];

export function HeroSection() {
  const { openRfq } = useRfq();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 220]);
  const fade = useTransform(scrollY, [0, 600], [1, 0.25]);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.12 }}>
        <img
          src={HERO_IMG}
          alt="Industrial oil and gas refinery complex"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/80 via-[#0B0F17]/70 to-[#0B0F17]" />
      <div className="tech-grid-bg absolute inset-0 opacity-40" />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-16 lg:px-8 lg:pb-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase"
          data-testid="hero-eyebrow"
        >
          <span>Est. June 10, 2007</span>
          <span className="text-[#334155]">/</span>
          <span className="text-[#94A3B8]">Rawalpindi, Pakistan</span>
          <span className="text-[#334155]">/</span>
          <span className="text-[#94A3B8]">33.5973° N, 73.0479° E</span>
        </motion.p>

        <h1
          className="font-heading max-w-5xl text-[13vw] leading-[0.95] font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-6xl lg:text-7xl xl:text-[86px]"
          data-testid="hero-headline"
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${i === 2 ? "text-[#FF6B00]" : ""}`}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.25 + i * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base text-[#CBD5E1] sm:text-lg"
          data-testid="hero-subcopy"
        >
          One dependable partner for diverse operational requirements —
          supporting diplomatic, energy, corporate and institutional
          organizations across Pakistan since 2007.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            data-testid="hero-rfq-btn"
            onClick={() => openRfq("RFQ")}
            className="group flex cursor-pointer items-center gap-3 bg-[#FF6B00] px-7 py-4 font-mono text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#E05E00]"
          >
            Submit an RFQ
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <a
            href="#capabilities"
            data-testid="hero-capabilities-btn"
            className="flex items-center gap-3 border border-[#334155] px-7 py-4 font-mono text-xs font-medium tracking-[0.18em] text-[#F8FAFC] uppercase transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00]"
          >
            Explore capabilities
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-[#64748B] uppercase"
        >
          <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
          Scroll — institutional profile
        </motion.div>
      </motion.div>
    </section>
  );
}
