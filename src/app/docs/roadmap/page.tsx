import Link from "next/link";
import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "Roadmap — Arrow DEX Documentation",
  description:
    "What's next for Arrow DEX — clearly marked as vision, not built. Lending, expanded yield farming, more pools, an independent audit, and governance.",
};

const ITEMS = [
  {
    id: "lending",
    title: "Lending & Borrowing",
    body: "Supply assets to earn interest, or post collateral to borrow against it — the piece that turns Arrow from an exchange into a full credit market.",
  },
  {
    id: "farming",
    title: "Yield Farming, Expanded",
    body: "More reward pools beyond ARROW-LP, with multiple simultaneous reward tokens and time-boosted emission curves for long-term liquidity providers.",
  },
  {
    id: "pools",
    title: "More Pairs",
    body: "cirBTC support and additional stable pairs. Any pool deployed through ArrowFactory is routable through ArrowRouter immediately — this is about expanding which assets have a pool at all.",
  },
  {
    id: "audit",
    title: "Independent Security Audit",
    body: "Every contract — router, factory, pool, vault, swap — reviewed by an outside firm before any real-value deployment is ever considered.",
  },
  {
    id: "governance",
    title: "Governance",
    body: "ARROW holders eventually deciding fee tiers, reward emissions, and which pools get liquidity incentives — the protocol run by the people using it.",
  },
];

export default function RoadmapPage() {
  return (
    <>
      <DocsSidebar onThisPage={ITEMS.map((i) => ({ href: `#${i.id}`, label: i.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Roadmap · Not Yet Built</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">What&rsquo;s Next</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Everything below is roadmap — not built yet, marked clearly as
          vision, not fact. Nothing here should be read as a live feature.
          When something ships, it moves to the documentation pages with a
          Live stamp, exactly like ArrowRouter and ArrowFactory did.
        </p>

        <div className="mt-14">
          {ITEMS.map((item, i) => (
            <div
              key={item.id}
              id={item.id}
              className={`grid scroll-mt-24 grid-cols-1 gap-4 py-10 md:grid-cols-[1fr_2fr] md:gap-10 ${
                i < ITEMS.length - 1 ? "border-b border-dashed border-hairline-strong" : ""
              }`}
            >
              <div>
                <Stamp variant="roadmap" className="mb-3.5">
                  Roadmap
                </Stamp>
                <h3 className="font-normal text-bone-dim">{item.title}</h3>
              </div>
              <p className="max-w-[560px] text-[14.5px] text-bone-dim">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-hairline bg-ink-raised p-9">
          <Stamp variant="live">Live Today</Stamp>
          <h3 className="mb-2 mt-4 text-[22px]">
            In the meantime, everything above is real
          </h3>
          <p className="mb-5 max-w-[480px] text-[14.5px] text-bone-dim">
            Bridging, swapping, best-price routing, permissionless pool
            deployment, liquidity provision, and staking are all deployed and
            working right now on Arc Testnet, Ethereum Sepolia, and Base
            Sepolia.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass"
          >
            See What&rsquo;s Live →
          </Link>
        </div>
      </div>
    </>
  );
}