import { useEffect, useState } from "react";
import { useRfq } from "@/components/RfqModal";

const NAV = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Clients", href: "#clients" },
  { label: "Quality & HSE", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const { openRfq } = useRfq();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-[#1E293B] bg-[#0B0F17]/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#top"
          data-testid="header-logo"
          className="group flex items-center gap-3"
        >
          <svg
            viewBox="0 0 64 64"
            className="size-8 transition-transform duration-300 group-hover:rotate-3"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="8" fill="#111827" />
            <path
              d="M14 48V16h7.5L32 34.5 42.5 16H50v32h-8V30.5L32 46 22 30.5V48h-8z"
              fill="#FF6B00"
            />
            <rect x="14" y="52" width="36" height="2" fill="#334155" />
          </svg>
          <span className="leading-none">
            <span className="font-heading block text-sm font-semibold tracking-[0.08em] text-[#F8FAFC]">
              MIDAS SOURCES
            </span>
            <span className="mt-1 block font-mono text-[10px] tracking-[0.28em] text-[#64748B] uppercase">
              International
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
          data-testid="header-nav"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="font-mono text-[11px] tracking-[0.14em] text-[#94A3B8] uppercase transition-colors hover:text-[#F8FAFC]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden border border-[#334155] px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-[#94A3B8] md:block">
            EST. 2007
          </span>
          <button
            type="button"
            data-testid="header-rfq-btn"
            onClick={() => openRfq("RFQ")}
            className="cursor-pointer bg-[#FF6B00] px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#E05E00]"
          >
            Submit an RFQ
          </button>
        </div>
      </div>
    </header>
  );
}
