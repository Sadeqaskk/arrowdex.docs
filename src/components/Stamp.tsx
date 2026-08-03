export default function Stamp({
  variant = "live",
  children,
  className = "",
}: {
  variant?: "live" | "roadmap";
  children: React.ReactNode;
  className?: string;
}) {
  if (variant === "live") {
    return (
      <span
        className={`inline-flex items-center gap-[7px] rounded-full border border-verdant-bright/40 bg-verdant/10 px-[10px] py-[5px] font-mono text-[10.5px] uppercase tracking-widest text-verdant-bright ${className}`}
      >
        <span className="block h-1.5 w-1.5 rounded-full bg-verdant-bright shadow-[0_0_6px_#7C9CFF]" />
        {children}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-[7px] rounded-full border border-dashed border-hairline-strong px-[10px] py-[5px] font-mono text-[10.5px] uppercase tracking-widest text-bone-faint ${className}`}
    >
      <span className="block h-1.5 w-1.5 rounded-full border border-bone-faint" />
      {children}
    </span>
  );
}