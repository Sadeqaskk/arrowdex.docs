import Link from "next/link";
import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "ArrowRouter — Arrow DEX Documentation",
  description:
    "ArrowRouter is the single entry point for swaps across the Arrow ecosystem — multi-hop pathfinding across every registered pool, deployed and live on Arc Testnet.",
};

const SECTIONS = [
  {
    id: "pathfinding",
    title: "Multi-Hop Pathfinding",
    body: "ArrowRouter builds a graph of every registered pool and finds the path — direct or multi-hop — that returns the best output for a given input. Builders never hardcode a route.",
  },
  {
    id: "multi-pool",
    title: "Multi-Pool-Per-Pair",
    body: "If two pools exist for the same pair, the router compares them and routes through the better one. You call one function; the router decides where the liquidity actually is.",
  },
  {
    id: "fee-on-transfer",
    title: "Fee-on-Transfer Safe",
    body: "Swaps correctly account for tokens that take a fee on transfer, so output amounts stay accurate even for non-standard ERC-20s that break naive routers.",
  },
  {
    id: "batch",
    title: "Batch Swaps",
    body: "Multiple swaps execute in a single transaction — lower gas, and a building block for bots, portfolio rebalancing, or any UI that wants to bundle actions.",
  },
  {
    id: "safety",
    title: "Pausable, Two-Step Ownership",
    body: "Administrative safety rails a production integration can rely on — the router can be paused in an emergency, and ownership transfer requires explicit acceptance, not a single risky call.",
  },
];

export default function RouterDocsPage() {
  return (
    <>
      <DocsSidebar onThisPage={SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">ArrowRouter</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          ArrowRouter is the single entry point for swaps across the Arrow
          ecosystem. Instead of routing through one pool, it finds the best
          price across every pool currently registered — deployed and
          executing real swaps today, not a planned feature.
        </p>

        <div className="mt-14">
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className={`grid scroll-mt-24 grid-cols-1 gap-4 py-10 md:grid-cols-[1fr_2fr] md:gap-10 ${
                i < SECTIONS.length - 1 ? "border-b border-dashed border-hairline-strong" : ""
              }`}
            >
              <div>
                <Stamp variant="live" className="mb-3.5">
                  Live
                </Stamp>
                <h3 className="font-normal text-bone-dim">{s.title}</h3>
              </div>
              <p className="max-w-[560px] text-[14.5px] text-bone-dim">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-hairline bg-ink-raised p-9">
          <Stamp variant="live">Deployed</Stamp>
          <h3 className="mb-2 mt-4 text-[22px]">Integrating</h3>
          <p className="mb-4 max-w-[520px] text-[14.5px] text-bone-dim">
            Pools deployed through{" "}
            <Link href="/docs/factory" className="text-brass-dim underline underline-offset-2 hover:text-brass">
              ArrowFactory
            </Link>{" "}
            auto-register with ArrowRouter at creation — no action needed. If
            you&rsquo;re integrating an existing pool manually, reach out to
            get it registered.
          </p>
          <p className="mb-5 max-w-[520px] break-all font-mono text-[13px] text-bone-faint">
            Contract (Arc Testnet): 0x94D72FdDC5A6bF52968797699dAce54812934765
          </p>
          <Link
            href="/router"
            className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass"
          >
            Open Router Console →
          </Link>
        </div>
      </div>
    </>
  );
}