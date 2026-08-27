"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Magnetic from "./Magnetic";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/docs", label: "Documentation" },
  { href: "/docs/bridge", label: "Bridge" },
  { href: "/docs/swap-pools", label: "Swap & Pools" },
  { href: "/docs/router", label: "Router" },
  { href: "/docs/factory", label: "Factory" },
  { href: "/docs/roadmap", label: "Roadmap" },
];

const APP_URL = "https://arrowdex.vercel.app/";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // Sliding "magic line" indicator behind the active nav link — measures
  // the active link's actual position so it works regardless of label
  // length, and re-measures on route change / resize.
  useEffect(() => {
    function measure() {
      const activeHref = NAV_LINKS.find((l) => isActive(l.href))?.href;
      const el = activeHref ? linkRefs.current.get(activeHref) : null;
      const nav = navRef.current;
      if (!el || !nav) {
        setIndicator(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({ left: elRect.left - navRect.left, width: elRect.width });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-hairline bg-ink/90 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-ink/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-6 md:px-8">
        <Link href="/" className="group flex items-center gap-3 font-serif text-[19px]">
          <span className="relative grid h-[30px] w-[30px] place-items-center rounded-full border border-brass-dim transition-all duration-300 group-hover:border-brass group-hover:shadow-[0_0_16px_rgba(155,140,255,0.4)]">
            <Image
              src="/Arrow.png"
              alt="Arrow DEX"
              width={18}
              height={18}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </span>
          Arrow
          <span className="ml-0.5 inline-flex items-center gap-1.5 rounded border border-verdant/40 px-[7px] py-[2px] font-mono text-[10px] tracking-wide text-verdant-bright">
            <span className="h-[5px] w-[5px] rounded-full bg-verdant-bright animate-pulseGlow" />
            TESTNET
          </span>
        </Link>

        <nav ref={navRef} className="relative hidden items-center gap-9 md:flex">
          {indicator && (
            <span
              className="absolute -bottom-0.5 h-px bg-brass transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linkRefs.current.set(link.href, el);
              }}
              className={`relative py-1.5 text-sm transition-colors ${
                isActive(link.href) ? "text-brass" : "text-bone-dim hover:text-bone"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={7}>
            <Link
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-[3px] border border-brass bg-brass px-[18px] py-[10px] font-mono text-[12.5px] tracking-wide text-ink transition-colors hover:bg-transparent hover:text-brass sm:inline-flex"
            >
              Launch App
            </Link>
          </Magnetic>
          <button
            className="grid h-9 w-9 place-items-center border border-hairline-strong transition-colors hover:border-brass-dim md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
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
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${i * 40}ms` }}
              className={`block animate-fadeUp py-3 text-[15px] ${isActive(link.href) ? "text-brass" : "text-bone-dim"}`}
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