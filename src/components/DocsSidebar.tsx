"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DOCS_LINKS = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/bridge", label: "Bridge Flow" },
  { href: "/docs/swap-pools", label: "Swap & Pools" },
  { href: "/docs/roadmap", label: "Roadmap" },
  { href: "/docs/faq", label: "FAQ" },
];

export default function DocsSidebar({
  onThisPage,
}: {
  onThisPage?: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 hidden h-fit w-[240px] shrink-0 md:block">
      {onThisPage && onThisPage.length > 0 && (
        <div className="mb-7">
          <h4 className="mb-2.5 font-mono text-[10.5px] uppercase tracking-widest text-bone-faint">
            On This Page
          </h4>
          {onThisPage.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block border-l border-hairline py-1.5 pl-3 text-[13.5px] text-bone-dim transition-colors hover:border-brass hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
      <div>
        <h4 className="mb-2.5 font-mono text-[10.5px] uppercase tracking-widest text-bone-faint">
          Documentation
        </h4>
        {DOCS_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block border-l py-1.5 pl-3 text-[13.5px] transition-colors ${
                active
                  ? "border-brass text-brass"
                  : "border-hairline text-bone-dim hover:border-brass hover:text-brass"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
