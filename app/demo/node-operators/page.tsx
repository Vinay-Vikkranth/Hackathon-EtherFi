'use client';

import { useState, useEffect } from 'react';
import { Users, Globe, Shield, Activity, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import NodeOperatorsTutorial from '@/components/NodeOperatorsTutorial';

interface NodeOperator {
  id: number;
  name: string;
  location: string;
  flag: string;
  validators: number;
  uptime: number;
  status: 'active' | 'inactive';
}

const mockOperators: NodeOperator[] = [
  { id: 1, name: 'StakeWise US', location: 'USA', flag: '🇺🇸', validators: 12, uptime: 99.8, status: 'active' },
  { id: 2, name: 'EuroNode', location: 'Germany', flag: '🇩🇪', validators: 8, uptime: 99.5, status: 'active' },
  { id: 3, name: 'AsiaStake', location: 'Singapore', flag: '🇸🇬', validators: 10, uptime: 99.9, status: 'active' },
  { id: 4, name: 'CanadaVal', location: 'Canada', flag: '🇨🇦', validators: 6, uptime: 99.2, status: 'active' },
  { id: 5, name: 'UKValidator', location: 'UK', flag: '🇬🇧', validators: 9, uptime: 99.7, status: 'active' },
  { id: 6, name: 'AussieNode', location: 'Australia', flag: '🇦🇺', validators: 7, uptime: 98.9, status: 'inactive' },
  { id: 7, name: 'JapanStake', location: 'Japan', flag: '🇯🇵', validators: 11, uptime: 99.6, status: 'active' },
  { id: 8, name: 'SwissNode', location: 'Switzerland', flag: '🇨🇭', validators: 5, uptime: 99.4, status: 'active' },
];

export default function NodeOperatorsDemoPage() {
  const [userStake, setUserStake] = useState(10);
  const [distribution, setDistribution] = useState<{[key: number]: number}>({});
  const [isDistributing, setIsDistributing] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<number | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Distribute stake across operators
  const distributeStake = () => {
    setIsDistributing(true);
    
    // Simulate distribution algorithm
    const newDistribution: {[key: number]: number} = {};
    const activeOperators = mockOperators.filter(op => op.status === 'active');
    const stakePerOperator = userStake / activeOperators.length;
    
    activeOperators.forEach(op => {
      newDistribution[op.id] = parseFloat(stakePerOperator.toFixed(4));
    });
    
    setTimeout(() => {
      setDistribution(newDistribution);
      setIsDistributing(false);
    }, 1500);
  };

  useEffect(() => {
    distributeStake();
  }, [userStake]);

  const totalValidators = mockOperators.reduce((sum, op) => sum + op.validators, 0);
  const activeValidators = mockOperators.filter(op => op.status === 'active').reduce((sum, op) => sum + op.validators, 0);
  const avgUptime = mockOperators.reduce((sum, op) => sum + op.uptime, 0) / mockOperators.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-purple-900/20 to-dark-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-purple-400 hover:text-purple-300">
              ← Back to Dashboard
            </Link>
            <button
              onClick={() => setShowTutorial(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
            >
              <span>📚</span> Start Tutorial
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            🌍 Decentralized Node Operators
          </h1>
          <p className="text-gray-300 text-lg">
            See how your stake is distributed across independent validators worldwide
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 tutorial-stats">
          <div className="gradient-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-sm text-gray-400">Total Operators</h3>
            </div>
            <p className="text-3xl font-bold text-white">{mockOperators.length}</p>
          </div>

          <div className="gradient-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-green-400" />
              <h3 className="text-sm text-gray-400">Active Validators</h3>
            </div>
            <p className="text-3xl font-bold text-white">{activeValidators}</p>
          </div>

          <div className="gradient-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-blue-400" />
              <h3 className="text-sm text-gray-400">Countries</h3>
            </div>
            <p className="text-3xl font-bold text-white">8</p>
          </div>

          <div className="gradient-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-yellow-400" />
              <h3 className="text-sm text-gray-400">Avg Uptime</h3>
            </div>
            <p className="text-3xl font-bold text-white">{avgUptime.toFixed(1)}%</p>
          </div>
        </div>

        {/* Interactive Stake Distribution */}
        <div className="gradient-card rounded-2xl p-8 mb-8 tutorial-slider">
          <h2 className="text-2xl font-bold text-white mb-4">Your Stake Distribution</h2>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">
              Your Stake Amount: <span className="text-purple-400 font-bold">{userStake} ETH</span>
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={userStake}
              onChange={(e) => setUserStake(Number(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 ETH</span>
              <span>100 ETH</span>
            </div>
          </div>

          {isDistributing ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-300">Distributing your stake across operators...</p>
            </div>
          ) : (
            <div className="space-y-3 tutorial-distribution">
              {mockOperators.map((operator, index) => {
                const stakeAmount = distribution[operator.id] || 0;
                const percentage = (stakeAmount / userStake) * 100;
                
                return (
                  <div
                    key={operator.id}
                    onClick={() => setSelectedOperator(operator.id === selectedOperator ? null : operator.id)}
                    className={`bg-dark-800/50 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedOperator === operator.id ? 'ring-2 ring-purple-500' : 'hover:bg-dark-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{operator.flag}</span>
                        <div>
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {operator.name}
                            {operator.status === 'active' ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-400">{operator.location} • {operator.validators} validators</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-400">{stakeAmount.toFixed(4)} ETH</p>
                        <p className="text-sm text-gray-400">Uptime: {operator.uptime}%</p>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    {stakeAmount > 0 && (
                      <div className="mt-3">
                        <div className="bg-dark-900 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Expanded details */}
                    {selectedOperator === operator.id && (
                      <div className="mt-4 pt-4 border-t border-dark-700">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Total ETH Staked</p>
                            <p className="text-white font-semibold">{(operator.validators * 32).toLocaleString()} ETH</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Your Share</p>
                            <p className="text-white font-semibold">{percentage.toFixed(2)}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Status</p>
                            <p className={operator.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                              {operator.status === 'active' ? 'Online ✓' : 'Offline ✗'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Performance</p>
                            <p className="text-white font-semibold">
                              {operator.uptime >= 99.5 ? 'Excellent' : operator.uptime >= 99 ? 'Good' : 'Fair'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Why Decentralization Matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 tutorial-comparison">
          <div className="gradient-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-400" />
              ❌ Centralized Staking
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Single point of failure - if one operator goes down, all your stake is affected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Regulatory risk - one company can be shut down by government</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Network centralization - harms Ethereum's security model</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>No geographic redundancy - local issues affect entire operation</span>
              </li>
            </ul>
          </div>

          <div className="gradient-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              ✅ Decentralized Staking
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Automatic failover - if one operator fails, others keep earning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Distributed risk - no single entity can compromise your stake</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Supports Ethereum decentralization - makes the network stronger</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>Global coverage - validators in multiple time zones and regions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Simulate Failure */}
        <div className="gradient-card rounded-2xl p-8 tutorial-simulation">
          <h2 className="text-2xl font-bold text-white mb-4">🧪 Failure Simulation</h2>
          <p className="text-gray-300 mb-6">
            See what happens when one operator goes offline. Notice how your other validators keep earning!
          </p>
          
          <button
            onClick={() => {
              setSimulateFailure(!simulateFailure);
              if (!simulateFailure) {
                // Simulate operator 6 going offline
                const newOps = [...mockOperators];
                newOps[5].status = 'inactive';
                distributeStake();
              } else {
                // Restore operator
                const newOps = [...mockOperators];
                newOps[5].status = 'active';
                distributeStake();
              }
            }}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            {simulateFailure ? '✓ Restore All Operators' : '⚠️ Simulate Operator Failure'}
          </button>

          {simulateFailure && (
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-400 font-semibold mb-2">⚠️ AussieNode has gone offline!</p>
              <p className="text-gray-300">
                Your stake has been automatically redistributed to the remaining {mockOperators.filter(op => op.status === 'active').length} active operators. 
                You continue earning rewards without interruption! 🎉
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg"
          >
            Start Staking with Decentralized Operators →
          </Link>
        </div>
      </div>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <NodeOperatorsTutorial onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
