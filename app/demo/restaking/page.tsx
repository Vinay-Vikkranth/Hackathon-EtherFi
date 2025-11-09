'use client';

import { useState } from 'react';
import { Layers, TrendingUp, Shield, Zap, DollarSign, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import RestakingTutorial from '@/components/RestakingTutorial';

interface Protocol {
  id: number;
  name: string;
  icon: string;
  type: string;
  apr: number;
  tvl: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
}

const protocols: Protocol[] = [
  {
    id: 1,
    name: 'DataLayer',
    icon: '📊',
    type: 'Data Availability',
    apr: 2.5,
    tvl: '$124M',
    risk: 'low',
    description: 'Secure decentralized data availability for rollups'
  },
  {
    id: 2,
    name: 'OracleNet',
    icon: '🔮',
    type: 'Oracle Network',
    apr: 3.2,
    tvl: '$89M',
    risk: 'medium',
    description: 'Decentralized price feeds and off-chain data'
  },
  {
    id: 3,
    name: 'BridgeGuard',
    icon: '🌉',
    type: 'Bridge Security',
    apr: 4.1,
    tvl: '$156M',
    risk: 'medium',
    description: 'Secure cross-chain asset transfers'
  },
  {
    id: 4,
    name: 'ZK-Prover',
    icon: '🔐',
    type: 'ZK Computation',
    apr: 5.0,
    tvl: '$67M',
    risk: 'high',
    description: 'Zero-knowledge proof generation network'
  }
];

export default function RestakingDemoPage() {
  const [stakedAmount, setStakedAmount] = useState(10);
  const [selectedProtocols, setSelectedProtocols] = useState<number[]>([1, 2]);
  const [showComparison, setShowComparison] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const baseStakingAPR = 3.5;
  const restakingAPR = selectedProtocols.reduce((sum, id) => {
    const protocol = protocols.find(p => p.id === id);
    return sum + (protocol?.apr || 0);
  }, 0);
  const totalAPR = baseStakingAPR + restakingAPR;

  const baseYearlyRewards = (stakedAmount * baseStakingAPR) / 100;
  const restakingYearlyRewards = (stakedAmount * restakingAPR) / 100;
  const totalYearlyRewards = baseYearlyRewards + restakingYearlyRewards;

  const toggleProtocol = (id: number) => {
    if (selectedProtocols.includes(id)) {
      setSelectedProtocols(selectedProtocols.filter(p => p !== id));
    } else {
      setSelectedProtocols([...selectedProtocols, id]);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'high': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-orange-900/20 to-dark-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 tutorial-restaking-header">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-orange-400 hover:text-orange-300">
              ← Back to Dashboard
            </Link>
            <button
              onClick={() => setShowTutorial(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-purple-600 rounded-lg font-medium text-sm hover:from-orange-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70"
            >
              <span>📚</span> Start Tutorial
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            🔄 EigenLayer Restaking
          </h1>
          <p className="text-gray-300 text-lg">
            Maximize your yield by securing multiple protocols with the same ETH
          </p>
        </div>

        {/* Interactive Yield Calculator */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-calculator">
          <h2 className="text-2xl font-bold text-white mb-6">💰 Yield Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Input */}
            <div>
              <label className="block text-gray-300 mb-2">
                Staked Amount: <span className="text-orange-400 font-bold">{stakedAmount} ETH</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={stakedAmount}
                onChange={(e) => setStakedAmount(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 ETH</span>
                <span>100 ETH</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 tutorial-earnings">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Base Staking APR:</span>
                <span className="text-lg font-bold text-green-400">{baseStakingAPR}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Restaking Bonus APR:</span>
                <span className="text-lg font-bold text-orange-400">+{restakingAPR.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-dark-700">
                <span className="text-white font-semibold">Total APR:</span>
                <span className="text-2xl font-bold text-purple-400">{totalAPR.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Yearly Rewards Breakdown */}
          <div className="bg-dark-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Yearly Rewards Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Base Staking Rewards</span>
                  <span className="font-bold text-green-400">{baseYearlyRewards.toFixed(4)} ETH</span>
                </div>
                <div className="bg-dark-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${(baseYearlyRewards / totalYearlyRewards) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Restaking Bonus</span>
                  <span className="font-bold text-orange-400">{restakingYearlyRewards.toFixed(4)} ETH</span>
                </div>
                <div className="bg-dark-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-orange-500 h-full" style={{ width: `${(restakingYearlyRewards / totalYearlyRewards) * 100}%` }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-dark-700">
                <div className="flex justify-between">
                  <span className="text-white font-semibold text-lg">Total Yearly Rewards</span>
                  <span className="font-bold text-purple-400 text-2xl">{totalYearlyRewards.toFixed(4)} ETH</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  ≈ ${(totalYearlyRewards * 2000).toLocaleString()} USD @ $2,000/ETH
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Selection */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-protocols">
          <h2 className="text-2xl font-bold text-white mb-4">Select Protocols to Secure</h2>
          <p className="text-gray-300 mb-6">
            Choose which protocols you want to help secure with your restaked ETH. Each adds extra yield!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {protocols.map((protocol) => {
              const isSelected = selectedProtocols.includes(protocol.id);
              
              return (
                <div
                  key={protocol.id}
                  onClick={() => toggleProtocol(protocol.id)}
                  className={`cursor-pointer rounded-xl p-6 transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-br from-orange-500/20 to-purple-500/20 ring-2 ring-orange-500' 
                      : 'bg-dark-800/50 hover:bg-dark-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{protocol.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{protocol.name}</h3>
                        <p className="text-sm text-gray-400">{protocol.type}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(protocol.risk)}`}>
                      {protocol.risk.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4">{protocol.description}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Extra APR</p>
                      <p className="text-lg font-bold text-orange-400">+{protocol.apr}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">TVL</p>
                      <p className="text-lg font-bold text-white">{protocol.tvl}</p>
                    </div>
                    <div>
                      {isSelected ? (
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                          ✓ Active
                        </div>
                      ) : (
                        <div className="bg-dark-700 text-gray-400 px-4 py-2 rounded-lg">
                          Select
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            {showComparison ? 'Hide' : 'Show'} Traditional vs Restaking Comparison
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-comparison">
            <h2 className="text-2xl font-bold text-white mb-6">📊 Traditional Staking vs Restaking</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-4 px-4 text-gray-400">Feature</th>
                    <th className="text-center py-4 px-4 text-gray-400">Traditional Staking</th>
                    <th className="text-center py-4 px-4 text-orange-400">Restaking (EigenLayer)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-white">Base APR</td>
                    <td className="text-center py-4 px-4 text-green-400 font-bold">3.5%</td>
                    <td className="text-center py-4 px-4 text-green-400 font-bold">3.5%</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-white">Additional Yield</td>
                    <td className="text-center py-4 px-4 text-gray-500">0%</td>
                    <td className="text-center py-4 px-4 text-orange-400 font-bold">+{restakingAPR.toFixed(1)}%</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-white">Total APR</td>
                    <td className="text-center py-4 px-4 font-bold">3.5%</td>
                    <td className="text-center py-4 px-4 text-purple-400 font-bold">{totalAPR.toFixed(1)}%</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-white">Yearly Rewards ({stakedAmount} ETH)</td>
                    <td className="text-center py-4 px-4 font-bold">{baseYearlyRewards.toFixed(4)} ETH</td>
                    <td className="text-center py-4 px-4 text-purple-400 font-bold">{totalYearlyRewards.toFixed(4)} ETH</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-white">Extra Capital Needed</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4 text-green-400 font-bold">$0 (Same ETH!)</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-white">Protocol Tokens</td>
                    <td className="text-center py-4 px-4 text-gray-500">None</td>
                    <td className="text-center py-4 px-4 text-orange-400">Potential Airdrops ✨</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-white">Risk Level</td>
                    <td className="text-center py-4 px-4 text-green-400">Low</td>
                    <td className="text-center py-4 px-4 text-yellow-400">Medium (Managed)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <p className="text-purple-400 font-semibold mb-2">💡 The Magic of Capital Efficiency</p>
              <p className="text-gray-300">
                With restaking, you're earning <span className="text-orange-400 font-bold">+{((restakingYearlyRewards / baseYearlyRewards) * 100).toFixed(0)}% more rewards</span> without staking any additional ETH! 
                Your same {stakedAmount} ETH is doing double (or triple!) duty.
              </p>
            </div>
          </div>
        )}

        {/* Risk Management */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-how-it-works">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-yellow-400" />
            How Ether.fi Manages Restaking Risk
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                Protocol Vetting
              </h3>
              <p className="text-gray-300 text-sm">
                Ether.fi only partners with audited, battle-tested protocols. Each protocol undergoes rigorous security review before integration.
              </p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                Diversification
              </h3>
              <p className="text-gray-300 text-sm">
                Your stake is distributed across multiple protocols. If one has issues, the others continue earning normally.
              </p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Real-time Monitoring
              </h3>
              <p className="text-gray-300 text-sm">
                24/7 monitoring of all restaked protocols. Automatic alerts and emergency procedures in place for any anomalies.
              </p>
            </div>

            <div className="bg-dark-800/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Insurance Fund
              </h3>
              <p className="text-gray-300 text-sm">
                A portion of restaking rewards goes to an insurance pool that protects users in case of slashing events.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg"
          >
            Start Earning Restaking Rewards →
          </Link>
        </div>
      </div>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <RestakingTutorial onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
