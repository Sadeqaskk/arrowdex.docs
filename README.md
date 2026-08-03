# Arrow DEX

A cross-chain exchange, verifiably real. Marketing site + documentation, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Running it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/
    layout.tsx              → root layout, fonts, <Header>/<Footer>
    page.tsx                → marketing landing page (/)
    globals.css             → design tokens, base styles
    docs/
      layout.tsx             → docs shell (sidebar + content)
      page.tsx                → docs overview (/docs)
      bridge/page.tsx         → bridge flow (/docs/bridge)
      swap-pools/page.tsx     → swap & pools (/docs/swap-pools)
      roadmap/page.tsx        → roadmap (/docs/roadmap)
      faq/page.tsx             → FAQ (/docs/faq)
  components/
    Header.tsx, Footer.tsx, Stamp.tsx, StatCounter.tsx, DocsSidebar.tsx, ...
```

## Design system

"The Ledger" — a precision-instrument aesthetic, not a casino. Near-black base (`#0A0B0D`), bone-white text, aged-brass accent reserved for verified/live markers, deep verdant for chain data. Fraunces for display type, Inter for body, JetBrains Mono for anything factual (chain IDs, fees, contract names).

The signature element is the **Stamp** component — a `live` / `roadmap` badge that runs through every page, making "what's actually deployed" a first-class part of the visual system rather than a footnote.
