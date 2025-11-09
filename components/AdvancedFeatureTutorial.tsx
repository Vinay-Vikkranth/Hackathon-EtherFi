'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  visual?: string;
}

const nodeOperatorSteps: TutorialStep[] = [
  {
    title: 'What are Node Operators? 🖥️',
    description: 'Node operators are people or companies that run Ethereum validators. They use special computers to verify transactions and keep the network secure.',
    visual: '👥 → 🖥️ → ⛓️'
  },
  {
    title: 'Centralized vs Decentralized',
    description: 'If ONE company runs all validators (centralized), it\'s risky! If many independent operators run validators (decentralized), it\'s much safer.',
    visual: '❌ 1 Company\n✅ 50+ Operators'
  },
  {
    title: 'How Ether.fi Distributes Your Stake',
    description: 'When you stake with Ether.fi, your ETH is automatically spread across 50+ trusted node operators worldwide. This protects you!',
    visual: 'Your ETH → 🌍 50+ Operators'
  },
  {
    title: 'Geographic Distribution 🌎',
    description: 'Operators are in different countries (USA, Europe, Asia, etc.). If one region has internet problems, the others keep working!',
    visual: '🇺🇸 + 🇪🇺 + 🇨🇳 = Safe'
  },
  {
    title: 'Automatic Failover Protection',
    description: 'If one operator goes offline, the other 49+ keep earning rewards for you. You don\'t lose money!',
    visual: 'Operator 1 ❌\nOthers ✅ Still Earning'
  },
  {
    title: 'Supporting Decentralization',
    description: 'By staking with Ether.fi, you help make Ethereum more decentralized and secure. You\'re helping the whole network!',
    visual: '💪 Stronger Ethereum'
  },
  {
    title: 'Viewing Operator Performance',
    description: 'You can see which operators are running your validators and how they\'re performing. Full transparency!',
    visual: '📊 Real-time Stats'
  },
  {
    title: '🎉 You\'re Protected!',
    description: 'Now you understand how decentralized node operators protect your stake and make Ethereum better. Your ETH is in good hands!',
    visual: '✅ Safe & Decentralized'
  }
];

const eigenlayerSteps: TutorialStep[] = [
  {
    title: 'What is Restaking? 🔄',
    description: 'Restaking means using your already-staked ETH to ALSO secure other blockchain networks and protocols. Double duty!',
    visual: '1 ETH → 2 Jobs'
  },
  {
    title: 'Traditional Staking',
    description: 'Normally: You stake ETH → Secure Ethereum → Earn 3.5% rewards. That\'s it.',
    visual: 'ETH → Ethereum → 3.5%'
  },
  {
    title: 'Restaking with EigenLayer',
    description: 'With restaking: Your staked ETH ALSO secures other protocols → Earn EXTRA rewards on top!',
    visual: 'ETH → Ethereum (3.5%)\n    → Other Protocols (Extra!)'
  },
  {
    title: 'How It Works Automatically',
    description: 'When you stake with Ether.fi, your eETH automatically participates in EigenLayer restaking. No extra steps needed!',
    visual: 'Stake ETH → Get eETH → Auto-Restaked ✅'
  },
  {
    title: 'What Protocols Can You Secure?',
    description: 'Your restaked ETH can secure: Data availability layers, oracle networks, bridge protocols, and more cutting-edge projects!',
    visual: '🌉 Bridges\n🔮 Oracles\n📊 Data Networks'
  },
  {
    title: 'Extra Reward Types',
    description: 'Restaking earns you: EigenLayer points, protocol tokens, bonus APR, and potential airdrops!',
    visual: '💰 Points + Tokens + APR'
  },
  {
    title: 'Capital Efficiency',
    description: 'This is the magic: Your SAME ETH earns rewards from multiple sources. No extra money needed!',
    visual: '10 ETH = Double Rewards'
  },
  {
    title: 'Risks to Understand',
    description: 'More rewards = slightly more risk. Your ETH helps secure multiple networks. But Ether.fi carefully selects safe protocols!',
    visual: '⚖️ Rewards ↑ Risk ↑ (Managed)'
  },
  {
    title: 'Viewing Your Restaking Rewards',
    description: 'In your Portfolio, you\'ll see: Base staking rewards + Restaking rewards + Points earned.',
    visual: '📊 Track Everything'
  },
  {
    title: '🎉 Maximize Your Earnings!',
    description: 'You now understand how restaking lets you earn extra rewards with the same capital. Welcome to advanced DeFi!',
    visual: '🚀 Double Earnings Unlocked'
  }
];

