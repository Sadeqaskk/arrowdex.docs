import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "ArrowPool — Arrow DEX Documentation",
  description:
    "ArrowPool is a constant-product AMM for WUSDC pairs on Arc Testnet — add or remove liquidity, wrap USDC 1:1, and earn 0.30% of every trade.",
};

const SECTIONS = [
  {
    id: "constant-product",
    title: "Constant-Product AMM",
    body: "Each pool holds two reserves and prices trades along x·y=k, the same mechanism as Uniswap v2. Liquidity providers deposit both sides of the pair and earn a 0.30% fee on every swap, proportional to their share of the pool.",
  },
  {
    id: "multiple-pairs",
    title: "Multiple WUSDC Pairs",
    body: "ArrowPool isn't one pair — WUSDC/ARROW and WUSDC/EURC both run on the same pool mechanics, each with its own reserves, LP token, and price. New pairs created through ArrowFactory work identically.",
  },
  {
    id: "wrap-unwrap",
    title: "Wrap / Unwrap USDC",
    body: "Liquidity is deposited in WUSDC, not native USDC. Wrapping converts USDC to WUSDC 1:1 with no fee, and unwrapping reverses it — a one-step conversion before adding liquidity, not a separate market.",
  },
  {
    id: "lp-tokens",
    title: "LP Tokens Track Your Share",
    body: "Adding liquidity mints LP tokens representing your share of the pool's reserves. The first deposit sets the initial price; every deposit after that mints LP proportional to the smaller side's share of the existing reserves.",
  },
  {
    id: "withdraw-anytime",
    title: "Withdraw Anytime",
    body: "Removing liquidity burns LP tokens and returns both sides of the pair in proportion to the pool's current reserves — including any fees the position has earned since it was deposited.",
  },
];

export default function PoolDocsPage() {
  return (
    <>
      <DocsSidebar onThisPage={SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">ArrowPool</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          A real constant-product AMM on Arc Testnet. Deposit both tokens in
          a pair to earn 0.30% of every trade, wrap USDC into WUSDC to get
          started, and withdraw your share whenever you want.
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
            ArrowPool: 0x92318C8845283B9E8A33124Ef4EC520491F826F0
          </p>
        </div>
      </div>
    </>
  );
}