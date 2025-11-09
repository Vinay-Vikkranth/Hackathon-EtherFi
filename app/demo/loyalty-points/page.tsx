'use client';

import { useState, useEffect } from 'react';
import { Award, TrendingUp, Users, Calendar, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import LoyaltyPointsTutorial from '@/components/LoyaltyPointsTutorial';

interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
  staked: number;
  multiplier: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: '0x742d...a3f1', points: 125000, staked: 500, multiplier: 2.5 },
  { rank: 2, address: '0x8e12...b4c2', points: 98500, staked: 320, multiplier: 2.2 },
  { rank: 3, address: '0x3a45...d5e3', points: 87200, staked: 280, multiplier: 2.0 },
  { rank: 4, address: '0x6f78...e6f4', points: 76800, staked: 250, multiplier: 1.8 },
  { rank: 5, address: '0x9b12...g7h5', points: 65400, staked: 200, multiplier: 1.5 },
];

export default function LoyaltyPointsDemoPage() {
  const [stakedAmount, setStakedAmount] = useState(10);
  const [stakingDays, setStakingDays] = useState(30);
  const [currentPoints, setCurrentPoints] = useState(1234);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Calculate multiplier based on staking duration
  const getMultiplier = (days: number) => {
    if (days < 30) return 1.0;
    if (days < 90) return 1.2;
    if (days < 180) return 1.5;
    if (days < 365) return 2.0;
    return 2.5;
  };

  const multiplier = getMultiplier(stakingDays);
  const basePointsPerDay = stakedAmount;
  const bonusPointsPerDay = basePointsPerDay * (multiplier - 1);
  const totalPointsPerDay = basePointsPerDay + bonusPointsPerDay;
  const projectedPoints = currentPoints + (totalPointsPerDay * stakingDays);

  // Calculate potential token value (hypothetical)
  const pointToTokenRatio = 1; // 1 point = 1 token
  const estimatedTokenPrice = 2.5; // $2.50 per token
  const potentialValue = projectedPoints * pointToTokenRatio * estimatedTokenPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-yellow-900/20 to-dark-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 tutorial-loyalty-header">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-yellow-400 hover:text-yellow-300">
              ← Back to Dashboard
            </Link>
            <button
              onClick={() => setShowTutorial(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg font-medium text-sm hover:from-yellow-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/70"
            >
              <span>📚</span> Start Tutorial
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            ⭐ Loyalty Points Program
          </h1>
          <p className="text-gray-300 text-lg">
            Earn points for staking early and staying loyal - potential future rewards!
          </p>
        </div>

        {/* Your Points Dashboard */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-metrics">
          <h2 className="text-2xl font-bold text-white mb-6">Your Points Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-dark-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-sm text-gray-400">Total Points</h3>
              </div>
              <p className="text-3xl font-bold text-yellow-400">{currentPoints.toLocaleString()}</p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-sm text-gray-400">Points/Day</h3>
              </div>
              <p className="text-3xl font-bold text-green-400">+{totalPointsPerDay.toFixed(1)}</p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm text-gray-400">Multiplier</h3>
              </div>
              <p className="text-3xl font-bold text-purple-400">{multiplier}x</p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm text-gray-400">Your Rank</h3>
              </div>
              <p className="text-3xl font-bold text-blue-400">#427</p>
            </div>
          </div>

          {/* Interactive Simulator */}
          <div className="bg-dark-800/50 rounded-xl p-6 tutorial-simulator">
            <h3 className="text-lg font-semibold text-white mb-4">🧮 Points Simulator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">
                  Staked Amount: <span className="text-yellow-400 font-bold">{stakedAmount} ETH</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={stakedAmount}
                  onChange={(e) => setStakedAmount(Number(e.target.value))}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Staking Duration: <span className="text-yellow-400 font-bold">{stakingDays} days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={stakingDays}
                  onChange={(e) => setStakingDays(Number(e.target.value))}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>1 year</span>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="bg-dark-900 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Base Points/Day:</span>
                  <span className="text-white font-semibold">{basePointsPerDay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Multiplier Bonus ({multiplier}x):</span>
                  <span className="text-green-400 font-semibold">+{bonusPointsPerDay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-dark-700">
                  <span className="text-white font-semibold">Total Points/Day:</span>
                  <span className="text-yellow-400 font-bold text-lg">{totalPointsPerDay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-dark-700">
                  <span className="text-white font-semibold">Projected Total ({stakingDays} days):</span>
                  <span className="text-purple-400 font-bold text-xl">{projectedPoints.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiplier Tiers */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-tiers">
          <h2 className="text-2xl font-bold text-white mb-6">⚡ Multiplier Tiers</h2>
          <p className="text-gray-300 mb-6">
            The longer you stake, the higher your multiplier! Keep your ETH staked to maximize points.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { days: 1, tier: 'Bronze', multiplier: 1.0, color: 'from-orange-700 to-orange-900' },
              { days: 30, tier: 'Silver', multiplier: 1.2, color: 'from-gray-400 to-gray-600' },
              { days: 90, tier: 'Gold', multiplier: 1.5, color: 'from-yellow-500 to-yellow-700' },
              { days: 180, tier: 'Platinum', multiplier: 2.0, color: 'from-cyan-400 to-cyan-600' },
              { days: 365, tier: 'Diamond', multiplier: 2.5, color: 'from-purple-500 to-pink-500' },
            ].map((tier) => {
              const isActive = stakingDays >= tier.days;
              
              return (
                <div
                  key={tier.tier}
                  className={`rounded-xl p-4 lg:p-6 text-center transition-all ${
                    isActive 
                      ? `bg-gradient-to-br ${tier.color}` 
                      : 'bg-dark-800/30 opacity-50'
                  }`}
                >
                  <div className="text-3xl lg:text-4xl mb-2 lg:mb-3">
                    {tier.tier === 'Bronze' && '🥉'}
                    {tier.tier === 'Silver' && '🥈'}
                    {tier.tier === 'Gold' && '🥇'}
                    {tier.tier === 'Platinum' && '💎'}
                    {tier.tier === 'Diamond' && '👑'}
                  </div>
                  <h3 className="font-bold text-white mb-1 text-sm lg:text-base">{tier.tier}</h3>
                  <p className="text-xs lg:text-sm text-gray-300 mb-2">{tier.days}+ days</p>
                  <p className="text-xl lg:text-2xl font-bold text-yellow-400">{tier.multiplier}x</p>
                  {isActive && (
                    <p className="text-xs text-green-400 mt-2">✓ Unlocked!</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Potential Future Value */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-benefits">
          <h2 className="text-2xl font-bold text-white mb-4">💰 Potential Future Value</h2>
          <p className="text-gray-300 mb-6">
            While not guaranteed, here's a hypothetical scenario if Ether.fi launches a token and converts points 1:1
          </p>

          <div className="bg-dark-800/50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Your Projected Points</p>
                <p className="text-2xl font-bold text-yellow-400">{projectedPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Hypothetical Tokens (1:1)</p>
                <p className="text-2xl font-bold text-purple-400">{(projectedPoints * pointToTokenRatio).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Value @ ${estimatedTokenPrice}/token</p>
                <p className="text-2xl font-bold text-green-400">${potentialValue.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-400 text-sm">
                ⚠️ <strong>Disclaimer:</strong> This is a hypothetical example only. Points may convert to tokens, governance rights, or other benefits - or may not convert at all. Check Ether.fi's official announcements for actual rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-timeline">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Top Stakers Leaderboard
          </h2>

          <div className="space-y-3">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="bg-dark-800/50 rounded-xl p-4 flex items-center justify-between hover:bg-dark-700/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900' :
                    'bg-dark-700 text-gray-400'
                  }`}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                  </div>
                  <div>
                    <p className="font-mono text-white font-semibold">{entry.address}</p>
                    <p className="text-sm text-gray-400">{entry.staked} ETH staked</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-yellow-400">{entry.points.toLocaleString()} pts</p>
                  <p className="text-sm text-purple-400">{entry.multiplier}x multiplier</p>
                </div>
              </div>
            ))}

            <div className="bg-purple-500/10 border-2 border-purple-500 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold">
                  👤
                </div>
                <div>
                  <p className="font-mono text-white font-semibold">0x9b64...a3 (You!)</p>
                  <p className="text-sm text-gray-400">{stakedAmount} ETH staked</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-yellow-400">{currentPoints.toLocaleString()} pts</p>
                <p className="text-sm text-purple-400">{multiplier}x multiplier</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Maximize Points */}
        <div className="gradient-card rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📈 How to Maximize Your Points</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Stake Early
              </h3>
              <p className="text-gray-300 text-sm">
                The earlier you start staking, the more time you have to accumulate points. Early adopters get a head start!
              </p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Stake More
              </h3>
              <p className="text-gray-300 text-sm">
                More ETH staked = more points per day. Your daily point rate is directly proportional to your stake.
              </p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Stay Committed
              </h3>
              <p className="text-gray-300 text-sm">
                Don't unstake! The longer you keep your ETH staked, the higher your multiplier grows (up to 2.5x).
              </p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Compound Rewards
              </h3>
              <p className="text-gray-300 text-sm">
                Claim your staking rewards and restake them to increase your total stake and earn even more points!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-yellow-600 to-purple-600 hover:from-yellow-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg"
          >
            Start Earning Loyalty Points →
          </Link>
        </div>
      </div>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <LoyaltyPointsTutorial onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
