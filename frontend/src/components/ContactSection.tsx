import { Reveal } from "@/components/Reveal";
import { useRfq } from "@/components/RfqModal";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  const { openRfq } = useRfq();
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#FF6B00] uppercase">
              Contact
            </p>
            <h2 className="font-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
              Send us your requirement.
            </h2>
            <p className="mt-6 max-w-md text-base text-[#94A3B8]">
              Procurement teams can reach us directly, or submit an RFQ through
              the form for a structured review.
            </p>
            <button
              type="button"
              data-testid="contact-rfq-btn"
              onClick={() => openRfq("RFQ")}
              className="group mt-10 flex cursor-pointer items-center gap-3 bg-[#FF6B00] px-8 py-4 font-mono text-xs font-medium tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#E05E00]"
            >
              Submit an RFQ
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-px border border-[#1E293B] bg-[#1E293B]">
              <div className="flex gap-5 bg-[#111827] p-7">
                <MapPin className="mt-0.5 size-5 shrink-0 text-[#FF6B00]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#64748B] uppercase">
                    Head Office
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]" data-testid="contact-address">
                    3276/1 Adam Jee Road, Saddar,
                    <br />
                    Rawalpindi, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex gap-5 bg-[#111827] p-7">
                <Phone className="mt-0.5 size-5 shrink-0 text-[#FF6B00]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#64748B] uppercase">
                    Telephone
                  </p>
                  <p className="mt-2 text-sm text-[#E2E8F0]">
                    <a href="tel:+92515519925" data-testid="contact-phone-1" className="transition-colors hover:text-[#FF6B00]">
                      051-5519925
                    </a>
                    <span className="mx-2 text-[#334155]">/</span>
                    <a href="tel:+923130910555" data-testid="contact-phone-2" className="transition-colors hover:text-[#FF6B00]">
                      0313-0910555
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-5 bg-[#111827] p-7">
                <Mail className="mt-0.5 size-5 shrink-0 text-[#FF6B00]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#64748B] uppercase">
                    Email
                  </p>
                  <a
                    href="mailto:midassourcespakistan@gmail.com"
                    data-testid="contact-email"
                    className="mt-2 block text-sm break-all text-[#E2E8F0] transition-colors hover:text-[#FF6B00]"
                  >
                    midassourcespakistan@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
