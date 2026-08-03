import Stamp from "./Stamp";

export default function FeatureCard({
  title,
  description,
  contract,
  icon,
  size = "normal",
}: {
  title: string;
  description: string;
  contract: string;
  icon: React.ReactNode;
  size?: "normal" | "large";
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] border border-hairline bg-ink-raised p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass-dim hover:shadow-[0_20px_60px_-15px_rgba(155,140,255,0.35)] ${
        size === "large" ? "sm:col-span-2" : ""
      }`}
    >
      {/* soft glow that only appears on hover, squared to the tile's own corners */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(280px_180px_at_20%_0%,rgba(155,140,255,0.10),transparent_70%)]" />

      <div className="relative mb-6 flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-hairline-strong text-brass transition-colors group-hover:border-brass-dim">
          {icon}
        </div>
        <Stamp variant="live">Live</Stamp>
      </div>
      <h3 className="relative mb-2.5 text-[21px]">{title}</h3>
      <p className="relative text-[14.5px] text-bone-dim">{description}</p>
      <div className="relative mt-6 flex justify-between border-t border-hairline pt-4 font-mono text-xs text-bone-faint">
        <span>Contract</span>
        <span>{contract}</span>
      </div>
    </div>
  );
}