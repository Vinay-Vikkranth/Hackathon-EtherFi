'use client';

import { useState, useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useLearning } from '@/contexts/LearningContext';
import { ethers } from 'ethers';
import InfoBox from '@/components/InfoBox';

export default function PortfolioView() {
  const { account, contracts, provider } = useWeb3();
  const { earnBadge } = useLearning();
  const [ethBalance, setEthBalance] = useState('0');
  const [eethBalance, setEethBalance] = useState('0');
  const [weethBalance, setWeethBalance] = useState('0');
  const [stakedAmount, setStakedAmount] = useState('0');
  const [pendingRewards, setPendingRewards] = useState('0');
  const [totalRewards, setTotalRewards] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (account && contracts.eeth) {
      loadPortfolioData();
      const interval = setInterval(loadPortfolioData, 10000); // Update every 10 seconds
      return () => clearInterval(interval);
    }
  }, [account, contracts]);

  const loadPortfolioData = async () => {
    if (!account || !provider || !contracts.eeth) return;

    try {
      const ethBal = await provider.getBalance(account);
      const eethBal = await contracts.eeth.balanceOf(account);
      
      setEthBalance(ethers.formatEther(ethBal));
      setEethBalance(ethers.formatEther(eethBal));

      // Get staking info
      const stakeInfo = await contracts.eeth.getStakeInfo(account);
      setStakedAmount(ethers.formatEther(stakeInfo[0]));
      setPendingRewards(ethers.formatEther(stakeInfo[2]));
      setTotalRewards(ethers.formatEther(stakeInfo[3]));

      // Get weETH balance if available
      if (contracts.weeth) {
        const weethBal = await contracts.weeth.balanceOf(account);
        setWeethBalance(ethers.formatEther(weethBal));
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const handleClaimRewards = async () => {
    if (!contracts.eeth) return;

    setIsLoading(true);
    try {
      const tx = await contracts.eeth.claimRewards();
      await tx.wait();
      
      await loadPortfolioData();
      alert('✅ Rewards claimed successfully!');
    } catch (error: any) {
      console.error('Claim error:', error);
      alert('❌ Claim failed: ' + (error.reason || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="gradient-card rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-primary-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400">Please connect your wallet to view your portfolio</p>
      </div>
    );
  }

  const ethValue = parseFloat(ethBalance) * 1939.4;
  const eethValue = parseFloat(eethBalance) * 1939.4;

  return (
    <div className="space-y-6">
      {showInfo && (
        <div className="tutorial-portfolio-info">
          <InfoBox
            title="📊 Understanding Your Portfolio"
            onClose={() => setShowInfo(false)}
          >
            <ul className="space-y-2 text-sm">
              <li><strong>Current eETH Balance:</strong> Your liquid staking tokens that earn rewards</li>
              <li><strong>Staked Amount:</strong> Original ETH you deposited (tracked separately)</li>
              <li><strong>Staking Rewards:</strong> Automatically accumulating at 3.5% APR</li>
              <li><strong>Claim Rewards:</strong> Withdraw your earned rewards as ETH anytime</li>
            </ul>
          </InfoBox>
        </div>
      )}

      {/* Overview Header */}
      <div className="gradient-card rounded-2xl p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">OVERVIEW</h2>
          <span className="text-sm text-gray-400">Conversion rate: 1 ETH = 1 eETH</span>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current eETH Balance */}
        <div className="gradient-card rounded-2xl p-6 tutorial-eeth-balance">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-gray-300">Current eETH Balance</h3>
            <div className="group relative">
              <svg className="w-4 h-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="hidden group-hover:block absolute left-0 top-6 bg-dark-900 border border-gray-700 rounded-lg p-2 text-xs w-48 z-10">
                Your liquid staking tokens that represent staked ETH
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-primary-400 text-2xl">↗</span>
            <div>
              <div className="text-4xl font-bold">{parseFloat(eethBalance).toFixed(3)} eETH</div>
              <div className="text-gray-400 text-sm mt-1">${eethValue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Current weETH Balance */}
        <div className="gradient-card rounded-2xl p-6 tutorial-weeth-balance">
          <h3 className="font-semibold text-gray-300 mb-4">Current weETH balance</h3>
          <div className="text-4xl font-bold mb-2">{parseFloat(weethBalance).toFixed(1)} weETH</div>
          <div className="text-gray-400 text-sm">${(parseFloat(weethBalance) * 1939.4).toFixed(2)}</div>
        </div>
      </div>

      {/* Staking Rewards */}
      <div className="gradient-card rounded-2xl p-6 tutorial-rewards-section">
        <h3 className="text-xl font-bold mb-6">Staking Rewards</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-primary-400 text-xl">↗</span>
              <div className="text-3xl font-bold text-primary-400">3.5%</div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              APR %
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-primary-400 text-xl">↗</span>
              <div className="text-3xl font-bold">TBD</div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              Restaked APR %
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-primary-400 text-xl">↗</span>
              <div className="text-3xl font-bold">{parseFloat(totalRewards).toFixed(0)}</div>
            </div>
            <div className="text-xs text-gray-400">
              <a href="#" className="underline hover:text-primary-400">liquid.stake loyalty points</a>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-primary-400 text-xl">↗</span>
              <div className="text-3xl font-bold">0</div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              EigenLayer points
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Rewards Details */}
        <div className="bg-dark-700 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center tutorial-staked-eth">
            <span className="text-gray-400">Staked ETH</span>
            <span className="font-semibold">{parseFloat(stakedAmount).toFixed(4)} ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Pending Rewards</span>
            <span className="font-semibold text-primary-400">{parseFloat(pendingRewards).toFixed(6)} ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Rewards Earned</span>
            <span className="font-semibold text-green-400">{parseFloat(totalRewards).toFixed(6)} ETH</span>
          </div>
          
          <button
            onClick={handleClaimRewards}
            disabled={isLoading || parseFloat(totalRewards) <= 0}
            className="w-full mt-4 bg-primary-600 hover:bg-primary-700 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed tutorial-claim-button"
          >
            {isLoading ? 'Claiming...' : 'Claim Rewards'}
          </button>
        </div>
      </div>
    </div>
  );
}
