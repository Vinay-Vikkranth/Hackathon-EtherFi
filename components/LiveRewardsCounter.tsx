'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Zap } from 'lucide-react';

interface Props {
  stakedAmount: number;
  apr: number;
}

export default function LiveRewardsCounter({ stakedAmount, apr }: Props) {
  const [totalEarned, setTotalEarned] = useState(0);
  const [rewardsPerSecond, setRewardsPerSecond] = useState(0);

  useEffect(() => {
    // Calculate rewards per second
    const yearlyRewards = (stakedAmount * apr) / 100;
    const perSecond = yearlyRewards / (365 * 24 * 60 * 60);
    setRewardsPerSecond(perSecond);

    // Update counter every 100ms for smooth animation
    const interval = setInterval(() => {
      setTotalEarned(prev => prev + (perSecond * 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, [stakedAmount, apr]);

  const formatNumber = (num: number) => {
    if (num < 0.000001) return num.toExponential(4);
    if (num < 0.01) return num.toFixed(8);
    if (num < 1) return num.toFixed(6);
    return num.toFixed(6);
  };

  return (
    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          Live Rewards Tracker
        </h3>
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>

      <div className="space-y-4">
        {/* Real-time counter */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Total Earned (Live)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-400 font-mono">
              {formatNumber(totalEarned)}
            </span>
            <span className="text-gray-400">eETH</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            ≈ ${(totalEarned * 2000).toFixed(4)} USD
          </p>
        </div>

        {/* Per second rate */}
        <div className="pt-4 border-t border-green-500/20">
          <p className="text-sm text-gray-400 mb-1">Earning Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-green-300 font-mono">
              +{formatNumber(rewardsPerSecond)}
            </span>
            <span className="text-gray-400 text-sm">eETH/second</span>
          </div>
        </div>

        {/* Projections */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-green-500/20">
          <div className="text-center">
            <p className="text-xs text-gray-400">Per Hour</p>
            <p className="text-sm font-semibold text-green-300">
              {formatNumber(rewardsPerSecond * 3600)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Per Day</p>
            <p className="text-sm font-semibold text-green-300">
              {formatNumber(rewardsPerSecond * 86400)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Per Year</p>
            <p className="text-sm font-semibold text-green-300">
              {((stakedAmount * apr) / 100).toFixed(4)}
            </p>
          </div>
        </div>

        {/* Visual indicator */}
        <div className="flex items-center gap-2 text-xs text-gray-400 pt-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Rewards accumulating in real-time</span>
        </div>
      </div>
    </div>
  );
}
