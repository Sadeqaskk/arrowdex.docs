export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-brass-dim">
      <span className="block h-[5px] w-[5px] rounded-full bg-brass shadow-[0_0_8px_#9B8CFF]" />
      {children}
    </span>
  );
}