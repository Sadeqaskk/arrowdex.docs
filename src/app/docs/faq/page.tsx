import Link from "next/link";
import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "FAQ — Arrow DEX Documentation",
  description:
    "Frequently asked questions about Arrow DEX — bridging, swapping, liquidity pools, staking, and contract security.",
};

const FAQ_ITEMS = [
  {
    q: "What is Arrow DEX?",
    a: "Arrow DEX is a real, working cross-chain exchange — bridge USDC across Arc Testnet, Ethereum Sepolia, and Base Sepolia, swap USDC ⇄ EURC, provide liquidity, and stake ARROW-LP for real ARROW rewards. Every number on every page comes from an actual deployed contract, not a mock.",
  },
  {
    q: "How does bridging actually work?",
    a: "Arrow DEX uses Circle's Cross-Chain Transfer Protocol (CCTP) — a native burn-and-mint mechanism, not a wrapped-token bridge. USDC is burned on the source chain, Circle's attestation service verifies the burn, and the equivalent amount is minted natively on the destination chain. There is no synthetic or wrapped USDC at any point.",
  },
  {
    q: "Why does bridging need 4 steps?",
    a: "Approve authorizes the CCTP contract to move your USDC. Burn destroys it on the source chain and emits a message. Attestation is Circle validating that burn actually happened. Mint submits that attestation on the destination chain to release the equivalent USDC there.",
  },
  {
    q: "Is Swap live?",
    a: "Yes — real swaps between USDC and EURC through the ArrowSwap contract on Arc Testnet, priced by an on-chain constant-product formula with a 0.30% fee. cirBTC support is planned next.",
  },
  {
    q: "Are Liquidity Pools live?",
    a: "Yes — the WUSDC/ARROW pool is a real constant-product AMM. Add or remove liquidity any time; every LP token represents a real, redeemable share of the pool's reserves.",
  },
  {
    q: "Is staking/Vaults live?",
    a: "Yes — stake ARROW-LP in the ArrowVault contract to earn real ARROW rewards, streamed continuously with no lock period. Withdraw or claim whenever you want.",
  },
  {
    q: "Do I need real funds?",
    a: "No — everything runs on public testnets. Get free testnet USDC and gas from faucet.circle.com before you start.",
  },
  {
    q: "Have the contracts been audited?",
    a: "Not yet — they follow well-understood, standard patterns (Uniswap V2-style AMM, Synthetix-style staking) but are unaudited testnet code. Treat them accordingly and never point real funds at them.",
  },
];

export default function FaqPage() {
  return (
    <>
      <DocsSidebar />
      <div className="min-w-0 flex-1">
        <Eyebrow>Frequently Asked</Eyebrow>
        <h1 className="mb-10 mt-5 text-[42px] md:text-[48px]">FAQ</h1>

        <FaqAccordion items={FAQ_ITEMS} />

        <div className="mt-16 border border-hairline bg-ink-raised p-9">
          <Stamp variant="live">Live · Deployed</Stamp>
          <h3 className="mb-2 mt-4 text-[22px]">Still have questions?</h3>
          <p className="mb-5 max-w-[480px] text-[14.5px] text-bone-dim">
            Walk through the bridge mechanics in detail, or see the full swap
            and pool documentation.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/docs/bridge"
              className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass"
            >
              Bridge Flow →
            </Link>
            <Link
              href="/docs/swap-pools"
              className="inline-flex items-center gap-2 rounded-[3px] border border-hairline-strong px-6 py-3 font-mono text-[13px] text-bone-dim transition-colors hover:border-brass-dim hover:text-bone"
            >
              Swap &amp; Pools →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
