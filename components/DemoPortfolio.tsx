'use client';

import { TrendingUp, Coins, Award, Activity } from 'lucide-react';

export function DemoPortfolio() {
  // Demo user data - realistic but fake
  const demoData = {
    stakedETH: 10.5,
    eETHBalance: 10.52,
    weETHBalance: 8.3,
    totalRewards: 0.15,
    apy: 3.8,
    stakingStatus: 'Active',
    validatorCount: 3,
    estimatedMonthlyEarnings: 0.033,
    estimatedYearlyEarnings: 0.399,
  };

  // Calculate USD values (assuming ETH = $2500)
  const ethPrice = 2500;
  const stakedValueUSD = demoData.stakedETH * ethPrice;
  const rewardsValueUSD = demoData.totalRewards * ethPrice;
  const monthlyEarningsUSD = demoData.estimatedMonthlyEarnings * ethPrice;

  return (
    <div className="bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
        <span className="px-3 py-1 bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-semibold rounded-full border border-[#f59e0b]/30">
          DEMO MODE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Staked ETH */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#3a3a3a] hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <Coins className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400 font-medium">Staked</span>
          </div>
          <p className="text-2xl font-bold text-white">{demoData.stakedETH} ETH</p>
          <p className="text-xs text-[#6b6b6b] mt-1">≈ ${stakedValueUSD.toLocaleString()}</p>
        </div>

        {/* eETH Balance */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#3a3a3a] hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">eETH</span>
          </div>
          <p className="text-2xl font-bold text-white">{demoData.eETHBalance} eETH</p>
          <p className="text-xs text-[#6b6b6b] mt-1">Liquid staking token</p>
        </div>

        {/* Total Rewards */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#3a3a3a] hover:border-green-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Rewards</span>
          </div>
          <p className="text-2xl font-bold text-white">{demoData.totalRewards} ETH</p>
          <p className="text-xs text-[#6b6b6b] mt-1">≈ ${rewardsValueUSD.toFixed(2)}</p>
        </div>

        {/* APY */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#3a3a3a] hover:border-[#d4af37]/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-[#d4af37]" />
            <span className="text-xs text-[#d4af37] font-medium">APY</span>
          </div>
          <p className="text-2xl font-bold text-white">{demoData.apy}%</p>
          <p className="text-xs text-[#6b6b6b] mt-1">Current rate</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-[#3a3a3a]">
        <div>
          <p className="text-sm text-[#a0a0a0] mb-1">Staking Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <p className="text-lg font-semibold text-green-400">{demoData.stakingStatus}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-[#a0a0a0] mb-1">Validators</p>
          <p className="text-lg font-semibold text-white">{demoData.validatorCount} Active</p>
        </div>
        <div>
          <p className="text-sm text-[#a0a0a0] mb-1">Est. Monthly Earnings</p>
          <p className="text-lg font-semibold text-white">
            {demoData.estimatedMonthlyEarnings} ETH
          </p>
          <p className="text-xs text-[#6b6b6b]">≈ ${monthlyEarningsUSD.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-[#a0a0a0] mb-1">Est. Yearly Earnings</p>
          <p className="text-lg font-semibold text-white">
            {demoData.estimatedYearlyEarnings} ETH
          </p>
          <p className="text-xs text-[#6b6b6b]">≈ ${(demoData.estimatedYearlyEarnings * ethPrice).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
