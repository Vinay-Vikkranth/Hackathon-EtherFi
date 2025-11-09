"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { formatEther } from "viem";
import { Wallet, LogOut, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address: address,
  });
  const [copied, setCopied] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null);

  // Check for MetaMask only on client side to avoid hydration errors
  useEffect(() => {
    setHasMetaMask(
      typeof window !== "undefined" && typeof window.ethereum !== "undefined"
    );
  }, []);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isConnected && address) {
    return (
      <div className="bg-[#2a2a2a] p-4 rounded-lg border border-[#3a3a3a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#a0a0a0] font-medium">
                Wallet Connected
              </p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono font-medium text-white">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
                <button
                  onClick={copyAddress}
                  className="text-[#6b6b6b] hover:text-white transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {balance && (
                <p className="text-xs text-[#a0a0a0] mt-1">
                  {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                </p>
              )}
              {balanceLoading && (
                <p className="text-xs text-[#6b6b6b] mt-1">
                  Loading balance...
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              disconnect();
              toast.success("Wallet disconnected");
            }}
            className="px-4 py-2 bg-[#3a3a3a] text-white rounded-lg hover:bg-[#4a4a4a] transition-colors flex items-center gap-2 text-sm font-medium border border-[#4a4a4a]"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-lg border border-[#3a3a3a]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white font-medium mb-1">
            Connect your wallet
          </p>
          <p className="text-xs text-[#a0a0a0]">
            Connect MetaMask to view your balance
          </p>
        </div>
        <button
          onClick={async () => {
            try {
              // Try MetaMask connector first, then fallback to injected
              const metaMaskConnector = connectors.find(
                (c) => c.id === "metaMask" || c.name === "MetaMask"
              );
              const connectorToUse = metaMaskConnector || connectors[0];
              if (connectorToUse) {
                await connect({ connector: connectorToUse });
                toast.success("Wallet connected successfully!");
              }
            } catch (error) {
              console.error("Failed to connect wallet:", error);
              toast.error("Failed to connect wallet. Please try again.");
              // Try fallback connection
              if (connectors.length > 0 && connectors[0]) {
                try {
                  await connect({ connector: connectors[0] });
                  toast.success("Wallet connected successfully!");
                } catch (fallbackError) {
                  console.error("Fallback connection failed:", fallbackError);
                }
              }
            }
          }}
          disabled={isPending || connectors.length === 0}
          className="px-6 py-2 bg-[#d4af37] text-[#1a1a1a] rounded-lg hover:bg-[#b8941f] transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wallet className="w-4 h-4" />
          {isPending ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
      {hasMetaMask === false && (
        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-[#f59e0b] font-medium mb-1">
            ⚠️ MetaMask Not Detected
          </p>
          <p className="text-xs text-[#a0a0a0] mb-2">
            To connect your wallet, please install the MetaMask browser
            extension.
          </p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#d4af37] hover:underline inline-flex items-center gap-1"
          >
            Download MetaMask →
          </a>
        </div>
      )}
      {hasMetaMask === true && connectors.length === 0 && (
        <p className="text-xs text-yellow-400 mt-2">
          MetaMask detected but connector not available. Please refresh the
          page.
        </p>
      )}
    </div>
  );
}
