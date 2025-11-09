'use client';

import { useState } from 'react';
import { Sparkles, Shield, Coins, Zap, TrendingUp, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  howItWorks: string[];
  example: string;
  color: string;
}

const etherfiFeatures: Feature[] = [
  {
    id: 'node-operators',
    icon: Users,
    title: 'Decentralized Node Operators',
    tagline: 'Supporting Independent Validators',
    description: 'Ether.fi doesn\'t run all the validators itself. It partners with independent node operators worldwide, making Ethereum more decentralized and secure. Your stake helps support these independent validators!',
    benefits: [
      'Makes Ethereum more secure and decentralized',
      'Supports independent operators (not big companies)',
      'Reduces centralization risk',
      'Better for Ethereum\'s long-term health'
    ],
    howItWorks: [
      'Ether.fi selects trusted node operators',
      'Your ETH is distributed across many operators',
      'Each operator runs validators independently',
      'Rewards come from many sources (diversification)',
      'If one operator fails, others keep working'
    ],
    example: 'Instead of one company running all validators (centralized = risky), Ether.fi spreads your stake across 50+ independent operators worldwide. If one has issues, your rewards keep flowing from the others!',
    color: 'green'
  },
  {
    id: 'restaking',
    icon: TrendingUp,
    title: 'EigenLayer Restaking',
    tagline: 'Earn Extra Rewards on Top of Staking',
    description: 'Through EigenLayer integration, you can "restake" your eETH to secure additional networks and protocols. This means earning EXTRA rewards beyond the base 3.5% APR - all with the same capital!',
    benefits: [
      'Earn additional rewards from EigenLayer',
      'Secure multiple networks at once',
      'Maximize capital efficiency',
      'Participate in cutting-edge DeFi innovation'
    ],
    howItWorks: [
      'Stake ETH normally to get eETH',
      'eETH automatically participates in restaking',
      'Your stake secures both Ethereum AND other protocols',
      'Earn base rewards (3.5%) + restaking rewards',
      'All managed automatically by Ether.fi'
    ],
    example: 'Sarah stakes 10 ETH and gets 10 eETH earning 3.5% APR. Because Ether.fi integrates with EigenLayer, her eETH also secures other protocols, earning her EXTRA points and rewards on top of the base 3.5%. Double earnings, same stake!',
    color: 'orange'
  },
  {
    id: 'loyalty-program',
    icon: Sparkles,
    title: 'Loyalty Points Program',
    tagline: 'Earn Points for Future Rewards',
    description: 'Ether.fi rewards early supporters with loyalty points. The longer you stake and the more you participate, the more points you earn. These points may be valuable in the future!',
    benefits: [
      'Earn points for every day you stake',
      'Bonus points for early participation',
      'Potential future airdrops or benefits',
      'Rewards long-term believers'
    ],
    howItWorks: [
      'Points accumulate daily while staking',
      'Larger stakes = more points',
      'Longer staking = bonus multipliers',
      'Points tracked on your profile',
      'Future benefits to be announced'
    ],
    example: 'Mike staked 5 ETH early and earned 1000 loyalty points over 6 months. Later, Ether.fi announces a token airdrop where points = tokens. Mike\'s early support is rewarded! (This is hypothetical - check Ether.fi\'s official announcements)',
    color: 'yellow'
  }
];

