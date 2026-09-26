import { Reveal } from "@/components/Reveal";
import { useRfq } from "@/components/RfqModal";
import { ArrowRight, MessageSquare } from "lucide-react";

export function ConversionStrip() {
  const { openRfq } = useRfq();
  return (
    <section
      data-testid="conversion-strip"
      className="relative overflow-hidden border-y border-[#FF6B00]/30 bg-[#0F172A] py-20 lg:py-28"
    >
      <div className="tech-grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[#FF6B00]/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
            Institutional Engagement
          </p>
          <h2
            className="font-heading mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            data-testid="conversion-headline"
          >
            Looking for a dependable local supplier or project partner in
            Pakistan?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#94A3B8]">
            Whether you have an RFQ, BOQ, procurement requirement, maintenance
            scope or specialized project requirement, our team is ready to
            review your needs.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              data-testid="conversion-rfq-btn"
              onClick={() => openRfq("RFQ")}
              className="group flex cursor-pointer items-center gap-3 bg-[#FF6B00] px-8 py-4 font-mono text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#E05E00]"
            >
              Submit an RFQ
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              data-testid="conversion-discuss-btn"
              onClick={() => openRfq("General Inquiry")}
              className="flex cursor-pointer items-center gap-3 border border-[#334155] bg-[#1E293B]/60 px-8 py-4 font-mono text-xs font-medium tracking-[0.18em] text-[#F8FAFC] uppercase transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00]"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              Discuss your requirement
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
