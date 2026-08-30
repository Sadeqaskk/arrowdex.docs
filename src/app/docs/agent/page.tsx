import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "Arrow Agent — Arrow DEX Documentation",
  description:
    "Arrow Agent turns plain-language requests into real, signed transactions on Arc Testnet — swap, bridge, add liquidity, stake, and check activity from one conversation.",
};

const SECTIONS = [
  {
    id: "plain-language",
    title: "Plain-Language Execution",
    body: "Type a request the way you'd say it — \"swap 10 USDC to EURC\" or \"bridge 20 USDC from Arc to Base Sepolia\" — and the agent parses intent, resolves the right contract calls, and prepares the transaction for your wallet to sign.",
  },
  {
    id: "real-tx",
    title: "Real Transactions, Not Simulations",
    body: "Every action the agent proposes is a real on-chain transaction against live Arc Testnet contracts. Nothing is mocked — approvals, hashes, and confirmations all come from the actual network state.",
  },
  {
    id: "capabilities",
    title: "Full Capability Surface",
    body: "One conversation covers swaps, cross-chain bridging via Circle CCTP, adding or removing liquidity, vault staking and withdrawals, price and chart lookups, wallet activity by date, and leaderboard standing — no need to leave the chat to switch surfaces.",
  },
  {
    id: "bridge-tracking",
    title: "Multi-Step Bridge Tracking",
    body: "Cross-chain bridges are shown as a leg-by-leg pipeline — approve, burn, attestation, mint — so a four-step CCTP flow reads as one continuous action instead of four separate transactions to track manually.",
  },
  {
    id: "wallet-scoped",
    title: "Wallet-Scoped Sessions",
    body: "The agent only acts on the wallet connected for that session and only within the permissions shown in the Agent Engine panel. You approve every transaction in your own wallet before it's sent — the agent proposes, it never signs on your behalf.",
  },
];

export default function AgentDocsPage() {
  return (
    <>
      <DocsSidebar onThisPage={SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">Arrow Agent</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          One line in, the right transaction out. Arrow Agent reads your
          connected wallet and executes swaps, bridges, liquidity moves, and
          vault actions directly from a conversation — no manual form-filling
          required.
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
      </div>
    </>
  );
}