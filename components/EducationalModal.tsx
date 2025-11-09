'use client';

import { useState } from 'react';

interface EducationalModalProps {
  onClose: () => void;
}

export default function EducationalModal({ onClose }: EducationalModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-800 border border-primary-600 rounded-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome to Liquid Staking Demo!</h2>
              <p className="text-primary-400 text-sm">Interactive Educational Platform</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-300">
            <div className="bg-dark-900 bg-opacity-50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-sm ml-8">
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span><strong>Staking:</strong> Lock ETH and receive liquid eETH tokens representing your stake</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span><strong>Liquid Tokens:</strong> Use eETH in DeFi while still earning staking rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span><strong>Wrapping:</strong> Convert eETH to weETH for additional use cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-400 mt-1">•</span>
                  <span><strong>Borrowing:</strong> Use your staked assets as collateral for loans</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-900 bg-opacity-20 border border-yellow-600 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                Important Notice
              </h3>
              <ul className="space-y-1 text-sm ml-8">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>This is an <strong>educational demo only</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Uses <strong>local testnet tokens</strong> - no real funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span><strong>Not financial advice</strong> - for learning purposes only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Connect to <strong>Hardhat localhost network</strong> (Chain ID: 31337)</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary-900 bg-opacity-20 border border-primary-600 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-300 mb-2 flex items-center gap-2">
                <span className="text-xl">🚀</span>
                Getting Started
              </h3>
              <ol className="space-y-2 text-sm ml-8 list-decimal">
                <li>Connect your wallet to the local Hardhat network</li>
                <li>Start with the <strong>eETH tab</strong> to stake some testnet ETH</li>
                <li>Check the <strong>Portfolio tab</strong> to see your balances and rewards</li>
                <li>Explore <strong>Advanced features</strong> for wrapping and borrowing</li>
              </ol>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary-600 hover:bg-primary-700 py-3 rounded-lg font-semibold transition-all glow-effect"
        >
          Got it! Let's Start Learning
        </button>
      </div>
    </div>
  );
}
