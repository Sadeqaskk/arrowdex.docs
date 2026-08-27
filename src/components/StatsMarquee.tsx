type StatsMarqueeProps = {
  items: string[];
};

export default function StatsMarquee({ items }: StatsMarqueeProps) {
  // Duplicated once so the track can loop seamlessly at -50% translateX.
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-hairline py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-2 whitespace-nowrap font-mono text-[12.5px] tracking-wide text-bone-faint"
          >
            <span className="h-1 w-1 rounded-full bg-brass-dim" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}