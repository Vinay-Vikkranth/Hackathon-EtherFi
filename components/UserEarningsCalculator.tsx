"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Calendar, Clock } from "lucide-react";

interface UserEarningsCalculatorProps {
  stakedAmount: number;
  currentAPY: number;
  ethPrice: number;
}

export default function UserEarningsCalculator({
  stakedAmount,
  currentAPY,
  ethPrice,
}: UserEarningsCalculatorProps) {
  const [liveEarnings, setLiveEarnings] = useState(0);
  const [displayMode, setDisplayMode] = useState<"eth" | "usd">("usd");

  // Calculate earnings
  const yearlyRewardsETH = (stakedAmount * currentAPY) / 100;
  const monthlyRewardsETH = yearlyRewardsETH / 12;
  const dailyRewardsETH = yearlyRewardsETH / 365;
  const hourlyRewardsETH = dailyRewardsETH / 24;
  const perSecondRewardsETH = yearlyRewardsETH / (365 * 24 * 60 * 60);

  // USD values
  const yearlyRewardsUSD = yearlyRewardsETH * ethPrice;
  const monthlyRewardsUSD = monthlyRewardsETH * ethPrice;
  const dailyRewardsUSD = dailyRewardsETH * ethPrice;
  const hourlyRewardsUSD = hourlyRewardsETH * ethPrice;

  // Live counter - accumulates earnings in real-time
  useEffect(() => {
    if (stakedAmount === 0) {
      setLiveEarnings(0);
      return;
    }

    const interval = setInterval(() => {
      setLiveEarnings((prev) => prev + perSecondRewardsETH);
    }, 1000);

    return () => clearInterval(interval);
  }, [stakedAmount, perSecondRewardsETH]);

  // Reset counter if staked amount changes
  useEffect(() => {
    setLiveEarnings(0);
  }, [stakedAmount]);

  const formatETH = (value: number): string => {
    if (value < 0.000001) return value.toExponential(4) + " ETH";
    if (value < 0.01) return value.toFixed(6) + " ETH";
    return value.toFixed(4) + " ETH";
  };

  const formatUSD = (value: number): string => {
    if (value < 0.01) return "$" + value.toFixed(4);
    if (value < 1) return "$" + value.toFixed(2);
    return (
      "$" +
      value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  if (stakedAmount === 0) {
    return (
      <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-indigo-500/30 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Start Earning Rewards
          </h3>
          <p className="text-gray-400">
            Stake ETH to see your real-time earnings calculator
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-indigo-500/30 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
            Your Earnings Calculator
          </h3>
          <p className="text-gray-400 text-sm">
            Based on {stakedAmount.toFixed(4)} ETH staked at{" "}
            {currentAPY.toFixed(2)}% APY
          </p>
        </div>

        {/* Display Mode Toggle */}
        <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg">
          <button
            onClick={() => setDisplayMode("eth")}
            className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
              displayMode === "eth"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ETH
          </button>
          <button
            onClick={() => setDisplayMode("usd")}
            className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
              displayMode === "usd"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            USD
          </button>
        </div>
      </div>

      {/* Live Earnings Counter */}
      <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 mb-6 border border-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Earning Live (Since Page Load)
            </p>
            <div className="text-3xl font-bold text-green-400">
              {displayMode === "eth"
                ? formatETH(liveEarnings)
                : formatUSD(liveEarnings * ethPrice)}
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Updates every second • {formatETH(perSecondRewardsETH)}/sec
            </p>
          </div>
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Earnings */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <p className="text-gray-400 text-sm">Per Day</p>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {displayMode === "eth"
              ? formatETH(dailyRewardsETH)
              : formatUSD(dailyRewardsUSD)}
          </div>
          <p className="text-xs text-gray-500">
            {displayMode === "eth"
              ? `≈ ${formatUSD(dailyRewardsUSD)}`
              : `≈ ${formatETH(dailyRewardsETH)}`}
          </p>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <p className="text-gray-400 text-sm">Per Month</p>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {displayMode === "eth"
              ? formatETH(monthlyRewardsETH)
              : formatUSD(monthlyRewardsUSD)}
          </div>
          <p className="text-xs text-gray-500">
            {displayMode === "eth"
              ? `≈ ${formatUSD(monthlyRewardsUSD)}`
              : `≈ ${formatETH(monthlyRewardsETH)}`}
          </p>
        </div>

        {/* Yearly Earnings */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <p className="text-gray-400 text-sm">Per Year</p>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {displayMode === "eth"
              ? formatETH(yearlyRewardsETH)
              : formatUSD(yearlyRewardsUSD)}
          </div>
          <p className="text-xs text-gray-500">
            {displayMode === "eth"
              ? `≈ ${formatUSD(yearlyRewardsUSD)}`
              : `≈ ${formatETH(yearlyRewardsETH)}`}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Per Hour:</span>
          <span className="text-white font-semibold">
            {displayMode === "eth"
              ? formatETH(hourlyRewardsETH)
              : formatUSD(hourlyRewardsUSD)}
          </span>
        </div>
      </div>
    </div>
  );
}
