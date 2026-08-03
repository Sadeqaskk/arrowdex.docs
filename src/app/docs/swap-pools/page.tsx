import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "Swap & Pools — Arrow DEX Documentation",
  description:
    "How swaps, liquidity pools, and the ARROW-LP staking vault work on Arrow DEX — all live, deployed, and real.",
};

export default function SwapPoolsPage() {
  return (
    <>
      <DocsSidebar
        onThisPage={[
          { href: "#swap", label: "Swap Engine" },
          { href: "#pools", label: "Liquidity Pools" },
          { href: "#vault", label: "Staking Vault" },
          { href: "#pricing", label: "Pricing Model" },
        ]}
      />
      <div className="min-w-0 flex-1">
        <Eyebrow>Trading · Live · Deployed</Eyebrow>
        <h1 id="swap" className="mb-5 mt-5 scroll-mt-24 text-[42px] md:text-[48px]">
          Swap &amp; Pools
        </h1>
        <p className="lede mb-14 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Three contracts, all deployed on Arc Testnet: a swap engine, a
          constant-product liquidity pool, and a staking vault. Together they
          form the trading core of Arrow DEX.
        </p>

        <div className="mb-16 grid grid-cols-1 gap-px border border-hairline bg-hairline md:grid-cols-3">
          <Card title="ArrowSwap" description="Prices USDC ⇄ EURC trades against live pool reserves using an on-chain constant-product formula." metaLabel="Fee" metaValue="0.30%" />
          <Card title="ArrowPool" description="Holds real WUSDC/ARROW reserves. LP tokens represent a redeemable share of the pool at any time." metaLabel="Model" metaValue="x·y=k" />
          <Card title="ArrowVault" description="Stake ARROW-LP tokens to earn ARROW rewards, streamed continuously with no lock period." metaLabel="Emission" metaValue="Per-block" />
        </div>

        <div id="pools" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-4">
            <Eyebrow>Liquidity Pools</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <p className="mb-6 max-w-[640px] text-[15px] leading-relaxed text-bone-dim">
            The WUSDC/ARROW pool follows the same constant-product model used
            by Uniswap V2 — reserves of both assets are held by the contract,
            and the price is determined entirely by their ratio. Add liquidity
            to receive LP tokens; remove liquidity at any time to redeem your
            proportional share of both reserves, plus any accrued trading
            fees.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline-strong">
                  <Th>Pool</Th>
                  <Th>Model</Th>
                  <Th>Fee Tier</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-hairline">
                  <Td mono>WUSDC / ARROW</Td>
                  <Td>Constant Product</Td>
                  <Td>0.30%</Td>
                  <Td>
                    <Stamp variant="live" className="text-[9.5px]">
                      Live
                    </Stamp>
                  </Td>
                </tr>
                <tr>
                  <Td mono muted>USDC / cirBTC</Td>
                  <Td muted>—</Td>
                  <Td muted>—</Td>
                  <Td>
                    <Stamp variant="roadmap" className="text-[9.5px]">
                      Roadmap
                    </Stamp>
                  </Td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-16 h-px bg-hairline" />

        <div id="vault" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-4">
            <Eyebrow>Staking Vault</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-bone-dim">
            The ArrowVault contract follows a Synthetix-style staking design.
            Deposit ARROW-LP tokens to begin earning ARROW rewards
            immediately, streamed on a per-block basis. There is no lock-up —
            withdraw your principal or claim accrued rewards at any time,
            independently of each other.
          </p>
        </div>

        <div className="my-16 h-px bg-hairline" />

        <div id="pricing" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-4">
            <Eyebrow>Pricing Model</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-bone-dim">
            Every swap is priced by the pool&rsquo;s own reserves at the
            moment of execution —{" "}
            <span className="font-mono text-verdant-bright">x · y = k</span> —
            the same formula that has secured billions in mainnet liquidity
            since 2020. There is no off-chain price feed and no oracle
            dependency for this pair; the market is the pool.
          </p>
        </div>

        <div className="mt-16 border border-hairline bg-ink-raised p-9">
          <Stamp variant="live">Live · Deployed</Stamp>
          <h3 className="mb-2 mt-4 text-[22px]">Ready to trade?</h3>
          <p className="mb-5 max-w-[480px] text-[14.5px] text-bone-dim">
            Connect a wallet to swap, add liquidity, or stake ARROW-LP — all
            four actions are live on Arc Testnet today.
          </p>
          <button className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass">
            Connect Wallet →
          </button>
        </div>
      </div>
    </>
  );
}

function Card({
  title,
  description,
  metaLabel,
  metaValue,
}: {
  title: string;
  description: string;
  metaLabel: string;
  metaValue: string;
}) {
  return (
    <div className="bg-ink-raised p-7">
      <Stamp variant="live" className="mb-5">
        Live
      </Stamp>
      <h3 className="mb-2.5 text-[19px]">{title}</h3>
      <p className="text-[14px] text-bone-dim">{description}</p>
      <div className="mt-5 flex justify-between border-t border-hairline pt-3.5 font-mono text-xs text-bone-faint">
        <span>{metaLabel}</span>
        <span>{metaValue}</span>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-0 py-3 text-left font-mono text-[11.5px] uppercase tracking-wider text-bone-faint">
      {children}
    </th>
  );
}
function Td({
  children,
  mono,
  muted,
}: {
  children: React.ReactNode;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <td
      className={`px-0 py-4 ${mono ? "font-mono" : ""} ${muted ? "text-bone-faint" : "text-bone-dim"}`}
    >
      {children}
    </td>
  );
}