export default function EtherfiAcademy() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>('node-operators');

  const toggleFeature = (id: string) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const getDemoLink = (featureId: string) => {
    const links: {[key: string]: string} = {
      'node-operators': '/demo/node-operators',
      'restaking': '/demo/restaking',
      'loyalty-program': '/demo/loyalty-points'
    };
    return links[featureId] || '/';
  };

  const getColorClasses = (color: string) => {
    const colors: any = {
      purple: 'from-purple-500 to-purple-700',
      blue: 'from-blue-500 to-blue-700',
      pink: 'from-pink-500 to-pink-700',
      green: 'from-green-500 to-green-700',
      orange: 'from-orange-500 to-orange-700',
      yellow: 'from-yellow-500 to-yellow-700',
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-card rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Ether.fi Academy</h1>
        <p className="text-gray-300 text-lg mb-2">
          Learn what makes Ether.fi special!
        </p>
        <p className="text-gray-400 text-sm">
          Click on each feature below to discover how Ether.fi innovates liquid staking
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        {etherfiFeatures.map((feature) => {
          const Icon = feature.icon;
          const isExpanded = expandedFeature === feature.id;
          
          return (
            <div
              key={feature.id}
              className="gradient-card rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Feature Header (Always Visible) */}
              <button
                onClick={() => toggleFeature(feature.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(feature.color)} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.tagline}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-6 animate-in fade-in duration-300">
                  {/* Description */}
                  <div className="bg-dark-700 rounded-xl p-4">
                    <p className="text-gray-200 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How It Works */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      How It Works
                    </h4>
                    <ol className="space-y-2">
                      {feature.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Real Example */}
                  <div className="bg-gradient-to-r from-primary-900/30 to-purple-900/30 border border-primary-500/30 rounded-xl p-4">
                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      💡 Real-World Example
                    </h4>
                    <p className="text-gray-200 leading-relaxed italic">
                      {feature.example}
                    </p>
                  </div>

                  {/* Try It CTA */}
                  <div className="flex gap-3">
                    <Link
                      href={getDemoLink(feature.id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-xl font-semibold transition-all text-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                    >
                      Explore Interactive Demo →
                    </Link>
                    <button
                      onClick={() => {
                        // Open Finny chat with pre-filled question
                        window.dispatchEvent(new CustomEvent('open-finny', { 
                          detail: `Tell me more about ${feature.title}` 
                        }));
                      }}
                      className="px-6 py-3 bg-dark-700 hover:bg-dark-600 rounded-xl font-semibold transition-all"
                    >
                      Ask Finny
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Why Ether.fi Section */}
      <div className="gradient-card rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Why Choose Ether.fi?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-primary-400">🔒 Security First</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Audited by top security firms</li>
              <li>• Non-custodial - you control your funds</li>
              <li>• Battle-tested smart contracts</li>
              <li>• Insurance fund for extra protection</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-primary-400">🚀 Innovation Leader</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• First to integrate EigenLayer restaking</li>
              <li>• Pioneering DeFi-native staking</li>
              <li>• Active development & upgrades</li>
              <li>• Community-driven governance</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-primary-400">💰 Competitive Rewards</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• 3.5% base APR on ETH staking</li>
              <li>• Additional restaking rewards</li>
              <li>• Loyalty points program</li>
              <li>• No hidden fees</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-primary-400">🌍 Decentralized Network</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• 50+ independent node operators</li>
              <li>• Geographic distribution</li>
              <li>• No single point of failure</li>
              <li>• Strengthens Ethereum security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="gradient-card rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Ether.fi vs Traditional Staking</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Feature</th>
                <th className="text-center py-3 px-4">Traditional Staking</th>
                <th className="text-center py-3 px-4 text-primary-400">Ether.fi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Liquidity</td>
                <td className="text-center py-3 px-4">❌ Locked</td>
                <td className="text-center py-3 px-4">✅ Liquid (eETH/weETH)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Minimum Stake</td>
                <td className="text-center py-3 px-4">32 ETH</td>
                <td className="text-center py-3 px-4">✅ Any amount</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Custody</td>
                <td className="text-center py-3 px-4">⚠️ Varies</td>
                <td className="text-center py-3 px-4">✅ Non-custodial</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">DeFi Usage</td>
                <td className="text-center py-3 px-4">❌ No</td>
                <td className="text-center py-3 px-4">✅ Yes</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4">Restaking</td>
                <td className="text-center py-3 px-4">❌ No</td>
                <td className="text-center py-3 px-4">✅ EigenLayer</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Unstaking Time</td>
                <td className="text-center py-3 px-4">⚠️ Days/weeks</td>
                <td className="text-center py-3 px-4">✅ Instant (via DEX)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="gradient-card rounded-2xl p-8 text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 shadow-xl shadow-purple-900/30">
        <h2 className="text-2xl font-bold mb-3">Ready to Start Your Ether.fi Journey?</h2>
        <p className="text-gray-300 mb-6">
          Join thousands of users earning rewards with liquid staking
        </p>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('navigate-tab', { detail: 'eETH' }));
          }}
          className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70"
        >
          Stake Your First ETH →
        </button>
      </div>
    </div>
  );
}
