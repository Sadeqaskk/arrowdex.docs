import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "The Bridge Flow — Arrow DEX Documentation",
  description:
    "How Arrow DEX bridges USDC across Arc Testnet, Ethereum Sepolia, and Base Sepolia using Circle's native CCTP burn-and-mint protocol.",
};

const STEPS = [
  {
    n: "01",
    title: "Approve",
    body: "Your wallet authorizes Circle's TokenMessenger contract to spend the USDC amount you're bridging. This is a standard ERC-20 approval, scoped to the exact amount you specify.",
    code: "TokenMessenger",
  },
  {
    n: "02",
    title: "Burn",
    body: "A depositForBurn transaction destroys that USDC on the source chain and records the destination domain and recipient address on-chain.",
    code: "depositForBurn",
  },
  {
    n: "03",
    title: "Attestation",
    body: "Circle's Iris API observes the burn and, once finalized, produces a signed attestation. Arrow DEX polls this automatically — no manual step required from you.",
    code: "Iris API",
  },
  {
    n: "04",
    title: "Mint",
    body: "The attestation is submitted to the destination chain's MessageTransmitter contract, which mints the equivalent amount of native USDC directly to your wallet.",
    code: "MessageTransmitter",
  },
];

const NETWORKS = [
  { name: "Arc Testnet", chainId: "5042002", domain: "26" },
  { name: "Ethereum Sepolia", chainId: "11155111", domain: "0" },
  { name: "Base Sepolia", chainId: "84532", domain: "6" },
];

export default function BridgePage() {
  return (
    <>
      <DocsSidebar
        onThisPage={[
          { href: "#overview", label: "Overview" },
          { href: "#flow", label: "The Bridge Flow" },
          { href: "#networks", label: "Supported Networks" },
          { href: "#why-cctp", label: "Why CCTP" },
        ]}
      />
      <div className="min-w-0 flex-1">
        <Eyebrow>Bridge · Live · CCTP v1</Eyebrow>
        <h1 id="overview" className="mb-5 mt-5 text-[42px] md:text-[48px]">
          The Bridge Flow
        </h1>
        <p className="lede mb-14 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Arrow DEX moves USDC across Arc Testnet, Ethereum Sepolia, and Base
          Sepolia using Circle&rsquo;s Cross-Chain Transfer Protocol — a native
          burn-and-mint mechanism. There is no wrapped or synthetic USDC at any
          point in this flow.
        </p>

        <div id="flow" className="scroll-mt-24">
          <div className="mb-2 flex items-center gap-4">
            <Eyebrow>Four Steps, In Order</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <div>
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`grid grid-cols-[88px_1fr] gap-8 py-9 ${i < STEPS.length - 1 ? "border-b border-hairline" : ""}`}
              >
                <div className="pt-1 font-mono text-[13px] text-brass-dim">
                  {step.n}
                  {i < STEPS.length - 1 && (
                    <span className="mt-2.5 ml-1.5 block h-10 w-px bg-hairline-strong" />
                  )}
                </div>
                <div>
                  <h3 className="mb-2.5 text-[22px]">{step.title}</h3>
                  <p className="max-w-[560px] text-[15px] text-bone-dim">
                    {step.body.split(step.code).map((part, idx, arr) =>
                      idx < arr.length - 1 ? (
                        <span key={idx}>
                          {part}
                          <code className="rounded bg-verdant/10 px-[7px] py-[2px] font-mono text-[12.5px] text-verdant-bright">
                            {step.code}
                          </code>
                        </span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16 h-px bg-hairline" />

        <div id="networks" className="scroll-mt-24">
          <div className="mb-6 flex items-center gap-4">
            <Eyebrow>Supported Networks</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {NETWORKS.map((net) => (
              <div key={net.name} className="flex flex-col gap-3.5 bg-ink-raised p-7">
                <span className="font-serif text-[20px]">{net.name}</span>
                <div className="font-mono text-[12.5px] leading-[1.8] text-bone-faint">
                  Chain ID <b className="font-medium text-verdant-bright">{net.chainId}</b>
                  <br />
                  CCTP Domain <b className="font-medium text-verdant-bright">{net.domain}</b>
                </div>
                <a
                  href="#"
                  className="mt-auto flex items-center gap-1.5 border-t border-hairline pt-3.5 font-mono text-xs text-brass-dim hover:text-brass"
                >
                  View Explorer →
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16 h-px bg-hairline" />

        <div id="why-cctp" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-4">
            <Eyebrow>Why CCTP</Eyebrow>
            <span className="h-px flex-1 bg-hairline-strong" />
          </div>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-bone-dim">
            Most cross-chain bridges lock an asset on the source chain and mint
            a wrapped representation on the destination — introducing custody
            risk and a synthetic token that can de-peg from the original. CCTP
            instead burns the real USDC and mints real, native USDC on
            arrival. Your balance on the destination chain is not a claim on a
            bridge contract — it is USDC, issued by Circle, exactly as if
            you&rsquo;d acquired it there directly.
          </p>
        </div>

        <div className="mt-16 border border-hairline bg-ink-raised p-9">
          <Stamp variant="live">Live · Deployed</Stamp>
          <h3 className="mb-2 mt-4 text-[22px]">Ready to bridge?</h3>
          <p className="mb-5 max-w-[480px] text-[14.5px] text-bone-dim">
            Get free testnet USDC and gas from faucet.circle.com, then connect
            your wallet to move funds across any of the three supported
            networks.
          </p>
          <button className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass">
            Connect Wallet →
          </button>
        </div>
      </div>
    </>
  );
}
