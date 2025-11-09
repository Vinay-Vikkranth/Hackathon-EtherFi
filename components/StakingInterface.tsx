"use client";

import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { useLearning } from "@/contexts/LearningContext";
import { ethers } from "ethers";
import InfoBox from "@/components/InfoBox";
import WrapTutorialOverlay from "@/components/WrapTutorialOverlay";
import LiveRewardsCounter from "@/components/LiveRewardsCounter";
import TerminologyCard from "@/components/TerminologyCard";
import { Fuel } from "lucide-react";

interface GasEstimates {
  success: boolean;
  estimates: {
    stake: { eth: number; usd: number; gwei: number };
    unstake: { eth: number; usd: number; gwei: number };
    wrap: { eth: number; usd: number; gwei: number };
    claim: { eth: number; usd: number; gwei: number };
  };
}

export default function StakingInterface() {
  const { account, contracts, provider } = useWeb3();
  const { earnBadge } = useLearning();
  const [activeMode, setActiveMode] = useState<"stake" | "wrap">("stake");
  const [stakeAmount, setStakeAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [eethBalance, setEethBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showWrapTutorial, setShowWrapTutorial] = useState(false);
  const [gasEstimates, setGasEstimates] = useState<GasEstimates | null>(null);

  useEffect(() => {
    if (account && provider) {
      loadBalances();
    }
  }, [account, provider, contracts]);

  useEffect(() => {
    fetchGasEstimates();
    const interval = setInterval(fetchGasEstimates, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchGasEstimates = async () => {
    try {
      const response = await fetch("/api/defi/gas-prices");
      if (response.ok) {
        const data = await response.json();
        setGasEstimates(data);
      }
    } catch (error) {
      console.error("Error fetching gas estimates:", error);
    }
  };

  const loadBalances = async () => {
    if (!account || !provider || !contracts.eeth) return;

    try {
      const ethBal = await provider.getBalance(account);
      const eethBal = await contracts.eeth.balanceOf(account);

      setEthBalance(ethers.formatEther(ethBal));
      setEethBalance(ethers.formatEther(eethBal));
    } catch (error) {
      console.error("Error loading balances:", error);
    }
  };

  const handleStake = async () => {
    if (!contracts.eeth || !stakeAmount) return;

    setIsLoading(true);
    try {
      const tx = await contracts.eeth.stake({
        value: ethers.parseEther(stakeAmount),
      });
      await tx.wait();

      await loadBalances();
      setStakeAmount("");
      setReceiveAmount("");
      alert(
        "✅ Staking successful! Check your Portfolio to see your eETH balance."
      );

      // Earn badge
      earnBadge("first_stake");
    } catch (error: any) {
      console.error("Staking error:", error);
      alert("❌ Staking failed: " + (error.reason || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!contracts.eeth || !stakeAmount) return;

    setIsLoading(true);
    try {
      const tx = await contracts.eeth.unstake(ethers.parseEther(stakeAmount));
      await tx.wait();

      await loadBalances();
      setStakeAmount("");
      setReceiveAmount("");
      alert("✅ Unstaking successful! Your ETH has been returned.");
    } catch (error: any) {
      console.error("Unstaking error:", error);
      alert("❌ Unstaking failed: " + (error.reason || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleWrap = async () => {
    if (!contracts.weeth || !contracts.eeth || !stakeAmount) return;

    setIsLoading(true);
    try {
      // Approve weETH contract to spend eETH
      const approveTx = await contracts.eeth.approve(
        await contracts.weeth.getAddress(),
        ethers.parseEther(stakeAmount)
      );
      await approveTx.wait();

      // Wrap eETH
      const tx = await contracts.weeth.wrap(ethers.parseEther(stakeAmount));
      await tx.wait();

      await loadBalances();
      setStakeAmount("");
      setReceiveAmount("");
      alert("✅ Wrapping successful! You now have weETH.");
    } catch (error: any) {
      console.error("Wrapping error:", error);
      alert("❌ Wrapping failed: " + (error.reason || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (value: string) => {
    setStakeAmount(value);
    setReceiveAmount(value); // 1:1 for demo
  };

  const setMaxAmount = () => {
    if (activeMode === "stake") {
      // Leave a bit for gas
      const maxEth = Math.max(0, parseFloat(ethBalance) - 0.01);
      handleAmountChange(maxEth.toString());
    } else {
      handleAmountChange(eethBalance);
    }
  };

  if (!account) {
    return (
      <div className="gradient-card rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-primary-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400">
          Please connect your wallet to start staking
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showInfo && (
        <div className="tutorial-welcome">
          <InfoBox
            title="💡 How Staking Works"
            onClose={() => setShowInfo(false)}
          >
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Stake:</strong> Lock your ETH and receive eETH tokens
                (1:1 ratio)
              </li>
              <li>
                <strong>eETH tokens:</strong> Represent your staked ETH + earn
                3.5% APR automatically
              </li>
              <li>
                <strong>Use eETH:</strong> Trade, provide liquidity, or wrap to
                weETH while still earning rewards
              </li>
              <li>
                <strong>Unstake:</strong> Burn eETH anytime to get your ETH back
                plus accumulated rewards
              </li>
            </ul>
          </InfoBox>
        </div>
      )}

      {/* Stake/Wrap Toggle */}
      <div className="flex gap-2 bg-dark-700 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveMode("stake")}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeMode === "stake"
              ? "bg-primary-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Stake
        </button>
        <button
          onClick={() => {
            setActiveMode("wrap");
            // Check if user has seen wrap tutorial
            const hasSeenWrapTutorial = localStorage.getItem(
              "hasSeenWrapTutorial"
            );
            if (!hasSeenWrapTutorial) {
              setTimeout(() => setShowWrapTutorial(true), 500);
            }
          }}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeMode === "wrap"
              ? "bg-primary-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Wrap
        </button>
      </div>

      {/* Main Staking Card */}
      <div className="gradient-card rounded-2xl p-8 shadow-xl shadow-purple-900/20">
        <h2 className="text-2xl font-bold mb-6">
          {activeMode === "stake" ? "Stake" : "Wrap"}
        </h2>

        {/* Input Section */}
        <div className="space-y-4">
          {/* Stake/Input Amount */}
          <div className="bg-dark-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-400">
                {activeMode === "stake" ? "Stake" : "You wrap"}
              </label>
              <span className="text-sm text-gray-400 tutorial-balance">
                Balance:{" "}
                {parseFloat(
                  activeMode === "stake" ? ethBalance : eethBalance
                ).toFixed(4)}{" "}
                {activeMode === "stake" ? "ETH" : "eETH"}
              </span>
            </div>
            <div className="flex items-center justify-between tutorial-amount-input">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="flex-1 bg-transparent text-3xl font-semibold outline-none"
                step="0.01"
              />
              <button
                onClick={setMaxAmount}
                className="px-4 py-2 bg-primary-600 bg-opacity-20 text-primary-400 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-all tutorial-max-button"
              >
                MAX
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              ${(parseFloat(stakeAmount || "0") * 1939.4).toFixed(2)}
            </div>
          </div>

          {/* Exchange Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          {/* Receive Amount */}
          <div className="bg-dark-700 rounded-xl p-4 tutorial-receive">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Receive</label>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={receiveAmount}
                readOnly
                placeholder="0"
                className="flex-1 bg-transparent text-3xl font-semibold outline-none"
              />
            </div>
            <div className="text-sm text-gray-500 mt-2">
              ${(parseFloat(receiveAmount || "0") * 1939.4).toFixed(2)}
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="font-medium">
              1 {activeMode === "stake" ? "ETH" : "eETH"} = 1{" "}
              {activeMode === "stake" ? "eETH" : "weETH"}
            </span>
          </div>

          {/* Stake Button */}
          <button
            onClick={activeMode === "stake" ? handleStake : handleWrap}
            disabled={isLoading || !stakeAmount || parseFloat(stakeAmount) <= 0}
            className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70 tutorial-stake-button"
          >
            <div className="flex items-center justify-center gap-2">
              <span>
                {isLoading
                  ? "Processing..."
                  : activeMode === "stake"
                  ? "Stake"
                  : "Wrap"}
              </span>
              {gasEstimates && gasEstimates.estimates && !isLoading && (
                <span className="flex items-center gap-1 text-xs opacity-80 bg-white/10 px-2 py-1 rounded-full">
                  <Fuel className="w-3 h-3" />
                  ~$
                  {activeMode === "stake"
                    ? gasEstimates.estimates.stake.usd.toFixed(2)
                    : gasEstimates.estimates.wrap.usd.toFixed(2)}
                </span>
              )}
            </div>
          </button>

          {activeMode === "stake" && (
            <button
              onClick={handleUnstake}
              disabled={
                isLoading || !stakeAmount || parseFloat(stakeAmount) <= 0
              }
              className="w-full bg-dark-700 hover:bg-dark-600 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed tutorial-unstake-button"
            >
              <div className="flex items-center justify-center gap-2">
                <span>{isLoading ? "Processing..." : "Unstake"}</span>
                {gasEstimates && gasEstimates.estimates && !isLoading && (
                  <span className="flex items-center gap-1 text-xs opacity-70 bg-white/5 px-2 py-1 rounded-full">
                    <Fuel className="w-3 h-3" />
                    ~${gasEstimates.estimates.unstake.usd.toFixed(2)}
                  </span>
                )}
              </div>
            </button>
          )}
        </div>

        {/* Staking Rewards Info */}
        {activeMode === "stake" && parseFloat(stakeAmount || "0") > 0 && (
          <div className="mt-6 space-y-4">
            <LiveRewardsCounter
              stakedAmount={parseFloat(stakeAmount || "0")}
              apr={3.5}
            />
          </div>
        )}

        {activeMode === "stake" && (
          <div className="mt-6 p-4 bg-primary-900 bg-opacity-20 border border-primary-600 rounded-xl tutorial-rewards">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">💎</span>
              STAKING REWARDS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-primary-400">3.5%</div>
                <div className="text-xs text-gray-400">APR %</div>
              </div>
              <div>
                <div className="text-2xl font-bold">TBD</div>
                <div className="text-xs text-gray-400">Restaking APR %</div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Cards */}
        <div className="mt-6 space-y-4">
          <TerminologyCard
            title="What is Liquid Staking?"
            simpleContent="When you stake ETH normally, it gets locked up. Liquid staking gives you eETH tokens instead - so you can use them while still earning rewards! It's like having your cake and eating it too."
            proContent="Liquid staking enables capital efficiency by issuing derivative tokens (eETH) representing your staked ETH position. These tokens maintain a 1:1 peg with staked ETH while accruing staking rewards, allowing simultaneous participation in DeFi protocols without sacrificing staking yield."
          />

          <TerminologyCard
            title="Understanding APR vs APY"
            simpleContent="APR shows how much you earn in a year without compounding. Think of it like simple interest - if you have 10 ETH at 3.5% APR, you'll earn 0.35 ETH per year."
            proContent="APR (Annual Percentage Rate) represents simple interest on your staked assets. APY (Annual Percentage Yield) includes compound interest. With automatic restaking, effective yields approach APY calculations as rewards are continuously reinvested into the validator pool."
          />
        </div>
      </div>

      {/* Wrap Tutorial Overlay */}
      {showWrapTutorial && (
        <WrapTutorialOverlay
          onComplete={() => {
            setShowWrapTutorial(false);
            localStorage.setItem("hasSeenWrapTutorial", "true");
          }}
        />
      )}
    </div>
  );
}
