import { useEffect, useState } from "react";

const DIVISIONS = [
  "Procurement & General Supply",
  "Construction & Renovation",
  "Fire, Safety & Security",
  "Facility & Technical Services",
  "Fabrication & Infrastructure",
  "Interiors",
  "Printing & Corporate Supply",
  "Special Projects",
];

export function Footer() {
  const [pkt, setPkt] = useState("");

  useEffect(() => {
    const tick = () =>
      setPkt(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      data-testid="site-footer"
      className="border-t border-[#1E293B] bg-[#080B11]"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-heading text-4xl font-semibold tracking-[-0.03em] text-[#F8FAFC] sm:text-5xl">
              MIDAS SOURCES
              <span className="text-[#FF6B00]">.</span>
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.28em] text-[#64748B] uppercase">
              International — Est. 2007
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              Integrated procurement, contracting and technical solutions for
              organizations operating in Pakistan.
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#64748B] uppercase">
              Capability Divisions
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {DIVISIONS.map((d) => (
                <li key={d}>
                  <a
                    href="#capabilities"
                    className="text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
                  >
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#64748B] uppercase">
              Head Office
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#94A3B8]">
              3276/1 Adam Jee Road, Saddar,
              <br />
              Rawalpindi, Pakistan
            </p>
            <p className="mt-4 font-mono text-xs text-[#64748B]" data-testid="footer-clock">
              RWP {pkt} PKT (UTC+5)
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#1E293B] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-[#475569]">
            © 2007–{new Date().getFullYear()} Midas Sources International. All
            rights reserved.
          </p>
          <p className="flex items-center gap-4 font-mono text-[11px] text-[#475569]">
            <span>33.5973° N, 73.0479° E — Rawalpindi, Pakistan</span>
            <a
              href="/admin/login"
              data-testid="footer-admin-link"
              className="tracking-[0.18em] uppercase transition-colors hover:text-[#FF6B00]"
            >
              Admin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
