'use client';

import { ProtocolStats } from '@/components/ProtocolStats';
import { WalletConnection } from '@/components/WalletConnection';
import { DemoPortfolio } from '@/components/DemoPortfolio';
import { AIAssistant } from '@/components/AIAssistant';
import { Sparkles, BarChart3, Menu } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="bg-[#2a2a2a] border-b border-[#3a3a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Ether.fi Dashboard</h1>
                <p className="text-sm text-[#a0a0a0]">Real-time protocol analytics with AI assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-[#a0a0a0]">Live Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Connection */}
        <div className="mb-6">
          <WalletConnection />
        </div>

        {/* Protocol Stats - Real Data from DeFiLlama */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Protocol Statistics
            <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">LIVE</span>
          </h2>
          <ProtocolStats />
        </div>

        {/* Demo Portfolio */}
        <div className="mb-8">
          <DemoPortfolio />
        </div>

        {/* AI Assistant */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            AI Assistant
          </h2>
          <AIAssistant
            userContext={{
              stakedETH: 10.5,
              eETHBalance: 10.52,
              totalRewards: 0.15,
              apy: 3.8,
            }}
          />
        </div>

        {/* Footer Info */}
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-white mb-2">About This Dashboard</h3>
          <ul className="text-sm text-[#a0a0a0] space-y-1">
            <li>✅ <strong className="text-white">Real Protocol Data:</strong> TVL, fees, and revenue fetched live from DeFiLlama API</li>
            <li>🔗 <strong className="text-white">Wallet Integration:</strong> Connect your MetaMask wallet to view your real ETH balance</li>
            <li>📈 <strong className="text-white">Demo Portfolio:</strong> Example user dashboard showing staking data (clearly marked as demo)</li>
            <li>🤖 <strong className="text-white">AI Assistant:</strong> Powered by Ollama (local LLM) - answers questions and calculates projections</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] border-t border-[#3a3a3a] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-[#a0a0a0]">
            Built for Hackathon • Ether.fi Dashboard with AI Integration
          </p>
        </div>
      </footer>
    </main>
  );
}
