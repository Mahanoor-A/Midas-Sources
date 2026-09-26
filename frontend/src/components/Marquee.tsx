const ITEMS = [
  "Diplomatic & Government",
  "Oil & Gas / Energy",
  "Corporate & Multinational",
  "Industrial",
  "Healthcare",
  "Education",
  "Commercial Facilities",
  "Security & Infrastructure",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="editorial-marquee"
      className="overflow-hidden border-y border-[#1E293B] bg-[#0B0F17] py-5"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center font-mono text-[11px] tracking-[0.3em] whitespace-nowrap text-[#64748B] uppercase"
          >
            <span className="px-8">{item}</span>
            <span className="inline-block size-1.5 bg-[#FF6B00]" />
          </span>
        ))}
      </div>
    </div>
  );
}
