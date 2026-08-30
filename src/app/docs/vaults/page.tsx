import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "ArrowVault — Arrow DEX Documentation",
  description:
    "ArrowVault lets you stake ARROW-LP pool tokens to earn streamed ARROW rewards with no lock period — Synthetix-style reward accrual, live on Arc Testnet.",
};

const SECTIONS = [
  {
    id: "no-lock",
    title: "No Lock Period",
    body: "Stake ARROW-LP tokens and withdraw any amount at any time. There's no cooldown, no vesting cliff, and no penalty for exiting early — your stake stays liquid the whole time it's earning.",
  },
  {
    id: "reward-streaming",
    title: "Synthetix-Style Reward Streaming",
    body: "Rewards accrue continuously, per second, in proportion to your share of the total pool staked — not in discrete epochs. The APR shown reflects the live reward rate for the current period, not a fixed or advertised number.",
  },
  {
    id: "live-accrual",
    title: "Live, On-Chain Accrual",
    body: "Unclaimed rewards are calculated directly from your staked balance and the vault's live reward rate, and extrapolated between refreshes so the number you see is always moving — never a cached or estimated snapshot.",
  },
  {
    id: "claim-exit",
    title: "Claim or Exit Anytime",
    body: "Claim accrued ARROW rewards on their own, withdraw a partial amount of staked ARROW-LP, or exit the vault entirely in one transaction — withdrawing your full stake and claiming rewards together.",
  },
  {
    id: "funded-periods",
    title: "Funded Reward Periods",
    body: "Reward periods are funded and started by the vault owner, who deposits ARROW and sets a duration — the resulting rate (amount ÷ duration) becomes the pool-wide reward rate for that period. When a period ends without a new one funded, the vault stops streaming rewards until it's restarted.",
  },
];

export default function VaultDocsPage() {
  return (
    <>
      <DocsSidebar onThisPage={SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">ArrowVault</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Stake ARROW-LP pool tokens to earn ARROW rewards over time, with no
          lock period and no minimum duration. Rewards stream continuously
          and can be claimed, and your stake can be withdrawn, whenever you
          want.
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
            ArrowVault: 0x23B595fcFD75F8fD46FC044220b74a93cdFDd7F9
          </p>
        </div>
      </div>
    </>
  );
}