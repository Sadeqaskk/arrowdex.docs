"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/docs", label: "Documentation" },
  { href: "/docs/bridge", label: "Bridge" },
  { href: "/docs/swap-pools", label: "Swap & Pools" },
  { href: "/docs/roadmap", label: "Roadmap" },
];

const APP_URL = "https://arrowdex.vercel.app/";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-3 font-serif text-[19px]">
          <span className="relative grid h-[30px] w-[30px] place-items-center rounded-full border border-brass-dim">
            <Image
              src="/Arrow.png"
              alt="Arrow DEX"
              width={18}
              height={18}
              className="object-contain"
              priority
            />
          </span>
          Arrow
          <span className="ml-0.5 rounded border border-verdant/40 px-[7px] py-[2px] font-mono text-[10px] tracking-wide text-verdant-bright">
            TESTNET
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1.5 text-sm transition-colors ${
                isActive(link.href) ? "text-brass" : "text-bone-dim hover:text-bone"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brass" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-[3px] border border-brass bg-brass px-[18px] py-[10px] font-mono text-[12.5px] tracking-wide text-ink transition-colors hover:bg-transparent hover:text-brass sm:inline-flex"
          >
            Launch App
          </Link>
          <button
            className="grid h-9 w-9 place-items-center border border-hairline-strong md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-bone transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-4 bg-bone transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-4 bg-bone transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-hairline bg-ink px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-[15px] ${isActive(link.href) ? "text-brass" : "text-bone-dim"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 block w-full rounded-[3px] border border-brass bg-brass py-3 text-center font-mono text-[12.5px] text-ink"
          >
            Launch App
          </Link>
        </nav>
      )}
    </header>
  );
}