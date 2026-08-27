import Link from "next/link";
import DocsSidebar from "@/components/DocsSidebar";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

export const metadata = {
  title: "ArrowFactory — Arrow DEX Documentation",
  description:
    "ArrowFactory deploys new pools as minimal-proxy clones and auto-registers them with ArrowRouter in the same transaction — deployed and live on Arc Testnet.",
};

const SECTIONS = [
  {
    id: "one-tx",
    title: "One Transaction, Fully Live",
    body: "createPool() deploys and registers in the same call — your pool is routable through ArrowRouter the instant it's created. No waitlist, no manual wiring.",
  },
  {
    id: "clones",
    title: "Minimal-Proxy Clones",
    body: "Every pool is an EIP-1167 minimal-proxy clone of ArrowPoolImplementation — a fraction of the gas cost of a full deployment, with identical behavior to the original.",
  },
  {
    id: "custody",
    title: "No Custody Handover",
    body: "You keep control of your pool. The factory only takes over router-admin passthrough actions so new pools can self-register — it never takes custody of your liquidity.",
  },
  {
    id: "feed",
    title: "Live On-Chain Feed",
    body: "Every pool created through the factory appears in the console below in real time, sourced directly from on-chain PoolCreated events — not a cached index.",
  },
];

export default function FactoryDocsPage() {
  return (
    <>
      <DocsSidebar onThisPage={SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.title }))} />
      <div className="min-w-0 flex-1">
        <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
        <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">ArrowFactory</h1>
        <p className="lede mb-4 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
          Deploy a new pool without touching Remix. ArrowFactory creates pools
          as minimal-proxy clones of ArrowPoolImplementation and registers
          each one with ArrowRouter automatically — deployed and working
          today.
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
          <h3 className="mb-2 mt-4 text-[22px]">Contracts</h3>
          <p className="mb-2 max-w-[520px] break-all font-mono text-[13px] text-bone-faint">
            ArrowFactory: 0x04722Bc000D0257C8e7b364975b4d89c0f36a86d
          </p>
          <p className="mb-5 max-w-[520px] break-all font-mono text-[13px] text-bone-faint">
            ArrowPoolImplementation: 0x08C44A7547C3F8E6b23847C65965b437EE0D52d0
          </p>
          <Link
            href="/factory"
            className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass"
          >
            Open Factory Console →
          </Link>
        </div>
      </div>
    </>
  );
}