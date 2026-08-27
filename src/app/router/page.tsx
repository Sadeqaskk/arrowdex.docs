"use client";

import { useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from "wagmi";
import { injected } from "wagmi/connectors";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

const ROUTER_ADDRESS = "0x94D72FdDC5A6bF52968797699dAce54812934765";

const ROUTER_ABI = [
  {
    type: "function",
    name: "getBestPath",
    stateMutability: "view",
    inputs: [
      { name: "tokenIn", type: "address" },
      { name: "tokenOut", type: "address" },
      { name: "amountIn", type: "uint256" },
    ],
    outputs: [
      { name: "path", type: "address[]" },
      { name: "pools", type: "address[]" },
      { name: "amountOut", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getPriceImpactBps",
    stateMutability: "view",
    inputs: [
      { name: "tokenIn", type: "address" },
      { name: "tokenOut", type: "address" },
      { name: "amountIn", type: "uint256" },
    ],
    outputs: [{ name: "impactBps", type: "uint256" }],
  },
  {
    type: "function",
    name: "swapExactTokensForTokens",
    stateMutability: "nonpayable",
    inputs: [
      { name: "tokenIn", type: "address" },
      { name: "tokenOut", type: "address" },
      { name: "amountIn", type: "uint256" },
      { name: "minAmountOut", type: "uint256" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amountOut", type: "uint256" }],
  },
  {
    type: "function",
    name: "poolCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "tokenCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

const SLIPPAGE_BPS = 100n; // 1% default slippage tolerance
const DEADLINE_MINUTES = 20;

// Only digits and at most one decimal point — never lets a bad string reach BigInt()
function sanitizeAmount(raw: string) {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  return parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
}

// Converts a human-typed decimal string into raw uint256 wei, given decimals.
// Returns null if the string isn't a valid positive number yet.
function toWei(amount: string, decimals = 18): bigint | null {
  if (!amount || amount === ".") return null;
  const [whole, frac = ""] = amount.split(".");
  if (!/^\d*$/.test(whole) || !/^\d*$/.test(frac)) return null;
  const paddedFrac = (frac + "0".repeat(decimals)).slice(0, decimals);
  const combined = `${whole || "0"}${paddedFrac}`;
  try {
    const value = BigInt(combined || "0");
    return value;
  } catch {
    return null;
  }
}

function isValidAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export default function RouterConsolePage() {
  const { address, isConnected } = useAccount();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const write = useWriteContract();

  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");

  const amountInWei = useMemo(() => toWei(amountIn), [amountIn]);
  const validTokens = isValidAddress(tokenIn) && isValidAddress(tokenOut) && tokenIn.toLowerCase() !== tokenOut.toLowerCase();
  const canQuote = validTokens && amountInWei !== null && amountInWei > 0n;

  const { data: poolCount } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "poolCount",
  });

  const { data: bestPath, isFetching: quoting } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "getBestPath",
    args: canQuote ? [tokenIn as `0x${string}`, tokenOut as `0x${string}`, amountInWei!] : undefined,
    query: { enabled: canQuote },
  });

  const { data: priceImpact } = useReadContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    functionName: "getPriceImpactBps",
    args: canQuote ? [tokenIn as `0x${string}`, tokenOut as `0x${string}`, amountInWei!] : undefined,
    query: { enabled: canQuote },
  });

  const [path, , quotedAmountOut] = bestPath ?? [[], [], undefined];
  const hasRoute = path && path.length >= 2;

  function handleSwap() {
    if (!address || !amountInWei || !hasRoute || quotedAmountOut === undefined) return;

    const minAmountOut = (quotedAmountOut * (10_000n - SLIPPAGE_BPS)) / 10_000n;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + DEADLINE_MINUTES * 60);

    write.mutate({
      address: ROUTER_ADDRESS,
      abi: ROUTER_ABI,
      functionName: "swapExactTokensForTokens",
      args: [tokenIn as `0x${string}`, tokenOut as `0x${string}`, amountInWei, minAmountOut, address, deadline],
    });
  }

  return (
    <div className="mx-auto max-w-container px-6 py-16 md:px-8">
      <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
      <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">Router Console</h1>
      <p className="lede mb-10 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
        Swap through ArrowRouter with graph-based multi-hop pathfinding across every registered pool.
      </p>

      <div className="border border-hairline bg-ink-raised p-9">
        <Stamp variant="live">
          {poolCount !== undefined ? `${poolCount.toString()} pools registered` : "Loading…"}
        </Stamp>

        {!isConnected ? (
          <button
            onClick={() => connect.mutate({ connector: injected() })}
            disabled={connect.isPending}
            className="mt-5 inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass disabled:opacity-40"
          >
            {connect.isPending ? "Connecting…" : "Connect Wallet"}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[12px] text-bone-faint">Connected: {address}</p>
              <button
                onClick={() => disconnect.disconnect()}
                className="font-mono text-[11px] text-bone-faint underline underline-offset-2 hover:text-brass"
              >
                Disconnect
              </button>
            </div>

            <input
              value={tokenIn}
              onChange={(e) => setTokenIn(e.target.value.trim())}
              placeholder="Token In address (0x...)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />
            <input
              value={tokenOut}
              onChange={(e) => setTokenOut(e.target.value.trim())}
              placeholder="Token Out address (0x...)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />
            <input
              value={amountIn}
              onChange={(e) => setAmountIn(sanitizeAmount(e.target.value))}
              inputMode="decimal"
              placeholder="Amount In (e.g. 1.5)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />

            {canQuote && (
              <div className="space-y-1 border-t border-dashed border-hairline-strong pt-4 font-mono text-[12.5px]">
                {quoting ? (
                  <p className="text-bone-faint">Finding best route…</p>
                ) : hasRoute ? (
                  <>
                    <p className="text-verdant-bright">
                      Estimated out: {quotedAmountOut?.toString()} ({path.length - 1} hop{path.length - 1 > 1 ? "s" : ""})
                    </p>
                    {priceImpact !== undefined && (
                      <p className="text-bone-faint">
                        Price impact: {(Number(priceImpact) / 100).toFixed(2)}%
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-rust">No route found for this pair.</p>
                )}
              </div>
            )}

            <button
              onClick={handleSwap}
              disabled={write.isPending || !canQuote || !hasRoute}
              className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass disabled:opacity-40"
            >
              {write.isPending ? "Swapping…" : "Swap"}
            </button>

            {write.isSuccess && (
              <p className="font-mono text-[12px] text-verdant-bright">
                Swap submitted: {write.data}
              </p>
            )}
            {write.isError && (
              <p className="font-mono text-[12px] text-rust">
                {write.error?.message ?? "Swap failed."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}