const loyaltySteps: TutorialStep[] = [
  {
    title: 'What are Loyalty Points? ⭐',
    description: 'Loyalty points are rewards for being an early and long-term supporter of Ether.fi. The longer you stake, the more points you earn!',
    visual: 'Time + Stake = Points'
  },
  {
    title: 'How Points Accumulate',
    description: 'Every day you have ETH staked, you earn points. The more ETH you stake, the more points per day!',
    visual: '10 ETH for 30 days\n= 300 points'
  },
  {
    title: 'Early Adopter Bonus',
    description: 'People who stake early get BONUS multipliers on their points. The earlier you start, the more valuable your points!',
    visual: 'Early: 2x Points 🎁\nLater: 1x Points'
  },
  {
    title: 'Loyalty Multipliers',
    description: 'The longer you keep your ETH staked without withdrawing, the higher your multiplier grows!',
    visual: '1 month: 1x\n6 months: 1.5x\n1 year: 2x'
  },
  {
    title: 'What Can Points Become?',
    description: 'In the future, points may convert to: Ether.fi tokens, governance voting power, exclusive benefits, or special airdrops!',
    visual: 'Points → Tokens? 🎁'
  },
  {
    title: 'Checking Your Points Balance',
    description: 'In your Portfolio, you\'ll see your total loyalty points and how fast you\'re earning them.',
    visual: '💎 1,234 Points\n+10 per day'
  },
  {
    title: 'Leaderboard Position',
    description: 'See how your points compare to other stakers. Climb the leaderboard to earn recognition!',
    visual: '🏆 Top 100 Stakers'
  },
  {
    title: 'Don\'t Lose Your Points!',
    description: 'Points stay with you as long as you keep staking. If you unstake everything, you might lose multipliers!',
    visual: '⚠️ Keep Staking = Keep Points'
  },
  {
    title: '🎉 Start Earning Points!',
    description: 'Now you understand how to maximize loyalty points. The sooner you stake, the more valuable points you earn!',
    visual: '⏰ Time to Start!'
  }
];

interface AdvancedFeatureTutorialProps {
  featureType: 'node-operators' | 'restaking' | 'loyalty-program';
  onComplete: () => void;
}

export default function AdvancedFeatureTutorial({ featureType, onComplete }: AdvancedFeatureTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stepsByType = {
    'node-operators': nodeOperatorSteps,
    'restaking': eigenlayerSteps,
    'loyalty-program': loyaltySteps
  };

  const steps = stepsByType[featureType];
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 150);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const getTitleForType = () => {
    const titles = {
      'node-operators': 'Decentralized Node Operators Tutorial',
      'restaking': 'EigenLayer Restaking Tutorial',
      'loyalty-program': 'Loyalty Points Program Tutorial'
    };
    return titles[featureType];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onComplete} />

      {/* Tutorial Window */}
      <div className="relative bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl shadow-2xl border-2 border-purple-400 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl border-b-2 border-purple-400">
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white pr-12">{getTitleForType()}</h2>
          <p className="text-purple-100 text-sm mt-1">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Visual Element */}
          {step.visual && (
            <div className="bg-dark-900 rounded-xl p-8 mb-6 text-center">
              <pre className="text-3xl font-mono whitespace-pre-wrap leading-relaxed">
                {step.visual}
              </pre>
            </div>
          )}

          {/* Title */}
          <h3 className={`text-2xl font-bold text-white mb-4 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {step.title}
          </h3>

          {/* Description */}
          <p className={`text-gray-200 text-lg leading-relaxed mb-8 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {step.description}
          </p>

          {/* Progress Dots */}
          <div className="flex gap-2 justify-center mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-purple-400 w-8' 
                    : index < currentStep 
                    ? 'bg-purple-500 w-2' 
                    : 'bg-gray-600 w-2'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-lg transition-all ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-700 text-white hover:bg-purple-600'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              {currentStep === steps.length - 1 ? (
                <>Finish! 🎉</>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
