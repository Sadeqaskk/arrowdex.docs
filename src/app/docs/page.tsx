import Link from "next/link";
import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "Documentation — Arrow DEX",
  description: "How Arrow DEX works — everything reflects what's actually built and live today.",
};

export default function DocsOverviewPage() {
  return (
    <>
      <DocsSidebar
        onThisPage={[
          { href: "#overview", label: "Overview" },
          { href: "#built", label: "What's Built" },
          { href: "#getting-started", label: "Getting Started" },
        ]}
      />
      <div className="min-w-0 flex-1">
        <Eyebrow>Documentation · Arc Testnet · Verified On-Chain</Eyebrow>
        <h1 id="overview" className="mb-5 mt-5 text-[42px] md:text-[48px]">
          How Arrow DEX Works
        </h1>
        <p className="lede mb-14 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Everything here reflects what&rsquo;s actually built and live today.
          Nothing on this page is aspirational — the{" "}
          <Link href="/docs/roadmap" className="text-brass-dim underline underline-offset-2 hover:text-brass">
            roadmap
          </Link>{" "}
          is clearly marked as what&rsquo;s next, not what exists.
        </p>

        <div id="built" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-4">
            <Eyebrow>What&rsquo;s Built</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
            <DocCard
              title="The Bridge Flow"
              description="Four steps, native burn-and-mint USDC across three chains."
              href="/docs/bridge"
            />
            <DocCard
              title="Swap & Pools"
              description="The swap engine, the AMM pool, and the staking vault."
              href="/docs/swap-pools"
            />
            <DocCard
              title="FAQ"
              description="Common questions about bridging, trading, and audits."
              href="/docs/faq"
            />
          </div>
        </div>

        <div id="getting-started" className="mt-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-4">
            <Eyebrow>Getting Started</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <div className="space-y-0">
            {[
              {
                n: "01",
                title: "Install a wallet",
                body: "MetaMask, Rabby, or any wallet extension — or skip that and use WalletConnect from your phone.",
              },
              {
                n: "02",
                title: "Get free testnet funds",
                body: "Free testnet USDC and gas from faucet.circle.com.",
              },
              {
                n: "03",
                title: "Connect on any page",
                body: "Click Connect Wallet on any Arrow DEX page.",
              },
              {
                n: "04",
                title: "Bridge, swap, or stake",
                body: "Bridge funds in, swap between assets, add liquidity, or stake ARROW-LP — all four are real and live today.",
              },
              {
                n: "05",
                title: "Approve on-chain",
                body: "Approve the wallet prompts as they appear — each corresponds to one real on-chain step.",
              },
            ].map((step, i, arr) => (
              <div
                key={step.n}
                className={`grid grid-cols-[64px_1fr] gap-6 py-7 ${i < arr.length - 1 ? "border-b border-hairline" : ""}`}
              >
                <span className="pt-0.5 font-mono text-[13px] text-brass-dim">{step.n}</span>
                <div>
                  <h3 className="mb-1.5 text-[18px]">{step.title}</h3>
                  <p className="max-w-[520px] text-[14.5px] text-bone-dim">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border border-hairline bg-ink-raised p-9">
          <Stamp variant="live">Live · Deployed</Stamp>
          <h3 className="mb-2 mt-4 text-[22px]">Ready to explore?</h3>
          <p className="mb-5 max-w-[480px] text-[14.5px] text-bone-dim">
            Start with the bridge flow to see exactly how USDC moves natively
            between Arc, Sepolia, and Base.
          </p>
          <Link
            href="/docs/bridge"
            className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass"
          >
            View the Bridge Flow →
          </Link>
        </div>
      </div>
    </>
  );
}

function DocCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block bg-ink-raised p-7 transition-colors hover:bg-ink-panel">
      <h3 className="mb-2 text-[18px] transition-colors group-hover:text-brass">{title}</h3>
      <p className="text-[13.5px] text-bone-dim">{description}</p>
      <span className="mt-4 inline-block font-mono text-xs text-brass-dim group-hover:text-brass">
        Read more →
      </span>
    </Link>
  );
}
