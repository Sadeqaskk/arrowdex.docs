import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline py-14">
      <div className="mx-auto max-w-container px-6 md:px-8">
        <div className="flex flex-wrap justify-between gap-10">
          <div>
            <Link href="/" className="flex items-center gap-3 font-serif text-[19px]">
              <span className="relative grid h-[30px] w-[30px] place-items-center rounded-full border border-brass-dim">
                <Image
                  src="/Arrow.png"
                  alt="Arrow DEX"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </span>
              Arrow
            </Link>
            <p className="mt-4 max-w-[280px] text-[13.5px] text-bone-dim">
              A real cross-chain exchange on Arc Testnet. Unaudited testnet code —
              never point real funds at it.
            </p>
          </div>

          <div className="flex flex-wrap gap-14 md:gap-16">
            <FooterCol
              title="Documentation"
              links={[
                { href: "/docs", label: "Overview" },
                { href: "/docs/bridge", label: "Bridge Flow" },
                { href: "/docs/swap-pools", label: "Swap & Pools" },
                { href: "/docs/roadmap", label: "Roadmap" },
                { href: "/docs/faq", label: "FAQ" },
              ]}
            />
            <FooterCol
              title="Networks"
              links={[
                { href: "https://x.com/ArrowDEX0", label: "Official Arrow DEX X" },
                { href: "https://testnet.arcscan.app/", label: "Arc Explorer" },
                { href: "https://sepolia.etherscan.io", label: "Sepolia Explorer" },
                { href: "https://base-sepolia.etherscan.io", label: "Base Sepolia Explorer" },
              ]}
            />
            <FooterCol
              title="Resources"
              links={[
                { href: "https://developers.circle.com/stablecoins/docs/cctp-getting-started", label: "Circle CCTP Docs" },
                { href: "https://faucet.circle.com", label: "faucet.circle.com" },
                { href: "https://github.com/Sadeqaskk/ArrowDEX", label: "Contract Source" },
              ]}
            />
            <FooterCol
              title="Community"
              links={[
                { href: "https://x.com/0xsadik0", label: "Follow on X" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-hairline pt-6 font-mono text-xs text-bone-faint">
          <span>© 2026 Arrow DEX — Testnet Software, Unaudited</span>
          <span>Every figure on this site reflects live contract state</span>
           <a         
            href="https://x.com/0xsadik0"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-brass"
          >
            Built by @0xsadik0
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-bone-faint">
        {title}
      </h4>
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <Link
            key={link.label}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="block py-1.5 text-sm text-bone-dim transition-colors hover:text-brass"
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}