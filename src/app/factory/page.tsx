"use client";

import { useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { injected } from "wagmi/connectors";
import Eyebrow from "@/components/Eyebrow";
import Stamp from "@/components/Stamp";

const FACTORY_ADDRESS = "0x04722Bc000D0257C8e7b364975b4d89c0f36a86d";

const FACTORY_ABI = [
  {
    type: "function",
    name: "createPool",
    stateMutability: "nonpayable",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
    ],
    outputs: [{ name: "pool", type: "address" }],
  },
  {
    type: "function",
    name: "predictPoolAddress",
    stateMutability: "view",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
    ],
    outputs: [{ name: "predicted", type: "address" }],
  },
  {
    type: "function",
    name: "getPool",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    outputs: [{ name: "", type: "address" }],
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
    name: "implementation",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "router",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "event",
    name: "PoolCreated",
    inputs: [
      { name: "pool", type: "address", indexed: true },
      { name: "tokenA", type: "address", indexed: true },
      { name: "tokenB", type: "address", indexed: true },
      { name: "poolIndex", type: "uint256", indexed: false },
    ],
  },
] as const;

type PoolEvent = { pool: string; tokenA: string; tokenB: string; poolIndex: string; txHash: string };

function isValidAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export default function FactoryConsolePage() {
  const { address, isConnected } = useAccount();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const write = useWriteContract();

  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [pools, setPools] = useState<PoolEvent[]>([]);

  const validTokens =
    isValidAddress(tokenA) && isValidAddress(tokenB) && tokenA.toLowerCase() !== tokenB.toLowerCase();
  const canPredict = validTokens;
  const canCreate = validTokens && name.trim().length > 0 && symbol.trim().length > 0;

  const { data: owner } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "owner",
  });

  const isOwner = !!address && !!owner && address.toLowerCase() === (owner as string).toLowerCase();

  const { data: poolCount } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "poolCount",
  });

  const { data: existingPool } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "getPool",
    args: canPredict ? [tokenA as `0x${string}`, tokenB as `0x${string}`] : undefined,
    query: { enabled: canPredict },
  });

  const pairAlreadyExists =
    existingPool && existingPool !== "0x0000000000000000000000000000000000000000";

  const { data: predictedAddress } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "predictPoolAddress",
    args: canPredict ? [tokenA as `0x${string}`, tokenB as `0x${string}`] : undefined,
    query: { enabled: canPredict && !pairAlreadyExists },
  });

  // Live on-chain feed — straight from the event log, no polling/cache
  useWatchContractEvent({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    eventName: "PoolCreated",
    onLogs(logs) {
      const next = logs.map((log: any) => ({
        pool: log.args.pool,
        tokenA: log.args.tokenA,
        tokenB: log.args.tokenB,
        poolIndex: log.args.poolIndex?.toString() ?? "",
        txHash: log.transactionHash,
      }));
      setPools((prev) => [...next, ...prev]);
    },
  });

  function handleCreatePool() {
    if (!canCreate) return;
    write.mutate({
      address: FACTORY_ADDRESS,
      abi: FACTORY_ABI,
      functionName: "createPool",
      args: [tokenA as `0x${string}`, tokenB as `0x${string}`, name.trim(), symbol.trim()],
    });
  }

  return (
    <div className="mx-auto max-w-container px-6 py-16 md:px-8">
      <Eyebrow>Core Infrastructure · Live on Arc Testnet</Eyebrow>
      <h1 className="mb-5 mt-5 text-[42px] md:text-[48px]">Factory Console</h1>
      <p className="lede mb-10 max-w-[620px] text-[17px] leading-relaxed text-bone-dim">
        Deploy a pool as a gas-efficient minimal-proxy clone. It auto-registers with ArrowRouter in the same transaction.
      </p>

      <div className="border border-hairline bg-ink-raised p-9">
        <Stamp variant="live">
          {poolCount !== undefined ? `${poolCount.toString()} pools deployed` : "Loading…"}
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

            {!isOwner && (
              <div className="border border-dashed border-hairline-strong bg-ink px-4 py-3 font-mono text-[12px] text-bone-faint">
                Pool creation is restricted to the factory owner. You can still preview a pair address below, but
                deploying requires the owner wallet.
                {owner ? <> Owner: {owner as string}</> : null}
              </div>
            )}

            <input
              value={tokenA}
              onChange={(e) => setTokenA(e.target.value.trim())}
              placeholder="Token A address (0x...)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />
            <input
              value={tokenB}
              onChange={(e) => setTokenB(e.target.value.trim())}
              placeholder="Token B address (0x...)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="LP token name (e.g. Arrow WUSDC/ARROW)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="LP token symbol (e.g. ARROW-LP)"
              className="w-full max-w-[520px] border border-hairline-strong bg-ink px-4 py-3 font-mono text-[13px] text-bone outline-none focus:border-brass-dim"
            />

            {canPredict && (
              <div className="space-y-1 border-t border-dashed border-hairline-strong pt-4 font-mono text-[12.5px]">
                {pairAlreadyExists ? (
                  <p className="text-brass-dim">
                    Pool already exists for this pair: {existingPool as string}
                  </p>
                ) : predictedAddress ? (
                  <p className="text-verdant-bright">Predicted pool address: {predictedAddress as string}</p>
                ) : (
                  <p className="text-bone-faint">Calculating predicted address…</p>
                )}
              </div>
            )}

            <button
              onClick={handleCreatePool}
              disabled={write.isPending || !canCreate || !isOwner || !!pairAlreadyExists}
              className="inline-flex items-center gap-2 rounded-[3px] border border-brass bg-brass px-6 py-3 font-mono text-[13px] text-ink transition-colors hover:bg-transparent hover:text-brass disabled:opacity-40"
            >
              {write.isPending ? "Deploying…" : "Create Pool"}
            </button>

            {write.isSuccess && (
              <p className="font-mono text-[12px] text-verdant-bright">
                Pool deployed: {write.data}
              </p>
            )}
            {write.isError && (
              <p className="font-mono text-[12px] text-rust">
                {write.error?.message ?? "Pool creation failed."}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 border border-hairline bg-ink-raised p-9">
        <h3 className="mb-5 text-[22px]">Live Pool Feed</h3>
        {pools.length === 0 ? (
          <p className="text-[14.5px] text-bone-dim">
            No pools created yet this session — deploy one above, or wait for on-chain activity.
          </p>
        ) : (
          <div className="space-y-3">
            {pools.map((p, i) => (
              <div key={i} className="border-b border-dashed border-hairline-strong pb-3 font-mono text-[12.5px] text-bone-faint">
                <p>Pool: {p.pool}</p>
                <p>Pair: {p.tokenA} / {p.tokenB}</p>
                <a
                  href={`https://testnet.arcscan.app/tx/${p.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass-dim underline underline-offset-2 hover:text-brass"
                >
                  View transaction →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}