import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "ArrowSwap — Arrow DEX Documentation",
  description:
    "ArrowSwap executes real token swaps on Arc Testnet — live pool quotes, price-impact protection, and slippage control, either direct or routed through ArrowRouter for best price.",
};

const SECTIONS = [
  {
    id: "live-quotes",
    title: "Live, On-Chain Quotes",
    body: "Every quote is computed from the pool's actual reserves at request time — a background refresh keeps the rate ticker current, and quotes re-run automatically as you type an amount or change the pair.",
  },
  {
    id: "dual-engine",
    title: "Direct Pool or Best-Price Routing",
    body: "Swap directly against a single pool via the ArrowSwap Engine, or switch to ArrowRouter to have the best price found across available paths — the same interface handles both, and the trade details panel always reflects whichever mode is active.",
  },
  {
    id: "price-impact",
    title: "Price Impact Protection",
    body: "Impact is calculated for every trade and color-coded by severity. Trades above a 5% impact threshold require an explicit acknowledgment before they can be submitted, so large trades against thin liquidity are never one accidental click away.",
  },
  {
    id: "slippage",
    title: "Configurable Slippage",
    body: "Slippage tolerance defaults to sensible presets but can be set to any custom value. It's applied to the live quote to compute a minimum-received amount, which is enforced on-chain so the trade reverts rather than filling at a worse price.",
  },
  {
    id: "settlement",
    title: "Real Settlement",
    body: "Confirming a swap submits a real transaction to Arc Testnet — wallet approval, submission, and confirmation are tracked step by step, with the resulting transaction hash linked directly to the explorer.",
  },
];

export default function SwapDocsPage() {
  return (
    <>
      <DocsSidebar onThisPage={SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">ArrowSwap</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Real swaps on Arc Testnet. Trade directly against a pool or let
          ArrowRouter find the best price across paths — either way, quotes
          are live, impact is protected, and every fill is a real on-chain
          transaction.
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
          <h3 className="mb-2 mt-4 text-[22px]">Contract</h3>
          <p className="max-w-[520px] break-all font-mono text-[13px] text-bone-faint">
            ArrowSwap: 0x847ee9aA98A05d371Be291A95A087FA02E77A416
          </p>
        </div>
      </div>
    </>
  );
}