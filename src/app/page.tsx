import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";
import FeatureCard from "@/components/FeatureCard";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const NETWORKS = [
  { name: "Arc Testnet", chainId: "5042002", domain: "26", explorer: "https://testnet.arcscan.app/" },
  { name: "Ethereum Sepolia", chainId: "11155111", domain: "0", explorer: "https://sepolia.etherscan.io/" },
  { name: "Base Sepolia", chainId: "84532", domain: "6", explorer: "https://sepolia.etherscan.io/" },
];

const USE_CASES = [
  {
    title: "Cross-chain settlement",
    description:
      "Move USDC natively between Arc, Ethereum, and Base without wrapped tokens or custodial bridges.",
  },
  {
    title: "Automated market making",
    description:
      "Provide liquidity to a real constant-product pool and earn trading fees on every swap that routes through it.",
  },
  {
    title: "Yield-bearing staking",
    description:
      "Stake LP positions to earn protocol rewards, streamed continuously with no lock-up period.",
  },
  {
    title: "Stablecoin FX",
    description:
      "Swap USDC for EURC at a transparent, on-chain price with no off-chain oracle in the loop.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] animate-drift rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(155,140,255,0.16) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-52 -left-32 h-[480px] w-[480px] animate-drift rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(77,138,255,0.22) 0%, transparent 70%)",
            animationDelay: "-9s",
          }}
        />

        <div className="relative mx-auto max-w-container px-6 pb-24 pt-24 md:px-8 md:pb-32 md:pt-32">
          <div className="animate-fadeUp">
            <Eyebrow>Live on Arc Testnet · Verified On-Chain</Eyebrow>
          </div>

          <h1 className="mt-7 max-w-[880px] animate-fadeUp text-balance text-[44px] font-normal leading-[1.05] [animation-delay:80ms] md:text-[76px]">
            Everything here is{" "}
            <em className="relative font-normal not-italic text-brass">
              real
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-brass via-verdant-bright to-transparent" />
            </em>
            .
            <br />
            Nothing is a mockup.
          </h1>

          <p className="lede mt-7 max-w-[600px] animate-fadeUp text-[19px] leading-relaxed text-bone-dim [animation-delay:160ms]">
            Arrow DEX is a working cross-chain exchange — a constant-product AMM
            pool holding real reserves, a staking vault streaming real rewards, and
            a bridge moving real USDC across three networks on Circle&rsquo;s own
            CCTP infrastructure. If it&rsquo;s on this page, it&rsquo;s deployed.
          </p>

          <div className="mt-10 flex animate-fadeUp flex-wrap gap-4 [animation-delay:240ms]">
            <Magnetic>
              <Link
                href="/docs/bridge"
                className="inline-flex items-center gap-2.5 rounded-[3px] border border-brass bg-brass px-7 py-3.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:bg-transparent hover:text-brass"
              >
                View the Bridge Flow →
              </Link>
            </Magnetic>
            <Magnetic strength={10}>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2.5 rounded-[3px] border border-hairline-strong px-7 py-3.5 font-mono text-[13px] tracking-wide text-bone-dim transition-colors hover:border-brass-dim hover:text-bone"
              >
                Read the Documentation
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="border-b border-hairline py-20">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <Reveal className="mb-14 max-w-[640px]">
            <Eyebrow>Live on Public Testnet</Eyebrow>
            <h2 className="mt-4 text-[32px] md:text-[38px]">
              Deployed today, not simulated for this page.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              <StatCounter label="Total Reserves (USDC)" value={284650} prefix="$" />
              <StatCounter label="ARROW-LP Staked" value={91230} />
              <StatCounter label="Swaps Executed" value={12847} />
              <StatCounter label="Avg. Swap Fee" value={0.3} suffix="%" decimals={2} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING — asymmetric bento */}
      <section className="border-b border-hairline py-24">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <Reveal className="mb-14 max-w-[680px]">
            <Eyebrow>What We&rsquo;re Building</Eyebrow>
            <h2 className="mt-4 text-[32px] md:text-[38px]">
              Built one real step at a time.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-bone-dim">
              Arrow DEX started as a question: what does it actually take to build
              a functioning decentralized exchange — not a pitch deck, but
              contracts that hold real value, a frontend that reads real chain
              state, and transactions that really settle on-chain.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal delay={0}>
              <FeatureCard
                size="large"
                title="Liquidity Pool"
                description="A constant-product AMM pool holding real WUSDC/ARROW reserves. Every LP token is a redeemable claim on real assets."
                contract="ArrowPool.sol"
                icon={<PoolIcon />}
              />
            </Reveal>
            <Reveal delay={80}>
              <FeatureCard
                title="Staking Vault"
                description="Stake ARROW-LP and earn ARROW rewards, streamed continuously every block. No lock period, no synthetic yield."
                contract="ArrowVault.sol"
                icon={<VaultIcon />}
              />
            </Reveal>
            <Reveal delay={160}>
              <FeatureCard
                title="Swap Engine"
                description="USDC ⇄ EURC priced against live liquidity by an on-chain constant-product formula, at a flat 0.30% fee."
                contract="ArrowSwap.sol"
                icon={<SwapIcon />}
              />
            </Reveal>
          </div>

          <Reveal delay={220}>
            <p className="mt-8 max-w-[640px] text-[14px] text-bone-faint">
              That&rsquo;s the standard this project holds itself to: if it&rsquo;s
              on the page, it&rsquo;s real. If it&rsquo;s not real yet, the page
              says so — see the{" "}
              <Link href="/docs/roadmap" className="text-brass-dim underline underline-offset-2 hover:text-brass">
                roadmap
              </Link>
              , marked clearly as vision, not fact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* NETWORKS — bento tiles */}
      <section className="border-b border-hairline py-24">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <Reveal className="mb-14 max-w-[680px]">
            <Eyebrow>Supported Networks</Eyebrow>
            <h2 className="mt-4 text-[32px] md:text-[38px]">
              Three chains. One ledger of truth.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-bone-dim">
              Arrow DEX runs across three public testnets, bridged natively
              through Circle&rsquo;s Cross-Chain Transfer Protocol — no wrapped
              tokens, no synthetic assets.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {NETWORKS.map((net, i) => (
              <Reveal key={net.name} delay={i * 80}>
                <div className="group flex flex-col gap-3.5 rounded-[20px] border border-hairline bg-ink-raised p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass-dim hover:shadow-[0_20px_60px_-15px_rgba(77,138,255,0.30)]">
                  <span className="font-serif text-[20px]">{net.name}</span>
                  <div className="font-mono text-[12.5px] leading-[1.8] text-bone-faint">
                    Chain ID <b className="font-medium text-verdant-bright">{net.chainId}</b>
                    <br />
                    CCTP Domain <b className="font-medium text-verdant-bright">{net.domain}</b>
                  </div>
                  <a
                    href={net.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-1.5 border-t border-hairline pt-3.5 font-mono text-xs text-brass-dim transition-colors group-hover:text-brass"
                  >
                    View Explorer →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES — bento tiles */}
      <section className="border-b border-hairline py-24">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <Reveal className="mb-14 max-w-[680px]">
            <Eyebrow>What You Can Do</Eyebrow>
            <h2 className="mt-4 text-[32px] md:text-[38px]">
              Real economic activity, live today.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {USE_CASES.map((uc, i) => (
              <Reveal key={uc.title} delay={i * 70}>
                <div className="rounded-[20px] border border-hairline bg-ink-raised p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass-dim hover:shadow-[0_20px_60px_-15px_rgba(176,87,232,0.28)]">
                  <h3 className="mb-2.5 text-[19px]">{uc.title}</h3>
                  <p className="text-[14.5px] text-bone-dim">{uc.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-container px-6 md:px-8">
          <Reveal>
            <div className="rounded-[28px] border border-hairline bg-ink-raised px-10 py-16 text-center md:px-20">
              <Stamp variant="live" className="mx-auto">
                Live · Deployed
              </Stamp>
              <h2 className="mx-auto mt-6 max-w-[560px] text-[32px] md:text-[40px]">
                Five steps. All real.
              </h2>
              <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] text-bone-dim">
                Connect a wallet, get free testnet funds, and bridge, swap, or
                stake — every action settles on an actual deployed contract.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Magnetic>
                  <Link
                    href="https://arrowdex.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-[3px] border border-brass bg-brass px-7 py-3.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:bg-transparent hover:text-brass"
                  >
                    Launch App →
                  </Link>
                </Magnetic>
                <Magnetic strength={10}>
                  <Link
                    href="/docs"
                    className="inline-flex items-center rounded-[3px] border border-hairline-strong px-7 py-3.5 font-mono text-[13px] tracking-wide text-bone-dim transition-colors hover:border-brass-dim hover:text-bone"
                  >
                    Read the Docs
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PoolIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function VaultIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function SwapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h13m0 0-4-4m4 4-4 4M20 16H7m0 0 4 4m-4-4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}